import { supabase } from "../../util/supabaseClient";
import { Route } from "@/types/users";
import { ApiStatus } from "@/types/api.types";
export const insertRoute = async (route: Route) => {
  const { data, error } = await supabase.from("routes").insert([route]);
  if (error) {
    console.log(error);
    throw Error("Error:", error);
  } else {
    console.log("test");
    return ApiStatus.SUCCESS;
  }
};
