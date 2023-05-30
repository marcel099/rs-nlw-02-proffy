import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },

  filterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9871F5',
  },

  filterMessage: {
    color: '#D4C2FF',
    fontFamily: 'Archivo_400Regular',
    fontSize: 16,
    lineHeight: 19,

    marginLeft: 16,
  },

  filterToggleStateIconContainer: {
    marginLeft: 'auto',
  },

  searchForm: {
    marginBottom: 40,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },

  filtersContainer: {
    width: '100%',
    marginTop: 16,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  weekDayFieldBlock: {
    width: '62.5%',
  },

  timeFieldBlock: {
    width: '32.5%',
  },
});
