import React from 'react'; 
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="default-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Anjos Protetores</h3>
            <p>Dando uma segunda chance para animais abandonados desde 2020.</p>
            <div className="social-links">
              {/* Ícones SVG inline para Facebook e Instagram (abre em nova aba) */}
              <a href="https://www.facebook.com/anjos.protetores.de.animais/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.596 0 0 .586 0 1.308v21.383C0 23.415.596 24 1.325 24H12.82v-9.294H9.692V11.09h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.616h-3.123V24h6.116C23.404 24 24 23.415 24 22.692V1.308C24 .586 23.404 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/anjosprotetores_associacao" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.31.975.976 1.248 2.243 1.31 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.31 3.608-.976.975-2.243 1.248-3.608 1.31-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.976-1.248-2.243-1.31-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.849c.062-1.366.334-2.633 1.31-3.608.976-.975 2.243-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.775.128 4.602.406 3.6 1.407 2.598 2.41 2.32 3.583 2.262 4.86 2.204 6.14 2.192 6.549 2.192 10c0 3.451.012 3.86.07 5.14.058 1.277.336 2.45 1.338 3.452 1.002 1.002 2.175 1.28 3.452 1.338 1.279.058 1.688.07 5.14.07s3.86-.012 5.14-.07c1.277-.058 2.45-.336 3.452-1.338 1.002-1.002 1.28-2.175 1.338-3.452.058-1.279.07-1.688.07-5.14s-.012-3.86-.07-5.14c-.058-1.277-.336-2.45-1.338-3.452C19.45.406 18.277.128 17 .07 15.72.012 15.311 0 12 0z M12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.164a4.003 4.003 0 1 1 0-8.006A4.003 4.003 0 0 1 12 16zM18.406 4.594a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#about">Sobre</a></li>
              <li><a href="#dogs">Cães para Adoção</a></li>
              <li><a href="#process">Processo de Adoção</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> Piraí do Sul, PR</li>
              <li><i className="fas fa-phone"></i> (42) 9832-2265</li>
              <li><i className="fas fa-envelope"></i>Pix: 51.888.470/0001-74</li>
              <li><i className="fas fa-envelope"></i>@anjosprotetores_associacao</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Anjos Protetores. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;