import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  teacherList: {
    marginTop: -40,
  },

  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#8257E5',

    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 72,
  },

  noFavoriteTeachersFoundMessage: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#9C98A6',
    lineHeight: 22,
    textAlign: 'center',
  },
});
