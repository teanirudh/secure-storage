import React, { useState, useContext } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from '@mui/icons-material/Download';
import CustomTable from "../components/CustomTable";
import AddEvidence from "../components/AddEvidence";
import AuthContext from "../contexts/AuthContext";
import DataContext from "../contexts/DataContext";
import useAxios from "../utils/useAxios";

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

const EvidenceView = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const { evidenceList } = useContext(DataContext);

  const downloadEvidence = async (id, file_name) => {
    await axiosInstance.post('/evidence/download/', { id: id })
      .then((response) => {
        downloadFile(response.data, file_name);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
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

  evidenceList.forEach((evidence) => {
    evidence.download =
      <Button
        sx={{ height: 5, "&:hover": { backgroundColor: "transparent" } }}
        onClick={() => downloadEvidence(evidence.id, evidence.file_name)}
      >
        <DownloadIcon />
      </Button>;
  });

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
        emptyMessage={
          user.is_admin ?
            "No evidence has been added" :
            "You are not authorized to view any evidence"
        }
      />
      <AddEvidence
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default EvidenceView;
