import { useState } from 'react';

export default function useResettableState(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const resetValue = () => setValue(defaultValue);
  return [
    value,
    setValue,
    resetValue,
  ];
}
