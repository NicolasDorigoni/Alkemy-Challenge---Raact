import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swAlert from '@sweetalert/with-react';

function Listado() {

    let token = sessionStorage.getItem('token');

    // console.log(props);

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=d378df32b96ec1e6d8ef29659cbe685d&language=es-ES&page=1'
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data
                setMoviesList(apiData.results);
            })
            .catch(error =>{
                swAlert(<h2>Hubo errores, intenta mas tarde</h2>);
            })
    }, [setMoviesList]);

    console.log(moviesList);

    return (
        <>
            {!token && <Navigate to='/'></Navigate>}

            <div className='row'>
                {
                    moviesList.map((oneMovie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card my-4" >
                                    <img src={ `https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}` } className="card-img-top" alt="..." />
                                    <button className='favourite-btn'>
                                    🖤
                                    </button>
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

export default Listado;