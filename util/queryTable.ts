import { supabase } from '@/util/supabaseClient'

export const queryTopStats = async () => {
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