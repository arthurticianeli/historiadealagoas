import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/libs/prisma';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Método não permitido' });
    }
    
    if (!SECRET_KEY) {
        console.error('Login API: SECRET_KEY is not defined');
        return res.status(500).json({ 
            message: 'Configuração do servidor inválida',
            error: 'SECRET_KEY não configurada nas variáveis de ambiente'
        });
    }
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        // Retorna o token no login bem-sucedido
        return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error('Login API: Database error:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}