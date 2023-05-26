import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  addNewClassScheduleText: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 14,
    color: '#8257E5',
    lineHeight: 26,
  },

  intervalSection: {
    flexDirection: 'row',
  },

  deleteClassScheduleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteClassScheduleButton: {
    paddingHorizontal: 24,
  },
  deleteClassScheduleButtonText: {
    fontFamily: 'Archivo_600SemiBold',
    fontSize: 12,
    color: '#E33D3D',
    lineHeight: 20,
  },
  deleteClassScheduleButtonLine: {
    flexGrow: 1,
    height: 1,

    backgroundColor: '#E6E6F0',
  },
});
