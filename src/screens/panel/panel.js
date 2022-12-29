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
import '../../screens/subCatalogos/index.css'
import '../../screens/subCatalogos/styles.css'


export default function Panel ()  {


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


    const [value1, setValue1] = useState(null)
    const [value2, setValue2] = useState(null)
    const [value3, setValue3] = useState(null)
    const [value4, setValue4] = useState(null)
    const [value5, setValue5] = useState(null)

    useEffect(() => {
      try {
        APIs.getAllCities().then((data) => {
          setDatas(data.resultset.map((e) => {
            return {
              ...e,
              //active_visibility_desc: e.location.isCedis == true ? "SI" : "NO"
            }
          }))
          console.log("datas",datas);
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
        setPaisId(product.customerLocationId)
        setValue1(product.departamento)
        setValue2(product.rol)
        setValue3(product.distribucion)
        setValue4(product.telefono)
        setValue5(product.userMail)
        setNombre(product.userName)
        setContraseña(product.userPassword)
        setEdit(true)
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setPaisId(product.registrationErrorId)
        setDeleteCountry(product.state)
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
            try{
               APIs.deleteCity(paisId)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Error Eliminado ', life: 3000 });
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

    const deleteProducts = () => {
      try{
         APIs.deleteAllErrors()
        .then((res)=>{
          if(res.codigo == 200){
              setCargar(true)
              toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Errores Eliminados', life: 3000 });
          setTimeout(() => {
              setCargar(false)
              setDeleteProductsDialog(false);
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

        setDeleteProductsDialog(true);

    }


   

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar Archivo"  style={{marginRight:2}} onUpload={importCSV} /> */}
                <Button label="Eliminar todo" icon="pi pi-trash"  style={{backgroundColor:'#e8580e', color:'white',borderColor: 'rgba(0,0,0,0)',marginRight:2}} onClick={deleteSelectedProducts} />
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
            <h5 className="mx-0 my-1">Administrar panel de errores</h5>
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
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} loading={cargar} loadingOptions={{ position: 'right' }} style={{backgroundColor:'#e8580e', color:'white'}}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} style={{backgroundColor:'#202c52', color:'white'}}  />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProducts} loading={cargar} style={{backgroundColor:'#e8580e', color:'white'}}/>
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4 mt-4"  right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={datas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} loading={loading}
                    dataKey="registrationErrorId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" scrollable 
                    currentPageReportTemplate="Mostrar {first} de {totalRecords} errores"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column body={actionBodyTemplate}  header="Acciones" exportable={false} style={{ minWidth: '2rem' }}></Column>
                    <Column field="customerBase" header="Base" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="customerName" header="Cliente" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="locationId" header="ID" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="locationName" header="Nombre" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="stateName" header="Estado" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="cityName" header="Ciudad" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="stateCode" header="Codigo" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="latitude" header="Latitud" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="longitude" header="Longitud" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="zone1" header="Zona 1" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="zone2" header="Zona 2" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="zone3" header="Zona 3" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="zone4" header="Zona 4" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="timeZone" header="Zona horaria" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="address" header="Direccion" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="Descripcion" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="corporation" header="Corporacion" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="ownerType" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="isCedis" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="errorMessage" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="locationType" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="taxType" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="userIdPk" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="registrationErrorId" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '1000px' }} header="Detalles de la ubicacion" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div style={{width:'100%',background:'red', flexDirection:'row',alignItems:'center', display:'flex', justifyContent:'center'}}>
                <div style={{width:'30%',background:'yellow' }}>
                <div className="field">
                    <label htmlFor="Base">Base de cliente </label>
                    <InputText
                        value={value1}
                        onChange={e => setValue1(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value1 })} />
                    {submitted && !value1 && <small className="p-error">Base es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Cliente </label>
                    <InputText
                        value={value2}
                        onChange={e => setValue1(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value2 })} />
                    {submitted && !value2 && <small className="p-error">Cliente es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">ID Ubicacion </label>
                    <InputText
                        value={value3}
                        onChange={e => setValue1(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value3 })} />
                    {submitted && !value3 && <small className="p-error">Base es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Nombre de la ubicacion </label>
                    <InputText
                        value={value3}
                        onChange={e => setValue1(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value3 })} />
                    {submitted && !value3 && <small className="p-error">Base es obligatorio.</small>}
                </div>
                </div>
                <div style={{width:'30%',background:'yellow' }}>
                    <h1>test</h1>
                </div>
                <div style={{width:'30%',background:'yellow' }}>
                    <h1>test</h1>
                </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span> Deseas eliminar la siguiente ubicacion <b>{product.customerName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                     <span>Deseas eliminar todos los productos?</span>
                </div>
            </Dialog>
        </div>
    );
}
                
