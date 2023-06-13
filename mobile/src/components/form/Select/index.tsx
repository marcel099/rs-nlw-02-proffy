import Dropdown from 'react-native-input-select';
import { DropdownProps } from 'react-native-input-select/src/types/index.types';

import { styles } from './styles';

type SelectProps = DropdownProps;

export function Select({ ...rest }: SelectProps) {
  return (
    <Dropdown
      dropdownContainerStyle={styles.dropdownContainerStyle}
      dropdownStyle={styles.dropdownStyle}
      selectedItemStyle={styles.selectedItemStyle}
      labelStyle={styles.labelStyle}
      placeholderStyle={styles.placeholderStyle}
      checkboxStyle={styles.checkboxStyle}
      {...rest}
    />
  );
}
