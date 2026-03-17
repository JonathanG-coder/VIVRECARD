import { StatusBar } from "expo-status-bar";
import Home from "./app/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Register from "./app/Register";
export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="auto" translucent={true} />
      <Home />
      {/* <Register /> */}
    </SafeAreaProvider>
  );
}