import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import useAxios from "../utils/useAxios";

const userTableColumns = [
  {
    key: "id",
    name: "User ID",
  },
  {
    key: "hub",
    name: "Hub ID",
  },
  {
    key: "last_login",
    name: "Last Login",
  },
];
const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
  },
  {
    key: "upload_time",
    name: "Upload Time",
  },
  {
    key: "uploader",
    name: "Uploader ID",
  },
];

const AdminDashboard = () => {
  const axiosInstance = useAxios();

  const [userList, setUserList] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);

  const [userCount, setUserCount] = useState(0);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalEvidenceCount, setTotalEvidenceCount] = useState(0);

  const getUsers = async () => {
    const response = await axiosInstance.get("/user/");
    setTotalUserCount(response.data.length);
    const newList = [];
    response.data.forEach(user => {
      if (dayjs().diff(dayjs(user.last_login), "day") <= 1) {
        const lastLogin = dayjs(user.last_login).format("ddd MMM DD hh:mm:ss");
        const newUser = { "id": user.id, "hub": user.hub, "last_login": lastLogin };
        newList.push(newUser);
      }
    });
    setUserList(newList);
    setUserCount(newList.length);
  };

  const getEvidence = async () => {
    const response = await axiosInstance.get("/evidence/");
    setTotalEvidenceCount(response.data.length);
    const newList = [];
    response.data.forEach(evidence => {
      if (dayjs().diff(dayjs(evidence.upload_time), "day") <= 1) {
        const uploadTime = dayjs(evidence.upload_time).format("ddd MMM DD hh:mm:ss");
        const newEvidence = { "id": evidence.id, "uploader": evidence.uploader, "upload_time": uploadTime };
        newList.push(newEvidence);
      }
    });
    setEvidenceList(newList);
    setEvidenceCount(newList.length);
  };

  useEffect(() => {
    getUsers();
    getEvidence();
  }, []);

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
                {totalUserCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                {userCount} active in the last day
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
                {totalEvidenceCount}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="green" gutterBottom>
                {evidenceCount} added in the last day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={10}>
        <Grid item xs={6}>
          <CustomTable
            columns={userTableColumns}
            values={userList}
            emptyMessage="No recent user activity"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTable
            columns={evidenceTableColumns}
            values={evidenceList}
            emptyMessage="No recent upload activity"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;