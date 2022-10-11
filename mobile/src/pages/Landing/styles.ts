import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#8257e5',
    paddingHorizontal: 40,
  },

  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: getStatusBarHeight() + 22.4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  noUserAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,

    backgroundColor: '#C1BCCC'
  },
  userName: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 22,

    marginLeft: 16,
  },

  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 40,
    width: 40,
    borderRadius: 8,
  
    backgroundColor: '#774DD6',
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 28,
    marginBottom: 29.4,
  },

  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,

    paddingHorizontal: 40,
    marginTop: 29.4,
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 16,
    paddingHorizontal: 40,
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#9871f5',
  },

  buttonSecondary: {
    backgroundColor: '#04d361',
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#ffffff',
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,

    marginTop: 33,
    paddingHorizontal: 40,
  },
})

export default styles;