<h1 align="center">
  <img alt="Interface inicial da plataforma Proffy" title="#BannerProffy" src="./assets/screenshots/banner.png" />
</h1>
<!-- <p align="center">:green_book: Plataforma de estudos online conectando alunos e professores </p> -->

<h4 align="center"> 
	Next Level Week Proffy v2 🚀
</h4>

<div align="center">
  <img src="https://img.shields.io/badge/languages-3-blue.svg">
  <img src="https://img.shields.io/github/repo-size/marcel099/proffy.svg">
  <img src="https://img.shields.io/github/last-commit/marcel099/proffy.svg">
  <img src="https://img.shields.io/github/issues/marcel099/proffy.svg">
  <img src="https://img.shields.io/github/license/marcel099/proffy.svg">
  <img src="https://img.shields.io/github/stars/marcel099/proffy.svg?style=social">
</div>

## Índice

* [Índice](#índice)
* [Sobre](#sobre)
  * [Conceito do projeto](#conceito-do-projeto)
  * [Tecnologias](#principais-tecnologias-utilizadas)
  * [Comparação entre versões](#comparação-entre-versões-1-e-2-da-plataforma)
* [Instalação local](#instalação-local)
* [Créditos](#créditos)
* [Licença](#licença)

## Sobre

A primeira versão do projeto foi desenvolvida durante a segunda edição do evento Next Level Week propiciado pela empresa [Rocketseat](https://rocketseat.com.br/). Baseou-se em um layout elaborado no Figma. Por sua vez, a segunda versão baseou-se em um novo layout do Figma para [Web](https://www.figma.com/file/Agvethfp7FANyXDDU3LUfd/Proffy-Web-2.0) e [Mobile](https://www.figma.com/file/nZ7lMEBYZSMhRxfdvy6fKz/Proffy-Mobile-2.0) e em um [documento](https://www.notion.so/Vers-o-2-0-Proffy-eefca1b981694cd0a895613bc6235970) para descrever as novas funcionalidades. Um sumário das diferenças entre as versões pode ser conferido [abaixo](#comparação-entre-versões-1-e-2-da-plataforma).

O sistema, desenvolvido em TypeScript, é composto de um servidor HTTP Node, um [site](https://proffy.marcel099.vercel.app/) em React e um aplicativo móvel em React Native.

A opção por essas ferramentas foi realizada pela Rocketseat por acreditarem formar um conjunto de tecnologias poderoso ao permitir desenvolver desde o Back-End até o aplicativo móvel em uma só linguagem: o JavaScript. A escolha por TypeScript, um superset do JavaScript, foi realizada por acreditar trazer um aumento de confiabilidade de código.

### Conceito do projeto

O sistema Proffy é uma plataforma de estudos online com a finalidade de conectar alunos e professores. Para fazer uso da plataforma, primeiro é preciso se cadastrar e, em seguida, realizar login.

<div
  align="center"
  style="
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  "
>
  <img alt="Interface de login no aplicativo" style="height: 15rem" src="./assets/screenshots/sign_in_mobile.png" />
  <img alt="Interface de cadastro de usuário no site" style="height: 15rem" src="./assets/screenshots/sign_up_web.png" />
</div>

Após entrar, alunos podem consultar uma lista de professores professores cadastrados e entrar em contato com um professor através do WhatsApp. No aplicativo, o aluno também pode favoritar professores para encontrá-los mais rapidamente quando desejado.
<div
  align="center"
  style="
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  "
>
  <img alt="Interface Estudar no site" style="height: 15rem" src="./assets/screenshots/study_web.png" />
  <img alt="Interface Estudar no aplicativo" style="height: 15rem" src="./assets/screenshots/study_mobile.png" />
</div>

Por sua vez, professores podem personalizar seu perfil com informações referentes à disciplina que leciona, sua biografia, seus horários disponíveiees para aula e seu custo de hora por aula.

<div
  align="center"
  style="
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  "
>
  <img alt="Interface Dar Aulas no aplicativo" style="height: 15rem" src="./assets/screenshots/give_classes_mobile.png" />
  <img alt="Interface Meu Perfil no site" style="height: 15rem" src="./assets/screenshots/my_profile_web.png" />
</div>

### Principais tecnologias utilizadas

A plataforma foi desenvolvida em TypeScript. É composta de 3 partes:

- Back-End
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [Knex](https://knexjs.org/)
  - [PostgreSQL](https://www.postgresql.org/)
- Front-End Web
  - [Vite](https://vitejs.dev/)
  - [React](https://react.dev/)
  - [React Router](https://reactrouter.com/)
- Front-End Mobile
  - [React Native](https://reactnative.dev/)
  - [React Navigation](https://reactnavigation.org/) - [Stack](https://reactnavigation.org/docs/stack-navigator/) e [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator)
  - [Async Storage](https://reactnative.dev/docs/asyncstorage)

Alguns pontos a destacar:

- Cada aplicação possui [ESLint](https://eslint.org/) configurado para padronização de código
- A hospedagem de imagens de avatar de usuário é realizada na [AWS S3](https://aws.amazon.com/pt/s3/)
- A autenticação do usuário baseia-se em [JWT](https://jwt.io/)
- O envio de e-mail de recuperação de senha usa [Nodemailer](https://nodemailer.com/) e Gmail

Se desejar explorar as rotas do servidor HTTP Node desenvolvido para essa plataforma, poderá fazer isso através do [Insomnia](https://insomnia.rest/):

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NLW%20%2302%20-%20Proffy&uri=https%3A%2F%2Fgithub.com%2Fmarcel099%2Frs-nlw-02-proffy%2Fblob%2Fmaster%2Fassets%2Finsomnia_collection.json)


### Comparação entre versões 1 e 2 da plataforma

Durante o evento Next Level Week, a aplicação foi desenvolvida com estas funcionalidades:

- Cadastro de uma aula, a qual contém informações da matéria e do professor que a leciona
- Listagem de aulas com filtros
- No aplicativo, salvar professores favoritos para facilidade de acesso
- Contato com professores via WhatsApp

A versão 2 da plataforma foi lançada como um desafio aos alunos que finalizaram o evento ao disponibilizar um novo layout do Figma que adiciona mais funcionalidades à plataforma, as quais foram:

- Cadastro de usuários professores e alunos
- Fluxo de redefinição de senha com envio de e-mail
- Login e logout na plataforma
- Personalização do perfil do usuário como professor, agora com possibilidade de cadastro de horários de aula
- Listagem de aulas passou a ser de usuários professores, além de trazer paginação da lista e com cada professor da lista apresentando informações de horários disponíveis

## Instalação local

Passos para atingir isso pode ser conferido <a href="./INSTALLATION.md">neste arquivo</a>.

## Créditos

Credito a elaboração do modelo do banner deste documento e do banner social ao autor desconhecido desta [postagem](https://mckups.com/pixel-4-and-pixelbook-go-mockup/) no site [Mckups](https://mckups.com). Foi adaptado por mim de acordo com as características deste projeto.

## Licença
Este projeto está sob a licença MIT. Para maiores detalhes acesse o <a href="./LICENSE.md">arquivo de licença</a>.