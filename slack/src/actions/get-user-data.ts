import { supabaseServerClient } from "@/superbase/supabaseServer";

import { User } from "@/types/app";

export const getUserData = async () : Promise<User | null> => {
  const supabase = await supabaseServerClient();

  const {data : {user}} = await supabase.auth.getUser();
  if(!user){
    console.log("No user found");
    return null;
  }
  const { data, error} = await supabase.from("users").select("*").eq("id", user.id);
  if(error){
    console.log("Error fetching user data", error);
    return null;
  }
  return data ? data[0] : null;
};