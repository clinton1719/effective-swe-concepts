---
title: ApplicationContext in Spring
tags: [java, spring, applicationcontext, ioc, dependency-injection]
difficulty: medium
date: 2026-09-24
---

## What is ApplicationContext?

`ApplicationContext` is the **central container in the Spring Framework** that manages Spring beans and provides the infrastructure needed for Dependency Injection and other Spring features.

In simple terms:

> `ApplicationContext` is the Spring IoC container that creates, configures, manages, and provides beans to the application.

For example:

    ApplicationContext
          |
          +── UserService bean
          +── UserRepository bean
          +── PaymentService bean
          +── Controller bean
          +── Configuration
          +── Events
          +── Resources

When a Spring application starts, the `ApplicationContext` is created and Spring uses it to manage the application's objects.

---

## Why Do We Need ApplicationContext?

Without a Spring container, we would need to manually create and connect objects:

    UserRepository repository = new UserRepository();
    UserService service = new UserService(repository);
    UserController controller = new UserController(service);

As the application grows, manually managing these dependencies becomes difficult.

With Spring:

    ApplicationContext
          |
          +── creates UserRepository
          |
          +── creates UserService
          |       ↓
          |   injects UserRepository
          |
          +── creates UserController
                  ↓
              injects UserService

The container manages these relationships for us.

---

## How Does ApplicationContext Work?

A simplified startup flow is:

    Spring Application starts
            ↓
    ApplicationContext is created
            ↓
    Configuration is processed
            ↓
    Component scanning happens
            ↓
    Bean definitions are registered
            ↓
    Beans are created
            ↓
    Dependencies are resolved
            ↓
    Bean lifecycle callbacks are executed
            ↓
    Application is ready

For example:

    @Service
    class UserService {
    }

    @Repository
    class UserRepository {
    }

Spring discovers these components, registers them as beans, creates their instances, and manages them through the `ApplicationContext`.

---

## ApplicationContext and Dependency Injection

One of the most important responsibilities of `ApplicationContext` is resolving dependencies.

Suppose:

    @Service
    class OrderService {

        private final PaymentService paymentService;

        OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

When Spring creates `OrderService`, the `ApplicationContext` finds the appropriate `PaymentService` bean and provides it through the constructor.

Conceptually:

    ApplicationContext
          |
          +── PaymentService
          |
          ↓
    OrderService(PaymentService)

This is Dependency Injection managed by the Spring container.

---

## ApplicationContext vs BeanFactory

`ApplicationContext` extends `BeanFactory`.

A useful way to remember the relationship is:

    BeanFactory
        ↑
    ApplicationContext

`BeanFactory` provides the basic IoC container functionality.

`ApplicationContext` provides the BeanFactory functionality plus additional enterprise-oriented features.

| Feature                          | BeanFactory | ApplicationContext |
| -------------------------------- | ----------- | ------------------ |
| Bean creation                    | Yes         | Yes                |
| Dependency Injection             | Yes         | Yes                |
| Bean lifecycle management        | Yes         | Yes                |
| Internationalization             | Basic/No    | Yes                |
| Application events               | No          | Yes                |
| Resource loading                 | Basic       | Yes                |
| Integration with Spring features | Basic       | Extensive          |
| Commonly used directly           | Less common | Yes                |

In modern Spring applications, `ApplicationContext` is generally the container you interact with.

---

## ApplicationContext in Spring Boot

In Spring Boot, you usually don't create the `ApplicationContext` manually.

For example:

    @SpringBootApplication
    public class Application {

        public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
        }
    }

`SpringApplication.run()` starts the Spring application and creates/configures the appropriate `ApplicationContext`.

Conceptually:

    SpringApplication.run()
            ↓
    Creates ApplicationContext
            ↓
    Loads configuration
            ↓
    Performs component scanning
            ↓
    Creates and configures beans
            ↓
    Starts the application

The exact `ApplicationContext` implementation depends on the type of Spring application being started.

---

## Getting a Bean from ApplicationContext

Although Dependency Injection is generally preferred, we can explicitly retrieve a bean from the context.

For example:

    ApplicationContext context = ...;

    UserService service =
        context.getBean(UserService.class);

Spring returns the managed `UserService` bean.

However, application classes generally should not repeatedly call `getBean()` to obtain their dependencies.

