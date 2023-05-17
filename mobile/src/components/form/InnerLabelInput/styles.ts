import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    height: 64,

    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    borderColor: '#E6E6F0',

    position: 'relative',
  },
  fieldset: {
    // width: '100%',
    flexGrow: 1,
    // backgroundColor: 'blue',
  },
  hover: {
    position: 'absolute',
    left: 0,
    top: 12,

    height: 40,
    width: 2,

    backgroundColor: '#8257E5',
  },
  label: {
    fontFamily: 'Poppins_400Regular',

    position: 'absolute',
    // top: 20,
    left: 24,
  },
  input: {
    width: '100%',
    height: '100%',

    paddingTop: 16,
    paddingHorizontal: 24,

    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 14,
    lineHeight: 24,
  },
  changePasswordVisibilityButton: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 24,
    width: 24,
    marginRight: 24,
  },
});
