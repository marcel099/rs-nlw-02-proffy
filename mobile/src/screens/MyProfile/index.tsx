import { StatusBar, Text, View } from 'react-native';

import { ScreenHeader } from '@components/ScreenHeader';

import { styles } from './styles';

export function MyProfile() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <ScreenHeader title="Meu perfil" />
      <View style={styles.subheader}>
        <Text>John Doe</Text>
      </View>
    </View>
  );
}
