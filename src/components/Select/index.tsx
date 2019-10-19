import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

interface IProps {
    options: any[];
		changeReserveHandler: (field: any, value: any) => void;
		stateRef: string;
		value: any;
}

const SelectComp = ({ options, changeReserveHandler, stateRef, value }: IProps) => {
  const handleChange = (name: string) => (
    event: React.ChangeEvent<{ value: unknown }>,) => {
			changeReserveHandler(name, event.target.value)
  };

  return (
        <NativeSelect
          value={value}
          onChange={handleChange(stateRef)}
          inputProps={{
            name: stateRef,
          }}
        >
          <option value="">---</option>
          {options.map(
            option => <option key={`${option} Key`} value={option}>
              {option}
            </option>
          )}
        </NativeSelect>
  );
}

export const Select = SelectComp