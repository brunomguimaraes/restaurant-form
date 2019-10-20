import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

interface IProps {
    options: any[];
		changeReserveHandler: (field: any, value: any) => void;
		stateRef: any;
    value: any;
    selectById?: boolean
}

const SelectComp = ({ options, changeReserveHandler, stateRef, value, selectById }: IProps) => {

  const handleChange = (name: string) => (
    event: React.ChangeEvent<{ value: unknown }>,) => {
			changeReserveHandler(name, event.target.value)
  };

  const handleManyParamsChange = (name: string) => (
    event: React.ChangeEvent<{ value: unknown }>,) => {
      changeReserveHandler(name, event.target.value)
  };

  return (
    selectById ? (
      <NativeSelect
      value={value}
      onChange={handleManyParamsChange(stateRef)}
      inputProps={{
        name: stateRef,
      }}
    >
      <option value="">---</option>
      {options.map(
        option => <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )}
    </NativeSelect> ) : (
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
        </NativeSelect>)
  );
}

export const Select = SelectComp