import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaw } from 'react-icons/fa';
import './Adocao.css';
import Navbar from '../Navbar/Navbar';
// 1. Importe o 'useNavigate' para poder redirecionar
import { useNavigate } from 'react-router-dom';

const Adocao = () => {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // 2. Crie uma instância do 'navigate'
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchAnimais = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get('http://localhost:8080/api/pub/animals', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("Animais recebidos:", response.data);

                setAnimais(response.data);

            } catch (err) {
                console.error("Erro ao buscar animais:", err);

                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    setError("Sua sessão expirou. Por favor, faça login novamente.");
                    localStorage.removeItem('token');

                    setTimeout(() => navigate('/login'), 2000);

                } else {
                    setError("Não foi possível carregar a lista de animais. Tente novamente mais tarde.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAnimais();

        // 8. Adicione 'navigate' ao array de dependências
    }, [navigate]);

    if (loading) {
        return (
            <div className="listagem-container">
                <p className="loading-message">Carregando animais...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="listagem-container">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <>
            < Navbar />
            <div className="default-container padding-container">
                <div className="listagem-container">
                    <header className="listagem-header">
                        <h1><FaPaw /> Encontre seu novo amigo!</h1>
                        <p>Estes são os animais que esperam por um lar.</p>
                    </header>

                    <div className="animais-grid">
                        {animais.length === 0 ? (
                            <p>Nenhum animal disponível para adoção no momento.</p>
                        ) : (
                            animais.map(animal => (
                                <div className="animal-card" key={animal.id}>
                                    <img
                                        src={animal.fotoUrl || 'https://premierpet.com.br/wp-content/uploads/2025/04/model-banner-dicasprimeirocachorro-mobile-v1.png'}
                                        alt={animal.nome}
                                        className="animal-foto"
                                    />
                                    <div className="animal-info">
                                        <h3>{animal.nome}</h3>
                                        <p><strong>Espécie:</strong> {animal.specie.name || 'Não informada'}</p>
                                        <p><strong>Raça:</strong> {animal.race?.name || 'Não informada'}</p>
                                        <p className="animal-descricao">{animal.description || 'Um amiguinho muito especial!'}</p>
                                        <button className="btn-adotar">Quero Adotar</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Adocao;