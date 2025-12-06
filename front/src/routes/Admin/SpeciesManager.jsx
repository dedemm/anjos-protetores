import React, { useState, useEffect } from 'react';
import { getAllSpecies, createSpecie, deleteSpecie } from '../../services/specieService';
import './SpeciesManager.css';

const SpeciesManager = () => {
    const [species, setSpecies] = useState([]);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(true);

    // Carregar dados ao entrar na tela
    useEffect(() => {
        loadSpecies();
    }, []);

    const loadSpecies = async () => {
        try {
            const data = await getAllSpecies();
            setSpecies(data);
        } catch (error) {
            alert("Erro ao carregar espécies.");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        try {
            await createSpecie(newName);
            setNewName(''); // Limpa o campo
            loadSpecies(); // Recarrega a lista
            alert("Espécie adicionada!");
        } catch (error) {
            alert("Erro ao adicionar espécie.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;

        try {
            await deleteSpecie(id);
            loadSpecies(); // Recarrega a lista
        } catch (error) {
            alert("Erro ao deletar. Talvez existam animais vinculados a esta espécie.");
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="manager-container">
            <h3>Gerenciar Espécies</h3>

            {/* Formulário de Adição */}
            <form className="add-form" onSubmit={handleAdd}>
                <input 
                    type="text" 
                    placeholder="Nome da nova espécie (ex: Gato, Cachorro)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit" className="btn-add">Adicionar</button>
            </form>

            {/* Lista de Espécies */}
            <table className="species-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {species.length === 0 ? (
                        <tr><td colSpan="3">Nenhuma espécie cadastrada.</td></tr>
                    ) : (
                        species.map((specie) => (
                            <tr key={specie.id}>
                                <td>{specie.id.substring(0, 8)}...</td> {/* Mostra só o começo do ID */}
                                <td>{specie.name}</td>
                                <td>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(specie.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SpeciesManager;