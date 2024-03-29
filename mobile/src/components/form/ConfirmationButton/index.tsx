import { ActivityIndicator, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

interface ConfirmationButtonProps extends RectButtonProps {
  title: string;
  type: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function ConfirmationButton({
  title, type, isLoading = false, enabled = true, ...rest
}: ConfirmationButtonProps) {
  return (
    <RectButton
      style={[
        styles.button,
        enabled === false ? {
          backgroundColor: '#DCDCE5',
        } : type === 'primary' ? {
          backgroundColor: '#8257E5',
        } : {
          backgroundColor: '#04D361',
        },
      ]}
      enabled={enabled}
      {...rest}
    >
      {
        isLoading ? (
          <ActivityIndicator color="#9C98A6" />
        ) : (
          <Text
            style={[
              styles.title,
              enabled === false ? {
                color: '#9C98A6',
              } : {
                color: '#FFFFFF',
              },
            ]}
          >
            { title }
          </Text>
        )
      }
    </RectButton>
  );
}
