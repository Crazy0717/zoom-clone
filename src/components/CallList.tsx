// @ts-nocheck
"use client"
import { useGetCallS } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import MeetingCard from "./ui/MeetingCard"
import Loader from "./Loader"
import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"

interface propsTypes {
  type: "ended" | "upcoming" | "recordings"
}

const CallList = ({ type }: propsTypes) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCallS()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls
      case "recordings":
        return recordings
      case "upcoming":
        return upcomingCalls
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls"
      case "upcoming":
        return "No Upcoming Calls"
      case "recordings":
        return "No Recordings"
      default:
        return ""
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        )
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings)

        setRecordings(recordings)
      } catch (error) {
        toast({ title: "Try again later" })
      }
    }
    if (type === "recordings") fetchRecordings()
  }, [type, callRecordings])

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  if (isLoading) return <Loader />
  return (
    <div className="grid col-span-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/upcoming.svg"
                : "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings"
            }
            title={
              (meeting as Call).state?.custom.description ||
              meeting?.filename ||
              "Personal meeting"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              meeting?.start_time.substring(0, 10) +
                " " +
                meeting?.start_time.substring(11, 16) ||
              "undefind date"
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
            link={
              type === "recordings"
                ? (meeting as Call).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`
            }
            members={
              type === "recordings"
                ? []
                : [
                    meeting.clientStore?.connectedUserSubject._value.image,
                    ...meeting.state?.members$.source._value,
                  ]
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList
