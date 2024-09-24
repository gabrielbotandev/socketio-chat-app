# Chat Simples em Tempo Real

Este projeto é um chat simples em tempo real, desenvolvido com as tecnologias **Express**, **Socket.io** e **TypeScript**. O chat permite que múltiplos usuários enviem e recebam mensagens instantaneamente.

## Tecnologias Utilizadas

- **Express**: Framework para aplicações web em Node.js.
- **Socket.io**: Biblioteca que permite comunicação em tempo real entre cliente e servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Pré-requisitos

Antes de começar, você precisará ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/gabrielbotandev/simple-chat-socketio.git

   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Para rodar a aplicação em modo de desenvolvimento (TypeScript):

   ```bash
   npm run dev

   ```

4. Para compilar o TypeScript e rodar a versão compilada:
   ```bash
    npm run build
    npm start
   ```

## Acesso

O servidor estará rodando em `http://localhost:3000`.

## Uso

1. Abra o seu navegador e vá para `http://localhost:3000`.
2. Digite uma mensagem no campo de entrada e clique no botão "send" para enviá-la.
3. As mensagens enviadas aparecerão na lista acima.

## Contribuições

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork deste repositório e envie um pull request!