import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomTable from "../components/CustomTable";

const userTableColumns = [
  {
    key: "id",
    name: "User ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "noe",
    name: "Number of Evidences",
  },
  {
    key: "lastActivity",
    name: "Last Activity",
  },
];
const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
  },
  {
    key: "date",
    name: "Creation Date",
  },
  {
    key: "userId",
    name: "User ID",
  },
  {
    key: "name",
    name: "User Name",
  },
];
const userTableValues = [
  {
    id: "28937828937",
    name: "John",
    noe: "10",
    lastActivity: "12-11-1999",
  },
];
const evidenceTableValues = [
  {
    id: "8372837283",
    date: "12-11-1999",
    userId: "a837sh09890",
    name: "John",
  },
];

const AdminDashboard = () => {
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
                Users
              </Typography>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                10
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                +1 in the last day
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
                Evidence Count
              </Typography>
              <Typography sx={{ fontSize: 30 }} gutterBottom>
                50
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                +10 in the last day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item xs={6}>
          <CustomTable columns={userTableColumns} values={userTableValues} />
        </Grid>
        <Grid item xs={6}>
          <CustomTable
            columns={evidenceTableColumns}
            values={evidenceTableValues}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;