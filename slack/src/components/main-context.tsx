'use client'
import { cn } from "@/lib/utils";
import { useColorPreference } from "@/providers/color-prefrences";
import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";

export const MainContext: FC<{children : ReactNode}> = ({ children }) => {
    const { theme } = useTheme();
    const { color } = useColorPreference();

    let backgroundColor = 'bg-primary-dark';
    if(color === "green") {
        backgroundColor = 'bg-green-700';
    }else if(color === "blue") {
        backgroundColor = 'bg-blue-700';
    }

    return <div className={cn('md:px-2 md:pb-2 md:pt-14 md:h-screen',backgroundColor)}>
        <main className={cn('md:ml-[280px] lg:[420px] md:h-full overflow-scroll [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-[2px]',
            theme === 'dark' ? 'bg-[#232529]' : 'bg-light')}>
            {children}
        </main>
    </div>
}