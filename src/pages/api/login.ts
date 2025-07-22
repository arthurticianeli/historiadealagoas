import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/libs/prisma';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Log para debug
    console.log('Login API: Method =', req.method);
    console.log('Login API: Secret Key exists =', !!SECRET_KEY);
    
    if (req.method !== 'POST') {
        console.log('Login API: Method not allowed:', req.method);
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Método não permitido' });
    }
    
    if (!SECRET_KEY) {
        console.error('Login API: SECRET_KEY is not defined');
        return res.status(500).json({ message: 'Configuração do servidor inválida' });
    }
    
    const { email, password } = req.body;
    console.log('Login API: Email provided =', !!email);

    if (!email || !password) {
        console.log('Login API: Missing credentials');
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        console.log('Login API: Searching for user...');
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || password !== user.password) {
            console.log('Login API: Invalid credentials');
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        console.log('Login API: Generating token...');
        // Gera o token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        console.log('Login API: Login successful');
        // Retorna o token no login bem-sucedido
        return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error('Login API: Database error:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}