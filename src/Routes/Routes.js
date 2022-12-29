import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from "../screens/Login"
import Dashboard from "../screens/dashboard/Dashboard";
import Paises from "../screens/subCatalogos/paises/Paises"
import Contactos from '../screens/subCatalogos/usuarios/Usuarios';
import Ciudades from '../screens/subCatalogos/ciudades/Ciudades'
import Clientes from '../screens/subCatalogos/clientes/Clientes'
import Estados from '../screens/subCatalogos/estados/Estados'
import Impuestos from '../screens/subCatalogos/impuestos/Impuestos'
import Ubicaciones from '../screens/subCatalogos/ubicaciones/Ubicaciones'
import ZonasH from '../screens/subCatalogos/zonashorarias/Zonah'
import UbicacionesM from '../screens/ubicaciones/ubicaciones';

function App() {
    return (
      
    <Router>
         <Switch>
        <Route exact path='/'> <Login /> </Route>
        <Dashboard>
        <Route exact path='/paises'> <Paises/> </Route>
        <Route exact path='/estados'> <Estados/> </Route>
        <Route exact path='/ciudades'> <Ciudades/> </Route>
        <Route exact path='/impuestos'> <Impuestos/> </Route>
        <Route exact path='/ubicaciones'> <Ubicaciones/> </Route>
        <Route exact path='/clientes'> <Clientes/> </Route>
        <Route exact path='/zonasH'> <ZonasH/> </Route>
        <Route exact path='/usuarios'> <Contactos/> </Route>
        <Route exact path='/ubicacionesm'> <UbicacionesM/> </Route>
        </Dashboard>
        </Switch>
    </Router>
    
    );
  }
  
  export default App;