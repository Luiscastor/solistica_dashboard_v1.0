import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { Dropdown } from 'primereact/dropdown';
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
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import  APIs from './Requests/APIs'
import '../index.css'
import '../styles.css'



export default function Estados ()  {

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    const [datas, setDatas] = useState();
    const [datas2, setDatas2] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [cargar, setCargar]= useState(false)
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [pais, setPais] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [deleteCountry, setDeleteCountry] = useState(null)
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
    const [detalle, setDetalle] = useState(null);


    useEffect(() => {
      try {
        APIs.getAllStates().then((data) => {
          setDatas2(data.resultset)
         
        })
  
      } catch (error) {
        console.log(error)
      }
      try {
        APIs.getAllPaises().then((data) => {
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
  
    }, [loading])

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // }

    const openNew = () => {
        setSubmitted(false);
        setDetalle(true)
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPais("");
        setAbreviacion("");
        setSelectedCountry(null)
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const onCountryChange = (e) => {
        setSelectedCountry(e.value);
        console.log("testcountry", e.value);
    }

    const saveProduct = () => {
        setSubmitted(true);
        const newCountry ={
            country: selectedCountry,
            stateCode: abreviacion,
            stateName: pais,
            enabled: true
          };
            try{
               APIs.postCountry(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Estado Creado', life: 3000 });
                setTimeout(() => {
                        setProductDialog(false);
                        setCargar(false)
                        try {
                            APIs.getAllStates().then((data) => {
                              setDatas2(data.resultset.map((e) => {
                                return {
                                  ...e,
                                 // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
                                }
                              }))
                              setLoading(false)
                              setPais("")
                              setAbreviacion("")
                              setSelectedCountry(null)
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
            country: selectedCountry,
            stateId: paisId,
            stateCode: abreviacion,
            stateName: pais,
            enabled: true
          };
            try{
               APIs.putCountry(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Estado Editado', life: 3000 });
                setTimeout(() => {
                        setProductDialog(false);
                        setCargar(false)
                        try {
                            APIs.getAllStates().then((data) => {
                              setDatas2(data.resultset.map((e) => {
                                return {
                                  ...e,
                                 // active_visibility_desc: e.active_visibility == true ? "SI" : "NO"
                                }
                              }))
                              setLoading(false)
                              setPais("")
                              setAbreviacion("")
                              setSelectedCountry(null)
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
        setDetalle(false)
        setPais(product.stateName)
        setAbreviacion(product.stateCode)
        setPaisId(product.stateId)
        setSelectedCountry(product.country.countryId)
        console.log("test",product.country);
        setEdit(true)
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteCountry(product.country)
        setPaisId(product.stateId)
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        const newCountry ={
            stateId: paisId,
            enabled: true
          };
            try{
               APIs.deleteCountry(newCountry)
              .then((res)=>{
                if(res.codigo == 200){
                    setCargar(true)
                    toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: 'Estado Eliminado', life: 3000 });
                setTimeout(() => {
                    setCargar(false)
                    setDeleteProductDialog(false);
                        try {
                            APIs.getAllStates().then((data) => {
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
                <Button label="Nuevo Estado" icon="pi pi-plus"  onClick={openNew} style={{backgroundColor:'#202c52', color:'white',borderColor: 'rgba(0,0,0,0)'}}/>
                {/* <Button style={{marginLeft:2}} label="Eliminar Pais" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}  /> */}
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Importar Archivo"  style={{marginRight:2}} onUpload={importCSV} /> */}
                <Button label="Exportar Archivo" icon="pi pi-upload"  onClick={exportCSV} style={{backgroundColor:'#e8580e', color:'white',borderColor: 'rgba(0,0,0,0)'}} />
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
            <h5 className="mx-0 my-1">Administrar Estados</h5>
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
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4 mt-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={datas2} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="stateId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrar {first} de {totalRecords} estados"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column body={actionBodyTemplate}  header="Acciones" exportable={false} style={{ minWidth: '2rem' }}></Column>
                    <Column field="stateName" header="Estado" filter filterPlaceholder="Buscar por estado" filterMatchMode="contains" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="stateCode" header="Codigo" filter filterPlaceholder="Buscar por codigo" filterMatchMode="contains" sortable style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header={detalle ? "Nuevo Estado" : "Editar Estado"} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="Pais">Pais - Ejemplo: Mexico</label>
                    <Dropdown value={selectedCountry} options={datas} onChange={onCountryChange} required autoFocus optionLabel="countryName" filter showClear filterBy="countryName" placeholder="Selecciona un pais" id="countryId"
                    className={classNames({ 'p-invalid': submitted && !selectedCountry })}/>
                    
                    {submitted && !selectedCountry && <small className="p-error">Pais es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Pais">Estado - Ejemplo: Nuevo Leon</label>
                    <InputText
                        value={pais}
                        onChange={e => setPais(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !pais })} />
                    {submitted && !pais && <small className="p-error">Estado es obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Pais">Abreviación - Ejemplo: NL</label> 
                    <InputText
                        value={abreviacion}
                        onChange={e => setAbreviacion(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !abreviacion })} />
                    {submitted && !abreviacion && <small className="p-error">Abreviacion es obligatorio.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span> Deseas eliminar el siguiente estado <b>{product.stateName}</b>?</span>}
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
                
