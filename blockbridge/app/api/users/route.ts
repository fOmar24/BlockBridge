import { type NextRequest, NextResponse } from "next/server"
import { db, convertTimestamps } from "@/lib/firebase"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const username = searchParams.get("username")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let usersQuery = db.collection("users")

    if (username) {
      usersQuery = usersQuery.where("username", "==", username)
    } else {
      usersQuery = usersQuery.orderBy("reputation_score", "desc").limit(limit).offset(offset)
    }

    const usersSnapshot = await usersQuery.get()

    if (usersSnapshot.empty) {
      return NextResponse.json([])
    }

    const users = []

    for (const doc of usersSnapshot.docs) {
      const userData = convertTimestamps(doc)

      // Get additional data if username is specified
      if (username) {
        // Get user skills
        const skillsSnapshot = await db.collection("user_skills").where("user_id", "==", doc.id).get()

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

        // Get project count
        const projectMembersSnapshot = await db.collection("project_members").where("user_id", "==", doc.id).get()

        // Get badge count
        const userBadgesSnapshot = await db.collection("user_badges").where("user_id", "==", doc.id).get()

        users.push({
          ...userData,
          skills,
          project_count: projectMembersSnapshot.size,
          badge_count: userBadgesSnapshot.size,
        })
      } else {
        // For list view, just get basic info
        const projectMembersSnapshot = await db.collection("project_members").where("user_id", "==", doc.id).get()

        users.push({
          ...userData,
          project_count: projectMembersSnapshot.size,
        })
      }
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username, full_name, bio, location } = await req.json()

    // Check if username already exists
    const existingUserSnapshot = await db.collection("users").where("username", "==", username).get()

    if (!existingUserSnapshot.empty) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Create new user document
    const userRef = db.collection("users").doc(session.user.id)

    const userData = {
      auth_id: session.user.id,
      username,
      email: session.user.email,
      full_name,
      bio,
      location,
      reputation_score: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }

    await userRef.set(userData)

    return NextResponse.json(
      {
        id: userRef.id,
        ...userData,
        created_at: userData.created_at.toISOString(),
        updated_at: userData.updated_at.toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

