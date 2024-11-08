import { supabase } from '../../util/supabaseClient'
import { CreateUserProps } from '@/types/users'
 const createUser = async ( {email ,password} :CreateUserProps) => {

    console.log(email, password); 
    // const { data, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    // });

    // if (error) {
    //     console.error('Error creating user:', error.message);
    //     throw new Error(error.message);
    // }
    // return data;
}
export default  createUser; 