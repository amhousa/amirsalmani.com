import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json()
  const { serviceType, email, name, phoneNumber, details } = body

  try {
    // Get user session if exists
    const {
      data: { session },
    } = await supabase.auth.getSession()
    let userId = session?.user?.id

    // If no session, check if user exists by email
    if (!userId && email) {
      const { data: existingUser } = await supabase.from("profiles").select("id").eq("email", email).single()

      if (existingUser) {
        userId = existingUser.id
      } else {
        // Create new user profile
        const { data: newUser, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              email,
              phone: phoneNumber,
              full_name: name,
            },
          ])
          .select()
          .single()

        if (createError) throw createError
        userId = newUser.id
      }
    }

    // Store service request in database
    const { error: serviceError } = await supabase.from("services").insert([
      {
        user_id: userId,
        service_type: serviceType,
        email,
        name,
        phone_number: phoneNumber,
        details,
        status: "pending",
      },
    ])

    if (serviceError) throw serviceError

    return NextResponse.json({
      message: "Service request submitted successfully",
      userId,
    })
  } catch (error) {
    console.error("Service request error:", error)
    return NextResponse.json({ error: "Failed to submit service request" }, { status: 500 })
  }
}

