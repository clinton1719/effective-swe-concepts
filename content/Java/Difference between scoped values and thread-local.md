---
title: Difference between scoped values and thread-local in java
tags: [threadlocal, multithreading, concurrency, scoped-values, thread-local]
difficulty: medium
date: 2026-05-10
---

## Difference between Scoped Values And Thread Local

In Java, Scoped Values (JEP 506) are a modern alternative to ThreadLocal, specifically designed to handle the scale of virtual threads and structured concurrency. While ThreadLocal has been the standard for per-thread data since Java 1.2, it has long-standing issues with memory leaks and performance overhead.
Comparison Overview 

| Feature |  |   |
| --- | --- | --- |
| Mutability | Mutable: Any code can call  at any time. | Immutable: Values are set once for a specific scope.  |
| Lifetime | Unbounded: Lives until manually removed or thread dies (leaks are common). | Bounded: Automatically cleaned up when the execution block finishes.  |
| Inheritance | Expensive: Child threads receive a deep copy of all values. | Efficient: Child threads share the same binding without copying.  |
| Scalability | Poor: Not ideal for millions of virtual threads. | High: Optimized for virtual threads and massive concurrency.  |

Key Differences 

• Automatic Lifecycle Management:  variables often cause memory leaks because they remain in memory as long as the thread exists, unless you remember to call remove(). Scoped Values are only valid within a specific code block (e.g., using ), ensuring they are immediately eligible for garbage collection once that block exits.

• Immutability for Safety: Because  is immutable, you don't have to worry about a "faraway" method silently changing a global variable that affects your entire request flow. 

• Virtual Thread Performance: When a parent thread spawns child threads (like in structured concurrency),  copies all data to every child, which can crash the heap if you have thousands of virtual threads. Scoped values use a shared, read-only binding that child threads can simply point to. 

• API Usage: 

	• ThreadLocal: You use .set(val) and .get(). Manual cleanup in a  block is required. 
	• ScopedValue: You bind it using ScopedValue.where(KEY, value).run(() -> { ... }). The value is only available inside that lambda. 

When to Keep Using ThreadLocal 
You should continue using  if your data must be mutable deep within a call stack or if you are working with legacy frameworks (like some versions of Spring Security) that expect a context to persist for the entire unstructured lifetime of a thread

Source: https://medium.com/@kaustubh.saha/scoped-values-as-an-alternative-to-threadlocal-55ce892fee84
