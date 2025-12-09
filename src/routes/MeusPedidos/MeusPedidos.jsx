import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MeusPedidos.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function MeusPedidos() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Carrega os pedidos ao abrir a página
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // 1. Pegar o ID do utilizador logado
      const { data: user } = await api.get("/api/pvt/users/profile");
      
      // 2. Pegar os pedidos desse utilizador
      if (user && user.id) {
        const { data: list } = await api.get(`/api/pvt/adoptionRequests/adopter/${user.id}`);
        setRequests(list);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      alert("Não foi possível carregar os seus pedidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Tem a certeza que deseja cancelar este pedido?")) return;

    try {
      await api.delete(`/api/pvt/adoptionRequests/${id}`);
      alert("Pedido cancelado com sucesso!");
      // Recarrega a lista para sumir com o item cancelado
      fetchRequests();
    } catch (error) {
      console.error("Erro ao cancelar", error);
      alert("Erro ao cancelar o pedido.");
    }
  };

  if (loading) return <div className="container-pedidos"><p>A carregar pedidos...</p></div>;

  const openModal = (animal) => setSelectedAnimal(animal);
  const closeModal = () => setSelectedAnimal(null);

  return (
    <>
      <Navbar />
      <div className="container-pedidos">
        <h1>Meus Pedidos de Adoção</h1>

      {requests.length === 0 ? (
        <p>Ainda não tens pedidos de adoção registados.</p>
      ) : (
        <div className="lista-pedidos">
          {requests.map((req) => (
            <div key={req.id} className="card-pedido clickable" onClick={() => openModal(req.animal)}>
              <div className="thumb-and-info">
                <img className="pedido-thumb" src={req.animal?.photoUrl || 'https://via.placeholder.com/120x90?text=Sem+Foto'} alt={req.animal?.name || 'animal'} />
                <div className="info-animal">
                  <h3>Animal: {req.animal?.name || "Nome não disponível"}</h3>
                  <p>Status: <strong>{req.animal?.status === 'AVAILABLE' ? 'Aguardando Aprovação' : req.animal?.status}</strong></p>
                </div>
              </div>
              
              {req.animal?.status !== 'ADOPTED' && (
                <button 
                  className="btn-cancelar" 
                  onClick={(e) => { e.stopPropagation(); handleCancel(req.id); }}
                >
                  Cancelar Pedido
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      </div>

      <Footer />

      {selectedAnimal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <img src={selectedAnimal.photoUrl || 'https://via.placeholder.com/400x300?text=Sem+Foto'} alt={selectedAnimal.name || 'animal'} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedAnimal.name || 'Nome não disponível'}</h2>
                <p><strong>Espécie:</strong> {selectedAnimal.specie?.name || selectedAnimal.specie || '—'}</p>
                <p><strong>Raça:</strong> {selectedAnimal.race?.name || selectedAnimal.race || '—'}</p>
                <p><strong>Idade:</strong> {selectedAnimal.age || '—'}</p>
                <p><strong>Sexo:</strong> {selectedAnimal.sex || selectedAnimal.gender || '—'}</p>
                {selectedAnimal.description && <p className="descricao"><strong>Sobre:</strong> {selectedAnimal.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}