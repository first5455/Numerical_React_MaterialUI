import { React, useState } from "react";
import ReactInputMatrix from "react-input-matrix";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toarray } from "../toarray";
import Table from "../Table";
const linSystem = require('linear-equation-system');
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

function Gauss_jordan() {
  const classes = useStyles();
  const [datainput, setDatainput] = useState([]);
  const [inputs, setInputs] = useState();
  const [ans, setAns] = useState([]);
  let bin = [];
  let field = [];
  const gaussJordans = ()=>{
    let arr = toarray(datainput, 0);
    let A = arr;
    pushb();
    let B = bin;
    let ans = [];
    let temp = linSystem.solve(A,B)
    for(let i =0;i<temp.length;i++){
        ans[i] = {
            id: i,
            ans: parseFloat(""+temp[i]).toFixed(3),}
    }
    return ans;
  }
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
    setAns(gaussJordans());
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Gauss Jordan
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
export default Gauss_jordan;
