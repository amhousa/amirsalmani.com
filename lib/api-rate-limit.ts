import { redis } from "@/lib/redis"
import { NextResponse } from "next/server"

// Configure rate limiting options
export interface RateLimitConfig {
  // Maximum number of requests within the window
  limit: number

  // Time window in seconds
  window: number

  // Identifier to use for the rate limit key
  identifier: string
}

// Rate limiter implementation
export async function rateLimiter(
  config: RateLimitConfig,
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const { limit, window, identifier } = config
  const key = `rate-limit:${identifier}`

  // Get current count and time to live
  const [count, ttl] = await Promise.all([redis.incr(key), redis.ttl(key)])

  // Set expiry on first request
  if (count === 1) {
    await redis.expire(key, window)
  }

  const reset = ttl > 0 ? ttl : window
  const remaining = Math.max(0, limit - count)
  const success = count <= limit

  return { success, limit, remaining, reset }
}

// Middleware function for API routes
export async function withRateLimit(request: Request, config: Partial<RateLimitConfig> = {}) {
  const ip = request.headers.get("x-forwarded-for") || "unknown"

  const result = await rateLimiter({
    limit: config.limit || 10,
    window: config.window || 60,
    identifier: config.identifier || `${ip}:${new URL(request.url).pathname}`,
  })

  if (!result.success) {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.reset.toString(),
        },
      },
    )
  }

  return null
}

