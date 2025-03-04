import Image from "next/image"

interface ProfilePhotoProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export function ProfilePhoto({ src, alt, size = 200, className = "" }: ProfilePhotoProps) {
  return (
    <div className={`photo-container ${className}`} style={{ width: size, height: size }}>
      <div className="rotating-circle"></div>
      <div className="photo-glow"></div>
      <Image
        src={src || "/images/about/me.webp"}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover border-2 border-brand-primary/30"
        priority
      />
    </div>
  )
}

