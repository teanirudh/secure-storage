import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useAxios from '../utils/useAxios';
import DataContext from "../contexts/DataContext";

const AddUser = (props) => {
  const { hubList } = useContext(DataContext);
  const axiosInstance = useAxios();
  const { openUserModal, handleClose } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [canAdd, setCanAdd] = useState(false);
  const [canView, setCanView] = useState(false);
  const [viewLevel, setViewLevel] = useState("");
  const [hubId, setHubId] = useState("");

  const viewLevelList = [{ id: "NONE", name: "None" }, { id: "USER", name: "User" }, { id: "HUB", name: "Hub" }, { id: "GBL", name: "Global" }];

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setCanAdd(false);
    setCanView(false);
    setViewLevel("");
    setHubId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      email: email,
      can_add: canAdd,
      can_view: canView,
      view_level: viewLevel,
      hub_id: hubId,
    }
    await axiosInstance.post("/users/", body)
      .then((response) => {
        alert(response.data.success);
        clearForm();
        handleClose();
        window.location.reload(false);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <Modal
      open={openUserModal}
      onClose={handleClose}>
      <Box
        noValidate={true}
        autoComplete="off"
        sx={{ bgcolor: 'background.paper', width: '35%', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', padding: '18px', borderRadius: '10px' }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container rowSpacing={3} columnSpacing={3} sx={{ padding: 4 }}>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Username
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="username"
                type="text"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Password
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="password"
                type="password"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="email"
                type="email"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Can add
              </Typography>
            </Grid>
            <Grid item xs={3} align="center">
              <Switch checked={canAdd} onChange={(e) => setCanAdd(e.target.checked)} />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Can view
              </Typography>
            </Grid>
            <Grid item xs={3} align="center">
              <Switch checked={canView} onChange={(e) => setCanView(e.target.checked)} />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                View level
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Select value={viewLevel} onChange={(e) => setViewLevel(e.target.value)} sx={{ width: '100%' }}>
                {viewLevelList.map((vl) => {
                  return <MenuItem key={vl.id} value={vl.id}>{vl.name}</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={2} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Hub
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select value={hubId} onChange={(e) => setHubId(e.target.value)} sx={{ width: '100%' }}>
                {hubList.map((hub) => {
                  return <MenuItem key={hub.id} value={hub.id}>{hub.name}</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4} >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: '100%', backgroundColor: "#247E38", '&:hover': { backgroundColor: "#1D662D" } }}>
                Add User
              </Button>
            </Grid>
            <Grid item xs={4} >
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default AddUser;
