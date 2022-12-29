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
import axios from 'axios';

export default function UbicacionesM ()  {


    const [datas, setDatas] = useState();
    const [datas2, setDatas2] = useState();
    const [datas3, setDatas3] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [cargar, setCargar]= useState(false)
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [rango, setRango] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);
    const [selectedCountry3, setSelectedCountry3] = useState(null);
    const [selectedCountry4, setSelectedCountry4] = useState(null);
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
    const [value6, setValue6] = useState(null)
    const [value7, setValue7] = useState(null)

    const [value8, setValue8] = useState(null)
    const [value9, setValue9] = useState(null)
    const [value10, setValue10] = useState(null)
    const [value11, setValue11] = useState(null)
    const [value12, setValue12] = useState(null)
    const [value13, setValue13] = useState(null)
    const [value14, setValue14] = useState(null)

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
    const convertirBase64 = (archivos) => {
        Array.from(archivos).forEach((archivo) => {
          const reader = new FileReader();
          reader.readAsDataURL(archivo);
          reader.onload = () => {
            let fileBase64 = [];
            const base64 = reader.result;
            // console.log(base64);
            fileBase64 = base64.split(",");
            // console.log(fileBase64[1]);
            setLoading2(true)
            axios
              .post(
                // "https://753e-108-175-15-104.ngrok.io/api/location/uploadExcel",
                "http://108.175.15.104:8080/api/location/uploadExcel",
                // "https://cors-anywhere.herokuapp.com/http://108.175.15.104:8080/api/location/uploadExcel",
                {
                  base64: fileBase64[1],
                },
                {
                  headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                try {
                    APIs.getAllCities().then((data) => {
                      setDatas(data.resultset.map((e) => {
                        return {
                          ...e,
                          //active_visibility_desc: e.location.isCedis == true ? "SI" : "NO"
                        }
                      }))
                      console.log("datas",datas);
                      setLoading2(false)
                    })
              
                  } catch (error) {
                    console.log(error)
                  }
              })
              .catch((err) => 
              console.log("Error en cargar archivo: ", err));
          };
        });
      };

      const actualizarConBase64 = (archivos) => {

        Array.from(archivos).forEach((archivo) => {
          const reader = new FileReader();
          reader.readAsDataURL(archivo);
          reader.onload = () => {
            let fileBase64 = [];
            const base64 = reader.result;
            // console.log(base64);
            fileBase64 = base64.split(",");
            // console.log(fileBase64[1]);
        setLoading3(true)
            axios
            .post(
                // "https://753e-108-175-15-104.ngrok.io/api/location/uploadExcel",
                "http://108.175.15.104:8080/api/location/uploadExcel",
                // "https://cors-anywhere.herokuapp.com/http://108.175.15.104:8080/api/location/uploadExcel",
                {
                  base64: fileBase64[1],
                },
                {
                  headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                try {
                    APIs.getAllCities().then((data) => {
                      setDatas(data.resultset.map((e) => {
                        return {
                          ...e,
                          //active_visibility_desc: e.location.isCedis == true ? "SI" : "NO"
                        }
                      }))
                      console.log("datas",datas);
                      setLoading3(false)
                    })
              
                  } catch (error) {
                    console.log(error)
                  }
              })
              .catch((err) => 
              console.log("Error en cargar archivo: ", err));
          };
        });
      };
    
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    const onCountryChange = (e) => {
        setSelectedCountry(e.value);
        console.log("testcountry", e.value);
    }
    const onCountryChange2 = (e) => {
        setSelectedCountry2(e.value);
        console.log("testcountry", e.value);
    }
    const onCountryChange3 = (e) => {
        setSelectedCountry3(e.value);
        console.log("testcountry", e.value);
    }
    const onCountryChange4 = (e) => {
        setSelectedCountry4(e.value);
        console.log("testcountry", e.value);
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
                <Button label="Nueva Ubicacion" icon="pi pi-plus"  onClick={openNew} style={{backgroundColor:'#202c52', color:'white',borderColor: 'rgba(0,0,0,0)'}}/>
                {/* <Button style={{marginLeft:2}} label="Eliminar Pais" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}  /> */}
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar Archivo"  style={{marginRight:2}} onUpload={importCSV} /> */}
                <Button style={{ background: "#e8580e", color: "white",borderColor: 'rgba(0,0,0,0)',marginRight:2, width:150, height:36 }} 
                loading={loading2} loadingOptions={{ position: 'right' }} 
                htmlFor="xml_file_upload">
                    <label htmlFor="xml_file_upload" style={{ cursor: "pointer" }}>
                    Carga Masiva Alta
                    </label>
                </Button>
                <input
                    type="file"
                    name="xml_file_upload"
                    id="xml_file_upload"
                    accept=".xls, .xlsx"
                    style={{ display: "none" }}
                    onChange={(e) => convertirBase64(e.target.files)}
                />
                
                <Button style={{ background: "#e8580e", color: "white",borderColor: 'rgba(0,0,0,0)',marginRight:2, width:160, height:36 }} 
                loading={loading3} loadingOptions={{ position: 'right' }} 
                htmlFor="update_file_upload">
                    <label htmlFor="update_file_upload" style={{ cursor: "pointer" }}>
                    Carga Masiva Edición
                    </label>
                </Button>
                <input
                    type="file"
                    name="update_file_upload"
                    id="update_file_upload"
                    accept=".xls, .xlsx"
                    style={{ display: "none" }}
                    onChange={(e) => actualizarConBase64(e.target.files)}
                />
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
            <h5 className="mx-0 my-1">Administrar Ubicaciones Masivas</h5>
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
                    dataKey="customerLocationId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" scrollable 
                    currentPageReportTemplate="Mostrar {first} de {totalRecords} usuarios"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column body={actionBodyTemplate}  header="Acciones" exportable={false} style={{ minWidth: '2rem' }}></Column>
                    <Column field="customer.customerBase" header="Base" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="customer.customerName" header="Cliente" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.locationCode" header="ID" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.locationName" header="Nombre" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.city.state.stateName" header="Estado" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.city.cityName" header="Ciudad" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.city.state.stateCode" header="Codigo" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.locationLatitude" header="Latitud" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.locationLongitude" header="Longitud" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.zone1" header="Zona 1" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.zone2" header="Zona 2" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.zone3" header="Zona 3" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.zone4" header="Zona 4" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.timeZone.timeZoneName" header="Zona horaria" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.description" header="Descripcion" filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.corporation" header="Corporacion" filter filterPlaceholder="Buscar por correo" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                    <Column field="location.ownerType" header="Tipo de dueño" filter filterPlaceholder="Buscar por distribucion" filterMatchMode="contains"  style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '1000px' }} header="Detalles de la ubicacion" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div style={{width:'100%',background:'red', flexDirection:'row',alignItems:'center', display:'flex', justifyContent:'center'}}>
                <div style={{width:'30%',background:'yellow', marginRight:4 }}>
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
                        onChange={e => setValue2(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value2 })} />
                    {submitted && !value2 && <small className="p-error">Cliente es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">ID Ubicacion </label>
                    <InputText
                        value={value3}
                        onChange={e => setValue3(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value3 })} />
                    {submitted && !value3 && <small className="p-error">ID es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Nombre de la ubicacion </label>
                    <InputText
                        value={value4}
                        onChange={e => setValue4(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value4 })} />
                    {submitted && !value4 && <small className="p-error">Nombre es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Estado, Provincia o Departamento </label>
                    <Dropdown value={selectedCountry} options={datas} onChange={onCountryChange} required autoFocus optionLabel="countryName" filter showClear filterBy="countryName" placeholder="Selecciona un pais" id="countryId"
                    className={classNames({ 'p-invalid': submitted && !selectedCountry })}/>
                    {submitted && !selectedCountry && <small className="p-error">Estado es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Ciudad</label>
                    <Dropdown value={selectedCountry2} options={datas} onChange={onCountryChange2} required autoFocus optionLabel="countryName" filter showClear filterBy="countryName" placeholder="Selecciona un pais" id="countryId"
                    className={classNames({ 'p-invalid': submitted && !selectedCountry2 })}/>
                    {submitted && !selectedCountry2 && <small className="p-error">Ciudad es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Codigo de la provincia </label>
                    <Dropdown value={selectedCountry3} options={datas} onChange={onCountryChange3} required autoFocus optionLabel="countryName" filter showClear filterBy="countryName" placeholder="Selecciona un pais" id="countryId"
                    className={classNames({ 'p-invalid': submitted && !selectedCountry3 })}/>
                    {submitted && !selectedCountry3 && <small className="p-error">codigo es obligatorio.</small>}
                </div>
                </div>
                <div style={{width:'30%',background:'yellow' }}>
                <div className="field">
                    <label htmlFor="Base">Latitud</label>
                    <InputText
                        value={value5}
                        onChange={e => setValue5(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value5 })} />
                    {submitted && !value5 && <small className="p-error">Latitud es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Longitud </label>
                    <InputText
                        value={value6}
                        onChange={e => setValue6(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value6 })} />
                    {submitted && !value6 && <small className="p-error">Longitud es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Zona1 </label>
                    <InputText
                        value={value7}
                        onChange={e => setValue7(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value7 })} />
                    {submitted && !value7 && <small className="p-error">Zona 1 es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Zona2 </label>
                    <InputText
                        value={value8}
                        onChange={e => setValue8(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value8 })} />
                    {submitted && !value8 && <small className="p-error">Zona 2 es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Zona3 </label>
                    <InputText
                        value={value9}
                        onChange={e => setValue9(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value9 })} />
                    {submitted && !value9 && <small className="p-error">Zona 3 es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Zona4 </label>
                    <InputText
                        value={value10}
                        onChange={e => setValue10(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !value10 })} />
                    {submitted && !value10 && <small className="p-error">Zona 4 es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Base">Zona horaria</label>
                    <Dropdown value={selectedCountry4} options={datas} onChange={onCountryChange4} required autoFocus optionLabel="countryName" filter showClear filterBy="countryName" placeholder="Selecciona un pais" id="countryId"
                    className={classNames({ 'p-invalid': submitted && !selectedCountry4 })}/>
                    {submitted && !selectedCountry4 && <small className="p-error">Zona es obligatorio.</small>}
                </div>
                </div>
                <div style={{width:'30%',background:'yellow' }}>
                    <h1>test</h1>
                </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span> Deseas eliminar la siguiente ubicacion <b>{product.userName}</b>?</span>}
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
                
