import supabase from "@/util/supabaseClient"
export  const getRoutesData =  async (id: string) => {
    // console.log(id)
    const { data: routes, error } = await supabase
        .from("routes")
        .select("source, destination, count")
        .eq("id", id)


    return  routes
}