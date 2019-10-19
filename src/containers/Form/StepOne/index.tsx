import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { NumberInput } from '../../../components/NumberInput';
import { Select } from '../../../components/Select';
import { IReserve } from '../../Main';

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
      fontSize: '1rem'
    }
  }),
);

export type Meal = 'breakfast' | 'lunch' | 'dinner';

const mealTypes: Meal[] = ['breakfast' , 'lunch' , 'dinner'];

interface IProps {
  changeReserveHandler: (field: any, value: any) => void;
  reserveValues: IReserve
}

const StepOneComp = ({ changeReserveHandler, reserveValues }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.stepOneContainer}>
      <FormControl className={classes.formControl}>
        <label className={classes.selectLabel}>Please select a meal: </label>
          <Select
            value={reserveValues.mealType}
            stateRef={'mealType'}
            options={mealTypes}
            changeReserveHandler={changeReserveHandler}
          />
        <label className={classes.selectLabel}>Please enter number of people: </label>
          <NumberInput />
      </FormControl>
    </div>
  );
}

export const StepOne = StepOneComp