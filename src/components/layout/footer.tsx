import Image from 'next/image';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="py-10 mt-10">
            <div className="max-w-4xl mx-auto">
                <div className="px-4 grid grid-cols-1 md:grid-cols-3">
                    {/* Coluna Sobre */}
                    <div className="col-span-1 p-4 border-b md:border-b-0 md:border-x">
                        <h3 className="text-lg font-bold text-white mb-4">Sobre</h3>
                        <p className="text-sm leading-6">
                            O site &quot;História de Alagoas&quot; é dedicado a compartilhar informações abrangentes sobre a história do estado de Alagoas,
                            incluindo eventos, personalidades, instituições e aspectos culturais. Fundado e mantido pelo jornalista Edberto Ticianeli,
                            o portal busca preservar e divulgar a rica herança histórica alagoana, oferecendo aos leitores uma fonte confiável de conhecimento
                            sobre o passado e as tradições da região.
                        </p>
                    </div>
                    {/* Redes Sociais */}
                    <div className="col-span-1 p-4 flex flex-col items-center border-b md:border-b-0">
                        <h3 className="text-lg font-bold text-white mb-4">Redes Sociais</h3>
                        <p className="text-white mb-4">Fique por dentro das novidades e atualizações seguindo nossas redes sociais!</p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-white hover:text-blue-500 h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-white hover:text-pink-500 h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    {/* Cadastro de Email */}
                    <div className="col-span-1 p-4 border-t md:border-t-0 border-b md:border-b-0 md:border-x">
                        <h3 className="text-lg font-bold text-white mb-4">Cadastre-se</h3>
                        <p className="text-white mb-4">Receba as últimas notícias e atualizações diretamente no seu email!</p>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Nome"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                            />
                            <button
                                type="submit"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <hr className="border-t my-4" />
            {/* Rodapé inferior */}
            <div className="mx-auto max-w-2xl p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>Copyright © 2025 | História de Alagoas by Edberto Ticianeli</p>
                    <div className="flex items-center space-x-2">
                        <Image src="/logo-arthur.png" alt="Arthur Ticianeli Logo" width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
                        <p>Desenvolvido por Arthur Ticianeli</p>
                    </div>
                </div>
            </div>


        </footer >
    );
};

export default Footer;