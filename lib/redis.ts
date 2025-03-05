import { createClient } from "redis"

// Create Redis client singleton
let redisClient: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
  if (!redisClient) {
    // Create a new Redis client
    redisClient = createClient({
      url: process.env.REDIS_URL,
    })

    // Set up error handling
    redisClient.on("error", (err) => {
      console.error("Redis client error:", err)
      redisClient = null
    })

    // Connect to Redis
    await redisClient.connect()
  }

  return redisClient
}

// Helper functions for common Redis operations
export async function redisSet(key: string, value: any, options?: { ex?: number }) {
  const client = await getRedisClient()

  if (options?.ex) {
    return client.set(key, JSON.stringify(value), { EX: options.ex })
  }

  return client.set(key, JSON.stringify(value))
}

export async function redisGet(key: string) {
  const client = await getRedisClient()
  const value = await client.get(key)

  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export async function redisDelete(key: string) {
  const client = await getRedisClient()
  return client.del(key)
}

export async function redisIncr(key: string) {
  const client = await getRedisClient()
  return client.incr(key)
}

export async function redisTtl(key: string) {
  const client = await getRedisClient()
  return client.ttl(key)
}

export async function redisExpire(key: string, seconds: number) {
  const client = await getRedisClient()
  return client.expire(key, seconds)
}

