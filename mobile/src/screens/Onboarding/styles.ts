import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  stepsContainer: {
    flex: 1,
  },
  stepContent: {
    width: Dimensions.get('window').width,
  },
  stepContentHeader: {
    justifyContent: 'flex-end',
    alignItems: 'center',

    height: height * 0.43, // 350 * 100 / 812
    paddingBottom: height * 0.056, // 46 * 100 / 812
    paddingTop: getStatusBarHeight(),
  },
  firstStepContentHeader: {
    // paddingTop: getStatusBarHeight() + (height * 0.048), // 39 * 100 / 812
    backgroundColor: '#8257E5',
  },
  secondStepContentHeader: {
    // paddingTop: getStatusBarHeight() + (height * 0.086), // 70 * 100 / 812
    backgroundColor: '#04D361',
  },
  stepContentHeaderBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center', // (69 + 234.62) - (150 + 120)

    paddingBottom: height * 0.041, // 33.62 * 100 / 812
  },
  firstStepContentHeaderBackground: {
    width: width * 0.66, //   248 * 100 / 375
    height: height * 0.28, // 234 * 100 / 812
  },
  secondStepContentHeaderBackground: {
    width: width * 0.66, //   248 * 100 / 375
    height: height * 0.25, // 204 * 100 / 812
  },
  stepContentBody: {
    paddingHorizontal: 40,
  },
  stepContentBodyNumber: {
    fontFamily: 'Archivo_500Medium',
    fontSize: 40,
    color: '#6A6180',
    opacity: 0.26,

    marginTop: height * 0.118, // 96 * 100 / 812
  },
  stepContentBodyMessage: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    color: '#6A6180',
    lineHeight: 34,

    marginTop: height * 0.029, // 24 * 100 / 812
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: height * 0.096, //     78 * 100 / 812
    marginBottom: height * 0.0541, // 44 * 100 / 812
    paddingHorizontal: 40,
  },
  bulletsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextScreenButton: {
    marginRight: -12,
  },
});
