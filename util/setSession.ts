import supabase from "./supabaseClient";

export async function signInWithSession(session: any) {
    try {
      // Set the session in Supabase auth
      const { data, error } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      })
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error(error)
    }
  }