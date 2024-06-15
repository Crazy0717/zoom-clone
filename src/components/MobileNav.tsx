"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sideBarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="text-white size cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full max-w-[270px] bg-dark-1 border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image
              className="max-sm:size-10"
              src="/icons/logo.svg"
              alt="logo"
              width={32}
              height={32}
            />
            <p className="text-[26px] text-white font-extrabold max-sm:hidden">
              Voom
            </p>
          </Link>
          <section className="h-full flex flex-col gap-6 pt-16 text-white">
            {sideBarLinks.map((link) => {
              const isActive = pathname === link.route
              return (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.route}
                    className={cn(
                      "p-4 flex gap-4 items-center w-full w-max-60 rounded-lg",
                      { "bg-blue-1": isActive }
                    )}
                  >
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">{link.label}</p>
                  </Link>
                </SheetClose>
              )
            })}
          </section>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
