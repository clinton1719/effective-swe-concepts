---
title: Difference Between BeanFactory and ApplicationContext
tags: [spring, beanfactory, applicationcontext, ioc]
difficulty: medium
date: 2026-10-02
---

## What is BeanFactory?

`BeanFactory` is the **basic IoC container** in Spring.

It is responsible for the core functionality of the Spring container, such as:

- Creating beans
- Managing bean lifecycle
- Dependency Injection
- Resolving dependencies
- Managing bean scopes

Example:

    BeanFactory factory = new XmlBeanFactory(...);

`XmlBeanFactory` is a legacy class and is no longer used in modern Spring applications.

Modern Spring applications generally use `ApplicationContext` instead.

---

## What is ApplicationContext?

`ApplicationContext` is a **more feature-rich IoC container** built on top of `BeanFactory`.

It provides everything offered by `BeanFactory`, along with additional enterprise-oriented features such as:

- Application events
- Internationalization (i18n)
- Resource loading
- Automatic detection and registration of `BeanPostProcessor`s
- Automatic detection of `BeanFactoryPostProcessor`s
- Integration with Spring AOP
- Convenient support for annotations and component scanning

The relationship is:

    BeanFactory
        ↑
    ApplicationContext

`ApplicationContext` extends `BeanFactory`.

---

## Key Differences

| Feature                                           | BeanFactory           | ApplicationContext |
| ------------------------------------------------- | --------------------- | ------------------ |
| Basic IoC container                               | Yes                   | Yes                |
| Dependency Injection                              | Yes                   | Yes                |
| Bean lifecycle management                         | Yes                   | Yes                |
| Bean scopes                                       | Yes                   | Yes                |
| Internationalization                              | No                    | Yes                |
| Application events                                | No                    | Yes                |
| Resource loading                                  | Basic                 | Yes                |
| Automatic `BeanPostProcessor` registration        | No                    | Yes                |
| Automatic `BeanFactoryPostProcessor` registration | No                    | Yes                |
| AOP integration                                   | Limited/basic         | Better integration |
| Annotation-based configuration                    | Limited               | Full support       |
| Component scanning                                | Not provided directly | Yes                |
| Typical modern Spring usage                       | Rare                  | Standard           |

---

## Bean Creation Difference

One important historical difference is **when singleton beans are created**.

Traditionally:

### BeanFactory

Uses **lazy initialization by default**.

The singleton bean is typically created when it is first requested:

    factory.getBean(PaymentService.class);

### ApplicationContext

Typically creates singleton beans **eagerly during context startup**, unless lazy initialization is configured.

    ApplicationContext context = ...;

At startup, Spring generally creates the required singleton beans.

You can change this behavior using `@Lazy`.

---

## Why Does ApplicationContext Exist?

`BeanFactory` provides the fundamental container functionality.

However, real-world Spring applications often need additional functionality:

    BeanFactory
        +
    Events
        +
    i18n
        +
    Resource loading
        +
    Post-processors
        +
    AOP integration
        ↓
    ApplicationContext

Therefore, `ApplicationContext` is normally the preferred container in modern Spring applications.

---

## Example

Suppose we have:

    @Service
    public class PaymentService {
    }

With an `ApplicationContext`, Spring can automatically discover the component through component scanning and manage it as a bean.

You can then inject it:

    @Autowired
    private PaymentService paymentService;

The `ApplicationContext` also provides access to other Spring infrastructure, such as application events and message/resource resolution.

---

## Which One Does Spring Boot Use?

Spring Boot uses an `ApplicationContext`, not a bare `BeanFactory`.

When you call:

    SpringApplication.run(Application.class, args);

Spring Boot creates and configures an appropriate `ApplicationContext` for the application.

For example, a typical web application uses a web-aware `ApplicationContext`.

---

## Interview Answer

> `BeanFactory` is Spring's basic IoC container that provides core functionality such as bean creation, dependency injection, and lifecycle management. `ApplicationContext` extends `BeanFactory` and provides additional features such as event publishing, internationalization, resource loading, automatic post-processor registration, and better integration with annotations and AOP. Therefore, `ApplicationContext` is the standard choice in modern Spring and Spring Boot applications.

## Important Interview Trap

Don't say:

> "`BeanFactory` creates beans lazily and `ApplicationContext` creates beans eagerly."

This is **generally true for their default singleton behavior**, but it is not an absolute rule.

`ApplicationContext` can also use lazy initialization, for example:

    @Lazy
    @Bean
    public PaymentService paymentService() {
        return new PaymentService();
    }

Spring Boot can also enable lazy initialization more broadly.

The more important distinction is:

> **BeanFactory = basic IoC container**

> **ApplicationContext = BeanFactory + additional application-level features**

## Easy Way to Remember

    BeanFactory
        ↓
    Core IoC functionality

    ApplicationContext
        ↓
    BeanFactory
        +
    Events
    i18n
    Resources
    Post-processors
    AOP integration

**Q1.** What is the difference between `BeanFactory` and `ApplicationContext` during bean creation?

**Q2.** What are `BeanPostProcessor` and `BeanFactoryPostProcessor`?

**Q3.** What type of `ApplicationContext` does Spring Boot create for a web application?
