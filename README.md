# Project Landing Page - DNC School

Este é um projeto de landing page para o curso de Introdução à Tecnologia da DNC School, com uma estrutura moderna e organizada.

## 🌐 Demo

O projeto será disponibilizado em: [https://project-dnc.netlify.app/](https://project-dnc.netlify.app/)

## Estrutura do Projeto

```markdown
project-landing-page/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD (validação e deploy)
├── src/                      
│   ├── icones/              # Ícones do projeto
│   ├── imagens/             # Imagens do projeto
│   ├── index.html           # Página principal
│   ├── style.css            # Estilos CSS
│   └── main.js              # JavaScript principal
├── scripts/
│   └── setup.sh             # Script de configuração
├── .env.example             # Modelo para variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo git
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

## Requisitos

- Node.js 18 ou superior
- npm ou yarn

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/Rebelo81/project-landing-page.git
   cd project-landing-page
   ```

2. Execute o script de setup:

   ```bash
   ./scripts/setup.sh
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env`
   - Edite o arquivo `.env` com suas configurações

### Variáveis de ambiente

- `FORM_ENDPOINT_URL`: URL do endpoint para envio de formulários.
- `RECAPTCHA_SITE_KEY`: chave do reCAPTCHA v2/v3.
- `NODE_ENV`: `development` ou `production`.

### Configuração do Formulário

O projeto inclui um formulário de captura de leads que envia os dados para uma planilha do Google Sheets através do serviço SheetMonkey. Para configurar:

1. Crie uma planilha no Google Sheets para armazenar os dados
2. Acesse [SheetMonkey](https://sheetmonkey.io/) e crie uma nova conexão
3. Conecte sua planilha do Google Sheets
4. Copie a URL do endpoint gerada pelo SheetMonkey
5. Atualize o atributo `action` do formulário no arquivo `src/index.html`:

   ```html
   <form action="https://api.sheetmonkey.io/form/sua-url-aqui" method="post" class="contact-form" id="contactForm" novalidate>
   ```

O formulário inclui validação em tempo real para:

- Nome (apenas letras, mínimo 3 caracteres)
- E-mail (formato válido)
- Telefone (formato brasileiro: (XX) XXXXX-XXXX)

Também possui tratamento para erros de conexão, armazenando os dados localmente para reenvio quando a conexão for restabelecida.

## Fluxo de Funcionamento do Formulário

1. O usuário preenche os campos obrigatórios (nome, e-mail e telefone)
2. Ao enviar o formulário, os dados são validados em tempo real
3. Se válidos, os dados são enviados para uma planilha do Google Sheets através do SheetMonkey
4. Link da planilha: [Google Sheets - Dados do Formulário](https://docs.google.com/spreadsheets/d/19Y7QzpNtsEQHqepQT03nj56TN8tTMNgIZ7B2pTtHSO4/edit?gid=0)
5. Após o envio bem-sucedido, o usuário é redirecionado para a ementa do curso
6. Link da ementa: [Ementa do Curso de Desenvolvedor Front-End](https://assets-global.website-files.com/66143495d3e01ad1a958beed/662bcea675351ac5fb014bf3_%5BEMENTA%20NOVA%20ID%5D%20Desenvolvedor%20Front-End-compressed_1.pdf)

## Passo a Passo do Projeto

### 1. Configuração Inicial

1. Criação da estrutura de pastas e arquivos
2. Configuração do ambiente de desenvolvimento
3. Instalação das dependências necessárias

### 2. Desenvolvimento do HTML

1. Estruturação semântica da página
2. Criação das seções principais:
   - Header com logo
   - Hero section com chamada principal
   - Seção de benefícios
   - Seção de vídeo explicativo
   - Carrossel de depoimentos
   - Formulário de contato
   - Footer com informações e links sociais

### 3. Estilização com CSS

1. Definição de variáveis CSS para cores e fontes
2. Implementação de layout responsivo
3. Estilização dos componentes:
   - Botões e links
   - Cards de depoimentos
   - Formulário de contato
   - Ícones e elementos visuais

### 4. Implementação JavaScript

1. Validação de formulário em tempo real
2. Implementação do carrossel de depoimentos
3. Animações de scroll e interações
4. Tratamento de envio de formulário e redirecionamento

### 5. Integração com Google Sheets

1. Configuração do SheetMonkey para conexão com Google Sheets
2. Implementação do envio de dados do formulário
3. Tratamento de erros e feedback ao usuário

### 6. Otimizações

1. Otimização de imagens e recursos
2. Melhoria de performance e carregamento
3. Testes de compatibilidade em diferentes navegadores
4. Implementação de acessibilidade

### 7. Deploy

1. Configuração do ambiente de produção
2. Deploy no Netlify
3. Testes finais e ajustes

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

O site estará disponível em `http://localhost:8080`

## Build

Para criar a versão de produção:

```bash
npm run build
```

Nota: Atualmente o script de build apenas exibe uma mensagem de sucesso. Para gerar arquivos otimizados na pasta `dist/`, será necessário implementar um processo de build completo.

## Deploy no Netlify

### Instalação do Netlify CLI

Para instalar o Netlify CLI globalmente:

```bash
npm install netlify-cli -g
```

### Configuração do Netlify CLI

1. Faça login na sua conta Netlify:

   ```bash
   netlify login
   ```

2. Vincule o projeto ao site do Netlify:

   ```bash
   netlify link
   ```

3. Para testar o deploy localmente:

   ```bash
   netlify build
   netlify deploy --build --prod
   ```

### Deploy Automático

O projeto está configurado para deploy automático no Netlify. Cada push para a branch principal acionará um novo deploy.

## Linting

Para validar o código:

```bash
npm run lint
```

## CI/CD

O projeto inclui um pipeline de CI/CD que:

- Verifica a existência do arquivo package.json
- Instala as dependências do projeto
- Executa o build do projeto
- Realiza deploy para GitHub Pages
- Executa em cada push para main e em pull requests

## Licença

Este projeto está sob a licença MIT.