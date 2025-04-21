import { query } from "@/lib/db"
import { invalidateLeaderboardCache } from "@/lib/services/leaderboard-service"

export async function updateLeaderboard() {
  try {
    console.log("Starting leaderboard update...")

    // Start a transaction
    await query("BEGIN")

    // Update user reputation scores based on recent activity
    await query(`
      UPDATE users u
      SET reputation_score = (
        -- Base score from activities
        (SELECT COALESCE(SUM(points), 0) FROM activities WHERE user_id = u.id) +
        
        -- Bonus for project leadership
        (SELECT COUNT(*) * 100 FROM project_members 
         WHERE user_id = u.id AND role = 'Lead') +
        
        -- Bonus for skill endorsements
        (SELECT COALESCE(SUM(endorsement_count), 0) FROM user_skills 
         WHERE user_id = u.id) +
        
        -- Bonus for badges
        (SELECT COUNT(*) * 50 FROM user_badges 
         WHERE user_id = u.id) +
        
        -- Bonus for approved grants
        (SELECT COUNT(*) * 200 FROM grants 
         WHERE created_by = u.id AND status = 'approved')
      )
    `)

    // Update project impact scores
    await query(`
      UPDATE projects p
      SET impact_score = (
        -- Base score from progress
        (p.progress * 10) +
        
        -- Bonus for team size
        (SELECT COUNT(*) * 20 FROM project_members 
         WHERE project_id = p.id) +
        
        -- Bonus for activity
        (SELECT COUNT(*) * 5 FROM activities 
         WHERE metadata->>'project_id' = p.id::text) +
        
        -- Bonus for grants received
        (SELECT COALESCE(SUM(amount), 0) * 0.1 FROM grants 
         WHERE project_id = p.id AND status = 'approved')
      )
    `)

    // Commit the transaction
    await query("COMMIT")

    // Invalidate the leaderboard cache
    await invalidateLeaderboardCache()

    console.log("Leaderboard update completed successfully")
    return { success: true }
  } catch (error) {
    // Rollback in case of error
    await query("ROLLBACK")
    console.error("Error updating leaderboard:", error)
    return { success: false, error }
  }
}

