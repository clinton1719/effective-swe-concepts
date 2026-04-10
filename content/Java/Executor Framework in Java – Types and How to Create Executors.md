---
title: Executor Framework in Java – Types and How to Create Executors
tags: [java, multithreading, executor, thread-pool, concurrency]
difficulty: medium
date: 2026-03-21
---

## What is Executor Framework in Java?

The **Executor Framework** (introduced in Java 5) is part of:

java.util.concurrent

It provides a **high-level abstraction for managing threads**, allowing you to:

- Decouple **task submission** from **thread management**
- Reuse threads efficiently using **thread pools**
- Improve performance and scalability

---

## Problem Without Executor Framework

Manual thread creation:
```
Thread t = new Thread(task);
t.start();
```
Problems:

- Too many threads → memory overhead
- No reuse → expensive creation/destruction
- Difficult to manage lifecycle

---

## Solution: Executor Framework

Instead of creating threads manually:

- Submit tasks to an **Executor**
- Executor manages thread creation and reuse

---

## Core Components

### 1. Executor

Basic interface:
```
void execute(Runnable command);
```
---

### 2. ExecutorService

Extends Executor:

- Supports task submission
- Returns Future
- Allows lifecycle management

Key methods:
```
submit()  
shutdown()  
shutdownNow()  
```
---

### 3. ScheduledExecutorService

Used for scheduling tasks.

Example:

- Run after delay
- Run periodically

---

## Types of Executors

Created using:

Executors class

---

## 1. Fixed Thread Pool

Creates a pool with a **fixed number of threads**.
```
ExecutorService executor = Executors.newFixedThreadPool(3);
```
Characteristics:

- Limited threads
- Tasks queued if all threads are busy

Use case:

- Controlled concurrency

---

## 2. Cached Thread Pool

Creates threads as needed and **reuses idle threads**.
```
ExecutorService executor = Executors.newCachedThreadPool();
```
Characteristics:

- Unlimited threads
- Good for short-lived tasks

Use case:

- High number of small tasks

---

## 3. Single Thread Executor

Uses **only one thread**.
```
ExecutorService executor = Executors.newSingleThreadExecutor();
```
Characteristics:

- Tasks executed sequentially
- Ensures order

Use case:

- Sequential processing

---

## 4. Scheduled Thread Pool

Used for **delayed and periodic tasks**.
```
ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);
```
Example:
```
scheduler.schedule(() -> {
    System.out.println("Run after delay");
}, 2, TimeUnit.SECONDS);
```
---

## 5. Work Stealing Pool

Introduced in Java 8.
```
ExecutorService executor = Executors.newWorkStealingPool();
```
Characteristics:

- Uses multiple queues
- Threads steal tasks from others

Use case:

- Parallel processing

---

## How to Submit Tasks

### Using Runnable
```
executor.execute(() -> {
    System.out.println("Task running");
});
```
---

### Using Callable
```
Future<Integer> future = executor.submit(() -> {
    return 100;
});
Integer result = future.get();
```
---

## Shutting Down Executor

executor.shutdown();

- Stops accepting new tasks
- Finishes existing tasks

---

## Complete Example
```
ExecutorService executor = Executors.newFixedThreadPool(2);

for (int i = 0; i < 5; i++) {

    int taskId = i;

    executor.submit(() -> {
        System.out.println("Task " + taskId + " executed");
    });

}

executor.shutdown();
```
---

## Executor vs Thread

| Feature | Thread | Executor Framework |
|---|---|---|
| Thread creation | Manual | Managed |
| Reusability | No | Yes |
| Scalability | Poor | High |
| Control | Low | High |

---

## Best Practices

- Always use **ExecutorService** instead of manual threads
- Always call **shutdown()**
- Prefer **fixed thread pools** for controlled usage
- Use **Callable + Future** when result is needed

---

## Quick Interview Summary

The Executor Framework in Java provides a way to manage and reuse threads using thread pools. It separates task submission from execution and includes different types of executors like **Fixed, Cached, Single, Scheduled, and Work-Stealing pools**, improving performance, scalability, and maintainability.

---