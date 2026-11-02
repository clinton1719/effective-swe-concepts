---
title: Spring Security in Spring Boot
tags: [spring-boot, spring-security, authentication, authorization]
difficulty: medium
date: 2026-11-02
---

## Have You Used Spring Security in Your Application?

A good interview answer:

"Yes, I have used Spring Security in my Spring Boot applications to secure REST APIs. It helps implement authentication and authorization, ensuring that only authenticated users can access protected endpoints and that users have the appropriate roles or permissions.

For example, in an account servicing application, a customer service representative may view participant account details, while an administrator may have additional permissions to manage accounts."

## 1. Brief Example

Suppose we have the following endpoints:

| Endpoint           | Access              |
| ------------------ | ------------------- |
| `/api/accounts/**` | Authenticated users |
| `/api/admin/**`    | ADMIN role only     |
| `/api/public/**`   | Everyone            |

### Security Configuration

In modern Spring Security, we configure security using a `SecurityFilterChain` bean.

    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(
                HttpSecurity http) throws Exception {

            http
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/accounts/**").authenticated()
                    .anyRequest().denyAll()
                )
                .httpBasic(Customizer.withDefaults());

            return http.build();
        }
    }

This configuration:

- Allows public endpoints without authentication.
- Requires authentication for account endpoints.
- Restricts admin endpoints to users with the `ADMIN` role.
- Denies access to any other endpoint not explicitly allowed.

For a real REST API, the authentication mechanism may be HTTP Basic for a simple example, or JWT/OAuth2 for a more typical stateless API.

## 2. How Does Spring Security Work?

When a request reaches a secured application:

1. The request passes through the Spring Security filter chain.
2. Spring Security checks the authentication credentials.
3. If authentication succeeds, the authenticated user is stored in the `SecurityContext`.
4. Authorization rules determine whether the user can access the requested endpoint.
5. The request reaches the controller if access is allowed.

## 3. Authentication vs Authorization

| Authentication                 | Authorization                        |
| ------------------------------ | ------------------------------------ |
| Verifies who the user is       | Determines what the user can access  |
| Example: username and password | Example: ADMIN can access admin APIs |
| Happens before authorization   | Happens after authentication         |

## 4. Important Interview Points

- Spring Security is implemented primarily through a filter chain.
- `SecurityFilterChain` is used to define HTTP security rules.
- `hasRole("ADMIN")` typically checks for the authority `ROLE_ADMIN`.
- `hasAuthority("ACCOUNT_READ")` checks for the exact authority `ACCOUNT_READ`.
- Passwords should be stored using a password hash such as BCrypt, not as plain text.
- JWT-based authentication is commonly used for stateless REST APIs.
- CSRF protection should not be disabled blindly; its configuration depends on the authentication mechanism and application architecture.

## 5. One-Line Interview Answer

"Spring Security provides authentication and authorization for Spring Boot applications. I use `SecurityFilterChain` to configure endpoint access based on authentication status and roles, and it integrates with mechanisms such as form login, HTTP Basic, and JWT-based authentication."

## Follow-up Questions

**Q1.** What is the difference between authentication and authorization in Spring Security?

**Q2.** How does JWT authentication work in a Spring Boot REST API?

**Q3.** What is the difference between `hasRole()` and `hasAuthority()`?
