import Image from "next/image"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ProfilePhoto from "@/components/ProfilePhoto"
import GitHubButton from "@/components/GitHubButton"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function EnglishHome() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Add the GitHub button only on the main page */}
      <GitHubButton />

      {/* Add the Language Switcher */}
      <LanguageSwitcher />

      <div className="z-20 flex flex-col items-center justify-center p-4 text-center">
        <ProfilePhoto src="/images/about/me.webp" alt="Amirhossein Salmani" size={150} className="mb-4" />
        <h1 className="mb-2 text-4xl font-bold text-brand-purple">Amirhossein Salmani</h1>
        <p className="mb-4 text-xl text-default">Full Stack Developer, Tehran</p>
        <p className="mb-4 max-w-md text-default">
          Welcome to my personal website. I am an experienced developer in various web and mobile technologies.
        </p>
        <Link
          href="/en/portfolio"
          className="mb-4 rounded-full bg-brand-purple px-8 py-3 text-white transition-colors hover:bg-opacity-90"
        >
          View Portfolio
        </Link>

        {/* Technology Logos Section */}
        <div className="flex items-center justify-center gap-6">
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
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
