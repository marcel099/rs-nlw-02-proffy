import { ReactNode } from 'react';
import { View } from 'react-native';

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
      </View>
    </View>
  );
}
