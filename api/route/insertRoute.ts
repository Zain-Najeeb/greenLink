import { supabase } from "../../util/supabaseClient";
import { Route } from "@/types/users";

export const insertRoute = async (user_id: string, route: Route) => {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .eq('user', user_id)
    .eq('source', route.source)
    .eq('destination', route.destination)
    .single(); 

  if(error) {
    console.log(error);
    throw Error("Error: ", error);
  }

  if(data) {
    const {error: updateError} = await supabase
      .from('routes')
      .update({
        counter: data.counter + 1
      })
      .eq('id', user_id);
  } else {
    const {error: insertError } = await supabase
      .from('routes')
      .insert({
        source: route.source,
        destination: route.destination,
        count: 0
      })
  }
};
