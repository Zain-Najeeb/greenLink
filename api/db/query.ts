import supabase from "@/util/supabaseClient"

export const query = async (user_id: string) => {
    const getProfileData = async () => {
        const { data: profile, error } = await supabase
            .from("Profiles")
            .select("*")
            .eq("id", user_id)
            .single();
    
        if(error) {
            throw new Error(error.message);
        }

        return profile;
    }

    const getStatsData =  async () => {
        const { data: stats, error } = await supabase
            .from("Stats")
            .select("*")
            .eq("id", user_id)
            .single();

        if(error) {
            throw new Error(error.message);
        }
    
        return stats;
    }

    const getRoutesData =  async () => {
        const { data: routes, error } = await supabase
            .from("routes")
            .select("source, destination, count")
            .eq("user", user_id)
    
        if(error) {
            throw new Error(error.message);
        }   

        return routes;
    }

    const profile = await getProfileData();
    const stats = await getStatsData();
    const routes = await getRoutesData();

    return { profile, stats, routes };
};