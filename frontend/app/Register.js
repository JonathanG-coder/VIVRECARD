import { Text,Alert,KeyboardAvoidingView,TouchableOpacity} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registrationSchema } from "../utils/validation";

import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { authService } from "../services/authService";

const Register = ({ navigation }) => {

  const [passwordShow, setPasswordShow] = useState(true) // permet d'afficher ou cacher le mot de passe.
  const [hidePasswordShow, setHidePasswordShow] = useState(true)

  const { control, handleSubmit,formState: { errors }, } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      Alert.alert("Succès", "Compte créé");
      navigation.navigate("Login");
    } catch (error) {
      const message = error.response?.data.message || "Inscription impossible (vérifié API)"

      Alert.alert("Erreur", message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding"
      style={{ flex: 1, justifyContent: "center", padding: 20 }}
    >
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
        )}
      />
      {/* Permet de visible ou non visible le mot de passe */}
      <TouchableOpacity onPress={() => setPasswordShow (!passwordShow)}>
      <Text style={{fontSize: 15 }}>{passwordShow ? "Show" : "Hide" }</Text>
      </TouchableOpacity> 



      {/* Le champ CONFIRMER MOT DE PASSE */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Confirmer mot de passe"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />
       {/* Permet de visible ou non visible le confirm mot de passe */}
      <TouchableOpacity onPress={() => setHidePasswordShow (!hidePasswordShow)}>
      <Text style={{fontSize: 15 }}>{hidePasswordShow ? "Show" : "Hide" }</Text>
      </TouchableOpacity> 


      {/* Bouton pour valider l'enregistrement */}
      <Button title="Créer un compte" onPress={handleSubmit(onSubmit)} />

      {/* Lien vers Login si j'ai déjà un compte*/}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#1d4098", textAlign: "center", marginTop: 20 }}>
          J'ai déjà un compte ? Connectez-vous
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Register