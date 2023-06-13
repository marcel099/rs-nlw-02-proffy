import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 32,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 32,
    marginTop: 39,
  },
  signUpButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8257E5',
    lineHeight: 24,
  },
  form: {
    width: '100%',
    marginVertical: 24,
    paddingHorizontal: 32,
  },
  formOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
  },
  rememberMeInput: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 24,
    height: 24,
    borderRadius: 8,
  },
  rememberMeInputChecked: {
    backgroundColor: '#04D361',
  },
  rememberMeInputUnchecked: {
    borderWidth: 1,
    borderColor: '#E6E6F0',

    backgroundColor: '#ffffff',
  },
  rememberMeLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 24,

    marginLeft: 12,
  },
  forgottenPasswordButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 24,
  },
});
