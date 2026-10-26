---
title: Explain @ControllerAdvice Annotation in Spring Boot
tags:
  [
    spring,
    spring-boot,
    exception-handling,
    rest-api,
    annotations,
    controller-advice,
  ]
difficulty: medium
date: 2026-10-24
---

## What Is `@ControllerAdvice`?

`@ControllerAdvice` is a Spring annotation used to define **global logic that applies across multiple Spring MVC controllers**.

It is commonly used for centralized exception handling, data binding, and model attribute configuration.

Instead of handling the same exception separately in every controller, we can define a single class to handle exceptions across the application.

## Why Do We Need It?

Without `@ControllerAdvice`, multiple controllers might contain repetitive `try-catch` blocks or duplicate exception-handling methods.

With `@ControllerAdvice`, we can:

- Centralize exception handling.
- Return consistent error responses.
- Reduce duplicate code across controllers.
- Separate business logic from error-handling logic.

---

## How Does It Work?

Spring MVC detects classes annotated with `@ControllerAdvice` through component scanning and applies their applicable advice methods to controllers.

When an exception occurs during request processing:

1. A controller or related request-processing component throws an exception.
2. Spring MVC searches for a suitable exception handler.
3. An applicable `@ExceptionHandler` method in a controller or advice class handles the exception.
4. The handler returns an appropriate response, such as an error object and HTTP status.

The exact handler selection depends on exception-handler matching and Spring MVC's exception-resolution rules.

---

## Example: Global Exception Handling

### 1. Create a Custom Exception

    public class UserNotFoundException extends RuntimeException {

        public UserNotFoundException(String message) {
            super(message);
        }
    }

### 2. Create a Controller

    @RestController
    @RequestMapping("/users")
    public class UserController {

        @GetMapping("/{id}")
        public String getUser(@PathVariable Long id) {
            throw new UserNotFoundException(
                "User not found with id: " + id
            );
        }
    }

### 3. Create a Global Exception Handler

    @ControllerAdvice
    public class GlobalExceptionHandler {

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<String> handleUserNotFound(
                UserNotFoundException ex) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        }
    }

### Response

For a request such as `GET /users/10`, the response would be:

HTTP status: `404 Not Found`

Response body:

    User not found with id: 10

The same handler can handle `UserNotFoundException` from other applicable controllers, avoiding duplicate exception-handling code.

---

## `@ControllerAdvice` vs `@RestControllerAdvice`

| Feature                  | `@ControllerAdvice`                      | `@RestControllerAdvice`                            |
| ------------------------ | ---------------------------------------- | -------------------------------------------------- |
| Purpose                  | Shared advice for Spring MVC controllers | Shared advice commonly used for REST APIs          |
| Composition              | `@Component` and `@ControllerAdvice`     | `@ControllerAdvice` and `@ResponseBody`            |
| Response body by default | No                                       | Yes                                                |
| Typical use              | MVC applications that render views       | REST APIs returning JSON or other response formats |

`@RestControllerAdvice` is particularly convenient for REST APIs because its handler return values are written to the response body by default.

For example:

    @RestControllerAdvice
    public class GlobalExceptionHandler {

        @ExceptionHandler(UserNotFoundException.class)
        public Map<String, String> handleUserNotFound(
                UserNotFoundException ex) {

            return Map.of("error", ex.getMessage());
        }
    }

With suitable JSON message-converter configuration, the response body would be:

    {
        "error": "User not found with id: 10"
    }

---

## Important Interview Points

- `@ControllerAdvice` provides cross-cutting behavior across multiple controllers.
- It is commonly combined with `@ExceptionHandler` for centralized exception handling.
- It can also contain `@ModelAttribute` and `@InitBinder` methods.
- `@RestControllerAdvice` is a convenience annotation for advice whose handler return values should be response bodies by default.
- You can restrict advice to selected controllers or packages using attributes such as `basePackages`, `annotations`, or `assignableTypes`.
- A controller-specific exception handler can take precedence over a global advice handler when both match the exception.
- `@ControllerAdvice` does not automatically convert every exception into a `500 Internal Server Error`; the selected handler determines the resulting response.

---

## Follow-up Questions

**Q1.** What is the difference between `@ExceptionHandler` and `@ControllerAdvice`?

**Q2.** How would you return a structured error response containing a timestamp, status code, and error message?

**Q3.** What happens when both a controller and a global advice class define handlers for the same exception?
