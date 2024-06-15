"use client"
import { sideBarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <div className="p-6 w-fit sticky left-0 top-0 flex justify-start flex-col bg-dark-1 text-white max-sm:hidden lg:w-[264px]">
      <div className="h-full flex flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive = pathname === link.route
          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                "p-4 flex gap-4 items-center justify-start rounded-lg",
                { "bg-blue-1": isActive }
              )}
            >
              <Image src={link.icon} alt={link.label} width={24} height={24} />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
