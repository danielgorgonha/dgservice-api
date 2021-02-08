# DG Service API RESTful &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]

Api RESTful para captura de ganhos na plataforma CRM Pipedrive e inserção de
pedidos na plataforma Bling, armazenando estes ganhos em MongoDB para consolidar
através de um endpoint.

## Descrição do Sistema

- Criar contas testes nas plataformas Pipedrive e Bling.
- Criar uma integração entre as plataformas Pipedrive e Bling. (A integração
  deve buscar as oportunidades com status igual a ganho no Pipedrive, depois
  inseri-las como pedido no Bling).
- Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de
  graça
- Criar uma collection no banco de dados MongoDB agregando as oportunidades
  inseridas no Bling por dia e valor total.
- Criar endpoint para trazer os dados consolidados da collection do MongoDB.

### Mapa Mental

![Mapa Mental](/_docs/map-dgservice-api.png)

## Checklist do Projeto

1 - Iniciar Projeto ![OK](/_docs/icon-success.png) <br /> 2 - Configurar
projeto<br /> 2.1 - Instalação de Dependencias <br /> 2.1.1 - Dependencias
iniciais (express, cors, axios, nocache, mongoose, moment, morgan, dotenv)
![OK](/_docs/icon-success.png)<br /> 2.2 - Instalação de Dependencias de
Desenvolvimento<br /> 2.2.1 - Dependencias iniciais ( @babel/cli, @babel/core,
@babel/node, @babel/preset-env, @babel/preset-typescript, @types/cors,
@types/dotenv, @types/express, @types/jest, @types/morgan,
@typescript-eslint/eslint-plugin, babel-plugin-module-resolver, eslint,
eslint-config-airbnb-base, eslint-config-prettier,
eslint-import-resolver-typescript, eslint-plugin-import,
eslint-plugin-import-helpers, eslint-plugin-prettier, jest, prettier, ts-jest,
ts-node-dev, tsconfig-paths, typescript ) ![OK](/_docs/icon-success.png)<br />
3 - Configurar Package<br /> 3.1 - Engines ![OK](/_docs/icon-success.png)<br />
3.2 - Scripts ![OK](/_docs/icon-success.png)<br /> 4 - Esturura pastas
![OK](/_docs/icon-success.png)<br /> 5 - Criar arquivos Raiz<br /> 5.1 -
(editorconfig, env, eslintignore, eslintrc, babelconfig, jestconfig,
prettierconfig e tsconfig) ![OK](/_docs/icon-success.png)<br /> 5.2 - pasta raiz
SRC (App, Routes, Server) ![OK](/_docs/icon-success.png)<br /> 6 - Criar
Controllers ![OK](/_docs/icon-success.png)<br /> 7 - Criar Middlewares
![OK](/_docs/icon-success.png)<br /> 8 - Criar Models
![OK](/_docs/icon-success.png)<br /> 9 - Criar Services
![OK](/_docs/icon-success.png)<br /> 10 - Testes
![OK](/_docs/icon-success.png)<br /> 11 - Deploy
![OK](/_docs/icon-success.png)<br />

## Documentação

### endpoint`s

- POST ~/pipedrive/won
- GET ~/pipedrive/findWon

#### Exemplo de consulta no endpoint findWon

![Exemplo endpoint](/docs/dados-consolidado.png)

### Requisitos

- 1 - Criar conta nas plataformas PipeDrive, Bling e MongoDB Atlas<br />
- 2 - MongoDB Atlas<br />
- 2.1 - Criar Cluster<br />
- 2.2 - Criar Usuário <br />
- 2.3 - Configrar Network <br />
- 3 - PipeDrive Gerar API <br /><br />
  ![Pipedrive Gerar Api](/_docs/pipedrive-gerar-api.png)<br />
- 4 - Bling Gerar API <br /><br />
  ![Bling Gerar API](https://ajuda.bling.com.br/hc/article_attachments/360051073113/usuarioAPI-caminho.gif)<br />

### Instalação

```bash
  git clone https://github.com/danielgorgonha/dgservice-api.git

  yarn install
  ou
  npm install
```

- 1 - Configurar dotenv
- 2 - Renomear o arquiv .env-exemple para .env
- 3 - Preencher os dados para cada item dentro do arquivo .env

```bash
  yarn dev
  ou
  npm run dev
```

### Licença

DG Service é [MIT licensed](./LICENSE).
