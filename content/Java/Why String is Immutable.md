---
title: Why is String Immutable in Java?
tags: [string, immutability]
difficulty: medium
date: 2025-09-15
---

## ✅ Short Answer
**Strings in Java are immutable to ensure security, caching, thread-safety, and performance optimizations.**  
Once a `String` object is created, its value cannot be changed. Any modification results in a **new String object** being created.

---

## 🔎 Reasons Why String is Immutable

### 1. **Security**
- Strings are heavily used in **network connections, database URLs, usernames, and passwords**.
- If `String` were mutable, a hacker could change the value of a connection string after it was created, leading to **security vulnerabilities**.
- Example:
  ```java
  String url = "jdbc:mysql://localhost:3306/mydb";
  // Imagine if someone could modify "mydb" to "hackedDB"
  ```

---

### 2. **Caching and String Pool**
- Java maintains a **String Constant Pool** (SCP).
- Immutable strings allow safe sharing of objects in the pool.
- Example:
  ```java
  String a = "hello";
  String b = "hello";   // points to the same object in SCP
  ```
- If strings were mutable, changing `a` would also change `b`, breaking pooling.

---

### 3. **Thread-Safety**
- Immutability makes `String` **inherently thread-safe**.
- Multiple threads can share the same string without synchronization, avoiding race conditions.

---

### 4. **HashCode Caching**
- Strings are commonly used as **keys in HashMap, HashSet, Hashtable**.
- Since they are immutable:
  - The hashcode of a String is computed only once.
  - Performance is improved because repeated lookups don’t need re-computation.
- If strings were mutable, a key’s value could change after insertion, making lookups unreliable.

---

### 5. **Performance Optimizations**
- Because of immutability, JVM can **intern strings** and reuse them.
- This reduces **memory footprint** and improves efficiency.

---

## 📌 Example Demonstration

```java
public class StringTest {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = s1;

        s1 = s1 + " world"; // creates a new String object

        System.out.println(s1); // hello world
        System.out.println(s2); // hello
    }
}
```

**Explanation**:  
- `s1` initially points to `"hello"`.  
- After concatenation, a **new String object** `"hello world"` is created.  
- `s2` remains unchanged, proving immutability.

---

## 👉 Interview Tip
If asked:  
- "Why is String immutable?" → Mention **security, caching, thread-safety, and performance**.  
- If pressed further → Talk about **string pool and hashcode caching**, which rely on immutability.  

