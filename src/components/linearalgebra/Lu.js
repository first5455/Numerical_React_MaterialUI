import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../Table";
const luqr = require('luqr').luqr
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
function Lu() {
  const classes = useStyles();
  const [dimension, setDimension] = useState(0);
  const [rows, setRows] = useState();
  let datainput,modeb = 0;
  let value = [
    [-2, 3, 1],
    [3, 4, -5],
    [1, -2, 1],
  ];
  let valueb = [9,0,-4];
  const [inputs, setInputs] = useState();
  const [ans, setAns] = useState([]);
  let bin = [];
  const Lude = ()=>{
    getMatrix();
    let A = datainput;
    pushb();
    let B = bin;
    let X = luqr.solveLU(A,B);
    let ans = [];
    for(let i =0;i<X.length;i++){
        ans[i] = {
            id: i,
            ans: parseFloat(""+X[i]).toFixed(3),}
    }
    return ans;
  }
  const createMatrix = (event) => {
    let row = [];
    for (let i = 0; i < dimension; i++) {
      let temp = [];
      for (let j = 0; j < dimension; j++) {
        temp[j] = <input id={"r:" + i + "c:" + j} />;
      }
      temp[dimension] = <br />;
      row[i] = temp;
    }
    setRows(row);
  };
  const getMatrix = () => {
    let d = [];
    for (let i = 0; i < dimension; i++) {
      let temp = [];
      for (let j = 0; j < dimension; j++) {
        temp[j] = parseFloat(document.getElementById(`r:${i}c:${j}`).value);
      }
      d[i] = temp;
    }
    datainput = d;
  };

  const changeMatrix = (event, data) => {
    let row = [];
    for (let i = 0; i < data.length; i++) {
      let temp = [];
      for (let j = 0; j < data[0].length; j++) {
        temp[j] = (
          <input id={"r:" + i + "c:" + j} defaultValue={parseFloat(data[i][j])} />
        );
      }
      temp[data.length] = <br />;
      row[i] = temp;
    }
    let field = [];
    datainput = value;
    modeb = 1;
    for (let i = 0; i < datainput[0].length; i++) {
      field[i] = (
        <Grid>
          <TextField
            id={"B" + i}
            defaultValue={valueb[i]}
            variant="outlined"
            label={"B" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputs(field);
    setDimension(data.length);
    setRows(row);
  };
  const pushb = () => {
    if (modeb === 1) {
      datainput = value;
    }
    for (let i = 0; i < datainput[0].length; i++) {
      bin.push(parseFloat(document.getElementById("B" + i).value));
    }
    modeb = 0;
  };
  const controlInput = (event) => {
    event.preventDefault();
    getMatrix();
    let field = [];
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
    setAns(Lude());
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            LU Decomposition
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <TextField
              InputProps={{ className: classes.input }}
              variant="outlined"
              defaultValue={dimension}
              onInput={(e) => setDimension(e.target.value)}
              label="Dimension"
              style={{ backgroundColor: "whitesmoke" }}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                createMatrix(e);
              }}
            >
              Set Matrix
            </Button>
            <Grid>{rows}</Grid>
            <Button
              variant="contained"
              onClick={(e) => {
                changeMatrix(e, value);
              }}
            >
              load Matrix
            </Button>
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
export default Lu;
