import React, { useState, useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const CustomAppBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [state, setState] = useState({ left: false });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
      return;
    setState({ ...state, [anchor]: open });
  };

  const sideBarKeys = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/dashboard"),
    },
    {
      text: "Hubs",
      icon: <PlaceIcon />,
      onClick: () => navigate("/hubs"),
    },
    {
      text: "Users",
      icon: <GroupIcon />,
      onClick: () => navigate("/users"),
    },
    {
      text: "Evidence",
      icon: <LocalLibraryIcon />,
      onClick: () => navigate("/evidence"),
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: logoutUser,
    },
  ];

  const displaySideBar = () => {
    return (
      sideBarKeys.map((key, index) => (
        <ListItem key={key.text} disablePadding>
          <ListItemButton onClick={key.onClick}>
            <ListItemIcon>{key.icon}</ListItemIcon>
            <ListItemText primary={key.text} />
          </ListItemButton>
        </ListItem>
      ))
    )
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {displaySideBar()}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              {user && (
                <IconButton onClick={user.is_admin ? toggleDrawer("left", true) : () => { }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" component="div" align="center">
              Secure Storage Model
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} display="none">
              {user && (
                <IconButton onClick={logoutUser}>
                  <LogoutIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </AppBar>
  );
};

export default CustomAppBar;
