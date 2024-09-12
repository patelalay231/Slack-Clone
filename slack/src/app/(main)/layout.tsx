import { ThemeProvider } from "@/providers/theme-provider";
import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";
import { ColorPrefrenceProvider } from "@/providers/color-prefrences";
import { MainContext } from "@/components/main-context";

const MailLayout : FC<{children:ReactNode}> = ({children}) => {

    return <ThemeProvider 
    attribute="class" 
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
        <ColorPrefrenceProvider>
            <MainContext>
                {children}
            </MainContext>
        </ColorPrefrenceProvider>
    </ThemeProvider>
};

export default MailLayout;