---
title: Reentrant Synchronization in Java (Synchronized Methods Calling Each Other)
tags: [java, multithreading, synchronization, reentrancy, locks]
difficulty: medium
date: 2026-04-03
---

## Overview

When one **synchronized method calls another synchronized method in the same class**, Java allows it **without blocking or deadlock**.

This behavior is possible because Java’s intrinsic locks are **reentrant**.

---

## What is Reentrancy?

A **reentrant lock** means:

A thread that already holds a lock can **acquire the same lock again without getting blocked**.

---

## Example
```
class Test {

    public synchronized void method1() {
        System.out.println("Method1 start");
        method2();
        System.out.println("Method1 end");
    }

    public synchronized void method2() {
        System.out.println("Method2 execution");
    }

}
```
Usage:
```
Test t = new Test();
t.method1();
```
---

## Execution Flow

1. Thread enters `method1()`
2. Acquires lock on object `t`
3. Inside method1 → calls `method2()`
4. method2 also requires same lock (`t`)
5. Thread **already owns the lock**, so it enters directly

No blocking occurs.

---

## Output
```
Method1 start  
Method2 execution  
Method1 end  
```
---

## Why No Deadlock Occurs

Because:

- Same thread already holds the lock
- JVM maintains a **lock count (hold count)**

Lock behavior:

First entry → lock count = 1  
Second entry → lock count = 2  

When methods exit:

method2 exits → count = 1  
method1 exits → count = 0 → lock released

---

## What Would Happen Without Reentrancy?

If locks were NOT reentrant:

- Thread enters method1 and locks object
- Calls method2
- method2 tries to acquire same lock
- Thread blocks itself → **deadlock**

Java avoids this using reentrant locks.

---

## Works for Static Methods Too

Example:
```
class Test {

    public static synchronized void method1() {
        method2();
    }

    public static synchronized void method2() {}

}
```
Here:

- Lock is on `Test.class`
- Same reentrant behavior applies

---

## Important Notes

### Same Thread → No Problem

Reentrancy applies only when **same thread re-enters**.

---

### Different Threads → Blocking Happens

If:

Thread A → inside method1  
Thread B → tries method2  

Thread B will be **blocked**.

---

### Applies to Synchronized Blocks Too
```
synchronized(this) {

    synchronized(this) {
        // allowed
    }

}
```
---

## Real-World Significance

Reentrancy allows:

- Nested method calls
- Recursive calls with synchronization
- Cleaner design without worrying about self-deadlock

---

## Quick Interview Summary

When one synchronized method calls another synchronized method in the same class, the same thread can re-acquire the lock because Java synchronization is **reentrant**. This prevents self-deadlocks and allows nested synchronized calls to execute smoothly.

---