import { Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

interface ConfirmationButtonProps extends RectButtonProps {
  title: string;
  type: 'primary' | 'secondary';
}

export function ConfirmationButton({
  title, type, enabled = true, ...rest
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
          backgroundColor: '#04D361'
        }
      ]}
      enabled={enabled}
      {...rest}
    >
      <Text
        style={[
          styles.title,
          enabled === false ? {
            color: '#9C98A6',
          } : {
            color: '#FFFFFF',
          }
        ]}
      >
        { title }
      </Text>
    </RectButton>
  );
}
