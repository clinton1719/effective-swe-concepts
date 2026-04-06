---
title: Callable Interface in Java
tags: [java, multithreading, callable, future, concurrency]
difficulty: medium
date: 2026-04-06
---

## What is Callable Interface in Java?

The **Callable interface** is part of:

java.util.concurrent

It is used to define a task that:

- **Returns a result**
- Can **throw checked exceptions**

This makes it more powerful than `Runnable`.

---

## Key Difference from Runnable

| Feature | Runnable | Callable |
|---|---|---|
| Return value | No | Yes |
| Throws checked exception | No | Yes |
| Method | run() | call() |
| Used with | Thread | ExecutorService |

---

## Syntax
```
interface Callable<V> {
    V call() throws Exception;
}
```
- `V` → return type

---

## Example
```
class MyTask implements Callable<Integer> {

    public Integer call() {
        return 10 + 20;
    }

}
```
---

## Executing Callable

Callable cannot be run directly using `Thread`.

It must be used with:
```
ExecutorService
```
---

## Example with ExecutorService
```
ExecutorService executor = Executors.newSingleThreadExecutor();

Callable<Integer> task = () -> {
    return 100;
};

Future<Integer> future = executor.submit(task);
```
---

## Getting Result
```
Integer result = future.get();
```
Explanation:

- `submit()` returns a **Future**
- `Future.get()` blocks until result is ready

---

## What is Future?

Future represents a **result of an asynchronous computation**.

Key methods:
```
future.get() → get result (blocks)  
future.isDone() → check completion  
future.cancel() → cancel execution  
```
---

## Example Full Flow
```
ExecutorService executor = Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> {

    Thread.sleep(1000);
    return 42;

};

Future<Integer> future = executor.submit(task);

System.out.println("Doing other work...");

Integer result = future.get();

System.out.println(result);

executor.shutdown();
```
---

## Output
```
Doing other work...  
42  
```
---

## Why Callable Is Needed

Runnable limitations:

- Cannot return value
- Cannot throw checked exception

Callable solves both problems.

---

## When to Use Callable

Use Callable when:

- Task needs to **return a result**
- Task may **throw checked exceptions**
- Using **ExecutorService**

Examples:

- Database queries
- File processing
- API calls
- Parallel computations

---

## Callable vs Runnable vs Future

| Component | Role |
|---|---|
| Callable | Defines task with result |
| Runnable | Defines task without result |
| Future | Holds result of task |

---

## Real-World Analogy

Callable → worker doing a task and returning output  
Future → receipt to collect result later  

---

## Quick Interview Summary

Callable is an interface used for defining tasks that **return results and can throw checked exceptions**. It is executed using **ExecutorService**, and the result is retrieved using a **Future object**.

---