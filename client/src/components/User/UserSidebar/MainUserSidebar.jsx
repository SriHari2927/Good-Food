import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { IoPersonCircleOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FaListAlt, FaHome } from "react-icons/fa";
import { SlBasketLoaded } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";
import "./MainUserSidebar.css";

import { useSidebar } from "../../Sidebar/SidebarContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0), 
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  marginLeft: open ? `${drawerWidth}px` : 0,
  minHeight: "auto", 
  backgroundColor: "dodgerblue",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 0), 
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));



const MainUserSidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [notificationCount, setNotificationCount] = React.useState("");
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();

  

  React.useEffect(() => {
    const getNotificationCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/getNotificationCount`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(notificationCount);
        setNotificationCount(response.data.count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotificationCount();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (menuItem) => {
    console.log(menuItem);
    if (menuItem === "Profile") {
      navigate("/user/Profile");
    } else if (menuItem === "Cart") {
      navigate("/user/Cart");
    } else if (menuItem === "Subscription") {
      navigate("/user/SubscriptionCalender");
    } else if (menuItem === "Order") {
      navigate("/user/order");
    } else if (menuItem === "Log Out") {
      navigate("/");
    } else if (menuItem === "Wallet") {
      navigate("/user/Wallet");
    } else if (menuItem === "Home") {
      navigate("/");
    } else if (menuItem === "Notification") {
      navigate("/user/Notification");
    } else if (menuItem === "Skippedcart") {
      navigate("/user/Skippedcart");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: " dodgerblue" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                handleDrawerOpen();
                toggleSidebar();
              }}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => {
                handleDrawerClose();
                toggleSidebar();
              }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: "Profile", icon: <IoPersonCircleOutline size={30} /> },
              {
                text: `Notification`,
                icon: (
                  <>
                    <FontAwesomeIcon icon={faBell} />
                    {notificationCount > 0 && (
                      <div className="notification-icon-item">
                        <p className="notification-bubble">
                          {notificationCount}
                        </p>
                      </div>
                    )}
                  </>
                ),
              },
              { text: "Subscription", icon: <FaListAlt size={20} /> },
              { text: "Cart", icon: <SlBasketLoaded size={24} /> },
              { text: "Wallet", icon: <FontAwesomeIcon icon={faWallet} /> },
              {
                text: "Order",
                icon: <FontAwesomeIcon icon={faBell} size="1.4rem" />,
              },
              { text: "Log Out", icon: <FaHome size={25} /> },
              { text: "Home", icon: <FaHome size={25} /> },
              { text: "Skippedcart", icon: <SlBasketLoaded size={24} /> },
            ].map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(text)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {/* <h1>Main Content Here</h1>
           <p>Your page content...</p>. */}
        </Main>
      </Box>
    </>
  );
};

export default MainUserSidebar;
