import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import Map from "./Map";
import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Map" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated? (
        <>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
        ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
        )} 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});