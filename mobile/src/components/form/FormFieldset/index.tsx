import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface FormFieldsetProps {
  legend: string;
  headerAsideContent?: ReactNode;
  children: ReactNode;
}

export function FormFieldset({
  legend, headerAsideContent, children,
}: FormFieldsetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>{ legend }</Text>
        { headerAsideContent }
      </View>
      <View style={styles.fieldsContainer}>
        { children }
      </View>
    </View>
  );
}
