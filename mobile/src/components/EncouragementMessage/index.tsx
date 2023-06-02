import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface EncouragementMessageProps {
  message: string;
  Icon: ReactNode;
}

export function EncouragementMessage({
  message, Icon,
}: EncouragementMessageProps) {
  return (
    <View style={styles.encouragementMessageContainer}>
      { Icon }
      <Text style={styles.encouragementMessage}>
        {message}
      </Text>
    </View>
  );
}
