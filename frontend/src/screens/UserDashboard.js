import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import useAxios from "../utils/useAxios";
import AuthContext from "../contexts/AuthContext";

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

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [totalEvidenceCount, setTotalEvidenceCount] = useState(0);

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
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <CustomTable
            columns={evidenceTableColumns}
            values={evidenceList}
            emptyMessage={user.view_level !== "NONE" ? "No recent upload activity" : "You are not authorized to view evidence"}
          />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;