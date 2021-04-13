import { React, useState } from "react";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../Table";
import API from "../api"
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
function Jacobi_iter() {
  const classes = useStyles();
  const [dimension, setDimension] = useState(0);
  const [rows, setRows] = useState();
  let datainput,
    modeb = 0;
  const [inputs, setInputs] = useState();
  const [inputsx, setInputsx] = useState();
  const [ans, setAns] = useState([]);
  let value ;
  let valueb ;
  let valuex ;
  let bin = [];
  let xin = [];
  const jacobiIter = () => {
    try {
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
      let stop = false;
      while (true) {
        var i = 0,
          xnew = [0, 0, 0],
          err = Infinity;
        while (i < B.length) {
          var aii = A.subset(math.index(i, i));
          var res = math.multiply(
            A.subset(math.index(i, math.range(0, B.length))),
            X
          );
          res = math.squeeze(res);
          console.log(res);
          xnew[i] = (B[i] - res + aii * X[i]) / aii;
          err = Math.abs((xnew[i] - X[i]) / xnew[i]);
          if (err <= ECL) {
            check[i] = true;
          }
          i++;
        }
        xnew.forEach((value, index) => {
          X[index] = value;
        });
        for (let i = 0; i < check.length; i++) {
          stop = stop && check[i];
        }
        if (stop === true) break;
        if (r >= 100) {
          break;
        }
        r++;
      }
      for (let i = 0; i < X.length; i++) {
        ans[i] = {
          id: i,
          ans: parseFloat("" + X[i]).toFixed(3),
        };
      }
      return ans;
    } catch (error) {
      return "Error"
    }
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
    try {
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
    } catch (error) {}
  };

  const changeMatrix = async(event, data) => {
    await API.get("example/jacobi").then((res) => {
      value = res.data.arrayA;
      valueb = res.data.arrayB;
      valuex = res.data.arrayX;
    });
    modeb = 1;
    let row = [];
    for (let i = 0; i < value.length; i++) {
      let temp = [];
      for (let j = 0; j < value[0].length; j++) {
        temp[j] = (
          <input
            id={"r:" + i + "c:" + j}
            defaultValue={parseFloat(value[i][j])}
          />
        );
      }
      temp[value.length] = <br />;
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
    setDimension(value.length);
    setRows(row);
  };
  const pushb = () => {
    try {
      if (modeb === 1) {
        datainput = value;
      }
      for (let i = 0; i < datainput[0].length; i++) {
        bin.push(parseFloat(document.getElementById("B" + i).value));
      }
    } catch (error) {}
  };
  const pushx = () => {
    try {
      if (modeb === 1) {
        datainput = value;
      }
      for (let i = 0; i < datainput[0].length; i++) {
        xin.push(parseFloat(document.getElementById("X" + i).value));
      }
    } catch (error) {}
  };
  const controlInput = (event) => {
    try {
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
    } catch (error) {}
  };
  const controlInput2 = (event) => {
    try {
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
    } catch (error) {}
  };
  const handle = (event) => {
    try {
      setAns(jacobiIter());
    } catch (error) {}
  };
  const resetMatrix = (event) => {
    setDimension(0);
    setRows();
    setInputs();
    setInputsx();
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Jacobi Iteration
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Grid>
            <TextField
              InputProps={{ className: classes.input }}
              variant="outlined"
              value={dimension}
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
export default Jacobi_iter;
