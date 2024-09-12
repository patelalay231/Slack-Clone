'use server'

import { supabaseServerClient } from "@/superbase/supabaseServer"

export const getUserWorkspacesData = async (workspaceIDs : Array<string>) => {
    const supabase = await supabaseServerClient();
    const { data,error} = await supabase.from('workspaces').select('*').eq('id', workspaceIDs);
    return [data,error]
}

export const getCurrentWorkspaceData = async (workspaceID : string) => {
    const supabase = await supabaseServerClient();
    const { data,error} = await supabase.from('workspaces').select('*').eq('id', workspaceID).single();
    return [data,error]
}