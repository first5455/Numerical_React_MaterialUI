import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toarray } from "../toarray";
import Table from "../Table";
const math = require("mathjs");
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
function Gauss_seidel() {
  const classes = useStyles();
  const [dimension, setDimension] = useState(0);
  const [rows, setRows] = useState();
  let datainput,
    modeb = 0;
  const [inputs, setInputs] = useState();
  const [inputsx, setInputsx] = useState();
  const [ans, setAns] = useState([]);
  let value = [
    [4, -4, 0],
    [-1, 4, -2],
    [0, -2, 4],
  ];
  let valueb = [400, 400, 400];
  let valuex = [0, 0, 0];
  let bin = [];
  let xin = [];
  const gaussSeidel = () => {
    getMatrix();
    pushb();
    pushx();
    let arr = datainput;
    let A = math.matrix(arr);
    let B = bin;
    let X = xin;
    console.log(B);
    let ECL = 0.000001;
    let check = [false, false, false];
    let r = 0;
    let ans = [];
    while (true) {
      var i = 0,
        err = Infinity;
      while (i < B.length) {
        var xnew = 0;
        var aii = A.subset(math.index(i, i));
        var res = math.multiply(
          A.subset(math.index(i, math.range(0, B.length))),
          X
        );
        res = math.squeeze(res);
        xnew = (B[i] + aii * X[i] - res) / aii;
        err = Math.abs((xnew - X[i]) / xnew);
        if (err <= ECL) {
          check[i] = true;
        }
        X[i] = xnew;
        i++;
      }
      console.log("round : " + r + " => " + X);
      if (check[0] && check[1] && check[2] === true) break;
      r++;
    }
    for (let i = 0; i < X.length; i++) {
      ans[i] = {
        id: i,
        ans: parseFloat("" + X[i]).toFixed(3),
      };
    }
    return ans;
  };
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
    modeb = 0;
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
    modeb = 1;
    let row = [];
    for (let i = 0; i < data.length; i++) {
      let temp = [];
      for (let j = 0; j < data[0].length; j++) {
        temp[j] = (
          <input
            id={"r:" + i + "c:" + j}
            defaultValue={parseFloat(data[i][j])}
          />
        );
      }
      temp[data.length] = <br />;
      row[i] = temp;
    }
    let field = [];
    datainput = value;
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
    let fieldx = [];
    for (let i = 0; i < datainput[0].length; i++) {
      fieldx[i] = (
        <Grid>
          <TextField
            id={"X" + i}
            defaultValue={valuex[i]}
            variant="outlined"
            label={"X" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputs(field);
    setInputsx(fieldx);
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
  };
  const pushx = () => {
    if (modeb === 1) {
      datainput = value;
    }
    for (let i = 0; i < datainput[0].length; i++) {
      xin.push(parseFloat(document.getElementById("X" + i).value));
    }
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
            defaultValue={dimension}
            label={"B" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputs(field);
  };
  const controlInput2 = (event) => {
    event.preventDefault();
    getMatrix();
    let field = [];
    for (let i = 0; i < datainput[0].length; i++) {
      field[i] = (
        <Grid>
          <TextField
            id={"X" + i}
            variant="outlined"
            label={"X" + i}
            InputProps={{ className: classes.input }}
          />
        </Grid>
      );
    }
    setInputsx(field);
  };
  const handle = (event) => {
    setAns(gaussSeidel());
  };
  const resetMatrix = (event) => {
      setDimension(0);
      setRows();
      setInputs();
      setInputsx();
  }
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Gauss Seidel
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Grid>
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
            <Button
              variant="contained"
              onClick={(e) => {
                resetMatrix(e);
              }}
            >
              Reset Matrix
            </Button>
            <Grid>{rows}</Grid>
            <Button
              variant="contained"
              onClick={(e) => {
                changeMatrix(e, value, valueb);
              }}
            >
              Load Matrix
            </Button>
          </Grid>
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
          <Button variant="contained" onClick={controlInput2} color="primary">
            Set Initial X
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          {inputsx}
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
export default Gauss_seidel;
