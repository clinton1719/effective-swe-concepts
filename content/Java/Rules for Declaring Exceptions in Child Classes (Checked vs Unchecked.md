---
title: Rules for Declaring Exceptions in Child Classes (Checked vs Unchecked)
tags: [exception-handling, oops]
difficulty: medium
date: 2025-09-15
---

## Core Rule
When overriding a method in Java:
- The **exception contract** between parent and child methods must be respected.
- Checked exceptions (those that extend `Exception`, excluding `RuntimeException`) have **stricter rules** than unchecked exceptions.

---

## Rules for **Checked Exceptions**

### 1. If the parent method **does not declare** any checked exceptions
- **Child cannot declare new checked exceptions.**
- Reason: This would break polymorphism since callers of the parent class method are not prepared to handle new checked exceptions.

✅ Allowed:
```java
class Parent {
    void show() {}
}

class Child extends Parent {
    @Override
    void show() {  // no checked exceptions
        System.out.println("Child implementation");
    }
}
```

❌ Not Allowed:
```java
class Child extends Parent {
    @Override
    void show() throws IOException {  // Compilation error
        System.out.println("Child implementation");
    }
}
```

---

### 2. If the parent method **declares a checked exception**
- Child can declare:
  - The **same exception**  
  - A **subclass** of the exception  
- Child **cannot declare a broader or new checked exception**.

✅ Allowed:
```java
class Parent {
    void show() throws IOException {}
}

class Child extends Parent {
    @Override
    void show() throws FileNotFoundException {  // subclass of IOException
        System.out.println("Child implementation");
    }
}
```

❌ Not Allowed:
```java
class Child extends Parent {
    @Override
    void show() throws Exception {  // broader than IOException
        System.out.println("Child implementation");
    }
}
```

---

## Rules for **Unchecked Exceptions**

Unchecked exceptions (subclasses of `RuntimeException`) are **not enforced by the compiler**.  

- A child class can declare **new unchecked exceptions** even if the parent does not.  
- A child can declare **broader unchecked exceptions** as well.  

✅ Allowed:
```java
class Parent {
    void show() {}
}

class Child extends Parent {
    @Override
    void show() throws ArithmeticException {  // unchecked exception
        int x = 1 / 0;
    }
}
```

---

## Rules for `Error` (like `OutOfMemoryError`)
- Similar to unchecked exceptions → child can freely declare them.
- Not recommended in real-world practice because `Error` represents serious system failures.

---

## Summary Table

| Parent Declaration | Child Declaration | Allowed? | Reason |
|---------------------|-------------------|----------|--------|
| No checked exception | Declares new checked exception | ❌ | Breaks contract |
| Declares checked exception (e.g., `IOException`) | Declares same or subclass | ✅ | Narrower is okay |
| Declares checked exception (e.g., `IOException`) | Declares broader (e.g., `Exception`) | ❌ | Breaks contract |
| Declares checked exception | Declares none | ✅ | Narrowing is allowed |
| Any | Declares unchecked (`RuntimeException`) | ✅ | Compiler doesn’t enforce |

---

## Interview Tip
If asked:  
👉 *“Why can a child not declare broader checked exceptions?”*  
Answer: Because overriding must adhere to the **Liskov Substitution Principle (LSP)** — anywhere a parent class is used, the child class must be substitutable without forcing the caller to handle unexpected checked exceptions.

