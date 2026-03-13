---
title: Multithreading in Java – Concepts and Working
tags: [java, multithreading, concurrency, threads, parallelism]
difficulty: easy
date: 2026-03-13
---

## What is Multithreading in Java?

**Multithreading** is a feature of Java that allows **multiple threads (independent paths of execution) to run concurrently within a single program**.

A **thread** is the **smallest unit of execution inside a process**.

Instead of executing tasks sequentially, multithreading enables a program to **perform multiple tasks simultaneously**, improving efficiency and resource utilization.

Example idea:

One program doing multiple tasks:

- Downloading a file
- Updating UI
- Processing data

All at the same time using different threads.

---

## Process vs Thread

### Process

A **process** is an independent program running in memory.

Example:

- Browser
- IDE
- Media player

Each process has its own:

- Memory
- Resources
- Execution environment

---

### Thread

A **thread** is a **lightweight unit of execution within a process**.

Threads share:

- Heap memory
- Resources
- Files

But have their own:

- Stack
- Program counter

Example:

Browser process:

Thread 1 → UI rendering  
Thread 2 → Network requests  
Thread 3 → JavaScript execution

---

## Why Multithreading Is Used

Benefits:

### 1. Better CPU Utilization

Modern CPUs have multiple cores.  
Multithreading allows using them efficiently.

---

### 2. Faster Execution

Tasks can run **concurrently instead of sequentially**.

Example:

Without threads:

Download → Process → Save

With threads:

Download + Process + Save simultaneously.

---

### 3. Responsive Applications

UI applications remain responsive even during long tasks.

Example:

File upload happening in background.

---

## Life Cycle of a Thread

A thread moves through several states during execution.

### 1. New

Thread object created.
```
Thread t = new Thread();
```
---

### 2. Runnable

Thread is ready to run and waiting for CPU.
```
t.start();
```
---

### 3. Running

Thread scheduler assigns CPU and the thread executes.

---

### 4. Blocked / Waiting

Thread pauses due to:

- Waiting for lock
- Waiting for resource
- Sleep()

---

### 5. Terminated

Thread finishes execution.

---

## Ways to Create Threads in Java

There are two main ways.

---

## 1. Extending Thread Class
```
class MyThread extends Thread {

    public void run() {
        System.out.println("Thread running");
    }

}
```
Usage:
```
MyThread t = new MyThread();
t.start();
```
---

## 2. Implementing Runnable Interface

Preferred approach.
```
class MyTask implements Runnable {

    public void run() {
        System.out.println("Thread running");
    }

}
```
Usage:
```
Thread t = new Thread(new MyTask());
t.start();
```
Advantages:

- Supports **multiple inheritance**
- Separates task from thread management

---

## 3. Using Lambda (Modern Java)
```
Thread t = new Thread(() -> {
    System.out.println("Thread running");
});

t.start();
```
---

## Important Thread Methods

### start()

Starts the thread and calls `run()` internally.

---

### run()

Contains the thread’s execution logic.

---

### sleep(ms)

Pauses thread for specified time.

Thread.sleep(1000);

---

### join()

Waits for another thread to finish.
```
t.join();
```
---

### yield()

Hints scheduler to allow other threads to execute.

---

## Multithreading Challenges

Because threads share memory, problems may occur.

### Race Condition

Multiple threads modifying shared data simultaneously.

Example:
```
count++
```
Two threads updating same variable → incorrect result.

---

### Deadlock

Two threads waiting for each other’s resources indefinitely.

---

### Thread Starvation

Some threads never get CPU time.

---

## Synchronization

Used to control thread access to shared resources.

Example:
```
synchronized void increment() {
    count++;
}
```
Ensures only one thread executes the critical section at a time.

---

## Multithreading vs Multitasking

| Feature | Multithreading | Multitasking |
|---|---|---|
| Scope | Within a process | Across processes |
| Resource sharing | Shared memory | Separate memory |
| Overhead | Lower | Higher |

---

## Real-World Examples

Multithreading is used in:

Web servers  
Database servers  
Game engines  
Video streaming  
File processing systems

Example:

A web server handles **thousands of requests simultaneously using threads**.

---

## Quick Interview Summary

Multithreading in Java allows multiple threads to execute concurrently within a single process, enabling efficient CPU utilization, faster task execution, and responsive applications. Threads share memory but run independently, and they can be created by extending the Thread class or implementing the Runnable interface.

---