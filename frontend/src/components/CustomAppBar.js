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

const CustomAppBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [state, setState] = useState({ left: false });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const adminSideBarKeys = [
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

  const userSideBarKeys = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/dashboard"),
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
    if (!user) return null;
    if (user.is_admin) {
      return (
        adminSideBarKeys.map((key, index) => (
          <ListItem key={key.text} disablePadding>
            <ListItemButton onClick={key.onClick}>
              <ListItemIcon>{key.icon}</ListItemIcon>
              <ListItemText primary={key.text} />
            </ListItemButton>
          </ListItem>
        ))
      )
    }
    else {
      return (
        userSideBarKeys.map((key, index) => (
          <ListItem key={key.text} disablePadding>
            <ListItemButton onClick={key.onClick}>
              <ListItemIcon>{key.icon}</ListItemIcon>
              <ListItemText primary={key.text} />
            </ListItemButton>
          </ListItem>
        ))
      )
    }
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={user && toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Secure Storage Model
        </Typography>
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
