import api from './api';

// Buscar todos os animais - SÓ OS COM STATUS AVAILABLE
export const getAllAnimals = async () => {
    const response = await api.get('/api/pub/animals');
    return response.data;
};

// Buscar todos os animais
export const getAllAnimalsADM = async () => {
    return api.get("/api/pvt/animals").then(res => res.data);
};


export const createAnimal = async (animalData) => {
    const response = await api.post('/api/pvt/animals', animalData);
    return response.data;
};


export const deleteAnimal = async (id) => {
    await api.delete(`/api/pvt/animals/${id}`);
};


export const updateAnimalStatus = async (id, status) => {

    const response = await api.put(`/api/pvt/animals/${id}`, { status }); 
    return response.data;
};