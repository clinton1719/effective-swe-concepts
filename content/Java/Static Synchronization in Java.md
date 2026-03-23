---
title: Static Synchronization in Java
tags: [java, multithreading, synchronization, static, concurrency]
difficulty: medium
date: 2026-03-17
---

## What is Static Synchronization in Java?

**Static synchronization** in Java refers to synchronizing **static methods or static blocks**, ensuring that **only one thread can execute them at a time across all instances of the class**.

It uses the **Class-level lock** instead of the object-level lock.

---

## Key Idea

- Normal `synchronized` → locks **object instance**
- `static synchronized` → locks **Class object**

This means:

All objects of the class share the **same lock** when accessing static synchronized methods.

---

## Example
```
class Counter {

    static int count = 0;

    public static synchronized void increment() {
        count++;
        System.out.println(Thread.currentThread().getName() + " " + count);
    }

}
```
Usage:
```
Thread t1 = new Thread(() -> Counter.increment());
Thread t2 = new Thread(() -> Counter.increment());

t1.start();
t2.start();
```
---

## How It Works

When a thread calls:

Counter.increment()

It acquires lock on:
```
Counter.class
```
So:

- Only one thread can execute `increment()` at a time
- Other threads must wait

---

## Static vs Instance Synchronization

| Feature | Instance synchronized | Static synchronized |
|---|---|---|
| Lock Type | Object-level lock | Class-level lock |
| Scope | Per object | Across all objects |
| Lock Object | this | ClassName.class |

---

## Example to Understand Difference
```
class Test {

    public synchronized void instanceMethod() {
        System.out.println("Instance method");
    }

    public static synchronized void staticMethod() {
        System.out.println("Static method");
    }

}
```
Case:
```
Test t1 = new Test();
Test t2 = new Test();

t1.instanceMethod();  // lock on t1
t2.instanceMethod();  // lock on t2 (no conflict)

Test.staticMethod();  // lock on Test.class (shared)
```
---

## Static Synchronization Block

Instead of method-level, you can use block-level synchronization.

Example:
```
class Test {

    public void method() {

        synchronized(Test.class) {

            System.out.println("Inside static synchronized block");

        }

    }

}
```
Equivalent to static synchronized method.

---

## Important Points

### Class-Level Lock

All static synchronized methods use:

ClassName.class

---

### One Lock for All Objects

Even if multiple instances exist:

All share the same lock.

---

### Static and Instance Locks Are Different

This will NOT block each other:

Thread 1 → calls static synchronized method  
Thread 2 → calls instance synchronized method  

Reason:

Different locks:

- Class lock
- Object lock

---

## When to Use Static Synchronization

Use when:

- Working with **shared static data**
- Need synchronization across **all instances**
- Example: shared counters, global resources

---

## Real-World Example

Shared configuration:
```
class Config {

    private static Map<String, String> settings = new HashMap<>();

    public static synchronized void update(String key, String value) {
        settings.put(key, value);
    }

}
```
Ensures only one thread updates config at a time.

---

## Common Mistake

Assuming static and instance synchronization block each other.

They do NOT.

---

## Quick Interview Summary

Static synchronization in Java means synchronizing static methods or blocks using the **class-level lock (ClassName.class)**. It ensures that only one thread can execute static synchronized code across all instances of the class.

---