// ToggleTHeme si j'ai envie de l'implanter par la suite
// 1 : Créer un contexte global avec la definition des couleur : ex : ThemeContext.js
// 2 : Faire appel à lui dans App.js =  <themeProvider> 
// 3 : Utiliser le theme dans les pages 


import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "black" : "white" },
      ]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
      />

      <Text
        style={{
          color: darkMode ? "white" : "black",
          marginBottom: 20,
        }}
      >
        {darkMode ? "Dark Mode" : "Light Mode"}
      </Text>

      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default ToggleTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});