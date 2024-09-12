"use server"


import { getUserData } from "@/actions/get-user-data";
import { updateUserWorkspce } from "@/actions/update-user-workspace";
import { addMemberToWorkspace } from "@/actions/add-member-workspace";
import { supabaseServerClient } from "@/superbase/supabaseServer";

export const createWorkspace = async (
    {imageUrl,
    name,
    slug,
    invite_code}: 
  { imageUrl?: string,
    name: string,
    slug: string,
    invite_code: string,}) =>
{
    const supabase = await supabaseServerClient();
    const userData = await getUserData();

    if(!userData){
        return {error:'User data not found'};
    }

    const {error, data:workspacesRecord} = await supabase.from('workspaces').insert({
        image_url : imageUrl,
        name,
        super_admin:userData.id,
        slug,
        invite_code,
    }).select('*');

    if(error){
        return {error};
    }

    const [updateUserWorkspaceData,updateUserWorkspceError] = await updateUserWorkspce(userData.id,workspacesRecord[0].id);

    if(updateUserWorkspceError){
        return { error : updateUserWorkspceError};
    }


    // Add user to workspace members
    const [addMemberToWorkspaceData,addMemberToWorkspaceError] = await addMemberToWorkspace(userData.id,workspacesRecord[0].id);

    if(addMemberToWorkspaceError){
        return { error : addMemberToWorkspaceError};
    }

}