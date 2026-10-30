---
title: How to Configure Profiles in a Spring Boot Application
tags: [spring-boot, profiles, configuration, application-properties]
difficulty: easy
date: 2026-10-28
---

## What Are Profiles in Spring Boot?

Spring Boot profiles allow us to **configure different beans and application settings for different environments**, such as development, testing, and production.

For example, we might use:

- Development: a local database.
- Testing: a test database.
- Production: a production database with different credentials.

Profiles help us maintain environment-specific configurations without changing application code.

**Interview note:** Profiles are different from performance profiling. Spring profiles control environment-specific configuration; performance profiling measures CPU usage, memory consumption, execution time, and bottlenecks.

---

## 1. Configure Profile-Specific Properties

Spring Boot supports separate configuration files for different profiles.

**application.properties**

    spring.application.name=my-app
    spring.profiles.active=dev

**application-dev.properties**

    server.port=8081
    spring.datasource.url=jdbc:postgresql://localhost:5432/devdb

**application-prod.properties**

    server.port=8080
    spring.datasource.url=jdbc:postgresql://prod-host:5432/proddb

When the `dev` profile is active, Spring Boot loads the base configuration and the applicable development-specific configuration.

For production, activate the `prod` profile instead.

**Best practice:** Avoid hardcoding production credentials or activating production profiles unconditionally in the packaged application. Use deployment configuration and a suitable secrets-management mechanism.

---

## 2. Activate a Profile

You can activate a profile in several ways.

### Using application.properties

    spring.profiles.active=dev

### Using the command line

    java -jar myapp.jar --spring.profiles.active=prod

### Using an environment variable

    SPRING_PROFILES_ACTIVE=prod

Command-line properties and environment variables can override lower-precedence configuration sources, allowing the deployment environment to select the appropriate profile.

---

## 3. Use `@Profile` to Create Environment-Specific Beans

The `@Profile` annotation controls whether a bean definition is registered based on the active profile.

**Development implementation:**

    @Component
    @Profile("dev")
    public class DevNotificationService
            implements NotificationService {

        public void send() {
            System.out.println("Development notification");
        }
    }

**Production implementation:**

    @Component
    @Profile("prod")
    public class ProdNotificationService
            implements NotificationService {

        public void send() {
            System.out.println("Production notification");
        }
    }

Only the implementation matching the active profile is registered, assuming no other configuration registers the same implementations independently.

This is useful when different environments require different implementations of the same interface.

---

## 4. Activate Multiple Profiles

You can activate multiple profiles simultaneously.

    spring.profiles.active=dev,metrics

In this example, Spring Boot activates both `dev` and `metrics`.

You can also define a default profile:

    spring.profiles.default=dev

The default profile is used when no active profile has been explicitly selected.

---

## Important Interview Points

- Profiles are used for environment-specific configuration and conditional bean registration.
- `application.properties` or `application.yml` contains common configuration.
- `application-{profile}.properties` and `application-{profile}.yml` contain profile-specific configuration.
- `@Profile` can be applied to component classes and configuration classes or bean methods.
- Profiles can be activated using configuration properties, environment variables, or command-line arguments.
- Profile-specific configuration does not automatically make an application secure; production credentials and secrets must be managed appropriately.
- `spring.profiles.active` and `spring.profiles.default` cannot be declared inside profile-specific configuration files.
- In modern Spring Boot applications, profile activation and configuration-file processing follow Spring Boot's externalized configuration rules.

---

## Follow-up Questions

**Q1.** What is the difference between `@Profile` and `@ConditionalOnProperty`?

**Q2.** What happens when multiple Spring profiles are active simultaneously?

**Q3.** What is the difference between Spring profiles and performance profiling tools such as Java Flight Recorder?
