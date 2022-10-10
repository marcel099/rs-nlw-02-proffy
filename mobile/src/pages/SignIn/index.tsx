import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

import { useAuth } from "../../contexts/AuthContext";
import { AuthenticationPageHeader } from "../../components/AuthenticationPageHeader";
import { ConfirmationButton } from "../../components/form/ConfirmationButton";
import { InnerLabelInput } from "../../components/form/InnerLabelInput";
import { AppStackScreenProp } from "../../routes/AppStack";

import { styles } from "./styles";

export function SignIn() {
  const navigation =
    useNavigation<AppStackScreenProp<'SignIn'>['navigation']>();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false);

  const { signIn } = useAuth();

  function handleChangeRememberMe() {
    setRememberMe(previousState => !previousState);
  }

  function handleNavigateToSignUp() {
    navigation.navigate('SignUp');
  }

  function handleNavigateToForgottenPassword() {
    // navigation.navigate('ForgottenPassword');
  }

  async function handleSignIn() {
    try {
      setIsSigningIn(true);

      signIn({
        email,
        password,
        rememberMe,
      });
    } catch (error) {
      Alert.alert('Falha no login', 'Não foi possível fazer login');
      setIsSigningIn(false); 
    }
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#8257E5"
        translucent
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <AuthenticationPageHeader />
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                Entrar
              </Text>
              <TouchableOpacity onPress={handleNavigateToSignUp}>
                <Text style={styles.signUpButtonText}>
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <InnerLabelInput
                label="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <InnerLabelInput
                label="Senha"
                isPasswordField
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.formOptions}>
                <TouchableWithoutFeedback
                  onPress={handleChangeRememberMe}
                >
                  <View style={styles.rememberMeContainer}>
                    <View
                      style={[
                        styles.rememberMeInput,
                        rememberMe
                        ? styles.rememberMeInputChecked
                        : styles.rememberMeInputUnchecked
                      ]}
                    >
                      <Feather name="check" size={16} color="#fff" />
                    </View>
                    <Text style={styles.rememberMeLabel}>Lembrar-me</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={handleNavigateToForgottenPassword}>
                  <Text style={styles.forgottenPasswordButtonText}>
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </View>
              <ConfirmationButton
                title="Entrar"
                type="secondary"
                onPress={handleSignIn}
                enabled={isSigningIn ? false : !!email && !!password}
                isLoading={isSigningIn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
