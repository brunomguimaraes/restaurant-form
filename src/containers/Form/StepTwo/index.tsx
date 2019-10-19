import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { NumberInput } from '../../../components/NumberInput';
import { Select } from '../../../components/Select';

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

type Meal = 'breakfast' | 'lunch' | 'dinner';

const mealTypes: Meal[] = ['breakfast' , 'lunch' , 'dinner'];

const StepTwoComp = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<{ meal: string; name: string }>({
    meal: '',
    name: 'hai',
  });

  const handleChange = (name: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.stepTwoContainer}>
      <FormControl className={classes.formControl}>
        <label className={classes.selectLabel}>Please select a restaurant: </label>
          {/* <Select options={mealTypes} /> */}
      </FormControl>
    </div>
  );
}

export const StepTwo = StepTwoComp