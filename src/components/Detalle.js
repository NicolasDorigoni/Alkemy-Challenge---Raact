import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Detalle() {

    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    console.log(movieID);

    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=d378df32b96ec1e6d8ef29659cbe685d&language=es-ES`

        axios.get(endPoint).then(response => {
                const movieData = response.data
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error);
            })

    }, [movieID]);

    return (

        <>
            {!token && <Navigate to='/'></Navigate>}
            {!movie && <p>Cargando...</p>}
            {movie &&
                <>
                    <h2>Titulo: {movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movieposter" />
                        </div>
                        <div className='col-8'>
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Resena: </h5>
                            <p>{movie.overview}</p>
                            <h5>Rating: {movie.vote_average} </h5>
                            <h5>Genero:</h5>
                            <ul>
                                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
};

export default Detalle;