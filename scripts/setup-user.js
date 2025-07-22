// Script para verificar e criar usuário de teste
// Execute: node scripts/setup-user.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupUser() {
  try {
    console.log('Conectando ao banco de dados...');
    
    // Verificar se já existe um usuário
    const existingUser = await prisma.user.findFirst();
    
    if (existingUser) {
      console.log('Usuário encontrado:', existingUser.email);
    } else {
      console.log('Nenhum usuário encontrado. Criando usuário de teste...');
      
      // Criar usuário de teste
      const newUser = await prisma.user.create({
        data: {
          email: 'admin@historiadealagoas.com.br',
          password: 'admin123' // Nota: Em produção, use hash da senha
        }
      });
      
      console.log('Usuário criado:', newUser.email);
    }
    
    // Listar todos os usuários
    const allUsers = await prisma.user.findMany();
    console.log('\nTodos os usuários:');
    allUsers.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}`);
    });
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupUser();
