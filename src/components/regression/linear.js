import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import regression from "regression";
import API from "../api"
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
function Linear() {
  const classes = useStyles();
  const [sizepoint, setSizepoint] = useState(0);
  const [inputsX, setInputX] = useState();
  const [inputsY, setInputY] = useState();
  const [ans, setAns] = useState();
  let Xin = [];
  let Yin = [];
  let value ;
  let point = [];
  const liner_regress = () => {
    try {
      pushInput();
      let output = regression.linear(point).equation;
      let ans = "[";
      for (let i = 0; i < output.length; i++) {
        if (i === output.length - 1) {
          ans += output[i] + "";
        } else {
          ans += output[i] + ",";
        }
      }
      ans += "]";
      return ans;
    } catch (error) {
      return "Error"
    }
  };
  const pushInput = () => {
    try {
      let temp = [];
      for (let i = 0; i < sizepoint; i++) {
        Xin.push(parseFloat(document.getElementById("X" + i).value));
        Yin.push(parseFloat(document.getElementById("Y" + i).value));
        temp.push([Xin[i], Yin[i]]);
      }
      point = temp;
    } catch (error) {}
  };
  const reset = (event) => {
    setSizepoint(0);
    setInputX();
    setInputY();
    setAns();
  };
  const controlInput2 = async(event) => {
    await API.get("example/linear").then((res) => {
      value = res.data.arrayX;
      console.log(res.data.arrayX)
    });
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
      fieldx[i] = (
        <Grid>
          <TextField
            id={"X" + i}
            variant="outlined"
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
      setAns(liner_regress());
    } catch (error) {}
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Linear Regression
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
export default Linear;
