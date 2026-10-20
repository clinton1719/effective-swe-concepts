---
title: Difference Between @Component, @Controller, @Service, and @Repository
tags: [spring, spring-boot, annotations, stereotypes]
difficulty: easy
date: 2026-10-20
---

## What Are These Annotations?

`@Component`, `@Controller`, `@Service`, and `@Repository` are **Spring stereotype annotations** used to identify classes that Spring should manage as beans.

All four support component scanning, but they serve different purposes.

## 1. Difference Between the Annotations

| Annotation | Purpose | Typical Layer |
|---|---|---|
| `@Component` | Generic Spring-managed component | Any layer |
| `@Controller` | Handles web requests, typically returning view names | Presentation layer |
| `@Service` | Contains business logic | Service layer |
| `@Repository` | Handles data-access operations and provides exception translation | Persistence layer |

### `@Component`

- A generic annotation for any class that needs to be managed by Spring.
- Use it when a class does not fit a more specific stereotype.

**Example:**

    @Component
    public class EmailValidator {
        public boolean isValid(String email) {
            return email != null && email.contains("@");
        }
    }

### `@Controller`

- Used for Spring MVC controllers that handle HTTP requests.
- Typically returns view names for server-rendered web applications.
- For REST APIs, `@RestController` is commonly used; it combines `@Controller` and `@ResponseBody`.

**Example:**

    @Controller
    public class UserController {

        @GetMapping("/users")
        @ResponseBody
        public String getUsers() {
            return "User list";
        }
    }

### `@Service`

- Indicates that a class contains business logic.
- Improves code readability by identifying the service layer.
- Does not automatically provide transactions; `@Transactional` can be used when appropriate.

**Example:**

    @Service
    public class UserService {

        public String getUserName() {
            return "Clinton";
        }
    }

### `@Repository`

- Indicates that a class performs data-access operations.
- Supports **persistence exception translation**, converting eligible underlying persistence exceptions into Spring's `DataAccessException` hierarchy when the relevant infrastructure is configured.
- Commonly used with JDBC, JPA, and other persistence technologies.

**Example:**

    @Repository
    public class UserRepository {

        public User findById(Long id) {
            // Fetch user from the database
            return null;
        }
    }

---

## 2. How Are They Related Internally?

`@Controller`, `@Service`, and `@Repository` are specialized forms of `@Component`.

Conceptually:

    @Component
       ├── @Controller
       ├── @Service
       └── @Repository

These annotations are recognized during component scanning, allowing eligible classes to be registered as Spring beans.

**Important:** Although they share the same component-scanning foundation, their semantic roles differ. `@Repository` also has specific persistence exception-translation support.

---

## 3. Can We Use @Component Instead of All Three?

Technically, a class annotated with `@Component` can be managed by Spring regardless of whether it implements controller, service, or repository functionality.

However, using the specific stereotype is preferable because:

- It communicates the class's responsibility clearly.
- It improves code readability and maintainability.
- `@Controller` participates in Spring MVC's controller detection.
- `@Repository` identifies persistence components and supports exception translation.

Replacing `@Controller` with `@Component`, for example, does not automatically make the class a Spring MVC controller.

---

## 4. Important Interview Points

- All four annotations can identify classes for Spring component scanning.
- `@Service` does not automatically enable transactions.
- `@Repository` provides persistence exception translation when the necessary infrastructure is configured.
- `@Controller` is intended for Spring MVC request handling.
- `@RestController` is effectively `@Controller` + `@ResponseBody`.
- These annotations do not, by themselves, guarantee that a class becomes a bean; it must be discovered or registered through Spring configuration.
- Using the correct stereotype follows the separation-of-concerns principle.

---

## Follow-up Questions

**Q1.** What is the difference between `@Controller` and `@RestController`?

**Q2.** How does Spring component scanning discover and register beans?

**Q3.** How does `@Repository` translate database exceptions into Spring's `DataAccessException` hierarchy?