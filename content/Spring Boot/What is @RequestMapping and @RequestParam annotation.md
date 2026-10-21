---
title: Explain @RequestMapping and @RequestParam Annotations
tags: [spring, spring-boot, spring-mvc, annotations, rest-api]
difficulty: easy
date: 2026-10-21
---

## 1. What Is `@RequestMapping`?

`@RequestMapping` is a Spring MVC annotation used to map HTTP requests to controller classes or handler methods.

It can specify:

- URL path
- HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.)
- Request parameters
- Headers
- Consumed and produced media types

### Example

    @RestController
    @RequestMapping("/users")
    public class UserController {

        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public String getAllUsers() {
            return "All users";
        }
    }

**Endpoint:** `GET /users/all`

Here:

- Class-level `@RequestMapping("/users")` defines the common URL prefix.
- Method-level `@RequestMapping` maps `GET /users/all` to `getAllUsers()`.

### Shortcut Annotations

Spring provides specialized annotations for common HTTP methods.

| Annotation       | HTTP Method |
| ---------------- | ----------- |
| `@GetMapping`    | GET         |
| `@PostMapping`   | POST        |
| `@PutMapping`    | PUT         |
| `@PatchMapping`  | PATCH       |
| `@DeleteMapping` | DELETE      |

For example, `@GetMapping("/all")` is a more concise alternative to `@RequestMapping(value = "/all", method = RequestMethod.GET)`.

---

## 2. What Is `@RequestParam`?

`@RequestParam` binds an HTTP request parameter to a method argument in a controller.

It is commonly used to read query parameters or form parameters.

### Example

    @RestController
    @RequestMapping("/users")
    public class UserController {

        @GetMapping
        public String getUser(@RequestParam String name) {
            return "User name: " + name;
        }
    }

**Request:**

    GET /users?name=Clinton

**Response:**

    User name: Clinton

Spring extracts the value of the `name` parameter and passes it to the method.

### Common Attributes of `@RequestParam`

| Attribute         | Purpose                                                          |
| ----------------- | ---------------------------------------------------------------- |
| `name` or `value` | Specifies the request parameter name                             |
| `required`        | Whether the parameter must be present; defaults to `true`        |
| `defaultValue`    | Provides a fallback value when the parameter is missing or empty |

### Example with Optional Parameters

    @GetMapping("/search")
    public String searchUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String name) {

        return "Page: " + page + ", Name: " + name;
    }

**Request:**

    GET /users/search

**Result:**

    Page: 1, Name: null

Here:

- `page` defaults to `1` if missing.
- `name` is optional and becomes `null` if missing.
- Specifying `defaultValue` also makes a parameter non-required.

---

## 3. Difference Between `@RequestMapping` and `@RequestParam`

| Feature    | `@RequestMapping`                                   | `@RequestParam`                              |
| ---------- | --------------------------------------------------- | -------------------------------------------- |
| Purpose    | Maps HTTP requests to controller classes or methods | Binds request parameters to method arguments |
| Applied to | Classes and methods                                 | Method parameters                            |
| Example    | `@GetMapping("/users")`                             | `@RequestParam String name`                  |
| Main use   | Defines request routing and conditions              | Extracts input values from a request         |

These annotations serve different purposes and are often used together.

---

## 4. Important Interview Points

- `@RequestMapping` can be applied at both class and method level.
- `@GetMapping`, `@PostMapping`, and similar annotations are specialized shortcuts for `@RequestMapping`.
- `@RequestParam` commonly reads query parameters, such as `?name=Clinton`, and can also bind form parameters.
- By default, `@RequestParam` is required. A missing required parameter normally results in HTTP 400 Bad Request.
- Use `@PathVariable` to extract values from the URL path, such as `/users/10`.
- Use `@RequestBody` to deserialize a request body, commonly JSON, into a Java object.
- Spring can convert request parameter values to compatible Java types, such as `String` to `int`, when conversion is supported.

---

## Follow-up Questions

**Q1.** What is the difference between `@RequestParam` and `@PathVariable`?

**Q2.** What is the difference between `@RequestBody` and `@RequestParam`?

**Q3.** How does Spring MVC decide which controller method should handle an incoming request?
