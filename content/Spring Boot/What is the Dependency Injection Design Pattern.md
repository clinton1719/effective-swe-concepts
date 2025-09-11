---
title: What is the Dependency Injection Design Pattern?
tags: [spring]
difficulty: easy
date: 2025-09-09
---

This is a commonly asked interview question in Java and Spring-related interviews. The answer is:

> ✅ **Dependency Injection (DI) is a design pattern where an object’s dependencies are supplied by an external entity rather than the object creating them itself.**

## Why is Dependency Injection Needed?

- In traditional object-oriented programming, classes create and manage their own dependencies using `new`.  
- This leads to **tight coupling** between classes, making code:  
  - Harder to test (difficult to replace real dependencies with mocks).  
  - Less flexible (changing a dependency impacts multiple classes).  
  - More difficult to maintain.  

DI solves this by **injecting dependencies from outside** (via constructors, setters, or interfaces).  

## Types of Dependency Injection

1. **Constructor Injection**  
   - Dependencies are provided through a class constructor.  
   - Promotes immutability (dependencies cannot be changed after construction).  

2. **Setter Injection**  
   - Dependencies are assigned through public setters.  
   - Provides flexibility but allows modification after object creation.  

3. **Interface Injection** (less common in Java)  
   - Dependency is passed via an interface method.  

## Example Without DI (Tightly Coupled)

```java
class ServiceA {
    void doSomething() {
        System.out.println("Service A logic");
    }
}

class ServiceB {
    private ServiceA serviceA = new ServiceA(); // ❌ Tightly coupled

    public void execute() {
        serviceA.doSomething();
        System.out.println("Service B logic");
    }
}
```

- Here, `ServiceB` is responsible for **creating** `ServiceA`.  
- If `ServiceA` changes, `ServiceB` must also change.  

## Example With DI (Loosely Coupled)

```java
class ServiceA {
    void doSomething() {
        System.out.println("Service A logic");
    }
}

class ServiceB {
    private final ServiceA serviceA;

    // ✅ Dependency is injected via constructor
    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }

    public void execute() {
        serviceA.doSomething();
        System.out.println("Service B logic");
    }
}
```

- Now `ServiceB` does not create `ServiceA` itself.  
- The dependency is passed externally, making `ServiceB` **testable** and **loosely coupled**.  

## In Spring Framework

Spring provides a **Dependency Injection container**:  
- Objects (beans) are defined and managed in the container.  
- Dependencies are automatically **wired** at runtime using annotations like `@Autowired`, `@Inject`, or explicit configuration.  

```java
@Component
class ServiceA {
    void doSomething() {
        System.out.println("Service A logic");
    }
}

@Component
class ServiceB {
    private final ServiceA serviceA;

    @Autowired
    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }

    public void execute() {
        serviceA.doSomething();
        System.out.println("Service B logic");
    }
}
```

## Key Point for Interviews

- Dependency Injection = **“Don’t call me, I’ll call you”** (Hollywood Principle).  
- It helps achieve **loose coupling**, **testability**, and **flexibility**.  
- Widely used in frameworks like **Spring**, **Guice**, and **Jakarta EE**.  
