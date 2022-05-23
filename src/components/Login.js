import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate, Navigate } from 'react-router-dom';


function Login() {

    const history = useNavigate();
    // console.log(history)

    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        // console.log(regexEmail.test(email));

        if (email === '' || password === '') {

            swAlert(<h2>Los campos no pueden estar vacios</h2>);
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            swAlert(<h2>Debes ingresar una direccion de correo electronico valida</h2>);

            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(<h2>Credenciales invalidas</h2>);
            return;
        }

        console.log('ok estamos listos para enviar la informacion');
        axios.post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(<h2>Perfecto, has ingresado</h2>);
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                history('/listado');
            })

    }

    let token = sessionStorage.getItem('token');

    return (
        <>
            {token && <Navigate to='/listado' />}

            <div className='row'>
                <div className='col-6 offset-3'>
                    <h2>Formulario de login</h2>
                    <form onSubmit={submitHandler}>
                        <label class="form-label d-block mt-2">
                            <span>Correo electronico:</span> <br />
                            <input class="form-control" type="text" name="email"></input>
                        </label>

                        <label class="form-label d-block mt-2">
                            <span>Contrasena:</span> <br />
                            <input class="form-control" type="password" name="password"></input>
                        </label>
                        <button type="submit" class="btn btn-outline-success">Ingresar</button>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;