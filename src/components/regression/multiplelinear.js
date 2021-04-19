import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import API from "../api"
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
  let value ;
  let point = [];
  const multi_linear_regress = () => {
    try {
      pushInput();
      let ans = regression(point);
      let show = ["["];
      for (let i = 0; i < ans.length; i++) {
        if (i === ans.length - 1) {
          show.push(ans[i].toFixed(3) + "]");
        } else {
          show.push(ans[i].toFixed(3) + ",");
        }
      }
      return show;
    } catch (error) {
      return "Error"
    }
  };
  const pushInput = () => {
    try {
      let temp = [];
      for (let i = 0; i < sizepoint; i++) {
        let tempx = [];
        for (let j = 0; j < sizex; j++) {
          tempx.push(
            parseFloat(document.getElementById("X" + i + "N" + j).value)
          );
          if (j === sizex - 1) {
            tempx.push(parseFloat(document.getElementById("Y" + i).value));
          }
        }
        temp.push(tempx);
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
    await API.get("example/multiplelinear").then((res) => {
      value = res.data.arrayX;
      console.log(res.data.arrayX)
    });
    event.preventDefault();
    let fieldx = [];
    let fieldy = [];
    for (let i = 0; i < value.length; i++) {
      let fieldcolumns = [];
      for (let j = 0; j < value[0].length - 1; j++) {
        fieldcolumns[j] = (
          <TextField
            id={"X" + i + "N" + j}
            variant="outlined"
            value={value[i][j]}
            label={"Point " + i + " Of X" + j}
            InputProps={{ className: classes.input }}
          />
        );
      }
      fieldcolumns.push(<br />);
      fieldcolumns.push(<br />);
      fieldx[i] = fieldcolumns;
      fieldy[i] = (
        <Grid>
          <TextField
            id={"Y" + i}
            variant="outlined"
            value={value[i][value[0].length - 1]}
            label={"f(x)" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setSizepoint(value.length);
    setSizex(value[0].length - 1);
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
      fieldcolumns.push(<br />);
      fieldcolumns.push(<br />);
      fieldx[i] = fieldcolumns;
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
        <Grid item xs={12} align="center">
          {inputsX}
        </Grid>
        <Grid item xs={12} align="center">
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
          <Typography variant="h6" align="center">
            **รูปแบบลำดับคือ [a0,a1X1,a2X2,...anXn]**
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default MultipleLinear;
