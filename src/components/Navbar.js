import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using it for navigation

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Future Generation Training Center
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{textTransform:"capitalize"}}>
          Course List
        </Button>
        <Button color="inherit" component={Link} to="/student-list" sx={{textTransform:"capitalize"}}>
          Student List
        </Button>
        <Button color="inherit" component={Link} to="/add-course" sx={{textTransform:"capitalize"}}>
          Add Course
        </Button>
        <Button color="inherit" component={Link} to="/add-student" sx={{textTransform:"capitalize"}}>
          Add Student
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
