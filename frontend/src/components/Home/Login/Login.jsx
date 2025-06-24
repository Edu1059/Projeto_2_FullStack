import { useRef, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import api from '../../../services/axios.js'

export default function Login () {
    const [erro, setErro] = useState('')
    const inputName = useRef()
    const inputPassword = useRef()
    const navigate = useNavigate()

    async function inputLogin() {
        setErro('')
        try {
            const login = await api.post('/home/login', {
                name: inputName.current.value,
                password: inputPassword.current.value,
            })

            localStorage.setItem('token', login.data.token)
            console.log(login.data.token)

            navigate('/naruto/create')
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

                <Link to="/home/create">Não tem uma conta ? Cadastre-se</Link><br />

                {erro && <p style={{color: 'red'}}>{erro}</p>}
                <button type="button" onClick={inputLogin}>Entrar</button><br />
                
                <Link to="/">Voltar para a página inicial</Link><br />
            </form>
        </div>
    )
}