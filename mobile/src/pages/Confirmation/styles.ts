import { StyleSheet } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,

    backgroundColor: '#8257E5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: getStatusBarHeight() + 25,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 32,
    lineHeight: 37,
    textAlign: 'center',

    marginTop: 24,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',
    textAlign: 'center',

    marginTop: 16,
  },
  footer: {
    marginTop: 37,
    marginBottom: getBottomSpace() + 46,
  },
});
