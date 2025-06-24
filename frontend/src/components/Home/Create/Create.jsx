import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import './Create.css'
import api from '../../../services/axios.js'

export default function Home () {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const inputName = useRef()
    const inputPassword = useRef()

    async function createUsers() {
        setErro('')
        try {
            await api.post('/home/create', {
                name: inputName.current.value,
                password: inputPassword.current.value
            })
            setSucesso("Usuário criado com sucesso!")
            setErro('')
        } catch (error) {
            setSucesso('')
            setErro(error.response.data.msg)
        }
    }
    
    return (
        <div className="container">
            <form className='form-create'>
                <h1>Cadastrar</h1>
                <input type="text" name="Nome" placeholder='Digite seu nome...' ref={inputName}/><br />
                <input type="password" name="Senha" placeholder='Digite sua senha...'ref={inputPassword}/><br />                
               
                <Link to="/home/login">Já tem uma conta ? Faça o Login</Link><br />

                <button type="button" onClick={createUsers}>Cadastrar</button><br />

                <Link to="/">Voltar para a página inicial</Link>

                {erro && <p style={{color: 'red', fontWeight: 'bold', margin: '10px 0 0 0'}}>{erro}</p>}
                {sucesso && <p style={{color: 'green', fontWeight: 'bold', margin: '10px 0 0 0'}}>{sucesso}</p>}
            </form>
        </div>
    );
}
