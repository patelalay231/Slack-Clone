import { useCreateWorkspaceValue } from "@/hooks/create-workspace-value";
import { ImCancelCircle } from "react-icons/im";
import Image from "next/image"; // Add this line
import { UploadDropzone } from "@/lib/uploadthing";

const ImageUpload = () => {
    const { imageUrl, updateImageUrl } = useCreateWorkspaceValue();
    
    if (imageUrl) {
        return (
            <div className="flex item-center justify-center h-32 w-32 relative">
                <Image 
                    src={imageUrl} 
                    alt="workspace-image"
                    width={320}
                    height={320} 
                />
                <ImCancelCircle size={30} className="absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110" onClick={() => updateImageUrl('')}/>
            </div>
        );
    }
    return <UploadDropzone endpoint='workspaceImage' onClientUploadComplete={res => {updateImageUrl(res?.[0].url)}}
    onUploadError={(err) => console.log(err)}/>;
}

export default ImageUpload;
