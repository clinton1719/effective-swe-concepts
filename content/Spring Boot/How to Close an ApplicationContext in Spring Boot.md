---
title: How to Close an ApplicationContext in Spring Boot
tags: [spring, spring-boot, applicationcontext, bean-lifecycle]
difficulty: easy
date: 2026-09-30
---

## What Is the Preferred Way to Close an ApplicationContext?

If you create an `ApplicationContext` manually, the preferred approach is to **close it explicitly** when you are finished with it.

For example:

    AnnotationConfigApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);

    // Use the context

    context.close();

`AnnotationConfigApplicationContext` implements `ConfigurableApplicationContext`, which provides the `close()` method.

Closing the context allows Spring to:

- Stop managed lifecycle components.
- Invoke destruction callbacks such as `@PreDestroy`.
- Release resources held by Spring-managed beans.
- Publish the appropriate shutdown lifecycle events.

---

## Does Spring Boot Close the ApplicationContext Automatically?

**Yes.**

In a normal Spring Boot application, you generally **do not manually close the `ApplicationContext`**.

When you start the application with:

    SpringApplication.run(Application.class, args);

Spring Boot creates and manages the `ApplicationContext`.

For a typical web application, the JVM keeps running while the application is active.

When the application receives a normal shutdown signal, Spring Boot initiates a graceful shutdown and closes the application context.

This allows Spring to perform bean destruction and other shutdown processing.

---

## What Happens During Spring Boot Shutdown?

Conceptually:

    Application Running
           ↓
    Shutdown signal
           ↓
    Spring Boot initiates shutdown
           ↓
    ApplicationContext closes
           ↓
    Destruction callbacks
           ↓
    @PreDestroy
           ↓
    Resources released
           ↓
    Application terminates

For example:

    @Component
    public class PaymentService {

        @PreDestroy
        public void cleanup() {
            // Cleanup logic
        }
    }

During a normal application shutdown, Spring invokes the destruction callback.

---

## What If I Create the Context Manually?

If you manually create the context:

    ApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);

then you are responsible for its lifecycle.

You should close it:

    ((ConfigurableApplicationContext) context).close();

Or, preferably, keep the concrete/configurable type:

    ConfigurableApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);

    context.close();

---

## `try-with-resources`

Because `ConfigurableApplicationContext` implements `AutoCloseable`, you can also use try-with-resources when manually creating a context:

    try (ConfigurableApplicationContext context =
             new AnnotationConfigApplicationContext(AppConfig.class)) {

        // Use the context
    }

The context will automatically be closed when the block finishes.

This is particularly useful in tests or small standalone applications.

---

## What About Integration Tests?

In Spring integration tests, you normally **do not manually close the context**.

For example:

    @SpringBootTest
    class PaymentServiceTest {
    }

The Spring TestContext Framework manages the `ApplicationContext`.

It can also **cache and reuse contexts** between compatible tests.

Therefore, manually calling:

    context.close();

inside a test can interfere with Spring's test-context lifecycle and caching.

---

## Interview Answer

> If I create an `ApplicationContext` manually, I should close it explicitly using `close()` on a `ConfigurableApplicationContext`, or use try-with-resources. In a normal Spring Boot application, I don't usually close the context myself. Spring Boot manages the context lifecycle and closes it during a normal application shutdown, allowing Spring to execute destruction callbacks such as `@PreDestroy` and release resources.

## Common Interview Traps

### 1. Don't manually close a normal Spring Boot context

If Spring Boot created and manages the context, let Spring Boot manage its lifecycle.

### 2. `ApplicationContext` itself doesn't expose `close()`

The `close()` method comes from `ConfigurableApplicationContext`.

So this:

    ApplicationContext context = ...;

may require:

    ((ConfigurableApplicationContext) context).close();

But if you're creating the context yourself, it is cleaner to use the configurable type directly.

### 3. Normal shutdown matters

Spring Boot's automatic shutdown behavior applies when the application receives a normal shutdown signal. An abrupt process termination may prevent normal cleanup.

### 4. `@PreDestroy` is part of bean destruction

When the context closes, Spring invokes applicable destruction callbacks for managed beans.

---

## Easy Way to Remember

> **Manually created context → you close it.**

> **Spring Boot-created context → Spring Boot manages and closes it during normal shutdown.**

**Q1.** What exactly happens when `ApplicationContext.close()` is called?

**Q2.** How does Spring Boot perform graceful shutdown?

**Q3.** What is the difference between `@PreDestroy`, `DisposableBean.destroy()`, and a custom `destroyMethod`?
