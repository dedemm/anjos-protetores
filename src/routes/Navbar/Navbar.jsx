import React, { useState, useEffect } from 'react'; // 1. IMPORTE O 'useState'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // 2. CRIE UM ESTADO PARA CONTROLAR O LOGIN
    //    (Estou assumindo que o token se chama 'authToken' no localStorage)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const navigate = useNavigate();

    // Efeito de scroll (seu código original, está perfeito)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- 3. CRIE NOVAS FUNÇÕES DE CLIQUE ---

    // Função para o botão de Login
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Função para o botão de Adoção
    const handleAdoptClick = () => {
        navigate('/adocao');
    };

    // Função para o botão de Perfil
    const handleProfileClick = () => {
        navigate('/perfil'); // Mude '/perfil' se sua rota for outra
    };

    // Função para o botão de Logout
    const handleLogoutClick = () => {
        localStorage.removeItem('token'); // Remove o token
        setIsLoggedIn(false); // Atualiza o estado
        navigate('/'); // Redireciona para a Home
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">
                        <h2>Anjos Protetores</h2>
                    </Link>
                </div>
                <ul className="nav-menu">
                    {/* ... (Seus links do nav-menu estão perfeitos) ... */}
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Início</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#about" className="nav-link">Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#dogs" className="nav-link">Cachorros</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#process" className="nav-link">Processo</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contact" className="nav-link">Contato</Link>
                    </li>
                </ul>

                {/* --- 4. RENDERIZAÇÃO CONDICIONAL DOS BOTÕES --- */}
                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <>
                            <button className="profile-btn" onClick={handleProfileClick}>
                                Ver Perfil
                            </button>
                            <button className="logout-btn" onClick={handleLogoutClick}>
                                Sair
                            </button>
                        </>
                    ) : (
                        // Se ESTIVER DESLOGADO
                        <button className="login-btn" onClick={handleLoginClick}>
                            Login
                        </button>
                    )}

                    {/* O botão "Quero Adotar" aparece em ambos os casos */}
                    <button className="adopt-btn" onClick={handleAdoptClick}>
                        Quero Adotar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;