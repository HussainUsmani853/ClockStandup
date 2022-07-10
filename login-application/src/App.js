import { Avatar, Badge, Button, Popover } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { CameraAltOutlined, PersonOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Signin from "./components/Signin/Signin";
import { auth } from "./lib/firebase";

const useStyles = makeStyles(() => ({
  large: {
    width: useTheme().spacing(7),
    height: useTheme().spacing(7),
  },
}));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(anchorEl);

  useEffect(() => {
    // some code is executed
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setAppState("home");
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  const HomePage = () => {
    return (
      <div>
        <Popover
          open={open}
          id={id}
          onClose={handleClose}
          anchorEl={anchorEl}
          transformOrigin={{ vertical: "top" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <div className="home__popoverContainer">
            <div className="home__popover__top">
              <Badge
                overlap="circle"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <div className="home__badge">
                    <CameraAltOutlined className="home__camera" />
                  </div>
                }
              >
                <Avatar className={classes.large} />
              </Badge>
              <div className="home__text">
                <div className="home__displayName">
                  {currentUser?.displayName}
                </div>
                <div className="home__mail">{currentUser?.email}</div>
              </div>
              <div className="home__btn">Manage Your Google Account</div>
            </div>
            <div className="home__popover__btm">
              <div className="home__addBtn">
                <PersonOutlined className="home__addIcon" />
                <p>Add another account</p>
              </div>
              <Button
                onClick={() => auth.signOut()}
                variant="outlined"
                className="home__signOut"
              >
                Sign Out
              </Button>

              <div className="home__popover__footer">
                <p>Privacy policy</p>
                <span>.</span>
                <p>Terms of service</p>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  };

  return (
    <div className="App">
      {appState === "empty" && <p>Loading...</p>}
      {appState === "home" && (
        <div className="header">
          <HomePage />
          <Avatar className="header__avatar" onClick={handleClick} />
        </div>
      )}
      {appState === "login" && <Signin />}
    </div>
  );
}

export default App;
