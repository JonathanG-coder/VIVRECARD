import { Text,Alert,KeyboardAvoidingView,TouchableOpacity, Platform, View} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registrationSchema } from "../utils/validation";

import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { authService } from "../services/authService";
import Logo from "../components/Logo";
import Loading from "../components/Loading";



const Register = ({ navigation }) => {

  const [passwordShow, setPasswordShow] = useState(true) // permet d'afficher ou cacher le mot de passe.
  const [hidePasswordShow, setHidePasswordShow] = useState(true)
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit,formState: { errors }, } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await authService.register(data);
      Alert.alert("Succès", "Compte créé");
      navigation.navigate("Login");
    } catch (error) {
      const message = error.response?.data.message || "Inscription impossible (vérifié API)"

      Alert.alert("Erreur", message);
    }  finally {
    setLoading(false);
  }
  };

  return (
    <>
        {loading ? (
      <Loading />
    ) : (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: "center", padding: 20 }}
    >
      <Logo/>
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




      {/* Le champ CONFIRMER MOT DE PASSE */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View style={{ position: "relative" }}>
          <InputField
            placeholder="Confirmer mot de passe"
            secureTextEntry={hidePasswordShow}
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            autoCapitalize="none"
            textContentType="password"
          />
          <TouchableOpacity style={{position: "absolute", right:6, top:8}}
                  onPress={() => setHidePasswordShow(!hidePasswordShow)}
                >
                  <Text style={{ fontSize: 15 }}>
                    {hidePasswordShow? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
          </View>
        )}
      />


      {/* Bouton pour valider l'enregistrement */}
      <Button title="Créer un compte" onPress={handleSubmit(onSubmit)} />

      {/* Lien vers Login si j'ai déjà un compte*/}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#1d4098", textAlign: "center", marginTop: 20 }}>
          J'ai déjà un compte ? Connectez-vous
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    )}
  </>

);
}

export default Register