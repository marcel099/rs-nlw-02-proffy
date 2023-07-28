## Instalação

Antes de tudo, vale lembrar que se você quiser apenas acessar a plataforma para experimentá-la, você pode fazer isso através deste <a href="https://proffy.marcel099.vercel.app/">link</a>.

Se deseja executar o projeto na sua máquina, você precisa, antes de tudo, instalar as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) (opcional). Caso queira alterar algum arquivo sugiro também que instale algum editor de texto, como o [Visual Studio Code](https://code.visualstudio.com/) e o [Sublime](https://www.sublimetext.com/3).

Após isso, clone o repositório na pasta de sua escolha utilizando o seguinte comando na linha de comando:

```bash
git clone https://github.com/marcel099/rs-nlw-02-proffy
```

### Back-End

É necessário manter o servidor em execução através destes comandos para o correto funcionamento da plataforma. Para isso, comece instalando as dependências:

```bash
# Acesse a pasta do back-end a partir da pasta do repositório
$ cd server

# Instale as dependências de funcionamento
$ npm install
```

Em seguida, crie um banco de dados <a href="https://www.postgresql.org/">PostgreSQL</a> antes de executar a aplicação. Aconselho que crie o banco de dados <a href="https://hub.docker.com/_/postgres">Postgre</a> utilizando o software <a href="https://www.docker.com/">Docker</a>, pois foi a forma utilizada na versão 2.0 do projeto.

Com o banco de dados pronto, preencha as informações de variáveis de ambiente presentes no arquivo <a href="https://github.com/marcel099/nlw-2-proffy/blob/feature/setup-deploy/server/.env.example">`.env.example`</a>, o que inclui as credenciais de conexão ao banco Postgres que você configurou.

Por fim, rode o seguinte comando para executar a aplicação Back-End:

```
$ npm run dev
```

### Front-End Web

É necessário abrir outra linha de comando para executar estes comandos sem que a anterior seja fechada visto que as aplicações web e mobile consomem e manipulam dados da aplicação back-end.

```bash
# Acesse a pasta do front-end web a partir da pasta do repositório
cd web

# Instale as dependências
npm install

# Inicie a aplicação Vite com React
$ npm run dev
```

### Front-End Mobile

Para executar a aplicação mobile:

```bash
# Acesse a pasta do front-end mobile a partir da pasta do repositório
cd mobile

# Instale as dependências
npm install

# Inicie a aplicação Vite com React
$ npm start
```

Após, você poderá acessar o aplicativo através do app Expo Go ao apontar a câmera do seu celular dentro desse app no QRCode que aparecerá na tela do terminal. Se não quiser utilizar outro dispositivo, o acesso pode ser feito utilizando emuladores <a href="https://developer.android.com/studio">Android</a> ou <a href="https://developer.apple.com/xcode/">iOS</a>.