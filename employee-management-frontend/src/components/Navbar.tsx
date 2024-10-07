// src/components/Navbar.tsx

import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/logo itt.png"
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Logout function to clear authentication status
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar
          alt="logo"
          src={Logo}
          sx={{ width: 56, height: 56, marginRight: 5}}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <HomeIcon/>
        </Button>
        <Button color="inherit" component={Link} to="/add">
          <PersonAddAlt1Icon/>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          <LogoutIcon/>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
