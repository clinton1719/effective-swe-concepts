---
title: What is AOP and How is it Implemented in Spring?
tags: [java, spring, spring-boot, aop, aspect-oriented-programming]
difficulty: medium
date: 2026-09-19
---

## What is AOP?

**AOP (Aspect-Oriented Programming)** is a programming technique used to separate **cross-cutting concerns** from the application's core business logic.

A **cross-cutting concern** is functionality that is required across multiple classes or modules.

Common examples are:

- Logging
- Transaction management
- Security
- Auditing
- Performance monitoring
- Exception handling

Without AOP, the same logic may need to be repeated across many classes.

For example:

```text
Service A → Logging + Business Logic
Service B → Logging + Business Logic
Service C → Logging + Business Logic
```

With AOP:

```text
Service A → Business Logic
Service B → Business Logic
Service C → Business Logic

              ↑
           Logging
            Aspect
```

The logging logic is moved into a reusable **aspect**.

---

## What is an Aspect?

An **aspect** is a module that encapsulates a cross-cutting concern.

For example:

```text
LoggingAspect
    ↓
Logging behavior

SecurityAspect
    ↓
Security behavior

TransactionAspect
    ↓
Transaction behavior
```

The aspect defines **when** and **where** the additional behavior should be executed.

---

## Important AOP Terminology

### 1. Aspect

The cross-cutting functionality itself.

Example:

```text
LoggingAspect
```

---

### 2. Advice

The actual action that should be performed. It’s an implementation of an aspect; advice is inserted into an application at join points. Different types of advice include “around,” “before” and “after” advice

For example:

```text
Log before method execution
Log after method execution
Log when an exception occurs
```

Common types:

```text
@Before
@After
@AfterReturning
@AfterThrowing
@Around
```

---

### 3. Join Point

A point during program execution where an aspect can be applied. Similar to Object-oriented programming, AOP is another popular programming concept which complements OOP. A join point is an opportunity within the code for which we can apply an aspect. 

In Spring AOP, a join point is essentially a **method execution**.

For example:

```text
userService.createUser()
```

---

### 4. Pointcut

A rule that specifies **which methods should be intercepted**. It is a predicate that matches join points. A pointcut is something that defines what join-points advice should be applied.

For example:

```text
All methods inside the service package
```

Conceptually:

```text
execution(* com.example.service.*.*(..))
```

---

### 5. Weaving

The process of applying aspects to the target code.

Spring AOP performs this using **proxies at runtime** rather than modifying the original class's bytecode.

---

# How is AOP Implemented in Spring?

Spring AOP primarily uses the **Proxy Pattern**.

When Spring creates a bean that has an applicable aspect, Spring may create a proxy around that bean.

Conceptually:

```text
Client
  |
  ↓
Proxy
  |
  ├── Execute aspect logic
  |
  ↓
Actual Spring Bean
  |
  ↓
Business Logic
```

The client generally interacts with the **proxy**, not directly with the target object.

---

# JDK Dynamic Proxy vs CGLIB Proxy

Spring can create proxies mainly in two ways.

## 1. JDK Dynamic Proxy

JDK dynamic proxies work through **interfaces**.

Suppose:

```text
UserService
    ↑
UserServiceImpl
```

Spring can create:

```text
Client
  ↓
JDK Proxy
  ↓
UserServiceImpl
```

The proxy implements the same interface as the target.

---

## 2. CGLIB Proxy

CGLIB-based proxying works by creating a **subclass** of the target class.

Conceptually:

```text
UserService
    ↑
CGLIB Proxy
```

The proxy extends the target class and intercepts method calls.

Modern Spring commonly uses CGLIB-style subclass proxies when class-based proxying is required.

---

# Example of Spring AOP

Suppose we have:

```text
UserService
```

and we want to log every method execution.

Instead of writing:

```text
createUser()
    → log
    → business logic

deleteUser()
    → log
    → business logic

updateUser()
    → log
    → business logic
```

we can create a logging aspect.

Conceptually:

