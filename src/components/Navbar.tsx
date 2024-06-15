import Image from "next/image"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { MobileNav } from "./"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-6 sm:py-4 sm:px-14 bg-dark-1">
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
      <div className="flex items-center gap-6">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
