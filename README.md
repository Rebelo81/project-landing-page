# Project Landing Page

Este é um projeto de landing page com uma estrutura moderna e organizada.

## 🌐 Demo

Acesse o projeto online: [https://project-dnc.netlify.app/](https://project-dnc.netlify.app/)

## Estrutura do Projeto

```markdown
project-landing-page/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD (validação de HTML/CSS/JS em PRs)
├── src/                      
│   ├── assets/
│   │   └── images/          # Imagens do projeto
│   ├── index.html           # Página principal
│   ├── style.css            # Estilos CSS
│   └── main.js              # JavaScript principal
├── scripts/
│   └── setup.sh             # Script de configuração
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

Os arquivos otimizados serão gerados na pasta `dist/`

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

- Valida HTML
- Valida CSS
- Valida JavaScript
- Executa em cada push para main e em pull requests

## Licença

Este projeto está sob a licença MIT.