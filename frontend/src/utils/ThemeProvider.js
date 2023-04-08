import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Segoe UI",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#247E38",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(224, 224, 224, 1)",
        },
      },
    },
  }
});
