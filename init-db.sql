-- Inicialização do banco de dados Historia de Alagoas
-- Este script combina todas as migrações do Prisma

-- Criação da tabela User
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Criação do índice único para email
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Criação da tabela Banner
CREATE TABLE IF NOT EXISTS "Banner" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- Criação do índice único para title
CREATE UNIQUE INDEX IF NOT EXISTS "Banner_title_key" ON "Banner"("title");

-- Inserção de dados de exemplo (opcional)
-- INSERT INTO "User" ("email", "password") VALUES ('admin@historiadealagoas.com', '$2b$10$hash_da_senha') ON CONFLICT DO NOTHING;
