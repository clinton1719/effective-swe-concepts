---
title:  What is the Inversion of Control concept, how does Spring support IOC?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## What is Inversion of Control (IoC)?

**Inversion of Control (IoC)** is a design principle where the responsibility of **creating objects, managing their lifecycle, and injecting dependencies** is shifted from the application code to a framework or container.

- Traditionally, developers used the `new` keyword to create objects and wire dependencies manually.  
- With IoC, this **control is inverted**: the framework manages object creation, dependency wiring, and lifecycle.  
- In the Spring Framework, IoC is primarily achieved through **Dependency Injection (DI)**.

---

## How Spring Supports IoC

Spring provides an **IoC container** (e.g., `ApplicationContext`) that manages beans (objects).

### Steps:
1. Define components (beans) and their dependencies.  
2. Configure them in:
   - **XML configuration**, or
   - **Annotations** (e.g., `@Component`, `@Autowired`), or
   - **Java-based configuration** (`@Configuration`, `@Bean`).  
3. The container creates, wires, and manages beans at runtime.  

---

## Example with XML Configuration

```xml
<bean id="createNewStock"
      class="springexample.stockMarket.CreateNewStockAccount">
    <property name="newBid" ref="bidService"/>
</bean>

<bean id="bidService"
      class="springexample.stockMarket.BidService"/>
```

```java
public class CreateNewStockAccount {
    private BidService newBid;

    // Getter & Setter
    public void setNewBid(BidService newBid) {
        this.newBid = newBid;
    }
}
```

- Spring automatically **creates `BidService`** and injects it into `CreateNewStockAccount`.  
- No `new` keyword needed in the developer’s code.  

---

## Example with Annotations (Preferred in Modern Spring)

```java
@Component
public class BidService { }

@Component
public class CreateNewStockAccount {
    private final BidService bidService;

    @Autowired
    public CreateNewStockAccount(BidService bidService) {
        this.bidService = bidService;
    }
}
```

- `@Component` marks classes as beans.  
- `@Autowired` tells Spring to inject the dependency automatically.  

---

## 👉 Interview Tip

- IoC is the **general principle**.  
- **Dependency Injection (DI)** is the mechanism Spring uses to achieve IoC.  
- Emphasize that IoC improves **loose coupling, testability, and modularity** of applications.  

