import Image from "next/image"
import { Code, FileJson, Atom, Server, Database, Boxes, GitBranch, Cloud } from "lucide-react"

const skills = [
  { name: "JavaScript", level: 90, icon: Code },
  { name: "TypeScript", level: 85, icon: FileJson },
  { name: "React", level: 95, icon: Atom },
  { name: "Node.js", level: 80, icon: Server },
  { name: "GraphQL", level: 75, icon: Database },
  { name: "MongoDB", level: 70, icon: Database },
  { name: "PostgreSQL", level: 75, icon: Database },
  { name: "Docker", level: 65, icon: Boxes },
  { name: "Git", level: 85, icon: GitBranch },
  { name: "AWS", level: 70, icon: Cloud },
]

export default function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary">درباره من</h1>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
        <div className="w-full md:w-auto">
          <Image
            src="/images/about/me2.webp"
            alt="امیرحسین سلمانی"
            width={300}
            height={300}
            className="rounded-lg w-full md:w-[300px] h-auto object-cover"
            priority
          />
        </div>
        <div>
          <p className="mb-4 text-default">
            سلام! من امیرحسین سلمانی هستم، یک توسعه‌دهنده فول‌استک با بیش از 5 سال تجربه در ساخت اپلیکیشن‌های وب و موبایل.
          </p>
          <p className="mb-4 text-default">
            تخصص من در استفاده از تکنولوژی‌های مدرن مانند React، Node.js، و TypeScript است. همچنین تجربه کار با پایگاه‌های
            داده مختلف و طراحی API را دارم.
          </p>
          <p className="mb-4 text-default">
            من عاشق یادگیری تکنولوژی‌های جدید و به اشتراک گذاشتن دانش خود با دیگران هستم. در وقت آزاد خود، در پروژه‌های
            متن باز مشارکت می‌کنم و مقالات آموزشی می‌نویسم.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4 text-brand-primary">مهارت‌ها</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mr-4">
                  <skill.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-default">{skill.name}</span>
                    <span className="text-brand-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: "0 0 10px rgba(0, 220, 130, 0.5)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

