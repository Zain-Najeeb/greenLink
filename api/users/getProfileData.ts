import supabase from "@/util/supabaseClient"
export  const getPointsData =  async (id: string) => {
    console.log(id)
    const { data: points, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("id", id)
    .single();


    // console.log(points, "TEST",error, "TEST")
    return  points
}