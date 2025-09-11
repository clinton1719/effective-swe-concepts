---
title:  What types of dependency injection are supported by Spring Framework? When do you use Setter and Constructor Injection, the pros and cons?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## Types of Dependency Injection in Spring

Spring Framework supports **two types of Dependency Injection (DI):**

1. **Constructor-based Injection**  
2. **Setter-based Injection**

Both are valid approaches, and the choice depends on whether dependencies are **mandatory or optional**, and whether **initialization order** matters.

---

## ✅ Constructor-based Injection

Dependencies are injected into the class via its **constructor**.

**Example:**
```java
@Component
public class OrderService {
    private final UserRepository userRepository;

    @Autowired
    public OrderService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

### Pros:
- Ensures **mandatory dependencies** are initialized.  
- Promotes **immutability** since dependencies are `final`.  
- Makes the class easier to test (dependencies must be provided).  
- Useful when **order of initialization** is important.  

### Cons:
- If a class has many dependencies, the constructor can become **too large** (long parameter list, aka *telescoping constructors*).  
- Harder to maintain if the number of dependencies grows significantly.  

---

## ✅ Setter-based Injection

Dependencies are injected via **setter methods** after object creation.

**Example:**
```java
@Component
public class OrderService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

### Pros:
- Suitable for **optional dependencies**.  
- Allows re-injecting or changing dependencies later.  
- Keeps constructors simpler when there are many dependencies.  

### Cons:
- Object can be created without all required dependencies, leading to **incomplete initialization**.  
- Encourages **mutable objects**, which can reduce thread safety.  
- Order of dependency injection cannot be strictly controlled.  

---

## 🔑 When to Use What?

| Scenario                          | Preferred Injection Type       |
|-----------------------------------|--------------------------------|
| Dependency is **mandatory**       | Constructor Injection          |
| Dependency is **optional**        | Setter Injection               |
| **Order of initialization** matters | Constructor Injection          |
| Many dependencies, optional ones  | Mix of Constructor + Setter    |

---

## 👉 Interview Tip

- **Best Practice:** Use **constructor injection** for mandatory dependencies to keep classes immutable and testable.  
- Use **setter injection** only for optional dependencies.  
- Mention that modern Spring (and Spring Boot) encourages **constructor injection by default**.  

