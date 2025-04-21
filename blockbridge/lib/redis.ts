import { Redis } from "@upstash/redis"

// Redis connection for caching and real-time features
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

