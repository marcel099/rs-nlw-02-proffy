import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F7',
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight() + 34,
  },
  bulletsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeader: {
    marginTop: 63,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    color: '#32264D',
    lineHeight: 42,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#6A6180',
    lineHeight: 24,
    marginTop: 16,
  },
  stepsContainer: {
    marginTop: 102,
    marginBottom: 40,
  },
  stepContent: {
    width: Dimensions.get('window').width - 64,
  },
  stepContentTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#32264D',
    lineHeight: 26,
  },
  stepContentForm: {
    width: '100%',
    marginVertical: 24,
  },
});
