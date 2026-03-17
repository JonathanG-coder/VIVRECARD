import { View, StyleSheet } from "react-native";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#850f52",
  },
});

export default Home;