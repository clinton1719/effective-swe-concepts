---
title: Explain @Bean Annotation in Spring
tags: [spring, spring-boot, dependency-injection, beans, annotations]
difficulty: easy
date: 2026-10-26
---

## What Is `@Bean`?

`@Bean` is a Spring annotation used to explicitly register an object as a Spring-managed bean.

It is typically applied to a method inside a class annotated with `@Configuration`. Spring calls the method and registers its returned object in the application context.

Unlike `@Component`, which is usually placed on a class for component scanning, `@Bean` is placed on a method to define how an object should be created.

---

## Why Do We Need `@Bean`?

`@Bean` is useful when:

- We need to register a class from a third-party library as a Spring bean.
- We want explicit control over object creation and configuration.
- We need to configure dependencies before returning an object.
- We want to register objects that cannot be annotated with `@Component`.

---

## How Does `@Bean` Work?

1. Spring discovers the configuration class.
2. Spring processes its `@Bean` methods.
3. The method's returned object is registered in the Spring application context.
4. Other Spring-managed beans can inject that object as a dependency.

By default, the bean name is the method name, unless a custom name is specified.

---

## Example

    @Configuration
    public class AppConfig {

        @Bean
        public RestTemplate restTemplate() {
            return new RestTemplate();
        }
    }

Here:

- `@Configuration` identifies the class as a source of bean definitions.
- `@Bean` tells Spring to register the returned `RestTemplate` object.
- The bean's default name is `restTemplate`.

You can inject it into another Spring-managed class using constructor injection:

    @Service
    public class ApiService {

        private final RestTemplate restTemplate;

        public ApiService(RestTemplate restTemplate) {
            this.restTemplate = restTemplate;
        }
    }

Spring resolves the dependency and injects the registered bean.

**Note:** `RestTemplate` is still available in Spring applications, but for new synchronous HTTP clients, Spring also offers `RestClient`. For reactive applications, `WebClient` is commonly used.

---

## Custom Bean Name

You can specify a custom name using the `name` or `value` attribute.

    @Configuration
    public class AppConfig {

        @Bean(name = "customRestTemplate")
        public RestTemplate restTemplate() {
            return new RestTemplate();
        }
    }

The bean can then be referenced by the name `customRestTemplate`, for example, when using `@Qualifier("customRestTemplate")`.

---

## `@Bean` vs `@Component`

| Feature                     | `@Bean`                                                                                          | `@Component`                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Applied to                  | Method                                                                                           | Class                                                 |
| Bean creation               | Defined explicitly by the method                                                                 | Spring discovers and instantiates the class           |
| Typical use                 | Third-party classes or custom object creation                                                    | Application classes                                   |
| Requires component scanning | The configuration class must be discovered or registered; the bean method is processed by Spring | Yes, unless registered through another mechanism      |
| Control over construction   | Explicit method implementation                                                                   | Usually through constructors and dependency injection |

---

## Important Interview Points

- `@Bean` is commonly declared inside a `@Configuration` class.
- A `@Bean` method can accept parameters; Spring resolves them as dependencies.
- By default, the bean name is the method name.
- Beans created using `@Bean` are singleton-scoped by default, unless another scope is configured.
- `@Bean` can specify initialization and destruction callbacks using attributes such as `initMethod` and `destroyMethod`.
- In a full `@Configuration` class, Spring intercepts calls between `@Bean` methods so that calls to other bean methods return the managed bean rather than creating a separate instance. With `@Configuration(proxyBeanMethods = false)` or certain other configurations, that interception does not occur.
- `@Bean` does not mean the object is recreated on every injection; the default singleton scope means one managed instance per bean definition per application context.

---

## Follow-up Questions

**Q1.** What is the difference between `@Bean` and `@Component`?

**Q2.** What is the difference between `@Configuration` and `@Component` when declaring `@Bean` methods?

**Q3.** What happens when one `@Bean` method calls another `@Bean` method inside a class annotated with `@Configuration`?
