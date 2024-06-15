"use client"
import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react"

interface paramsTypes {
  params: {
    id: string
  }
}

const Meeting = ({ params: { id } }: paramsTypes) => {
  const { user, isLoaded } = useUser()
  const [isSetupCompleted, setIsSetupCompleted] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (isCallLoading) return <Loader />

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    )

  return (
    <div className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default Meeting
