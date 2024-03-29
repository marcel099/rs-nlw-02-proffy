import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden', // Precisa para não dar conflito com o rodapé
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee', // Tática para dar a impressão que a imagem está carregando enquanto ela não estiver presente
  },

  profileInfo: {
    marginLeft: 16,
  },

  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264d',
    fontSize: 20,
  },

  subject: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 12,

    marginTop: 4,
  },

  bio: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6a6180',

    marginHorizontal: 24,
    marginBottom: 24,
  },

  classSchedulesContainer: {
    padding: 24,
    borderTopColor: '#E6E6F0',
    borderTopWidth: 1,
  },

  classScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 24,
  },

  classScheduleInfoHeader: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#9C98A6',
  },

  classSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#FAFAFC',

    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
  },

  classScheduleInfo: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 21,
    color: '#6A6180',
  },

  nonexistentClassSchedule: {
    opacity: 0.5,
  },

  footer: {
    alignItems: 'center',

    backgroundColor: '#fafafc',

    padding: 24,
    borderTopColor: '#E6E6F0',
    borderTopWidth: 1,
  },

  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceMessage: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 14,
  },

  priceValue: {
    fontFamily: 'Archivo_700Bold',
    color: '#8257e5',
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',

    width: '100%',

    marginTop: 24,
  },

  favoriteButton: {
    backgroundColor: '#8257e5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  favorited: {
    backgroundColor: '#e33d3d',
  },

  contactButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#04d361',

    paddingVertical: 15,
    borderRadius: 8,
  },

  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16,
  },
});
