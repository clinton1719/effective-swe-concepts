---
title: Enabling Versioning in Amazon S3
tags: [aws, s3, versioning, durability]
difficulty: medium
date: 2025-06-25
---

### 📌 Question  
How do you enable and use versioning in an S3 bucket?

---

### 🧠 Answer

Versioning in S3 allows you to preserve, retrieve, and restore **every version of every object** stored in a bucket.

This helps:
- Protect against accidental overwrites or deletes
- Implement backup & restore strategies
- Support eventual archival (via Glacier)

---

### ⚙️ Enabling Versioning (CLI)

```bash
aws s3api put-bucket-versioning \
  --bucket my-bucket-name \
  --versioning-configuration Status=Enabled
```

```terraform
resource "aws_s3_bucket" "main" {
  bucket = "my-bucket-name"
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.main.id

  versioning_configuration {
    status = "Enabled"
  }
}
```