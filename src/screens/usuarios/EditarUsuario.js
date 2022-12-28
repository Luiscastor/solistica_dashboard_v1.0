import React, {useState, useEffect} from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, Container, Icon, Modal  } from '@material-ui/core'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useHistory, useLocation } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ContactosRequests from './Requests/ContactosRequests';
import { ToastContainer, toast } from 'react-toastify';
import './Contactos.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

  function EditarContacto ({props}){
    const classes = useStyles();
    let history = useHistory();
    const [state, setState] = React.useState({
        checkedA: true,
    });
    const location = useLocation();
    // const myparam = location.state?.datax;
    const [userName,setUserName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [phoneUser, setPhoneUser] = useState('')
    const [errorT1,setErrorT1] = useState(false)
    const [errorT2,setErrorT2] = useState(false)
    const [idx, setIdx] = useState()
    const [errorT3,setErrorT3] = useState(false)
    const [active,setActive] = useState(false)
    const logged3 = window.localStorage.getItem('user')
    const userx = JSON.parse(logged3)
    const [check, setCheck] = useState(false)
    const [modalEliminar, setModalEliminar]=useState(false);
    const abrirCerrarModalEliminar=()=>{

      setModalEliminar(!modalEliminar);
    }
    // useEffect(()=>{
    //     if(myparam){
    //     if(myparam.active_visibility == "SI"){
    //         setCheck(true)
    //     }else{setCheck(false)}
    //    // console.log('epale',myparam)
    //     setIdx(myparam.id_contacto)
    //     setUserName(myparam.name)
    //     setPhoneUser(myparam.phone_number)
    //     setUserEmail(myparam.email)
    // }
    //  },[props]);

  const bodyEliminar=(
  <div className={classes.modal}>
      <h2>¿Deseas editar el contacto?</h2>
      <div style={{marginTop:20, flexDirection:'row', justifyContent:'space-between', width:'100%', display:'flex',}}>
      <Button onClick={()=>{console.log("addADDmin");}} disabled={active} style={{width:'45%', background:'#003DA5', justifyContent:'center', color: '#FFF'}}>ACEPTAR</Button>
      <Button onClick={()=>abrirCerrarModalEliminar()} style={{width:'45%', background:'#003DA5',color:'#FFF', justifyContent:'center'}}>CANCELAR</Button>
      </div>
  </div>
      )
    // const addAdmin = async () => {
    //     abrirCerrarModalEliminar();
    //     setActive(true)
    //     if(userName == '' || userName == null ){
    //         setErrorT1(true)
    //         toast.error('Error. Nombre de contacto vacío.', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             });
    //             setActive(false)
    //     return;
    //     } else {setErrorT1(false)}
    //     if((phoneUser == '' || phoneUser == null) && (userEmail == '' || userEmail == null) ){
    //         setErrorT2(true)
    //         setErrorT3(true)
    //         toast.error('Error. Debes ingresar un correo electrónico o un número de teléfono ', {
    //             position: "top-right",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             });
    //             setActive(false)
    //     return;
    //     } else {setErrorT3(false); setErrorT2(false)}
    //     if(userEmail !== '' && userEmail !== null){
    //         if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(userEmail) ) {
    //             setErrorT2(true);
    //             toast.error('Correo electrónico no valido.', {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 });
    //                 setActive(false)
    //                 return;
    //         }
    //     }
    //     const newEmployee ={
    //         id_contacto:idx,
    //         name:userName,
    //         phone_number: phoneUser,
    //         email: userEmail,
    //         active_visibility: check,
    //         id_usuario: userx.id,
    //     }
    //     try {  
    //         ContactosRequests.putNewEmployee(newEmployee)
    //         .then((res)=>{
    //             if(res.code == 204){
    //                 toast.error('Este correo ya se encuentra en uso.', {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     });
    //                     setActive(false)
    //                 return;
    //             } 
    //            // console.log("RES",res);
    //             toast.success('Contacto editado exitosamente', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 });
    //                 setTimeout(() => {
    //                     history.push('/Contactos') 
    //                     setActive(false)
    //                 }, 3000);
    //              })
    //         .catch((err)=>{console.log("Error",err)
    //         toast.error('Ocurrió un error al editar contacto.', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             })
    //             setActive(false)
    //             ;})
    //     } catch (error) {
    //         console.log(error)
    //         setActive(false)
    //     }
    // }


    // switch (props) {
    //     case 'Administrador':
    //       break;
    //     case 'Editor':
    //       break;
    //       case 'RH':
    //       return <Redirect to={"/Catalogos"}/>
    //       break;
    //     default:
    //       break;
    //   }
  return (
    
    
    <div style={{height:400, width:'100%',alignItems:'center', justifyContent:'center', marginLeft:'1%'}}>
        <MuiThemeProvider theme={defaultTheme}>
        <Container className={classes.container}>
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
        <Button
            onClick={()=>history.push('/landingPage')}
            size="large"
            className={classes.button}
            startIcon={<ArrowBackIos />}
        >
            REGRESAR
        </Button>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1 style={{color:'#003DA5'}}>Editar contacto</h1>
        </div>
            <div style={{justifyContent:'space-between', alignItems:'center'}}>
                <h3>Nombre contacto</h3>
                <TextField
                error={errorT1}
                inputProps={{maxLength :100}}
                helperText={`${userName.length}/100`}
                id="nombreAdmin"
                placeholder="Escribe"
                margin="normal"
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                color="primary"
                />
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{width: '50%', float:'left', paddingRight:'10px'}}>
                    <h3 >Teléfono</h3>
                </div>
                <div style={{width: '50%', float:'right'}}>
                    <h3>Correo electrónico</h3>
                </div>
                
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{width: '50%', float:'left', paddingRight:'10px'}}>
                <TextField
                    error={errorT3}
                    helperText={`${phoneUser.length}/15`}
                    placeholder="Escribe"
                    value={phoneUser}
                    inputProps={{ maxLength: 15 , className: classes.input}}
                    type={'tel'}
                    onChange={(e)=>{setPhoneUser(e.target.value)}}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                </div>
                
                <div style={{width: '50%', float:'right'}}>
                <FormControl className={classes.formControl}>
               
                <TextField
                    error={errorT2}
                    inputProps={{maxLength :100}}
                    helperText={`${userEmail.length}/100`}
                    id="emailAdmin"
                    placeholder="Escribe"
                    value={userEmail}
                    type={"email"}
                    onChange={(e)=>{setUserEmail(e.target.value)}}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="outlined"
                    />
        </FormControl>
                </div>
            </div>
            <br />
            <br />
            <div style={{justifyContent:'space-between', alignItems:'center'}}>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={check}
                        onChange={(event)=>{ setCheck(event.target.checked);
                        }}
                        name="check"
                        color="secondary"/>
                      }
                      label="Mostrar en página"
                  />
                <br /> 
            </div>
            
            <div style={{justifyContent:'space-between', alignItems:'center'}}>
                
            </div>
            <div style={{marginTop:'10px'}}>
            <Button className={classes.buttonPrimary}  onClick={()=>{setModalEliminar(true)}} variant="contained">GUARDAR</Button>
            <Button className={classes.buttonSecondary} onClick={()=>history.push('/landingPage')}>CANCELAR</Button>
            </div>
        </Container>
        <Modal
              open={modalEliminar}
              onClose={abrirCerrarModalEliminar}>
              {bodyEliminar}
            </Modal>
        </MuiThemeProvider>
    </div>
  )
}
  
export default EditarContacto;

const useStyles = makeStyles((theme) => ({
    number: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
      },
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    buttonPrimary:{
        height:'30%',
        width:'15%',
        color:'white',
        backgroundColor:'#003DA5',
        textTransform: 'none',
        float: 'right',
        margin:'10px'
    },
    buttonSecondary:{
        height:'30%',
        width:'15%',
        color:'#868686',
        fontWeight:'bold',
        textTransform: 'none',
        float: 'right',
        margin:'10px'
    },
    button: {
        textTransform: 'none',
        fontWeight: "bold"
      },
      buttonInput:{
          border:'1px DarkGrey solid',
          backgroundColor: 'white',
          borderRadius: '4px',
          width: '100%',
          padding: theme.spacing(3),
      },
      label:{
        float: 'right',
        color:'#868686'
      },
      container:{
        padding: theme.spacing(3),
        borderRadius: '5px',
        backgroundColor: 'white',
      },
      formControl: {
        minWidth: '100%',
      },
      modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius:5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
  }));

  const defaultTheme = createMuiTheme({
    palette: {
        primary: {
          main: "#000000",
        },
        secondary:{
          main: "#003DA5",
        }
      },
  })