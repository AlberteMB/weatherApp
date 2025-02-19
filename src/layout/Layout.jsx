import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
//import { styled } from "@mui/system";
import { Link, Outlet } from "react-router-dom";

//const StyledLink = styled(Link)({
  //  color: "#4b6cb7", // Matching the soft light gray text color
    //textDecoration: "none",
    //marginLeft: "20px",
    //"&:hover": {
      //color: "#FFFFFF", // Slightly lighter on hover
    //},
  //});

  export default function Layout() {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(to right,rgb(115, 183, 75),rgb(24, 72, 24))", // Matching the body gradient
            boxShadow: "0 3px 5px 2px rgba(24, 40, 72, 0.3)", // Subtle shadow using the darker color
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textAlign: "left", color: "#F0F4F8" }}
            >
            Weather Tracker
            </Typography>
            <Button component={Link} to="/">
            Home
            </Button>
            <Button component={Link} to="/weather">
            Weather
            </Button>
           <Button component={Link} to="/map">
            Map 
            </Button>
            <Button component={Link} to="/about">
            About
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ color: "#F0F4F8", paddingTop: "20px" }}>
          <Outlet />
        </Container>
      </>
    );
  }


