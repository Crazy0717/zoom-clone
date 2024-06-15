import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface propsTypes {
  setIsSetupCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingSetup = ({ setIsSetupCompleted }: propsTypes) => {
  const [isMicCamActive, setIsMicCamActive] = useState(false)
  const call = useCall()

  if (!call) {
    throw new Error("usecall must be used within StreamCall component")
  }
  useEffect(() => {
    if (isMicCamActive) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamActive])

  return (
    <div className="w-full h-screen flex-center flex-col gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup Meeting</h1>
      <VideoPreview />
      <div className="flex-center gap-3">
        <label className="flex-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamActive}
            onChange={(e) => setIsMicCamActive(e.target.checked)}
          />
          join with micraphone and camera off
        </label>
        <DeviceSettings />
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join()
            setIsSetupCompleted(true)
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  )
}

export default MeetingSetup
