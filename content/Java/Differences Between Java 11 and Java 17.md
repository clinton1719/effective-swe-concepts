---
title: Differences Between Java 11 and Java 17 (Expanded with Concepts)
tags: [java-17]
difficulty: medium
date: 2025-09-15
---

## Overview
Java 11 (released in **September 2018**) and Java 17 (released in **September 2021**) are both **Long-Term Support (LTS)** versions.  
Java 11 focused mainly on API updates and JDK cleanup, while Java 17 introduced several **new language features** that make Java more modern and concise.

---

## Key Differences Between Java 11 and Java 17

### 1. **Language Features**
- **Java 11**
  - No major syntax-level changes from Java 8/9/10.
  - Mostly API additions and library improvements.
- **Java 17**
  - Introduced major language-level enhancements:
    - **Sealed Classes (JEP 409)**
    - **Records (JEP 395)**
    - **Pattern Matching for `instanceof` (JEP 394)**
    - **Text Blocks (JEP 378)**
    - **Switch Expressions (JEP 361)**

---

### 2. **API Additions**
- **Java 11**
  - New `String` methods: `isBlank()`, `lines()`, `repeat()`, `strip()`.
  - File utility methods: `Files.readString()`, `Files.writeString()`.
  - Standardized `HttpClient` for HTTP/2 and WebSocket support.
- **Java 17**
  - New `Stream.toList()` method for easier collection.
  - Enhanced random number generators (`RandomGenerator` API).
  - Expanded `CharSequence` and `Stream` capabilities.

---

### 3. **JVM & Performance**
- **Java 11**
  - Introduced **ZGC (Z Garbage Collector)** as experimental.
  - Flight Recorder & Mission Control included for profiling.
- **Java 17**
  - ZGC and Shenandoah GC made **production-ready**.
  - Stronger encapsulation of JDK internals.
  - Class Data Sharing (CDS) improvements.

---

### 4. **Removed/Deprecated Features**
- **Java 11**
  - Removed Java EE and CORBA modules.
  - Removed JavaFX from JDK (moved to external project).
- **Java 17**
  - Deprecated **Security Manager**.
  - Marked **Applet API** for removal.
  - Removed RMI Activation System.
  - Finalized strong encapsulation of JDK internals.

---

### 5. **Licensing**
- **Java 11**: Oracle changed licensing; developers turned to **OpenJDK builds** (e.g., Eclipse Temurin).
- **Java 17**: Oracle provides **free LTS support until 2029** under Oracle No-Fee Terms.

---

## New Concepts Introduced in Java 17

### **1. Sealed Classes**
- **What it is**: A way to restrict which classes can extend or implement a class/interface.
- **Why**: Provides better control of inheritance, useful for domain modeling.
- **Example**:
  ```java
  public sealed class Shape permits Circle, Rectangle {}
  public final class Circle extends Shape {}
  public final class Rectangle extends Shape {}
  ```
- **Use case**: Helps model closed hierarchies (e.g., a limited set of `Shape` types).

---

### **2. Records**
- **What it is**: A concise way to define immutable data classes.
- **Why**: Reduces boilerplate (`getters`, `equals`, `hashCode`, `toString`).
- **Example**:
  ```java
  public record Point(int x, int y) {}
  ```
- **Use case**: DTOs (Data Transfer Objects), value carriers, entities with no mutable state.

Records are implicitly immutable, meaning their state cannot be changed after creation. This simplifies reasoning about data, reduces the potential for bugs, and can improve thread safety in concurrent applications.

---

### **3. Pattern Matching for `instanceof`**
- **What it is**: Simplifies type checking and casting.
- **Why**: Avoids redundant casting code after `instanceof`.
- **Example**:
  ```java
  if (obj instanceof String s) {
      System.out.println(s.toUpperCase());
  }
  ```
- **Use case**: Cleaner and safer type handling in polymorphic code.

---

### **4. Text Blocks**
- **What it is**: Multi-line string literals using `"""`.
- **Why**: Improves readability of JSON, SQL, HTML, and other multi-line text.
- **Example**:
  ```java
  String json = """
      {
        "id": 1,
        "name": "Java 17"
      }
      """;
  ```
- **Use case**: Embedding JSON/XML/SQL queries directly in Java code.

---

### **5. Switch Expressions**
- **What it is**: Enhances `switch` to return values and use lambda-style syntax.
- **Why**: More concise and less error-prone.
- **Example**:
  ```java
  int result = switch (day) {
      case MONDAY, FRIDAY -> 6;
      case TUESDAY -> 7;
      default -> 0;
  };
  ```
- **Use case**: Assigning values directly from a `switch` instead of using long `if-else` chains.

---

## Quick Comparison Table

| Feature                  | Java 11                              | Java 17                                        |
|---------------------------|---------------------------------------|-----------------------------------------------|
| LTS Release Year          | 2018                                  | 2021                                          |
| Language Features         | No major new syntax                   | Sealed classes, Records, Pattern Matching, Text Blocks, Switch Expressions |
| String Enhancements       | `isBlank()`, `lines()`, `repeat()`   | Inherits Java 11 + new Stream/CharSequence APIs |
| Garbage Collectors        | Experimental ZGC                     | Production-ready ZGC & Shenandoah             |
| JDK Cleanup               | Removed Java EE, CORBA               | Deprecated Security Manager, Applets          |
| Licensing                 | Oracle commercial license             | Free under Oracle No-Fee Terms until 2029     |

---

## 👉 Interview Tip
- **Java 11** = cleanup + API improvements.  
- **Java 17** = modern Java (records, sealed classes, text blocks, switch expressions, pattern matching).  
- Always emphasize that **Java 17 is the recommended LTS for new projects** due to richer language features and extended support.

