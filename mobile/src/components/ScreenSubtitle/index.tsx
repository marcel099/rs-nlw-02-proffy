import { Text } from 'react-native';

import { styles } from './styles';

interface ScreenSubtitleProps {
  subtitle: string;
}

export function ScreenSubtitle({ subtitle }: ScreenSubtitleProps) {
  return (
    <Text style={styles.subtitle}>
      {subtitle}
    </Text>
  );
}
