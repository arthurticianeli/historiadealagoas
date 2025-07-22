import Image from 'next/image';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import ContactForm from '../contactForm/contactForm';

const Footer: React.FC = () => {
    return (
        <footer className="py-10 mt-5 lg:mt-10">
            <div className="max-w-4xl mx-auto">
                <div className="px-4 grid grid-cols-1 md:grid-cols-3">
                    {/* Coluna Sobre */}
                    <div className="col-span-1 p-4 border-b md:border-b-0 md:border-r border-gray-600">
                        <h3 className="text-lg font-bold text-white mb-2">Sobre</h3>
                        <p className="text-sm leading-relaxed text-gray-100">
                            Esse portal compartilha informações sobre a história de Alagoas e divulga os fatos que contribuíram e contribuem para fortalecer a identidade alagoana. Criado e mantido pelo jornalista Edberto Ticianeli desde 28 de abril de 2015, o História de Alagoas fornece subsídios que permitem o conhecimento e o estudo dos eventos, personalidades e instituições que esculpiram a cultura desta rica e bela terra.
                        </p>
                    </div>
                    {/* Contatos */}
                    <div className="col-span-1 p-4 border-b md:border-b-0">
                        <h3 className="text-lg font-bold text-white mb-2">Contatos</h3>
                        
                        {/* Informações de Contato */}
                        <div className="text-white text-sm mb-2 space-y-3">
                            <div>
                                <a href="mailto:contato@historiadealagoas.com.br" className="hover:text-blue-300 transition-colors">
                                    contato@historiadealagoas.com.br
                                </a>
                            </div>
                            <div>
            
                                <a href="tel:+5582988111313" className="hover:text-blue-300 transition-colors">
                                    (82) 98811-1313
                                </a>
                            </div>
                            <div>
                                <span className="text-gray-100 leading-relaxed">
                                    Rua Guaicurus, 157, fundos<br />
                                    Ponta Grossa, CEP 57014-080<br />
                                    Maceió/AL
                                </span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-300">Responsável Técnico:</span>
                                <br />
                                <span className="text-gray-100">Arthur Peixoto Ticianeli</span>
                            </div>
                        </div>

                        {/* Redes Sociais */}
                        <div className="border-t border-gray-600 pt-4 text-center">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Siga-nos nas redes sociais</h4>
                            <div className="flex justify-center space-x-4">
                                <a 
                                    href="https://facebook.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-500 transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook className="h-6 w-6" />
                                </a>
                                <a 
                                    href="https://instagram.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-pink-500 transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>
            <hr className="border-gray-600 my-8" />
            
            {/* Rodapé inferior */}
            <div className="mx-auto max-w-4xl px-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                    <p>&copy; 2025 História de Alagoas. Todos os direitos reservados.</p>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <Image 
                            src="/logo-arthur.png" 
                            alt="Arthur Ticianeli Logo" 
                            width={30} 
                            height={30} 
                            className="rounded"
                        />
                        <p>Desenvolvido por <span className="font-medium text-white">Arthur Ticianeli</span></p>
                    </div>
                </div>
            </div>


        </footer >
    );
};

export default Footer;