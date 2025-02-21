import Image from "next/image"
import Link from "next/link"
// import Snowfall from "@/components/Snowfall"
import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* <Snowfall /> */}
      <div className="flex flex-col items-center justify-center p-4 text-center z-20">
        <Image
          src="/images/about/me.svg"
          alt="امیرحسین سلمانی"
          width={150}
          height={150}
          className="rounded-full mb-4 object-cover"
        />
        <h1 className="text-4xl font-bold mb-2 text-brand-purple">امیرحسین سلمانی</h1>
        <p className="text-xl mb-6 text-default">توسعه‌دهنده فول‌استک، خراسان 🇳🇱</p>
        <p className="mb-8 max-w-md text-default">
          به وبسایت شخصی من خوش آمدید. من یک توسعه‌دهنده با تجربه در زمینه‌های مختلف وب و موبایل هستم.
        </p>
        <Link
          href="/portfolio"
          className="bg-brand-purple text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors"
        >
          مشاهده نمونه کارها
        </Link>
      </div>
      <Analytics/>
      {/* <SpeedInsights/> */}
    </div>
  )
}

