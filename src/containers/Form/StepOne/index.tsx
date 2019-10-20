import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText } from '@material-ui/core';

import { IReserve, IError } from '../../Main';

import { NumberInput } from '../../../components/NumberInput';
import { Select } from '../../../components/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepOneContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectLabel: {
      marginTop: theme.spacing(4),
      color: 'gray',
      fontSize: '0.8rem'
    }
  }),
);

export type Meal = 'breakfast' | 'lunch' | 'dinner';

const mealTypes: Meal[] = ['breakfast' , 'lunch' , 'dinner'];

interface IProps {
  changeReserveHandler: (field: any, value: any) => void;
  reserveValues: IReserve;
  error: IError;
}

const StepOneComp = ({ changeReserveHandler, reserveValues, error }: IProps) => {
  const classes = useStyles();
  
  return (
    <div className={classes.stepOneContainer}>
      <FormControl error={error.mealType ? true : false} className={classes.formControl}>
        <label className={classes.selectLabel}>Please select a meal: </label>
          <Select
            value={reserveValues.mealType}
            stateRef={'mealType'}
            options={mealTypes}
            changeReserveHandler={changeReserveHandler}
          />
          {error.mealType && <FormHelperText>{error.mealType}</FormHelperText>}
        <label className={classes.selectLabel}>Please enter the number of people(up to 10):  </label>
          <NumberInput
            error={error.quantityOfPeople ? true : false}
            value={reserveValues.quantityOfPeople}
            stateRef={'quantityOfPeople'}
            changeReserveHandler={changeReserveHandler}
          />
          {error.quantityOfPeople && <FormHelperText>{error.quantityOfPeople}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export const StepOne = StepOneComp