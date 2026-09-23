---
title: Dependency Injection in Spring
tags: [spring, dependency-injection, ioc]
difficulty: easy
date: 2026-09-23
---

## What is Dependency Injection?

Dependency Injection (DI) is a design pattern where an object receives the objects it depends on from an external source instead of creating those dependencies itself.

In simple words:

> Dependency Injection means **Spring creates and provides the required dependencies to a class instead of the class creating them itself.**

For example, suppose `OrderService` needs `PaymentService`.

Without Dependency Injection:

    class OrderService {

        private PaymentService paymentService = new PaymentService();

    }

Here, `OrderService` is responsible for creating its dependency.

With Dependency Injection:

    class OrderService {

        private final PaymentService paymentService;

        OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Now `OrderService` only declares what it needs. The dependency is provided from outside.

In Spring, the Spring IoC container is responsible for creating and providing these dependencies.

---

## Why Do We Need Dependency Injection?

Without DI, classes often create their own dependencies:

    OrderService
        ↓
    creates PaymentService
        ↓
    creates PaymentGateway
        ↓
    creates DatabaseClient

This creates **tight coupling** between classes.

With DI:

    Spring Container
          |
          +---- PaymentService
          |
          +---- PaymentGateway
          |
          +---- DatabaseClient
          |
          ↓
    OrderService receives required dependencies

The classes become less responsible for constructing their dependencies and can focus on their actual business logic.

---

## How Does Dependency Injection Work in Spring?

A simplified flow is:

    Application starts
          ↓
    Spring creates ApplicationContext
          ↓
    Spring discovers/registers beans
          ↓
    Spring identifies dependencies
          ↓
    Spring creates required beans
          ↓
    Spring injects dependencies
          ↓
    Application is ready

For example:

    @Service
    class PaymentService {
    }

    @Service
    class OrderService {

        private final PaymentService paymentService;

        OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Spring sees that `OrderService` requires `PaymentService`, finds the `PaymentService` bean, and supplies it through the constructor.

---

## Types of Dependency Injection

There are three commonly discussed types:

| Type                  | Description                                    |
| --------------------- | ---------------------------------------------- |
| Constructor Injection | Dependency is provided through the constructor |
| Setter Injection      | Dependency is provided through a setter method |
| Field Injection       | Dependency is injected directly into a field   |

### 1. Constructor Injection

    class OrderService {

        private final PaymentService paymentService;

        OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

This is generally the preferred approach in modern Spring applications.

### 2. Setter Injection

    class OrderService {

        private PaymentService paymentService;

        @Autowired
        void setPaymentService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

This can be useful when a dependency is optional or needs to be changed after object construction.

### 3. Field Injection

    class OrderService {

        @Autowired
        private PaymentService paymentService;
    }

It is simple but generally less preferred because the dependency is hidden in the class and makes the class harder to instantiate independently.

---

## Advantages of Dependency Injection

### 1. Loose Coupling

The class depends on an abstraction or externally supplied dependency rather than being responsible for creating a concrete implementation.

For example:

    class OrderService {

        private final PaymentService paymentService;

        OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

`OrderService` does not need to know how `PaymentService` is constructed.

---

### 2. Better Testability

DI makes unit testing easier because we can provide a mock or fake dependency.

For example:

    PaymentService mockPaymentService = ...;

    OrderService service =
        new OrderService(mockPaymentService);

The test does not need to create the real payment infrastructure.

---

### 3. Easier Maintenance

Suppose `OrderService` directly creates:

    new PaymentService()

Changing the implementation may require modifying `OrderService`.

With DI, we can change the implementation while keeping `OrderService` unchanged.

For example:

    PaymentService
        ↑
        |
    StripePaymentService

can later be replaced with:

    PaymentService
        ↑
        |
    PayPalPaymentService

The dependency can be supplied externally.

---

### 4. Promotes Single Responsibility

A class should focus on its business responsibility rather than constructing and managing all of its dependencies.

For example, `OrderService` should focus on order processing, not on figuring out how to construct a payment service, database client, logger, etc.

DI separates:

    Object construction
           from
    Business logic

---

### 5. Better Flexibility

Different implementations can be supplied depending on the environment or requirement.

For example:

    PaymentService
         ↑
         ├── StripePaymentService
         ├── PayPalPaymentService
         └── MockPaymentService

The consumer can depend on `PaymentService` while Spring decides which implementation to inject.

---

### 6. Centralized Object Management

Spring's IoC container manages the creation and lifecycle of Spring beans.

This can include:

- Object creation
- Dependency resolution
- Bean lifecycle
- Configuration
- Scope management

The application classes therefore do not need to manually manage all these dependencies.

---

## Dependency Injection vs Inversion of Control

These concepts are closely related but not identical.

### Inversion of Control

IoC is the broader principle where control over object creation and dependency management is transferred from application code to a framework/container.

### Dependency Injection

DI is one way of implementing IoC.

A useful interview statement is:

> **IoC is the principle; Dependency Injection is a technique used to achieve IoC.**

---

## Dependency Injection vs Creating Objects with `new`

| Direct Object Creation            | Dependency Injection                  |
| --------------------------------- | ------------------------------------- |
| Class creates its dependency      | Dependency is provided externally     |
| More tightly coupled              | Loosely coupled                       |
| Harder to mock                    | Easier to test                        |
| Construction logic is distributed | Construction can be managed centrally |
| Less flexible                     | More flexible                         |

---

## Important Interview Points

- Dependency Injection means providing an object's dependencies from outside rather than having the object create them itself.
- Spring's IoC container manages dependency injection.
- Constructor injection is generally preferred for required dependencies.
- Setter injection can be useful for optional dependencies.
- Field injection is generally discouraged in modern Spring applications.
- DI promotes loose coupling and improves testability.
- DI and IoC are related but not synonymous.
- DI does not mean that Spring is the only way to implement dependency injection. DI is a general design pattern; Spring provides a framework for implementing it.
- Constructor injection also makes required dependencies explicit and allows fields to be `final`.
- If multiple beans match the same dependency type, Spring may need additional configuration such as `@Qualifier` or `@Primary`.

## Key Takeaway

The easiest way to remember Dependency Injection is:

    Without DI:

    Class → creates dependency

    With DI:

    Spring Container → creates dependency
                         ↓
                       injects
                         ↓
                       Class

The main benefit is **loose coupling**: a class focuses on what it needs rather than how to create it.

**Q1.** Why is constructor injection generally preferred over field injection in Spring?

**Q2.** How does Spring decide which bean to inject when multiple implementations of the same interface exist?

**Q3.** What is the difference between Dependency Injection, Inversion of Control, and the Spring IoC container?
