import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomTable from "../components/CustomTable";
const userTableColumns = [
  {
    key: "id",
    name: "User ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "status",
    name: "Status",
  },
  {
    key: "noe",
    name: "Number of Evidences",
  },
  {
    key: "lastActivity",
    name: "Last Activity",
  },
];

const userTableValues = [
  {
    id: "28937828937",
    name: "John",
    email: "john@gmail.com",
    status: "Enabled",
    noe: "10",
    lastActivity: "12-11-1999",
  },
];
const AdminUserList = () => {
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
        <Button>+ Create User</Button>
      </Box>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable columns={userTableColumns} values={userTableValues} />;
    </Box>
  );
};

export default AdminUserList;
