import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  centerText: {
    textAlign: "center",
  },
});

function Home() {
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter>
        <Grid container>
          <Grid item xs={12}>
            <Card
              className={classes.root}
              style={{
                backgroundColor: "#ff9100",
                height: 200,
                textAlign: "center",
                rounded: true,
                paddingTop: 65,
                opacity: 0.8,
              }}
            >
              <CardContent>
                <Typography variant="h4" align="center" color="textPrimary">
                  Welcome to Numerical Website
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6" align="center" color="textPrimary">
                  Created from ReactJS
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}
export default Home;
