import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Debug das variáveis de ambiente (sem expor valores sensíveis)
  const envStatus = {
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY_EXISTS: !!process.env.SECRET_KEY,
    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    EMAILJS_SERVICE_ID_EXISTS: !!process.env.EMAILJS_SERVICE_ID,
  };

  return res.status(200).json({
    message: 'Environment check',
    environment: envStatus,
    timestamp: new Date().toISOString()
  });
}
