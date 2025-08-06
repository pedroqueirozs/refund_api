<h1 align="center">API do Projeto Refund</h1>

<p align="center">
API para gerenciamento de reembolsos, permitindo cadastro de solicitação com envio de arquivo de comprvante por parte do usuário "employee", listagem e visualização das solicitações por parte do usuario admin "manager".

<br/>
<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="invoice control" src="./public/images/layout.svg" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node
- TypeScript
- Express
- Zod
- Prisma ORM
- PostgreSQL
- Bcrypt
- Jsonwebtoken

## 🚀 Instalação
```bash
# Clone o repositório
https://github.com/pedroqueirozs/refund_api

# Instale as dependências.
npm install

# Execute as migrations (se estiver usando Prisma)
npx prisma migrate dev

# Rode o projeto
npm run dev
```

## 📝 Endpoints da API

### Criar um usuário no sistema.
`POST /users`

#### 📥 Body (JSON):
```json
{
  "name": "Teste01",
  "email": "teste01@gmail.com",
  "password": "123456"
}
```
#### 📥 Response:
Status: 201 Created
Body: Nenhum conteúdo (Empty Response)

### Criar uma sessão do usuàrio (Login).
`POST /(raiz)`

#### 📥 Body (JSON):
```json
{
	"email": "teste01@gmail.com",
	"password": "123456"
}
```
#### Response (Susess):
Status code (201 OK)
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
	"user": {
		"id": "e3ffd24f-b33c-47f8-8823-b590e93a5615",
		"name": "Teste01",
		"email": "teste01@gmail.com",
		"role": "employee",
		"createdAt": "2025-08-05T22:46:28.822Z",
		"updatedAt": "2025-08-05T22:46:28.822Z"
	}
}
```
#### Response (Erro - Credenciais inválidas):
Status code (401 Unauthorized )
```json
{
	"message": "E-mail ou senha inválido"
}
```

### Criar uma solicitação de reembolso
`POST /refunds)` (role: "employee")

#### Body (JSON):
```json
{
	"name": "Reparo no portão",
	"category": "services",
	"amount": 150.25,
	"filename": "examplecomprovante84568713659.png"
}
```
#### Response (Susses):
Status code (201 created)
```json
{
	"refund": {
		"id": "1f9bc33a-2789-4793-88c1-7c7d0c06265d",
		"name": "Reparo no portão",
		"amount": 150.25,
		"category": "services",
		"filename": "comprovante84568713659.png",
		"userId": "e3ffd24f-b33c-47f8-8823-b590e93a5615",
		"createdAt": "2025-08-05T23:45:57.515Z",
		"updatedAt": "2025-08-05T23:45:57.515Z"
	}
}
```

### Listar as solicitações de reembolso
`GET /refunds)` (role: "manager")
```json
{
{
	"refunds": [
		{
			"id": "1f9bc33a-2789-4793-88c1-7c7d0c06265d",
			"name": "Reparo no portão",
			"amount": 150.25,
			"category": "services",
			"filename": "comprovante84568713659.png",
			"userId": "e3ffd24f-b33c-47f8-8823-b590e93a5615",
			"createdAt": "2025-08-05T23:45:57.515Z",
			"updatedAt": "2025-08-05T23:45:57.515Z",
			"user": {
				"id": "e3ffd24f-b33c-47f8-8823-b590e93a5615",
				"name": "Teste01",
				"email": "teste01@gmail.com",
				"password": "$2b$08$JdWbgufR2z.kDImH.qOFVe0nQbQBhPjeArlGDGZsTL/qAvQIKNDOO",
				"role": "manager",
				"createdAt": "2025-08-05T22:46:28.822Z",
				"updatedAt": "2025-08-05T23:52:56.756Z"
			}
		}
	],
	"pagination": {
		"page": 1,
		"perPage": 10,
		"totalRecords": 1,
		"totalPages": 1
	}
}
}
```
#### Resonse (error):
```json
{
	"message": "Unauthorization"
}
```

## 🔖 Layout

Você pode visualizar o layout do projeto através [DESSE LINK](. É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## :memo: Licença

Esse projeto está sob a licença MIT.

---
