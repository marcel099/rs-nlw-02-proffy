import { useEffect, useRef, useState } from 'react';
import {
  useWindowDimensions,
  BackHandler,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';

import { Bullet } from '../../components/Bullet';
import { ConfirmationButton } from '../../components/form/ConfirmationButton';
import { InnerLabelInput } from '../../components/form/InnerLabelInput';

import { styles } from "./styles";

export function SignUp() {
  const { width } = useWindowDimensions();

  const [stepIndex, setStepIndex] = useState(0);

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
      console.log('handleGoBack')
    } else if (stepIndex === 1) {
      handlePreviousStep();
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F0F0F7"
        translucent
      />
      <View style={styles.container}>
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
                onChangeText={setFirstName}
              />
              <InnerLabelInput
                label="Sobrenome"
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
              enabled={!!email && !!password}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
