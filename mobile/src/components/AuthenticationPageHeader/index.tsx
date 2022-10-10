import { Image, ImageBackground, Text, View } from "react-native";

import largeLogoImage from '../../assets/images/large-logo.png'
import authenticationBackground from '../../assets/images/authentication-background.png'

import { styles } from "./styles";

export function AuthenticationPageHeader() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={authenticationBackground}
        resizeMode="contain"
        style={styles.background}
      >
        <View>
          <Image source={largeLogoImage} />
          <Text style={styles.slogan}>
            Sua plataforma de{'\n'}estudos online.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
