import { supabase } from '../../util/supabaseClient'
import { CreateUserProps } from '@/types/users'

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

    return JSON.stringify(data.session);
}

export default loginUser;