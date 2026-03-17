import { View, StyleSheet, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View style={{justifyContent: "center", alignItems:"center", padding:20, marginBottom:20}}>
     <Image
        source={{ uri: "https://picsum.photos/300" }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
     /> 
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
})

