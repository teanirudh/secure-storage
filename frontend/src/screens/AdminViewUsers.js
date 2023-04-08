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
