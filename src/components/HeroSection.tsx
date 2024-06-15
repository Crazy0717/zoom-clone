"use client"
import { useEffect, useState } from "react"

const HeroSection = () => {
  const now = new Date()
  const [currentTime, setCurrentTime] = useState(
    now.toLocaleTimeString("en-US")
  )
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US"))
    }, 1000)

    return () => clearInterval(intervalId) // cleanup interval on component unmount
  }, [])

  const currentDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now)

  return (
    <div className="w-full h-[300px] bg-hero bg-cover rounded-[20px]">
      <div className="h-full flex justify-between flex-col px-5 py-8 lg:p-11">
        <p className="py-2 glassmorphism max-w-[260px] rounded text-center text-base">
          Upcoming Meeting at: <time>12:30 PM</time>
        </p>
        <div className="flex flex-col gap-2">
          <time className="gap-2 text-4xl font-extrabold lg:text-7xl ">
            {currentTime.substring(0, 8)}
            <span className="text-2xl lg:text-4xl font-medium">
              {currentTime.substring(8, 11)}
            </span>
          </time>
          <p className="text-lg font-medium text-sky-1 lg:text-2xl">
            {currentDate}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
