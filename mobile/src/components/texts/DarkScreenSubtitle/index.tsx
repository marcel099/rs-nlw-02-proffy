import { Text } from 'react-native';

import { styles } from './styles';

interface DarkScreenSubtitleProps {
  subtitle: string;
}

export function DarkScreenSubtitle({ subtitle }: DarkScreenSubtitleProps) {
  return (
    <Text style={styles.subtitle}>
      {subtitle}
    </Text>
  );
}
