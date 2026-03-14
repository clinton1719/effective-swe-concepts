---
title: Difference Between Calling run() and start() in Java Threads
tags: [java, multithreading, thread]
difficulty: easy
date: 2026-03-14
---

## Overview

In Java, a thread’s execution normally begins when the **start() method** is called.

If you call **run() directly instead of start()**, the code inside `run()` will execute **like a normal method call in the current thread**, and **no new thread will be created**.

---

## Example
```
class MyThread extends Thread {

    public void run() {
        System.out.println("Running in thread: " + Thread.currentThread().getName());
    }

}
```
Usage:
```
MyThread t = new MyThread();

t.run();   // direct call
```
Output:
```
Running in thread: main
```
Explanation:

The `run()` method executes in the **main thread**, not a new thread.

---

## Correct Way Using start()
```
MyThread t = new MyThread();

t.start();
```
Output:
```
Running in thread: Thread-0
```
Explanation:

- `start()` creates a **new thread**
- JVM thread scheduler assigns CPU
- New thread internally calls `run()`

---

## Internal Working of start()

When `start()` is called:

1. JVM creates a **new thread**
2. Thread moves to **Runnable state**
3. Thread scheduler allocates CPU
4. JVM internally invokes `run()`

So the flow is:
```
start() → new thread created → JVM calls run()
```
---

## Behavior Comparison

| Method Called | New Thread Created | Execution Thread |
|---|---|---|
| run() | No | Current thread (usually main) |
| start() | Yes | New thread |

---

## Example Demonstrating the Difference
```
class TestThread extends Thread {

    public void run() {
        System.out.println(Thread.currentThread().getName());
    }

}
```
Case 1: run()
```
TestThread t = new TestThread();
t.run();
```
Output:
```
main
```
---

Case 2: start()
```
TestThread t = new TestThread();
t.start();
```
Output:
```
Thread-0
```
---

## Why start() Should Be Used

Only `start()`:

- Creates a new thread
- Enables parallel execution
- Uses JVM thread scheduler

Calling `run()` directly simply executes **sequentially like a normal method**.

---

## Important Note

Calling `start()` more than once on the same thread object will cause:
```
java.lang.IllegalThreadStateException
```
Example:
```
Thread t = new Thread();
t.start();
t.start();  // Exception
```
Reason:

A thread can only be started **once**.

---

## Quick Interview Summary

Calling `run()` directly executes the method **in the current thread like a normal function call**, so no new thread is created. Calling `start()` creates a **new thread managed by the JVM**, and that new thread internally executes the `run()` method.

---