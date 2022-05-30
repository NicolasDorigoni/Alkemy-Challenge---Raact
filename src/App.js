//Libraries
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './css/bootstrap.min.css';
import './css/app.css';


function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');

      if (favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
      }

  }, [])

  //capturo la info cuando clickeo en el boton favoritos
  const addOrRemoveFromFavs = e => {

    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      title, imgURL, overview,
      id: btn.dataset.movieId
    }

    let moviesIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    //mecanismo para que ingrese una sola vez a la peli
    if (!moviesIsInArray) {
      //inserto en este array la info capturada anteriormente
      tempMoviesInFavs.push(movieData);
      //con esa info vuelvo y piso el localStorage
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log('Se agrego la pelicula');
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('Se elimino la pelicula');
    }


  }

  return (
    <>
      <Header favorites={favorites}></Header>
      <div className='container'>

        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/listado' element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}></Listado>}></Route>
          {/* no me funciona ya que esta hecha con la version vieja, investigar useParams, supuestamente se soluciona con eso */}
          <Route path='/detalle' element={<Detalle></Detalle>}></Route>
          <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs}></Favoritos>}></Route>
          <Route path='/resultados' element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}></Resultados>}></Route>
        </Routes>

      </div>
      <Footer></Footer>
    </>
  );
}



export default App;