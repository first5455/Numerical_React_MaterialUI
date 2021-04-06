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
              style={{ backgroundColor: "#ff9100" }}
            >
              <CardContent>
                <Typography variant="h4" align="center" color="textPrimary">
                  Welcome to Numerical Website
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}
export default Home;
