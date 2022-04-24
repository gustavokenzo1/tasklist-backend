# Desafio Trilha NodeJS da Orc'estra Gamificação

Repositório para o desafio da Trilha de NodeJS da Orc'estra Gamificação, que consiste em criar um Back-end que envolva Tarefas, Lista de Tarefas e Usuários, utilizando autenticação JWT.

# Como rodar

1. Clone esse repositório
2. Com o terminal aberto nesse projeto, instale as dependências com:
  ```
  yarn install
  ```
3. Rode com o comando:
  ```
  yarn dev
  ```

# Como testar

Você precisará criar um arquivo .env, no formato do .env.example, fornecendo uma URL para um banco de dados MongoDB. <br>
Depois, abra o arquivo de rotas para ter uma referência do que colocar dentro do Insomnia/Postman e faça as requisições. <br>
Lembre-se de passar nos Headers o parâmetro "Authorization" com valor "Bearer token_recebido_após_logar" para acessar as rotas que necessitam de autenticação (é recomendado criar uma variável de ambiente para o Insomnia com esse token, para deixar menos poluído e de fácil edição). <br>

