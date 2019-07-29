import React, { useState } from 'react';
import { SearchBar } from 'antd-mobile';

export default function InputComp({ onSubmit, onCancel, onChange }: {
  onSubmit: (value: string) => void;
  onChange?: (value: string) => void;
  onCancel?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  function onSubmitValue(val: string): void {
    onSubmit(val);
  }

  function onCancelInput(value: string) {
    setValue("");

    onCancel && onCancel(value);
  }

  function onChangeValue(value: string) {
    setValue(value);

    onChange && onChange(value);
  }

  return <SearchBar placeholder="Search" onChange={onChangeValue} value={value} maxLength={8} onCancel={ onCancelInput } onSubmit={ onSubmitValue } />
}
