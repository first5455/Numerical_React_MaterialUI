import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Root from "./pages/Root"
import Solution from "./pages/Solution"
import Inter from "./pages/Inter"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#f44336",
      },
      secondary: {
        main: "#ff9100",
      },
      status: {
        danger: "#aa2e25",
      },
      text:{
        primary: "#ffff",
        secondary: "#801313"
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/root">
              <Root />
            </Route>
            <Route path="/sol">
              <Solution />
            </Route>
            <Route path="/inter">
              <Inter />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
