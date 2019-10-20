import React from 'react';
import * as api from '../../../data/dishes.json'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
		},
		fab: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface IProps {
  addNewDish: (dish: any) => void;
  reserveValues: IReserve;
  error: IError;
}

const emptyDish = {
    name: '',
    quantity: 1,
    id: 0
  }

const StepThreeComp = ({ addNewDish, reserveValues, error }: IProps) => {
    const classes = useStyles();

    const handleDishChange = (name: any, value: any, id: any) => {
			console.log('name: ', name)
			console.log('value: ', value)
			if (name === 'id') {
				const dishQuery = searchDishById(value) 
				console.log('selectedDish', dishQuery)
				addNewDish({
					name: dishQuery!.name,
					id: dishQuery!.id,
					quantity: 1
				})
			} else if (name === 'quantity') {
				const dishQuery = searchDishById(id) 
				console.log('selectedDish', dishQuery)
				console.log('iD QUANTI', id)
			}
        // setDish({
        //   ...dish,
        //   [field]: value,
        //   'name': dishQuery!.name
				// 	});
					// addNewDish(dishQuery)
        }

    const searchDishById = (id: any) => {
        return api.dishes.find(dish => dish.id === parseInt(id))
    }

  return (
    <div className={classes.stepOneContainer}>
      <FormControl error={error.dishes ? true : false} className={classes.formControl}>
				<div className={classes.dishGrid}>
        <label className={classes.selectLabel}>Please select a dish: </label>
        <label className={classes.selectLabel}>Please enter no of servings: </label>
        {reserveValues.dishes.map((dish) =>
					<React.Fragment key={dish.id+` Key`}>	
						<Select
							key={dish.id}
							value={dish.id}
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
					</React.Fragment>
					
				)}
				</div>
				{error.dishes && <FormHelperText>{error.dishes}</FormHelperText>}
				<Fab onClick={() => addNewDish(emptyDish)} color="primary" aria-label="add" className={classes.fab}>
        	<AddIcon />
      	</Fab>
      </FormControl>
    </div>
  );
}

export const StepThree = StepThreeComp