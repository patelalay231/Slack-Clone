import { Workspace } from '@/types/app'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import {FC} from 'react'
import { AvatarFallback,Avatar, AvatarImage } from '@/components/ui/avatar'
import Typography from './ui/typography'
import { Card, CardContent } from './ui/card'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa'
import { RiHome2Fill } from 'react-icons/ri'
import { PiChatTeardrop } from 'react-icons/pi'

type SidebarNavProps = {
    userWorkspacesData : Workspace[],
    currentWorkspaceData : Workspace,
}

export const SidebarNav: FC<SidebarNavProps> = ({currentWorkspaceData,userWorkspacesData}) => {
  return (
    <nav>
        <ul className='flex flex-col space-y-4'>
            <li>
                <div className='cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden border-white border'>
                    <TooltipProvider>
                        <Tooltip>
                                <TooltipTrigger>
                                    <Avatar>
                                        <AvatarImage src={currentWorkspaceData.image_url || ''} alt={currentWorkspaceData.name!} className='object-cover w-full h-full'/>
                                        <AvatarFallback className='bg-neutral-700'>
                                            <Typography text={currentWorkspaceData.name!.slice(0,2)} variant='p'/>
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                            <TooltipContent className='p-0' side='bottom'>
                                <Card className='w-[350px] border-0'>
                                    <CardContent className='flex p-0 flex-col'>
                                        {userWorkspacesData.map(workspace => (
                                            <div key={workspace.id} className='hover:opacity-70 px-3 py-1 flex gap-2'>
                                                <Avatar>
                                                    <AvatarImage src={workspace.image_url || ''} alt={workspace.name!} className='object-cover w-full h-full'/>
                                                    <AvatarFallback>
                                                        <Typography text={workspace.name!.slice(0,2)} variant='p'/>
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Typography text={workspace.name!} variant='p' className='text-sm'/>
                                                    <Typography text={workspace.invite_code || ''} variant='p' className='text-xs lg:text-sm'/>
                                                </div>
                                            </div>
                                        ))}
                                        <Separator/>
                                        <div className='flex items-center gap-2 p-2'>
                                            <Button variant={'secondary'}>
                                                <FaPlus/>
                                            </Button>
                                            <Typography text='Create Workspace' variant='p'/>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className='flex flex-col items-center cursor-pointer group text-white'>
                    <div className='p-2 rounded-lg bg-[rgba(255,255,255,0.3)]'>
                        <RiHome2Fill size={20} className='text-white group-hover:scale-125 transition-all duration-300'/>
                    </div>
                    <Typography text='Home' variant='p' className='text-sm lg:text-sm md:text-sm'/>
                </div>
            </li>
            <li>
                <div className='flex flex-col cursor-pointer group items-center text-white'>
                    <div className='p-2 rounded-lg bg-[rgba(255,255,255,0.3)]'>
                        <PiChatTeardrop size={20} className='text-white group-hover:scale-125 transition-all duration-300'/>
                    </div>
                    <Typography text='Chats' variant='p' className='text-sm lg:text-sm md:text-sm'/>
                </div>
            </li>
        </ul>
    </nav>
  )
}
