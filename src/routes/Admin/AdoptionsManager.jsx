import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { getAllAnimalsADM } from '../../services/animalService';
import './AdoptionsManager.css';

const AdoptionsManager = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedAnimalDetails, setSelectedAnimalDetails] = useState(null);

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await getAllAnimalsADM();
        setAnimals(data || []);
      } catch {
        alert('Não foi possível carregar a lista de animais.');
      }
    };
    loadAnimals();
  }, []);

  const loadRequests = async (animalId) => {
    if (!animalId) {
      setRequests([]);
      return;
    }

    setLoadingRequests(true);

    try {
      const { data } = await api.get(`/api/pvt/adoptionRequests`);
      // Filtra apenas os pedidos deste animal
      const filtered = data.filter(req => req.animal?.id === animalId);
      setRequests(filtered);
    } catch {
      alert('Não foi possível carregar os pedidos de adoção.');
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAnimalChange = async (event) => {
    const id = event.target.value;
    setSelectedAnimalId(id);
    setSelectedAnimalDetails(null);

    if (id) {
      try {
        const { data } = await api.get(`/api/pub/animals/${id}`);
        setSelectedAnimalDetails(data);
      } catch {
        alert('Erro ao carregar dados do animal.');
      }
    }

    loadRequests(id);
  };

  const handleViewAnimal = async (animalId) => {
    try {
      const { data } = await api.get(`/api/pub/animals/${animalId}`);
      setSelectedAnimalDetails(data);
    } catch {
      alert('Não foi possível carregar os detalhes do animal.');
    }
  };

  // --- AÇÕES ---

  const handleApprove = async (requestId) => {
    if (!requestId) return;
    const ok = window.confirm("Tem certeza que deseja APROVAR esta adoção?");
    if (!ok) return;

    try {
      await api.put(`/api/pvt/adoptionRequests/${requestId}`);
      alert("Adoção aprovada com sucesso!");
      // Recarrega os dados
      loadRequests(selectedAnimalId);
      if (selectedAnimalId) handleAnimalChange({ target: { value: selectedAnimalId } });
    } catch {
      alert("Erro ao aprovar a adoção.");
    }
  };

  const handleRevert = async (requestId) => {
    if (!requestId) return;
    const ok = window.confirm("Tem certeza que deseja REVERTER esta adoção? O animal ficará disponível novamente.");
    if (!ok) return;

    try {
      await api.put(`/api/pvt/adoptionRequests/${requestId}/revoke`);
      alert("Adoção revertida! Animal está disponível.");
      loadRequests(selectedAnimalId);
      if (selectedAnimalId) handleAnimalChange({ target: { value: selectedAnimalId } });
    } catch (error) {
      console.error(error);
      alert("Erro ao reverter a adoção.");
    }
  };

  const handleDisapprove = async (requestId) => {
    if (!requestId) return;
    const ok = window.confirm("Tem certeza que deseja DESAPROVAR e excluir este pedido?");
    if (!ok) return;

    try {
      await api.delete(`/api/pvt/adoptionRequests/${requestId}`);
      alert("Pedido excluído.");
      loadRequests(selectedAnimalId);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o pedido.");
    }
  };

  return (
    <div className="manager-container">
      <div className="adoptions-header">
        <h2>Gerenciar Adoções</h2>
        <p>Selecione um animal para visualizar os interessados.</p>
      </div>

      <div className="adoptions-toolbar">
        <div className="adoptions-filter">
          <label htmlFor="animalSelect">Animal:</label>
          <select
            id="animalSelect"
            value={selectedAnimalId}
            onChange={handleAnimalChange}
          >
            <option value="">Selecione um animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name} - {animal.status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="adoptions-content">
        {loadingRequests ? (
          <p>Carregando pedidos...</p>
        ) : !selectedAnimalId ? (
          <p>Selecione um animal acima.</p>
        ) : requests.length === 0 ? (
          <p>Não há pedidos de adoção para este animal.</p>
        ) : (
          <table className="adoptions-table">
            <thead>
              <tr>
                <th>Interessado</th>
                <th>Contato</th>
                <th>Status Atual</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                // Verifica se este pedido é o que está "VIGENTE" (animal adotado por esta pessoa)
                // Obs: Comparação segura caso animal ou adoptedBy sejam nulos
                const isTheAdopter = 
                    req.animal?.status === "ADOPTED" && 
                    req.animal?.adoptedBy?.id === req.adopter?.id;
                
                const isAdoptedByOther = 
                    req.animal?.status === "ADOPTED" && 
                    !isTheAdopter;

                return (
                  <tr key={req.id} className={isTheAdopter ? "row-approved" : ""}>
                    <td>
                      <strong>{req.adopter?.name}</strong><br />
                      <small>{req.adopter?.address}</small>
                    </td>
                    <td>
                      {req.adopter?.email}<br />
                      {req.adopter?.phone}
                    </td>
                    <td>
                      {isTheAdopter ? (
                        <span className="badge-approved">APROVADO</span>
                      ) : isAdoptedByOther ? (
                        <span className="badge-disabled">Adotado por outro</span>
                      ) : (
                        <span className="badge-pending">Pendente</span>
                      )}
                    </td>

                    <td className="adoptions-actions">
                      
                      {/* Lógica dos Botões */}
                      
                      {req.animal?.status === "AVAILABLE" && (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(req.id)}
                            title="Aprovar Adoção"
                          >
                            Aprovar
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDisapprove(req.id)}
                            title="Recusar/Excluir Pedido"
                          >
                            Recusar
                          </button>
                        </>
                      )}

                      {isTheAdopter && (
                        <button
                          className="btn-revert" // Você pode criar estilo css para este botão se quiser
                          onClick={() => handleRevert(req.id)}
                          title="Cancelar Adoção"
                          style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Reverter Adoção
                        </button>
                      )}

                      {isAdoptedByOther && (
                        <button disabled className="btn-disabled" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                          Indisponível
                        </button>
                      )}

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selectedAnimalDetails && (
        <div className="animal-details-card">
          <h3>Dados do Animal: {selectedAnimalDetails.name}</h3>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <img
              src={selectedAnimalDetails.photoUrl || "https://via.placeholder.com/150?text=Sem+Foto"}
              alt={selectedAnimalDetails.name}
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
            />
            <div>
               <p><strong>Raça/Espécie:</strong> {selectedAnimalDetails.specie?.name} / {selectedAnimalDetails.race?.name}</p>
               <p><strong>Status:</strong> {selectedAnimalDetails.status}</p>
               {selectedAnimalDetails.adoptedBy && (
                 <p style={{ color: 'green' }}><strong>Adotado por:</strong> {selectedAnimalDetails.adoptedBy.name}</p>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionsManager;