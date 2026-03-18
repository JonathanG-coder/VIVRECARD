import { Pressable, Text, StyleSheet } from 'react-native'
 
 const Button = ({title, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress} >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  )
}
export default Button

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