---
title: How to Create an ApplicationContext in an Integration Test
tags: [java, spring, spring-boot, applicationcontext, integration-testing]
difficulty: medium
date: 2026-09-29
---

## How Do You Create an ApplicationContext in an Integration Test?

In a Spring integration test, the `ApplicationContext` is usually created and managed by the **Spring TestContext Framework** rather than manually using `new`.

The exact approach depends on whether you are using plain Spring or Spring Boot.

---

## 1. Spring Boot Integration Test

The most common approach is `@SpringBootTest`.

    @SpringBootTest
    class PaymentServiceIntegrationTest {

        @Autowired
        private ApplicationContext context;

    }

`@SpringBootTest` tells Spring Boot to:

1. Find the application's configuration.
2. Create the `ApplicationContext`.
3. Load the application configuration.
4. Perform component scanning.
5. Create and configure the beans.
6. Inject those beans into the test.

You can then access the context through:

    @Autowired
    private ApplicationContext context;

---

## 2. Using a Specific Configuration Class

You can explicitly tell Spring which configuration to use:

    @SpringBootTest(classes = TestApplication.class)
    class PaymentServiceIntegrationTest {

        @Autowired
        private ApplicationContext context;
    }

This is useful when Spring cannot automatically determine the appropriate configuration class or when you want to use a specific test configuration.

---

## 3. Plain Spring Integration Test

If you are not using Spring Boot, you can use `@ContextConfiguration`.

    @ExtendWith(SpringExtension.class)
    @ContextConfiguration(classes = AppConfig.class)
    class PaymentServiceIntegrationTest {

        @Autowired
        private ApplicationContext context;
    }

Here:

- `SpringExtension` integrates Spring with JUnit 5.
- `@ContextConfiguration` tells Spring which configuration to load.
- Spring creates the `ApplicationContext`.

---

## Does the Test Create the Context Manually?

Normally, **no**.

You generally should not do this:

    ApplicationContext context =
        new AnnotationConfigApplicationContext(AppConfig.class);

inside an integration test.

Instead, let the Spring Test framework create and manage the context.

This gives Spring control over:

- Dependency injection
- Bean lifecycle
- Test context caching
- Test configuration
- Transactions
- Profiles
- Mock beans
- Application properties

---

## Why Does Spring Cache the ApplicationContext?

Spring's test framework can **cache the `ApplicationContext`** between tests when the configuration is compatible.

For example:

    @SpringBootTest
    class TestA {
    }

    @SpringBootTest
    class TestB {
    }

If both tests use the same effective configuration, Spring can reuse the same context rather than starting a completely new one for every test.

This makes integration-test suites significantly faster.

---

## `@SpringBootTest` vs `@ContextConfiguration`

| Annotation              | Typical Use                             |
| ----------------------- | --------------------------------------- |
| `@SpringBootTest`       | Spring Boot integration tests           |
| `@ContextConfiguration` | Loading a specific Spring configuration |
| `@WebMvcTest`           | MVC/controller-focused test slice       |
| `@DataJpaTest`          | JPA/repository-focused test slice       |

Important point:

`@SpringBootTest` generally loads a much larger application context, while annotations such as `@WebMvcTest` and `@DataJpaTest` load focused **test slices**.

---

## Interview Answer

> In a Spring Boot integration test, I would normally use `@SpringBootTest`. Spring's TestContext Framework creates and manages the `ApplicationContext`, and I can inject it using `@Autowired ApplicationContext`. If I'm using plain Spring, I can use `@ContextConfiguration` with `SpringExtension` to specify the configuration class. I generally wouldn't manually instantiate `ApplicationContext` inside an integration test because the Spring test framework handles context creation, dependency injection, lifecycle, and context caching.

## Common Interview Traps

### 1. `@SpringBootTest` does not mean "manually create ApplicationContext"

Spring Boot's test infrastructure creates it for you.

### 2. `ApplicationContext` can be injected into the test

For example:

    @Autowired
    ApplicationContext context;

### 3. Integration test vs unit test

A unit test generally doesn't need the Spring container:

    // No ApplicationContext required

An integration test often loads Spring's context so that real bean wiring and configuration can be tested.

### 4. Context caching matters

Spring can reuse an `ApplicationContext` between tests with compatible configurations, avoiding expensive application startup repeatedly.

## Easy Way to Remember

> **Integration test → let Spring create the context → `@SpringBootTest` → `@Autowired ApplicationContext`**

**Q1.** What exactly happens internally when `@SpringBootTest` is executed?

**Q2.** What is the difference between `@SpringBootTest` and `@ContextConfiguration`?

**Q3.** How does Spring's `ApplicationContext` caching work between integration tests?
