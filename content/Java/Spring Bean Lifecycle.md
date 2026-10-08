---
title: Spring Bean Lifecycle
tags: [java, spring, spring-boot, bean-lifecycle, ioc]
difficulty: medium
date: 2026-10-08
---

## What Is the Spring Bean Lifecycle?

The **Spring Bean lifecycle** is the sequence of steps Spring follows from creating a bean to destroying it.

The `ApplicationContext` manages this lifecycle.

The simplified lifecycle is:

    Bean Definition
          ↓
    Bean Instantiation
          ↓
    Dependency Injection
          ↓
    Aware Callbacks
          ↓
    BeanPostProcessor - Before Initialization
          ↓
    Initialization
          ↓
    BeanPostProcessor - After Initialization
          ↓
    Bean Ready / In Use
          ↓
    ApplicationContext Shutdown
          ↓
    Destruction

---

## 1. Bean Definition

First, Spring needs to know that the class should be managed as a bean.

A bean can be registered using:

    @Component
    @Service
    @Repository
    @Controller

or:

    @Bean

or through XML/configuration mechanisms.

For example:

    @Service
    public class PaymentService {
    }

Component scanning discovers the class and registers its **bean definition** in the `ApplicationContext`.

A bean definition contains information about how Spring should create and configure the bean.

---

## 2. Bean Instantiation

Spring creates the actual object.

Conceptually:

    PaymentService paymentService =
        new PaymentService();

The exact mechanism depends on how the bean is configured, but the important point is that Spring creates the object rather than application code managing its lifecycle.

---

## 3. Dependency Injection

After instantiation, Spring injects the bean's dependencies.

For example:

    @Service
    public class PaymentService {

        private final PaymentRepository repository;

        public PaymentService(PaymentRepository repository) {
            this.repository = repository;
        }
    }

Spring finds the `PaymentRepository` bean and supplies it to `PaymentService`.

So:

    Instantiate PaymentService
            ↓
    Resolve PaymentRepository
            ↓
    Inject PaymentRepository

---

## 4. Aware Callbacks

If the bean implements certain Spring `Aware` interfaces, Spring provides container-related information to the bean.

Examples include:

    BeanNameAware
    BeanFactoryAware
    ApplicationContextAware

For example:

    public class PaymentService
            implements ApplicationContextAware {

        @Override
        public void setApplicationContext(
                ApplicationContext context) {
            // Spring provides the ApplicationContext
        }
    }

These interfaces are useful in special cases, but normal application code should generally prefer dependency injection.

---

## 5. BeanPostProcessor - Before Initialization

Spring invokes registered `BeanPostProcessor`s before the bean's initialization callbacks.

Conceptually:

    postProcessBeforeInitialization(bean, beanName)

This gives Spring and other framework components an opportunity to process the bean.

---

## 6. Initialization

Spring now invokes the bean's initialization callbacks.

There are several ways to define initialization logic.

### `@PostConstruct`

This is a common approach:

    @PostConstruct
    public void initialize() {
        // initialization logic
    }

### `InitializingBean`

A bean can implement:

    InitializingBean

and provide initialization logic in:

    afterPropertiesSet()

### Custom `initMethod`

You can also specify a custom initialization method:

    @Bean(initMethod = "initialize")
    public PaymentService paymentService() {
        return new PaymentService();
    }

---

## 7. BeanPostProcessor - After Initialization

After initialization callbacks, Spring invokes:

    postProcessAfterInitialization(bean, beanName)

This step is important because Spring can wrap the bean with a proxy.

For example, Spring AOP may create a proxy for:

- `@Transactional`
- `@Async`
- `@Cacheable`
- Security-related functionality

Therefore, the object exposed by the Spring container may be a **proxy around the original bean**.

---

## 8. Bean Is Ready

At this point, the bean is fully initialized and available for use.

For a singleton bean, Spring normally stores the instance in the `ApplicationContext` and reuses it when the bean is requested.

---

## 9. ApplicationContext Shutdown

When the `ApplicationContext` is closed, Spring begins destroying beans that it manages.

For example:

    context.close();

In a normal Spring Boot application, this happens as part of application shutdown.

