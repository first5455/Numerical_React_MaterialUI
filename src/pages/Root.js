import React from "react";
import { Card, CardContent, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Bisection from "../components/root/Bisection";
import False from "../components/root/False";
import Onepoint from "../components/root/Onepoint";
import NewtonRaphson from "../components/root/NewtonRaphson"
import Secant from "../components/root/Secant";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
});

function Root() {
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter basename="/root">
        <Card style={{ backgroundColor: "#ff9100" }} className={classes.root}>
          <CardContent>
            <Typography variant="h4" align="center" color="textPrimary">
              Root of Equations Menu
            </Typography>
            <Tabs centered>
              <Tab label="Bisection" component={Link} to="/bisection" />
              <Tab
                label="False Position"
                component={Link}
                to="/false_position"
              />
              <Tab label="One Point" component={Link} to="/one_point" />
              <Tab
                label="Newton Raphson"
                component={Link}
                to="/newton_raphson"
              />
              <Tab label="Secant" component={Link} to="/secant" />
            </Tabs>
          </CardContent>
        </Card>
        <Switch>
          <Route path="/bisection">
            <Bisection />
          </Route>
          <Route path="/false_position">
            <False />
          </Route>
          <Route path="/one_point">
            <Onepoint />
          </Route>
          <Route path="/newton_raphson">
            <NewtonRaphson />
          </Route>
          <Route path="/secant">
            <Secant />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default Root;
