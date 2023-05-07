// import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import cameraIcon from '../../assets/images/icons/camera.png';
import { styles } from './styles';

interface UserAvatarProps {
  avatar: string | null;
  size: 'sm' | 'md' | 'lg';
  containButton?: boolean;
  onUserAvatarButtonPress?: (file: File | null) => void;
}

export function UserAvatar({
  avatar, size, containButton = false, onUserAvatarButtonPress,
}: UserAvatarProps) {
  const [selectedImageFile, setSelectedImageFile] =
    useState<string | null>(null);

  async function handlePickImage() {
    console.log('handlePickImage');
    // const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // if (status === 'granted') {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     aspect: [4, 4],
    //   });

    //   if (!result.cancelled) {
    //     setSelectedImageFile(result.uri);
    //   }
    // }
  }

  return (
    <View style={styles.container}>
      {
        avatar !== null ? (
          <Image
            source={{
              uri: selectedImageFile === null ? avatar : selectedImageFile,
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
