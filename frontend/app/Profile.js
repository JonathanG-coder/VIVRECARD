import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { useAuthStore } from '../store/authStore'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'

const Profile = ()  => {

  const {token, logout, user} = useAuthStore()
  const navigation = useNavigation()

  const userEmail = user?.email || "Utilisateur non trouvé"

  const handleLogout = () => {
    Alert.alert ("Confirmer la déconnexion", "Etes vous sur de vouloir vous déconnecter ?",
      [
        {text:"non", styles: "cancel"},

        {text: "OUI", styles: "destructive", onPress: async () => {
          try {
            await logout();
            navigation.reset({
            index: 0,
            routes: [{ name: "Login"}],
            });
          } catch (error) {
            Alert.alert("Erreur" , "Deconnexion impossible")
          }
        }
      }
      ],
    );
  }

    return (
      <View style={styles.container}>


        <Text>{userEmail}</Text>
        <Text>{token}</Text>
        {/* Permet jsute de voir si user connec et token enre
         */}
        <Button title="Se déconnecter" onPress={handleLogout}/>
      </View>
    )
  }

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  }
})