---

## 10. Bean Destruction

Spring invokes the bean's destruction callbacks.

### `@PreDestroy`

    @PreDestroy
    public void cleanup() {
        // cleanup logic
    }

### `DisposableBean`

A bean can implement:

    DisposableBean

and provide cleanup logic in:

    destroy()

### Custom `destroyMethod`

A custom destruction method can also be configured.

---

# Complete Lifecycle

A good interview sequence to remember is:

    1. Bean Definition
           ↓
    2. Instantiation
           ↓
    3. Dependency Injection
           ↓
    4. Aware Callbacks
           ↓
    5. postProcessBeforeInitialization()
           ↓
    6. @PostConstruct
           ↓
    7. afterPropertiesSet()
           ↓
    8. Custom init method
           ↓
    9. postProcessAfterInitialization()
           ↓
    10. Bean Ready
           ↓
    11. ApplicationContext Shutdown
           ↓
    12. @PreDestroy
           ↓
    13. destroy()
           ↓
    14. Custom destroy method

Not every bean uses every callback. The actual steps depend on how the bean is configured.

---

## Where Does `BeanPostProcessor` Fit?

This is a common interview question.

`BeanPostProcessor` provides hooks around bean initialization:

    Bean Instantiation
          ↓
    Dependency Injection
          ↓
    Before Initialization
          ↓
    Initialization Callbacks
          ↓
    After Initialization
          ↓
    Bean Ready

It can inspect, modify, wrap, or replace a bean.

This mechanism is heavily used by Spring to implement framework features such as AOP and proxies.

---

## Important: Singleton vs Prototype

The destruction phase depends on the bean scope.

### Singleton

Spring manages the bean for the lifetime of the `ApplicationContext`.

When the context is closed, Spring invokes applicable destruction callbacks.

### Prototype

Spring creates a new instance whenever the prototype bean is requested from the container.

Spring performs initialization callbacks for prototype beans, but generally does **not** manage their destruction.

Therefore, Spring does not automatically invoke destruction callbacks for prototype beans when the `ApplicationContext` shuts down.

---

## Example

Consider:

    @Service
    public class PaymentService {

        private final PaymentRepository repository;

        public PaymentService(PaymentRepository repository) {
            this.repository = repository;
        }

        @PostConstruct
        public void initialize() {
            // Initialization
        }

        @PreDestroy
        public void cleanup() {
            // Cleanup
        }
    }

The lifecycle is roughly:

    PaymentService bean definition
              ↓
    PaymentService instantiated
              ↓
    PaymentRepository injected
              ↓
    @PostConstruct
              ↓
    BeanPostProcessor after initialization
              ↓
    PaymentService ready
              ↓
    ApplicationContext closes
              ↓
    @PreDestroy
              ↓
    Bean destroyed

---

## Interview Answer

> The Spring Bean lifecycle starts with bean definition and instantiation. Spring then injects dependencies, invokes applicable `Aware` callbacks, runs `BeanPostProcessor` before-initialization logic, executes initialization callbacks such as `@PostConstruct`, and then runs `BeanPostProcessor` after-initialization logic. The bean is then ready for use. When the `ApplicationContext` shuts down, Spring invokes destruction callbacks such as `@PreDestroy` for managed singleton beans.

## Easy Way to Remember

> **Create → Inject → Aware → Before Init → Initialize → After Init → Use → Destroy**

## Common Interview Traps

1. **`@PostConstruct` happens after dependency injection**, not before.

2. **`BeanPostProcessor` runs around initialization**, with before and after hooks.

3. **`@PreDestroy` is part of bean destruction**, not initialization.

4. **Prototype beans are generally not destroyed automatically by Spring.**

5. **Spring may expose a proxy instead of the original bean**, especially when features such as AOP are involved.

6. **Not every bean goes through every callback.** The callbacks depend on the bean's configuration and implemented interfaces.

**Q1.** What is the exact difference between `@PostConstruct`, `InitializingBean`, and `initMethod`?

**Q2.** What is the role of `BeanPostProcessor` in Spring AOP?

**Q3.** What happens to a prototype bean during the destruction phase?