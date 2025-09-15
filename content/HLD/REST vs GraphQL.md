---
title: REST API vs GraphQL
tags: []
difficulty: easy
date: 2025-09-11
---

Link: https://blog.algomaster.io/p/rest-vs-graphql

## REST API vs GraphQL

Both **REST** and **GraphQL** are popular approaches for designing APIs, but they differ significantly in **data fetching, flexibility, and efficiency**. Understanding these differences is crucial for choosing the right approach in modern web and mobile applications.

---

## ✅ REST API

REST (**Representational State Transfer**) is an architectural style that uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for resource manipulation.

### Characteristics:
- **Resource-based** → Each endpoint represents a resource (`/users`, `/orders`, etc.).  
- **Fixed endpoints** → You usually design multiple endpoints for different use cases.  
- **Over-fetching/Under-fetching** → Clients may get more data than needed or not enough, requiring multiple requests.  
- Uses JSON (commonly) but can return XML, HTML, etc.  

**Example:**
```http
GET /users/123
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "123-456-7890"
}
```
- Even if the client only needs `name`, the entire payload is returned.

---

## ✅ GraphQL

GraphQL is a **query language for APIs** developed by Facebook. Clients can request **exactly the data they need** in a single query.

### Characteristics:
- **Single endpoint** (`/graphql`) → all requests are sent as queries.  
- **Client-driven data fetching** → Clients specify what fields they need.  
- Avoids over-fetching and under-fetching.  
- Strongly typed schema → Provides introspection and validation.  
- Can aggregate data from multiple sources in one request.  

**Example:**
```graphql
query {
  user(id: 123) {
    name
  }
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "name": "Alice"
    }
  }
}
```
- Only `name` is returned.

---

## 🔑 Key Differences

| Aspect                | REST API                                  | GraphQL                                |
|------------------------|-------------------------------------------|-----------------------------------------|
| **Data Fetching**      | Fixed responses, may over/under-fetch     | Client chooses exact fields             |
| **Endpoints**          | Multiple endpoints for resources          | Single endpoint with flexible queries   |
| **Performance**        | May require multiple requests             | Often one request is enough             |
| **Schema**             | No strict schema enforced                 | Strongly typed schema                   |
| **Versioning**         | Common (e.g., `/v1/`, `/v2/`)             | Usually avoided, schema evolves         |
| **Learning Curve**     | Easier, widely adopted                    | Steeper (needs schema, resolvers)       |
| **Caching**            | Easy with HTTP caching                    | More complex, requires custom solutions |

---

## 📌 When to Use What?

- **REST API** is a good choice if:
  - Your API is simple, resource-based, and unlikely to change frequently.  
  - You want to leverage HTTP caching and existing tooling.  
  - You need quick development and wide compatibility.  

- **GraphQL** is a good choice if:
  - Clients (web, mobile) need **different shapes of data**.  
  - Your API aggregates data from **multiple services/sources**.  
  - Reducing network requests is critical (e.g., mobile apps).  

---

## 👉 Interview Tip

If asked in interviews:
- Emphasize **GraphQL’s flexibility** vs **REST’s simplicity and maturity**.  
- Mention that **GraphQL can be overkill** for simple APIs.  
- Also note that REST still dominates in many real-world systems, but GraphQL is popular in startups and front-end heavy apps.

