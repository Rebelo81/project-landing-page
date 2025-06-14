# Project Landing Page

Este é um projeto de landing page com uma estrutura moderna e organizada.

## Estrutura do Projeto

```
project-landing-page/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD (validação de HTML/CSS/JS em PRs)
├── src/                      
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/           
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── scripts/
│   └── setup.sh             
├── .env.example             
├── .gitignore               
├── package.json             
└── README.md                
```

## Requisitos

- Node.js 18 ou superior
- npm ou yarn

## Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
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

[Adicione sua licença aqui] 