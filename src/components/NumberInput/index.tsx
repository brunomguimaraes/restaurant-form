import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginRight: theme.spacing(1),
      width: 50,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }),
);

interface IProps {
  error: boolean;
  changeReserveHandler: (field: any, value: any) => void;
  stateRef: string;
  value: any;
}

const NumberInputComp = ({ error, changeReserveHandler, stateRef, value }: IProps) => {
  const classes = useStyles();
  const handleChange = (name: string) => (
    event: React.ChangeEvent<{ value: unknown }>,) => {
			changeReserveHandler(name, event.target.value)
  };

  return (
      <TextField
        error={error}
        id="standard-number"
        value={value}
        onChange={handleChange(stateRef)}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
  );
}

export const NumberInput = NumberInputComp