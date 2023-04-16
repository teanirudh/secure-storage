import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomTable from "../components/CustomTable";
import AuthContext from "../contexts/AuthContext";
import DataContext from "../contexts/DataContext";

const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
    width: "30%",
  },
  {
    key: "uploader_id",
    name: "Uploader ID",
    width: "30%",
  },
  {
    key: "upload_time",
    name: "Upload Time",
    width: "40%",
  },
];

const HomeView = () => {
  const { user } = useContext(AuthContext);
  const { evidenceCount, recentEvidenceList, recentEvidenceCount } = useContext(DataContext);

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
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Evidence
              </Typography>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {evidenceCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                {recentEvidenceCount} added in the last day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <CustomTable
            columns={evidenceTableColumns}
            values={recentEvidenceList}
            emptyMessage={user.view_level !== "NONE" ? "No recent upload activity" : "You are not authorized to view evidence"}
          />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeView;
