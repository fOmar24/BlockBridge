import { query } from "@/lib/db"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface UserProfile {
  id: string
  skills: string[]
  interests: string[]
  location: string
  projectHistory: string[]
}

interface Opportunity {
  id: string
  type: "grant" | "project" | "job" | "mentorship"
  title: string
  description: string
  requiredSkills: string[]
  organization: string
  location: string
  remote: boolean
}

export async function findMatchingOpportunities(userId: string) {
  try {
    // Fetch user profile data
    const userResult = await query(
      `
      SELECT 
        u.id, 
        u.location,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN user_skills us ON s.id = us.skill_id 
         WHERE us.user_id = u.id) as skills,
        (SELECT json_agg(i.name) FROM interests i 
         JOIN user_interests ui ON i.id = ui.interest_id 
         WHERE ui.user_id = u.id) as interests,
        (SELECT json_agg(p.title) FROM projects p
         JOIN project_members pm ON p.id = pm.project_id
         WHERE pm.user_id = u.id) as project_history
      FROM users u
      WHERE u.id = $1
    `,
      [userId],
    )

    if (userResult.rowCount === 0) {
      throw new Error("User not found")
    }

    const userProfile: UserProfile = {
      id: userId,
      skills: userResult.rows[0].skills || [],
      interests: userResult.rows[0].interests || [],
      location: userResult.rows[0].location,
      projectHistory: userResult.rows[0].project_history || [],
    }

    // Fetch available opportunities
    const opportunitiesResult = await query(`
      SELECT 
        'grant' as type,
        g.id,
        g.title,
        g.description,
        g.organization,
        NULL as location,
        TRUE as remote,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN grant_skills gs ON s.id = gs.skill_id 
         WHERE gs.grant_id = g.id) as required_skills
      FROM grants g
      WHERE g.status = 'active'
      
      UNION ALL
      
      SELECT 
        'project' as type,
        p.id,
        p.title,
        p.description,
        u.full_name as organization,
        NULL as location,
        TRUE as remote,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN project_skills ps ON s.id = ps.skill_id 
         WHERE ps.project_id = p.id) as required_skills
      FROM projects p
      JOIN users u ON p.created_by = u.id
      WHERE p.status = 'recruiting'
      
      UNION ALL
      
      SELECT 
        'job' as type,
        j.id,
        j.title,
        j.description,
        j.company as organization,
        j.location,
        j.remote,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN job_skills js ON s.id = js.skill_id 
         WHERE js.job_id = j.id) as required_skills
      FROM jobs j
      WHERE j.status = 'open'
      
      UNION ALL
      
      SELECT 
        'mentorship' as type,
        m.id,
        m.title,
        m.description,
        u.full_name as organization,
        NULL as location,
        TRUE as remote,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN mentorship_skills ms ON s.id = ms.skill_id 
         WHERE ms.mentorship_id = m.id) as required_skills
      FROM mentorships m
      JOIN users u ON m.mentor_id = u.id
      WHERE m.status = 'available'
    `)

    const opportunities: Opportunity[] = opportunitiesResult.rows.map((row) => ({
      id: row.id,
      type: row.type,
      title: row.title,
      description: row.description,
      requiredSkills: row.required_skills || [],
      organization: row.organization,
      location: row.location,
      remote: row.remote,
    }))

    // Use AI to find the best matches
    const matches = await rankOpportunitiesWithAI(userProfile, opportunities)

    return matches
  } catch (error) {
    console.error("Error finding matching opportunities:", error)
    throw error
  }
}

async function rankOpportunitiesWithAI(userProfile: UserProfile, opportunities: Opportunity[]) {
  try {
    // Prepare the prompt for the AI
    const prompt = `
      I need to match a user with relevant opportunities based on their profile and available opportunities.
      
      User Profile:
      - Skills: ${userProfile.skills.join(", ")}
      - Interests: ${userProfile.interests.join(", ")}
      - Location: ${userProfile.location}
      - Project History: ${userProfile.projectHistory.join(", ")}
      
      Available Opportunities:
      ${opportunities
        .map(
          (opp, index) => `
        ${index + 1}. ${opp.title} (${opp.type})
        - Description: ${opp.description}
        - Required Skills: ${opp.requiredSkills.join(", ")}
        - Organization: ${opp.organization}
        - Location: ${opp.location || "Remote"}
        - ID: ${opp.id}
      `,
        )
        .join("\n")}
      
      Please analyze the user profile and opportunities, then return a JSON array of the top 10 most relevant opportunities for this user.
      Each item should include the opportunity ID, a relevance score from 0-100, and a brief explanation of why it's a good match.
      Format your response as valid JSON only, with no additional text.
    `

    // Call the AI model
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.2,
    })

    // Parse the AI response
    const aiResponse = JSON.parse(text)

    // Map the AI rankings back to the full opportunity objects
    const rankedOpportunities = aiResponse.map((match: any) => {
      const opportunity = opportunities.find((opp) => opp.id === match.id)
      return {
        ...opportunity,
        relevanceScore: match.relevanceScore,
        matchReason: match.explanation,
      }
    })

    return rankedOpportunities
  } catch (error) {
    console.error("Error ranking opportunities with AI:", error)
    // Fallback to a simple matching algorithm if AI fails
    return simpleOpportunityMatching(userProfile, opportunities)
  }
}

function simpleOpportunityMatching(userProfile: UserProfile, opportunities: Opportunity[]) {
  // Simple matching algorithm based on skill overlap
  return opportunities
    .map((opportunity) => {
      const skillOverlap = opportunity.requiredSkills.filter((skill) => userProfile.skills.includes(skill)).length

      const relevanceScore = Math.min(
        100,
        Math.round((skillOverlap / Math.max(1, opportunity.requiredSkills.length)) * 100),
      )

      return {
        ...opportunity,
        relevanceScore,
        matchReason: `You have ${skillOverlap} of the ${opportunity.requiredSkills.length} required skills.`,
      }
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10)
}

