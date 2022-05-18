import {Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Listado from './components/Listado';

function App() {
  return (
    <>
   <Login></Login>
   <Listado></Listado>
   </>
  );
}

export default App;