```text
LoggingAspect
        |
        | intercept
        ↓
+-------------------+
| UserService Proxy |
+-------------------+
        |
        ↓
+-------------------+
| UserService       |
| Business Logic    |
+-------------------+
```

The application calls:

```text
userService.createUser()
```

but the call may actually go through:

```text
Proxy
  ↓
Logging Aspect
  ↓
UserService.createUser()
```

---

# Example Using `@Aspect`

A Spring AOP aspect can be a regular Spring bean annotated with `@Aspect`.

Conceptually:

```text
@Aspect
@Component
class LoggingAspect {

    @Before(...)
    logBeforeMethod();
}
```

Spring detects the aspect and creates the appropriate proxy for beans whose methods match the pointcut.

---

# How the Call Flows

Suppose we have:

```text
UserController
      |
      ↓
UserService
```

and a logging aspect.

The actual execution can look like:

```text
UserController
      |
      ↓
UserService Proxy
      |
      ↓
@Before advice
      |
      ↓
Actual UserService
      |
      ↓
Business Logic
      |
      ↓
@After / @AfterReturning
```

The important idea is that the **proxy intercepts the method call** and executes the aspect's advice around the target method.

---

# Why Use AOP?

Without AOP:

```text
Service A
    ├── logging
    ├── transaction
    └── business logic

Service B
    ├── logging
    ├── transaction
    └── business logic

Service C
    ├── logging
    ├── transaction
    └── business logic
```

There is duplicated infrastructure code.

With AOP:

```text
             +----------------+
             | Logging Aspect |
             +----------------+
                     |
             +----------------+
             | Transaction    |
             | Aspect         |
             +----------------+
                     |
        ---------------------------
        |            |            |
    Service A    Service B    Service C
        |            |            |
    Business     Business     Business
     Logic        Logic        Logic
```

This keeps the business logic focused on its actual responsibility.

---

# Spring AOP vs AspectJ

A common interview question is the difference between **Spring AOP** and **AspectJ**.

### Spring AOP

```text
Proxy-based
Runtime interception
Primarily method execution join points
```

### AspectJ

```text
More powerful weaving
Compile-time / load-time weaving
Supports a broader set of join points
```

For typical Spring applications, Spring AOP is commonly used for concerns such as:

```text
@Transactional
@Cacheable
@PreAuthorize
custom logging
auditing
```

---

# Important Interview Point

Spring AOP is **proxy-based**.

So remember:

```text
Client
  ↓
Spring Proxy
  ↓
Aspect / Advice
  ↓
Target Bean
```

The target object itself is generally not modified to add the advice. Spring creates a proxy that intercepts calls to the target.

This also explains an important limitation:

> A method call made from one method to another method on the same object (`this.someMethod()`) generally bypasses the Spring proxy, so proxy-based advice such as `@Transactional` or a custom `@Aspect` may not be applied to that internal call.

---

## Interview-Friendly Answer

> **AOP, or Aspect-Oriented Programming, is a programming technique used to modularize cross-cutting concerns such as logging, security, auditing, and transaction management. The core construct is an aspect, which encapsulates behavior that affects multiple classes.**
>
> **In Spring, AOP is primarily implemented using runtime proxies. Spring creates a proxy around a target bean and intercepts method calls that match a pointcut. The proxy executes the required advice before, after, or around the target method. Spring can use JDK dynamic proxies for interface-based proxying and class-based proxies such as CGLIB when appropriate.**
>
> **So the basic flow is: Client → Spring Proxy → Advice/Aspect → Target Bean → Business Logic.**

---

## Key Takeaways

- **AOP** separates cross-cutting concerns from business logic.
- **Aspect** = module containing the cross-cutting behavior.
- **Advice** = action performed by the aspect.
- **Pointcut** = defines which methods should be intercepted.
- **Join point** = a point where the advice can be applied; in Spring AOP, primarily method execution.
- **Spring AOP is proxy-based.**
- Spring can use **JDK dynamic proxies** or **class-based proxies such as CGLIB**.
- The proxy intercepts method calls and executes the required advice.
- Common AOP use cases include **logging, transactions, security, caching, and auditing**.
- **Self-invocation** generally bypasses the Spring proxy.
