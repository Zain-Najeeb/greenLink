import { supabase } from '@/util/supabaseClient'

export const insertUser = async (userId: string, email: string, fullName: string) => {
    const { data, error } = await supabase
        .from("Profiles")
        .insert({
            id: userId,
            email: email, 
            full_name: fullName
        })
        .select()

    if(error) {
        throw new Error(error.message);
    }
};

export const insertStats = async (userId: string) => {
    const { data, error } = await supabase
        .from("Stats")
        .insert({
            id: userId,
            points: 0,
            distance: 0.0,
            ride_count: 0
        })
        .select()

    if(error) {
        throw new Error(error.message);
    }
};
