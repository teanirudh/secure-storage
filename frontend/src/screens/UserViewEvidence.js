import React, { useState, useEffect, useContext } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import useAxios from "../utils/useAxios";
import AddEvidence from "../components/AddEvidence";
import AuthContext from "../contexts/AuthContext";

const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
    width: "15%",
  },
  {
    key: "name",
    name: "Name",
    width: "10%",
  },
  {
    key: "description",
    name: "Description",
    width: "25%",
  },
  {
    key: "uploader_id",
    name: "Uploader ID",
    width: "15%",
  },
  {
    key: "hub_id",
    name: "Hub ID",
    width: "15%",
  },
  {
    key: "upload_time",
    name: "Upload Time",
    width: "15%",
  },
  {
    key: "download",
    name: "",
    width: "5%",
  }
];

const UserViewEvidence = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [evidenceList, setEvidenceList] = useState([]);

  const downloadEvidence = async (id, file_name) => {
    await axiosInstance.post('/evidence/download/', { id: id })
      .then((res) => { downloadFile(res.data, file_name); })
      .catch((err) => { alert(err.response.data.error); });
  };

  const downloadFile = (data, file_name) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file_name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const getEvidence = async () => {
    const response = await axiosInstance.get("/evidence/");
    const newList = [];
    response.data.forEach(evidence => {
      const uploadTime = dayjs(evidence.upload_time).format("ddd MMM DD hh:mm:ss");
      const download = <Button sx={{ height: 5 }} onClick={() => downloadEvidence(evidence.id, evidence.file_name)}><DownloadIcon /></Button>;
      const newEvidence = { ...evidence, "upload_time": uploadTime, download: download };
      newList.push(newEvidence);
    });
    setEvidenceList(newList);
  };

  useEffect(() => {
    getEvidence();
  }, []);

  const [openUserModal, setOpenUserModal] = useState(false);
  const handleOpen = () => { setOpenUserModal(true); };
  const handleClose = () => { setOpenUserModal(false); };

  return (
    <Box margin={10}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          Evidence
        </Typography>
        <Button onClick={handleOpen}>+ Add Evidence</Button>
      </Box>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable
        columns={evidenceTableColumns}
        values={evidenceList}
        emptyMessage={user.view_level === "NONE" ? "You are not authorized to view evidence" : "No recent upload activity"}
      />
      <AddEvidence
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default UserViewEvidence;