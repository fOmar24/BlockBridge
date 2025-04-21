import { query } from "@/lib/db"
import { redis } from "@/lib/db"

// Cache keys
const TOP_USERS_CACHE_KEY = "leaderboard:top_users"
const TOP_PROJECTS_CACHE_KEY = "leaderboard:top_projects"
const TOP_COUNTRIES_CACHE_KEY = "leaderboard:top_countries"
const CACHE_TTL = 3600 // 1 hour in seconds

export async function getTopUsers(limit = 100) {
  try {
    // Try to get from cache first
    const cachedData = await redis.get(TOP_USERS_CACHE_KEY)

    if (cachedData) {
      return JSON.parse(cachedData)
    }

    // If not in cache, fetch from database
    const result = await query(
      `
      SELECT 
        u.id, 
        u.username, 
        u.full_name, 
        u.location, 
        u.profile_image_url, 
        u.reputation_score,
        (SELECT COUNT(*) FROM project_members pm WHERE pm.user_id = u.id) as project_count,
        (SELECT COUNT(*) FROM user_badges ub WHERE ub.user_id = u.id) as badge_count,
        (SELECT json_agg(s.name) FROM skills s 
         JOIN user_skills us ON s.id = us.skill_id 
         WHERE us.user_id = u.id
         ORDER BY us.endorsement_count DESC
         LIMIT 3) as top_skills
      FROM users u
      ORDER BY u.reputation_score DESC
      LIMIT $1
    `,
      [limit],
    )

    const users = result.rows

    // Cache the results
    await redis.set(TOP_USERS_CACHE_KEY, JSON.stringify(users), { ex: CACHE_TTL })

    return users
  } catch (error) {
    console.error("Error fetching top users:", error)
    throw error
  }
}

export async function getTopProjects(limit = 50) {
  try {
    // Try to get from cache first
    const cachedData = await redis.get(TOP_PROJECTS_CACHE_KEY)

    if (cachedData) {
      return JSON.parse(cachedData)
    }

    // If not in cache, fetch from database
    const result = await query(
      `
      SELECT 
        p.id, 
        p.title, 
        p.description, 
        p.status, 
        p.progress,
        u.username as team_lead_username,
        u.full_name as team_lead_name,
        (SELECT COUNT(*) FROM project_members pm WHERE pm.project_id = p.id) as team_size,
        (SELECT 
          CASE 
            WHEN p.status = 'completed' THEN p.progress * 10
            ELSE (p.progress * 5) + (SELECT COUNT(*) FROM activities a WHERE a.metadata->>'project_id' = p.id::text) * 2
          END
        ) as impact_score
      FROM projects p
      JOIN project_members pm ON p.id = pm.project_id AND pm.role = 'Lead'
      JOIN users u ON pm.user_id = u.id
      ORDER BY impact_score DESC
      LIMIT $1
    `,
      [limit],
    )

    const projects = result.rows

    // Cache the results
    await redis.set(TOP_PROJECTS_CACHE_KEY, JSON.stringify(projects), { ex: CACHE_TTL })

    return projects
  } catch (error) {
    console.error("Error fetching top projects:", error)
    throw error
  }
}

export async function getTopCountries(limit = 20) {
  try {
    // Try to get from cache first
    const cachedData = await redis.get(TOP_COUNTRIES_CACHE_KEY)

    if (cachedData) {
      return JSON.parse(cachedData)
    }

    // If not in cache, fetch from database
    const result = await query(
      `
      SELECT 
        c.name, 
        c.code,
        COUNT(DISTINCT u.id) as user_count,
        (SELECT COUNT(*) FROM projects p 
         JOIN project_members pm ON p.id = pm.project_id AND pm.role = 'Lead'
         JOIN users u2 ON pm.user_id = u2.id
         WHERE u2.location LIKE '%' || c.name || '%') as project_count,
        (SELECT SUM(g.amount) FROM grants g
         JOIN users u3 ON g.created_by = u3.id
         WHERE g.status = 'approved' AND u3.location LIKE '%' || c.name || '%') as total_funding
      FROM countries c
      JOIN users u ON u.location LIKE '%' || c.name || '%'
      GROUP BY c.name, c.code
      ORDER BY user_count DESC
      LIMIT $1
    `,
      [limit],
    )

    const countries = result.rows

    // Cache the results
    await redis.set(TOP_COUNTRIES_CACHE_KEY, JSON.stringify(countries), { ex: CACHE_TTL })

    return countries
  } catch (error) {
    console.error("Error fetching top countries:", error)
    throw error
  }
}

export async function invalidateLeaderboardCache() {
  try {
    await redis.del(TOP_USERS_CACHE_KEY)
    await redis.del(TOP_PROJECTS_CACHE_KEY)
    await redis.del(TOP_COUNTRIES_CACHE_KEY)
  } catch (error) {
    console.error("Error invalidating leaderboard cache:", error)
  }
}

