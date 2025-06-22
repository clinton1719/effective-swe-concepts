---
title: Difference between String and StringBuilder
tags: [java, strings, performance]
difficulty: easy
date: 2025-06-21
---

### 📌 Question  
What is the difference between `String`, `StringBuilder`, and `StringBuffer` in Java?

### 🧠 Answer

- `String`: Immutable, every modification creates a new object.
- `StringBuilder`: Mutable and not thread-safe.
- `StringBuffer`: Mutable and thread-safe (synchronized).

### ⚙️ Code Example

```java
public class Example {
  public static void main(String[] args) {
    String s = "Hello";
    s += " World"; // Creates new object

    StringBuilder sb = new StringBuilder("Hello");
    sb.append(" World"); // Modifies same object
  }
}
```

![image](/effective-swe-concepts/images/image.jpg)

### 📊 Comparison Table

| Feature        | String     | StringBuilder | StringBuffer |
|----------------|------------|---------------|--------------|
| Mutable        | ❌ No      | ✅ Yes        | ✅ Yes       |
| Thread-safe    | ✅ N/A     | ❌ No         | ✅ Yes       |
| Performance    | 🚫 Slow    | 🚀 Fast       | ⛔ Slower    |

### 🔥 When to Use What?

- Use `String` when the value won't change.
- Use `StringBuilder` in **single-threaded** environments where performance matters.
- Use `StringBuffer` if you need **thread safety** but don't want to manage synchronization manually.

### 🧪 Real-World Tip

String concatenation in loops is inefficient:

```java
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i; // Very inefficient!
}
```

Use StringBuilder instead:

```java
StringBuilder result = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    result.append(i);
}
```

