//Libraries
import { Routes, Route } from 'react-router-dom';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './css/bootstrap.min.css';


function App() {
  return (
    <div className='container'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/listado' element={<Listado></Listado>}></Route>
        <Route path='/detalle' element={<Detalle></Detalle>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;