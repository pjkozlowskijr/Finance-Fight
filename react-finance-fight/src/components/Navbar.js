// //////////////////////////////
// NAVBAR
// //////////////////////////////

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ThemeSwitch from './ThemeSwitch';

const drawerWidth = 225;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({children}) {
  const theme = useTheme();
  const {user} = React.useContext(AppContext)
  
  // Opening & closing navbar side drawer
  const {open, setOpen} = React.useContext(AppContext)
  const handleDrawerOpen = () => {setOpen(true)};
  const handleDrawerClose = () => {setOpen(false)};

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open} 
        sx={{backgroundColor:theme.palette.primary.main, backgroundImage:'none'}}
        >
        <Toolbar>
          <Box sx={{flexGrow: 1}}>
          <Typography 
            variant="h6" 
            noWrap 
            sx={{mr:3, display: 'inline', lineHeight:'40px'}} 
            component="div"
            >
            Finance Fight
          </Typography>
            <Link to='/'>
              <img 
                height="40px" 
                style={{verticalAlign:'top'}} 
                src="https://res.cloudinary.com/detcvmtip/image/upload/v1655272091/finance%20fight/Business-trend-and-finance-logo-design-on-transparent-background-PNG_z2hsjy.png" 
                alt="Finance Fight logo"
                />
            </Link>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
          {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        >
        <DrawerHeader sx={{backgroundColor: theme.palette.primary.main}}>
          <IconButton onClick={handleDrawerClose} sx={{color: '#fff'}}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {label:'Home', path:'/', icon:<HomeIcon/>},
            {label:'Asset Lookup', path:'/search', icon:<SearchIcon/>},
            {label:'Leaderboard', path:'/leaderboard', icon:<LeaderboardIcon/>},
            {label:'FAQs', path:'/help', icon:<HelpIcon/>},
            
            // If user is logged in, logout. If not, login.
            ((user?.token)?
            {label:'Logout', path:'/logout', icon:<LogoutIcon/>}
            :
            {label:'Login', path:'/login', icon:<LoginIcon/>}),
            
            // If user is logged in, account. If not, register.
            ((user?.token)?
            {label:'Profile', path:'/profile', icon:<AccountCircleIcon/>}
            :
            {label:'Create Account', path:'/register', icon:<AppRegistrationIcon/>})
          ].map((navItem) => (
            <ListItem key={navItem.label} disablePadding>
              <Link 
                to={navItem.path} 
                style={{
                  textDecoration:'none', 
                  color:theme.palette.text.secondary, 
                  width:'100%'
                }}
                >
                <ListItemButton>
                  <ListItemIcon sx={{color:theme.palette.text.secondary}}>
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={navItem.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <ListItem sx={{position:'absolute', bottom:'0', justifyContent:'center'}}>
          <ThemeSwitch/>
        </ListItem>
      </Drawer>
    </Box>
    </>
  );
}
