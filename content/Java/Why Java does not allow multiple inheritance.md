---
title: Why Java Does Not Allow Multiple Inheritance?
tags: [oops, inheritance]
difficulty: easy
date: 2025-09-09
---

This is a frequently asked interview question. The answer is:

> ✅ **Java does not allow multiple inheritance with classes to avoid ambiguity and complexity (commonly known as the Diamond Problem).**

## What is Multiple Inheritance?

- Multiple inheritance occurs when a class tries to extend **more than one parent class**.  
- Example (hypothetical, not allowed in Java):

```java
class Parent1 {
    void hello() {
        System.out.println("Hello from Parent1");
    }
}

class Parent2 {
    void hello() {
        System.out.println("Hello from Parent2");
    }
}

// ❌ Not allowed in Java
class Child extends Parent1, Parent2 { }
```

## Why is it Not Allowed?

- If both parent classes have a method with the **same signature** (e.g., `hello()`), and the child inherits from both, **which method should the child call?**  
- This leads to **ambiguity** and is referred to as the **Diamond Problem**.  
- To keep the language **simple, clear, and less error-prone**, Java designers disallowed multiple class inheritance.

## How Does Java Handle It Instead?

- Java allows a class to **extend only one class** (abstract or concrete).  
- To achieve multiple inheritance of type (behavior), Java uses **interfaces**.  
- Since **Java 8**, interfaces can have `default` methods, but if a class implements two interfaces with the same default method, the compiler forces the developer to **override** it, thereby resolving the ambiguity explicitly.

## Example with Interfaces (Allowed):

```java
interface Interface1 {
    default void hello() {
        System.out.println("Hello from Interface1");
    }
}

interface Interface2 {
    default void hello() {
        System.out.println("Hello from Interface2");
    }
}

class Child implements Interface1, Interface2 {
    @Override
    public void hello() {
        System.out.println("Hello from Child (resolving ambiguity)");
    }
}
```

## Output:

```
Hello from Child (resolving ambiguity)
```

## Key Point for Interviews:

- Java avoids **multiple class inheritance** to prevent ambiguity.  
- Instead, Java uses **interfaces** to achieve similar flexibility, with explicit rules to resolve conflicts.  
- This keeps the language **simple, safe, and predictable**.
