---
title: Atomic Classes in Java
tags: [java, concurrency, multithreading, atomic, cas]
difficulty: medium
date: 2026-04-18
---

## Overview

Atomic classes in Java provide lock-free, thread-safe operations on single variables using low-level CPU instructions like Compare-And-Swap (CAS). They are part of `java.util.concurrent.atomic` and help avoid synchronization overhead.

---

## Detailed Explanation

### 1. Problem with Normal Variables

In multithreading:

int count = 0;

Multiple threads doing:
count++

This is NOT atomic because it involves:
1. Read
2. Modify
3. Write

Threads can interleave → incorrect results (race condition)
If two threads increment, some updates could get lost even with a volatile keyword. The reason for this is that 2 threads are accessing a mutable variable without any synchronization - the changes are visible to other threads, but threads can update value simultaneously.

---

### 2. What Atomic Classes Do

Atomic classes ensure operations happen as a single indivisible step.

They internally use:
- CAS (Compare-And-Swap)
- CPU-level atomic instructions
- No locking (non-blocking)

---

### 3. How CAS Works

CAS takes 3 inputs:
- Expected value
- New value
- Current value in memory

If (current == expected)
→ update to new value
Else
→ retry

This loop continues until success.

---

### 4. Common Atomic Classes

| Class              | Purpose                          |
|--------------------|----------------------------------|
| AtomicInteger      | int operations                   |
| AtomicLong         | long operations                  |
| AtomicBoolean      | boolean operations               |
| AtomicReference<T> | object reference updates         |
| AtomicStampedReference | avoids ABA problem           |

---

### 5. Key Methods

For AtomicInteger:

- get()
- set()
- incrementAndGet()
- getAndIncrement()
- compareAndSet(expected, newValue)

---

### 6. Internal Working (Simplified)
```
incrementAndGet():

while (true) {
    int current = value;
    int next = current + 1;
    if (compareAndSet(current, next))
        return next;
}
```
---

## Examples

### Example 1: Without Atomic (Race Condition)
```
int count = 0;

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) {
        count++; // unsafe
    }
};
```
---

### Example 2: Using AtomicInteger
```
AtomicInteger count = new AtomicInteger(0);

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) {
        count.incrementAndGet(); // thread-safe
    }
};
```
---

### Example 3: compareAndSet
```
AtomicInteger value = new AtomicInteger(10);

boolean updated = value.compareAndSet(10, 20);
// updates only if current value is 10
```
---

## Key Points

- Lock-free → better performance under low contention
- Uses CAS instead of synchronized
- Avoids thread blocking
- Suitable for simple shared variables
- Not ideal for complex multi-step operations

---

## Comparison (if applicable)

| Aspect          | Atomic Classes        | synchronized / Locks     |
|----------------|----------------------|--------------------------|
| Blocking        | Non-blocking         | Blocking                 |
| Performance     | High (low contention)| Can degrade under load   |
| Complexity      | Simple use cases     | Handles complex logic    |
| Fairness        | No guarantee         | Can be controlled        |
| Deadlocks       | Not possible         | Possible                 |

---

## Real-World Use Cases

- Counters (request count, metrics)
- Sequence generators
- Rate limiting
- Concurrent caches (partial use)
- Non-blocking algorithms
- High-performance systems (trading, logging)

---

## Common Mistakes

- Using atomic classes for complex logic (multiple variables)
- Ignoring ABA problem in CAS
- Assuming atomic = always faster (not true under high contention)
- Mixing atomic variables with non-atomic operations

---

## Quick Interview Summary

Atomic classes provide thread-safe, lock-free operations using CAS. They improve performance by avoiding blocking but are best suited for simple shared state updates.

---

**Q1:** Why does CAS suffer from the ABA problem and how does AtomicStampedReference solve it?  
**Q2:** When would synchronized outperform Atomic classes in real systems?  
**Q3:** How do LongAdder and AtomicInteger differ under high contention scenarios?  