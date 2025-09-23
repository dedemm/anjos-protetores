import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 1 - Configurando o router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 2 - Importando as rotas
import App from './App.jsx';
import Login from './routes/Login/Login.jsx';
import Cadastro from './routes/Cadastro/Cadastro.jsx';
import Inicio from './routes/Inicio/Inicio.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <Inicio />},
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
