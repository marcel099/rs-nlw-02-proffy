import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';

import confirmationBGImage from '@assets/images/confirmation-background.png';
import successCheckIcon from '@assets/images/icons/success-check-icon.png';

import { AppStackScreenProp } from '@routes/app.stack.routes';

import { ConfirmationButton } from '@components/form/ConfirmationButton';

import { styles } from './styles';

export function Confirmation() {
  const navigation =
    useNavigation<AppStackScreenProp<'Confirmation'>['navigation']>();
  const {
    params: {
      title, description, buttonTitle, nextScreenName,
    },
  } = useRoute<AppStackScreenProp<'Confirmation'>['route']>();

  function handleNavigate() {
    navigation.navigate(nextScreenName as any);
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <ImageBackground
          source={confirmationBGImage}
          resizeMode="contain"
          style={styles.content}
        >
          <Image source={successCheckIcon} resizeMode="contain" />
          <Text style={styles.title}>
            { title }
          </Text>
          <Text style={styles.description}>
            { description }
          </Text>
        </ImageBackground>
        <View style={styles.footer}>
          <ConfirmationButton
            title={buttonTitle}
            type="secondary"
            onPress={handleNavigate}
          />
        </View>
      </View>
    </>
  );
}
