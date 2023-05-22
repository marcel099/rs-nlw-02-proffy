import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import cameraIcon from '@assets/images/icons/camera.png';

import { styles } from './styles';

interface UserAvatarProps {
  avatar: string | null;
  size: 'sm' | 'md' | 'lg';
  containButton?: boolean;
  onUserAvatarButtonPress?: (fileUri: string) => void;
}

export function UserAvatar({
  avatar, size, containButton = false, onUserAvatarButtonPress,
}: UserAvatarProps) {
  async function handlePickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'granted' && onUserAvatarButtonPress !== undefined) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        selectionLimit: 1,
      });

      if (!result.cancelled) {
        onUserAvatarButtonPress(result.uri);
      }
    }
  }

  return (
    <View style={styles.container}>
      {
        avatar !== null ? (
          <Image
            source={{
              uri: avatar,
            }}
            style={[
              styles.noUserAvatar,
              size === 'sm' ? styles.sizeSm
                : size === 'md' ? styles.sizeMd
                  : styles.sizeLg,
            ]}
          />
        ) : (
          <View
            style={[
              styles.noUserAvatar,
              size === 'sm' ? styles.sizeSm
                : size === 'md' ? styles.sizeMd
                  : styles.sizeLg,
            ]}
          />
        )
      }
      {
        containButton && (
          <RectButton
            onPress={handlePickImage}
            style={styles.userAvatarButton}
          >
            <Image source={cameraIcon} />
          </RectButton>
        )
      }
    </View>
  );
}
