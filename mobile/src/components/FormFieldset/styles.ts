import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 8,
    borderBottomColor: '#E6E6F0',
    borderBottomWidth: 1,
  },
  legend: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 20,
    color: '#32264D',
    lineHeight: 30,
  },
  fieldsContainer: {
    marginTop: 24,
    marginBottom: 16,
    // backgroundColor: 'green',
  },
});
