import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '@assets/images/icons/light-background-back.png';

import { NonAuthStackScreenProp } from '@routes/nonAuth.stack.routes';
import api from '@services/api';

import { AuthenticationScreenHeader } from '@components/AuthenticationScreenHeader';
import { ConfirmationButton } from '@components/form/ConfirmationButton';
import { InnerLabelInput } from '@components/form/InnerLabelInput';
import { LightScreenSubtitle } from '@components/texts/LightScreenSubtitle';
import { ScreenDescription } from '@components/texts/ScreenDescription';

import { styles } from './styles';

export function ForgottenPassword() {
  const navigation =
    useNavigation<NonAuthStackScreenProp<'ForgottenPassword'>['navigation']>();

  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  function handleGoBack() {
    navigation.navigate('SignIn');
  }

  async function handleSendResetPassword() {
    try {
      setIsSending(true);

      await api.post('/password/forgot', {
        email,
      });

      navigation.navigate('Confirmation', {
        title: 'Redefinição\nenviada!',
        description: 'Boa, agora é só checar o e-mail que foi\nenviado para você redefinir sua senha\ne aproveitar os estudos.',
        buttonTitle: 'Voltar ao login',
        nextScreenName: 'SignIn',
      });
    } catch (error) {
      setIsSending(false);

      Alert.alert(
        'Falha no envio',
        'Não foi possível enviar o e-mail de redefinição de senha.'
      );
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
            <AuthenticationScreenHeader />
            <View style={styles.main}>
              <View style={styles.backButtonContainer}>
                <BorderlessButton
                  onPress={handleGoBack}
                  style={styles.backButton}
                >
                  <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <View />
              </View>
              <LightScreenSubtitle
                subtitle="Esqueceu sua senha"
              />
              <ScreenDescription
                description={'Não esquenta,\nvamos dar um jeito nisso.'}
              />
              <View style={styles.form}>
                <InnerLabelInput
                  label="E-mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <ConfirmationButton
                title="Enviar"
                type="secondary"
                onPress={handleSendResetPassword}
                enabled={isSending ? false : !!email}
                isLoading={isSending}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
