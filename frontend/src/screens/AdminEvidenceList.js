import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomTable from "../components/CustomTable";
const evidenceTableColumns = [
  {
    key: "id",
    name: "Evidence ID",
  },
  {
    key: "location",
    name: "Location",
  },
  {
    key: "date",
    name: "Creation Date",
  },
  {
    key: "userId",
    name: "User ID",
  },
  {
    key: "name",
    name: "User Name",
  },
];
const evidenceTableValues = [
  {
    id: "8372837283",
    date: "12-11-1999",
    userId: "a837sh09890",
    name: "John",
    location: "Chennai, Tamil Nadu",
  },
];
const AdminEvidenceList = () => {
  return (
    <Box margin={10}>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Evidence
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
      <CustomTable
        columns={evidenceTableColumns}
        values={evidenceTableValues}
      />
    </Box>
  );
};

export default AdminEvidenceList;
