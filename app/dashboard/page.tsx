import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import DashboardClient from "./DashboardClient"

export default async function Dashboard() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user data
  const { data: userData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Fetch user's orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  // Fetch user's meetings
  const { data: meetings } = await supabase
    .from("meetings")
    .select("*")
    .eq("user_id", session.user.id)
    .order("meeting_date", { ascending: true })

  // Fetch user's consultations
  const { data: consultations } = await supabase
    .from("consultations")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  // Fetch user's services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  // Fetch user's payment history
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <DashboardClient
      user={userData || {}}
      orders={orders || []}
      meetings={meetings || []}
      consultations={consultations || []}
      services={services || []}
      payments={payments || []}
    />
  )
}

