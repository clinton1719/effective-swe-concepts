---
title: ThreadPoolExecutor in Java – Constructor Parameters Explained
tags: [java, multithreading, threadpool, executor, concurrency]
difficulty: medium
date: 2026-03-22
---

## What is ThreadPoolExecutor?

**ThreadPoolExecutor** is a **core implementation of ExecutorService** that provides **fine-grained control over thread pool behavior**.

Unlike `Executors` utility methods, it allows you to **customize thread creation, queueing, and rejection policies**.

---

## Why Use ThreadPoolExecutor?

`Executors` methods (like fixed thread pool) internally use ThreadPoolExecutor but **hide configuration details**.

Using ThreadPoolExecutor directly gives control over:

- Number of threads
- Queue size
- Thread lifecycle
- Task rejection handling

---

## Constructor
```
ThreadPoolExecutor(
    int corePoolSize,
    int maximumPoolSize,
    long keepAliveTime,
    TimeUnit unit,
    BlockingQueue<Runnable> workQueue,
    ThreadFactory threadFactory,
    RejectedExecutionHandler handler
)
```
---

## Parameters Explained

---

## 1. corePoolSize

Minimum number of threads to keep in the pool.

Behavior:

- Threads are created **up to this number even if idle**
- Tasks are immediately assigned to these threads

Example:

corePoolSize = 2

→ First 2 tasks → new threads created

---

## 2. maximumPoolSize

Maximum number of threads allowed in the pool.

Behavior:

- If queue is full → new threads created up to this limit

Example:

maxPoolSize = 5

→ After queue fills → threads increase up to 5

---

## 3. keepAliveTime

Time an **idle thread above corePoolSize** will wait before terminating.

Example:

keepAliveTime = 10 seconds

→ Extra threads die after being idle for 10 seconds

---

## 4. TimeUnit

Defines the unit for keepAliveTime.

Examples:

TimeUnit.SECONDS  
TimeUnit.MILLISECONDS  

---

## 5. BlockingQueue<Runnable> workQueue

Queue used to hold tasks before execution.

Common types:

### LinkedBlockingQueue

- Unbounded queue
- Tasks wait indefinitely

### ArrayBlockingQueue

- Fixed size queue
- Prevents memory overflow

### SynchronousQueue

- No storage
- Task handed directly to thread

---

## 6. ThreadFactory

Used to create new threads.

Customizes:

- Thread name
- Priority
- Daemon status

Example:
```
ThreadFactory factory = r -> new Thread(r, "CustomThread");
```
---

## 7. RejectedExecutionHandler

Defines what happens when:

- Queue is full AND
- Maximum threads reached

Built-in policies:

### AbortPolicy (default)

Throws exception

---

### CallerRunsPolicy

Task runs in calling thread

---

### DiscardPolicy

Silently drops task

---

### DiscardOldestPolicy

Removes oldest task and adds new one

---

## How ThreadPoolExecutor Works (Flow)

When a task is submitted:

1. If active threads < corePoolSize  
   → Create new thread

2. Else → add task to queue

3. If queue is full AND threads < maxPoolSize  
   → Create new thread

4. Else → apply rejection policy

---

## Visual Flow

Task arrives →

IF threads < core → create thread  
ELSE queue task  
IF queue full → create thread (up to max)  
IF max reached → reject task  

---

## Example
```
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                          // core
    4,                          // max
    10,                         // keepAliveTime
    TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(2),
    Executors.defaultThreadFactory(),
    new ThreadPoolExecutor.AbortPolicy()
);

executor.submit(() -> {
    System.out.println("Task executed");
});

executor.shutdown();
```
---

## Practical Insight

Configuration determines behavior:

Small queue + large max → more threads  
Large queue + small max → fewer threads, more waiting  

---

## Common Mistake

Using:
```
Executors.newFixedThreadPool()
```
Internally uses **unbounded queue**, which may cause:

OutOfMemoryError

Better:

Use ThreadPoolExecutor with **bounded queue**

---

## Quick Interview Summary

ThreadPoolExecutor is a customizable implementation of ExecutorService that allows control over thread pool size, task queueing, thread lifecycle, and rejection handling. Its constructor parameters define how threads are created, how tasks are queued, and what happens when the system is overloaded.

---