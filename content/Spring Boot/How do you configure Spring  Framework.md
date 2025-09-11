---
title: How do you configure Spring Framework?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## How to Configure Spring Framework

Spring Framework supports multiple ways of configuration. Over the years, the approach has evolved from **XML-based configuration** to **annotation-based configuration**, and now to **Spring Boot auto-configuration**.

---

## ✅ 1. XML-based Configuration (Legacy Approach)

In early versions of Spring, XML files were used to declare beans and their dependencies.

**Example:**
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userService" class="com.example.UserService"/>
    <bean id="orderService" class="com.example.OrderService">
        <property name="userService" ref="userService"/>
    </bean>
</beans>
```

- Developers had to maintain large XML files.
- This approach is rarely used in modern applications.

---

## ✅ 2. Annotation-based Configuration (Modern Standard)

Spring introduced annotations to reduce boilerplate XML.

**Common Annotations:**
- `@Component`, `@Service`, `@Repository`, `@Controller` → Define beans.
- `@Autowired` → Inject dependencies.
- `@Configuration` and `@Bean` → Define beans programmatically.

**Example:**
```java
@Configuration
public class AppConfig {

    @Bean
    public UserService userService() {
        return new UserService();
    }

    @Bean
    public OrderService orderService(UserService userService) {
        return new OrderService(userService);
    }
}
```

- Cleaner and type-safe compared to XML.

---

##
