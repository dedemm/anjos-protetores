import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import './Cadastro.css';
import logo from '../../assets/logo.png';

const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        // Lógica de cadastro aqui
        alert(`Nome: ${nome}\nE-mail: ${email}\nSenha: ${senha}`);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                            <div className="logo">
                                <img src={logo} alt="Logo" />
                            </div>
                <h1>Anjos Protetores de Animais - Cadastro</h1>


                <div className='input-field'>
                    <input
                        type="nome"
                        placeholder="Nome completo"
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>

                <div className='input-field'>
                    <input
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaEnvelope className='icon' />
                </div>

                <div className='input-field'>
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                <div className='input-field'>
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                <button>Cadastrar</button>

                <div className="login-link">
                    <p>Já tem uma conta? <a href="/login">Entrar</a></p>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
