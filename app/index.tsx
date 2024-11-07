import { Text, View } from "react-native";
import { Link, router } from "expo-router";
export default function Index() {
  return (
    <View>
      <Link href="/users/signIn"> Go to the sign up page pwetty pwease </Link>
    </View>
  );
}
