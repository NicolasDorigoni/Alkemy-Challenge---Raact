import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

function Resultados() {

  

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
    
    
    const [moviesResults, setmoviesResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=d378df32b96ec1e6d8ef29659cbe685d&language=es-ES&query=${keyword}`;

        axios.get(endPoint).then(response => {
                const moviesArray = response.data.results

                if(moviesArray.length === 0) {
                    swAlert(<h5>Tu busqueda no arrojo resultados</h5>)
                }
                setmoviesResults(moviesArray);
              
            })
            .catch(error => {
                console.log(error);
            })

    }, [keyword]); //si pongo el keyword no se me actualiza entre busqeuda y busqyeda, pero si no encuentra la peli se sigue renderizando y no me deja salir de la pagina 

    return (
        <>
        <h2>Buscaste: <em>{keyword}</em></h2>

        {moviesResults.length === 0 && <h3>No hay resultados</h3>}
        
        <div className='row'>
                {
                    moviesResults.map((oneMovie, idx) => {
                        return (
                            <div className='col-4' key={idx}>
                                <div className="card my-4" >
                                    <img src={ `https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}` } className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title}</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }


            </div>
        </>
    )
}

export default Resultados;