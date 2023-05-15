import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 22,
  },
  inputContainer: {
    position: 'relative',

    width: '100%',
    height: 56,

    backgroundColor: '#FAFAFC',

    paddingHorizontal: 24,
    marginTop: 4,

    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
  },
  hover: {
    position: 'absolute',
    left: 0,
    top: 8,

    height: 40,
    width: 2,

    backgroundColor: '#8257E5',
  },
  input: {
    width: '100%',
    height: '100%',

    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
  },
  filledInput: {
    color: '#6A6180',
  },
  notFilledInput: {
    color: '#9C98A6',
  },
});
