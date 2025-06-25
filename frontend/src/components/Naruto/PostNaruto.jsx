import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/axios.js'
import './PostNaruto.css'

export default function PostNaruto () {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const name = useRef()
    const jutsu = useRef()
    const village = useRef()

    async function createNaruto() {
        setErro('')
        try {
            const token = localStorage.getItem('token')
            await api.post('/naruto/create', {
                name: name.current.value,
                jutsu: jutsu.current.value,
                village: village.current.value,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setSucesso("Dados inseridos com sucesso!")
            setErro('')
        } catch (error) {
            setSucesso('')
            setErro(error.response.data.msg)
        }
    }

    return (
        <div className="naruto">
            <h1>Cadastro - Personagens</h1>
            <form className='form-naruto'>
                <h3>Adicione os dados</h3>
                <input type="text" placeholder='Escreva o nome...' required ref={name}/><br />
                <input type="text" placeholder='Escreva o jutsu...' required ref={jutsu}/><br />
                <input type="text" placeholder='Escreva a vila...' required ref={village}/><br />

                <button type="button" onClick={(createNaruto)}>Criar</button><br />
                <Link to={`/naruto/data/${name}`} className='link-search'>
                    Buscar
                </Link><br /><br />
                <Link to="/">Voltar para a página inicial</Link><br />

                {erro && <p style={{color: 'red', fontSize: '25px'}}>❌{erro}</p>}
                {sucesso && <p style={{color: 'green', fontSize: '25px'}}>✅{sucesso}</p>}
            </form>
        </div>
    )
}