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
};

export const insertStats = async (userId: string) => {
    const { data, error } = await supabase
        .from("Stats")
        .insert({
            id: userId,
            points: 0,
            distance: 0, // should be a float
            ride_count: 0
        })
        .select()
};