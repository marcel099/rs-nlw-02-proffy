import { useEffect, useRef, useState } from 'react';
import {
  useWindowDimensions,
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import api from '../../services/api';
import { NonAuthStackScreenProp } from '../../routes/nonAuth.stack.routes';

import { Bullet } from '../../components/Bullet';
import { ConfirmationButton } from '../../components/form/ConfirmationButton';
import { InnerLabelInput } from '../../components/form/InnerLabelInput';

import { styles } from "./styles";

export function SignUp() {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NonAuthStackScreenProp<'SignUp'>['navigation']>();

  const [stepIndex, setStepIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const scrollViewRef = useRef<ScrollView>(null)

  function handleNextStep() {
    setStepIndex(previous => {
      const updatedStepIndex = 1;

      const nextXPos
        = ((width - 64) * updatedStepIndex) + (32 * updatedStepIndex);

      scrollViewRef.current
        ?.scrollTo({
          x: nextXPos,
          animated: true
        });
      
      return updatedStepIndex;
    });
  };

  function handlePreviousStep() {
    setStepIndex(previous => {
      const updatedStepIndex = 0;

      scrollViewRef.current
        ?.scrollTo({
          x: 0,
          animated: true
        });
      
      return updatedStepIndex;
    });
  }

  function handleGoBack() {
    if (stepIndex === 0) {
      navigation.navigate('SignIn')
    } else if (stepIndex === 1) {
      handlePreviousStep();
    }
    return true;
  }

  async function handleCreateUser() {
    try {
      setIsSaving(true);
      await api.post('/users', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      navigation.navigate('Confirmation', {
        title: 'Cadastro\nconcluído!',
        description: 'Agora você faz parte da\nplataforma Proffy',
        buttonTitle: 'Fazer login',
        nextScreenName: 'SignIn',
      });
    } catch ( error ) {
      setIsSaving(false);
      console.log(error);
      Alert.alert('Cadastro', 'Não foi possível fazer o cadastro.');
    }
  }

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
  }, [stepIndex]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F0F0F7"
        translucent
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.container}
          >
            <View style={styles.header}>
              <BorderlessButton onPress={handleGoBack}>
                <Image source={backIcon} resizeMode="contain" />
              </BorderlessButton>
              <View style={styles.bulletsContainer}>
                <Bullet active={stepIndex === 0} />
                <Bullet active={stepIndex === 1} />
              </View>
            </View>
            <View style={styles.contentHeader}>
              <Text style={styles.title}>
                Crie sua {'\n'}
                conta gratuita
              </Text>
              <Text style={styles.description}>
                Basta preencher esses dados {'\n'}
                e você estará conosco
              </Text>
            </View>
            <ScrollView
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              style={styles.stepsContainer}
            >
              <View style={styles.stepContent}>
                <Text style={styles.stepContentTitle}>
                  01.  Quem é você?
                </Text>
                <View style={styles.stepContentForm}>
                  <InnerLabelInput
                    label="Nome"
                    value={firstName}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setFirstName}
                  />
                  <InnerLabelInput
                    label="Sobrenome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
                <ConfirmationButton
                  title="Próximo"
                  type="primary"
                  onPress={handleNextStep}
                  enabled={!!firstName && !!lastName}
                />
              </View>
              <View style={[ styles.stepContent, { marginLeft: 32 } ]}>
                <Text style={styles.stepContentTitle}>
                  02.  Email e Senha
                </Text>
                <View style={styles.stepContentForm}>
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
                </View>
                <ConfirmationButton
                  title="Concluir cadastro"
                  type="secondary"
                  onPress={handleCreateUser}
                  enabled={isSaving ? false : !!email && !!password}  
                  isLoading={isSaving}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
