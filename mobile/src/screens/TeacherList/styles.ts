import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  subheader: {
    backgroundColor: '#8257E5',

    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 72,
  },

  screenDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  teacherList: {
    marginTop: -60,
  },

  teacherListWarningContainer: {
    // flex: 1,
    // alignItems: 'center',
  },

  noTeachersFoundMessage: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#9C98A6',
    lineHeight: 22,
    textAlign: 'center',
  },
});
