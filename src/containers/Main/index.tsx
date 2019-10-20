import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { StepOne, Meal } from '../Form/StepOne';
import { StepTwo } from '../Form/StepTwo';

import validate from '../../utils/validation'

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3', 'Preview'];
}

export interface IReserve {
  mealType: Meal | '';
  quantityOfPeople: number;
  restaurant: string;
  dishes: IDishes[];
}

export interface IDishes {
  name: string;
  quantity: number;
}

export interface IError {
  mealType?: string;
  quantityOfPeople?: string;
  restaurant?: string;
}

const emptyReserve: IReserve = {
  mealType: '',
  quantityOfPeople: 0,
  restaurant: '',
  dishes: []
}

const emptyError = {
  mealType: '',
  quantityOfPeople: ''
}

const MainComp = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [reserve, setReserve] = React.useState(emptyReserve);
  const [error, setError] = React.useState(emptyError);

  const steps = getSteps();

  React.useEffect(() => {console.log("reserve:", reserve)}, [reserve])
  
  const handleValidation = () => {
      setError(validate(reserve, activeStep))
      if(Object.entries(validate(reserve, activeStep)).length === 0 &&
       validate(reserve, activeStep).constructor === Object) {
        handleNext();
      }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

 const handleReserveChange = (field: any, value: any) => {
      setReserve({
        ...reserve,
        [field]: value
      });
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
              {activeStep === 0 && <StepOne error={error} reserveValues={reserve} changeReserveHandler={handleReserveChange} />}
              {activeStep === 1 && <StepTwo error={error} reserveValues={reserve} changeReserveHandler={handleReserveChange} />}
              {activeStep === 2 && <div />}
              {activeStep === 3 && <div />}
          <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleValidation}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Main = MainComp