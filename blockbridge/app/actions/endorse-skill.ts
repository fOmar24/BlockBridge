"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { revalidatePath } from "next/cache"

export async function endorseSkill(userId: string, skillId: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      throw new Error("Unauthorized")
    }

    // Check if the user is trying to endorse themselves
    if (session.user.id === userId) {
      throw new Error("Cannot endorse your own skills")
    }

    // Check if the user has the skill
    const userSkillsSnapshot = await db
      .collection("user_skills")
      .where("user_id", "==", userId)
      .where("skill_id", "==", skillId)
      .get()

    if (userSkillsSnapshot.empty) {
      throw new Error("User does not have this skill")
    }

    // Check if the current user has already endorsed this skill
    const endorsementsSnapshot = await db
      .collection("skill_endorsements")
      .where("endorser_id", "==", session.user.id)
      .where("user_id", "==", userId)
      .where("skill_id", "==", skillId)
      .get()

    if (!endorsementsSnapshot.empty) {
      throw new Error("You have already endorsed this skill")
    }

    // Start a batch write
    const batch = db.batch()

    // Create the endorsement
    const endorsementRef = db.collection("skill_endorsements").doc()
    batch.set(endorsementRef, {
      endorser_id: session.user.id,
      user_id: userId,
      skill_id: skillId,
      created_at: new Date(),
    })

    // Update the endorsement count
    const userSkillDoc = userSkillsSnapshot.docs[0]
    const userSkillData = userSkillDoc.data()

    batch.update(userSkillDoc.ref, {
      endorsement_count: (userSkillData.endorsement_count || 0) + 1,
    })

    // Record activity for the endorser
    const endorserActivityRef = db.collection("activities").doc()
    batch.set(endorserActivityRef, {
      user_id: session.user.id,
      activity_type: "skill_endorsed",
      description: "Endorsed a skill",
      points: 5,
      metadata: { target_user_id: userId, skill_id: skillId },
      created_at: new Date(),
    })

    // Record activity for the endorsed user
    const endorsedActivityRef = db.collection("activities").doc()
    batch.set(endorsedActivityRef, {
      user_id: userId,
      activity_type: "skill_received_endorsement",
      description: "Received skill endorsement",
      points: 10,
      metadata: { from_user_id: session.user.id, skill_id: skillId },
      created_at: new Date(),
    })

    // Update user reputation score
    const userRef = db.collection("users").doc(userId)
    const userDoc = await userRef.get()

    if (userDoc.exists) {
      const userData = userDoc.data()
      batch.update(userRef, {
        reputation_score: (userData?.reputation_score || 0) + 10,
      })
    }

    // Commit the batch
    await batch.commit()

    // Revalidate the user's profile page
    revalidatePath(`/profile/${userId}`)

    return {
      success: true,
      message: "Skill endorsed successfully",
    }
  } catch (error) {
    console.error("Error endorsing skill:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to endorse skill",
    }
  }
}

