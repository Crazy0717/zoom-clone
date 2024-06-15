import { cn } from "@/lib/utils"
import Image from "next/image"

interface propsTypes {
  iconUrl: string
  title: string
  description: string
  className: string
  handleClick: () => void
}

const HomeCard = ({
  iconUrl,
  title,
  description,
  className,
  handleClick,
}: propsTypes) => {
  return (
    <div
      className={cn(
        "w-full px-4 py-6 flex flex-col justify-between items-start rounded-[14px] cursor-pointer xl:max-w-[270px] min-h-[260px]",
        className
      )}
      onClick={handleClick}
    >
      <div className="size-12 flex-center glassmorphism rounded-[10px]">
        <Image src={iconUrl} alt={description} width={26} height={26} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  )
}

export default HomeCard
