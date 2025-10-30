'use client'

import { useRouter } from 'next/navigation'
import Icon from '../Icon'

interface Props {
  menu: Array<{ icon: string; label: string; link: string }>
}

export default function NavigationMenu(props: Props) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-[15px] cursor-pointer">
      {props.menu.map((item, index) => {
        return (
          <div
            className="flex items-end text-[#212121] hover:text-gray-400 dark:text-white dark:hover:text-gray-500 gap-0.5"
            key={index}
            onClick={() => {
              router.push(item.link)
            }}
          >
            <Icon icon={item.icon} className="text-inherit" />
            <p className="text-[12px] font-black">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
