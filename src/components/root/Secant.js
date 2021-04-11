import { React, useState } from "react";
import Graph from "../Graph";
import { convert } from "../convert";
import Table from "../Table";
import { addStyles, EditableMathField } from "react-mathquill";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { number } from "mathjs";
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
function Secant() {
  const [latex, setLatex] = useState("");
  const [x0, setX0] = useState(0);
  const [x1, setX1] = useState(0);
  const [datainput, setDatainput] = useState([]);
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
      field: "xf",
      headerName: "X0",
      description: "ค่า X0",
      type: number,
      width: 150,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "xs",
      headerName: "X1",
      description: "ค่า X1",
      type: number,
      width: 150,
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
      field: "error",
      headerName: "Error",
      description: "ค่า Error",
      type: number,
      sortable: false,
      width: 150,
      headerAlign: "center",
    },
  ];
  const secantmethod = (xf, xs) => {
    try {
      let error = 1,
        x0 = parseFloat(xf),
        i = 0,
        xn = 0,
        f0 = 0,
        f1 = 0,
        x1 = parseFloat(xs);
      let data = [];
      while (error > 0.000001) {
        f0 = convert(latex, x0);
        f1 = convert(latex, x1);
        xn = x1 - (f1 * (x1 - x0)) / (f1 - f0);
        let sum = (xn - x1) / xn;
        error = Math.abs(sum);
        if (xn.toFixed(6) <= 0.0) {
          break;
        }
        data[i] = {
          id: i,
          xf: x0.toFixed(6),
          xs: x1.toFixed(6),
          x: xn.toFixed(6),
          error: error.toFixed(6),
        };
        x0 = x1;
        x1 = xn;
        i++;
      }
      return data;
    } catch (error) {
      return "Error"
    }
  };

  const handleChange = (event) => {
    try {
      event.preventDefault();
      setDatainput(secantmethod(x0, x1));
    } catch (error) {}
  };
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Secant Method
          </Typography>
        </Grid>
        <Grid item xs={7} align="center">
          <Typography>ใส่ค่า X0 และ X1</Typography>
          <form action="" onSubmit={handleChange}>
            <Grid item xs={3}>
              {/* Input xl */}
              <TextField
                InputProps={{ className: classes.input }}
                variant="outlined"
                onInput={(e) => setX0(e.target.value)}
                label="X0"
                style={{ backgroundColor: "whitesmoke" }}
              />
            </Grid>
            <Grid item xs={3}>
              {/* Input xr */}
              <TextField
                InputProps={{ className: classes.input }}
                variant="outlined"
                onInput={(e) => setX1(e.target.value)}
                label="X1"
                style={{ backgroundColor: "whitesmoke" }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button type="submit" variant="contained" color="primary">
                Submit
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
export default Secant;
