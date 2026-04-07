---
title: Difference Between Runnable and Callable in Java
tags: [java, multithreading, runnable, callable, concurrency]
difficulty: easy
date: 2026-03-20
---

## Overview

Both **Runnable** and **Callable** are used to represent tasks that can be executed by threads, but they differ in **capabilities and usage**.

- Runnable → simple task, no result  
- Callable → advanced task, returns result  

---

## Key Differences

| Feature | Runnable | Callable |
|---|---|---|
| Package | java.lang | java.util.concurrent |
| Method | run() | call() |
| Return value | No | Yes |
| Throws checked exception | No | Yes |
| Used with | Thread, ExecutorService | ExecutorService |
| Introduced in | Java 1.0 | Java 5 |

---

## 1. Runnable

### Definition

Runnable is a functional interface with a single method:

void run();

---

### Example
```
Runnable task = () -> {
    System.out.println("Running task");
};

Thread t = new Thread(task);
t.start();
```
---

### Characteristics

- Does not return result
- Cannot throw checked exceptions
- Simpler and older API

---

## 2. Callable

### Definition

Callable is a generic interface:

V call() throws Exception;

---

### Example
```
Callable<Integer> task = () -> {
    return 10 + 20;
};

ExecutorService executor = Executors.newSingleThreadExecutor();

Future<Integer> future = executor.submit(task);

Integer result = future.get();
```
---

### Characteristics

- Returns a result
- Can throw checked exceptions
- Used with ExecutorService
- Works with Future

---

## Execution Difference

### Runnable
```
Thread t = new Thread(runnable);
t.start();
```
---

### Callable
```
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(callable);
```
---

## When to Use Runnable

Use Runnable when:

- No result is needed
- Task is simple
- Using basic threading

Example:
```
Logging  
Background tasks  
```
---

## When to Use Callable

Use Callable when:

- Need a result
- Task may throw checked exception
- Using thread pools

Example:
```
Database query  
API call  
Parallel computation  
```
---

## Practical Insight

Runnable:

"Do this task"

Callable:

"Do this task and give me the result"

---

## Quick Interview Summary

Runnable is used for tasks that do not return a result and cannot throw checked exceptions, while Callable is used for tasks that return a result and can throw checked exceptions. Callable works with ExecutorService and returns results via Future.

---