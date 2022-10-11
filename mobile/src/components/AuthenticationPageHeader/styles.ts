import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8257E5',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 212,
    width: 238,
    marginTop: getStatusBarHeight() + 39,
    marginBottom: 38,
  },
  slogan: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 17,
  },
});
