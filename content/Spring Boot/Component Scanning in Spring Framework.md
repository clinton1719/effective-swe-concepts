---
title: Component Scanning in Spring Framework
tags: [java, spring, component-scanning, dependency-injection, annotations]
difficulty: medium
date: 2026-09-22
---

## What is Component Scanning?

Component Scanning is a feature of the Spring Framework that automatically discovers classes annotated with Spring stereotype annotations and registers them as beans in the Spring IoC container.

Instead of manually configuring every bean, we can tell Spring which packages to scan. Spring then finds eligible classes and creates bean definitions for them.

Common stereotype annotations are:

| Annotation        | Purpose                          |
| ----------------- | -------------------------------- |
| `@Component`      | Generic Spring-managed component |
| `@Service`        | Service/business logic layer     |
| `@Repository`     | Data-access layer                |
| `@Controller`     | MVC controller                   |
| `@RestController` | REST controller                  |

`@Service`, `@Repository`, and `@Controller` are specialized forms of `@Component`.

## Why Do We Need It?

Without component scanning, we would have to explicitly register many classes as beans.

For example, suppose we have:

    @Service
    class UserService {
        // business logic
    }

With component scanning enabled, Spring discovers `UserService` and registers it as a bean automatically.

This allows other components to inject it using dependency injection.

## How Does It Work?

The basic flow is:

    Application starts
          ↓
    Spring determines packages to scan
          ↓
    Scans classes in those packages
          ↓
    Finds classes with Spring component annotations
          ↓
    Registers bean definitions
          ↓
    Spring creates and manages bean instances

For example:

    @Component
    class EmailService {
    }

If the package containing `EmailService` is included in component scanning, Spring detects it and registers it as a bean.

We can then inject it:

    @Autowired
    private EmailService emailService;

## How Is Component Scanning Enabled?

In traditional Spring applications, component scanning can be enabled using:

    @ComponentScan("com.example.service")

This tells Spring to scan the specified package and its subpackages.

For example:

    @Configuration
    @ComponentScan("com.example")
    class AppConfig {
    }

Spring will scan `com.example` and its subpackages for component classes.

## Component Scanning in Spring Boot

In Spring Boot, component scanning is usually enabled automatically by `@SpringBootApplication`.

`@SpringBootApplication` is effectively a combination of:

    @Configuration
    @EnableAutoConfiguration
    @ComponentScan

Therefore, if the main application class is:

    package com.example;

    @SpringBootApplication
    public class Application {
    }

Spring Boot will normally scan:

    com.example
    ├── controller
    ├── service
    ├── repository
    └── other subpackages

This is why Spring Boot applications generally do not require an explicit `@ComponentScan`.

## Important Package Rule

By default, Spring Boot component scanning starts from the package containing the class annotated with `@SpringBootApplication` and scans its subpackages.

For example:

    com.example
    ├── Application.java
    ├── service
    │   └── UserService.java
    └── controller
        └── UserController.java

This works because both `service` and `controller` are subpackages of `com.example`.

But if a component is placed outside the scanned package hierarchy, Spring may not discover it automatically.

## Component Scanning vs Bean Creation

An important interview distinction:

Component scanning does not simply mean "create every object."

The process is roughly:

    Component scanning
          ↓
    Discover candidate classes
          ↓
    Register bean definitions
          ↓
    Spring's BeanFactory/ApplicationContext
          ↓
    Create and manage bean instances

So component scanning primarily deals with **discovering and registering components**. Bean creation and lifecycle management are handled by the Spring container.

## Example

Suppose we have:

    @Service
    class PaymentService {
    }

    @RestController
    class PaymentController {

        private final PaymentService paymentService;

        PaymentController(PaymentService paymentService) {
            this.paymentService = paymentService;
        }
    }

During application startup:

1. Component scanning discovers `PaymentService`.
2. Component scanning discovers `PaymentController`.
3. Spring registers both as bean definitions.
4. Spring creates the required beans.
5. Spring sees that `PaymentController` requires `PaymentService`.
6. Spring injects the `PaymentService` bean into the controller.

## Important Interview Points

- Component scanning automatically discovers Spring-managed components.
- `@Component` is the general-purpose stereotype annotation.
- `@Service`, `@Repository`, `@Controller`, and `@RestController` are specialized component annotations.
- `@ComponentScan` explicitly configures which packages Spring should scan.
- `@SpringBootApplication` includes `@ComponentScan`.
- Spring Boot normally scans the package containing the main application class and its subpackages.
- Component scanning discovers and registers bean definitions; it is not itself the entire bean lifecycle.
- Classes without component annotations are not automatically discovered through normal component scanning.
- `@Bean` is different: it explicitly declares a bean through a configuration method rather than relying on component scanning.

## Component Scanning vs `@Bean`

| Component Scanning                  | `@Bean`                                                         |
| ----------------------------------- | --------------------------------------------------------------- |
| Discovers classes automatically     | Explicitly declares a bean                                      |
| Usually uses stereotype annotations | Uses a method annotated with `@Bean`                            |
| Good for application components     | Useful for third-party/external classes or custom configuration |
| Controlled using `@ComponentScan`   | Usually declared inside `@Configuration`                        |
| Example: `@Service`                 | Example: `@Bean DataSource dataSource()`                        |

A common rule of thumb:

> Use component scanning for classes that you control and want Spring to discover automatically; use `@Bean` when you need explicit control over bean creation or need to register a class that you cannot annotate.

## Common Interview Question

**Q: Does Spring scan the entire project?**

No.

Spring scans the configured package hierarchy.

In Spring Boot, the default starting point is the package containing the `@SpringBootApplication` class, including its subpackages.

**Q: What happens if my `@Service` is outside the component-scan package?**

Spring will generally not discover it automatically, so it will not be registered as a bean through component scanning.

You can change the scan configuration using `@ComponentScan` or reorganize the package structure.

## Key Takeaway

Component scanning allows Spring to automatically discover classes such as `@Component`, `@Service`, `@Repository`, and `@Controller`, register them with the IoC container, and make them available for dependency injection.

In Spring Boot, this mechanism is enabled automatically through `@SpringBootApplication`.

**Q1.** What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller` internally?

**Q2.** What is the difference between `@ComponentScan` and `@Bean`?

**Q3.** What exactly happens inside the Spring container after a component is discovered during startup?
