import {create} from 'zustand';

type createWorkSpaceValues = {
    name : string,
    imageUrl : string,
    updateImageUrl : (url : string) => void,
    updateValue : (name : Partial<createWorkSpaceValues>) => void,
    currStep : number,
    setCurrStep : (step : number) => void,
}

export const useCreateWorkspaceValue = create<createWorkSpaceValues>((set) => ({
    name : '',
    imageUrl : '',
    updateImageUrl : (url) => set({imageUrl : url}),
    updateValue : (name) => set(name),
    currStep:1,
    setCurrStep : (step) => set({currStep : step}),
}));