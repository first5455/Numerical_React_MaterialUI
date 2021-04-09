import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <AppBar color="primary" style={{ height: "60px" }}>
        <Tabs variant="fullWidth">
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Root of Equations" component={Link} to="/root" />
          <Tab
            label="Linear Algebra"
            component={Link}
            to="/linearalgebra"
          />
          <Tab label="Interpolation" component={Link} to="/inter" />
          <Tab label="Regression" component={Link} to="/regress" />
        </Tabs>
      </AppBar>
    </div>
  );
}
export default Navbar;
