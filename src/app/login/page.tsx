"use client"

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/button/button';
import { IUser } from 'src/interfaces/IUser';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    
    const onSubmit = async (data: IUser) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token); // Armazena o token no localStorage
            router.push('/painel'); // Redireciona para a rota /painel
        } else {
            const result = await response.json();
            setErrorMessage(result.message);
        }
    };

    return (
        <div className='flex min-h-full flex-col justify-center pt-10 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10 dark:bg-white dark:text-gray-900'>
                    <div className='-mt-8'>
                        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                    Email
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='email'
                                        type='email'
                                        {...register('email')}
                                        className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                    {errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                    Senha
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='password'
                                        type='password'
                                        {...register('password')}
                                        className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    />
                                    {errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
                                </div>
                            </div>
                            {errorMessage && <p className='mt-2 text-sm text-red-600'>{errorMessage}</p>}
                            <div>
                                <Button type='submit' className='w-full'>
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;