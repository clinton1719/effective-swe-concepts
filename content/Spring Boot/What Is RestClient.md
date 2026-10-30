---
title: Explain RestClient in Spring Boot with Example
tags: [spring-boot, restclient, rest-api, http, web-services]
difficulty: medium
date: 2026-10-29
---

## What Is `RestClient`?

`RestClient` is a **synchronous HTTP client introduced in Spring Framework 6.1** that allows a Spring Boot application to communicate with external REST APIs.

It provides a fluent API for making HTTP requests such as `GET`, `POST`, `PUT`, and `DELETE`, and for converting HTTP responses into Java objects.

For example, a Spring Boot application can use `RestClient` to call a payment service, retrieve customer details, or communicate with another microservice.

## Why Do We Need It?

Suppose our application needs to retrieve customer information from an external service.

Instead of manually creating HTTP requests, handling connections, and converting JSON into Java objects, `RestClient` handles these operations through a convenient API.

**Key benefits:**

- Fluent and readable API.
- Supports common HTTP methods.
- Converts request and response bodies using message converters.
- Integrates with Spring's HTTP client infrastructure.
- Supports request headers, query parameters, authentication, and error handling.

---

## Example: Calling an External REST API

Assume our application needs to retrieve a user from an external API.

### 1. Create a Model Class

    public class User {

        private Long id;
        private String name;
        private String email;

        public User() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

### 2. Configure `RestClient`

    @Configuration
    public class RestClientConfig {

        @Bean
        public RestClient restClient(RestClient.Builder builder) {
            return builder
                    .baseUrl("https://jsonplaceholder.typicode.com")
                    .build();
        }
    }

Spring Boot auto-configures a `RestClient.Builder` when the appropriate Spring MVC HTTP client infrastructure is available.

The base URL avoids repeating the external service's address in every request.

### 3. Create a Service to Call the API

    @Service
    public class UserApiService {

        private final RestClient restClient;

        public UserApiService(RestClient restClient) {
            this.restClient = restClient;
        }

        public User getUser(Long id) {
            return restClient.get()
                    .uri("/users/{id}", id)
                    .retrieve()
                    .body(User.class);
        }
    }

**How it works:**

1. `get()` specifies the HTTP GET method.
2. `uri()` specifies the endpoint and substitutes the user ID.
3. `retrieve()` executes the request and prepares response handling.
4. `body(User.class)` converts the response body into a `User` object.

### 4. Expose an Endpoint from Our Application

    @RestController
    @RequestMapping("/api")
    public class UserController {

        private final UserApiService userApiService;

        public UserController(UserApiService userApiService) {
            this.userApiService = userApiService;
        }

        @GetMapping("/users/{id}")
        public User getUser(@PathVariable Long id) {
            return userApiService.getUser(id);
        }
    }

Now, when a client calls:

    GET http://localhost:8080/api/users/1

Our application calls the external API and returns the resulting user as JSON, assuming the external service responds successfully and the necessary JSON message converter is configured.

---

## Important Methods of `RestClient`

| Method            | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `get()`           | Sends a GET request                                             |
| `post()`          | Sends a POST request                                            |
| `put()`           | Sends a PUT request                                             |
| `patch()`         | Sends a PATCH request                                           |
| `delete()`        | Sends a DELETE request                                          |
| `uri()`           | Specifies the request URI                                       |
| `header()`        | Adds an HTTP header                                             |
| `body()`          | Sets the request body                                           |
| `retrieve()`      | Executes the request and provides response handling             |
| `body(Class)`     | Converts the response body into the specified type              |
| `toEntity(Class)` | Returns a `ResponseEntity` containing status, headers, and body |

### Example: Sending a POST Request

    public User createUser(User user) {
        return restClient.post()
                .uri("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .body(user)
                .retrieve()
                .body(User.class);
    }

Here, the Java object is serialized into JSON and sent in the request body.

---

## Error Handling

By default, `retrieve()` raises an exception for HTTP error responses with status codes in the 4xx or 5xx ranges.

You can customize the handling:

    public User getUser(Long id) {
        return restClient.get()
                .uri("/users/{id}", id)
                .retrieve()
                .onStatus(
                    status -> status.value() == 404,
                    (request, response) -> {
                        throw new RuntimeException("User not found");
                    }
                )
                .body(User.class);
    }

In production, use an appropriate custom exception and handle it through your application's exception-handling strategy.

---

## `RestClient` vs `RestTemplate` vs `WebClient`

| Feature                | `RestClient`                       | `RestTemplate`                                                          | `WebClient`                                       |
| ---------------------- | ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| Introduced             | Spring Framework 6.1               | Spring Framework 3.0                                                    | Spring Framework 5.0                              |
| Programming style      | Fluent, synchronous                | Traditional, synchronous                                                | Fluent, reactive                                  |
| Blocking               | Yes                                | Yes                                                                     | Can be non-blocking                               |
| Best suited for        | New synchronous HTTP integrations  | Existing synchronous applications                                       | Reactive and asynchronous integrations            |
| Current recommendation | Preferred for new synchronous code | Maintenance-oriented; not the preferred choice for new synchronous code | Preferred for reactive and non-blocking use cases |

**Interview tip:** `RestClient` is not reactive simply because it has a fluent API. Its calls are synchronous and blocking. For non-blocking reactive communication, use `WebClient`.

---

## Important Interview Points

- `RestClient` was introduced in Spring Framework 6.1.
- Spring Boot 3.2 introduced support for `RestClient`.
- It is suitable for synchronous communication between microservices.
- It uses HTTP message converters to serialize request bodies and deserialize response bodies.
- It supports request interceptors, custom headers, URI configuration, and status-specific error handling.
- HTTP errors are handled through status handlers, while network failures can raise client-side exceptions.
- For production integrations, configure appropriate connection and read timeouts, authentication, observability, and retry policies where appropriate.
- Retries must be designed carefully, especially for non-idempotent operations such as payment creation.

---

## Follow-up Questions

**Q1.** What is the difference between `RestClient` and `WebClient` in terms of thread usage and performance?

**Q2.** How do you configure connection timeouts, authentication, and request interceptors in `RestClient`?

**Q3.** How would you handle external API failures and implement retries without creating duplicate payment transactions?
