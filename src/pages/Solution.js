import React from "react";
import { Card, CardContent, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cramer from "../components/sol/Cramer";
import GaussElimination from "../components/sol/GaussElimination";
import GaussJordan from "../components/sol/GaussJordan";
import MatrixInver from "../components/sol/MatrixInver";
import Lu from "../components/sol/Lu";
import Cholesky from "../components/sol/Cholesky";
import JacobiIter from "../components/sol/JacobiIter";
import GaussSeidel from "../components/sol/GaussSeidel";
import ConjugateGradient from "../components/sol/Conjugate_gradient";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
});
function Solution() {
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter basename="/sol">
        <Card style={{ backgroundColor: "#ff9100" }} className={classes.root}>
          <CardContent>
            <Typography variant="h4" align="center" color="textPrimary">
              Solution Techniques Menu
            </Typography>
            <Tabs variant="scrollable" scrollButtons="on" centered>
              <Tab label="Cramer's Rule" component={Link} to="/cramer" />
              <Tab
                label="Gauss Elimination"
                component={Link}
                to="/gauss_elimination"
              />
              <Tab label="Gauss Jordan" component={Link} to="/gauss_jordan" />
              <Tab
                label="Matrix Inversion"
                component={Link}
                to="/matrix_inversion"
              />
              <Tab label="LU Decomposition" component={Link} to="/lu" />
              <Tab
                label="Cholesky Decomposition"
                component={Link}
                to="/cholesky"
              />
              <Tab
                label="Jacobi Iteration"
                component={Link}
                to="/jacobi_iter"
              />
              <Tab label="Gauss_Seidel" component={Link} to="/gauss_seidel" />
              <Tab
                label="Conjugate Gradient"
                component={Link}
                to="/conjugate_gradient"
              />
            </Tabs>
          </CardContent>
        </Card>
        <Switch>
          <Route exact path="/">
            <Redirect to="/cramer" />
          </Route>
          <Route path="/cramer">
            <Cramer />
          </Route>
          <Route path="/gauss_elimination">
            <GaussElimination />
          </Route>
          <Route path="/gauss_jordan">
            <GaussJordan />
          </Route>
          <Route path="/matrix_inversion">
            <MatrixInver />
          </Route>
          <Route path="/lu">
            <Lu />
          </Route>
          <Route path="/cholesky">
            <Cholesky />
          </Route>
          <Route path="/jacobi_iter">
            <JacobiIter />
          </Route>
          <Route path="/gauss_seidel">
            <GaussSeidel />
          </Route>
          <Route path="/conjugate_gradient">
            <ConjugateGradient />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default Solution;
