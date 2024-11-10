import { supabase } from '@/util/supabaseClient'

export const insertUser = async (email: string, fullName: string) => {
    const { data, error } = await supabase
        .from("Profiles")
        .insert({
            email: email, 
            full_name: fullName
        })
        .select()

    if(error) {
        throw new Error(error.message);
    }
};

export const insertStats = async () => {
    const { data, error } = await supabase
        .from("Stats")
        .insert({
            points: 0,
            distance: 0.0,
            ride_count: 0
        })
        .select()

    if(error) {
        throw new Error(error.message);
    }
};
