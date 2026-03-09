---
title: Explain Singleton Design Pattern in Java
tags: [java, design-patterns, singleton, creational-pattern]
difficulty: easy
date: 2026-03-08
---

## What is the Singleton Design Pattern?

The **Singleton Design Pattern** ensures that a class has **only one instance throughout the application** and provides a **global access point** to that instance.

Instead of allowing multiple objects using `new`, the class **controls its own object creation**.

Typical real-world examples:

- Configuration managers
- Logging systems
- Database connection managers
- Caches

These are components where **multiple instances could cause inconsistencies or wasted resources**.

---

## Core Idea

A Singleton class usually has three characteristics:

1. **Private constructor**  
   Prevents external code from creating objects.

2. **Static instance variable**  
   Stores the single instance.

3. **Public static method**  
   Provides access to the instance.

---

## Basic Singleton Implementation (Lazy Initialization)

Instance is created **only when first requested**.
```
class Singleton {

    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```
Usage:
```
Singleton s1 = Singleton.getInstance();
Singleton s2 = Singleton.getInstance();
```
Both `s1` and `s2` reference the **same object**.

---

## Problem With Basic Singleton

The previous implementation **is not thread-safe**.

If two threads call `getInstance()` at the same time:

Thread 1 → instance == null  
Thread 2 → instance == null  

Both create objects → **two instances created**.

---

## Thread-Safe Singleton (Synchronized Method)
```
class Singleton {

    private static Singleton instance;

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```
This ensures **only one thread can access the method at a time**.

Drawback:

Synchronization adds **performance overhead**.

---

## Double-Checked Locking (Efficient Thread Safety)

A common optimized approach.
```
class Singleton {

    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {

        if (instance == null) {

            synchronized (Singleton.class) {

                if (instance == null) {
                    instance = new Singleton();
                }

            }
        }

        return instance;
    }
}
```
### 1. The First Check (Performance)

The first if (instance == null) is there purely for performance.

Synchronizing is expensive. If we didn't have that first check, every single time your application called getInstance(), it would have to acquire a lock, wait in line, and release it—even if the instance was already created years ago.

By checking if (instance == null) before entering the synchronized block, we allow threads to bypass the lock entirely once the instance exists. This keeps the method fast.

### 2. The Second Check (Correctness)
The second if statement is there to solve the Race Condition.

Imagine two threads, Thread A and Thread B, both arrive at getInstance() at the exact same time when instance is still null.

Step 1: Thread A passes the first check.

Step 2: Thread B also passes the first check.

Step 3: Thread A enters the synchronized block and proceeds to create the object.

Step 4: Thread A finishes and releases the lock.

Step 5: Thread B now enters the synchronized block.

Without the second check, Thread B would blindly proceed to create a second instance of the Singleton, violating the pattern entirely. The second check inside the lock ensures that even if Thread B was "queued up" while Thread A was working, it double-checks the state before acting.

### Why volatile matters
Without volatile, the Java compiler or the CPU might reorder instructions. It could assign the memory address to instance before the Singleton constructor has finished running.

If that happens, another thread might see that instance is not null, try to use it, and crash because it's accessing a partially initialized object. volatile effectively tells the compiler: "Do not reorder these instructions; finish creating the object before assigning it to the variable."

In short:

First Check: Prevents unnecessary locking (Performance).

Synchronized: Serializes access during creation (Safety).

Second Check: Prevents a second thread from overwriting the first thread's work after it passes the lock (Correctness).

---

## Eager Initialization Singleton

Instance created **when class loads**.
```
class Singleton {

    private static final Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```
Advantages:

- Thread-safe
- Simple

Disadvantage:

Object created even if **never used**.

---

## Bill Pugh Singleton (Recommended)

Uses **inner static class loading**.
```
class Singleton {

    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```
Why it works:

- JVM loads inner class **only when needed**
- Thread-safe
- No synchronization overhead

---

## Enum Singleton (Most Robust)

Java recommends using **enum for singleton**.
```
enum Singleton {

    INSTANCE;

    public void doSomething() {
        System.out.println("Running...");
    }
}
```
Usage:

Singleton.INSTANCE.doSomething();

Advantages:

- Thread-safe
- Protects against **serialization issues**
- Protects against **reflection attacks**
- Protects against **cloning attacks** (Java ensures that enum constants are instantiated only once, and their clone() method is final and throws an exception, preventing them from ever being cloned.)
- Very simple

---

## Common Real-World Uses

### Logging

Only one logger instance writing logs.

### Configuration Manager

Single source for configuration values.

### Database Connection Pool

Centralized management of connections.

### Cache Manager

Ensures shared cache across application.

---

## Common Pitfalls

### Reflection Attack

Reflection can bypass private constructors.

Fix: use **enum singleton**.

---

### Serialization Issue

Serialization may create new instances.

Fix:

Add `readResolve()` method.
```
private Object readResolve() {
    return instance;
}
```
---

## Quick Interview Summary

Singleton ensures **only one instance of a class exists in the JVM** and provides a **global access point** to it. It is implemented using a private constructor, a static instance, and a static accessor method. Thread-safe implementations include synchronized methods, double-checked locking, inner static holder pattern, or enum-based singleton.

---