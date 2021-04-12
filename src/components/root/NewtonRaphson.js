import { React, useState } from "react";
import Graph from "../Graph";
import { convert } from "../convert";
import Table from "../Table";
import { addStyles, EditableMathField } from "react-mathquill";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { number, derivative } from "mathjs";
const AlgebraLatex = require("algebra-latex");
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
addStyles();
const Diff = (FX, X) => {
  const latexInput = FX;
  const latexrepacle = latexInput.replace("\\exp", " exp");
  const algebraObj = new AlgebraLatex().parseLatex(latexrepacle);
  let text = algebraObj.toMath();
  let expr = derivative(text, "x");
  let scope = { x: parseFloat(X) };
  return expr.evaluate(scope);
};
const columns = [
  {
    field: "id",
    headerName: "Iteration",
    description: "จำนวนรอบการวน",
    type: number,
    width: 100,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "x",
    headerName: "X",
    description: "ค่า X ที่ได้จากการคำนวน",
    type: number,
    width: 150,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "fx",
    headerName: "fX",
    description: "ค่า fX ที่ได้จากการคำนวน",
    type: number,
    width: 150,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "error",
    headerName: "Error",
    description: "ค่า Error",
    type: number,
    sortable: false,
    width: 150,
    headerAlign: "center",
  },
];
function Newton_raphson() {
  const classes = useStyles();
  const [latex, setLatex] = useState("");
  const [x, setX] = useState(0);
  const [datainput, setDatainput] = useState([]);
  let valuex = 2;
  let valueinput = "3*x - cos(x) -1";
  const Newton = (n) => {
    try {
      let error = 1,
        i = 0,
        old = parseFloat(n),
        xnew = 0;
      let data = [];
      while (error > 0.000001) {
        let diffx = Diff(latex, old);
        let fx = convert(latex, old);
        xnew = old - fx / diffx;
        let fxnew = convert(latex, xnew);
        let sum = (xnew - old) / xnew;
        error = Math.abs(sum);
        if (xnew.toFixed(6) <= 0.0) {
          break;
        }
        data[i] = {
          id: i,
          fx: fxnew.toFixed(6),
          x: xnew.toFixed(6),
          error: error.toFixed(6),
        };
        old = xnew;
        i++;
      }
      return data;
    } catch (error) {
      return []
    }
  };
  const reset = ()=>{
    setLatex("");
    setX(0);
    setDatainput([]);
  }
  const handleChange2 = (event) => {
    try {
      event.preventDefault();
      reset();
      setLatex(valueinput);
      setX(valuex);
    } catch (error) {}
  };
  const handleChange = (event) => {
    try {
      event.preventDefault();
      setDatainput(Newton(x));
    } catch (error) {}
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Newton Raphson Method
          </Typography>
        </Grid>
        <Grid item xs={7} align="center">
          <Typography>ใส่ค่า X</Typography>
          <form action="" onSubmit={handleChange}>
            <Grid item xs={3}>
              {/* Input x */}
              <TextField
                InputProps={{ className: classes.input }}
                variant="outlined"
                value={x}
                onInput={(e) => setX(e.target.value)}
                label="X"
                style={{ backgroundColor: "whitesmoke" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleChange2} variant="contained" color="primary">
                Example
              </Button>
              <Button onClick={reset} variant="contained" color="primary">
                Reset
              </Button>
            </Grid>
          </form>
          {/* Table */}
          <Table rows={datainput} columns={columns} />
          <Typography>
            **ค่าที่แสดงในตารางเป็นค่าจากการปัดเศษทศนิยม 6 จุด**
          </Typography>
        </Grid>
        <Grid item xs={5} align="center">
          <Typography>Math Function</Typography>
          {/* Input Latex Field*/}
          <EditableMathField
            style={{ width: 200, backgroundColor: "whitesmoke" }}
            latex={latex}
            onChange={(mathField) => {
              setLatex(mathField.latex());
            }}
          />
          <Graph latex={latex} />
        </Grid>
      </Grid>
    </div>
  );
}
export default Newton_raphson;
