---
title: Lifecycle of a Spring Bean in an ApplicationContext
tags: [java, spring, spring-bean, applicationcontext, bean-lifecycle]
difficulty: medium
date: 2026-09-28
---

## What Is the Spring Bean Lifecycle?

The **Spring Bean lifecycle** describes the sequence of steps Spring follows from the time a bean is created until it is destroyed.

The `ApplicationContext` manages this entire lifecycle.

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

First, Spring discovers the bean definition.

This can come from:

- `@Component`, `@Service`, `@Repository`, `@Controller`
- `@Bean`
- XML configuration
- Other configuration mechanisms

For example:

    @Component
    public class PaymentService {
    }

During component scanning, Spring registers `PaymentService` as a bean definition in the `ApplicationContext`.

At this stage, Spring knows **how the bean should be created**, but the bean object may not have been instantiated yet.

---

## 2. Bean Instantiation

Spring creates an instance of the bean.

Conceptually:

    PaymentService paymentService = new PaymentService();

Spring performs this itself using the bean definition.

For singleton beans, this normally happens during application startup, although lazy initialization can change when the bean is instantiated.

---

## 3. Dependency Injection

Spring injects the bean's dependencies.

For example:

    @Service
    public class PaymentService {

        private final PaymentRepository repository;

        public PaymentService(PaymentRepository repository) {
            this.repository = repository;
        }
    }

Spring finds the required `PaymentRepository` bean and provides it to `PaymentService`.

This is where **Dependency Injection** happens.

---

## 4. Aware Interfaces

If the bean implements certain Spring `Aware` interfaces, Spring provides additional container-related information.

Examples:

- `BeanNameAware`
- `BeanFactoryAware`
- `ApplicationContextAware`

For example, an `ApplicationContextAware` bean can receive a reference to the `ApplicationContext`.

These callbacks are useful in special cases, but normal application code should generally prefer dependency injection.

---

## 5. BeanPostProcessor - Before Initialization

Spring invokes registered `BeanPostProcessor`s before the bean's initialization callbacks.

Conceptually:

    postProcessBeforeInitialization(bean, beanName)

This mechanism allows Spring and applications/frameworks to perform additional processing on beans.

---

## 6. Initialization

Spring then invokes the bean's initialization callbacks.

There are several ways to define initialization logic.

### `@PostConstruct`

    @PostConstruct
    public void initialize() {
        // initialization logic
    }

This is commonly used in modern Spring applications.

### `InitializingBean`

A bean can implement:

    InitializingBean

and provide initialization logic through its `afterPropertiesSet()` method.

### Custom `initMethod`

Initialization can also be specified through configuration.

For example, with `@Bean`:

    @Bean(initMethod = "initialize")
    public PaymentService paymentService() {
        return new PaymentService();
    }

---

## 7. BeanPostProcessor - After Initialization

After initialization callbacks, Spring invokes:

    postProcessAfterInitialization(bean, beanName)

This step is particularly important because Spring can return a **wrapped/proxied object** instead of the original object.

For example, Spring AOP may create a proxy for features such as:

- `@Transactional`
- `@Async`
- security
- caching

So the object ultimately stored/exposed by the container may be a proxy around the original bean.

---

## 8. Bean Is Ready

The bean is now fully initialized and available for use.

Other beans can obtain and use it through dependency injection.

For a singleton bean, Spring normally keeps the bean instance in the `ApplicationContext` and reuses that instance.

---

## 9. ApplicationContext Shutdown

When the `ApplicationContext` is closed, Spring begins destroying beans that require destruction callbacks.

For example:

    context.close();

For a Spring Boot application, this generally happens as part of graceful application shutdown.

---

## 10. Destruction

Spring invokes destruction callbacks.

### `@PreDestroy`

    @PreDestroy
    public void cleanup() {
        // cleanup logic
    }

### `DisposableBean`

A bean can implement:

    DisposableBean

and provide cleanup logic through `destroy()`.

### Custom `destroyMethod`

A custom destruction method can also be configured.

---

# Complete Lifecycle

A good way to remember the lifecycle is:

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
    11. ApplicationContext shutdown
           ↓
    12. @PreDestroy
           ↓
    13. destroy()
           ↓
    14. Custom destroy method

The exact callbacks involved depend on how the bean is configured.

---

## Where Does `BeanPostProcessor` Fit?

This is an important interview topic.

`BeanPostProcessor` provides hooks around bean initialization:

    Before Initialization
            ↓
    @PostConstruct / other init callbacks
            ↓
    After Initialization

It can inspect, modify, wrap, or replace a bean.

This is one of the mechanisms Spring uses to implement framework features such as proxies and AOP.

---

## Important Interview Point: Singleton vs Prototype

The lifecycle is also affected by the bean scope.

### Singleton

Spring creates and manages the bean for the entire `ApplicationContext` lifecycle.

When the context shuts down, Spring invokes destruction callbacks for singleton beans.

### Prototype

Spring creates a new instance every time the bean is requested.

Spring performs initialization callbacks for prototype beans, but it generally **does not manage their destruction**.

So if you create a prototype bean, Spring does not automatically invoke its destruction callbacks when the `ApplicationContext` shuts down.

---

## Interview Answer

> The Spring bean lifecycle starts when Spring registers the bean definition and then instantiates the bean. Spring injects its dependencies, invokes any `Aware` callbacks, runs `BeanPostProcessor` before-initialization logic, executes initialization callbacks such as `@PostConstruct`, and then runs `BeanPostProcessor` after-initialization logic. At this point the bean is ready to use. When the `ApplicationContext` is closed, Spring invokes destruction callbacks such as `@PreDestroy` for managed singleton beans.

## Common Interview Traps

| Question                                                      | Correct Understanding                       |
| ------------------------------------------------------------- | ------------------------------------------- |
| Does Spring manage every Java object?                         | No, only objects registered as Spring beans |
| Does DI happen before initialization?                         | Yes                                         |
| Where does `@PostConstruct` run?                              | During bean initialization                  |
| Does `BeanPostProcessor` run before and after initialization? | Yes                                         |
| Does `@PreDestroy` run when the context closes?               | For managed singleton beans, yes            |
| Does Spring automatically destroy prototype beans?            | No                                          |
| Is `@PostConstruct` called before dependency injection?       | No, dependencies are injected first         |
| Can Spring return a proxy instead of the original bean?       | Yes, for example through AOP                |

## One-Line Memory Trick

> **Create → Inject → Aware → Before Init → Initialize → After Init → Use → Destroy**

**Q1.** What exactly is the difference between `@PostConstruct`, `InitializingBean`, and `initMethod`?

**Q2.** What is the role of `BeanPostProcessor` in Spring AOP?

**Q3.** What is the difference between singleton and prototype bean scopes in Spring?
