---
title: How to Convert Runnable to Callable in Java
tags: [java, multithreading, callable, runnable, executor]
difficulty: easy
date: 2026-04-07
---

## Overview

`Runnable` and `Callable` are both used to define tasks for threads, but:

- Runnable → does NOT return a result  
- Callable → RETURNS a result  

Sometimes you need to **convert a Runnable into a Callable**, especially when working with **ExecutorService**.

---

## 1. Using Executors.callable() (Built-in Way)

Java provides a utility method to convert Runnable into Callable.

### Syntax
```
Callable<Object> callable = Executors.callable(runnable);
```
---

### Example
```
Runnable task = () -> {
    System.out.println("Running task");
};

Callable<Object> callable = Executors.callable(task);
```
---

### With Return Value
```
Callable<String> callable = Executors.callable(task, "Task Completed");
```
Now:

- Runnable executes
- Callable returns `"Task Completed"`

---

## 2. Manual Conversion

You can wrap Runnable inside a Callable.

### Example
```
Runnable task = () -> {
    System.out.println("Running task");
};

Callable<String> callable = () -> {
    task.run();
    return "Done";
};
```
---

## 3. Using ExecutorService Directly

ExecutorService allows submitting Runnable and still getting a result.

### Example
```
ExecutorService executor = Executors.newSingleThreadExecutor();

Runnable task = () -> {
    System.out.println("Running task");
};

Future<String> future = executor.submit(task, "Completed");

String result = future.get();
```
---

## How This Works

- Runnable executes normally
- Executor wraps it internally
- Future returns the provided result

---

## Comparison of Approaches

| Method | Return Value | Ease |
|---|---|---|
| Executors.callable() | Fixed value | Easy |
| Manual wrapping | Custom logic | Flexible |
| submit(Runnable, result) | Fixed value | Simplest |

---

## When to Use Which

### Use Executors.callable()

- Quick conversion
- No custom logic needed

---

### Use Manual Conversion

- Need dynamic result based on logic

---

### Use submit(Runnable, result)

- Already using ExecutorService
- Want simple result return

---

## Important Note

Runnable itself **cannot return values**.

Conversion only **wraps it**, not changes its nature.

---

## Quick Interview Summary

A Runnable can be converted to a Callable using `Executors.callable()`, by manually wrapping it inside a Callable, or by using `ExecutorService.submit(Runnable, result)`. These approaches allow a non-returning task to behave like a Callable and provide a result via Future.

---