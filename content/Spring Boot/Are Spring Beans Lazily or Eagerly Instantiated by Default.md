---
title: Are Spring Beans Lazily or Eagerly Instantiated by Default?
tags: [spring, spring-boot, bean-lifecycle, lazy-initialization]
difficulty: medium
date: 2026-10-02
---

## Are Spring Beans Lazily or Eagerly Instantiated by Default?

For **singleton-scoped beans**, Spring's default behavior is **eager initialization**.

This means Spring normally creates singleton beans when the `ApplicationContext` is initialized, rather than waiting until the bean is first requested.

For example:

    @Service
    public class PaymentService {
    }

When the application context starts:

    ApplicationContext starts
            ↓
    Finds PaymentService
            ↓
    Creates PaymentService
            ↓
    Bean is ready

It does not normally wait for:

    context.getBean(PaymentService.class);

---

## How Do You Enable Lazy Initialization?

You can use the `@Lazy` annotation.

### On a specific bean

    @Lazy
    @Service
    public class PaymentService {
    }

Now Spring delays creating the bean until it is actually needed.

Conceptually:

    ApplicationContext starts
            ↓
    PaymentService NOT created
            ↓
    Some bean requests PaymentService
            ↓
    PaymentService created
            ↓
    Bean is used

You can also use:

    @Lazy
    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }

---

## `@Lazy` on a Dependency

`@Lazy` can also be used on an injection point to request lazy resolution of a dependency.

For example:

    @Service
    public class OrderService {

        private final PaymentService paymentService;

        public OrderService(@Lazy PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

This can be useful when you specifically want to delay initialization of that dependency.

---

## Enable Lazy Initialization Globally in Spring Boot

Spring Boot provides a configuration property:

    spring.main.lazy-initialization=true

This enables lazy initialization for beans across the application, subject to Spring's configuration and bean behavior.

You can put it in:

    application.properties

For example:

    spring.main.lazy-initialization=true

Now singleton beans are generally created when they are first needed rather than all being created during application startup.

---

## What About Prototype Beans?

Prototype beans behave differently.

A prototype bean is created when the container is asked for it.

For example:

    @Scope("prototype")
    @Component
    public class ReportGenerator {
    }

Each request for the bean can result in a new instance:

    context.getBean(ReportGenerator.class)
        ↓
    Instance A

    context.getBean(ReportGenerator.class)
        ↓
    Instance B

So the eager/lazy distinction discussed above primarily applies to **singleton beans**.

---

## Why Would You Use Lazy Initialization?

### Advantages

Lazy initialization can:

- Reduce application startup time.
- Avoid creating beans that are never used.
- Delay expensive initialization until required.
- Sometimes reduce startup resource usage.

### Disadvantages

The first request for a lazy bean may experience additional latency.

Also, configuration or dependency problems that would have been detected during startup may only appear when the bean is first requested.

For example:

    Application starts successfully
            ↓
    Lazy bean is not created
            ↓
    Later, application requests bean
            ↓
    Bean creation fails
            ↓
    Error occurs at runtime

With eager initialization, the same problem would generally be detected during application startup.

---

## Eager vs Lazy

| Feature                     | Eager                         | Lazy                    |
| --------------------------- | ----------------------------- | ----------------------- |
| Bean creation               | During context initialization | When first needed       |
| Startup time                | Potentially higher            | Potentially lower       |
| First-use latency           | Usually lower                 | Potentially higher      |
| Configuration errors        | Often detected at startup     | May be detected later   |
| Default for singleton beans | Yes                           | No                      |
| Enable                      | Default behavior              | `@Lazy` / Boot property |

---

## Important Interview Trap

Don't say:

> "All Spring beans are eagerly initialized by default."

The more accurate answer is:

> **Singleton beans are eagerly initialized by default.**

Prototype beans are created when requested, and lazy initialization can explicitly change the behavior of singleton beans.

Also, Spring Boot's global lazy-initialization setting can change the default behavior across the application.

---

## Interview Answer

> By default, Spring eagerly initializes singleton-scoped beans when the `ApplicationContext` is created. We can make a specific bean lazy using `@Lazy`, or enable lazy initialization more broadly in Spring Boot using `spring.main.lazy-initialization=true`. Prototype beans are created when requested from the container. Lazy initialization can reduce startup time, but it can also move bean-creation failures from startup to first use.

## Easy Way to Remember

    Singleton
       ↓
    Eager by default
       ↓
    @Lazy → Create when needed

    Prototype
       ↓
    Created when requested

**Q1.** What exactly happens when a lazy bean is injected into an eager singleton?

**Q2.** How does `@Lazy` help resolve circular dependencies?

**Q3.** What is the difference between lazy initialization and prototype scope?
