import { Text, View } from "react-native";
import { Link, router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  // const session = await AsyncStorage.getItem("supabase_session");

  // if (session) {
  //   const parsedSession = JSON.parse(session);
  //   console.log(parsedSession);
  // } else {
  //   console.log("No session found");
  // }
  return (
    <View>
      <Link href="./(auth)/users/signIn">
        {" "}
        Go to the sign up page pwetty pwease{" "}
      </Link>
    </View>
  );
}
