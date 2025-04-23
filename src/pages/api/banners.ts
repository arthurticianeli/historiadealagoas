import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET": {
      // Retorna todos os banners
      const banners = await prisma.banner.findMany();
      return res.status(200).json(banners);
    }

    case "POST": {
        const { title, data } = req.body;
      
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
        const newBanner = await prisma.banner.create({
          data: {
            title,
            imageData: data,
            position: "", // Default value, adjust as needed
            active: false, // Default value, adjust as needed
          },
        });
      
        return res.status(201).json(newBanner);
      }

    case "PATCH": {
     const { id, position } = req.body;

    if (!id || typeof id !== "number") {
        return res.status(400).json({ error: "ID é obrigatório e deve ser um número válido" });
      }
   

      const bannerToActivate = await prisma.banner.findFirst({
        where: { id },
      });

      if (!bannerToActivate) {
        return res.status(404).json({ error: "Banner não encontrado" });
      }

      const updatedBanner = await prisma.banner.update({
        where: { id: bannerToActivate.id },
        data: { position: position || "" },
      });

      return res.status(200).json(updatedBanner);
    }

    case "DELETE": {

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
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`Método ${method} não permitido`);
  }
}