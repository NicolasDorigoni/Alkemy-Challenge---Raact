//Libraries
import { Routes, Route, useParams } from 'react-router-dom';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './css/bootstrap.min.css';
import './css/app.css';


function App() {

  const addOrRemoveFromFavs = () => {
    console.log('ok funciono');
  }

  return (
    <>
      <Header></Header>
      <div className='container'>

        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/listado' render={({props}) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props}></Listado>}></Route> 
          {/* no me funciona ya que esta hecha con la version vieja, investigar useParams, supuestamente se soluciona con eso */}
          <Route path='/detalle' element={<Detalle></Detalle>}></Route>
          <Route path='/resultados' element={<Resultados></Resultados>}></Route>
        </Routes>

      </div>
      <Footer></Footer>
    </>
  );
}



export default App;