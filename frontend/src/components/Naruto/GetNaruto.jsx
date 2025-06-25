import { useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/axios.js'
import './GetNaruto.css'

export default function GetNaruto() {

    const [name, setName] = useState('')
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    
    async function getNaruto() {
        setErro('')
        try {
            const token = localStorage.getItem('token')
            const result = await api.get(`/naruto/data/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log(result.data)
            setSucesso(result.data)
            
        } catch (error) {
            setSucesso('')
            console.log(error)
            setErro(error.response.data.msg)
        }
    }

    return (
        <div className="form-get">
            <h1>Busca de dados</h1>
            <input type="text" placeholder='Pesquise pelo nome...' value={name} onChange={e => setName(e.target.value)}/>
            <button type='button' onClick={getNaruto}>Pesquisar</button><br />
            {erro && <p>{erro}</p>}

            {sucesso && (
                <div className="resultado">
                    <h3>Nome: {sucesso.msg.name}</h3>
                    <p>Categoria: {sucesso.msg.category}</p>
                </div>
            )}
            
            <Link to="/naruto/create">Voltar para o cadastro</Link><br />
            <Link to="/">Voltar para a página inicial</Link>


        </div>
    )
}