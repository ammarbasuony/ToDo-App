import React, { useMemo, useState } from "react";

// Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// App
import App from "App";

// Context
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const AppProvider = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#121212" : "#eeeeee",
            minHeight: "100vh",
          }}
        >
          <App colorMode={colorMode} />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppProvider;
