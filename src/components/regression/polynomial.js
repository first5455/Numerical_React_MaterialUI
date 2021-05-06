import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import regression from "regression";
import API from "../api";
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
function Polynomial() {
  const classes = useStyles();
  const [sizepoint, setSizepoint] = useState(0);
  const [inputsX, setInputX] = useState();
  const [inputsY, setInputY] = useState();
  const [xfind,setXfind] = useState();
  const [ans, setAns] = useState();
  const [outfind,setOutfind] = useState();
  const [order, setOrder] = useState(0);
  let Xin = [];
  let Yin = [];
  let value;
  let point = [];
  const polynomial_regress = () => {
    try {
      pushInput();
      let output = regression.polynomial(point, { order: parseInt(order) });
      let ans = output.string;
      //console.log(output)
      let sum = 0; 
      let poww = order;
        for(let i = 0;i<=order;i++){
            if(i===order){
              sum += output.equation[i]
              }else{
                sum += output.equation[i]*(Math.pow(xfind,poww))
              }
              poww--;
            }
      //console.log(sum)
      setOutfind(sum)
      return ans;
    } catch (error) {
      return "Error";
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
  const controlInput2 = async (event) => {
    await API.get("example/polynomial").then((res) => {
      value = res.data.arrayX;
      console.log(res.data.arrayX);
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
    setOrder(3);
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
      setAns(polynomial_regress());
    } catch (error) {}
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Polynomial Regression
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
            value={order}
            onInput={(e) => setOrder(e.target.value)}
            label="Input Order"
            style={{ backgroundColor: "whitesmoke" }}
          />
          <TextField
            InputProps={{ className: classes.input }}
            variant="outlined"
            value={xfind}
            onInput={(e) => setXfind(e.target.value)}
            label="X Find"
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
            {ans}
          </Typography>
          <Typography variant="h6" align="center">
            {outfind}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default Polynomial;
