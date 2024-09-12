import { supabaseServerClient } from "@/superbase/supabaseServer";

export const updateUserWorkspce = async (userId: string, workspaceId: string) => {
    const supabase = await supabaseServerClient();
    const {data : updateUserWorkspaceData , error : updateUserWorkspceError} = await supabase.rpc('add_workspace_to_user',{user_id:userId,new_workspace:workspaceId});
    return [updateUserWorkspaceData, updateUserWorkspceError];
}