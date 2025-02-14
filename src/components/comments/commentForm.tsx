"use client"

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postComment } from 'src/hooks/useWpApi';
import { ICreateComment } from 'src/interfaces/ICreateComment';
import * as yup from 'yup';
import Alert from '../alert/alert';
import Button from '../button/button';

const schema = yup.object().shape({
    comment: yup.string().required('Comentário é obrigatório'),
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});


interface CommentFormProps {
    postId: number;
}


const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {

    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ICreateComment) => {
        const comment: ICreateComment = {
            ...data,
            postId: postId,
            date: new Date().toISOString(),
            dateGmt: new Date().toISOString(),
        };

        const response = await postComment(comment);

        if (response?.message) {
            setAlert({ message: `Falha ao enviar o comentário: ${response.code} - ${response.message}`, type: 'error' });
        } else {
            setAlert({ message: 'Comentário enviado com sucesso! Aguardando aprovação.', type: 'success' });
            reset();
        };
    }

    return (
        <div className="comment-form p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Deixe um comentário</h2>
            <p className="text-sm text-gray-600 mb-4">Seu e-mail não será publicado.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className='relative'>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comentário*</label>
                    <textarea
                        id="comment"
                        {...register('comment')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.comment && <p className="text-red-500 text-xs mt-1 absolute bottom-[-17]">{errors.comment.message}</p>}
                </div>

                <div className='relative'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome*</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1  absolute bottom-[-17]">{errors.name.message}</p>}
                </div>

                <div className='relative'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail*</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1  absolute bottom-[-17]">{errors.email.message}</p>}
                </div>

                <Button
                    type="submit"
                >
                    Publicar comentário
                </Button>
            </form>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>
    );
};

export default CommentForm;