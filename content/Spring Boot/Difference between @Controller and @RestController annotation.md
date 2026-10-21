---
title: Difference Between @Controller and @RestController
tags: [spring, spring-boot, mvc, rest-api, annotations]
difficulty: easy
date: 2026-10-21
---

## What Is `@Controller`?

`@Controller` is a Spring MVC annotation used to handle HTTP requests, typically in web applications that return views such as HTML pages.

By default, a method's return value is interpreted as a **view name** when it returns a `String`.

**Example:**

    @Controller
    public class UserController {

        @GetMapping("/users")
        public String getUsers() {
            return "users";
        }
    }

Here, Spring interprets `"users"` as the name of a view to render, such as `users.html`, depending on the configured view resolver.

To return data directly in the HTTP response body, you can use `@ResponseBody` on a method or on the entire controller class.

---

## What Is `@RestController`?

`@RestController` is a specialized controller annotation designed primarily for REST APIs.

It combines:

- `@Controller`
- `@ResponseBody`

**Example:**

    @RestController
    public class UserController {

        @GetMapping("/users")
        public String getUsers() {
            return "User list";
        }
    }

Here, `"User list"` is written directly to the HTTP response body instead of being interpreted as a view name.

If the method returns a Java object, Spring MVC typically serializes it into JSON when the appropriate message converter, such as Jackson's JSON converter, is configured and JSON is negotiated.

---

## Difference Between @Controller and @RestController

| Feature                                     | `@Controller`                        | `@RestController`                              |
| ------------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Primary purpose                             | Web applications with views          | REST APIs                                      |
| Return value by default                     | Typically a view name                | HTTP response body                             |
| Includes `@ResponseBody` by default         | No                                   | Yes                                            |
| Returns JSON automatically for Java objects | Only when `@ResponseBody` is applied | Typically, when JSON conversion is configured  |
| Can return views                            | Yes                                  | Not by default; response-body semantics apply  |
| Common use case                             | Server-rendered web pages            | Backend APIs consumed by web or mobile clients |

---

## How Does @ResponseBody Work?

`@ResponseBody` tells Spring MVC to write the return value directly to the HTTP response body using an appropriate `HttpMessageConverter`.

For example:

    @Controller
    public class UserController {

        @GetMapping("/user")
        @ResponseBody
        public User getUser() {
            return new User(1L, "Clinton");
        }
    }

With suitable JSON message-converter configuration, the response could be:

    {
        "id": 1,
        "name": "Clinton"
    }

The same method-level annotation is unnecessary when using `@RestController`, because response-body semantics already apply to all handler methods by default.

---

## Important Interview Points

- `@RestController` is a combination of `@Controller` and `@ResponseBody`.
- `@Controller` is commonly used with server-side template engines such as Thymeleaf.
- `@RestController` is commonly used to build REST endpoints returning JSON or other response formats.
- `@Controller` can also return JSON by adding `@ResponseBody` to a method or class.
- `@RestController` does not mean the application must return JSON. The actual response format depends on the return value, content negotiation, and configured message converters.
- Both annotations participate in Spring MVC request mapping when their handler methods are configured appropriately.

---

## Follow-up Questions

**Q1.** What is the role of `HttpMessageConverter` in Spring MVC?

**Q2.** What happens internally when a request reaches a method annotated with `@GetMapping`?

**Q3.** How does Spring MVC convert a Java object into JSON?
