import React, { useState, useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AuthContext from "../contexts/AuthContext";

const CustomAppBar = () => {
  const { logoutUser } = useContext(AuthContext);
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const sideBarKeys = [
    {
      text: "Create User",
      icon: <PersonAddIcon />,
    },
    {
      text: "User list",
      icon: <GroupIcon />,
    },
    {
      text: "Evidence list",
      icon: <LocalLibraryIcon />,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: logoutUser,
    },
  ];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {sideBarKeys.map((key, index) => (
          <ListItem key={key.text} disablePadding>
            <ListItemButton onClick={key.onClick}>
              <ListItemIcon>{key.icon}</ListItemIcon>
              <ListItemText primary={key.text} />
            </ListItemButton>
          </ListItem>
        ))}
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
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Secure Storage Model
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      {<Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>}
    </AppBar>
  );
};

export default CustomAppBar;
