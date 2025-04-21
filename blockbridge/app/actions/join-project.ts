"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { revalidatePath } from "next/cache"

export async function joinProject(projectId: string, role: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      throw new Error("Unauthorized")
    }

    // Check if the project exists
    const projectDoc = await db.collection("projects").doc(projectId).get()

    if (!projectDoc.exists) {
      throw new Error("Project not found")
    }

    // Check if the user is already a member of the project
    const membershipSnapshot = await db
      .collection("project_members")
      .where("project_id", "==", projectId)
      .where("user_id", "==", session.user.id)
      .get()

    if (!membershipSnapshot.empty) {
      throw new Error("You are already a member of this project")
    }

    // Start a batch write
    const batch = db.batch()

    // Add the user to the project
    const memberRef = db.collection("project_members").doc()
    batch.set(memberRef, {
      project_id: projectId,
      user_id: session.user.id,
      role,
      joined_at: new Date(),
    })

    // Record activity
    const activityRef = db.collection("activities").doc()
    batch.set(activityRef, {
      user_id: session.user.id,
      activity_type: "project_joined",
      description: `Joined project: ${projectDoc.data()?.title}`,
      points: 20,
      metadata: { project_id: projectId, role },
      created_at: new Date(),
    })

    // Update user reputation score
    const userRef = db.collection("users").doc(session.user.id)
    const userDoc = await userRef.get()

    if (userDoc.exists) {
      const userData = userDoc.data()
      batch.update(userRef, {
        reputation_score: (userData?.reputation_score || 0) + 20,
      })
    }

    // Commit the batch
    await batch.commit()

    // Revalidate the project page
    revalidatePath(`/projects/${projectId}`)

    return {
      success: true,
      message: "Successfully joined the project",
    }
  } catch (error) {
    console.error("Error joining project:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to join project",
    }
  }
}

