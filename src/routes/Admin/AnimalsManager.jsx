import React, { useState, useEffect } from 'react';
import { getAllAnimals, createAnimal, deleteAnimal, getAllAnimalsADM } from '../../services/animalService';
import { getAllSpecies } from '../../services/specieService';
import { getRacesBySpecie } from '../../services/raceService';
import './AnimalsManager.css';

const AnimalsManager = () => {
    const [animals, setAnimals] = useState([]);
    const [species, setSpecies] = useState([]);
    const [races, setRaces] = useState([]); 

  
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        specieId: '',
        raceId: '',
        photoUrl: '' 
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadInitialData();
    }, []);


    useEffect(() => {
        if (formData.specieId) {
            loadRaces(formData.specieId);
        } else {
            setRaces([]);
        }
    }, [formData.specieId]);

    const loadInitialData = async () => {
        try {
            const [animalsData, speciesData] = await Promise.all([
                getAllAnimalsADM(),
                getAllSpecies()
            ]);
            setAnimals(animalsData);
            setSpecies(speciesData);
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        }
    };

    const loadRaces = async (specieId) => {
        try {
            const racesData = await getRacesBySpecie(specieId);
            setRaces(racesData);
        } catch (error) {
            console.error("Erro ao buscar raças", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.specieId || !formData.raceId) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        try {

            const payload = {
                name: formData.name,
                description: formData.description,
                specieId: formData.specieId,
                raceId: formData.raceId,
                status: 'AVAILABLE' 
            };

            await createAnimal(payload);
            alert("Animal cadastrado com sucesso!");
            setFormData({ name: '', description: '', specieId: '', raceId: '', photoUrl: '' });
            
            const updatedAnimals = await getAllAnimals();
            setAnimals(updatedAnimals);

        } catch (error) {
            alert("Erro ao cadastrar animal. Verifique os dados.");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await deleteAnimal(id);
                setAnimals(animals.filter(a => a.id !== id));
            } catch (error) {
                alert("Erro ao deletar.");
            }
        }
    };

    return (
        <div className="manager-container">
            <h3>Gerenciar Animais</h3>

            {/* Formulário de Cadastro */}
            <form className="animal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Animal *</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Rex" required />
                </div>

                <div className="form-group">
                    <label>Espécie *</label>
                    <select name="specieId" value={formData.specieId} onChange={handleChange} required>
                        <option value="">Selecione...</option>
                        {species.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Raça *</label>
                    <select name="raceId" value={formData.raceId} onChange={handleChange} required disabled={!formData.specieId}>
                        <option value="">{formData.specieId ? "Selecione..." : "Escolha a espécie primeiro"}</option>
                        {races.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group full-width">
                    <label>Descrição</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Conte um pouco sobre o animal..." rows="3" />
                </div>

                <button type="submit" className="btn-add">Cadastrar Animal</button>
            </form>

            {/* Lista de Animais */}
            <table className="animals-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Espécie/Raça</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.length === 0 ? (
                        <tr><td colSpan="4">Nenhum animal cadastrado.</td></tr>
                    ) : (
                        animals.map((animal) => (
                            <tr key={animal.id}>
                                <td><strong>{animal.name}</strong></td>
                                <td>{animal.specie?.name} - {animal.race?.name}</td>
                                <td>
                                    <span className={`status-badge status-${animal.status?.toLowerCase()}`}>
                                        {animal.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-delete" onClick={() => handleDelete(animal.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AnimalsManager;