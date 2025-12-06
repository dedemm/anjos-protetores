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
              {/* Adicionado aria-label para acessibilidade e target para abrir em nova aba */}
              <a href="https://www.facebook.com/anjos.protetores.de.animais/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/anjosprotetores_associacao" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
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