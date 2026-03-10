---
title: Differences Between synchronized, volatile, and Atomic in Java
tags: [java, concurrency, synchronized, volatile, atomic, multithreading]
difficulty: medium
date: 2026-03-10
---

## Overview

In Java concurrency, **synchronized**, **volatile**, and **atomic variables** are mechanisms used to manage **shared data between threads**.  
They solve different problems related to **visibility, atomicity, and thread safety**.

Understanding when to use each is important for writing efficient multithreaded code.

---

## Core Differences

| Feature | synchronized | volatile | Atomic Variables |
|---|---|---|---|
| Purpose | Full thread safety using locks | Ensure visibility of variable changes | Lock-free atomic operations |
| Visibility | Yes | Yes | Yes |
| Atomicity | Yes | No | Yes |
| Locking | Uses monitor locks | No locking | No locking |
| Performance | Slower due to locking | Very fast | Fast |
| Use Case | Critical sections / complex logic | Status flags | Counters / simple updates |

---

## 1. synchronized

`synchronized` ensures that **only one thread executes a block or method at a time**.

It provides:

- **Mutual exclusion**
- **Visibility**
- **Atomic execution of code blocks**

Example:
```
class Counter {

    private int count = 0;

    public synchronized void increment() {
        count++;
    }

}
```
When one thread enters the method:

- Other threads **must wait**
- Lock is released after execution

Advantages:

- Guarantees full thread safety
- Works for complex logic involving multiple variables

Disadvantages:

- Locking overhead
- Thread blocking
- Possible deadlocks if misused

---

## 2. volatile

`volatile` ensures **visibility of changes across threads**.

It forces reads/writes to go **directly to main memory**, avoiding CPU caching.

Example:
```
class Flag {

    private volatile boolean running = true;

}

Thread A:

running = false

Thread B:

while (running) { }
```
Without volatile:

Thread B may **never see the update**.

Advantages:

- Very lightweight
- No locking overhead

Limitations:

- Does **not guarantee atomicity**
- Not safe for operations like `count++`

---

## 3. Atomic Variables

Atomic variables come from:
```
java.util.concurrent.atomic
```
Examples:

- AtomicInteger
- AtomicLong
- AtomicBoolean
- AtomicReference

They provide **atomic operations without locks** using **CAS (Compare-And-Swap)**.

Example:
```
AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();
```
Internally:

1. Read value
2. Calculate new value
3. Use CAS to update if value unchanged

Advantages:

- Lock-free
- Thread-safe for single variable updates
- Faster than synchronized

Limitations:

- Best suited for **single variable operations**
- Harder to use for complex logic

---

## Example Comparison

### Using volatile (not safe)
```
volatile int count = 0;

count++;
```
This operation is:

1. Read
2. Increment
3. Write

Race condition possible.

---

### Using AtomicInteger
```
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```
This is **atomic and thread-safe**.

---

### Using synchronized
```
class Counter {

    private int count;

    public synchronized void increment() {
        count++;
    }

}
```
Guarantees correctness but uses **locking**.

---

## Performance Perspective

From fastest to slowest (generally):

volatile → Atomic → synchronized

Reason:
```
volatile only ensures visibility  
Atomic uses **CPU CAS instructions**  
synchronized uses **monitor locks and thread blocking**
```
---

## When To Use Each

### Use volatile when:

- Only **visibility is required**
- Variable is a **status flag**

Example:
```
volatile boolean shutdown;
```
---

### Use Atomic when:

- Single variable updates must be atomic
- Counters or metrics

Example:
```
AtomicInteger requestCount;
```
---

### Use synchronized when:

- Multiple variables must be updated together
- Complex logic must be protected

Example:
```
Bank account transfer logic.
```
---

## Quick Decision Guide

Use:

volatile → simple shared flags  
Atomic → counters / simple numeric updates  
synchronized → complex critical sections

---

## Quick Interview Summary

`synchronized` provides **mutual exclusion and full thread safety using locks**, `volatile` guarantees **visibility of variable updates but not atomicity**, and **Atomic variables provide lock-free thread-safe operations using CAS**, making them efficient for single-variable concurrent updates.

---