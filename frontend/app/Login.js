import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validation";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authService } from "../services/authService";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Logo from "../components/Logo";

const Login = ({ navigation }) => {
  const { setToken } = useAuthStore();

  const [passwordShow, setPasswordShow] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const token = await authService.login(data);
      await setToken(token, data);
 
      navigation.navigate("Map");
    } catch (error) {
      const message =
        error.response?.data.message ||
        "Inscription impossible  (vérifie ton api )";

      Alert.alert("Erreur serveur", message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, justifyContent: "center", padding: 15 }}
    >
        <Logo />
      {/* Le champ email  */}
  <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            // Optimisations clavier pour l'email :
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
          />
        )}
      />


  

      {/* Le champ password  */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Mot de passe"
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            autoCapitalise="none"
            autoComplete="password"
            textContentType="password"
            secureTextEntry={passwordShow}
          />
        )}
      />

      <TouchableOpacity onPress={() => setPasswordShow(!passwordShow)}>
        <Text style={{ fontSize: 15 }}>{passwordShow ? "Show" : "Hide"}</Text>
      </TouchableOpacity>

      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "#1b3794", textAlign: "center", marginTop: 10 }}>
          Je n'ai pas de compte ? Inscrivez vous
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  touchable: {
    position: "absolute",
    right: 6,
    top: 8,
  },
  text: { fontSize: 12, left: 0 },
  faded: { color: "gray", textAlign: "center", marginTop: 10 },
  });