import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../services/auth';
import SpeciesManager from './SpeciesManager';
import RacesManager from './RacesManager';
import AnimalsManager from './AnimalsManager';
import AdoptionsManager from './AdoptionsManager';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('animais');

    // Proteção da Rota: Se não for Admin, manda para a Home
    useEffect(() => {
        if (!isAdmin()) {
            alert("Acesso negado. Apenas administradores.");
            navigate('/');
        }
    }, [navigate]);

    // Função para renderizar o conteúdo baseado na aba escolhida
    const renderContent = () => {
        switch(activeTab) {
            case 'animais':
                return <AnimalsManager />;
            case 'especies':
               return <SpeciesManager />;
            case 'racas':
               return <RacesManager />;
            case 'adocoes':
                return <AdoptionsManager />;
            default:
                return <div>Selecione uma opção</div>;
        }
    };

    // Se não for admin, retorna null para não piscar a tela antes do redirect
    if (!isAdmin()) return null;

    return (
        <div className="admin-container">
            <div className="admin-header">
            <div>
                <h1>Painel Administrativo</h1>
                <p>Bem-vindo, Administrador.</p>
            </div>

            <button className="admin-back-button" onClick={() => navigate('/')}>
                ← Voltar
            </button>
            </div>

            {/* Menu de Abas */}
            <div className="admin-tabs">
                <button 
                    className={`tab-button ${activeTab === 'animais' ? 'active' : ''}`}
                    onClick={() => setActiveTab('animais')}
                >
                    Animais
                </button>
                <button 
                    className={`tab-button ${activeTab === 'especies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('especies')}
                >
                    Espécies
                </button>
                <button 
                    className={`tab-button ${activeTab === 'racas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('racas')}
                >
                    Raças
                </button>
                <button 
                    className={`tab-button ${activeTab === 'adocoes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('adocoes')}
                >
                    Pedidos de Adoção
                </button>
            </div>

            {/* Conteúdo Dinâmico */}
            <div className="admin-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Admin;