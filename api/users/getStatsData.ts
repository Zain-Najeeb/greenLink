import supabase from "@/util/supabaseClient"
export  const getStatsData =  async (id: string) => {
    console.log(id)
    const { data: points, error } = await supabase
    .from("Stats")
    .select("*")
    .eq("id", id)
    .single();


    // console.log(points, "TEST",error, "TEST")
    return  points
};

export const getTopStats = async () => {
    const { data, error } = await supabase
        .from('Stats')
        .select('id, points, Proflies(full_name')
        .order('points', { ascending: false })
        .limit(3);

    if(error) {
        console.error('error');
        throw new Error();
    }

    return data;
};