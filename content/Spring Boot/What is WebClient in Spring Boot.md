---
title: What Is WebClient in Spring Boot?
tags: [spring-boot, webclient, rest-api, reactive-programming]
difficulty: medium
date: 2026-10-29
---

## What is WebClient in Spring Boot?

`WebClient` is a **non-blocking, reactive HTTP client** provided by Spring WebFlux. It allows a Spring Boot application to communicate with external REST APIs using HTTP methods such as GET, POST, PUT, and DELETE.

It supports both:

- **Non-blocking communication:** A thread does not need to wait while the HTTP response is being received.
- **Reactive programming:** Responses can be handled using types such as `Mono` and `Flux`.

`WebClient` was introduced in Spring Framework 5 and can be used in both Spring MVC and Spring WebFlux applications.

## 1. How Does WebClient Work?

Suppose your Spring Boot application needs to retrieve customer details from an external service.

1. Your application sends an HTTP request using `WebClient`.
2. The external service processes the request.
3. The response is handled asynchronously without requiring the calling thread to remain blocked during I/O.
4. The result is represented using a reactive type such as `Mono<Customer>`.

- `Mono<T>` represents zero or one result.
- `Flux<T>` represents zero to many results.

## 2. Example: Calling an External REST API

Assume an external API returns a user with an ID and name.

### Step 1: Add the dependency

For a Spring Boot project, add the Spring WebFlux starter to your Maven dependencies. You can use `WebClient` even if your application uses Spring MVC.

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>

### Step 2: Create a model

    public record User(Long id, String name) {}

This record represents the JSON response from the external API.

### Step 3: Configure WebClient

    @Configuration
    public class WebClientConfig {

        @Bean
        public WebClient webClient(WebClient.Builder builder) {
            return builder
                    .baseUrl("https://jsonplaceholder.typicode.com")
                    .build();
        }
    }

Spring Boot automatically configures a `WebClient.Builder` when the relevant WebFlux client infrastructure is available.

### Step 4: Call the external API

    @Service
    public class UserService {

        private final WebClient webClient;

        public UserService(WebClient webClient) {
            this.webClient = webClient;
        }

        public Mono<User> getUser(Long id) {
            return webClient.get()
                    .uri("/users/{id}", id)
                    .retrieve()
                    .bodyToMono(User.class);
        }
    }

**Explanation:**

- `get()` specifies the HTTP GET method.
- `uri()` specifies the endpoint and its path parameter.
- `retrieve()` initiates response retrieval and provides response-handling methods.
- `bodyToMono(User.class)` converts the response body into a `User` and returns it as a `Mono<User>`.

### Step 5: Expose an endpoint

    @RestController
    @RequestMapping("/api/users")
    public class UserController {

        private final UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        @GetMapping("/{id}")
        public Mono<User> getUser(@PathVariable Long id) {
            return userService.getUser(id);
        }
    }

When a client calls `/api/users/1`, the application requests the external API and returns the resulting user response.

Spring WebFlux can handle the `Mono<User>` reactively. In a Spring MVC application, returning a reactive type is also supported, but it does not automatically make the entire application non-blocking.

## 3. WebClient vs RestClient vs RestTemplate

| Feature           | WebClient                                      | RestClient                   | RestTemplate          |
| ----------------- | ---------------------------------------------- | ---------------------------- | --------------------- |
| Programming model | Reactive                                       | Synchronous                  | Synchronous           |
| I/O behavior      | Supports non-blocking I/O                      | Blocking                     | Blocking              |
| Response types    | `Mono`, `Flux`                                 | Ordinary Java objects        | Ordinary Java objects |
| Best suited for   | Reactive applications and high-concurrency I/O | New synchronous applications | Existing applications |
| Introduced        | Spring Framework 5                             | Spring Framework 6.1         | Spring Framework 3    |

**Interview tip:** For a new Spring Boot application, use `RestClient` for straightforward synchronous HTTP calls and `WebClient` when you need non-blocking I/O or reactive processing. `RestTemplate` remains available, but Spring recommends `RestClient` for new synchronous code.

## 4. Important Interview Points

- `WebClient` is part of Spring WebFlux.
- It supports GET, POST, PUT, DELETE, and other HTTP methods.
- `Mono` and `Flux` are reactive types from Project Reactor.
- Calling `.block()` on a `Mono` or `Flux` waits synchronously for a result, potentially losing the benefits of non-blocking execution. Avoid blocking in reactive request-processing paths.
- Using `WebClient` alone does not make an entire application reactive; the surrounding processing must also avoid unnecessary blocking.
- Use `onStatus()` with `retrieve()` to customize HTTP error handling when needed.

## 5. One-Line Interview Answer

**WebClient is Spring's reactive HTTP client that supports asynchronous, non-blocking communication with external services. It is especially useful in reactive applications that need to handle many concurrent I/O operations efficiently.**

## Follow-up Questions

**Q1.** What is the difference between `Mono` and `Flux`?

**Q2.** How do you make a POST request using `WebClient`?

**Q3.** What is the difference between `WebClient` and `RestClient`, and when would you choose each?
