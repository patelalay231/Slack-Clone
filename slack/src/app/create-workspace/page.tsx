"use client";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateWorkspaceValue } from "@/hooks/create-workspace-value";
import { useState } from "react";
import slugify from "slugify";
import {v4 as uuid} from "uuid";
import { createWorkspace } from "@/actions/create-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function createWorkSpace() {
    const { currStep } = useCreateWorkspaceValue();
    let stepInView = null;
    
    switch(currStep){
        case 1:
            stepInView = <Step1 />
            break;
        case 2:
            stepInView = <Step2 />
            break;
        default:
            stepInView = <Step1 />
    }

  return (
    <div className="w-screen h-screen grid place-content-center bg-neutral-800 text-white">
        <div className="p-3 max-w-[550px]">
            <Typography variant="p" className="text-neutral-400" text={`step ${currStep} of 2`}/>
            {stepInView}
        </div>
    </div>
  )
}

const Step1 = () => {
    const { name,updateValue,setCurrStep } = useCreateWorkspaceValue();
    
    return <>
        <Typography text="What is your name of your company or team" className="my-4"/>
        <Typography text="This will be the name of your slack workspace - choose something that your team will recognize."
        className="text-neutral-300"
        variant="p"/>
        <form className='mt-6'>
            <fieldset>
                <Input 
                className="bg-neutral-700 text-white border-neutral-600" 
                value={name} 
                type='text'
                placeholder="Enter your company name"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => updateValue({ name : e.target.value })} 
                />
                <Button disabled={!name} className="mt-4" type="button" onClick={() => setCurrStep(2)}>
                    <Typography
                    text="Next"
                    variant="p"
                    />
                </Button>
            </fieldset>
        </form>
    </>
}

const Step2 = () => {
    const { setCurrStep,updateImageUrl,imageUrl,name } = useCreateWorkspaceValue();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const slug = slugify(name);
        const invite_code = uuid();
        const error = await createWorkspace({imageUrl,name,slug,invite_code});
        setIsSubmitting(false);
        if(error){
            console.error(error.error);
            return toast("Could not create workspace. Please try again.");
        }
        toast.success("Workspace created successfully");
        router.push('/');
    }

    return <div className="my-4">
        <Button size="sm" className="text-white" variant="link" onClick={() => setCurrStep(1)}>
            <Typography text="Go back" variant="p" className="text-left" />
        </Button>


        <form>
            <Typography text='Add workspace avatar' className="my-4"/>
            <Typography text="This image can be changed later in your workspace settings."
            className="text-neutral-300"
            variant="p"/>
            <fieldset disabled={isSubmitting} className="mt-6 flex flex-col items-center space-y-9">
                <ImageUpload/>
                <div className="space-x-5">
                    <Button onClick={() => {
                        updateImageUrl('');
                        handleSubmit();
                    }}>
                        <Typography text="Skip for now" variant="p"/>
                    </Button>
                    {imageUrl ? 
                    <Button type="button" onClick={handleSubmit} size="sm" variant='destructive'> 
                        <Typography text="Submit" variant="p"/>
                    </Button> :
                    <Button type='button' size="sm" className="text-white bg-gray-500">
                        <Typography text="Upload Image" variant="p"/>
                    </Button>}
                </div>
            </fieldset>
        </form>
    </div>
}
