import { supabase } from '../../util/supabaseClient'
import { CreateUserProps } from '@/types/users'
import AsyncStorage from '@react-native-async-storage/async-storage'
const loginUser = async ( {email, password} : CreateUserProps ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if( error ) {
        console.error('Error logging in:', error.message);
        console.log(error.message) ;
        throw new Error(error.message);
    }
    await AsyncStorage.setItem('supabase_session', JSON.stringify(data.session));
    return JSON.stringify(data.session);
}

export default loginUser;