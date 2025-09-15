---
title: How to Create a Thread in Java?
tags: [java, multithreading, concurrency]
difficulty: easy
date: 2025-09-15
---

## Overview
In Java, threads are used to execute tasks **concurrently**.  
There are **two primary ways** to create a thread:

1. By **extending the `Thread` class**.  
2. By **implementing the `Runnable` interface**.  

Additionally, Java 5 introduced the **`Executor` framework**, which is the recommended way in modern applications.

---

## 1. Creating a Thread by Extending `Thread`
- **How:** Subclass `Thread` and override its `run()` method.
- **When to use:** If you don’t need to extend any other class.

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start();  // start() internally calls run()
    }
}
```

---

## 2. Creating a Thread by Implementing `Runnable`
- **How:** Implement `Runnable` and pass it to a `Thread` object.
- **When to use:** Preferred when you want to extend another class (since Java doesn’t support multiple inheritance).

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable thread running: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable());
        t1.start();
    }
}
```

---

## 3. Using Lambda with `Runnable` (Java 8+)
- **Why:** Cleaner, concise code.

```java
public class LambdaThreadExample {
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> 
            System.out.println("Lambda thread running: " + Thread.currentThread().getName())
        );
        t1.start();
    }
}
```

---

## 4. Using Executor Framework (Recommended)
- **Why:** Provides thread pooling, better resource management, and avoids manually handling threads.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> System.out.println("Task 1 executed by: " + Thread.currentThread().getName()));
        executor.submit(() -> System.out.println("Task 2 executed by: " + Thread.currentThread().getName()));

        executor.shutdown();
    }
}
```

---

## Summary

| Approach               | Pros | Cons |
|------------------------|------|------|
| Extending `Thread`     | Simple, direct | No multiple inheritance |
| Implementing `Runnable`| Flexible, decouples task from thread | Slightly more verbose |
| Lambda Runnable        | Concise, modern | Same as `Runnable` underneath |
| Executor Framework     | Scalable, efficient, production-ready | Slightly more complex API |

✅ **Best practice:** Use the **Executor framework** for real-world applications, as it is scalable and avoids creating too many raw threads.

