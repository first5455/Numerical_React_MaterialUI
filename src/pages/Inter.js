import React from "react";
import {Card, CardContent, Tab, Tabs, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import NewtonDivied from "../components/inter/NewtonDivided"
import Lagrange from "../components/inter/Lagrange"
import Spline from "../components/inter/Spline"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
});
function Inter() {
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter basename="/inter">
      <Card style={{backgroundColor:"#ff9100"}} className={classes.root}>
        <CardContent>
          <Typography variant="h4" align="center" color="textPrimary">Interpolation Menu</Typography>
          <Tabs centered>
            <Tab label="Newton Divided" component={Link} to="/newton_divied" />
            <Tab label="Lagrange" component={Link} to="/lagrange" />
            <Tab label="Spline" component={Link} to="/spline" />
          </Tabs>
        </CardContent>
      </Card>
      <Switch>
            <Route path="/newton_divied"> <NewtonDivied/> </Route>
            <Route path="/lagrange"> <Lagrange /> </Route>
            <Route path="/spline"> <Spline /> </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default Inter;
