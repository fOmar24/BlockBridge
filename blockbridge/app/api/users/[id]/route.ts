import { type NextRequest, NextResponse } from "next/server"
import { db, convertTimestamps } from "@/lib/firebase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    // Get user document
    const userDoc = await db.collection("users").doc(userId).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userData = convertTimestamps(userDoc)

    // Get user skills
    const skillsSnapshot = await db.collection("user_skills").where("user_id", "==", userId).get()

    const skills = []
    for (const skillDoc of skillsSnapshot.docs) {
      const skillData = convertTimestamps(skillDoc)

      // Get skill details
      const skillDetailDoc = await db.collection("skills").doc(skillData.skill_id).get()

      if (skillDetailDoc.exists) {
        skills.push({
          ...convertTimestamps(skillDetailDoc),
          endorsement_count: skillData.endorsement_count,
          is_verified: skillData.is_verified,
        })
      }
    }

    // Get user projects
    const projectMembersSnapshot = await db.collection("project_members").where("user_id", "==", userId).get()

    const projects = []
    for (const memberDoc of projectMembersSnapshot.docs) {
      const memberData = convertTimestamps(memberDoc)

      // Get project details
      const projectDoc = await db.collection("projects").doc(memberData.project_id).get()

      if (projectDoc.exists) {
        projects.push({
          ...convertTimestamps(projectDoc),
          role: memberData.role,
        })
      }
    }

    // Get user badges
    const userBadgesSnapshot = await db.collection("user_badges").where("user_id", "==", userId).get()

    const badges = []
    for (const badgeDoc of userBadgesSnapshot.docs) {
      const badgeData = convertTimestamps(badgeDoc)

      // Get badge details
      const badgeDetailDoc = await db.collection("badges").doc(badgeData.badge_id).get()

      if (badgeDetailDoc.exists) {
        badges.push({
          ...convertTimestamps(badgeDetailDoc),
          awarded_at: badgeData.awarded_at,
        })
      }
    }

    // Get user credentials
    const credentialsSnapshot = await db.collection("credentials").where("user_id", "==", userId).get()

    const credentials = credentialsSnapshot.docs.map((doc) => convertTimestamps(doc))

    // Get recent activities
    const activitiesSnapshot = await db
      .collection("activities")
      .where("user_id", "==", userId)
      .orderBy("created_at", "desc")
      .limit(10)
      .get()

    const recent_activities = activitiesSnapshot.docs.map((doc) => convertTimestamps(doc))

    return NextResponse.json({
      ...userData,
      skills,
      projects,
      badges,
      credentials,
      recent_activities,
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = params.id

    if (!session || !session.user || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { full_name, bio, location, profile_image_url } = await req.json()

    // Get user document
    const userDoc = await db.collection("users").doc(userId).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user document
    const updateData: any = {
      updated_at: new Date(),
    }

    if (full_name !== undefined) updateData.full_name = full_name
    if (bio !== undefined) updateData.bio = bio
    if (location !== undefined) updateData.location = location
    if (profile_image_url !== undefined) updateData.profile_image_url = profile_image_url

    await db.collection("users").doc(userId).update(updateData)

    // Get updated user document
    const updatedUserDoc = await db.collection("users").doc(userId).get()

    return NextResponse.json(convertTimestamps(updatedUserDoc))
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

