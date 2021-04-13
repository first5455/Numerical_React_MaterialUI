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
function Conjugate_gradient() {
  const classes = useStyles();
  const [dimension, setDimension] = useState(0);
  const [rows, setRows] = useState();
  let datainput,
    modeb = 0;
  let value ;
  let valueb ;
  const [inputs, setInputs] = useState();
  const [ans, setAns] = useState([]);
  let bin = [];
  const conjugate_gradient = () => {
    try {
      getMatrix();
      let arr = datainput;
      pushb();
      let A = math.matrix(arr);
      let B = bin;
      let X = math.zeros(B.length);
      let ECL = 0.001;
      let err = Infinity;
      let ramda = Infinity;
      let alpha = Infinity;
      let ans = [];
      //pre iteration
      var R = B.map((value, index) => {
        //find R0
        return (
          math.squeeze(
            math.multiply(
              A.subset(math.index(index, math.range(0, B.length))),
              X
            )
          ) - B[index]
        );
      });
      var D = R.map((value) => value * -1); //D = -R
      //calculate
      while (true) {
        ramda =
          (-1 * math.multiply(math.transpose(D), R)) /
          math.multiply(math.transpose(D), A, D); //ramda
        X = X.map(
          (value, index) => value + ramda * math.subset(D, math.index(index))
        ); //Xk+1
        R = B.map((value, index) => {
          //Rk+1
          return (
            math.squeeze(
              math.multiply(
                A.subset(math.index(index, math.range(0, B.length))),
                X
              )
            ) - B[index]
          );
        });
        err = math.sqrt(math.multiply(R, math.transpose(R))); //error
        if (err <= ECL) {
          break;
        }
        //for_nextiteration
        alpha =
          math.multiply(math.transpose(R), A, D) /
          math.multiply(math.transpose(D), A, D); //alpha
        D = R.map(
          (value, index) =>
            -1 * value + alpha * math.subset(D, math.index(index))
        ); //Dk+1
      }
      for (let i = 0; i < X._data.length; i++) {
        ans[i] = {
          id: i,
          ans: parseFloat("" + X._data[i]).toFixed(3),
        };
      }
      return ans;
    } catch (error) {
      return "Error";
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
    await API.get("example/conjugate").then((res) => {
      value = res.data.arrayA;
      valueb = res.data.arrayB;
    });
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
      modeb = 0;
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
  const handle = (event) => {
    try {
      setAns(conjugate_gradient());
    } catch (error) {}
  };
  const resetMatrix = (event) => {
    setDimension(0);
    setRows();
    setInputs();
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Conjugate Gradient
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
                changeMatrix(e, value);
              }}
            >
              load Matrix
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
export default Conjugate_gradient;
