#!/bin/bash

# Checar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "Erro: npm não está instalado. Por favor, instale o Node.js e o npm antes de continuar."
    exit 1
fi

# Criar diretórios necessários
mkdir -p src/assets/images
mkdir -p src/assets/fonts
mkdir -p src/css
mkdir -p src/js
mkdir -p dist

# Instalar dependências
npm install

# Copiar arquivo .env.example para .env se não existir
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Arquivo .env criado a partir do .env.example"
fi

# Dar permissão de execução ao script
chmod +x scripts/setup.sh

echo "Setup concluído! Você pode agora:"
echo "1. Editar o arquivo .env com suas configurações"
echo "2. Executar 'npm start' para iniciar o servidor de desenvolvimento"
echo "3. Executar 'npm run build' para criar a versão de produção" 