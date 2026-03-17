import { Pressable, Text, StyleSheet } from 'react-native'
 
export const Button = ({title, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress} >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor : "#2a7fff",
        padding:12,
        borderRadius: 6, 
        alignItems: "center"
    },
    text:{
      color: "#ffff"  
    }
})