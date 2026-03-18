import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";

import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState, useRef } from "react";

import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { useAuthStore } from "../store/authStore";
import { locationService } from "../services/locationService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Map = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // On va sécuriser la taille de l'ecran

  const [region, setRegion] = useState(null); // Etat pour  stocker les regeion {longitude , latitude}
  const [activeusers, setActiveusers] = useState([]);
  const [myId, setMyId] = useState(null);
  const mapRef = useRef(null);
  const { user } = useAuthStore();
  const myEmail = user.email;

  useEffect(() => {
    let subcription;

    const initLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync(); // on deman,de la permission pour activer le gps

      if (status !== "granted") {
        Alert.alert(
          "Permission refusée ",
          "Autoorisez la localisation pour utiliser la Map ",
        );

        return;
      }

      subcription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 3 },

        // extraire la latitude et longitude
        async (loc) => {
          const { latitude, longitude } = loc.coords;
          setRegion({
            longitude,
            latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          // on mets à jours nos données de localisations
          try {
            await locationService.updateLocation(latitude, longitude);
          } catch (error) {
            console.error(error);
          }
        },
      );
    };

    const fetchUsers = async () => {
      // fonction pour récuperer les users active depuis le serveur
      try {
        const users = await locationService.getActiveUsers();
        setActiveusers(users);
      } catch (error) {
        console.error("Erreur lors du fetch ", error);
      }
    };

    initLocation(); // Pour initier la position (localisation )
    fetchUsers(); // récuperer la liste de sutilisateur actifs

    const ineterval = setInterval(fetchUsers, 30000);
    return () => {
      // On nettoie (on stope l'abonnement localisation et ineterval)
      subcription?.remove();
      clearInterval(ineterval);
    };
  }, []);

  // on va afficher le loader (Spinner)
  if (!region) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: insets.top + 10,
          right: 20,
          zIndex: 10,
        }}
      >
        <Button
          title="Retour au profil"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {activeusers.map((user) => {
          const lat = parseFloat(user.latitude);
          const lon = parseFloat(user.longitude);
          if (isNaN(lat) || isNaN(lon)) return null;

          const isMe = user.email === myEmail;

          return (
            <Marker
              key={`${user.id}-${isMe ? "red" : "yellow"}`}
              coordinate={{ latitude: lat, longitude: lon }}
              pinColor={isMe ? "red" : "yellow"}
            >
              <Callout >
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#2bd3bd",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: isMe ? "red" : "yellow",
                    }}
                  >
                    {isMe ? "Moi" : "pas moi "}
                    {user.email}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  map: {
    flex: 1,
  },
});