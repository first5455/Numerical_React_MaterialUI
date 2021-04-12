import { React, useState } from "react";
import Graph from "../Graph";
import { convert } from "../convert";
import Table from "../Table";
import { addStyles, EditableMathField } from "react-mathquill";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { number } from "mathjs";
addStyles();
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
function Bisection() {
  const [latex, setLatex] = useState("");
  const [xl, setXl] = useState(0);
  const [xr, setXr] = useState(0);
  const [datainput, setDatainput] = useState([]);
  let valuexl = 0;
  let valuexr = 1;
  let valueinput = "cos(x) - x * exp(x)";
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
      field: "xl",
      headerName: "XL",
      description: "ค่า XL",
      type: number,
      width: 150,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "xr",
      headerName: "XR",
      description: "ค่า XR",
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
  const bisection = (xnl, xnr) => {
    console.log(xnl,xnr)
    try {
      let error = 1,
        old = 1000,
        i = 0,
        m = 0,
        l = parseFloat(xnl),
        r = parseFloat(xnr);
      let data = [];
      while (error > 0.000001) {
        m = (l + r) / 2;
        //let fnl = convert(latex, l);
        let fnr = convert(latex, r);
        let fnm = convert(latex, m);
        let sum = (m - old) / m;
        error = Math.abs(sum);
        if (m.toFixed(6) <= 0.0) {
          break;
        }
        data[i] = {
          id: i,
          xl: l.toFixed(6),
          xr: r.toFixed(6),
          x: m.toFixed(6),
          error: error.toFixed(6),
        };
        if (fnr * fnm >= 0) {
          r = m;
        } else {
          l = m;
        }
        old = m;
        i++;
      }
      return data;
    } catch (error) {
      return [];
    }
  };
  const reset = ()=>{
    setLatex("");
    setXl(0);
    setXr(0);
    setDatainput([]);
  }
  const handleChange2 = (event) => {
    try {
      event.preventDefault();
      reset();
      setLatex(valueinput)
      setXl(valuexl);
      setXr(valuexr);
    } catch (error) {}
  };
  const handleChange = (event) => {
    try {
      event.preventDefault();
      setDatainput(bisection(xl, xr));
    } catch (error) {}
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Bisection Method
          </Typography>
        </Grid>
        <Grid item xs={7} align="center">
          <Typography>ใส่ค่า XL และ XR</Typography>
          <form action="" onSubmit={handleChange}>
            <Grid item xs={3}>
              {/* Input xl */}
              <TextField
                InputProps={{ className: classes.input }}
                variant="outlined"
                value={xl}
                onInput={(e) => setXl(e.target.value)}
                label="XL"
                style={{ backgroundColor: "whitesmoke" }}
              />
            </Grid>
            <Grid item xs={3}>
              {/* Input xr */}
              <TextField
                InputProps={{ className: classes.input }}
                variant="outlined"
                value={xr}
                onInput={(e) => setXr(e.target.value)}
                label="XR"
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
export default Bisection;
