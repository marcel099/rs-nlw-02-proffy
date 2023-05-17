import { memo, useMemo, useState } from 'react';
import {
  Text, TextInput, TextInputProps, View,
} from 'react-native';

import { styles } from './styles';

interface OuterLabelInputProps extends TextInputProps {
  label: string;
}

function OuterLabelInputComponent({
  label, ...rest
}: OuterLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFilledOut = useMemo(() => !!rest.value, [rest.value]);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <View style={styles.inputContainer}>
        { isFocused && <View style={styles.hover} /> }
        <TextInput
          style={[
            styles.input,
            isFocused || isFilledOut
              ? styles.filledOutInput
              : styles.notFilledOutInput,
          ]}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </View>
    </View>
  );
}

export const OuterLabelInput = memo(
  OuterLabelInputComponent,
  (previousProps, newProps) => previousProps.value === newProps.value
);
