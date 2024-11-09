import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../util/supabaseClient'

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    await AsyncStorage.removeItem("supabase_session");
    console.log("User signed out successfully");
  }
}