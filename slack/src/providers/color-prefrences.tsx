"use client"
import { createContext, FC, useContext, useEffect, useState } from "react";

type Colors = 'blue' | 'green';

type ColorPrefrenceContext = {
    color : Colors;
    selectColor : (color : Colors) => void;
}

const ColorPrefrenceContext = createContext<ColorPrefrenceContext | undefined>(undefined);

export const useColorPreference = () => {
    const conext = useContext(ColorPrefrenceContext);
    if(!conext){
        throw new Error('useColorPreference must be used within a ColorPrefrenceProvider');
    }
    return conext;
}

export const ColorPrefrenceProvider : FC<{children : React.ReactNode}> = ({children}) => {
    const [color, setColor] = useState<Colors>(() => {
        const storedColor = typeof localStorage!== 'undefined' ? localStorage.getItem('color') : null;
        return (storedColor as Colors || '');
    });
    
    const [isMounted,setIsMounted] = useState(false);
    
    useEffect(() => {
        localStorage.setItem('color', color);
        setIsMounted(true);
    },[color])

    const selectColor = (selectedColor : Colors) => {
        setColor(selectedColor);
    }
    
    const value: ColorPrefrenceContext = {
        color,
        selectColor
    }

    if(!isMounted) return null;

    return <ColorPrefrenceContext.Provider value={value}>
        {children}
    </ColorPrefrenceContext.Provider>
};