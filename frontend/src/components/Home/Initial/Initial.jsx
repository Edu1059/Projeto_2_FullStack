import { Link } from 'react-router-dom'
import './Initial.css'

export default function Initial () {
    return (
        <div className="home">
            <div className="title">
                <h1>Bem-vindo ao Naruto API</h1>
            </div>
            <div className="links">
                <button id='button-login'>
                    <Link to="/home/login" style={{ 
                        textDecoration: 'none',
                        color: '#000000' 
                    }}>Fazer login</Link><br />
                </button>
                <button id='button-create'>
                    <Link to="/home/create" style={{ 
                        textDecoration: 'none',
                        color: '#000000' 
                    }}>Criar usuário</Link>
                </button>
            </div>
        </div>
    )
}