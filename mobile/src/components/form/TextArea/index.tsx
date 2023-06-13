import { useState } from 'react';
import {
  Text, TextInput, TextInputProps, View,
} from 'react-native';

import { styles } from './styles';

interface TextAreaProps extends TextInputProps {
  label: string;
  description?: string;
}

export function TextArea({ label, description, ...rest }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{ label }</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
      <View style={styles.textAreaContainer}>
        { isFocused && <View style={styles.hover} /> }
        <TextInput
          multiline
          style={[
            styles.textArea,
          ]}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </View>
    </View>
  );
}
