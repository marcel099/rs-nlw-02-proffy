import { Text } from 'react-native';

import { styles } from './styles';

interface LightScreenSubtitleProps {
  subtitle: string;
}

export function LightScreenSubtitle({
  subtitle,
}: LightScreenSubtitleProps) {
  return (
    <Text style={styles.subtitle}>
      { subtitle }
    </Text>
  );
}
