'use client'

import useUserStore from '@/stores/UserStore'
import Image from 'next/image'
import Icon from '../Icon'
import { useRouter } from 'next/navigation'
import { Camera, ChevronDownIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { updateUserFieldAPI, UploadFileAPI } from '@/api/user'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { zhCN } from 'date-fns/locale'
import { formatDate } from '@/utils/date'
import InterestSelector from './InterestCategory'

interface UserProfileProps {
  _birthday: string
  _username: string
  _sex: number
  _abstract: string
  sinceLastUpdateUsernameDays: number
  _hobbyTags: string[]
}

export default function UserProfile({
  _birthday,
  _username,
  _sex,
  _abstract,
  sinceLastUpdateUsernameDays,
  _hobbyTags,
}: UserProfileProps) {
  const [birthday, setBirthday] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [sex, setSex] = useState<number>(0)
  const [abstract, setAbstract] = useState<string>('')
  const [hobbyTags, setHobbyTags] = useState<string[]>([])

  const { userInfo, setUserInfo } = useUserStore()
  const router = useRouter()
  // 上传文件ref,用于吊起文件选择框
  const fileInputRef = useRef<HTMLInputElement>(null)
  // 展示编辑用户名按钮
  const [showEditUsernameButton, setShowEditUsernameButton] =
    useState<boolean>(false)
  // 日历弹窗状态
  const [openCalendar, setOpenCalendar] = useState(false)

  useEffect(() => {
    setBirthday(_birthday)
    setUsername(_username)
    setSex(_sex)
    setAbstract(_abstract)
    setHobbyTags(_hobbyTags)
  }, [_birthday, _username, _sex, _abstract, _hobbyTags])

  // 点击头像区域，触发文件上传
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  // 选择文件后显示预览
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // 2MB 上限
    if (file.size > 1 * 1024 * 1024) {
      toast.info('文件大小不能超过1MB')
      return
    }
    try {
      const res = await UploadFileAPI(file)
      setUserInfo({
        ...userInfo,
        avatar: res.data,
      })
      await updateUserFieldAPI(userInfo.userId, [
        { field: 'avatar', value: res.data },
      ])
    } catch (err) {
      console.error('上传失败:', err)
    } finally {
      e.target.value = '' // 防止选择相同文件不触发 onChange
    }
  }

  // 更新用户单个信息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const UpdateUserInfo = async (field: string, value: any) => {
    try {
      await updateUserFieldAPI(userInfo.userId, [{ field, value }])
    } catch (err) {
      console.error(err)
      return
    }
    toast.info('更新成功')
  }

  // 修改用户兴趣标签 type:0删除 1添加
  const handleUpdateHobbyTag = async (tag: string, type: number) => {
    let newTags = [...hobbyTags]
    if (type === 0) {
      newTags = hobbyTags.filter(item => item !== tag)
    } else if (type === 1) {
      if (hobbyTags.includes(tag)) {
        toast.info('标签已存在')
        return
      }
      newTags.push(tag)
    }
    setHobbyTags(newTags)
    await updateUserFieldAPI(userInfo.userId, [
      { field: 'hobbyTags', value: newTags },
    ])
    toast.info(type === 0 ? '标签已删除' : '标签已添加')
  }

  return (
    <div>
      <div className="p-6 shadow">
        <div className="flex gap-4">
          <div
            className="relative group cursor-pointer"
            onClick={handleAvatarClick}
          >
            <Image
              src={userInfo.avatar || 'https://picsum.photos/120/80?random=1'}
              alt=""
              width={16}
              height={16}
              className="w-16 h-16 rounded-full"
            />
            {/* 悬浮遮罩层 */}
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            {/* 隐藏的文件选择 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[20px]">{userInfo.username}</p>
              <div className="flex items-center px-4 py-0.5 rounded-[5px] bg-[#FFECE8] dark:bg-gray-500/50 text-[14px] text-[#F53F3F] dark:text-gray-100">
                码龄{userInfo?.codeAge}年
              </div>
            </div>
            <div>
              <div
                className="flex justify-center items-center w-[94px] px-3 rounded-2xl bg-[#f2f2f2] dark:bg-gray-200/20 text-[#555666] dark:text-gray-300 cursor-pointer text-[14px]"
                onClick={() => {
                  router.push(`/my?username=${username}`)
                }}
              >
                <p>个人主页</p>
                <Icon
                  icon="ep:arrow-right"
                  className="text-inherit"
                  size={14}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-[18px] font-bold p-2 border-b border-solid border-gray-200 dark:border-gray-200/20">
          基础信息
        </div>
        <div>
          <ul className="flex flex-col gap-4 px-6 mt-8 text-[14px] text-[#555666] dark:text-[#f0f0f2]">
            <EditableItem
              label="用户昵称"
              value={username}
              labelBetweenShow={false}
              noValueLabel="未填写"
            >
              {({ setEditing }) => {
                return (
                  <div className="flex gap-6 items-center">
                    <input
                      className="border border-solid border-[#dcdfe6] w-[360px] h-8 leading-10 px-[15px] rounded-lg outline-none"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      onFocus={() => {
                        setShowEditUsernameButton(true)
                      }}
                    />
                    {!showEditUsernameButton ? (
                      <p>30天内可修改用户名</p>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          className="bg-[#fc5531] border border-solid border-[#fc5531] outline-none text-white px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                          onClick={() => {
                            setEditing(false)
                            if (sinceLastUpdateUsernameDays < 30) {
                              toast.info(
                                '距离上次修改还未满 30 天，暂不可更改。',
                              )
                              setUsername(userInfo.username)
                              return
                            }
                            UpdateUserInfo('username', username)
                            setUserInfo({ ...userInfo, username: username })
                          }}
                        >
                          提交
                        </button>
                        <button
                          className="text-[#fc5531] border border-solid border-[#fc5531] outline-none px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                          onClick={() => {
                            setShowEditUsernameButton(false)
                            setEditing(false)
                          }}
                        >
                          取消
                        </button>
                      </div>
                    )}
                  </div>
                )
              }}
            </EditableItem>
            <EditableItem
              label="性别"
              value={sex === 0 ? '男' : '女'}
              labelBetweenShow={true}
            >
              {({ setEditing }) => {
                return (
                  <div className="flex gap-4">
                    <RadioGroup
                      className="flex flex-row!"
                      defaultValue={sex.toString()}
                      onValueChange={value => setSex(Number(value))}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="0" id="r1" />
                        <Label htmlFor="r1">男♂</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="1" id="r2" />
                        <Label htmlFor="r2">女♀</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex gap-4">
                      <button
                        className="bg-[#fc5531] border border-solid border-[#fc5531] outline-none text-white px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                          UpdateUserInfo('sex', sex)
                        }}
                      >
                        确认
                      </button>
                      <button
                        className="text-[#fc5531] border border-solid border-[#fc5531] outline-none px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                        }}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )
              }}
            </EditableItem>
            <EditableItem
              label="个人简介"
              value={abstract}
              labelBetweenShow={false}
              noValueLabel="未填写"
            >
              {({ setEditing }) => {
                return (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      className="w-[798px] h-[86px] px-3 py-2"
                      placeholder="你很懒, 还没有添加简介"
                      value={abstract}
                      onChange={e => setAbstract(e.target.value)}
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        className="bg-[#fc5531] border border-solid border-[#fc5531] outline-none text-white px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                          UpdateUserInfo('abstract', abstract)
                        }}
                      >
                        提交
                      </button>
                      <button
                        className="text-[#fc5531] border border-solid border-[#fc5531] outline-none px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                        }}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )
              }}
            </EditableItem>
            <EditableItem
              label="出生日期"
              value={birthday}
              labelBetweenShow={false}
              noValueLabel="未设置"
            >
              {({ setEditing }) => {
                return (
                  <div className="flex gap-6 items-center">
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-[360px] justify-between font-normal h-8"
                        >
                          {birthday ? birthday : '请设置您的出生日期'}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={new Date(birthday)}
                          captionLayout="dropdown"
                          onSelect={date => {
                            setBirthday(formatDate(date || new Date()) || '')
                            setOpenCalendar(false)
                          }}
                          locale={zhCN}
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="flex gap-4">
                      <button
                        className="bg-[#fc5531] border border-solid border-[#fc5531] outline-none text-white px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                          UpdateUserInfo('birthday', birthday)
                        }}
                      >
                        确认
                      </button>
                      <button
                        className="text-[#fc5531] border border-solid border-[#fc5531] outline-none px-[22px] py-1 rounded-[20px] text-[12px] cursor-pointer"
                        onClick={() => {
                          setEditing(false)
                        }}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )
              }}
            </EditableItem>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-[18px] font-bold p-2 border-b border-solid border-gray-200 dark:border-gray-200/20">
          兴趣标签
        </div>
        {hobbyTags.length > 0 ? (
          <div className="flex gap-4 px-6 mt-4">
            {hobbyTags.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#ebf2f7] dark:bg-[#1a232b] border border-solid border-[#ebf2f7] dark:border-[#1a232b] rounded-[3px] text-[#507999] pr-1.5 pl-2 py-px cursor-pointer text-[14px]"
                >
                  <span>{item}</span>
                  <Icon
                    icon="mdi:remove"
                    size={16}
                    className="hover:bg-[#507999] hover:text-white ruonded-[3px]"
                    hanldeOnClick={() => handleUpdateHobbyTag(item, 0)}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="px-6 mt-8">暂无兴趣标签,请选择</div>
        )}
        <InterestSelector onTagSelect={handleUpdateHobbyTag} />
      </div>
    </div>
  )
}

interface EditableItemProps {
  label: string
  value: string
  children: (params: { setEditing: (v: boolean) => void }) => React.ReactNode
  labelBetweenShow: boolean
  noValueLabel?: string
}

const EditableItem = ({
  label,
  value,
  children,
  labelBetweenShow,
  noValueLabel,
}: EditableItemProps) => {
  const [editing, setEditing] = useState(false)

  return (
    <li className="flex items-center gap-10 group">
      <span className="flex w-14 justify-between">
        {labelBetweenShow
          ? label.split('').map((item, index) => {
              return <span key={index}>{item}</span>
            })
          : label}
      </span>

      {/* 非编辑模式 */}
      {!editing && (
        <span
          className={cn(
            !value && noValueLabel && 'text-[#999aaa]!',
            'text-[#222226] dark:text-white',
          )}
        >
          {value ? value : noValueLabel}
        </span>
      )}

      {/* 编辑模式 - 直接渲染 children */}
      {editing &&
        children?.({
          setEditing,
        })}

      {/* 编辑按钮 */}
      {!editing && (
        <EditButton
          className="hidden group-hover:flex"
          onclick={() => {
            setEditing(true)
          }}
        />
      )}
    </li>
  )
}

interface EditButtonProps {
  className: string
  onclick: () => void
}
const EditButton = ({ className, onclick }: EditButtonProps) => {
  return (
    <div
      className={cn(
        'items-center gap-1 text-[#1d98d1] text-[14px] cursor-pointer',
        className,
      )}
      onClick={() => onclick()}
    >
      <Icon icon="mingcute:edit-line" className="text-inherit" size={17} />
      <p>编辑</p>
    </div>
  )
}
