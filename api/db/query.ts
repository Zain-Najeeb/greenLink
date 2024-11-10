import supabase from "@/util/supabaseClient"

export const query = async (user_id: string) => {
    const { data, error } = await supabase
        .from('Profiles')
        .select('id, full_name, email, Stats(id, points, distance, ride_count, eco_score), Routes(user, source, destination, count)')
        .eq('id', user_id)
        .single();

    if(error) {
        throw new Error(error.message);
    }

    return data;   
};