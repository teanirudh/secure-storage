import React, { useState, useContext } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "../components/CustomTable";
import AddHub from "../components/AddHub";
import DataContext from "../contexts/DataContext";

const hubTableColumns = [
  {
    key: "id",
    name: "Hub ID",
    width: "20%",
  },
  {
    key: "name",
    name: "Name",
    width: "20%",
  },
  {
    key: "description",
    name: "Description",
    width: "30%",
  },
  {
    key: "user_count",
    name: "User Count",
    width: "15%",
  },
  {
    key: "evidence_count",
    name: "Evidence Count",
    width: "15%",
  },
];

const HubsView = () => {
  const { hubList } = useContext(DataContext);

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

export default HubsView;
