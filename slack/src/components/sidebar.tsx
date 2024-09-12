"use client";
import { Workspace,User } from '@/types/app'
import React, { FC } from 'react'
import { SidebarNav } from './sidebar-nav';
import { FiPlus } from 'react-icons/fi';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useColorPreference } from '@/providers/color-prefrences';
import { GoDot, GoDotFill } from 'react-icons/go';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/typography';
import { GiNightSleep } from 'react-icons/gi';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { IoDiamondOutline } from 'react-icons/io5';
import { TooltipContent } from '@radix-ui/react-tooltip';

type SidebarProps = {
    userWorkspacesData : Workspace[],
    currentWorkspaceData : Workspace,
    userData : User,
}

export const Sidebar:FC<SidebarProps> = ({userWorkspacesData,currentWorkspaceData,userData}) => {

  const {color} = useColorPreference();
  let backgroundColor = 'bg-primary-dark';
  if(color === "green"){
    backgroundColor = 'bg-green-700';
  }else if(color === "blue"){
    backgroundColor = 'bg-blue-700';
  }

  return <aside className='fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20'>
        <SidebarNav currentWorkspaceData={currentWorkspaceData} userWorkspacesData={userWorkspacesData}></SidebarNav>
        <div className='flex flex-col space-y-3'>
          <div className={`bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300
            hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10
            `}>
              <FiPlus size={28}/>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                  <div>
                    <Popover>
                      <PopoverTrigger>
                        <div className='h-10 w-10 relative cursor-pointer'>
                          <div className='h-full wp-full rounded-lg overflow-hidden'>
                            <Image src={userData.avatar_url || ''} alt={userData.name || 'user'} width={300} height={300} className='object-cover w-full h-full'/>
                            <div className={cn('absolute z-10 rounded-full -right-[20%] -bottom-1',backgroundColor)}>
                              {userData.is_away ? <GoDot className='text-white text-xl'/> : <GoDotFill className="text-green-600" size={17}/>}
                            </div>
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent side='right' className='ml-2'>
                      <div>
                        <div className='flex space-x-3'>
                          <Avatar>
                            <AvatarImage src={userData.avatar_url || ''} alt={userData.name || 'user'}/>
                            <AvatarFallback>
                            {userData.name?.slice(0,2)}
                          </AvatarFallback>
                          </Avatar>
                          <div className='flex flex-col'>
                            <Typography text={userData.name || userData.email } variant='p' className='font-bold'/>
                            <div className='flex items-center space-x-1'>
                              {userData.is_away ? <GiNightSleep size="12"/> : <GoDotFill className="text-green-600" size={17}/>}
                              <span className='text-xs'>{userData.is_away ? 'Away' : 'Active'}</span>
                            </div>
                          </div>
                        </div>
                        <div className='border group cursor-point mt-4 mb-2 p-2 rounded flex items-center space-x-2'>
                          <FaRegCalendarCheck className="block group-hover:hidden" size={19}/>
                          <FaEdit className="hidden group-hover:block" size={19}/>
                          <Typography text={'In a meeting'} variant='p' className='text-xs text-gray-600'/>
                        </div>
                        <div className='flex flex-col space-y-1'>
                          <Typography text={userData.is_away ? 'Set yourself as active' : 'set yourself as away'} variant='p' className={cn("text-white px-2 py-1 rounded cursor-pointer",(userData.is_away ? " hover:bg-green-700" : " hover:bg-red-700"))}/>
                          <Typography text='Clear Status' variant='p' className="text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"/>
                          <hr className='border-gray-400'/>
                          <Typography text='Profile' variant='p' className="text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700"/>
                          <hr className='border-gray-400'/>
                          <div className='flex gap-2 items-center hover:text-white hover:bg-blue-700 px-2 py-2 rounded cursor-pointer'>
                            <IoDiamondOutline size={20} className="text-orange-400"/>
                            <Typography text={`Upgrade ${currentWorkspaceData.name}`} variant='p' className="text-xs"/>
                          </div>
                          <Typography text={`Sign out of ${currentWorkspaceData.name}`} variant='p' className="text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"/>
                        </div>
                      </div>
                      </PopoverContent>
                    </Popover>
                  </div>
              </TooltipTrigger>
              <TooltipContent className='text-white bg-black border-black' side="right">
                <Typography text={userData.name || userData.email} variant='p'/>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
  </aside>;
}
