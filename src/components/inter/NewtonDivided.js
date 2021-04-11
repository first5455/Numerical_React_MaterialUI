import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
function Newton_divided() {
  const classes = useStyles();
  const [sizeInputs, setSizeInputs] = useState(0);
  const [inputsX, setInputsX] = useState([]);
  const [inputsY, setInputsY] = useState([]);
  const [xstart, setXstart] = useState(0);
  const [ans, setAns] = useState("-");
  let Xin = [];
  let Yin = [];
  let Xdata = [0, 20000, 40000, 60000, 80000];
  let Ydata = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];
  let XfindData = 42000;
  const newtonDivied = () => {
    try {
      pushInput();
      let x = Xin;
      let y = Yin;
      let xfind = xstart;
      let C = (st, ed) => {
        if (ed - st === 1) {
          let output = (y[ed] - y[st]) / (x[ed] - x[st]);
          return output;
        } else {
          let left = C(st + 1, ed);
          let right = C(st, ed - 1);
          let output = (left - right) / (x[ed] - x[st]);
          return output;
        }
      };
      let find = () => {
        let sum = y[0];
        for (let i = 1; i < x.length; i++) {
          let temp2 = C(0, i);
          for (let j = 0; j < i; j++) {
            let temp = xfind - x[j];
            temp2 *= temp;
          }
          sum += temp2;
        }
        return sum;
      };
      return find(xfind);
    } catch (error) {
      return "Error";
    }
  };
  const pushInput = () => {
    try {
      for (let i = 0; i < sizeInputs; i++) {
        Xin.push(parseFloat(document.getElementById("X" + i).value));
        Yin.push(parseFloat(document.getElementById("Y" + i).value));
      }
    } catch (error) {}
  };
  const controlInput2 = (event) => {
    event.preventDefault();
    let fieldx = [];
    let fieldy = [];
    for (let i = 0; i < Xdata.length; i++) {
      fieldx[i] = (
        <Grid>
          <TextField
            id={"X" + i}
            variant="outlined"
            value={Xdata[i]}
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
            value={Ydata[i]}
            label={"Y" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setSizeInputs(Xdata.length);
    setInputsX(fieldx);
    setInputsY(fieldy);
    setXstart(XfindData);
  };
  const controlInput = (event) => {
    event.preventDefault();
    let fieldx = [];
    let fieldy = [];
    for (let i = 0; i < sizeInputs; i++) {
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
            label={"Y" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputsX(fieldx);
    setInputsY(fieldy);
  };
  const reset = (event) => {
    setInputsX();
    setInputsY();
    setSizeInputs(0);
    setXstart(0);
    setAns("-");
  };
  const handle = (event) => {
    try {
      setAns(newtonDivied());
    } catch (error) {}
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Newton Divided
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            InputProps={{ className: classes.input }}
            variant="outlined"
            value={sizeInputs}
            onInput={(e) => setSizeInputs(e.target.value)}
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
          <TextField
            InputProps={{ className: classes.input }}
            variant="outlined"
            value={xstart}
            onInput={(e) => setXstart(e.target.value)}
            label="X to Find"
            style={{ backgroundColor: "whitesmoke" }}
          />
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
            Answer f(x) in x = {xstart} is {ans}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default Newton_divided;
