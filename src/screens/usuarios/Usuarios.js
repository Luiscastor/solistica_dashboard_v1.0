import React, { useState, useEffect, useRef } from 'react';
import 'primeicons/primeicons.css';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../../screens/Datatable.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom'
import Button2 from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material//DeleteOutline';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import  Modal  from '@mui/material/Modal'
import ContactosRequests from './Requests/APIs'
import { ToastContainer, toast } from 'react-toastify';

const useStyles = styled((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  buttonInput: {
    border: '1px black solid',
    backgroundColor: 'white',
    borderRadius: '4px',
    width: '100%',
    padding: theme.spacing(3),
  },
}));

function Contactos({ props }) {

  const styles = useStyles();
  const classes = useStyles();
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [datas, setDatas] = useState()
  const [id, setId] = useState()
  const [userid, setUserid] = useState(1)
  const [selected, setSelected] = useState([])
  const [editar, setEditar] = useState()
  const [globalFilter, setGlobalFilter] = useState('');
  const [namefilter, setNameFilter] = useState('');
  const [statusfilter, setStatusFilter] = useState('');
  const [showfilter, setShowFilter] = useState('');
  const [isvisible, setIsvisible] = useState('')
  const [fields, setFields] = useState('')
  const [name, setName] = useState([])
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [perfil, setPerfil] = useState()
  const [ordenModal, setOrdenModal] = useState(false)
  const [update, setUpdate] = React.useState({
    active_visibility: true,
    description: 'test2',
    id: "1",
    id_usuario: "1",
    idbusiness_line: "1",
    images: [{
      id: "10",
      image: 'prueba',
      name: 'prueba'
    }],
    name: 'test2',
  })
  let history = useHistory();

  //----------------------------
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState()
  const [userToEdit, setUserToEdit] = useState()
  const [modalConfirmar, setModalConfirmar] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    try {
      ContactosRequests.getAllEmployees().then((data) => {
        setDatas(data.resultset.map((e) => {
          console.log("prueba",e);
          return {
            ...e,
           // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
          }
        }))
        setLoading(false)
      })

    } catch (error) {
      console.log(error)
    }

  }, [loading, userToEdit, props])
  // // ----ELIMINANDO EMPLOYEE ----

  // const peticionDelete = async (rowData) => {
  //   setUserToDelete(rowData)
  //   setModalEliminar(true);
  // }

  // const deleteUser = async (user) => {
  //   //console.log("USER",user)
  //   try {
  //     ContactosRequests.deleteEmployee(user.id_contacto, 45)
  //       .then((res) => {
  //         //  console.log("BORRADO",res)
  //         setDatas(datas.filter(consola => consola.id_contacto !== user.id_contacto));
  //         toast.success('Contacto eliminado exitosamente', {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         setModalEliminar(false)
  //       })
  //       .catch((err) => { console.log("error", err) })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const deleteMany = async () => {
  //   const ids = selected.map((e) => e.id_contacto)
  //   //console.log(ids)

  //   try {
  //     for (var i = 0; i < ids.length; i++) {
  //       ContactosRequests.deleteEmployee(ids[i], 45)
  //         .then((res) => {
  //           // console.log("BORRADO",res)
  //           setDatas(datas.filter(consola => consola.id_contacto !== ids[i]));
  //           //console.log("DATAS",datas)
  //           ContactosRequests.getAllEmployees().then((data) => {
  //             setDatas(data.map((e) => {
  //               return {
  //                 ...e,
  //                 active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
  //               }
  //             }))

  //           })
  //         })
  //         .catch((err) => { console.log("error", err) })
  //     }
  //     setSelected([])
  //     toast.success('Contactos eliminados exitosamente', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     setModalConfirmar(false)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // // ---------------------------------------

  // const peticionUpdate = async () => {
  //   if (editar.status == "PENDIENTE" || editar.status == "RECHAZADO") {
  //     abrirCerrarModalStatus()
  //     abrirCerrarModalEditar()
  //   } else {
  //     history.push('/EditarContacto', { datax: editar })
  //   }
  // }
  // const peticionPut = async (user) => {
  //   if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(user.email)) {
  //     toast.error('Correo electrónico no valido.', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     return;
  //   }
  //   const updateUser = {
  //     id: user.id,
  //     email: user.email,
  //     id_role: user.id_role,
  //     id_usuario: 45,
  //     name: user.name
  //   }
  //   try {
  //     ContactosRequests.updateEmployee(updateUser)
  //       .then((res) => {
  //         // console.log("RESPONSE", res)
  //         toast.success('Actualizado exitosamente.', {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         setModalEditar(false)
  //         ContactosRequests.getAllEmployees().then((data) => {
  //           setDatas(data.map((e) => {
  //             return {
  //               ...e,
  //               active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
  //             }
  //           }))

  //         })
  //       })
  //       .catch((e) => { console.log("E", e) })
  //   } catch (error) {
  //     console.log("Error", error)
  //   }


  // }

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setUpdate(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }))
  //   //console.log(update);
  // }


  // const updateForm = async () => {
  //   abrirCerrarModalOrden();
  //   // console.log('datasss', datas);
  //   const arr = datas.map((e) => {
  //     return {
  //       ...e
  //     }
  //   })
  //   setActive(true)
  //   try {
  //     ContactosRequests.SaveOrderServices(arr)
  //       .then((res) => {
  //         console.log("RES", res);
  //         if (res.code == 200) {
  //           toast.success('Configuración guardada exitosamente', {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           })
  //           setTimeout(() => {
  //             ContactosRequests.getAllEmployees().then((data) => {
  //               setDatas(data.map((e) => {
  //                 return {
  //                   ...e,
  //                   active_visibility: e.active_visibility == true ? "SI" : "NO"
  //                 }
  //               }))
  //               setLoading(false)
  //             })
  //             abrirCerrarModalOrden()
  //             setActive(false)
  //           }, 3000);
  //         } else {
  //           toastErr(res.response)
  //           setActive(false)
  //         }
  //       })
  //       .catch((err) => {
  //         setActive(false)
  //         toastErr('Ocurrió un error al guardar configuración.')
  //           ;
  //       })
  //   } catch (error) {
  //     setActive(false)
  //   }
  // }

  const toastErr = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const onRowReorder = (e) => {
    setDatas(e.value);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }
  const abrirCerrarModalConfirmar = (rowData) => {
    setModalConfirmar(!modalConfirmar);
  }
  const [statusModal, setStatusModal] = useState(false)
  const abrirCerrarModalStatus = () => {
    setStatusModal(!statusModal)
  }

  const abrirCerrarModalOrden = () => {

    setOrdenModal(!ordenModal);
  }

  const bodyOrden = (
    <div className={styles.modal}>
      <h2>¿Deseas guardar la configuración?</h2>
      <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', }}>
        <Button disabled={active} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }} onClick={console.log("updateForm")}>ACEPTAR</Button>
        <Button color="secondary" onClick={() => setOrdenModal(false)} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }}>CANCELAR</Button>
      </div>

    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <h2>¿Deseas eliminar el contacto?</h2>
      <h4>El contacto será eliminado para siempre</h4>
      <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', }}>
        <Button onClick={() =>console.log("deleteuser(usertodelete")} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }}>ACEPTAR</Button>
        <Button color="secondary" onClick={() => setModalEliminar(false)} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }}>CANCELAR</Button>
      </div>

    </div>
  )

  const bodyConfirmar = (
    <div className={styles.modal}>
      <h2>¿Deseas eliminar los contactos?</h2>
      <h4>Los contactos serán eliminados para siempre</h4>
      <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', }}>
        <Button onClick={() => console.log("deleteMany")} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }}>ACEPTAR</Button>
        <Button color="secondary" onClick={() => setModalConfirmar(false)} style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }}>CANCELAR</Button>

      </div>

    </div>
  )
  const bodyStatus = (
    <div className={styles.modal}>
      <h1>El contacto no podrá ser editado hasta ser autorizado o rechazado</h1>
      <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', }}>
        <Button color="primary" style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }} onClick={() => setStatusModal(false)}>CONTINUAR</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h2>¿Deseas editar el contacto?</h2>
      <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', display: 'flex', }}>
        <Button color="primary" style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }} onClick={() => console.log("update")}>ACEPTAR</Button>
        <Button color="primary" style={{ width: '45%', background: '#003DA5', justifyContent: 'center' }} onClick={() => setModalEditar()}>CANCELAR</Button>
      </div>
    </div>
  )

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button style={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', color: 'black' }} icon="pi pi-pencil" className="p-button-rounded"
          onClick={() => { abrirCerrarModalEditar(); setEditar(rowData) }} />
        <Button style={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', color: 'black' }}
          icon="pi pi-trash" className="p-button-rounded" onClick={() => { console.log("delete"); }} />
      </React.Fragment>
    );
  }
  const header = (
    <div className="table-header">

      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar" style={{ borderRadius: 0 }} />
      </span>
      {selected.length >= 1 ?
        <>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <Button2
              onClick={() => { setModalConfirmar(true) }}
              color="primary"
              startIcon={<DeleteOutlineIcon />}
            >
              Eliminar
            </Button2>
          </div>
        </> : null}
    </div>
  );
  


  return (

    <div className="datatable-filter-demo" style={{ marginLeft: '7.5%', marginRight: '5%', }}>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: '#202c52' }}>Usuarios</h1>
        <Button type="button" label="AGREGAR USUARIO" icon="pi pi-plus" 
          style={{ height: '50%', backgroundColor: '#202c52', borderColor: 'rgba(0,0,0,0)' }} />
      </div>
      <div className="card"> 
        <DataTable resizableColumns value={datas}   loading={false} selectionMode="checkbox" selection={selected} onSelectionChange={e => (setSelected(e.value))} dataKey="id_contacto"
          header={header} className="p-datatable-customers" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter} emptyMessage="No se encontraron usuarios.">
          <Column selectionMode="multiple" headerStyle={{width: '3em',}}></Column>
          <Column  headerStyle={{ width: '3em', }}></Column>
          <Column header="Acciones" body={actionBodyTemplate}
          ></Column>
          <Column field="userName" header="Usuario" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains" sortable
          ></Column>
          <Column field="userMail" header="Correo" filter filterPlaceholder="Buscar por coreo" filterMatchMode="contains" sortable
          ></Column>
          <Column field="departamento" header="Departamento" filter filterPlaceholder="Buscar por departamento" filterMatchMode="contains" sortable style={{ width: '25%' }}
          ></Column>
          <Column field="telefono" header="Telefono" filter filterPlaceholder="Buscar por telefono" sortable filterMatchMode="contains"
          ></Column>        
        </DataTable>
        {/* <div style={{ display: 'flex', flexDirection: 'row-reverse', }}>
          <Button type="button" disabled={active} label="GUARDAR" onClick={() => abrirCerrarModalOrden()}
            style={{ height: '50%', backgroundColor: '#202c52', borderColor: 'rgba(0,0,0,0)' }} />
        </div> */}

        <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>

        <Modal
          open={modalConfirmar}
          onClose={abrirCerrarModalConfirmar}>
          {bodyConfirmar}
        </Modal>
        <Modal
          open={statusModal}
          onClose={abrirCerrarModalStatus}>
          {bodyStatus}
        </Modal>
        <Modal
          open={ordenModal}
          onClose={abrirCerrarModalOrden}>
          {bodyOrden}
        </Modal>
      </div>
    </div>

  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#84BD00",
    }
  },
})

export default Contactos;