import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 22,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#C1BCCC',
    lineHeight: 16,

    marginLeft: 16,
  },
  textAreaContainer: {
    position: 'relative',

    width: '100%',
    height: 360,

    backgroundColor: '#FAFAFC',

    padding: 24,
    marginTop: 4,

    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,
  },
  hover: {
    position: 'absolute',
    left: 0,
    top: 12,

    height: 336,
    width: 2,

    backgroundColor: '#8257E5',
  },
  textArea: {
    width: '100%',
    height: '100%',

    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',

    textAlignVertical: 'top',
  },
});
