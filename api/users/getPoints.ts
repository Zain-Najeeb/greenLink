import supabase from "@/util/supabaseClient"
export  const getPointsData =  async (id: string) => {
    const points = supabase.from("points").select("*").eq('id', id)
    console.log(points)
    return await points
}