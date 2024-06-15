import { Navbar, Sidebar } from "@/components"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Voom",
  description: "video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
}

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="main_wrapper relative flex flex-col h-screen">
      <Navbar />
      <div className="flex overflow-y-scroll">
        <Sidebar />
        <section className="h-auto flex flex-1 overflow-y-scroll bg-dark-2 rounded-md flex-col px-2 pb-6 pt-6 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout
