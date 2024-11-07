import { Text, View } from "react-native";
import { Link, router } from "expo-router";
export default function Index() {
  return (
    <View>
      <Link  href ="/signup/signup"> Go to sign up page </Link>

    </View>
  );
}
