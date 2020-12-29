import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  ThemeProvider,
  IconButton,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import "./App.css";

import useStyles from "./styles";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => {
    main.current.scrollIntoView();
  };

  //MUI Dark Theme Switch
  const [theme, setTheme] = useState(true);
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createMuiTheme(theme ? light : dark);
  //END OF DARK THEME WTICH

  useEffect(() => {
    if (speechState == SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <IconButton
        edge="end"
        color="inherit"
        aria-label={`Toggle ${!theme ? "Light" : "Dark"} theme`}
        onClick={() => setTheme(!theme)}
        className="ThemeSwitcher"
      >
        <span>Toggle {!theme ? "Light" : "Dark"} theme</span>
        {icon}
      </IconButton>
      <div>
        <Grid
          className={classes.grid}
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} sm={12} md={4} className={classes.mobile}>
            <Details title="Income" />
          </Grid>
          <Grid ref={main} item xs={12} sm={12} md={3} className={classes.main}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.desktop}>
            <Details title="Income" />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.last}>
            <Details title="Expense" />
          </Grid>
        </Grid>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </div>
    </ThemeProvider>
  );
};

export default App;

export const light = {
  palette: {
    type: "light",
    background: {
      default: "#e4f0e2",
    },
  },
};

export const dark = {
  palette: {
    type: "dark",
    background: {
      default: "#222222",
    },
  },
};
