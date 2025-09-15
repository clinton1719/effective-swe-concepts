---
title: String vs StringBuffer vs StringBuilder in Java
tags: [string]
difficulty: medium
date: 2025-09-15
---

## ✅ Short Answer
- **String** → Immutable, safe to share, slower for modifications.  
- **StringBuffer** → Mutable, thread-safe (synchronized), slower than `StringBuilder`.  
- **StringBuilder** → Mutable, **not** thread-safe, but faster than `StringBuffer`.

---

## 📖 String
- **Immutable**: Once created, a `String` object cannot be changed.  
- Every modification (`concat`, `replace`, etc.) creates a **new object**.  
- Stored in the **String pool** (if literal).  

### Example
```java
String s1 = "Hello";
s1.concat(" World");
System.out.println(s1); // "Hello" (unchanged, new object was created)
```

**When to use:**  
- When the value won’t change frequently.  
- For constants, keys in maps, configuration values, etc.  

---

## 📖 StringBuffer
- **Mutable**: Can change contents without creating new objects.  
- **Thread-safe**: All methods are synchronized → safe in multi-threaded environments.  
- **Slower** compared to `StringBuilder` due to synchronization overhead.  

### Example
```java
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");
System.out.println(sb); // "Hello World"
```

**When to use:**  
- When strings are modified **frequently** in a **multi-threaded environment**.  

---

## 📖 StringBuilder
- **Mutable** like `StringBuffer`.  
- **Not thread-safe**: No synchronization overhead.  
- **Faster** than `StringBuffer`.  

### Example
```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
System.out.println(sb); // "Hello World"
```

**When to use:**  
- When strings are modified **frequently** in a **single-threaded environment**.  

---

## ⚡ Performance Comparison
- **String** → Slow for repeated modifications (creates new objects).  
- **StringBuffer** → Safer in multi-threaded, but slower than `StringBuilder`.  
- **StringBuilder** → Best performance for single-threaded modifications.  

---

## 👉 Interview Tip
If asked *"When should I use each?"*:  
- **String** → Immutable data (constants, config, keys, tokens).  
- **StringBuffer** → Concurrent string modifications.  
- **StringBuilder** → Fast string modifications in single-threaded apps.  