Prefer:

    class OrderService {

        private final UserService userService;

        OrderService(UserService userService) {
            this.userService = userService;
        }
    }

This keeps Dependency Injection explicit and reduces coupling to the Spring container.

---

## What Does ApplicationContext Manage?

`ApplicationContext` manages much more than simply creating objects.

Important responsibilities include:

### 1. Bean Management

It creates and manages Spring beans.

    @Component
    class UserService {
    }

### 2. Dependency Injection

It resolves dependencies between beans.

    OrderService
          ↓
    PaymentService

### 3. Bean Lifecycle

It manages various stages of a bean's lifecycle, including initialization and destruction callbacks.

### 4. Configuration

It processes configuration from sources such as:

- `@Configuration`
- `@Bean`
- `application.properties`
- `application.yml`
- Component scanning

### 5. Application Events

Spring supports an event mechanism through the application context.

For example:

    ApplicationEventPublisher

A component can publish an event, and other components can listen for it.

### 6. Internationalization

`ApplicationContext` provides support for resolving messages for different locales through Spring's message-source infrastructure.

### 7. Resource Loading

It provides abstractions for accessing resources such as files and classpath resources.

---

## ApplicationContext and Component Scanning

These concepts are closely related but different.

**Component scanning** discovers candidate Spring components.

**ApplicationContext** manages the resulting beans and the overall application container.

For example:

    @Service
    class UserService {
    }

The process is roughly:

    Component Scanning
          ↓
    Finds UserService
          ↓
    Bean definition registered
          ↓
    ApplicationContext
          ↓
    Creates/manages UserService bean

So:

> Component scanning is one mechanism used to populate the ApplicationContext.

---

## ApplicationContext and IoC Container

In Spring terminology, `ApplicationContext` is an implementation of the **IoC container abstraction**.

A useful interview explanation is:

    IoC
     ↓
    Principle
     ↓
    Spring Container
     ↓
    ApplicationContext
     ↓
    Manages beans + dependencies + application infrastructure

Do not think of `ApplicationContext` as simply another name for Dependency Injection.

- **IoC** → broader principle
- **DI** → technique for implementing IoC
- **ApplicationContext** → Spring's feature-rich IoC container

---

## Important Interview Points

- `ApplicationContext` is the central Spring IoC container.
- It manages Spring beans and their dependencies.
- It extends `BeanFactory`.
- It provides features beyond basic bean management, such as application events, resource loading, and internationalization.
- Component scanning discovers components that can become beans in the context.
- `@Bean` methods also contribute bean definitions to the context.
- In Spring Boot, `SpringApplication.run()` creates and initializes the application context.
- `getBean()` can retrieve a bean, but normal application code should generally prefer Dependency Injection.
- The context manages bean lifecycle as well as dependency resolution.
- `ApplicationContext` itself is not a single bean; it is the container that manages beans.
- A Spring application can have different types of `ApplicationContext` depending on the application environment.

## Common Interview Question

**Q: Is ApplicationContext responsible for creating all Java objects?**

No.

It manages **Spring beans**.

Objects created with ordinary `new` statements are not automatically managed by the Spring container.

For example:

    UserService service = new UserService();

If this object is created manually, Spring does not automatically manage it as a bean.

Whereas:

    @Service
    class UserService {
    }

allows Spring to discover and manage the class when component scanning is configured appropriately.

## Key Takeaway

Think of `ApplicationContext` as the **central manager of a Spring application**:

    ApplicationContext
          |
          +── Discover/register beans
          |
          +── Create beans
          |
          +── Resolve dependencies
          |
          +── Manage bean lifecycle
          |
          +── Publish application events
          |
          +── Load resources/configuration
          |
          +── Provide other Spring infrastructure

The simplest interview answer is:

> `ApplicationContext` is Spring's feature-rich IoC container. It creates and manages beans, resolves their dependencies, manages their lifecycle, and provides additional application-level features such as events, resource loading, and internationalization.

**Q1.** What exactly happens inside `ApplicationContext` during Spring Boot startup, from `main()` to bean creation?

**Q2.** What is the difference between `ApplicationContext`, `BeanFactory`, and the Spring IoC container?

**Q3.** How does Spring resolve and inject a dependency when multiple beans of the same type exist?
