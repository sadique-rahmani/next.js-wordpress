import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5D87dF",
      light: "#ECF2FF",
      dark: "#4570EA",
    },
    background: {
      default: "#f6f9fc",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default theme;
