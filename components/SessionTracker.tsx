"use client"

import { useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

export default function SessionTracker() {
  const pathname = usePathname()

  const updateSession = useCallback(async () => {
    try {
      // Get current session
      const response = await fetch("/api/session")

      if (!response.ok) return

      const session = await response.json()

      // Update pageViews counter
      await fetch("/api/session", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageViews: (session.pageViews || 0) + 1,
          lastPath: pathname,
        }),
      })
    } catch (error) {
      console.error("Failed to update session:", error)
    }
  }, [pathname])

  useEffect(() => {
    // Update session data when route changes
    updateSession()
  }, [updateSession])

  // This is an invisible component
  return null
}

