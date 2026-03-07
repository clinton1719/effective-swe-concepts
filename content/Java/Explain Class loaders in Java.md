---
title: Explain Java Class Loaders
tags: [java, jvm, classloader, runtime, memory]
difficulty: medium
date: 2026-03-07
---

## What are Class Loaders in Java?

A **ClassLoader** is a JVM component responsible for **loading compiled `.class` files into memory at runtime**.

Java does **not load every class when the program starts**. Classes are loaded **only when they are first referenced**. The class loader reads the bytecode and creates a corresponding `Class` object inside the JVM.

Key purposes:

- Dynamic class loading
- Security isolation
- Modular applications
- Plugin systems
- Running multiple applications in servers

---

## Example

Suppose this class exists:
```
class UserService {
    public void process() {
        System.out.println("Processing...");
    }
}
```

When the program references `UserService`, the JVM performs:

1. JVM requests the class
2. ClassLoader searches for `UserService.class`
3. Reads the bytecode
4. Loads it into JVM memory
5. Creates a `Class<UserService>` object
6. The class becomes usable

---

## Types of Class Loaders

Java uses a **hierarchical class loader system**.

### 1. Bootstrap/Primordial ClassLoader

Loads **core Java runtime classes** required for the JVM to function.

Examples:

- java.lang.String
- java.lang.Object
- java.lang.System
- java.lang.Math

Characteristics:

- Implemented in **native code**
- Not written in Java
- Parent of all other class loaders

Location (example):
```
<JAVA_HOME>/lib
```
---

### 2. Platform ClassLoader  
(previously called Extension ClassLoader)

Loads **Java platform libraries** that extend the core runtime.

Examples:

- java.sql.*
- java.xml.*
- javax.crypto.*

Purpose:

Provides additional standard libraries used by many Java programs.

---

### 3. Application ClassLoader (System ClassLoader)

Loads **classes from the application's classpath**.

Examples:

- Your project classes
- Third-party libraries (JARs)
- Framework classes (Spring, Hibernate)

Classpath sources include:

- target/classes
- dependency JAR files
- environment classpath

*Most developer-written code is loaded by the system/application class loader.*
---

## Class Loader Hierarchy

Java uses a **parent-child hierarchy**.

Bootstrap ClassLoader  
        ↓  
Platform ClassLoader  
        ↓  
Application ClassLoader  

Each class loader **asks its parent to load the class first**.

---

## Parent Delegation Model

When a class needs to be loaded:

1. Application ClassLoader receives request
2. It delegates to Platform ClassLoader
3. Platform delegates to Bootstrap ClassLoader
4. Bootstrap tries to load the class
5. If not found, control returns down the hierarchy

Flow:

Application → Platform → Bootstrap  
If not found: Bootstrap → Platform → Application

---

## Why Parent Delegation Exists

### 1. Security

Prevents malicious code from replacing core Java classes.

Example attack without delegation:

A developer creates fake class:
```
package java.lang;

class String {}
```
If this were loaded first, it could break the entire JVM.

Delegation ensures **real core classes are always loaded first**.

---

### 2. Consistency

Ensures **only one version of core classes exists in the JVM**.

Example:

All libraries must use the same `java.lang.String` class.

---

## Custom Class Loaders

Developers can create their own class loaders.

Common uses:

- Plugin systems
- Application servers
- Loading encrypted classes
- Dynamic module systems

Example:
```
class CustomClassLoader extends ClassLoader {

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] classData = loadClassFromFile(name);
        return defineClass(name, classData, 0, classData.length);
    }

}
```
This allows loading classes from:

- databases
- networks
- encrypted storage
- remote servers

---

## Where Class Loaders Are Used in Real Systems

### Application Servers

Servers like:

- Tomcat
- WebSphere
- JBoss

use multiple class loaders to isolate applications.

Each deployed application can have:

Application A → its own class loader  
Application B → separate class loader

This prevents dependency conflicts.

---

### Plugin Architectures

Tools like:

- IDE plugins
- build tools
- modular systems

load plugins dynamically using class loaders.

---

## Class Loading Phases

After a class loader loads the bytecode, the JVM performs three stages.

### 1. Loading
Reads `.class` bytecode into memory.

### 2. Linking

Three steps occur:

Verification  
Ensures bytecode is valid and safe.

Preparation  
Allocates memory for static variables.

Resolution  
Replaces symbolic references with actual memory references.

### 3. Initialization

Static variables and static blocks are executed.

Example:
```
class Test {
    static {
        System.out.println("Class initialized");
    }
}
```
This runs during initialization.

---

## Key Takeaways

- ClassLoaders load `.class` files into JVM memory.
- Java uses a **hierarchical loader system**.
- Parent delegation protects core Java classes.
- Different class loaders isolate applications.
- Custom class loaders enable plugin systems and modular architectures.

---

## Quick Interview Summary

ClassLoader = JVM component that dynamically loads classes into memory using a hierarchical delegation model consisting of Bootstrap, Platform, and Application class loaders, ensuring security, consistency, and modularity.

---