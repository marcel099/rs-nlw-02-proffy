import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '@assets/images/icons/back.png';
import logoImg from '@assets/images/logo.png';

import { AppStackScreenProp } from '@routes/app.stack.routes';

import { styles } from './styles';

interface ScreenHeaderProps {
  title: string,
}

export function ScreenHeader({
  title,
}: ScreenHeaderProps) {
  const { navigate } =
    useNavigation<AppStackScreenProp<'Study'>['navigation']>();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Text style={styles.title}>{title}</Text>
        <Image source={logoImg} resizeMode="contain" />
      </View>
    </View>
  );
}
