import { ReactNode } from 'react';
import { Image, Text, View } from 'react-native';

import warningIcon from '@assets/images/icons/warning.png';

import { ConfirmationButton } from '../ConfirmationButton';
import { styles } from './styles';

interface FormContainerProps {
  submitButtonTitle: string;
  handleFormSubmit: () => void;
  children: ReactNode;
}

export function FormContainer({
  submitButtonTitle, handleFormSubmit, children,
}: FormContainerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        { children }
      </View>
      <View style={styles.submitButtonContainer}>
        <ConfirmationButton
          title={submitButtonTitle}
          type="secondary"
          onPress={handleFormSubmit}
        />
        <View style={styles.warningContainer}>
          <Image source={warningIcon} resizeMode="contain" />
          <View style={styles.warningMessageContainer}>
            <Text
              style={[
                styles.warningMessage,
                styles.warningMessageHeader,
              ]}
            >
              Importante!
            </Text>
            <Text
              style={[
                styles.warningMessage,
                styles.warningMessageDescription,
              ]}
            >
              Preencha todos os dados
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
