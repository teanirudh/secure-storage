import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomTable from "../components/CustomTable";
import DataContext from "../contexts/DataContext";
import { Divider } from "@mui/material";

const userTableColumns = [
  {
    key: "id",
    name: "User ID",
    width: "30%",
  },
  {
    key: "hub_id",
    name: "Hub ID",
    width: "30%",
  },
  {
    key: "last_login",
    name: "Last Login",
    width: "40%",
  },
];

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

const Dashboard = () => {
  const {
    hubCount,
    recentHubCount,

    userCount,
    recentUserList,
    recentUserCount,

    evidenceCount,
    recentEvidenceList,
    recentEvidenceCount,
  } = useContext(DataContext);

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
                Hubs
              </Typography>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {hubCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                {recentHubCount} active in the last day
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
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Users
              </Typography>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {userCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                {recentUserCount} active in the last day
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
      <Grid container spacing={2} marginTop={7}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            Recent user activity
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />
          <CustomTable
            columns={userTableColumns}
            values={recentUserList}
            emptyMessage="No recent user activity"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            Recent evidence uploads
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />
          <CustomTable
            columns={evidenceTableColumns}
            values={recentEvidenceList}
            emptyMessage="No recent evidence uploads"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
