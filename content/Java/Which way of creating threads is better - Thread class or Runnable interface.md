---
title: Thread Class vs Runnable Interface – Which Is Better for Creating Threads in Java
tags: [java, multithreading, thread, runnable, concurrency]
difficulty: easy
date: 2026-03-13
---

## Overview

In Java, there are two primary ways to create threads:

1. Extending the **Thread class**
2. Implementing the **Runnable interface**

Both achieve the same goal (running code in a separate thread), but **implementing Runnable is generally considered the better approach** in most real-world applications.

---

## Method 1: Extending the Thread Class

A class directly extends `Thread` and overrides the `run()` method.

Example:
```
class MyThread extends Thread {

    public void run() {
        System.out.println("Thread running");
    }

}
```
Usage:
```
MyThread t = new MyThread();
t.start();
```
### Advantages

- Simple to write
- Suitable for very small programs

### Disadvantages

- Java does **not support multiple inheritance**
- If the class already extends another class, it **cannot extend Thread**
- Tight coupling between **task and thread**

---

## Method 2: Implementing Runnable Interface

A class implements the `Runnable` interface and defines the `run()` method.

Example:
```
class MyTask implements Runnable {

    public void run() {
        System.out.println("Thread running");
    }

}
```
Usage:
```
Thread t = new Thread(new MyTask());
t.start();
```
### Advantages

- Allows the class to **extend another class**
- Better **separation of concerns** (task vs thread)
- Works well with **Executor Framework**
- More flexible and reusable

### Disadvantages

- Slightly more code

---

## Key Differences

| Feature | Thread Class | Runnable Interface |
|---|---|---|
| Inheritance | Must extend Thread | Can extend another class |
| Design | Task tied to thread | Task separate from thread |
| Flexibility | Limited | High |
| Reusability | Low | High |
| Used in Executor Framework | No | Yes |

---

## Modern Java Practice

In modern Java, developers usually:

- Implement **Runnable**
- Use **Lambda expressions**
- Use **ExecutorService**

Example using lambda:
```
Thread t = new Thread(() -> {
    System.out.println("Thread running");
});

t.start();
```
Even more commonly:

Executors manage threads automatically.

---

## When Thread Class Might Be Used

Extending `Thread` is acceptable when:

- Customizing thread behavior
- Creating specialized thread classes
- Learning basic multithreading

However, in most production systems, **Runnable or Callable with ExecutorService is preferred**.

---

## Best Practice Summary

Preferred order in modern Java:

1. ExecutorService + Runnable/Callable  
2. Runnable interface  
3. Extending Thread (least preferred)

Reason:

This design keeps **task logic separate from thread management**, making programs easier to maintain and scale.

---

## Quick Interview Summary

Implementing the **Runnable interface is generally better than extending the Thread class** because it promotes better design by separating task logic from thread management, allows multiple inheritance, improves reusability, and integrates well with modern concurrency frameworks like ExecutorService.

---