import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { TextField, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import "./Login.css";
import Logo from "../assets/logo_solistica.png";
import { orange } from '@mui/material/colors';
import LoadingButton from '@mui/lab/LoadingButton';
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom'
import RequestLogin from '../APIs/APIs'
import axios from "axios";

import image from '../assets/bg_circulos.gif'
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

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false)
  const [errorMessage, setErrorMesssage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let history = useHistory();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const Login = () => {
    axios
      .post(
        // "https://753e-108-175-15-104.ngrok.io/login",
        // "https://cors-anywhere.herokuapp.com/http://108.175.15.104:8080/login",
        "http://108.175.15.104:8080/login",
        null,
        {
          params: {
            username: email,
            password: password,
          },
        }
      )
      .then((response) => {
        if (response.data.codigo === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("distribucion", response.data.resultset.distribucion);
          setActive(true)
          setTimeout(() => {
            setActive(false);
            history.push('/paises');
          }, 3500);
        } else {
          console.log("Error");;
        }
      })
      .catch((err) => console.log("Error en acceso de usuario: ", err));
  };



  return (
    
<div className='container' style={{ backgroundImage: `url(${image})`,}}>
      <div style={{alignItems:"center",display:"flex", width:"100%", height:"100vh",justifyContent:"center"}}>
      <ThemeProvider theme={theme}>
      <Card sx={{ width: 400, height: 450, borderRadius: 5 }}>
        <div style={{height:"30%", width:"100%", justifyContent:"center", display:"flex", alignItems:"center"}}>
        <img src={Logo} alt="Solistica" width="160" height="100"/>
        </div>
        <div style={{justifyContent:"center",display:"flex",flexDirection:"column", alignItems:"center"}}>
            <TextField sx={{ width: "90%", mt: 5}} margin="normal" required id="email" label="Usuario"
              autoFocus
              color="secondary"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
        <TextField 
              label="Contraseña"
              sx={{ width: "90%"}}
              color="secondary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="outlined-start-adornment"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end"> <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> :  <VisibilityOff/>}
              </IconButton></InputAdornment>,
              }}
            />
              <LoadingButton
              loading={active}
              loadingPosition="end"
              endIcon={<LockIcon/>}
              type="submit"
              onClick={Login}
              variant="contained"
              sx={{ mt: 3, width: "90%" }}
              >
              Iniciar sesión
              </LoadingButton>
            <Button>      
            </Button>
        </div>
      </Card>
      </ThemeProvider>
      </div>  
</div>
  );
}