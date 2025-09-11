---
title: What are the different modules in Spring?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## Different Modules in Spring Framework

The Spring Framework is modular, meaning it is divided into several components (modules) that can be used independently or together depending on the application’s needs.  

Here are the **main modules of Spring**:

---

### 1. **Core Container**
- **Spring Core**: Provides the fundamental part of the framework, including **Dependency Injection (DI)** and **Inversion of Control (IoC)**.
- **Spring Beans**: Manages bean configuration and lifecycle.
- **Spring Context**: Provides context information and access to objects, similar to JNDI registry.
- **Spring Expression Language (SpEL)**: A powerful expression language for querying and manipulating objects at runtime.

---

### 2. **Data Access/Integration**
- **JDBC Module**: Simplifies database access and error handling.
- **ORM Module**: Integration with ORM frameworks like Hibernate, JPA, iBatis.
- **JMS Module**: Messaging support for asynchronous communication.
- **Transactions Module**: Declarative transaction management.

---

### 3. **Web**
- **Web Module**: Basic web-oriented integration features, including multipart file upload and servlet listeners.
- **Web-MVC Module**: Implements the **Model-View-Controller (MVC)** pattern for building web applications.
- **Web-Portlet Module**: Provides the MVC implementation to be used in a portlet environment.

---

### 4. **Aspect-Oriented Programming (AOP)**
- Supports separating cross-cutting concerns like logging, security, and transaction management from business logic.

---

### 5. **Instrumentation**
- Provides class instrumentation and classloader support.  
- Useful for server environments.

---

### 6. **Messaging**
- Provides support for STOMP (Simple Text Oriented Messaging Protocol) over WebSocket.  
- Helps build real-time applications.

---

### 7. **Test**
- Provides support for testing Spring components with JUnit/TestNG.  
- Includes utilities for mock objects, dependency injection in test cases, and integration testing.

---

## 👉 Interview Tip
- Always start by naming **Core, AOP, Data Access, Web, Messaging, and Test** as the main categories.  
- Mention that **Spring Boot** builds on top of these modules to simplify configuration and dependency management.  

