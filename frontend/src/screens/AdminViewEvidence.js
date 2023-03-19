import React, { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import useAxios from "../utils/useAxios";

const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "hub",
    name: "Hub ID",
  },
  {
    key: "uploader",
    name: "Uploader ID",
  },
  {
    key: "upload_time",
    name: "Upload Time",
  },
];

const AdminViewEvidence = () => {
  const axiosInstance = useAxios();
  const [evidenceList, setEvidenceList] = useState([]);

  const getEvidence = async () => {
    const response = await axiosInstance.get("/evidence/");
    const newList = [];
    response.data.forEach(evidence => {
      const uploadTime = dayjs(evidence.upload_time).format("ddd MMM DD hh:mm:ss");
      const newEvidence = { ...evidence, "upload_time": uploadTime };
      newList.push(newEvidence);
    });
    setEvidenceList(newList);
  };

  useEffect(() => {
    getEvidence();
  }, []);

  return (
    <Box margin={10}>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Evidence
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable
        columns={evidenceTableColumns}
        values={evidenceList}
      />
    </Box>
  );
};

export default AdminViewEvidence;