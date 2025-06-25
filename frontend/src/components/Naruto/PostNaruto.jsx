import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/axios.js'
import './PostNaruto.css'

export default function PostNaruto () {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const name = useRef()
    const category = useRef()

    async function createNaruto() {
        setErro('')
        try {
            const token = localStorage.getItem('token')
            await api.post('/naruto/create', {
                name: name.current.value,
                category: category.current.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setSucesso("Dado inserido com sucesso!")
            setErro('')
        } catch (error) {
            setSucesso('')
            setErro(error.response.data.msg)
        }
    }

    return (
        <div className="naruto">
            <h1>Cadastro</h1>
            <form className='form-naruto'>
                <h3>Adicione novos dados</h3>
                <input type="text" placeholder='Escreva o nome...' required ref={name}/><br />
                <input type="text" placeholder='Escreva a categoria...' required ref={category}/><br />

                <button type="button" onClick={(createNaruto)}>Criar</button><br />
                <Link to={`/naruto/data/${name}`} className='link-search'>
                    Buscar dados
                </Link><br /><br />
                <Link to="/">Voltar para a página inicial</Link><br />

                {erro && <p style={{color: 'red', fontSize: '25px'}}>❌{erro}</p>}
                {sucesso && <p style={{color: 'green', fontSize: '25px'}}>✅{sucesso}</p>}
            </form>
        </div>
    )
}