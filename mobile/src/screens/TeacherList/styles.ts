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

  noTeachersFoundMessage: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#9C98A6',
    lineHeight: 22,
    textAlign: 'center',
  },

  fetchNextPageButton: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    paddingVertical: 8,
    marginTop: 8,
  },

  fetchNextPageButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#9C98A6',
    lineHeight: 24,
  },

  endTeacherListMessage: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#6A6180',
    lineHeight: 22,
    textAlign: 'center',

    marginTop: 8,
  },
});
