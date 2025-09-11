---
title: What is the difference between Spring MVC and Spring Core?
tags: [spring]
difficulty: easy
date: 2025-09-11
---

## Difference Between Spring MVC and Spring Core

Both **Spring Core** and **Spring MVC** are parts of the Spring Framework, but they serve different purposes:

---

### **Spring Core**
- Provides the foundation of the Spring Framework.  
- Offers **Dependency Injection (DI)** and **Inversion of Control (IoC)**.  
- The **Spring Container** (ApplicationContext/BeanFactory) is part of Spring Core.  
- Used in standalone/core Java applications.  
- Requires only `spring-core` related JARs.  

---

### **Spring MVC**
- A web framework built on top of Spring Core.  
- Implements the **Model-View-Controller (MVC)** pattern for web applications.  
- Provides features like **DispatcherServlet, Controllers, ViewResolvers**, and form handling.  
- Requires `spring-webmvc.jar`.  
- Used specifically for building **Java-based web applications**.  

---

## **Key Differences**

| Feature                  | Spring Core                          | Spring MVC                            |
|---------------------------|---------------------------------------|----------------------------------------|
| Purpose                   | Dependency Injection & IoC container | Web framework using MVC pattern         |
| Application Type          | Core Java applications               | Web applications                       |
| Main Component            | Spring Container (BeanFactory/Context)| DispatcherServlet, Controllers, Views  |
| JAR Dependency            | `spring-core`                        | `spring-webmvc` (depends on core too)  |
| Usage                     | For DI, wiring beans, transactions   | For handling HTTP requests & responses |

---

## 👉 Interview Tip
If asked in an interview, emphasize that:
- **Spring Core is the foundation** (IoC + DI).  
- **Spring MVC is built on top of it** for web application development.  
