import supabase from "@/util/supabaseClient"
import { Route } from "@/types/users"

export  const getRoutesData =  async (user_id: string): Promise<Route[]> => {
    // console.log(id)
    const { data: routes, error } = await supabase
    .from("routes")
    .select("source, destination, count")
    .eq("user", user_id)
    // .single();

    if(!routes) {
        return []
    }

    return routes
}