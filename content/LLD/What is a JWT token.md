---
title: What is a JWT Token?
tags: [jwt, authentication, security]
difficulty: easy
date: 2026-02-07
---

## What is a JWT Token?

**JWT** (JSON Web Token) is an **open standard** for securely transmitting information between parties as a **JSON object**. It is commonly used for **authentication** and **authorization** in web applications.

A JWT is a **compact, URL-safe string** that looks like:  
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

---

## JWT Structure

A JWT consists of **3 parts** separated by dots (`.`):

1. **Header** - Metadata about the token type and signing algorithm
2. **Payload** - The actual data (claims)
3. **Signature** - Used to verify the token's integrity

Each part is **Base64Url encoded** and **signed** with a secret key.

---

## Main JWT Fields (Claims)

### 1. Subject (sub)
- **Primary identifier** for the user
- Typically **username**, **userId**, or **email** (must be unique)
- Used to identify which user the token belongs to

### 2. Claims
- **Custom data** about the user
- Common examples:
  - `roles`: ["admin", "user"]
  - `organizationId`: "org123"
  - `permissions`: ["read", "write"]
- Avoid sensitive data (passwords, etc.)

### 3. Expiration (exp)
- **Timestamp** when the token expires
- Tokens typically expire in **15 minutes to 24 hours**
- After expiration, user must re-authenticate

### 4. Signature
- **Verifies authenticity** - ensures token wasn't tampered with
- Created using **secret key** + header + payload
- Server verifies signature matches before trusting the token

---

## JWT Format Example

```
Header: {
"alg": "HS256",
"typ": "JWT"
}

Payload: {
"sub": "john.doe",
"roles": ["user", "editor"],
"organizationId": "org123",
"exp": 1645123456
}

Signature: HMACSHA256(
base64UrlEncode(header) + "." +
base64UrlEncode(payload),
secret_key
)

```


---

## How JWT Works (Flow)

1. **Login**: User enters credentials
2. **Server generates JWT** with user info + signature
3. **Client stores JWT** (usually in localStorage/cookies)
4. **Each request**: Client sends JWT in `Authorization: Bearer <token>`
5. **Server verifies**:
   - Signature is valid
   - Token not expired
   - Extracts user info from payload

---

## Example Usage

**Login Response:**
```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": { "username": "john.doe" }
}
```


**Protected API Request:**
```
GET /api/protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

text
```

---

## Key Benefits

| Feature | Benefit |
|---------|---------|
| **Stateless** | No server-side session storage needed |
| **Scalable** | Works with load balancers (no sticky sessions) |
| **Cross-domain** | Can be used across different domains/services |
| **Compact** | Smaller than session cookies + user data |

---

## Security Considerations

- **Never store sensitive data** (passwords, SSNs) in JWT payload
- Use **HTTPS only** (prevents token interception)
- **Short expiration times** (15-60 minutes)
- **Refresh tokens** for longer sessions
- **Strong secret keys** for signing
- **Validate all claims** on server side

---

## 🧠 Interview Tips

- JWT = **JSON Web Token** (3 parts: Header.Payload.Signature)
- **Stateless authentication** - server doesn't store sessions
- **Subject (sub)** identifies the user, **Claims** contain extra info
- **Signature prevents tampering**, **Expiration ensures security**
- Client sends JWT in **Authorization: Bearer <token>** header
