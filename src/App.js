//Libraries
import { Routes, Route } from 'react-router-dom';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
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
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;