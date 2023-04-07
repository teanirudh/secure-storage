import React, { useState, useEffect } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import useAxios from "../utils/useAxios";
import AddEvidence from "../components/AddEvidence";

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
    key: "uploader_id",
    name: "Uploader ID",
  },
  {
    key: "hub_id",
    name: "Hub ID",
  },
  {
    key: "upload_time",
    name: "Upload Time",
  },
  {
    key: "download",
    name: "",
  }
];

const AdminViewEvidence = () => {
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
      const download = <Button size="small" onClick={() => downloadEvidence(evidence.id, evidence.file_name)}><DownloadIcon /></Button>;
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
      <CustomTable columns={evidenceTableColumns} values={evidenceList} />
      <AddEvidence
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default AdminViewEvidence;