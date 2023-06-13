import { Feather } from '@expo/vector-icons';
import { memo, useMemo, useState } from 'react';
import {
  Text, TextInputProps, TextInput, View,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { styles } from './styles';

interface InnerLabelInputProps extends TextInputProps {
  label: string,
  isPasswordField?: boolean,
}

function InnerLabelInputComponent({
  label, isPasswordField = false, ...rest
}: InnerLabelInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function toggleVisibility() {
    setIsPasswordVisible((previousState) => !previousState);
  }

  const isFilledOut = useMemo(() => !!rest.value, [rest.value]);

  return (
    <View style={styles.container}>
      { isFocused && <View style={styles.hover} /> }
      <View style={styles.fieldset}>
        <Text style={[
          styles.label,
          isFocused || isFilledOut
            ? styles.filledOutInputLabel
            : styles.notFilledOutInputLabel,
        ]}
        >
          {label}
        </Text>

        <TextInput
          style={styles.input}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {
            ...(
              isPasswordField ? {
                autoCapitalize: 'none',
                autoCorrect: false,
                secureTextEntry: !isPasswordVisible,
              } : {}
            )
          }
          {...rest}
        />
      </View>

      {
        isPasswordField && (
          <BorderlessButton
            style={styles.changePasswordVisibilityButton}
            onPress={toggleVisibility}
          >
            <Feather
              name={!isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#9C98A6"
            />
          </BorderlessButton>
        )
      }
    </View>
  );
}

export const InnerLabelInput = memo(
  InnerLabelInputComponent,
  (previousProps, newProps) => previousProps.value === newProps.value
);
