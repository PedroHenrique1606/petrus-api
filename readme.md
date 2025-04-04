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
    # App
    PORT=3000

    EMAIL_USER=seu-email-google@gmail.com
    EMAIL_PASS=sua-senha-de-app-do-gmail

    JWT_SECRET="436c660015bf3afbc8cab35e511d2305f63fc2a9b00f1f5cf30e8996f6895ee5860f904c9805149e1a7bbd5e8a0f79d983d554c720ef3c181e6d62c167eb225433e4f5e93c916b29f9dd928a4c7e992a2bf478ef28c863fba55bd611eb1948e93078f9696f4a99e7a46d981a21823d1f5026e63ffbac05a66dacdf4bd103547b23ecaf794bc47034c21d4a0ba8add85a5a37369092ef3e342a70716398b5b52189af914b3c23d242b90cb52c1032768d41935369be6816e0842b067feb08356ec32b376f99c01c218c950280523ee5de77af4b05bb93ec30d275caac28095b25f3bfe37ce2c94bb49dadec3331d59a428c9efbc10d48ac32f5fd1b2db3918e09"
    JWT_EXPIRES_IN=1d

    # Database
    DB_HOST=localhost
    DB_PORT=3307
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_NAME=evoe
    ```
    
3. Rodando o banco via Docker:
    
    ```sh
    docker compose up -d
    ```
    
4. Execute as migrations do banco:
    
    ```sh
    npm run migration:run
    ```
    
5. Inicie o servidor:
    
    ```sh
    npm run start:dev
    ```

## 🧪 Testando a API - Users & Auth

Você pode testar as rotas usando ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/), ou via `curl` diretamente no terminal.

---

### 👤 Users

### 🔹 Criar usuário

`POST /users`

```json
{
  "name": "Pedro Henrique Melo",
  "email": "pedromelo.dev.contato@gmail.com",
  "phone": "(85) 98797-5387",
  "bio": "Gosto de gatinhos",
  "password": "123456",
  "role": "usuario"
}
```

### 🔹 Listar todos os usuários

`GET /users`

### 🔹 Buscar usuário por ID

`GET /users/{id}`

Substitua `{id}` pelo UUID do usuário.

### 🔹 Atualizar usuário por ID

`PUT /users/{id}`

```json
{
  "name": "Pedro Henrique Melo",
  "email": "pedromelo.dev.contato@gmail.com",
  "phone": "(85) 98797-5387",
  "bio": "Gosto de gatinhos",
  "password": "123456",
  "role": "usuario"
}
```

### 🔹 Deletar usuário

`DELETE /users/{id}`

### 🔹 Atualizar senha do usuário

`PATCH /users/{id}/password`

```json

{
  "password": "nova senha"
}

```

---

### 🔐 Auth

### 🔹 Login do usuário

`POST /auth/login`

```json

{
  "email": "usuario@email.com",
  "password": "senha123"
}

```

---

### 🔁 Redefinição de senha

### 🔹 Solicitar código de redefinição

`POST /auth/password-reset/request`

```json

{
  "email": "usuario@email.com"
}
```

### 🔹 Validar código de redefinição

`POST /auth/password-reset/validate`

```json

{
  "email": "usuario@email.com",
  "code": "123456"
}
```

### 🔹 Redefinir senha

`PATCH /auth/password-reset`

```json

{
  "email": "usuario@email.com",
  "newPassword": "novaSenha123"
}
```


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