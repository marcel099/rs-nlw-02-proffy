import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface StudyBottomTabProps {
  label: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean;
}

export function StudyBottomTab({
  label, iconName, color, focused,
}: StudyBottomTabProps) {
  return (
    <View
      style={[
        styles.container,
        focused ? styles.focusedContainer : null,
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? '#8257e5' : color}
        />
        <Text
          style={[
            styles.label,
            { color },
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}
