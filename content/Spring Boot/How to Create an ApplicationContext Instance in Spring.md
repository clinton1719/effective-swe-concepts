---
title: How to Create an ApplicationContext Instance in Spring
tags: [java, spring, applicationcontext, ioc, spring-boot]
difficulty: easy
date: 2026-09-25
---

## How Do You Create an ApplicationContext Instance?

In Spring, `ApplicationContext` is an interface, so we create an instance using one of its implementations.

The implementation you choose depends on the type of application.

### 1. Using AnnotationConfigApplicationContext

For Java-based Spring configuration:

    ApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);

Here, `AppConfig` is a configuration class:

    @Configuration
    @ComponentScan("com.example")
    public class AppConfig {
    }

Spring will:

1. Read the configuration class.
2. Perform component scanning.
3. Register bean definitions.
4. Create and manage the required beans.

---

## 2. Using ClassPathXmlApplicationContext

For XML-based configuration:

    ApplicationContext context =
            new ClassPathXmlApplicationContext("applicationContext.xml");

Spring reads the XML configuration file and creates the configured beans.

This approach is mostly associated with older Spring applications.

---

## 3. In Spring Boot

In a Spring Boot application, we normally **do not manually create** the `ApplicationContext`.

Instead, Spring Boot creates it for us when we call:

    SpringApplication.run(Application.class, args);

For example:

    @SpringBootApplication
    public class Application {
        public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
        }
    }

`SpringApplication.run()` bootstraps the application and creates/configures the appropriate `ApplicationContext`.

---

## Common ApplicationContext Implementations

| Implementation                       | Typical Use                                        |
| ------------------------------------ | -------------------------------------------------- |
| `AnnotationConfigApplicationContext` | Java/configuration-class based Spring applications |
| `ClassPathXmlApplicationContext`     | XML-based Spring applications                      |
| `FileSystemXmlApplicationContext`    | XML configuration from the filesystem              |
| Spring Boot's context                | Automatically created by `SpringApplication.run()` |

---

## Interview Answer

> We don't instantiate `ApplicationContext` directly because it is an interface. We create one of its implementations, such as `AnnotationConfigApplicationContext` for Java-based configuration or `ClassPathXmlApplicationContext` for XML configuration. In Spring Boot, we usually don't create it manually; `SpringApplication.run()` creates and configures the `ApplicationContext` for us.

## Important Interview Point

`ApplicationContext` is the **container**, while implementations such as `AnnotationConfigApplicationContext` are concrete classes that actually create and manage that container.

Also, `ApplicationContext` is generally created **once during application startup** and manages the lifecycle of the Spring beans.

**Q1.** What is the difference between `BeanFactory` and `ApplicationContext`?

**Q2.** What happens internally when `SpringApplication.run()` is called?

**Q3.** What is the difference between `@Configuration`, `@ComponentScan`, and `@Bean`?
