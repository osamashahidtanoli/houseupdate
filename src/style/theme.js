import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF",
    },
    secondary: {
      main: "#007FFF",
    },
    light : {
      color: "#007FFF",
    },
    dark : {
      color: "#007FFF",
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& label': {
          color: '#007FFF',
        },
        '& label.Mui-focused': {
          color: '#007FFF',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#007FFF',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#007FFF',
          },
          '&:hover fieldset': {
            borderColor: '#007FFF',
            borderWidth: '0.15rem',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#007FFF',
          },
        },
      },
    },
  },
});

export default theme;