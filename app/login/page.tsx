import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import LoginClient from "./LoginClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ورود | امیرحسین سلمانی",
  description: "ورود به حساب کاربری با استفاده از شماره موبایل",
}

export default async function Login() {
  const supabase = createServerClient()

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    // Redirect to dashboard if already authenticated
    redirect("/dashboard")
  }

  return <LoginClient />
}

