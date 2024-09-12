import { getUserData } from "@/actions/get-user-data";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const currUser = async () => {
  const user = await getUserData();
  return {userId: user?.id};
}

export const ourFileRouter = {
    workspaceImage : f({image : {maxFileSize :'4MB',maxFileCount : 1}})
    .middleware(()=> currUser())
    .onUploadComplete(()=>{console.log('uploaded')}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;