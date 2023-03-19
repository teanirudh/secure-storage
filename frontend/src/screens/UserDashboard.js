import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UserDashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e1e1e3",
        height: "90vh",
      }}
    >
      <Card sx={{ width: 600, height: 200, backgroundColor: "white" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "700" }}
          >
            Upload Evidence
          </Typography>
          <Typography variant="body1" style={{ fontWeight: "700" }}>
            Hello John, you can upload any digital evidence here.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
              flexDirection: "column",
            }}
          >
            <Button variant="contained" sx={{ backgroundColor: "#247E38" }}>
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
