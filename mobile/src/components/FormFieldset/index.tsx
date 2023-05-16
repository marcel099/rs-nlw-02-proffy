import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

interface FormFieldsetProps {
  legend: string;
  children: ReactNode;
}

export function FormFieldset({ legend, children }: FormFieldsetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>{ legend }</Text>
      </View>
      <View style={styles.fieldsContainer}>
        { children }
      </View>
    </View>
  );
}
