---
title: Explain @SpringBootApplication Annotation
tags: [java, spring-boot, annotations, auto-configuration]
difficulty: easy
date: 2026-10-19
---

## What is `@SpringBootApplication`?

`@SpringBootApplication` is a convenience annotation in Spring Boot that combines three annotations:

1. `@SpringBootConfiguration`
2. `@EnableAutoConfiguration`
3. `@ComponentScan`

It is typically placed on the main application class to enable configuration, auto-configuration, and component scanning.

---

## 1. `@SpringBootConfiguration`

- Indicates that the class provides Spring configuration.
- It is a specialized form of `@Configuration`.
- Allows the class to define Spring beans and configuration.

---

## 2. `@EnableAutoConfiguration`

- Enables Spring Boot's auto-configuration mechanism.
- Automatically configures beans based on classpath dependencies, existing beans, and application properties.
- Auto-configuration is conditional and generally backs off when relevant user-defined beans already exist.

**Example:**

If Spring Boot detects Spring MVC on the classpath, it can configure the infrastructure required for a web application.

---

## 3. `@ComponentScan`

- Scans the package containing the main application class and its subpackages.
- Discovers Spring-managed components annotated with `@Component`, `@Service`, `@Repository`, `@Controller`, and related annotations.

**Example package structure:**

    com.example.app
    ├── MyApplication.java
    ├── controller/
    ├── service/
    └── repository/

If `MyApplication` is in `com.example.app`, components in these subpackages can be discovered automatically.

**Important:** Components outside the scanned packages might not be discovered unless scanning is configured explicitly.

---

## Example

    @SpringBootApplication
    public class MyApplication {

        public static void main(String[] args) {
            SpringApplication.run(MyApplication.class, args);
        }
    }

When the application starts:

1. Spring Boot creates the application context.
2. Component scanning discovers application components.
3. Auto-configuration configures applicable infrastructure and beans.
4. Spring initializes the required beans and starts the application.

---

## Important Interview Points

- `@SpringBootApplication` combines three annotations; understanding each individually is important.
- Component scanning discovers application components, whereas auto-configuration configures beans based on conditions.
- Auto-configuration does not blindly create every possible bean; it uses conditional rules.
- Place the main application class in a root package above your controllers, services, and repositories.
- Use `scanBasePackages` or `scanBasePackageClasses` to customize component scanning.
- Use the `exclude` attribute to exclude specific auto-configurations when necessary.

---

## Follow-up Questions

**Q1.** What is the difference between `@Configuration` and `@SpringBootConfiguration`?

**Q2.** How does Spring Boot auto-configuration work internally?

**Q3.** What happens if a `@Service` class is outside the component-scanning package?
