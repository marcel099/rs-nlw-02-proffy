import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',

    backgroundColor: '#FAFAFC',
  },
  focusedContainer: {
    borderTopColor: '#8257E5',
    borderTopWidth: 2,

    backgroundColor: '#EBEBF5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 13,

    marginLeft: 16,
  },
});
