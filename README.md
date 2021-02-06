# DG Service API RESTful &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]

Api RESTful para captura de ganhos na plataforma CRM Pipedrive e inserção de pedidos na plataforma Bling, armazenando estes ganhos em MongoDB para cosolidar através de um endpoint.

## Descrição do Sistema

- Criar contas testes nas plataformas Pipedrive e Bling.
- Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
- Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça
- Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
- Criar endpoint para trazer os dados consolidados da collection do MongoDB.

### Mapa Mental

![Mapa Mental](/_docs/map-dgservice-api.png)

## Checklist do Projeto

1 - Iniciar Projeto ![OK](/_docs/icon-success.png) <br />
2 - Configurar projeto<br />
2.1 - Instalação de Dependencias ![OK](/_docs/icon-success.png)<br />
2.1.1 - Dependencias iniciais (express, cors, axios, nocache)<br />
2.2 - Instalação de Dependencias de Desenvolvimento<br />
2.2.1 - Dependencias iniciais (
@babel/cli,
@babel/core,
@babel/node,
@babel/preset-env,
@babel/preset-typescript,
@types/cors,
@types/dotenv,
@types/express,
@types/jest,
@types/morgan,
@typescript-eslint/eslint-plugin,
babel-plugin-module-resolver,
dotenv,
eslint,
eslint-config-airbnb-base,
eslint-config-prettier,
eslint-import-resolver-typescript,
eslint-plugin-import,
eslint-plugin-import-helpers,
eslint-plugin-prettier,
jest,
morgan,
prettier,
ts-jest,
ts-node-dev,
tsconfig-paths,
typescript
)<br />
3 - Configurar Package<br />
3.1 - Engines<br />
3.2 - Scripts<br />
4 - Esturura pastas<br />
5 - Criar arquivos Raiz<br />
5.1 - (App, Routes, Server, editorconfig, env, eslintignore, eslintrc, babelconfig, jestconfig, prettierconfig e tsconfig)<br />
6 - Criar Controllers<br />
7 - Criar Middlewares<br />
8 - Criar Models<br />
9 - Criar Services<br />
10 - Testes<br />
11 - Deploy<br />

## Documentação

Será incluído assim que finalizarmos o projeto.

### Licença

DG Service é [MIT licensed](./LICENSE).
