import { useState } from 'react';
import {
  Text, TextInput, TextInputProps, View,
} from 'react-native';

import { styles } from './styles';

interface OuterLabelInputProps extends TextInputProps {
  label: string;
  value: string;
}

export function OuterLabelInput({
  label, value, ...rest
}: OuterLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = !!value;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <View style={styles.inputContainer}>
        { isFocused && <View style={styles.hover} /> }
        <TextInput
          style={[
            styles.input,
            isFilled || isFocused
              ? styles.filledInput
              : styles.notFilledInput,
          ]}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
      </View>
    </View>
  );
}
