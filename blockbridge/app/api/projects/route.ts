import { type NextRequest, NextResponse } from "next/server"
import { db, convertTimestamps } from "@/lib/firebase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let projectsQuery = db.collection("projects")

    // Apply filters
    if (status) {
      projectsQuery = projectsQuery.where("status", "==", status)
    }

    // Order by created_at
    projectsQuery = projectsQuery.orderBy("created_at", "desc")

    // Apply pagination
    // Note: Firestore doesn't support offset directly, so we need to use startAfter
    // For simplicity, we'll just limit the results here
    projectsQuery = projectsQuery.limit(limit)

    const projectsSnapshot = await projectsQuery.get()

    const projects = []

    for (const doc of projectsSnapshot.docs) {
      const projectData = convertTimestamps(doc)

      // If userId filter is applied, check if user is a member
      if (userId) {
        const memberSnapshot = await db
          .collection("project_members")
          .where("project_id", "==", doc.id)
          .where("user_id", "==", userId)
          .get()

        if (memberSnapshot.empty) {
          continue // Skip this project if user is not a member
        }
      }

      // Get creator details
      const creatorDoc = await db.collection("users").doc(projectData.created_by).get()
      const creatorData = creatorDoc.exists ? convertTimestamps(creatorDoc) : null

      // Get member count
      const membersSnapshot = await db.collection("project_members").where("project_id", "==", doc.id).get()

      // Get project skills
      const skillsSnapshot = await db.collection("project_skills").where("project_id", "==", doc.id).get()

      const skills = []
      for (const skillDoc of skillsSnapshot.docs) {
        const skillData = convertTimestamps(skillDoc)

        // Get skill details
        const skillDetailDoc = await db.collection("skills").doc(skillData.skill_id).get()

        if (skillDetailDoc.exists) {
          skills.push(convertTimestamps(skillDetailDoc))
        }
      }

      projects.push({
        ...projectData,
        creator_username: creatorData?.username,
        creator_full_name: creatorData?.full_name,
        member_count: membersSnapshot.size,
        skills,
      })
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, skills } = await req.json()

    // Create new project document
    const projectRef = db.collection("projects").doc()

    const projectData = {
      title,
      description,
      status: "active",
      progress: 0,
      created_by: session.user.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    // Start a batch write
    const batch = db.batch()

    // Add project
    batch.set(projectRef, projectData)

    // Add creator as project member with role "Lead"
    const memberRef = db.collection("project_members").doc()
    batch.set(memberRef, {
      project_id: projectRef.id,
      user_id: session.user.id,
      role: "Lead",
      joined_at: new Date(),
    })

    // Add project skills if provided
    if (skills && skills.length > 0) {
      for (const skillId of skills) {
        const skillRef = db.collection("project_skills").doc()
        batch.set(skillRef, {
          project_id: projectRef.id,
          skill_id: skillId,
        })
      }
    }

    // Record activity
    const activityRef = db.collection("activities").doc()
    batch.set(activityRef, {
      user_id: session.user.id,
      activity_type: "project_created",
      description: `Created project: ${title}`,
      points: 50,
      metadata: { project_id: projectRef.id },
      created_at: new Date(),
    })

    // Update user reputation score
    const userRef = db.collection("users").doc(session.user.id)
    const userDoc = await userRef.get()

    if (userDoc.exists) {
      const userData = userDoc.data()
      batch.update(userRef, {
        reputation_score: (userData?.reputation_score || 0) + 50,
      })
    }

    // Commit the batch
    await batch.commit()

    return NextResponse.json(
      {
        id: projectRef.id,
        ...projectData,
        created_at: projectData.created_at.toISOString(),
        updated_at: projectData.updated_at.toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

