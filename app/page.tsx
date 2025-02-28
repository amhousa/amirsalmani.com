import Image from "next/image"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center p-4 text-center z-20">
        <Image
          src="/images/about/me.webp"
          alt="امیرحسین سلمانی"
          width={150}
          height={150}
          className="rounded-full mb-4 object-cover"
          priority
        />
        <h1 className="text-4xl font-bold mb-2 text-brand-purple">امیرحسین سلمانی</h1>
        <p className="text-xl mb-4 text-default">توسعه‌دهنده فول‌استک، خراسان شمالی</p>
        <p className="mb-4 max-w-md text-default">
          به وبسایت شخصی من خوش آمدید. من یک توسعه‌دهنده با تجربه در زمینه‌های مختلف وب و موبایل هستم.
        </p>
        <Link
          href="/portfolio"
          className="bg-brand-purple text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors mb-4"
        >
          مشاهده نمونه کارها
        </Link>

        {/* Technology Logos Section */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* v0.dev Logo */}
            <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/v0.svg"
                alt="Built with v0.dev"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Vercel Logo */}
            <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/vercel.svg"
                alt="Deployed on Vercel"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* GitHub Logo */}
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/github.svg"
                alt="Source on GitHub"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Next.js Logo */}
            <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src="/images/tech/nextjs.svg"
                alt="Built with Next.js"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
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

