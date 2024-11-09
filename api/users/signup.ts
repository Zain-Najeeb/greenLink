import { supabase } from '../../util/supabaseClient'
import { CreateUserProps } from '@/types/users'
import AsyncStorage from '@react-native-async-storage/async-storage';

 const createUser = async ( {email, password, options} :CreateUserProps) : Promise<string> => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
    });

    if (error) {
        console.error('Error creating user:', error.message);
        // console.log(error.message) ;
        throw new Error(error.message);
    }

    const { insertError } = await supabase
        .from("Profiles")
        .insert({
            id: data.user?.id,
            email: email, 
            full_name: options?.data?.full_name || ""
        }
    );

    if (data.session) {
        await AsyncStorage.setItem('supabase_session', JSON.stringify(data.session));
        console.log('User created and session saved');
      }
    return JSON.stringify(data.session);
}
export default  createUser; 