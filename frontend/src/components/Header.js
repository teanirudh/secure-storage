import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AuthContext from '../contexts/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        {user ? <Button color="inherit" onClick={logoutUser}>Logout</Button> : <></>}
      </Toolbar>
    </AppBar>
  )
};

export default Header;