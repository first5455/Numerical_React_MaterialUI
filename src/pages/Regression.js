import React from "react";
import {Card, CardContent, Tab, Tabs, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Linear from "../components/regression/linear";
import MultipleLinear from "../components/regression/multiplelinear";
import Polynomial from "../components/regression/polynomial";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
});
function Regress() {
    const classes = useStyles();
    return (
      <div>
        <BrowserRouter basename="/regress">
        <Card style={{backgroundColor:"#ff9100"}} className={classes.root}>
          <CardContent>
            <Typography variant="h4" align="center" color="textPrimary">Regression Menu</Typography>
            <Tabs centered>
              <Tab label="Linear" component={Link} to="/linear" />
              <Tab label="Multiple Linear" component={Link} to="/multiple_linear" />
              <Tab label="Polynomial" component={Link} to="/polynomial" />
            </Tabs>
          </CardContent>
        </Card>
        <Switch>
              <Route exact path="/"><Redirect to="/linear"/></Route>
              <Route path="/linear"> <Linear /> </Route>
              <Route path="/multiple_linear"> <MultipleLinear /> </Route>
              <Route path="/polynomial"> <Polynomial /> </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  export default Regress;