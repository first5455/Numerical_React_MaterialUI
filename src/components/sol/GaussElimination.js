import { React, useState } from "react";
import ReactInputMatrix from "react-input-matrix";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toarray } from "../toarray";
import Table from "../Table";
import { BigNumber } from "bignumber.js";
import GaussianElimination from "na-gaussian-elimination";
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
const columns = [
  {
    field: "id",
    headerName: "Index",
    description: "ลำดับ",
    width: 320,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "ans",
    headerName: "X",
    description: "จำนวนรอบการวน",
    width: 320,
    sortable: false,
    headerAlign: "center",
  },
];
function GaussElimination() {
  const classes = useStyles();
  const [datainput, setDatainput] = useState([]);
  const [inputs, setInputs] = useState();
  const [ans, setAns] = useState([]);
  let bin = [];
  let field = [];
  const gaussElimination = () => {
    let arr = toarray(datainput,1);
    pushb();
    let A = arr;
    let B = [];
    for(let i =0;i<bin.length;i++){
        B[i] = new BigNumber(parseFloat(bin[i]));
    }
    let X ;
    var zero = new BigNumber(0);
    GaussianElimination.defaultOptions.zero = zero;
    var gaussianElimination = new GaussianElimination();
      X = gaussianElimination.solve(A, B);
      let ans =[];
      let temp =X.solution
      for(let i =0;i<temp.length;i++){
          ans[i] = {
              id: i,
              ans: parseFloat(""+temp[i]).toFixed(3),}
      }
      return ans;
  };
  const pushb = () => {
    for (let i = 0; i < datainput[0].length; i++) {
      bin.push(parseFloat(document.getElementById("B" + i).value));
    }
  };
  const controlInput = (event) => {
    event.preventDefault();
    for (let i = 0; i < datainput[0].length; i++) {
      field[i] = (
        <Grid>
          <TextField
            id={"B" + i}
            variant="outlined"
            label={"B" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputs(field);
  };
  const handle = (event) => {
    setAns(gaussElimination());
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Gauss Elimination
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ReactInputMatrix
            onMatrixChange={(data) => {
              setDatainput(data);
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={controlInput} color="primary">
            Set Matrix B
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          {inputs}
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={handle} color="primary">
            Calculate
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Table rows={ans} columns={columns} />
        </Grid>
      </Grid>
    </div>
  );
}
export default GaussElimination;
