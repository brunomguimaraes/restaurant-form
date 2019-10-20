import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepTwoContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }
  }),
);


const StepTwoComp = () => {
  const classes = useStyles();

  return (
    <div className={classes.stepTwoContainer}>
      <div>Step Two</div>
    </div>
  );
}

export const StepTwo = StepTwoComp