---
title: Explain Atomic Variables in Java
tags: [java, concurrency, atomic, cas, multithreading, java-util-concurrent]
difficulty: medium
date: 2026-03-10
---

## What Are Atomic Variables in Java?

In Java, **atomic variables** are classes from the package:
```
java.util.concurrent.atomic
```
They provide **thread-safe operations on single variables without using locks**.

Atomic operations guarantee that a **read–modify–write operation happens as one indivisible step**, meaning no other thread can observe the variable in an intermediate state.

Example atomic classes:

- AtomicInteger
- AtomicLong
- AtomicBoolean
- AtomicReference

---

## Why Atomic Variables Are Needed

Consider a shared counter:
```
int count = 0;
```
Multiple threads executing:
```
count++;
```
This operation is **not atomic**.

Internally it performs three steps:

1. Read value
2. Increment value
3. Write value

Two threads may execute simultaneously and cause **lost updates**.

Example:
```
Thread A reads 0  
Thread B reads 0  

Thread A writes 1  
Thread B writes 1  

Expected result → 2  
Actual result → 1
```
---

## Example Using AtomicInteger
```
AtomicInteger count = new AtomicInteger(0);

count.incrementAndGet();
```
This operation is **atomic**, meaning no race condition occurs.

Example:
```
AtomicInteger counter = new AtomicInteger(0);

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) {
        counter.incrementAndGet();
    }
};
```
After multiple threads execute, the result will always be correct.

---

## How Atomic Variables Work Internally

Atomic classes rely on a CPU-level instruction called:

**CAS (Compare And Swap)**.

CAS works like this:
```
compareAndSwap(expectedValue, newValue)
```
Steps:
```
1. Check if current value equals expected value
2. If yes → update to new value
3. If no → operation fails and retry
```
Example logic:
```
while (true) {

    int current = value;

    int newValue = current + 1;

    if (CAS(value, current, newValue))
        break;

}
```
This loop continues until the update succeeds.

---

## Example: compareAndSet()
```
AtomicInteger count = new AtomicInteger(10);

boolean success = count.compareAndSet(10, 20);

If the current value is 10 → update to 20.

If another thread changed it → update fails.
```
---

## Common Atomic Classes

### AtomicInteger

Thread-safe integer operations.

AtomicInteger counter = new AtomicInteger();
```
counter.incrementAndGet();
counter.getAndIncrement();
```
---

### AtomicLong

Same concept for long values.
```
AtomicLong total = new AtomicLong();
```
---

### AtomicBoolean

Useful for flags.
```
AtomicBoolean running = new AtomicBoolean(true);

running.set(false);
```
---

### AtomicReference

Provides atomic updates for **object references**.
```
AtomicReference<User> ref = new AtomicReference<>();

ref.compareAndSet(oldUser, newUser);
```
---

## Example Comparison

Without atomic:
```
volatile int count;

count++;
```
Race condition possible.

With atomic:
```
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```
Thread-safe without locks.

---

## When To Use Atomic Variables

Atomic variables are ideal when:

- Only **one variable** needs thread-safe updates
- Operations are **simple (increment, compare, set)**
- Locking overhead should be avoided

Examples:

- Counters
- Metrics
- ID generators
- Status flags
- Reference updates

---

## Limitations

Atomic variables are not ideal for:

- **Multiple variable consistency**
- Complex operations involving multiple shared fields
- Large critical sections

In such cases, use:
```
synchronized  
ReentrantLock
```
---

## Quick Interview Summary

Atomic variables in Java provide **lock-free thread-safe operations using CAS (Compare-And-Swap)**. They ensure atomic updates to shared variables while avoiding the overhead of synchronization, making them highly efficient for counters, flags, and simple shared state updates.

---