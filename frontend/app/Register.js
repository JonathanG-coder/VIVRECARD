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
import { registrationSchema } from "../utils/validation";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authService } from "../services/authService";
import { useState } from "react";
import Logo from "../components/Logo";

const Register = ({ navigation }) => {
  const [passwordShow, setPasswordShow] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      Alert.alert("success ", "Compte créé");
      navigation.navigate("Login");
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
            autoCapitalise="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
             
          />
        )}
      />

      {/* Le champ password  */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={{position: "relative" }}>
          <InputField
            placeholder="Mot de passe"
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            autoCapitalise="none"
            autoComplete="password"
            textContentType="password"
            secureTextEntry={hidePassword}
            />
           <TouchableOpacity onPress={() => setPasswordShow(!hidePassword)}>
        <Text style={{ fontSize: 15 ,position: "absolute",  right: 20 }}>{passwordShow ? "Show" : "Hide"}</Text>
      </TouchableOpacity>

            </View>
        )}
      />

     
      {/* Le champ comfirmpassword  */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <InputField
            placeholder="Confirmer Mot de passe"
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            autoCapitalise="none"
            autoComplete="new-password"
            textContentType="newPassword"
            secureTextEntry={hidePassword}
            autoCorrect="new-password"
          
          />
        )}
      />
      <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
        <Text style={{ fontSize: 15 }}>{hidePassword ? "Show" : "Hide"}</Text>
      </TouchableOpacity>

      <Button title="Créer un compte" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{color:  "#1b3794", textAlign:"center", marginTop :10}}>J'ai déja un compte ? Connectez vous</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});