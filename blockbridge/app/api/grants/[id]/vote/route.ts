import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const grantId = params.id
    const { vote_type } = await req.json()

    if (vote_type !== "yes" && vote_type !== "no") {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    // Check if grant exists and is in voting status
    const grantDoc = await db.collection("grants").doc(grantId).get()

    if (!grantDoc.exists) {
      return NextResponse.json({ error: "Grant not found" }, { status: 404 })
    }

    const grantData = grantDoc.data()

    if (grantData?.status !== "voting") {
      return NextResponse.json({ error: "Grant is not open for voting" }, { status: 400 })
    }

    // Check if user has already voted
    const votesSnapshot = await db
      .collection("votes")
      .where("grant_id", "==", grantId)
      .where("user_id", "==", session.user.id)
      .get()

    // Start a batch write
    const batch = db.batch()

    if (!votesSnapshot.empty) {
      // Update existing vote if different
      const voteDoc = votesSnapshot.docs[0]
      const voteData = voteDoc.data()

      if (voteData.vote_type !== vote_type) {
        batch.update(voteDoc.ref, { vote_type })
      } else {
        // Vote is the same, no need to update
        return NextResponse.json({ message: "Vote already recorded" })
      }
    } else {
      // Create new vote
      const voteRef = db.collection("votes").doc()
      batch.set(voteRef, {
        grant_id: grantId,
        user_id: session.user.id,
        vote_type,
        created_at: new Date(),
      })

      // Record activity
      const activityRef = db.collection("activities").doc()
      batch.set(activityRef, {
        user_id: session.user.id,
        activity_type: "grant_voted",
        description: "Voted on grant proposal",
        points: 10,
        metadata: { grant_id: grantId, vote_type },
        created_at: new Date(),
      })

      // Update user reputation score
      const userRef = db.collection("users").doc(session.user.id)
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        const userData = userDoc.data()
        batch.update(userRef, {
          reputation_score: (userData?.reputation_score || 0) + 10,
        })
      }
    }

    // Commit the batch
    await batch.commit()

    // Get updated vote counts
    const updatedVotesSnapshot = await db.collection("votes").where("grant_id", "==", grantId).get()

    let yesVotes = 0
    let noVotes = 0

    updatedVotesSnapshot.forEach((voteDoc) => {
      const voteData = voteDoc.data()
      if (voteData.vote_type === "yes") {
        yesVotes++
      } else if (voteData.vote_type === "no") {
        noVotes++
      }
    })

    return NextResponse.json({
      message: "Vote recorded successfully",
      yes_votes: yesVotes,
      no_votes: noVotes,
      total_votes: updatedVotesSnapshot.size,
    })
  } catch (error) {
    console.error("Error recording vote:", error)
    return NextResponse.json({ error: "Failed to record vote" }, { status: 500 })
  }
}

