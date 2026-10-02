---
title: Dependency Injection with @Autowired, Component Scanning, Stereotypes, and Spring Bean Scopes
tags:
  [
    spring,
    spring-boot,
    dependency-injection,
    component-scanning,
    stereotypes,
    bean-scopes,
  ]
difficulty: medium
date: 2026-10-02
---

## 1. What is Dependency Injection using `@Autowired`?

**Dependency Injection (DI)** means that an object receives the objects it depends on from an external source instead of creating them itself.

Spring's `ApplicationContext` acts as the IoC container that creates and wires these objects.

For example, suppose `OrderService` depends on `PaymentService`:

    @Service
    public class OrderService {

        private final PaymentService paymentService;

        @Autowired
        public OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Spring sees that `OrderService` requires a `PaymentService` and provides the corresponding bean.

The dependency flow is:

    ApplicationContext
          |
          +---- PaymentService bean
          |
          +---- OrderService bean
                    |
                    +---- PaymentService injected

---

## `@Autowired` and Constructor Injection

`@Autowired` can be used on:

- Constructor
- Setter method
- Field

### Constructor Injection

    @Autowired
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

In modern Spring, if a class has **only one constructor**, `@Autowired` is not required.

So this is sufficient:

    @Service
    public class OrderService {

        private final PaymentService paymentService;

        public OrderService(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

Constructor injection is generally preferred because:

- Dependencies are explicit.
- Dependencies can be `final`.
- The object cannot be created without required dependencies.
- It is easier to test.
- It helps prevent partially initialized objects.

---

## 2. What is Component Scanning?

**Component scanning** is the process by which Spring automatically searches specified packages for classes that are configured as Spring components and registers them as beans.

Common component annotations include:

    @Component
    @Service
    @Repository
    @Controller
    @RestController

For example:

    @Service
    public class PaymentService {
    }

Spring's component scanning discovers `PaymentService` and registers it as a bean in the `ApplicationContext`.

---

## How Does Component Scanning Work in Spring Boot?

`@SpringBootApplication` includes:

    @Configuration
    @EnableAutoConfiguration
    @ComponentScan

Therefore, when we write:

    @SpringBootApplication
    public class Application {
    }

Spring Boot performs component scanning starting from the package containing the application class and scans its subpackages by default.

For example:

    com.example
    ├── Application.java
    ├── service
    │   └── PaymentService.java
    └── repository
        └── PaymentRepository.java

If `Application` is in `com.example`, Spring will automatically scan the subpackages.

---

## 3. What Are Spring Stereotypes?

**Stereotype annotations** indicate the role or responsibility of a class in the application.

The main stereotypes are:

| Annotation        | Typical Purpose                  |
| ----------------- | -------------------------------- |
| `@Component`      | Generic Spring-managed component |
| `@Service`        | Service/business logic           |
| `@Repository`     | Data-access/repository layer     |
| `@Controller`     | Spring MVC controller            |
| `@RestController` | REST controller                  |

### Relationship

`@Service`, `@Repository`, and `@Controller` are specialized forms of `@Component`.

Conceptually:

    @Component
        |
        +-- @Service
        |
        +-- @Repository
        |
        +-- @Controller

`@RestController` is effectively a combination of:

    @Controller
    +
    @ResponseBody

---

## Why Use Different Stereotypes?

Technically, you could use `@Component` for many application classes.

But using specialized stereotypes communicates the class's responsibility clearly.

For example:

    @Repository
    public class UserRepository {
    }

tells developers:

> This class belongs to the data-access layer.

Similarly:

    @Service
    public class UserService {
    }

communicates:

> This class contains application/business logic.

`@Repository` also has specific Spring behavior around persistence exception translation when applicable.

---

# 4. What Are Spring Bean Scopes?

A **bean scope** determines how many instances of a bean Spring creates and how long those instances are associated with the container.

Spring provides several scopes.

| Scope         | Meaning                                                           |
| ------------- | ----------------------------------------------------------------- |
| `singleton`   | One bean instance per Spring `ApplicationContext`                 |
| `prototype`   | A new instance each time the bean is requested from the container |
| `request`     | One instance per HTTP request                                     |
| `session`     | One instance per HTTP session                                     |
| `application` | One instance per `ServletContext`                                 |
| `websocket`   | One instance per WebSocket lifecycle                              |

The web-related scopes are available in appropriate web-aware Spring applications.

---

# 5. What Is the Default Scope?

The default Spring bean scope is:

    singleton

For example:

    @Service
    public class PaymentService {
    }

is effectively:

    @Service
    @Scope("singleton")
    public class PaymentService {
    }

Spring creates one `PaymentService` instance per `ApplicationContext` and returns that instance whenever the bean is requested.

For example:

    PaymentService service1 =
        context.getBean(PaymentService.class);

    PaymentService service2 =
        context.getBean(PaymentService.class);

Typically:

    service1 == service2

returns:

    true

---

## Important: Spring Singleton vs GoF Singleton

This is an important interview distinction.

A Spring singleton does **not** mean there can only ever be one instance of that class in the entire JVM.

It means:

> Spring maintains one instance of that bean **per `ApplicationContext`**.

So two different `ApplicationContext` instances can have separate singleton instances of the same bean.

    ApplicationContext A
        ↓
    PaymentService instance A

    ApplicationContext B
        ↓
    PaymentService instance B

Therefore:

> **Spring singleton = one instance per ApplicationContext**

---

# 6. Prototype Scope

With prototype scope:

    @Component
    @Scope("prototype")
    public class ReportGenerator {
    }

Spring creates a new instance each time the bean is requested from the container.

Conceptually:

    context.getBean(ReportGenerator.class)
        ↓
    Object A

    context.getBean(ReportGenerator.class)
        ↓
    Object B

Therefore:

    A != B

### Important Point

Spring manages the creation and initialization of prototype beans, but generally does **not manage their destruction** after handing them to the caller.

---

# 7. Request and Session Scopes

These are primarily relevant to web applications.

### Request Scope

    @RequestScope
    @Component
    public class RequestData {
    }

A new bean instance is associated with each HTTP request.

    Request 1 → Object A
    Request 2 → Object B
    Request 3 → Object C

### Session Scope

    @SessionScope
    @Component
    public class UserSession {
    }

The same bean instance is associated with a particular HTTP session.

    Session A → Object A
    Session B → Object B

---

# 8. How These Concepts Work Together

Consider:

    @Repository
    public class PaymentRepository {
    }

    @Service
    public class PaymentService {

        private final PaymentRepository repository;

        public PaymentService(PaymentRepository repository) {
            this.repository = repository;
        }
    }

Spring does the following:

    Component Scanning
          ↓
    Finds @Repository
          ↓
    Creates PaymentRepository bean
          ↓
    Finds @Service
          ↓
    Creates PaymentService bean
          ↓
    Resolves PaymentRepository dependency
          ↓
    Injects PaymentRepository
          ↓
    PaymentService is ready

By default, both beans have singleton scope.

---

# Interview Summary

### Dependency Injection

> Spring creates and provides the dependencies required by a class instead of the class creating them itself.

### `@Autowired`

> Tells Spring to resolve and inject a matching bean. With a single constructor, `@Autowired` is generally optional.

### Component Scanning

> Spring automatically discovers classes configured as components and registers them as beans.

### Stereotypes

> Annotations such as `@Component`, `@Service`, `@Repository`, and `@Controller` identify Spring-managed components and communicate their intended role.

### Default Scope

> The default Spring bean scope is **singleton**, meaning one instance per `ApplicationContext`.

---

## Interview Traps

1. **Default scope is singleton.**

2. **Spring singleton is not the same as the GoF Singleton pattern.**
   It is one instance per `ApplicationContext`.

3. **`@Autowired` is not required on a single constructor.**

4. **`@Service`, `@Repository`, and `@Controller` are specialized component stereotypes.**

5. **Prototype does not mean one instance per injection in every situation.**
   It means Spring creates a new instance when the prototype bean is requested from the container. Injecting a prototype into a singleton has additional lifecycle implications.

6. **Component scanning finds bean candidates; it does not itself perform dependency injection.**
   Bean registration, creation, dependency resolution, and lifecycle management are separate parts of the container's work.

## Easy Way to Remember

    Component Scanning
          ↓
    Find Spring components
          ↓
    Register Beans
          ↓
    Create Beans
          ↓
    Dependency Injection
          ↓
    Bean Ready

    Default Scope
          ↓
    Singleton
          ↓
    One instance per ApplicationContext

**Q1.** What happens when Spring finds multiple beans of the same type for an `@Autowired` dependency?

**Q2.** What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller` internally?

**Q3.** What happens when a prototype-scoped bean is injected into a singleton-scoped bean?
