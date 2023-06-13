import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subheader: {
    backgroundColor: '#8257E5',

    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 80,
  },
  screenDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',

    marginTop: 16,
  },
  personalDataSection: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 24,
  },
  userName: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
    color: '#32264D',
    lineHeight: 25,

    marginLeft: 16,
  },
  // container: {
  //   backgroundColor: '#8257e5',
  //   flex: 1,
  //   justifyContent: 'center',
  //   padding: 40,
  // },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    marginTop: 24,
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
    maxWidth: 440,
  },

  okButton: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});
