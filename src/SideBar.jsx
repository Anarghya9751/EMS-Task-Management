import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { ClassNames } from "@emotion/react";
import { Link } from "react-router-dom";
const drawerWidth = 220;

const SideBar = ({ handleSelect }) => {
  const sidetop = ["attendance", "Salary", "Send email", "Drafts"];

  const sidebottom = ["Shift", "Trash", "Spam"];

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
  };

  const handleSelectValue = (e) => {
    handleSelect = e;
    console.log(handleSelect);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(15, 80, 155)",
            color: "White",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <ApartmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon style={{ color: "white" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/DepartmentManager"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "white" }}>
                      <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText primary="Department" />
                  </ListItemButton>
                </Link>
                <Link to="/AddEmployee"
                 style={{ color: "white", textDecoration: "none" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                  <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Employee" />
                </ListItemButton>
                </Link>
                <Link to="/EmployeeList"
                 style={{ color: "white", textDecoration: "none" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                    <AlarmOffIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee List" />
                </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </List>
          <Divider style={{ backgroundColor: "white", color: "white" }} />
          <List>
            <Link
              to="/CreateProjectForm"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText primary="Create Project" />
              </ListItemButton>
            </Link>
            <Link
              to="/ProjectList"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PublishedWithChangesIcon />
                </ListItemIcon>
                <ListItemText primary="Project List" />
              </ListItemButton>
            </Link>
            <Link
              to="CreateTask"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <CurrencyRupeeOutlinedIcon></CurrencyRupeeOutlinedIcon>
                </ListItemIcon>
                <ListItemText primary="Create Task" />
              </ListItemButton>
            </Link>
            <Link to="/TaskManager" 
            style={{ color: "white", textDecoration: "none" }}>
            <ListItemButton /*onClick={handleClick}*/>
              <ListItemIcon style={{ color: "white" }}>
                <RequestPageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Task Manager" />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
            </Link>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/TaskStatus"
                style={{ color: "white", textDecoration: "none" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Task Status" />
                </ListItemButton>
                </Link>
                <Link to="/EmployeeTable" 
                style={{ color: "white", textDecoration: "none" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Task" />
                </ListItemButton>
                </Link>
                <Link to="/TaskReport" 
            style={{ color: "white", textDecoration: "none" }}>
            <ListItemButton /*onClick={handleClick}*/>
              <ListItemIcon style={{ color: "white" }}>
                <RequestPageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="TaskReport" />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
            </Link>
            <Link to="/ProjectDetails" 
            style={{ color: "white", textDecoration: "none" }}>
            <ListItemButton /*onClick={handleClick}*/>
              <ListItemIcon style={{ color: "white" }}>
                <RequestPageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Project Details" />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
            </Link>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default SideBar;
