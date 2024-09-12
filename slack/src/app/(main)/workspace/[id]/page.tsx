import { getUserData } from "@/actions/get-user-data"
import { getUserWorkspacesData,getCurrentWorkspaceData } from "@/actions/workspaces";
import { Sidebar } from "@/components/sidebar";
import { Workspace as userWorkspaces } from "@/types/app";
import { redirect } from "next/navigation";

export default async function Workspace({params : {id}} : {params : {id : string}}) {
    const userData = await getUserData();

    if(!userData){
        return redirect('/auth');
    }

    // ! means that the value is not null
    const [userWorkspacesData,userWorkspacesError] = await getUserWorkspacesData(userData.workspaces!);

    const [currentWorkspaceData,currentWorkspaceError] = await getCurrentWorkspaceData(id);

    return <>
        <div className="hidden md:block">
            <Sidebar currentWorkspaceData={currentWorkspaceData} userWorkspacesData={userWorkspacesData as userWorkspaces[]} userData={userData}/>
        </div>
        <div className="md:hidden block min-h-screen">Mobile</div>
    </>
};