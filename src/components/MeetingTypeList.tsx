"use client"
import { useState } from "react"
import HomeCard from "./ui/homeCard"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import DatePicker from "react-datepicker"

const MeetingTypeList = () => {
  const router = useRouter()
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!user || !client) return

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" })
        return
      }
      const call = client.call("default", crypto.randomUUID())
      if (!call) throw new Error("failed to create call")

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant meeting"
      await call.getOrCreate({
        data: { starts_at: startsAt, custom: { description } },
      })

      setCallDetails(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: "Meeting Created" })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting",
      })
    }
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        iconUrl="/icons/add-meeting.svg"
        title="New Meeting"
        description="Setup a new recording"
        className="bg-orange-1"
        handleClick={() => setMeeting("isInstantMeeting")}
      />
      <HomeCard
        iconUrl="/icons/user-add.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeeting("isJoiningMeeting")}
      />
      <HomeCard
        iconUrl="/icons/calendar.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeeting("isScheduleMeeting")}
      />
      <HomeCard
        iconUrl="/icons/video.svg"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meeting === "isScheduleMeeting"}
          onClose={() => setMeeting(undefined)}
          handleClick={createMeeting}
          title="Create meeting"
          buttonText="Start Meeting"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <div className="w-full flex flex-col gap-2.5">
              <label className="text-base leading-[22px] text-sky-2">
                Select date and time
              </label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meeting === "isScheduleMeeting"}
          onClose={() => setMeeting(undefined)}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink),
              toast({ title: "Link copied" })
          }}
          title="Meeting created"
          buttonText="Copy Meeting Link"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meeting === "isInstantMeeting"}
        onClose={() => setMeeting(undefined)}
        handleClick={createMeeting}
        title="Start an instant meeting"
        buttonText="Start Meeting"
      />
      <MeetingModal
        isOpen={meeting === "isJoiningMeeting"}
        onClose={() => setMeeting(undefined)}
        handleClick={() => router.push(values.link)}
        title="Type the link here"
        buttonText="Join Meeting"
      >
        <Textarea
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
