---
title: Difference Between Constructor and Setter Injection in Spring
tags: [spring, dependency-injection, spring-boot]
difficulty: easy
date: 2026-10-13
---

## What Is Dependency Injection?

Dependency Injection (DI) is a technique in which Spring provides an object with the dependencies it needs instead of the object creating those dependencies itself.

Spring supports two common injection methods: **constructor injection** and **setter injection**.

## 1. Constructor Injection

In constructor injection, dependencies are provided through the class constructor when the object is created.

Example:

    @Service
    public class OrderService {

        private final PaymentService paymentService;

        public OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Spring supplies the `PaymentService` dependency when creating `OrderService`.

### Key points

- Best for **mandatory dependencies**.
- Allows fields to be declared `final`.
- Ensures required dependencies are provided during object creation.
- Makes unit testing easier because dependencies can be passed directly.
- Helps create objects that are fully initialized and easier to keep immutable.

**Note:** If a Spring bean has only one constructor, `@Autowired` is not required on that constructor.

## 2. Setter Injection

In setter injection, dependencies are provided through setter methods after the object has been constructed.

Example:

    @Service
    public class OrderService {

        private PaymentService paymentService;

        @Autowired
        public void setPaymentService(
                PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Spring creates the `OrderService` object and then calls the setter to inject `PaymentService`.

### Key points

- Suitable for **optional dependencies**.
- Allows a dependency to be changed after object creation.
- Supports reconfiguration when that is genuinely needed.
- Does not guarantee that the dependency is available immediately after the constructor finishes.

## Constructor Injection vs Setter Injection

| Feature             | Constructor Injection                                    | Setter Injection                                                        |
| ------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| Injection timing    | During object creation                                   | After object creation                                                   |
| Best suited for     | Mandatory dependencies                                   | Optional dependencies                                                   |
| `final` fields      | Supported                                                | Not supported for the injected field                                    |
| Immutability        | Easier to achieve                                        | Harder to maintain                                                      |
| Missing dependency  | Usually fails during construction                        | May remain unset if not required or configured                          |
| Reconfiguration     | Not directly supported                                   | Possible through the setter                                             |
| Unit testing        | Pass dependencies to constructor                         | Create object, then call setter                                         |
| Recommended use     | Default choice for required dependencies                 | Optional or changeable dependencies                                     |
| Cyclic dependencies | Not possible, since it throws exception at start up time | Possible, since objects are created only when setter methods are called |

## Which One Should You Prefer?

**Constructor injection is generally recommended in modern Spring applications.**

It makes required dependencies explicit, supports immutability, and helps prevent partially initialized objects.

Use setter injection when a dependency is genuinely optional or needs to be reconfigured after construction.

### Interview Tip

Constructor injection is preferred for mandatory dependencies because it ensures they are supplied when the object is created. Setter injection is useful for optional dependencies because they can be configured after object creation.

However, setter injection does not automatically make a dependency optional. The application must also be configured to allow that dependency to be absent.

## Follow-up Questions

**Q1.** Why does constructor injection help prevent circular dependencies?

**Q2.** Can Spring inject multiple dependencies through a single constructor?

**Q3.** What is field injection, and why is it generally discouraged?
