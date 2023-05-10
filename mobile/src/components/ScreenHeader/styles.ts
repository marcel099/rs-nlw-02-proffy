import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
  },

  topBar: {
    marginTop: getStatusBarHeight(),
    paddingHorizontal: 32,
    height: 71,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#774DD6',
  },
  title: {
    fontFamily: 'Archivo_400Regular',
    color: '#D4C2FF',
    fontSize: 14,
  },
});
