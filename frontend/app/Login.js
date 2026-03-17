import {Text,Alert,KeyboardAvoidingView,TouchableOpacity,Platform,View,} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "../utils/validation";
import Profile from "./Profile";
import Loading from "../components/Loading";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import Logo from "../components/Logo";

const Login = ({ navigation }) => {
  const { setToken } = useAuthStore();

  const [passwordShow, setPasswordShow] = useState(true); // permet d'afficher ou cacher le mot de passe.
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = await authService.login(data);
      await setToken(token, data);

      Alert.alert("Succès", "Login valid");
      navigation.navigate("Profile");
    } catch (error) {
      const message =
        error.response?.data.message || "Inscription impossible (vérifié API)";

      Alert.alert("Erreur", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center", padding: 20 }}
        >
          <Logo />
          {/* Le champ EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                autoCapitalize="none" // ne met pas de majuscule automatiquement
                textContentType="emailAddress" // iOS : aide le remplissage automatique
                autoComplete="email" // Android : remplissage automatique
                keyboardType="email-address" // clavier adapté avec @ et .com
              />
            )}
          />
          {/* Le champ mot de passe */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={{ position: "relative" }}>
                <InputField
                  placeholder="Mot de passe"
                  secureTextEntry={passwordShow}
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                />
                <TouchableOpacity style={{position: "absolute", right:6, top:8}}
                  onPress={() => setPasswordShow(!passwordShow)}
                >
                  <Text style={{ fontSize: 15 }}>
                    {passwordShow ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Bouton pour valider le login */}
          <Button title="Se login" onPress={handleSubmit(onSubmit)} />

          {/* Lien vers Register si j'ai pas un compte*/}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ color: "#1d4098", textAlign: "center", marginTop: 20 }}
            >
              Pas encore de compte ? Inscrivez-vous
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Login;
