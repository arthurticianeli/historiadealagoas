import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";

interface BannerCreateData {
  title: string;
  imageData: string;
  position: string;
  active: boolean;
  url?: string | null;
  displayDays?: string | null;
}

// Função para validar e corrigir URL
const validateUrl = (inputUrl: string): string | null => {
  if (!inputUrl || inputUrl.trim() === '') return null;
  
  const trimmedUrl = inputUrl.trim();
  
  // Se já tem protocolo, retorna como está
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    return trimmedUrl;
  }
  
  // Se não tem protocolo, adiciona https://
  return `https://${trimmedUrl}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  try {
    switch (method) {
      case "GET": {
        // Retorna todos os banners
        try {
          const { today } = req.query;
          
          // Busca todos os banners
          const allBanners = await prisma.banner.findMany();

          // Se foi solicitado filtro por hoje
          if (today === 'true') {
            // Pega o dia atual da semana
            const currentDate = new Date();
            const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const currentDay = dayNames[currentDate.getDay()];

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
          }

          // Retorna todos os banners se não foi solicitado filtro
          return res.status(200).json(allBanners);
        } catch (error) {
          console.error("Erro ao buscar banners:", error);
          // Retorna mais detalhes do erro em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ 
              error: "Erro ao buscar banners", 
              details: error instanceof Error ? error.message : String(error)
            });
          }
          // Retorna array vazio em caso de erro de banco em produção
          return res.status(200).json([]);
        }
      }

      case "POST": {
        try {
          const { title, data, url } = req.body;
        
          if (!title || !data) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
          }
        
          // Verifica se o banner já existe
          const existingBanner = await prisma.banner.findUnique({
            where: { title },
          });
        
          if (existingBanner) {
            return res.status(409).json({ error: "Banner com este título já existe" });
          }
        
          // Cria um novo banner
          const bannerData: BannerCreateData = {
            title,
            imageData: data,
            position: "", // Default value, adjust as needed
            active: false, // Default value, adjust as needed
          };

          const validatedUrl = validateUrl(url);
          if (validatedUrl) {
            bannerData.url = validatedUrl;
          }

          const newBanner = await prisma.banner.create({
            data: bannerData,
          });
        
          return res.status(201).json(newBanner);
        } catch (error) {
          console.error("Erro ao criar banner:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
      }

      case "PATCH": {
        try {
          const { id, position, title, url, displayDays } = req.body;

          if (!id || typeof id !== "number") {
            return res.status(400).json({ error: "ID é obrigatório e deve ser um número válido" });
          }

          const bannerToUpdate = await prisma.banner.findFirst({
            where: { id },
          });

          if (!bannerToUpdate) {
            return res.status(404).json({ error: "Banner não encontrado" });
          }

          // Prepara os dados para atualização
          const updateData: Partial<BannerCreateData> = {};
          
          if (position !== undefined) {
            updateData.position = position ?? "";
          }
          
          if (title !== undefined) {
            updateData.title = title;
          }
          
          if (url !== undefined) {
            updateData.url = validateUrl(url);
          }
          
          if (displayDays !== undefined) {
            updateData.displayDays = displayDays || null;
          }

          const updatedBanner = await prisma.banner.update({
            where: { id: bannerToUpdate.id },
            data: updateData,
          });

          return res.status(200).json(updatedBanner);
        } catch (error) {
          console.error("Erro ao atualizar banner:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
      }

      case "DELETE": {
        try {
          const { id } = req.body;

          if (!id || typeof id !== "number") {
            return res.status(400).json({ error: "ID é obrigatório e deve ser um número válido" });
          }

          const bannerToDelete = await prisma.banner.findUnique({
            where: { id },
          });

          if (!bannerToDelete) {
            return res.status(404).json({ error: "Banner não encontrado" });
          }

          await prisma.banner.delete({
            where: { id },
          });

          return res.status(200).json({ message: "Banner deletado com sucesso" });
        } catch (error) {
          console.error("Erro ao deletar banner:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        return res.status(405).end(`Método ${method} não permitido`);
    }
  } catch (error) {
    console.error("Erro geral na API de banners:", error);
    // Em desenvolvimento, retorna detalhes do erro
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
