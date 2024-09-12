import { getUserData } from "@/actions/get-user-data";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();

  if(!userData){
    return redirect("/auth");

  }

  const useWrokSpaceID = userData.workspaces?.[0];

  if(!useWrokSpaceID) return redirect('/create-workspace');

  if(useWrokSpaceID) return redirect(`/workspace/${useWrokSpaceID}`);

}
