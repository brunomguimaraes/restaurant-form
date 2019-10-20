import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IReserve, IError } from '../../Main';
import * as api from '../../../data/dishes.json'
import { Select } from '../../../components/Select';
import { FormControl, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepTwoContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectLabel: {
      marginTop: theme.spacing(4),
      color: 'gray',
      fontSize: '0.8rem'
    }
  }),
);

interface IProps {
  changeReserveHandler: (field: any, value: any) => void;
  reserveValues: IReserve;
  error: IError;
}
const StepTwoComp = ({reserveValues, changeReserveHandler, error}: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.stepTwoContainer}>
      <FormControl className={classes.formControl}>
        <label className={classes.selectLabel}>Please select a restaurant: </label>
          <Select
            value={reserveValues.restaurant}
            stateRef={'restaurant'}
            options={Array.from(
              new Set(
                api.dishes.filter(
                  dish => dish.availableMeals.includes(
                    reserveValues.mealType)).map(
                      e => e.restaurant
                    )
                )
            )}
            changeReserveHandler={changeReserveHandler}
          />
          {error.restaurant && <FormHelperText>{error.restaurant}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export const StepTwo = StepTwoComp