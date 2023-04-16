import React, { useState, useContext } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "../components/CustomTable";
import AddUser from "../components/AddUser";
import DataContext from "../contexts/DataContext";

const userTableColumns = [
  {
    key: "id",
    name: "User ID",
    width: "10%",
  },
  {
    key: "username",
    name: "Username",
    width: "10%",
  },
  {
    key: "email",
    name: "Email",
    width: "20%",
  },
  {
    key: "hub_id",
    name: "Hub ID",
    width: "10%",
  },
  {
    key: "can_add",
    name: "Can Add",
    width: "10%",
  },
  {
    key: "can_view",
    name: "Can View",
    width: "10%",
  },
  {
    key: "view_level",
    name: "View Level",
    width: "10%",
  },
  {
    key: "last_login",
    name: "Last login",
    width: "20%",
  },
];

const UsersView = () => {
  const { userList } = useContext(DataContext);

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
          Users
        </Typography>
        <Button onClick={handleOpen}>+ Add User</Button>
      </Box>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable
        columns={userTableColumns}
        values={userList}
        emptyMessage="No users have been added"
      />
      <AddUser
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default UsersView;
