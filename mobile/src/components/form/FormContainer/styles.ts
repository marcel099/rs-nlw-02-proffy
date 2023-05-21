import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: -40,
    marginBottom: 23,
    marginHorizontal: 16,
    borderColor: '#E6E6F0',
    borderWidth: 1,

    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,

    backgroundColor: '#fff',

    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 8,

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButtonContainer: {
    backgroundColor: '#FAFAFC',
    padding: 24,

    borderTopColor: '#E6E6F0',
    borderTopWidth: 1,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 28,
  },
  warningMessageContainer: {
    marginLeft: 16,
  },
  warningMessage: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 20,
  },
  warningMessageHeader: {
    color: '#8257E5',
  },
  warningMessageDescription: {
    color: '#A0A0B2',
  },
});
