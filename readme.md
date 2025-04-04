# Evoé API - Backend

API REST desenvolvida com **NestJS** e **MySQL** para gerenciar usuários/apoiadores do sistema Evoé.

## 📌 Tecnologias Utilizadas
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/)
- [Docker (opcional para banco)](https://www.docker.com/)

## 🚀 Como Executar o Projeto

### 🔧 Pré-requisitos
- Node.js v18+
- MySQL instalado ou rodando via Docker
- **Opcional:** Docker para rodar o banco rapidamente.

### 📦 Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/evoe-api.git
   cd evoe-api
   ```

1. Instale as dependências:
    
    ```sh
    npm install
    ```
    
2. Configure o banco de dados no `.env`:
    
    ```sh
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=root
    DATABASE_PASSWORD=senha
    DATABASE_NAME=evoe_db
    
    ```
    
3. Rodando o banco via Docker (opcional):
    
    ```sh
    docker compose up -d
    ```
    
4. Execute as migrations do banco:
    
    ```sh
    npm run migration:run
    ```
    
5. Inicie o servidor:
    
    ```
    sh
    npm run start:dev
    
    ```
    

## 🔥 Rotas da API

### 📌 Usuários

| Método | Rota         | Descrição                  |
| ------ | ------------ | -------------------------- |
| POST   | `/users`     | Criar um novo usuário      |
| GET    | `/users`     | Listar todos os usuários   |
| GET    | `/users/:id` | Buscar usuário por ID      |
| PUT    | `/users/:id` | Atualizar dados do usuário |
| DELETE | `/users/:id` | Deletar dados usuário      |


### 📜 Documentação Swagger

A API possui documentação interativa no **Swagger**.

Após iniciar o servidor, acesse:

🔗 **http://localhost:3000/docs**

## 🛠️ Como Testar

- Utilize **Insomnia/Postman** para testar os endpoints.
- Ou via terminal com **cURL**:
    
    ```sh
    curl -X GET http://localhost:3000/users
    ```
    

## 📄 Licença

Este projeto está sob a licença MIT.