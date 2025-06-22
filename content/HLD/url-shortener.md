---
title: High-Level Design of a URL Shortener
tags: [hld, system-design, scalability, caching]
difficulty: medium
date: 2025-06-23
---

### 📌 Question  
Design a scalable, fault-tolerant URL shortener service like Bitly.

---

### 🧠 Key Requirements

- Convert long URLs to short codes (e.g., bit.ly/abc123)
- Must handle high read volume
- Ensure low latency redirection
- Should expire or delete links if needed

---

### 🧱 System Components

| Component       | Role                            |
|-----------------|---------------------------------|
| API Gateway     | Public entry for REST API       |
| Lambda (or EC2) | Handle create and redirect logic|
| DynamoDB        | Stores mapping: short -> long   |
| Redis           | Caches most popular URLs        |
| S3 + CloudFront | Optional: serve static redirects|

---

### 🧭 Flow (Create Short URL)

1. Client sends POST `/shorten` with long URL.
2. Backend generates a hash or base62-encoded ID.
3. Store (shortCode → longURL) in DB.
4. Return `https://yourapp.io/abc123`.

---

### 🔁 Flow (Redirect)

1. Client visits `/abc123`.
2. Backend looks up `abc123` in Redis → DynamoDB fallback.
3. Issue HTTP 301 redirect to original long URL.

---

### 🖼️ Diagram

![URL Shortener HLD](/effective-swe-concepts/images/url-shortener-hld.jpg)

---

### 🧪 Optional: DynamoDB Schema

| Partition Key | Sort Key | TTL       | Redirect URL       |
|---------------|----------|-----------|--------------------|
| shortCode     | null     | timestamp | https://long...com |

---

### ⚠️ Interview Traps

- 🔒 **Collision Handling**: How to ensure no duplicate short codes? (Use UUID, hash + retry, or a central counter)
- ⚡ **Hot Key Problem**: Popular shortCodes can cause Redis cache skew.
- 📉 **Analytics**: Should you store click metrics? Then consider Kafka or Firehose.

---

### 🛡️ Scalability Notes

- Use a **base62** encoding of a global counter for predictable short codes.
- For horizontal scaling, avoid DB auto-increment — use Snowflake ID or UUID v7.
- Use **CloudFront + S3 static site** for ultra-fast link redirects if mapping is pre-generated.

---

### 📚 References

- [Designing Bitly – System Design Primer](https://github.com/donnemartin/system-design-primer)
- [AWS Architecture Blog – Serverless URL shortener](https://aws.amazon.com/blogs/compute/building-a-serverless-url-shortener/)
