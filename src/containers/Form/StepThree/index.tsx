import React from 'react';
import * as api from '../../../data/dishes.json'

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
      minWidth: 360,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectLabel: {
			marginTop: theme.spacing(4),
			marginRight: theme.spacing(4),
      color: 'gray',
      fontSize: '0.8rem'
		},
		dishGrid: {
			display: 'grid',
			gridTemplateColumns: 'auto auto',
			justifyItems: 'start',
			alignItems: 'start',
			gridColumnGap: theme.spacing(4)
		}
  }),
);

interface IProps {
  changeReserveHandler: (field: any, value: any) => void;
  reserveValues: IReserve;
  error: IError;
}

const emptyDish = {
    name: '',
    quantity: 1,
    id: 0
  }

const StepThreeComp = ({ changeReserveHandler, reserveValues, error }: IProps) => {
    const classes = useStyles();

    const [dish, setDish] = React.useState(emptyDish);

    React.useEffect(() => {
        console.log("dish:", dish)
    }, [dish])

    const handleDishChange = (field: any, value: any) => {
        const dishQuery = api.dishes.find(dish => dish.id === parseInt(value))
        setDish({
          ...dish,
          [field]: value,
          'name': dishQuery!.name
          });
        }

    // const searchDishById = (id: any) => {
    //     return api.dishes.find(dish => dish.id === id)
    // }

  return (
    <div className={classes.stepOneContainer}>
      <FormControl error={error.dishes ? true : false} className={classes.formControl}>
				<div className={classes.dishGrid}>
        <label className={classes.selectLabel}>Please select a dish: </label>
        <label className={classes.selectLabel}>Please enter no of servings: </label>
        {reserveValues.dishes.map((dish) =>
					<>	
						<Select
							key={dish.id}
							value={dish.name}
							stateRef={'id'}
							options={
									api.dishes.filter(
										dish => dish.restaurant.includes(
											reserveValues.restaurant) &&
											dish.availableMeals.includes(
											reserveValues.mealType)).map(
												e => e
											)
							}
							selectById={true}
							changeReserveHandler={handleDishChange}
						/>
						<NumberInput
							key={`quantityKey` + dish.id}
							error={false}
							value={dish.quantity}
							stateRef={'quantity'}
							changeReserveHandler={handleDishChange}
						/>
					</>
					
				)}
				</div>
        {/* {reserveValues.dishes && reserveValues.dishes.map(
            (dish) =>
                <div key={`dishContainer` + dish.id}>
                    <div key={dish.id}>
                        {dish.name} | {dish.quantity}
                    </div>
                </div>)
        } */}
          {/* <Select
            value={reserveValues.mealType}
            stateRef={'mealType'}
            options={mealTypes}
            changeReserveHandler={changeReserveHandler}
          /> */}
          {error.dishes && <FormHelperText>{error.dishes}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export const StepThree = StepThreeComp