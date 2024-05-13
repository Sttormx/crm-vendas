# Desafio CRM Vendas
> Um CRM de vendas construído em Node.js e Typescript, utilizando clean architecture e Domain Drive Design(DDD)

## Preview
Acesse a URL https://crm-vendas-1.onrender.com/

## Tecnologias
- Node.js com Typescript
- Express
- Next.js e tailwind
- MongoDB

## Executando o projeto em ambiente de desenvolvimento
Siga os passos abaixo:

### Dependências
Na raíz do projeto, rode o MongoDB através do Docker Compose
```
docker compose up -d
```

### Back End
Acesse o diretório `/server`.

Crie um arquivo `.env` com as variáveis definidas em `.env.example`:
```
cd server
nano .env
```

Instale as dependências e execute o servidor:
```
npm install
npm run dev
```

### Front End
Acesse o diretório `/web`.

Crie um arquivo `.env` com as variáveis definidas em `.env.example`:
```
cd server
nano .env
```

Instale as dependências e execute o servidor:
```
npm install
npm run dev
```