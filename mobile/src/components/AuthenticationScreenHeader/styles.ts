import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8257E5',

    height: height * 0.46, // 379 * 100 / 812

    paddingTop: getStatusBarHeight(),
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',

    height: height * 0.29, // 238 * 100 / 812
    width: width * 0.7, //    266 * 100 / 375
  },
  slogan: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 17,
  },
});
