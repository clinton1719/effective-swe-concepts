---
title: Static vs Instance Synchronization – Thread Interaction Scenarios
tags: [java, multithreading, synchronization, static, concurrency]
difficulty: medium
date: 2026-03-18
---

## Overview

Understanding how threads behave with **static synchronized** and **instance synchronized** methods depends on **which lock is being used**.

Key rule:

- Static synchronized → **Class-level lock (ClassName.class)**
- Instance synchronized → **Object-level lock (this)**

---

## Scenario 1  
### Two threads calling two different static synchronized methods

### Example
```
class Test {

    public static synchronized void methodA() {
        System.out.println("Method A start");
        try { Thread.sleep(1000); } catch (Exception e) {}
        System.out.println("Method A end");
    }

    public static synchronized void methodB() {
        System.out.println("Method B start");
        try { Thread.sleep(1000); } catch (Exception e) {}
        System.out.println("Method B end");
    }

}
```
Threads:
```
Thread t1 = new Thread(() -> Test.methodA());
Thread t2 = new Thread(() -> Test.methodB());
```
---

## What Happens?

- Both methods are **static synchronized**
- Both require lock on: **Test.class**
- Only **one thread can hold the class lock at a time**

---

## Execution Flow

1. Thread t1 enters methodA → acquires `Test.class` lock
2. Thread t2 tries methodB → blocked (waiting for same lock)
3. t1 finishes → releases lock
4. t2 acquires lock → executes methodB

---

## Conclusion

Even though methods are different:

They **cannot run in parallel**.

Reason:

Same **class-level lock** is used.

---

## Scenario 2  
### One thread calls static synchronized, another calls instance synchronized

### Example
```
class Test {

    public static synchronized void staticMethod() {
        System.out.println("Static method");
        try { Thread.sleep(1000); } catch (Exception e) {}
    }

    public synchronized void instanceMethod() {
        System.out.println("Instance method");
        try { Thread.sleep(1000); } catch (Exception e) {}
    }

}
```
Threads:
```
Test obj = new Test();

Thread t1 = new Thread(() -> Test.staticMethod());
Thread t2 = new Thread(() -> obj.instanceMethod());
```
---

## What Happens?

- staticMethod() → locks **Test.class**
- instanceMethod() → locks **obj (this)**

---

## Execution Flow

1. Thread t1 acquires **class-level lock**
2. Thread t2 acquires **object-level lock**
3. Both locks are different → no conflict
4. Both threads execute **simultaneously**

---

## Conclusion

They **can run in parallel**.

Reason:

Different locks:

- Class lock
- Object lock

---

## Visual Summary

| Scenario | Lock Used | Can Run in Parallel? |
|---|---|---|
| Two static synchronized methods | Same class lock | ❌ No |
| Static + instance synchronized | Different locks | ✔ Yes |

---

## Important Insight

Locks depend on **what is being synchronized**, not just the keyword.

Same lock → blocking  
Different locks → parallel execution

---

## Common Mistake

Assuming all synchronized methods block each other.

Wrong:

Only methods sharing the **same lock** block each other.

---

## Quick Interview Summary

Two threads calling different static synchronized methods will block each other because both require the **same class-level lock**. However, a static synchronized method and an instance synchronized method can execute concurrently because they use **different locks (class vs object)**.

---