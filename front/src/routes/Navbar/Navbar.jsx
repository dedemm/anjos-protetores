import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // <--- 1. ADICIONE useLocation
import { isAdmin, logout } from '../../services/auth';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userIsAdmin, setUserIsAdmin] = useState(isAdmin());

    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.replace('#', '');
            const element = document.getElementById(targetId);

            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                setTimeout(() => {
                    const elementLate = document.getElementById(targetId);
                    if (elementLate) {
                        elementLate.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else if (location.pathname === '/') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]); 


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

    const handleLoginClick = () => navigate('/login');
    const handleAdoptClick = () => navigate('/adocao');
    const handleProfileClick = () => navigate('/perfil');
    const handleAdminClick = () => navigate('/admin');
    const handleLogoutClick = () => {
        logout();
        setIsLoggedIn(false);
        setUserIsAdmin(false);
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

                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <>
                            {userIsAdmin && (
                                <button className="admin-btn" onClick={handleAdminClick}>
                                    Admin
                                </button>
                            )}
                            <button className="profile-btn" onClick={handleProfileClick}>
                                Ver Perfil
                            </button>
                            <button className="logout-btn" onClick={handleLogoutClick}>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={handleLoginClick}>
                            Login
                        </button>
                    )}
                    <button className="adopt-btn" onClick={handleAdoptClick}>
                        Quero Adotar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;