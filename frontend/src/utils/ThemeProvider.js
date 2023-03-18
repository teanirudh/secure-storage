import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#247E38",
          fontSize: '1rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
        }
      }
    }
  }
});
