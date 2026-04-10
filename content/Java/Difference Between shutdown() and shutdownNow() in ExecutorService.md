---
title: Difference Between shutdown() and shutdownNow() in ExecutorService
tags: [java, multithreading, executor, concurrency, threadpool]
difficulty: easy
date: 2026-03-24
---

## Overview

Both **shutdown()** and **shutdownNow()** are used to **terminate an ExecutorService**, but they differ in how they handle running and pending tasks.

- `shutdown()` → **graceful shutdown**
- `shutdownNow()` → **immediate/forceful shutdown**

---

## Key Differences

| Feature | shutdown() | shutdownNow() |
|---|---|---|
| Stops accepting new tasks | Yes | Yes |
| Running tasks | Allowed to complete | Attempted to stop immediately |
| Waiting tasks (queue) | Executed | Returned (not executed) |
| Interrupts threads | No | Yes (via interrupt) |
| Nature | Graceful | Forceful |

---

## 1. shutdown()

### Behavior

- Stops accepting new tasks
- Allows **already submitted tasks** to finish
- Does NOT interrupt running threads

---

### Example
```
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> {
    try { Thread.sleep(2000); } catch (Exception e) {}
    System.out.println("Task finished");
});

executor.shutdown();
```
---

### Result

- Task completes normally
- Executor shuts down after finishing tasks

---

## 2. shutdownNow()

### Behavior

- Stops accepting new tasks
- Attempts to **interrupt running tasks**
- Returns list of **pending tasks not executed**

---

### Example
```
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> {
    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        System.out.println("Task interrupted");
    }
});

List<Runnable> pending = executor.shutdownNow();
```
---

### Result

- Running tasks receive **interrupt signal**
- Tasks may stop if they handle interruption
- Pending tasks are returned

---

## Important Note

### shutdownNow() Does NOT Guarantee Immediate Stop

- It only **sends interrupt signals**
- If task ignores interruption → it may continue running

---

## Example Comparison

### shutdown()

Task runs → completes → executor stops

---

### shutdownNow()

Task runs → gets interrupted → may stop early  
Pending tasks → not executed

---

## When To Use shutdown()

Use when:

- Tasks must complete safely
- Graceful termination is required

Example:

- File writing
- Database transactions

---

## When To Use shutdownNow()

Use when:

- Immediate stop is required
- System is shutting down urgently

Example:

- Application crash handling
- Emergency shutdown

---

## Best Practice Pattern
```
executor.shutdown();

try {
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        executor.shutdownNow();
    }
} catch (InterruptedException e) {
    executor.shutdownNow();
}
```
---

## Summary

- `shutdown()` → safe, waits for tasks to finish  
- `shutdownNow()` → aggressive, interrupts tasks  

---

## Quick Interview Summary

`shutdown()` performs a **graceful shutdown** by allowing existing tasks to complete, while `shutdownNow()` attempts an **immediate shutdown** by interrupting running tasks and returning pending tasks that were not executed.

---