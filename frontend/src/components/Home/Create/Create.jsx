import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import './Create.css'
import api from '../../../services/axios.js'

export default function Home () {
    const [erro, setErro] = useState('')
    const inputName = useRef()
    const inputPassword = useRef()

    async function createUsers() {
        setErro('')
        try {
            await api.post('/home/create', {
                name: inputName.current.value,
                password: inputPassword.current.value
            })
        } catch (error) {
            setErro(error.response.data.msg)
        }
    }
    
    return (
        <div className="container">
            <form className='form-create'>
                <h1>Criar usuário</h1>
                <input type="text" name="Nome" placeholder='Digite seu nome...' ref={inputName}/><br />
                <input type="password" name="Senha" placeholder='Digite sua senha...'ref={inputPassword}/><br />                
                <Link to="/home/login">Voltar para o login</Link><br />
                <button type="button" onClick={createUsers}>Cadastrar</button><br />
            </form>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
            
        </div>
    );
}
