import React, { useState, useEffect } from 'react';
import './Inicio.css';
import Navbar from '../Navbar/Navbar';

const Inicio = () => {
    const [dogs, setDogs] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Simulação de dados dos cachorros disponíveis para adoção
    useEffect(() => {
        const fetchDogs = () => {
            const mockDogs = [
                {
                    id: 1,
                    name: "Rex",
                    age: "2 anos",
                    breed: "Vira-lata",
                    size: "Médio",
                    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 2,
                    name: "Luna",
                    age: "1 ano",
                    breed: "Labrador",
                    size: "Grande",
                    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 3,
                    name: "Bolt",
                    age: "3 meses",
                    breed: "Golden Retriever",
                    size: "Pequeno",
                    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                },
                {
                    id: 4,
                    name: "Mel",
                    age: "4 anos",
                    breed: "Poodle",
                    size: "Pequeno",
                    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                }
            ];
            setDogs(mockDogs);
        };

        fetchDogs();
    }, []);

    // Efeito de scroll para navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Controle do carrossel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === dogs.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [dogs.length]);

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    const handleAdoptClick = () => {
        window.location.href = '/adocao';
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === dogs.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? dogs.length - 1 : currentSlide - 1);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="inicio-container">
            {/* Navbar */}
            < Navbar />
            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <h1>Dê um lar para um amigo de quatro patas</h1>
                    <p>Encontre seu novo melhor amigo no Anjos Protetores. Centenas de cães esperam por uma segunda chance.</p>
                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={handleAdoptClick}>Ver Cães para Adoção</button>
                        <button className="secondary-btn">Como Funciona</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Cachorro feliz" />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <h2>Sobre o Anjos Protetores</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>O Anjos Protetores é uma organização sem fins lucrativos dedicada a resgatar, reabilitar e encontrar lares amorosos para cães abandonados e maltratados.</p>
                            <p>Desde nossa fundação, já ajudamos mais de 1.000 cães a encontrarem famílias amorosas. Nossa missão é garantir que cada animal tenha a chance de viver uma vida feliz e saudável.</p>
                            <div className="stats">
                                <div className="stat">
                                    <h3>1.000+</h3>
                                    <p>Cães Adotados</p>
                                </div>
                                <div className="stat">
                                    <h3>50+</h3>
                                    <p>Voluntários</p>
                                </div>
                                <div className="stat">
                                    <h3>5</h3>
                                    <p>Anos de Atuação</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Sobre nós" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Dogs Section */}
            <section id="dogs" className="dogs-section">
                <div className="container">
                    <h2>Cães Disponíveis para Adoção</h2>
                    <p className="section-subtitle">Conheça alguns dos nossos anjinhos que estão procurando um lar</p>

                    <div className="dogs-carousel">
                        <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
                        <button className="carousel-btn next" onClick={nextSlide}>›</button>

                        <div className="carousel-track">
                            {dogs.map((dog, index) => (
                                <div
                                    key={dog.id}
                                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    <div className="dog-card">
                                        <div className="dog-image">
                                            <img src={dog.image} alt={dog.name} />
                                            <div className="dog-overlay">
                                                <button className="adopt-me-btn" onClick={handleAdoptClick}>Quero Adotar</button>
                                            </div>
                                        </div>
                                        <div className="dog-info">
                                            <h3>{dog.name}</h3>
                                            <p><strong>Idade:</strong> {dog.age}</p>
                                            <p><strong>Raça:</strong> {dog.breed}</p>
                                            <p><strong>Porte:</strong> {dog.size}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="carousel-indicators">
                            {dogs.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>

                    <div className="view-all-dogs">
                        <button className="view-all-btn" onClick={handleAdoptClick}>Ver Todos os Cães</button>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="process-section">
                <div className="container">
                    <h2>Como Adotar um Cão</h2>
                    <p className="section-subtitle">O processo de adoção é simples e seguro</p>

                    <div className="process-steps">
                        <div className="step">
                            <div className="step-icon">1</div>
                            <h3>Encontre seu amigo</h3>
                            <p>Navegue pelos nossos cães disponíveis e encontre aquele que mais combina com você.</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">2</div>
                            <h3>Preencha o formulário</h3>
                            <p>Preencha nosso formulário de adoção para que possamos conhecer você melhor.</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">3</div>
                            <h3>Entrevista e visita</h3>
                            <p>Realizamos uma entrevista e, se possível, uma visita ao local onde o cão viverá.</p>
                        </div>
                        <div className="step">
                            <div className="step-icon">4</div>
                            <h3>Adoção finalizada</h3>
                            <p>Após aprovação, você pode levar seu novo amigo para casa!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <h2>Histórias de Sucesso</h2>
                    <p className="section-subtitle">Veja o que as famílias adotantes têm a dizer</p>

                    <div className="testimonials">
                        <div className="testimonial">
                            <div className="testimonial-content">
                                <p>"Adotamos a Luna há 6 meses e ela trouxe tanta alegria para nossa família. O processo foi muito bem acompanhado pela equipe do Anjos Protetores."</p>
                            </div>
                            <div className="testimonial-author">
                                <h4>Maria Silva</h4>
                                <p>Família adotante da Luna</p>
                            </div>
                        </div>

                        <div className="testimonial">
                            <div className="testimonial-content">
                                <p>"O Rex se adaptou perfeitamente à nossa casa. Estamos muito gratos ao Anjos Protetores por todo o apoio durante o processo de adoção."</p>
                            </div>
                            <div className="testimonial-author">
                                <h4>João Santos</h4>
                                <p>Família adotante do Rex</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Pronto para mudar uma vida?</h2>
                        <p>Adote um cão e ganhe um amigo leal para sempre</p>
                        <div className="cta-buttons">
                            <button className="primary-btn" onClick={handleAdoptClick}>Ver Cães para Adoção</button>
                            <button className="secondary-btn">Tornar-se Voluntário</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>Anjos Protetores</h3>
                            <p>Dando uma segunda chance para cães abandonados desde 2018.</p>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
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
                                <li><i className="fas fa-map-marker-alt"></i> Rua dos Animais, 123</li>
                                <li><i className="fas fa-phone"></i> (11) 9999-9999</li>
                                <li><i className="fas fa-envelope"></i> contato@anjosprotetores.org</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2023 Anjos Protetores. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Inicio;