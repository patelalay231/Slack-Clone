'use server';

import { supabaseServerClient } from "@/superbase/supabaseServer";

export async function registerWithEmail(email : string){
    const supabase = await supabaseServerClient();

    const response = await supabase.auth.signInWithOtp({
        email,
        options : {
            emailRedirectTo : process.env.NEXT_PUBLIC_ORIGIN,
        }
    });
    return JSON.stringify(response);
}