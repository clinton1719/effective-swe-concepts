---
title: What are the Rules for Method Overloading and Method Overriding?
tags: [java, oops]
difficulty: medium
date: 2025-09-10
---

This is a classic core Java interview question. The answer is:

> ✅ **Method Overloading and Method Overriding both allow polymorphism in Java, but they follow different rules.**

## Method Overloading Rules

Two methods are considered **overloaded** if they meet the following criteria:

1. **Same method name**.  
2. **Different parameter list** (number or type of arguments must differ).  

Additional notes:  
- They **may or may not** have different access modifiers.  
- They **may or may not** have different return types.  
- They **may or may not** throw different checked or unchecked exceptions.  
- Resolution of overloaded methods happens at **compile time** (compile-time polymorphism).

### Example of Overloading

```java
class MathUtils {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

---

## Method Overriding Rules

The overriding method in a child class must follow these rules:

1. **Same method name** as the parent method.  
2. **Same parameter list** as the parent method.  
3. Return type must be **same** or **covariant** (subclass of the parent’s return type).  
4. Must not throw **broader checked exceptions** than the parent method.  
5. Must not have a **more restrictive access modifier**.  
   - Example: If the parent method is `public`, the child method **cannot** be `protected` or `private`.  

Additional notes:  
- Resolution of overridden methods happens at **runtime** (runtime polymorphism).  
- Only **instance methods** can be overridden. `static`, `final`, and `private` methods cannot be overridden.  

### Example of Overriding

```java
class Parent {
    public Number getValue() throws IOException {
        return 42;
    }
}

class Child extends Parent {
    @Override
    public Integer getValue() throws IOException {  // Covariant return type
        return 99;
    }
}
```

---

## Key Point for Interviews

- **Overloading** = same method name, different parameter list → **compile-time polymorphism**.  
- **Overriding** = same method signature in parent and child → **runtime polymorphism**.  
- Always highlight **covariant return types** and **exception rules** when explaining overriding.  
