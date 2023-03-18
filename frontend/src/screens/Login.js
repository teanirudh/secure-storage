import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e1e1e3",
      height: "90vh",
    }}>
      <form onSubmit={loginUser}>
        <Card sx={{ width: 600, height: 400, backgroundColor: "white" }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px", flexDirection: "column", }}>
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" component="div" sx={{ marginRight: "20px", fontWeight: "500" }}>
                  Username
                </Typography>
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px", marginBottom: "60px" }}>
                <Typography variant="h6" component="div" sx={{ marginRight: "20px", fontWeight: "500" }}>
                  Password
                </Typography>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Box>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#247E38" }}>Login</Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </div >
  )
}

export default Login;