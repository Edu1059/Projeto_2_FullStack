import { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import './Login.css'
import api from '../../../services/axios.js'

export default function Login () {
    const [erro, setErro] = useState('')
    const inputName = useRef()
    const inputPassword = useRef()

    async function inputLogin() {
        setErro('')
        try {
            const login = await api.post('/home/login', {
                name: inputName.current.value,
                password: inputPassword.current.value,
            })

            localStorage.setItem('token', login.data.token)
            console.log(login.data.token)
        } catch (error) {
            setErro(error.response.data.msg)
        }
    }

    return (
        <div className="container-login">
            <form className='form-login'>
                <h1>Login</h1>
                <input type="text" name="Nome" placeholder='Digite seu nome...' ref={inputName}/><br />
                <input type="password" name="Senha" placeholder='Digite sua senha...'ref={inputPassword}/><br />
                <Link to="/home/create">Não tem cadastro ?</Link><br />
                {erro && <p style={{color: 'red'}}>{erro}</p>}
                <button type="button" onClick={inputLogin}>Entrar</button>
            </form>
        </div>
    )
}