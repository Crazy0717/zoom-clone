import { ReactNode } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Image from "next/image"

interface meetingPropsTypes {
  title: string
  isOpen: boolean
  onClose: () => void
  className?: string
  buttonText: string
  handleClick?: () => void
  children?: ReactNode
  image?: string
  buttonIcon?: any
}

const MeetingModal = ({
  title,
  isOpen,
  onClose,
  handleClick,
  buttonText,
  className,
  children,
  image,
  buttonIcon,
}: meetingPropsTypes) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-6 py-9 w-full max-w-[520px] border-none bg-dark-1 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <Image
              src={image}
              className="self-center user-select-none"
              alt="image"
              width={70}
              height={70}
            />
          )}
          <h2
            className={cn(
              "text-3xl font-bold leading-[40px] text-center",
              className
            )}
          >
            {title}
          </h2>
          {children}
          <Button
            onClick={handleClick}
            className="flex gap-2 bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="icon" width={16} height={16} />
            )}
            {buttonText || "Schedule meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
