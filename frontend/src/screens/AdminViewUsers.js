import React, { useState, useEffect } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import CustomTable from "../components/CustomTable";
import AddUser from "../components/AddUser";
import useAxios from "../utils/useAxios";

const userTableColumns = [
  {
    key: "id",
    name: "User ID",
  },
  {
    key: "username",
    name: "Username",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "hub",
    name: "Hub ID",
  },
  {
    key: "can_add",
    name: "Can Add",
  },
  {
    key: "can_view",
    name: "Can View",
  },
  {
    key: "view_level",
    name: "View Level",
  },
  {
    key: "last_login",
    name: "Last login",
  },
];

const AdminViewUsers = () => {
  const axiosInstance = useAxios();
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    const response = await axiosInstance.get("/user/");
    const newList = [];
    response.data.forEach(user => {
      const canAdd = user.can_add ? "Yes" : "No";
      const canView = user.can_view ? "Yes" : "No";
      const lastLogin = dayjs(user.last_login).format("ddd MMM DD hh:mm:ss");
      const newUser = { ...user, "can_add": canAdd, "can_view": canView, "last_login": lastLogin };
      newList.push(newUser);
    });
    setUserList(newList);
  };

  useEffect(() => {
    getUsers();
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
          Users
        </Typography>
        <Button onClick={handleOpen}>+ Add User</Button>
      </Box>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable columns={userTableColumns} values={userList} />
      <AddUser
        openUserModal={openUserModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default AdminViewUsers;
