# 🚀 Digital Onboarding API – Backend Challenge – Cristian Vasquez

API REST desarrollada en **NestJS** para simular el flujo de **onboarding de clientes** en un banco digital.  
La solución implementa autenticación con **JWT**, validaciones con **class-validator**, endpoints REST desacoplados y un entorno **dockerizado** para facilitar su ejecución.

---

## 🎯 Objetivo del Challenge

El objetivo del reto es demostrar habilidades en:

- Diseño de APIs REST
- Autenticación con JWT
- Validación de datos
- Manejo de estados de negocio
- Buenas prácticas en NestJS
- Uso de Docker para entornos de desarrollo

---

## 🧠 Análisis de Requerimientos

El reto solicita implementar los siguientes componentes:

### 1. Autenticación
- Endpoint `POST /auth/login`
- Credenciales ficticias
- Generación de JWT válido por 5 minutos

### 2. Productos
- `GET /products`
- `GET /products/:id`
- Manejo de errores (`404`)

### 3. Onboarding
- `POST /onboarding` protegido con JWT
- Validaciones de entrada
- Almacenamiento simulado
- Retorno de estado `REQUESTED`

### 4. Health Check
- `GET /health` para verificación del servicio

---

## 🧱 Diseño de la Solución

### 🔐 Autenticación (JWT + Guards)

- Se utiliza **@nestjs/jwt** junto con **passport-jwt**
- El flujo de autenticación se divide en:
  - **JwtStrategy**: Define cómo se valida el token
  - **JwtAuthGuard**: Define cuándo se valida el token
- El resultado del método `validate()` se inyecta automáticamente en `req.user`

### 🧾 Onboarding

- Se implementa como un flujo independiente
- No requiere base de datos (almacenamiento en memoria)
- El estado inicial del onboarding es `REQUESTED`
- Validaciones estrictas usando `class-validator`

### 📦 Products

- Endpoint independiente del onboarding
- Datos mock en memoria
- Implementación REST simple para evaluar diseño de API

---

## ⚙️ Tecnologías Usadas

- **NestJS**
- **Node.js 22**
- **TypeScript**
- **JWT (jsonwebtoken)**
- **Passport**
- **Docker**
- **class-validator**
- **class-transformer**
- **UUID**
- **VS Code**
- **Postman**

---

## 📌 Endpoints Disponibles

### 🔐 Auth

#### `POST /auth/login`

**Request Body**
```json
{
  "username": "admin",
  "password": "password123"
}
```
**Response Body**
```json
{
  "access_token": "jwt_token_here"
}
```

### 🧾 Onboarding (Protegido con JWT)

#### `POST /onboarding`

**Headers**

```
Authorization: Bearer <JWT>
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "Juan Perez",
  "document": "123456789",
  "email": "juan@mail.com",
  "initialAmount": 100000
}
```
**Response Body**
```json
{
  "onboardingId": "uuid-generado",
  "status": "REQUESTED"
}
```

### 📦 Products

#### `GET /products`

**Headers**

```
Authorization: Bearer <JWT>
```

**Request Body**
```json
[
  { "id": 1, "name": "Savings Account", "price": 0 },
  { "id": 2, "name": "Credit Card", "price": 50 },
  { "id": 3, "name": "Personal Loan", "price": 100 }
]
```

#### `GET /products/:id`

**Response Body**
```json
{
  "id": 1,
  "name": "Savings Account",
  "price": 0
}
```
**Response body Not found**
```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

### ❤️ Health Check

#### `GET /health`

**Response Body**

```json
{
  "ok": true
}
```

---

## 🐳 Ejecución con Docker

### 1️⃣ Clonar el repositorio

```
git clone <repository-url>
cd onboarding-api
```

### 2️⃣ Crear archivo .env

```
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=300
```

### 3️⃣ Levantar el entorno

```
docker compose up --build
```

### La API estará disponible en:

http://localhost:3000

---

## 👤 Autor

- **Cristian Camilo Vasquez Osorio**
- **Backend Developer – PHP / Node.js / NestJS**
- **Arquitectura limpia, DDD, microservicios**

---

## 🔍 Repositorio de Referencia (NestJS Avanzado)

**Si se desea revisar una implementación más compleja en NestJS, se puede consultar el siguiente repositorio:**

👉 https://github.com/cristianV0117/over-app-api

Este proyecto incluye conceptos avanzados como:

- **Principios SOLID**
- **Patrones de desarrollo**
- **DDD (Domain Driven Design)**
- **Arquitectura Hexagonal**
- **Autenticación OAuth 2.0 con Google**
- **JWT**
- **MongoDB**
- **Servicios de envío de emails**
- **Arquitectura guiada por eventos (Event-Driven Design)**



