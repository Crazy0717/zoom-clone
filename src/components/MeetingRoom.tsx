import { cn } from "@/lib/utils"
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const router = useRouter()
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get("personal")
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }
  return (
    <section className="relative h-screen w-full pt-4 text-white">
      <div className="size-full relative flex-center">
        <div className="size-full max-w-[1000px] flex items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-90px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="w-full fixed bottom-0 flex-center flex-wrap gap-5">
          <CallControls onLeave={() => router.push(`/`)} />
          <DropdownMenu>
            <div className="flex-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1">
              {["Grid", "Speaker-left", "Speaker-right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-transparent" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <CallStatsButton />
          </div>
          <button
            className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <Users size={20} className="text-white" />
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom
