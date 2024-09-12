"use client"
import { Button,  } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";

import { set, useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { MdOutlineAutoAwesome } from "react-icons/md"; // Add this line
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { supabaseBrowserClient } from "@/superbase/supabaseClient";
import { registerWithEmail } from "@/actions/register-with-email";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getCurrentUser = async () => {
            const {data : {session}} = await supabaseBrowserClient.auth.getSession();
            console.log("session",session);
            if(session){
                router.push('/');
            }
        }
        getCurrentUser();
        setIsMounted(true);
    },[router]);

    const formSchema = z.object({
        email : z.string().email({message : "This is required — you’ll need to enter an email."}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            email : "",
        }
    });

    async function onsubmit(values : z.infer<typeof formSchema>){
        setIsAuthenticating(true);
        const response = await registerWithEmail(values.email);
        const {data,error} = JSON.parse(response);
        setIsAuthenticating(false);
        if(error){
            console.warn("signin error",error);
            return;
        }
    }

    async function socialAuth(provider : Provider){
        setIsAuthenticating(true);
        await supabaseBrowserClient.auth.signInWithOAuth({
            provider,
            options : {
                redirectTo : `${location.origin}/auth/callback`,
            }
        });
        setIsAuthenticating(false);

    }

    if(!isMounted){
        
    }

    return <div className="min-h-screen p-5 grid text-center place-content-center">
        <div className="max-w-[450px]">
            <div className="flex justify-center items-center gap-3 mb-4">
                <BsSlack size = {30} />
                <Typography variant='h1' text='slack'/>
            </div>
            <Typography variant='h2' text='Sign in to your Slack' className="mb-3"/>
            <Typography variant='p' text='We suggest using the email address that you use at work.' className="mb-7 opacity-90"/>

            <div className="flex flex-col space-y-4">
                <Button 
                disabled={isAuthenticating} 
                className='py-6 border-2 flex space-x-3' 
                variant="outline" 
                onClick={() => {socialAuth('google')}}
                >
                    <FcGoogle size={30}/>
                    <Typography variant='p' text='Sign in with Google'/>
                </Button>
                <Button 
                disabled={isAuthenticating} 
                className='py-6 border-2 flex space-x-3' 
                variant="outline"
                onClick={() => {socialAuth('github')}}
                >
                    <RxGithubLogo size={30}/>
                    <Typography variant='p' text='Sign in with Github' />
                </Button>
                
            </div>
            
            <div>
                <div className="flex items-center my-6">
                    <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
                    <Typography variant='p' text='OR' className="text-center"/>
                    <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
                </div>
            </div>
            
            {/* form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <fieldset disabled={isAuthenticating}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input placeholder="name@work-email.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-lg"/>
                        </FormItem>
                        )}
                    />
                    <Button variant={'secondary'} className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white" type="submit">
                        <Typography variant='p' text='Signin with Email' />
                    </Button>
                    
                    <div className="px-5 py-4 bg-gray-100 rounded-sm">
                        <div className="text-gray-500 flex justify-center items-center space-x-3">
                            <MdOutlineAutoAwesome/>
                            <Typography variant='p' text='One-click sign in with magic link' />
                        </div>
                    </div>
                    </fieldset>
                </form>
            </Form>


        </div>
    </div>;
}


