import { Redis } from "@upstash/redis"

// Create and export a Redis client instance
export const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
})

