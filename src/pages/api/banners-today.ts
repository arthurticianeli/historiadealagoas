import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  try {
    switch (method) {
      case "GET": {
        try {
          // Pega o dia atual da semana
          const today = new Date();
          const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          const currentDay = dayNames[today.getDay()];

          // Busca todos os banners
          const allBanners = await prisma.banner.findMany();

          // Filtra banners que devem ser exibidos hoje
          const todayBanners = allBanners.filter(banner => {
            // Se o banner não tem dias configurados, não exibe
            if (!banner.displayDays) {
              return false;
            }

            // Verifica se o dia atual está na lista de dias do banner
            const bannerDays = banner.displayDays.split(',');
            return bannerDays.includes(currentDay);
          });

          return res.status(200).json(todayBanners);
        } catch (error) {
          console.error("Erro ao buscar banners do dia:", error);
          if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ 
              error: "Erro ao buscar banners do dia", 
              details: error instanceof Error ? error.message : String(error)
            });
          }
          return res.status(200).json([]);
        }
      }

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Método ${method} não permitido`);
    }
  } catch (error) {
    console.error("Erro geral na API de banners do dia:", error);
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ 
        error: "Erro interno do servidor", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
    }
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
