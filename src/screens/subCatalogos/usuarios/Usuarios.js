import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import  APIs from './Requests/APIs'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import '../index.css'
import '../styles.css'


export default function Contactos ()  {


    const [datas, setDatas] = useState();
    const [datas2, setDatas2] = useState();
    const [datas3, setDatas3] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [cargar, setCargar]= useState(false)
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [rango, setRango] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [deleteCountry, setDeleteCountry] = useState(null);
    const [paisId, setPaisId] = useState();
    const [abreviacion, setAbreviacion] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [departamento, setDepartamento] = useState(null)
    const [rol, setRol] = useState(null)
    const [distribucion, setDistribucion] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [email, setEmail] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [contraseña, setContraseña] = useState(null)

    useEffect(() => {
      try {
        APIs.getAllCities().then((data) => {
          setDatas(data.resultset.map((e) => {
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
      try {
        APIs.getAllStates().then((data) => {
          setDatas2(data.resultset.map((e) => {
            return {
              ...e,
             // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
            }
          }))
        })
  
      } catch (error) {
        console.log(error)
      }
      try {
        APIs.getAllStates().then((data) => {
          setDatas3(data.resultset.map((e) => {
            return {
              ...e,
             // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
            }
          }))
        })
  
      } catch (error) {
        console.log(error)
      }
  
    }, [loading])

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // }

    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCiudad("");
        setAbreviacion("");
        setRango(null)
        setEdit(false)
        setSelectedCountry(null);
        setProductDialog(false);
    }
    const onCityChange = (e) => {
        setRol(e.value);
    }
    const onCityChange2 = (e) => {
        setDistribucion(e.value);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);
        const newCountry ={
          userName: nombre,
          userMail: email,
          userPassword: contraseña,
          telefono: telefono,
          departamento: departamento,
          rol: rol,
          distribucion: distribucion,
          enabled: true
          };
            try{
               APIs.postCity(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Usuario Creado', life: 3000 });
                setTimeout(() => {
                        setProductDialog(false);
                        setCargar(false)
                        try {
                            APIs.getAllCities().then((data) => {
                              setDatas(data.resultset.map((e) => {
                                return {
                                  ...e,
                                 // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
                                }
                              }))
                              setLoading(false)
                             setDepartamento(null)
                             setRol(null)
                             setDistribucion(null)
                             setTelefono(null)
                             setEmail(null)
                             setNombre(null)
                             setContraseña(null)
                            })
                      
                          } catch (error) {
                            console.log(error)
                          }
                    }, 3000);
                }
                if(res.codigo == 204){
                    {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error', life: 3000 });
                    }
                }
                 })
                }catch(error){}
    }
    const editPais = () => {
        setSubmitted(true);
        const newCountry ={
          userId:paisId,
          userName: nombre,
          userMail: email,
          userPassword: contraseña,
          telefono: telefono,
          departamento: departamento,
          rol: rol,
          distribucion: distribucion,
          enabled: true
          };
            try{
               APIs.putCity(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Usuario Editado', life: 3000 });
                setTimeout(() => {
                        setProductDialog(false);
                        setLoading(true)
                        setCargar(false)
                        try {
                            APIs.getAllCities().then((data) => {
                              setDatas(data.resultset.map((e) => {
                                return {
                                  ...e,
                                 // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
                                }
                              }))
                              setLoading(false)
                              setCiudad("")
                              setSelectedCountry(null)
                              setAbreviacion("")
                              setEdit(false)
                            })
                      
                          } catch (error) {
                            console.log(error)
                          }
                    }, 3000);
                }
                if(res.codigo == 204){
                    {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error', life: 3000 });
                    }
                }
                 })
                }catch(error){}
    }

    const editProduct = (product) => {
        setPaisId(product.userId)
        setDepartamento(product.departamento)
        setRol(product.rol)
        setDistribucion(product.distribucion)
        setTelefono(product.telefono)
        setEmail(product.userMail)
        setNombre(product.userName)
        setContraseña(product.userPassword)
        setEdit(true)
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setPaisId(product.userId)
        setDeleteCountry(product.state)
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        const newCountry ={
          userId:paisId,
          userName: "hardcode",
          userMail: "hardcode",
          userPassword: "hardcode",
          telefono: "hardcode",
          departamento: "hardcode",
          rol: "hardcode",
          distribucion: "hardcode",
          enabled: false
          };
            try{
               APIs.deleteCity(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Usuario Eliminado ', life: 3000 });
                setTimeout(() => {
                    setCargar(false)
                    setDeleteProductDialog(false);
                        try {
                            APIs.getAllCities().then((data) => {
                              setDatas(data.resultset.map((e) => {
                                return {
                                  ...e,
                                }
                              }))
                            })
                      
                          } catch (error) {
                            console.log(error)
                          }
                    }, 3000);
                }
                if(res.codigo == 204){
                    {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error', life: 3000 });
                    }
                }
                 })
                }catch(error){}
    }

    // const findIndexById = (id) => {
    //     let index = -1;
    //     for (let i = 0; i < products.length; i++) {
    //         if (products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    // const importCSV = (e) => {
    //     const file = e.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const csv = e.target.result;
    //         const data = csv.split('\n');

    //         // Prepare DataTable
    //         const cols = data[0].replace(/['"]+/g, '').split(',');
    //         data.shift();

    //         const importedData = data.map(d => {
    //             d = d.split(',');
    //             const processedData = cols.reduce((obj, c, i) => {
    //                 c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
    //                 obj[c] = d[i].replace(/['"]+/g, '');
    //                 (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
    //                 return obj;
    //             }, {});

    //             processedData['id'] = createId();
    //             return processedData;
    //         });

    //         const _products = [...products, ...importedData];

    //         setProducts(_products);
    //     };

    //     reader.readAsText(file, 'UTF-8');
    // }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo Usuario" icon="pi pi-plus"  onClick={openNew} style={{backgroundColor:'#202c52', color:'white',borderColor: 'rgba(0,0,0,0)'}}/>
                {/* <Button style={{marginLeft:2}} label="Eliminar Pais" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}  /> */}
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar Archivo"  style={{marginRight:2}} onUpload={importCSV} /> */}
                <Button label="Descargar" icon="pi pi-upload"  onClick={exportCSV} style={{backgroundColor:'#e8580e', color:'white',borderColor: 'rgba(0,0,0,0)'}} />
            </React.Fragment>
        )
    }

    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    // }

    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // }

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    // const statusBodyTemplate = (rowData) => {
    //     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button style={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', color: 'black', marginRight:2 }} icon="pi pi-pencil" className="p-button-rounded" 
                onClick={() => editProduct(rowData)}  />
                <Button style={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', color: 'black',  }} icon="pi pi-trash" className="p-button-rounded"  onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Administrar Usuarios</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{backgroundColor:'#202c52', color:'white'}}/>
            {edit == false ?<Button 
            label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} style={{backgroundColor:'#e8580e', color:'white'}}
            loading={cargar} loadingOptions={{ position: 'right' }}/>
            :<Button 
            label="Guardar" icon="pi pi-check" className="p-button-text" onClick={editPais} style={{backgroundColor:'#e8580e', color:'white'}}
            loading={cargar} loadingOptions={{ position: 'right' }}/>}
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} style={{backgroundColor:'#202c52', color:'white'}} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} loading={cargar} loadingOptions={{ position: 'right' }} style={{backgroundColor:'red', color:'white'}}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4 mt-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={datas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} loading={loading}
                    dataKey="userId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrar {first} de {totalRecords} usuarios"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column body={actionBodyTemplate}  header="Acciones" exportable={false} style={{ minWidth: '2rem' }}></Column>
                    <Column field="userName" header="Nombre del usuario" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="userMail" header="Correo del usuario" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="distribucion" header="Distribucion del usuario" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains" sortable style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalles del usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="Base">Departamento </label>
                    <InputText
                        value={departamento}
                        onChange={e => setDepartamento(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !departamento })} />
                    {submitted && !departamento && <small className="p-error">Departamento es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Nombre">Rol</label>
                    <Dropdown value={rol} options={datas2} onChange={onCityChange} optionLabel="roleName" placeholder="Selecciona un rol"
                    className={classNames({ 'p-invalid': submitted && !rol })} />
                    {submitted && !rol && <small className="p-error">Rol es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Rango">Distribucion</label>
                    <Dropdown value={distribucion} options={datas3} onChange={onCityChange2} optionLabel="roleName" placeholder="Selecciona un rol"
                    className={classNames({ 'p-invalid': submitted && !rol })} />
                    {submitted && !distribucion && <small className="p-error">Distribucion es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Rango">Telefono</label>
                    <InputText
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !telefono })} />
                    {submitted && !telefono && <small className="p-error">Telefono es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Rango">Correo electronico</label>
                    <InputText
                        value={email}
                        onChange={e => setEmail(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !email })} />
                    {submitted && !email && <small className="p-error">Correo es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Rango">Nombre</label>
                    <InputText
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nombre })} />
                    {submitted && !nombre && <small className="p-error">Nombre es mandatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Rango">Contraseña</label>
                    <InputText
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !contraseña })} />
                    {submitted && !contraseña && <small className="p-error">Contraseña es mandatorio.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span> Deseas eliminar la siguiente zona <b>{product.userName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
                
