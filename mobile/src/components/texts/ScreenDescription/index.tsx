import { Text } from 'react-native';

import { styles } from './styles';

interface ScreenDescriptionProps {
  description: string;
}

export function ScreenDescription({ description }: ScreenDescriptionProps) {
  return (
    <Text style={styles.description}>
      {description}
    </Text>
  );
}
