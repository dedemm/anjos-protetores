import React from 'react'

const Inicio = () => {
const handleLoginClick = () => {
    window.location.href = '/login';
};

return (
    <div>
        <h1>Bem-vindo ao Anjos Protetores</h1>
        <p>Encontre seu novo melhor amigo!</p>
        <button onClick={handleLoginClick}>Ir para Login</button>
    </div>
)
}

export default Inicio
