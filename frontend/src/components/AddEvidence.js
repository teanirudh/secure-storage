import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useAxios from '../utils/useAxios';

const AddEvidence = (props) => {
  const axiosInstance = useAxios();
  const { openUserModal, handleClose } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hash, setHash] = useState("");
  const [file, setFile] = useState(null);

  const clearForm = () => {
    setName("");
    setDescription("");
    setHash("");
    setFile("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      description: description,
      hash: hash,
      file: file,
    }
    const headers = { 'Content-Type': 'multipart/form-data' };
    await axiosInstance.post("/evidence/", body, { headers: headers })
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
                Name
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="name"
                type="text"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="description"
                type="text"
                size="big"
                sx={{ width: '100%' }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                Hash
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="hash"
                type="text"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setHash(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <Typography variant="body1" align="left" sx={{ height: '100%', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                File
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="file"
                type="file"
                size="small"
                sx={{ width: '100%' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
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
                Add Evidence
              </Button>
            </Grid>
            <Grid item xs={4} >
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEvidence;
