---
title: awaitTermination() in ExecutorService (Java)
tags: [java, multithreading, executor, concurrency, threadpool]
difficulty: easy
date: 2026-03-23
---

## What is awaitTermination()?

`awaitTermination()` is a method of **ExecutorService** used to **block the current thread until all submitted tasks are completed or a timeout occurs**.

It is typically used **after calling shutdown()**.

---

## Method Signature
```
boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;
```
---

## What It Does

After calling:
```
executor.shutdown();
```
- Executor stops accepting new tasks
- Existing tasks continue running

Then:
```
executor.awaitTermination(...)
```
- Waits for all tasks to finish
- Blocks the calling thread
- Returns when:
  - All tasks complete OR
  - Timeout occurs

---

## Return Value

| Return Value | Meaning |
|---|---|
| true | All tasks completed within timeout |
| false | Timeout occurred before completion |

---

## Example
```
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> {
    try { Thread.sleep(1000); } catch (Exception e) {}
    System.out.println("Task done");
});

executor.shutdown();

boolean finished = executor.awaitTermination(2, TimeUnit.SECONDS);

System.out.println("Finished: " + finished);
```
---

## Execution Flow

1. Submit tasks
2. Call `shutdown()`
3. Call `awaitTermination()`
4. Main thread waits
5. Tasks complete
6. Method returns true/false

---

## Important Points

### Must Call shutdown() First

If you don’t call shutdown():

- Executor keeps accepting tasks
- awaitTermination() may wait indefinitely

---

### Blocking Method

- Current thread pauses execution
- Useful for graceful shutdown

---

### InterruptedException

Thrown if waiting thread is interrupted.

---

## awaitTermination() vs shutdownNow()

| Method | Behavior |
|---|---|
| shutdown() | Stops new tasks, finishes existing |
| awaitTermination() | Waits for completion |
| shutdownNow() | Attempts to stop all tasks immediately |

---

## Common Usage Pattern
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

## Why It Is Important

Without awaitTermination():

- Main thread may exit early
- Tasks may not finish properly

With it:

- Ensures **graceful shutdown**
- Waits for all work to complete

---

## Quick Interview Summary

`awaitTermination()` is used after shutting down an ExecutorService to **wait for all submitted tasks to complete within a specified timeout**, ensuring graceful termination of threads.

---