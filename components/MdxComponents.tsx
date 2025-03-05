import Link from "next/link"
import ScanningImage from "./ScanningImage"
import ServiceAdvertisement from "./ServiceAdvertisement"

export const mdxComponents = {
  // Basic elements
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6 text-brand-primary" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mb-4 text-brand-primary" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mb-3 text-brand-primary" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mb-2 text-brand-primary" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  a: (props: any) => (
    <Link href={props.href} className="text-brand-primary hover:text-brand-primary/80 underline">
      {props.children}
    </Link>
  ),
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => <blockquote className="border-r-4 border-brand-primary pr-4 italic my-4" {...props} />,
  hr: () => <hr className="my-8 border-gray-700" />,

  // Custom components
  img: (props: any) => <ScanningImage src={props.src} alt={props.alt || ""} className="my-6" />,

  // Service advertisement
  ServiceAd: () => <ServiceAdvertisement />,
}

