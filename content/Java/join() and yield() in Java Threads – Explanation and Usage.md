---
title: join() and yield() in Java Threads – Explanation and Usage
tags: [java, multithreading, thread, join, yield, concurrency]
difficulty: medium
date: 2026-03-22
---

## Overview

Both **join()** and **yield()** are methods of the `Thread` class used to control **thread execution behavior**.

- `join()` → makes one thread **wait for another thread to finish**
- `yield()` → hints the scheduler to **pause current thread and allow others to run**

They are used for **thread coordination and scheduling control**.

---

## 1. join() Method

### What is join()?

The `join()` method allows one thread to **wait until another thread completes its execution**.

---

### Example
```
class MyThread extends Thread {

    public void run() {
        System.out.println("Thread started");
        try {
            Thread.sleep(1000);
        } catch (Exception e) {}
        System.out.println("Thread finished");
    }

}
```
Usage:
```
MyThread t = new MyThread();

t.start();
t.join();

System.out.println("Main thread continues");
```
---

### Output Order
```
Thread started  
Thread finished  
Main thread continues  
```
Explanation:

- Main thread **waits for `t` to finish**
- Then continues execution

---

### Types of join()

#### 1. join()

Waits indefinitely until thread completes.

---

#### 2. join(milliseconds)

Waits for a specific time.

t.join(1000);

---

#### 3. join(milliseconds, nanoseconds)

More precise timing control.

---

### Key Behavior

- Calling thread goes into **waiting state**
- Target thread continues execution
- Once target thread completes → waiting thread resumes

---

## 2. yield() Method

### What is yield()?

The `yield()` method **hints the thread scheduler** that the current thread is willing to **pause execution and give other threads a chance to run**.

---

### Example

```
class MyThread extends Thread {

    public void run() {

        for (int i = 0; i < 5; i++) {
                System.out.println(Thread.currentThread().getName());
            Thread.yield();
        }

    }

}
```
---

### Behavior

- Current thread moves from **Running → Runnable**
- Scheduler may choose another thread
- No guarantee that another thread will run

---

## Important Difference

| Feature | join() | yield() |
|---|---|---|
| Purpose | Wait for another thread | Hint scheduler to switch threads |
| Blocking | Yes | No |
| Guarantees order | Yes | No |
| State change | Waiting | Runnable |
| Control type | Deterministic | Non-deterministic |

---

## When To Use join()

Use when:

- One thread depends on another’s result
- Need **sequential execution across threads**

Example:

- File processing after download
- Data aggregation after multiple tasks

---

## When To Use yield()

Use when:

- Want to improve **fairness in scheduling**
- Avoid CPU hogging in loops

Example:

- Long-running loops
- Cooperative multitasking scenarios

---

## Important Notes

### join() is reliable

- Guarantees execution order
- Commonly used in real applications

---

### yield() is not reliable

- Only a **hint**, not enforced
- JVM may ignore it completely

---

### yield() is rarely used in production

Modern schedulers handle fairness automatically.

---

## Example Combining Both
```
Thread t1 = new Thread(() -> {
    System.out.println("Task 1");
});

Thread t2 = new Thread(() -> {
    System.out.println("Task 2");
});

t1.start();
t1.join();

t2.start();
```
Here:

- `t2` starts **only after t1 finishes**

---

## Quick Interview Summary

`join()` is used to make one thread **wait for another thread to finish execution**, ensuring proper execution order. `yield()` is used to **hint the thread scheduler to give other threads a chance to execute**, but it does not guarantee any scheduling behavior.

---