import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable } from 'react-native';

import { formatDateToLocaleTime } from '@utils/formatters';

import { OuterLabelInput } from '../OuterLabelInput';

interface TimeInputProps {
  label: string
  value: string
  onChangeValue: (value: string) => void
}

export function TimeInput({ label, value, onChangeValue }: TimeInputProps) {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    try {
      const [hour, minute] = value.split(':');

      const currentDate = new Date();
      currentDate.setHours(Number(hour), Number(minute));

      setDate(currentDate);
    } catch (error) {
      Alert.alert(
        'Erro inesperado',
        'Ocorreu um erro em um campo de horário'
      );
    }
  }, []);

  function closePicker() {
    DateTimePickerAndroid.dismiss('time');
  }

  function onChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    if (event.type === 'set' && selectedDate !== undefined) {
      if (Platform.OS === 'android') {
        closePicker();
        setDate(selectedDate);
        onChangeValue(formatDateToLocaleTime(selectedDate));
      }
    } else {
      closePicker();
    }
  }

  function showPicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'time',
      display: 'clock',
      is24Hour: true,
    });
  }

  return (
    <Pressable onPress={showPicker} style={{ flex: 1 }}>
      <OuterLabelInput
        label={label}
        editable={false}
        value={value}
      />
    </Pressable>
  );
}
