---
title: What is a Marker Interface?
tags: [java, oops, interfaces]
difficulty: medium
date: 2025-09-15
---

## ✅ Short Answer
A **Marker Interface** is an interface in Java that has **no methods or fields**.  
It is used to **mark** or **tag** a class so that the JVM or a framework can treat it differently at runtime.

---

## 📖 Why Marker Interfaces?
- They provide **metadata** about a class without adding behavior.  
- The **presence** of the interface itself conveys special meaning to the compiler or JVM.  
- Before Java 5 (when annotations were introduced), marker interfaces were the main way to add metadata to classes.  

---

## 📖 Examples of Marker Interfaces in Java
### 1. `Serializable`
Marks a class whose objects can be serialized (converted to byte stream).
```java
import java.io.Serializable;

class Employee implements Serializable {
    private String name;
    private int age;
}
```
- Here, `Employee` is marked as `Serializable`.  
- The JVM knows it can safely serialize/deserialize objects of this class.  

---

### 2. `Cloneable`
Marks that a class allows its objects to be cloned using the `clone()` method.
```java
class Student implements Cloneable {
    int id;
    String name;

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```
- If `Cloneable` is not implemented, calling `clone()` will throw `CloneNotSupportedException`.

---

### 3. `Remote` (used in RMI)
Marks objects that can be accessed remotely via RMI.  

---

## 📖 Custom Marker Interface
You can create your own marker interface to signal custom behavior.
```java
interface Auditable { } // marker interface

class Transaction implements Auditable {
    private double amount;
}

// Later in framework code
if (obj instanceof Auditable) {
    System.out.println("Audit log created for: " + obj);
}
```
- Here, implementing `Auditable` simply marks `Transaction` as requiring audit logging.  

---

## ⚡ Marker Interface vs Annotations
- **Marker Interface** → Pre-Java 5 approach for metadata.  
- **Annotations** → Modern replacement (more powerful, flexible, can have values).  

**Example:** Instead of `Serializable`, today we might use an annotation like `@Entity`, `@Service`, etc.  

---

## 👉 Interview Tip
If asked *"Are marker interfaces still useful after annotations?"*:  
- Yes, but annotations are preferred in modern Java.  
- Marker interfaces still make sense if you want **type-based checking at compile time** (`instanceof`), which annotations cannot provide directly.

