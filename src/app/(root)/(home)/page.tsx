import { MeetingTypeList } from "@/components"
import HeroSection from "@/components/HeroSection"

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-4 text-white">
      <HeroSection />
      <MeetingTypeList />
    </section>
  )
}

export default Home
