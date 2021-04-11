import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const { regression } = require("multiregress");
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
  input: {
    color: "black",
  },
});
function MultipleLinear() {
  const classes = useStyles();
  const [sizepoint, setSizepoint] = useState(0);
  const [sizex, setSizex] = useState(0);
  const [inputsX, setInputX] = useState();
  const [inputsY, setInputY] = useState();
  const [ans, setAns] = useState();
  let Xin = [];
  let Yin = [];
  let value = [
    [1, 0, 1, 4],
    [0, 1, 3, -5],
    [2, 4, 1, -6],
    [3, 2, 2, 0],
    [4, 1, 5, -1],
    [2, 3, 3, -7],
    [1, 6, 4, -20],
  ];
  let point = [];
  const multi_linear_regress = () => {
    pushInput();
  };
  const pushInput = () => {
    let temp = [];
    for (let i = 0; i < sizepoint; i++) {
      Xin.push(parseFloat(document.getElementById("X" + i).value));
      Yin.push(parseFloat(document.getElementById("Y" + i).value));
      temp.push([Xin[i], Yin[i]]);
    }
    point = temp;
  };
  const reset = (event) => {
    setSizepoint(0);
    setInputX();
    setInputY();
    setAns();
  };
  const controlInput2 = (event) => {
    event.preventDefault();
    let fieldx = [];
    let fieldy = [];
    for (let i = 0; i < value.length; i++) {
      fieldx[i] = (
        <Grid>
          <TextField
            id={"X" + i}
            variant="outlined"
            value={value[i][0]}
            label={"X" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
      fieldy[i] = (
        <Grid>
          <TextField
            id={"Y" + i}
            variant="outlined"
            value={value[i][1]}
            label={"f(x)" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setSizepoint(value.length);
    setInputX(fieldx);
    setInputY(fieldy);
  };
  const controlInput = (event) => {
    event.preventDefault();
    let fieldx = [];
    let fieldy = [];
    for (let i = 0; i < sizepoint; i++) {
      let fieldcolumns = [];
      for (let j = 0; j < sizex; j++) {
        fieldcolumns[j] = (
          <TextField
            id={"X" + i + "N" + j}
            variant="outlined"
            label={"Point " + i + " Of X" + j}
            InputProps={{ className: classes.input }}
          />
        );
      }
      fieldx[i] = fieldcolumns;
      fieldx.push(<br />);
      fieldy[i] = (
        <Grid>
          <TextField
            id={"Y" + i}
            variant="outlined"
            label={"f(x)" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputX(fieldx);
    setInputY(fieldy);
  };
  const handle = (event) => {
    try {
      setAns(multi_linear_regress());
    } catch (error) {}
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Multiple Linear Regression
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            InputProps={{ className: classes.input }}
            variant="outlined"
            value={sizepoint}
            onInput={(e) => setSizepoint(e.target.value)}
            label="Input Size"
            style={{ backgroundColor: "whitesmoke" }}
          />
          <TextField
            InputProps={{ className: classes.input }}
            variant="outlined"
            value={sizex}
            onInput={(e) => setSizex(e.target.value)}
            label="Input Number of X"
            style={{ backgroundColor: "whitesmoke" }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={controlInput} color="primary">
            Set Input
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={controlInput2} color="primary">
            Example
          </Button>
        </Grid>
        <Grid item xs={6} align="right">
          {inputsX}
        </Grid>
        <Grid item xs={6} align="left">
          {inputsY}
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={handle} color="primary">
            Calculate
          </Button>
          <Button variant="contained" onClick={reset} color="primary">
            Reset
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Answer is {ans}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default MultipleLinear;
