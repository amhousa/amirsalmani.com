import Image from "next/image"
import Link from "next/link"
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
import ProfilePhoto from "@/components/ProfilePhoto"
import GitHubButton from "@/components/GitHubButton"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function EnglishHome() {
  return (
    <div dir="ltr" className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Add the GitHub button only on the main page */}
      <GitHubButton />

      {/* Add the Language Switcher */}
      <LanguageSwitcher />

      <div className="z-20 flex flex-col items-center justify-center p-4 text-center">
        <ProfilePhoto src="/images/about/me.webp" alt="Amirhossein Salmani" size={150} className="mb-4" />
        <h1 className="mb-2 text-4xl font-bold text-brand-primary">Amirhossein Salmani</h1>
        <p className="mb-4 text-xl text-default">Full-Stack Developer and AI Specialist</p>
        <p className="mb-4 max-w-md text-default text-justify">
        I help businesses stand out from their competition by building smart and fast web applications. By combining modern coding with the power of artificial intelligence, I turn your ideas into powerful and user-friendly digital products.
        </p>
        <Link
          href="/portfolio"
          className="mb-4 bg-brand-purple px-8 py-3 text-white transition-colors hover:bg-opacity-90 rounded-full object-cover border-2 border-brand-primary/30"
        >
          My Successful Projects
        </Link>

        {/* Technology Logos Section */}
        <div className="flex items-center justify-center gap-6">
          <p className="max-w-md text-sm">Tech Stack:</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* GitHub Logo */}
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/github.svg"
                alt="Source on GitHub"
                width={24}
                height={24}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </Link>

            {/* Next.js Logo */}
            <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/nextjs.svg"
                alt="Built with Next.js"
                width={24}
                height={24}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </Link>

            {/* Vercel Logo */}
            <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/vercel.svg"
                alt="Deployed on Vercel"
                width={24}
                height={24}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </Link>

            {/* Supabase Logo */}
            <Link href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/supabase.svg"
                alt="Powered by Supabase"
                width={24}
                height={24}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </Link>

            {/* Tailwind CSS Logo */}
            <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/tailwindcss.svg"
                alt="Styled with Tailwind CSS"
                width={24}
                height={24}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* <Analytics />
      <SpeedInsights /> */}
    </div>
  )
}
