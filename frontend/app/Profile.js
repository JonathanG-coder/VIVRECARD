import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import Loading from "../components/Loading";

const Profile = () => {
  const { token, logout, user } = useAuthStore();
  const navigation = useNavigation();

  const userEmail = user?.email || "Utilisateur non trouvé ";

  const userPassword = user?.password || "Utilisateur non trouvé ";

 

  const handleLogout = () => {
    Alert.alert(
      "Confirmer la déconnexion ",
      "Etes vous sur de vouloir dvous decconcter ",
      [
        { text: "non", styles: "cancel" },
        {
          text: "Oui",
          styles: "destructive",
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error) {
              Alert.alert("Erreur ", "deconnexon impossile");
            }
          },
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      {<Logo /> ? <Logo /> : <Loading />}
      <Text style={styles.label}>Welcome: </Text>

      <Text style={styles.info}>{userEmail}</Text>

      

 

      {/* <Text>{token}</Text> */}
      <View style={styles.button}>
        <Button title="Logout" onPress={handleLogout} color={"red"} />
      </View>

      <View>
        <Button title="MAP" onPress={() => navigation.navigate("Map")} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 30,
    width: 120,
  },
  label: {
    fontWeight: 16,
    color: "grey",
    marginTop: 10,
  },

  info: {
    marginTop: 20,
  },
});