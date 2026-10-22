---
title: Explain @Qualifier Annotation in Spring
tags: [spring, spring-boot, dependency-injection, autowiring, annotations]
difficulty: easy
date: 2026-10-22
---

## What Is `@Qualifier`?

`@Qualifier` is a Spring annotation used to specify **which bean should be injected when multiple beans of the same type are available**.

When Spring performs dependency injection, it first tries to resolve a bean by type. If multiple candidates match, Spring may need additional information to determine which one to inject. `@Qualifier` helps narrow down the candidate.

## Why Do We Need It?

Suppose we have two implementations of the same interface:

    public interface NotificationService {
        void sendNotification();
    }

    @Service("emailService")
    public class EmailNotificationService
            implements NotificationService {

        public void sendNotification() {
            System.out.println("Sending email");
        }
    }

    @Service("smsService")
    public class SmsNotificationService
            implements NotificationService {

        public void sendNotification() {
            System.out.println("Sending SMS");
        }
    }

Now, suppose another class needs a `NotificationService`.

Without additional qualification, Spring may be unable to choose between the two beans and can throw `NoUniqueBeanDefinitionException`.

## How Does `@Qualifier` Work?

Use `@Qualifier` at the injection point to identify the desired bean.

    @Service
    public class NotificationManager {

        private final NotificationService notificationService;

        public NotificationManager(
                @Qualifier("emailService")
                NotificationService notificationService) {

            this.notificationService = notificationService;
        }

        public void notifyUser() {
            notificationService.sendNotification();
        }
    }

Here, Spring injects `EmailNotificationService` because the qualifier matches the bean's name.

**Output:**

    Sending email

## `@Qualifier` vs `@Primary`

| Feature       | `@Qualifier`                                                     | `@Primary`                                                                 |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Purpose       | Selects a specific bean at an injection point                    | Marks a bean as the preferred candidate                                    |
| Scope         | Applied at the injection point, or used as a qualifier on a bean | Applied to a bean definition                                               |
| Best use case | Different dependencies need different implementations            | One implementation should be the default                                   |
| Priority      | A matching qualifier narrows the candidates                      | A matching explicit qualifier takes precedence over the primary preference |

### Example of `@Primary`

    @Service
    @Primary
    public class EmailNotificationService
            implements NotificationService {
        // Implementation
    }

If both email and SMS implementations exist, Spring prefers the primary bean when the injection point has no qualifier that selects another candidate.

## Important Interview Points

- `@Qualifier` is commonly used with `@Autowired` or constructor injection.
- With a single constructor, Spring can inject its dependencies without requiring `@Autowired`.
- Qualifier values commonly match bean names, but qualifiers can also represent logical labels rather than bean names.
- `@Primary` establishes a default preference; `@Qualifier` provides more specific selection.
- If Spring cannot resolve a dependency because multiple candidates remain, it may throw `NoUniqueBeanDefinitionException`.
- Prefer constructor injection because it makes dependencies explicit and supports immutable fields.

## Follow-up Questions

**Q1.** What happens when both `@Primary` and `@Qualifier` are used for the same dependency?

**Q2.** What is the difference between `@Qualifier` and `@Resource`?

**Q3.** How does Spring resolve dependencies when multiple beans implement the same interface?
