import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import { orange } from '@mui/material/colors';
import Logo from "../../../src/assets/logo_solistica.png";
import { useHistory } from 'react-router-dom'
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';

const theme = createTheme({
    palette: {
      secondary: {
        main: '#202c52'
      },
      primary:{
        main: orange[900]
      }
    }
  });

const drawerWidth = 240;



export default function Dashboard({children}) {
  const [open2, setOpen2] = useState(true);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClick = () => {
    setOpen2(!open2);
  };
  let history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              justifyContent:'center',
            }}
            
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{height:'100%', width:'100%'}}>
              <h1></h1>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: '36px',
                marginTop:'10px'
              }}
            >
              <Avatar alt="Remy Sharp"  />
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            
          >
            <img src={Logo} alt="Solistica" width="100%" height="100%"/>
            <IconButton onClick={toggleDrawer} color="secondary">
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ListAltIcon color="secondary"/>
        </ListItemIcon>
        <ListItemText primary="Catalogos" color="secondary"/>
        {open2 ? <ExpandLess color="secondary"/> : <ExpandMore color="secondary"/>}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PublicIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Pais" color="secondary" onClick={()=>{history.push('/paises')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PublicIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Estado" color="secondary"  onClick={()=>{history.push('/estados')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PublicIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Ciudad" color="secondary"  onClick={()=>{history.push('/ciudades')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AttachMoneyIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Tipo de impuesto" color="secondary"  onClick={()=>{history.push('/impuestos')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PlaceIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Tipos de ubicación" color="secondary"  onClick={()=>{history.push('/ubicaciones')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Cliente" color="secondary"  onClick={()=>{history.push('/clientes')}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessTimeIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Zonas horarias" color="secondary" onClick={()=>{history.push('/zonasH')}}/>
          </ListItemButton>
        </List>
      </Collapse>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon color="secondary"/>
      </ListItemIcon>
      <ListItemText color="secondary" primary="Ubicaciones" onClick={()=>{history.push('/ubicacionesm')}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon color="secondary"/>
      </ListItemIcon>
      <ListItemText color="secondary" primary="Panel de errores" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon color="secondary"/>
      </ListItemIcon>
      <ListItemText color="secondary" primary="Usuarios" onClick={()=>{history.push('/usuarios')}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon color="secondary"/>
      </ListItemIcon>
      <ListItemText color="secondary" primary="Cerrar sesión" onClick={()=>{history.push('/')}} />
    </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <main style={{width:'98%', height:'90%',marginLeft:20}}>
            {children}
          </main>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 233,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  