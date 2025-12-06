import React, { useState, useEffect } from 'react';
import { getAllSpecies } from '../../services/specieService';
import { getRacesBySpecie, createRace, deleteRace } from '../../services/raceService';
import './RacesManager.css';

const RacesManager = () => {
    const [species, setSpecies] = useState([]);
    const [selectedSpecieId, setSelectedSpecieId] = useState('');
    const [races, setRaces] = useState([]);
    const [newRaceName, setNewRaceName] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Carregar as espécies ao abrir a tela
    useEffect(() => {
        const loadSpecies = async () => {
            try {
                const data = await getAllSpecies();
                setSpecies(data);
            } catch (error) {
                alert("Erro ao carregar espécies.");
            }
        };
        loadSpecies();
    }, []);

    // 2. Carregar raças sempre que a espécie selecionada mudar
    useEffect(() => {
        if (selectedSpecieId) {
            loadRaces(selectedSpecieId);
        } else {
            setRaces([]); // Limpa a lista se não houver seleção
        }
    }, [selectedSpecieId]);

    const loadRaces = async (specieId) => {
        setLoading(true);
        try {
            const data = await getRacesBySpecie(specieId);
            setRaces(data);
        } catch (error) {
            console.error("Erro ao carregar raças", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newRaceName.trim() || !selectedSpecieId) return;

        try {
            await createRace(selectedSpecieId, newRaceName);
            setNewRaceName('');
            loadRaces(selectedSpecieId); // Recarrega a lista
            alert("Raça adicionada!");
        } catch (error) {
            alert("Erro ao adicionar raça.");
        }
    };

    const handleDelete = async (raceId) => {
        if (!window.confirm("Tem certeza que deseja excluir esta raça?")) return;

        try {
            await deleteRace(selectedSpecieId, raceId);
            loadRaces(selectedSpecieId);
        } catch (error) {
            alert("Erro ao deletar raça.");
        }
    };

    return (
        <div className="manager-container">
            <h3>Gerenciar Raças</h3>

            {/* Seleção de Espécie */}
            <div className="select-container">
                <label>Selecione a Espécie:</label>
                <select 
                    value={selectedSpecieId} 
                    onChange={(e) => setSelectedSpecieId(e.target.value)}
                >
                    <option value="">-- Selecione --</option>
                    {species.map(specie => (
                        <option key={specie.id} value={specie.id}>
                            {specie.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Conteúdo só aparece se uma espécie estiver selecionada */}
            {selectedSpecieId && (
                <>
                    <form className="add-form" onSubmit={handleAdd}>
                        <input 
                            type="text" 
                            placeholder="Nome da nova raça (ex: Labrador, Persa)"
                            value={newRaceName}
                            onChange={(e) => setNewRaceName(e.target.value)}
                        />
                        <button type="submit" className="btn-add">Adicionar</button>
                    </form>

                    {loading ? <p>Carregando raças...</p> : (
                        <table className="races-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {races.length === 0 ? (
                                    <tr><td colSpan="3">Nenhuma raça cadastrada para esta espécie.</td></tr>
                                ) : (
                                    races.map((race) => (
                                        <tr key={race.id}>
                                            <td>{race.id.substring(0, 8)}...</td>
                                            <td>{race.name}</td>
                                            <td>
                                                <button 
                                                    className="btn-delete" 
                                                    onClick={() => handleDelete(race.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default RacesManager;