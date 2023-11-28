import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Teal 500
      light: '#52c7b8',
      dark: '#00675b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // Orange 500
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    // Additional color configurations can be added here
  },
  typography: {
    fontFamily: [
      '-apple-system', // Apple's system font
      'BlinkMacSystemFont', // Chrome on MacOS
      '"Segoe UI"', // Windows
      'Roboto', // Android and websites
      '"Helvetica Neue"', // Older versions of MacOS
      'Arial',
      'sans-serif', // Fallback
    ].join(','),
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },},
    
  components: {
    MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#424242',
            color: '#fff',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#333',
            color: '#fff',
            fontSize: '0.875em',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: '2px solid #fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#009688',
          },
        },
      },
    // Add more component customizations as needed
  },
});

export default theme;
