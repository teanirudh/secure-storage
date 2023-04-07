import React, { useState, useEffect } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "../components/CustomTable";
import AddHub from "../components/AddHub";
import useAxios from "../utils/useAxios";

const hubTableColumns = [
  {
    key: "id",
    name: "Hub ID",
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
    key: "user_count",
    name: "User Count",
  },
  {
    key: "evidence_count",
    name: "Evidence Count",
  },
];

const AdminViewHubs = () => {
  const axiosInstance = useAxios();
  const [hubList, setHubList] = useState([]);

  const getHubs = async () => {
    const response = await axiosInstance.get("/hub/");
    const newList = [];
    response.data.forEach(hub => {
      newList.push(hub);
    });
    setHubList(newList);
  };

  useEffect(() => {
    getHubs();
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
          Hubs
        </Typography>
        <Button onClick={handleOpen}>+ Add Hub</Button>
      </Box>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable columns={hubTableColumns} values={hubList} />
      <AddHub
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default AdminViewHubs;
