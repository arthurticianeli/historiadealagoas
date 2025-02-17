"use client"

import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import Alert from '../alert/alert';
import Button from '../button/button';

const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID ?? '';
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? '';
    const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? '';


    const validate = () => {
        const newErrors: { name?: string; email?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const templateParams = {
                to_email: 'eticianeli@gmail.com',
                subject: 'História de Alagoas - Cadastro de Email"',
                to_name: 'Edberto Ticianeli',
                from_name: name,
                from_email: email,
                message: `Email para cadastro: ${email}\n Nome: ${name}\n--\nEste e-mail foi enviado de um formulário de contato em História de Alagoas (https://www.historiadealagoas.com.br)`
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setAlert({ message: 'E-mail enviado com sucesso!', type: 'success' });
                }, (error) => {
                    console.log('FAILED...', error);
                    setAlert({ message: 'Falha ao enviar o e-mail. Por favor, tente novamente.', type: 'error' });
                });
        }
    };

    return (
        <div className="col-span-1 p-4 border-t md:border-t-0 border-b md:border-b-0 md:border-x">
            <h3 className="text-lg font-bold text-white mb-4">Cadastre-se</h3>
            <p className="text-white mb-4">Receba as últimas notícias e atualizações diretamente no seu email!</p>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded w-full"
                    />
                    {errors.name && <span className="text-red-500 text-sm absolute bottom-[-13] left-0">{errors.name}</span>}
                </div>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded w-full"
                    />
                    {errors.email && <span className="text-red-500 text-sm absolute bottom-[-13] left-0">{errors.email}</span>}
                </div>
                <Button
                    type="submit"
                >
                    Enviar
                </Button>
            </form>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

        </div>
    );
};

export default ContactForm;