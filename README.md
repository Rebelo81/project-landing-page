# Project Landing Page

Este é um projeto de landing page com uma estrutura moderna e organizada.

## 🌐 Demo

O projeto será disponibilizado em: [https://project-dnc.netlify.app/](https://project-dnc.netlify.app/) (em breve)

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