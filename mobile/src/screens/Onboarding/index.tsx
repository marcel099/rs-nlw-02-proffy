import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import giveClassesIcon from '@assets/images/icons/give-classes-large.png';
import nextIcon from '@assets/images/icons/next.png';
import studyIcon from '@assets/images/icons/study-large.png';
import onboardingFirstStepBackground
  from '@assets/images/onboarding-first-step-background.png';
import onboardingSecondStepBackground
  from '@assets/images/onboarding-second-step-background.png';

import { useOnboarding } from '@contexts/OnboardingContext';
import { NonAuthStackScreenProp } from '@routes/nonAuth.stack.routes';

import { Bullet } from '@components/Bullet';

import { styles } from './styles';

export function Onboarding() {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NonAuthStackScreenProp<'Onboarding'>['navigation']>();
  const { handleCompleteOnboarding } = useOnboarding();

  const [stepIndex, setStepIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  function navigateNextScreen() {
    navigation.navigate('SignIn');
  }

  async function handleNextScreen() {
    if (stepIndex === 0) {
      setStepIndex(() => {
        const updatedStepIndex = 1;

        const nextXPos =
          ((width) * updatedStepIndex);

        scrollViewRef.current
          ?.scrollTo({
            x: nextXPos,
            animated: true,
          });

        return updatedStepIndex;
      });
    } else {
      const result = await handleCompleteOnboarding();
      if (result) {
        navigateNextScreen();
      }
    }
  }

  function handlePreviousStep() {
    setStepIndex(() => {
      const updatedStepIndex = 0;

      scrollViewRef.current
        ?.scrollTo({
          x: 0,
          animated: true,
        });

      return updatedStepIndex;
    });
  }

  function handleGoBack() {
    if (stepIndex === 1) {
      handlePreviousStep();
    }
    return true;
  }

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => BackHandler
      .removeEventListener('hardwareBackPress', handleGoBack);
  }, [stepIndex]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        style={styles.stepsContainer}
      >
        <View style={styles.stepContent}>
          <View
            style={[
              styles.stepContentHeader,
              styles.firstStepContentHeader,
            ]}
          >
            <ImageBackground
              source={onboardingFirstStepBackground}
              resizeMode="contain"
              style={[
                styles.stepContentHeaderBackground,
                styles.firstStepContentHeaderBackground,
              ]}
            >
              <Image source={studyIcon} />
            </ImageBackground>
          </View>
          <View style={styles.stepContentBody}>
            <Text style={styles.stepContentBodyNumber}>01.</Text>
            <Text style={styles.stepContentBodyMessage}>
              Encontre vários{'\n'}professores para{'\n'}ensinar você
            </Text>
          </View>
        </View>
        <View style={styles.stepContent}>
          <View
            style={[
              styles.stepContentHeader,
              styles.secondStepContentHeader,
            ]}
          >
            <ImageBackground
              source={onboardingSecondStepBackground}
              resizeMode="contain"
              style={[
                styles.stepContentHeaderBackground,
                styles.secondStepContentHeaderBackground,
              ]}
            >
              <Image source={giveClassesIcon} />
            </ImageBackground>
          </View>
          <View style={styles.stepContentBody}>
            <Text style={styles.stepContentBodyNumber}>02.</Text>
            <Text style={styles.stepContentBodyMessage}>
              Ou dê aulas{'\n'}sobre o que você{'\n'}mais conhece
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.bulletsContainer}>
          <Bullet active={stepIndex === 0} />
          <Bullet active={stepIndex === 1} />
        </View>
        <TouchableOpacity
          onPress={handleNextScreen}
          style={styles.nextScreenButton}
        >
          <Image source={nextIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}
