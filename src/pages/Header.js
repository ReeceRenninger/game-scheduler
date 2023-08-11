import { Link } from "react-router-dom";
// import DarkModeButton from "../components/DarkModeButton";

//appbar
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GoogleAuth from "./GoogleAuth";

const Header = ({ isSignedIn, setIsSignedIn, apiCalendar, handleUpcomingEvents }) => {
  
  return (
   
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Box className="header-links" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/scheduler">Scheduler</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/about">About Page</Link>
            </Typography>
          </Box>
          {/* <DarkModeButton /> */}
          <GoogleAuth isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} apiCalendar={apiCalendar} handleUpcomingEvents={handleUpcomingEvents}/>
        </Toolbar>
      </AppBar>
    </Box>
   
  );
};

export default Header;
