import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

// import giveClassesBGImage from '@assets/images/give-classes-background.png';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';

import { styles } from './styles';

export function GiveClasses() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ScreenHeader title="Dar aulas" />
            <View style={styles.subheader}>
              <ScreenSubtitle
                subtitle={'Que incrível que você\nquer dar aulas.'}
              />
              <Text style={styles.screenDescription}>
                O primeiro passo é preencher este{'\n'}formulário de inscrição
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
