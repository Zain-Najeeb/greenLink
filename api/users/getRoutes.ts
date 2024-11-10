import supabase from "@/util/supabaseClient"
export  const getRoutesData =  async (id: string) => {
    // console.log(id)
    const { data: routes, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("id", id)
    // .single();
    return  routes
}