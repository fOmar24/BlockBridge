import { type NextRequest, NextResponse } from "next/server"
import { db, convertTimestamps } from "@/lib/firebase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let grantsQuery = db.collection("grants")

    // Apply filters
    if (status) {
      grantsQuery = grantsQuery.where("status", "==", status)
    }

    // Order by created_at
    grantsQuery = grantsQuery.orderBy("created_at", "desc")

    // Apply pagination
    grantsQuery = grantsQuery.limit(limit)

    const grantsSnapshot = await grantsQuery.get()

    const grants = []

    for (const doc of grantsSnapshot.docs) {
      const grantData = convertTimestamps(doc)

      // Get creator details
      const creatorDoc = await db.collection("users").doc(grantData.created_by).get()
      const creatorData = creatorDoc.exists ? convertTimestamps(creatorDoc) : null

      // Get project details if available
      let projectTitle = null
      if (grantData.project_id) {
        const projectDoc = await db.collection("projects").doc(grantData.project_id).get()
        if (projectDoc.exists) {
          projectTitle = projectDoc.data()?.title
        }
      }

      // Get vote counts
      const votesSnapshot = await db.collection("votes").where("grant_id", "==", doc.id).get()

      let yesVotes = 0
      let noVotes = 0

      votesSnapshot.forEach((voteDoc) => {
        const voteData = voteDoc.data()
        if (voteData.vote_type === "yes") {
          yesVotes++
        } else if (voteData.vote_type === "no") {
          noVotes++
        }
      })

      grants.push({
        ...grantData,
        creator_username: creatorData?.username,
        creator_full_name: creatorData?.full_name,
        project_title: projectTitle,
        yes_votes: yesVotes,
        no_votes: noVotes,
        total_votes: votesSnapshot.size,
      })
    }

    return NextResponse.json(grants)
  } catch (error) {
    console.error("Error fetching grants:", error)
    return NextResponse.json({ error: "Failed to fetch grants" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, amount, organization, deadline, project_id } = await req.json()

    // Create new grant document
    const grantRef = db.collection("grants").doc()

    const grantData = {
      title,
      description,
      amount,
      organization,
      deadline: new Date(deadline),
      status: "proposal",
      created_by: session.user.id,
      project_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    // Start a batch write
    const batch = db.batch()

    // Add grant
    batch.set(grantRef, grantData)

    // Record activity
    const activityRef = db.collection("activities").doc()
    batch.set(activityRef, {
      user_id: session.user.id,
      activity_type: "grant_proposed",
      description: `Proposed grant: ${title}`,
      points: 30,
      metadata: { grant_id: grantRef.id },
      created_at: new Date(),
    })

    // Update user reputation score
    const userRef = db.collection("users").doc(session.user.id)
    const userDoc = await userRef.get()

    if (userDoc.exists) {
      const userData = userDoc.data()
      batch.update(userRef, {
        reputation_score: (userData?.reputation_score || 0) + 30,
      })
    }

    // Commit the batch
    await batch.commit()

    return NextResponse.json(
      {
        id: grantRef.id,
        ...grantData,
        created_at: grantData.created_at.toISOString(),
        updated_at: grantData.updated_at.toISOString(),
        deadline: grantData.deadline.toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating grant proposal:", error)
    return NextResponse.json({ error: "Failed to create grant proposal" }, { status: 500 })
  }
}

