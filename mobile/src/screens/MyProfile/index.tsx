import { StatusBar, Text, View } from 'react-native';

import { styles } from './styles';

export function MyProfile() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#8257e5"
        translucent
      />
      <Text>Meu Perfil</Text>
    </View>
  );
}
