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
import Perfil from './routes/Perfil/Perfil.jsx';
import EditarPerfil from './routes/Perfil/EditarPerfil.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Adocao from './routes/Adocao/Adocao.jsx';
import Admin from './routes/Admin/Admin.jsx';
import Animal from './routes/Animal/Animal.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Inicio /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "adocao", element: <Adocao /> },
      { path: "animal/:id", element: <Animal /> },
      { path: "perfil", element: (<PrivateRoute> <Perfil /> </PrivateRoute>) },
      { path: "perfil/editar", element: (<PrivateRoute> <EditarPerfil /> </PrivateRoute>) },
      { path: "/admin", element: (<PrivateRoute> <Admin /> </PrivateRoute>) },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
