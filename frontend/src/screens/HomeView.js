import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DataContext from "../contexts/DataContext";
import EvidenceView from "./EvidenceView";

const HomeView = () => {
  const { evidenceData } = useContext(DataContext);

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Card sx={{ width: 275 }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {evidenceData.globalCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                Evidence added by all users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ width: 275 }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {evidenceData.hubCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                Evidence added by users from your hub
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ width: 275 }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {evidenceData.userCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                Evidence added by you
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <EvidenceView />
    </Box>
  );
};

export default HomeView;
