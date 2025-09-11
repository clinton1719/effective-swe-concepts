---
title: Can We Use More Than One Configuration File in Spring?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## Can We Use More Than One Configuration File in Spring?

✅ Yes, Spring allows the use of **multiple configuration files** in a project.  
This is helpful in large applications where separating configurations by module improves **readability, maintainability, and modularity**.

---

## ✅ XML-based Configuration

You can split beans across multiple XML files and then **import them** into a central configuration file.

**Example:**
```xml
<!-- main-config.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <import resource="database-config.xml"/>
    <import resource="service-config.xml"/>
</beans>
```

- Here, `database-config.xml` and `service-config.xml` contain separate bean definitions.
- Spring merges them into one application context.

---

## ✅ Annotation-based Configuration

You can split configuration classes and use `@Import` to bring them together.

**Example:**
```java
@Configuration
public class DatabaseConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}

@Configuration
@Import(DatabaseConfig.class)
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserService();
    }
}
```

- `AppConfig` imports `DatabaseConfig`, so both beans are available in the Spring context.

---

## ✅ Spring Boot

Spring Boot automatically scans all `@Configuration` classes within the package structure.  
You can still use `@Import` to bring in configurations from other modules if needed.

---

## 👉 Interview Tip

- Multiple configuration files are **common practice** in enterprise applications.  
- Helps in **modularizing** concerns (e.g., DB config, security config, web config).  
- Mention `@Import` (annotations) and `<import>` (XML) as the key ways to achieve this.  

