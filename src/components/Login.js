import axios from 'axios';
import swAlert from '@sweetalert/with-react';


function Login () {
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
                localStorage.setItem('token', tokenRecibido);
            })

    }



    return (
        <>
            <h2>Formulario de login</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo electronico:</span> <br />
                    <input type="text" name="email"></input>
                </label>
                <br />
                <label>
                    <span>Contrasena:</span> <br />
                    <input type="password" name="password"></input>
                </label>
                <br />
                <button type="submit">Ingresar</button>
            </form>
        </>
    )
}

export default Login;