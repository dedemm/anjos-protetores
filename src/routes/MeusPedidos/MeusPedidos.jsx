import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MeusPedidos.css";

export default function MeusPedidos() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container-pedidos">
      <h1>Meus Pedidos de Adoção</h1>

      {requests.length === 0 ? (
        <p>Ainda não tens pedidos de adoção registados.</p>
      ) : (
        <div className="lista-pedidos">
          {requests.map((req) => (
            <div key={req.id} className="card-pedido">
              <div className="info-animal">
                {/* Ajusta 'animal.name' conforme o teu DTO real */}
                <h3>Animal: {req.animal?.name || "Nome não disponível"}</h3>
                <p>Status: <strong>{req.animal?.status === 'AVAILABLE' ? 'Aguardando Aprovação' : req.animal?.status}</strong></p>
              </div>
              
              <button 
                className="btn-cancelar" 
                onClick={() => handleCancel(req.id)}
              >
                Cancelar Pedido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}