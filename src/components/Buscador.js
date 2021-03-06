import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

function Buscador() {
    const history = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            swAlert(<h5>Tienes que escribir una palabra clave</h5>)
        } else if (keyword.length < 4) {
            swAlert(<h5>Tienes que escribir mas de 4 caracteres</h5>)
        } else {
            e.currentTarget.keyword.value = '';
            history(`/resultados?keyword=${keyword}`);
        }
    }

    return (
        <form className="d-flex aling-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Escribe una palabra clave..."></input>
            </label>
            <button type="submit" className="btn btn-success">Buscar</button>

        </form>
    )
}

export default Buscador;