import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  userAvatar: {
    backgroundColor: '#C1BCCC',
  },
  noUserAvatar: {
    backgroundColor: '#C1BCCC',
  },
  sizeSm: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  sizeMd: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  sizeLg: {
    borderRadius: 70,
    width: 140,
    height: 140,
  },
  userAvatarButton: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#04D361',

    position: 'absolute',
    right: 4,
    bottom: 4,
  },
});
