---
title: CountDownLatch in Java
tags: [java, multithreading, concurrency, countdownlatch, synchronization]
difficulty: medium
date: 2026-03-26
---

## What is CountDownLatch?

**CountDownLatch** is a synchronization utility from:
```
java.util.concurrent
```
It allows one or more threads to **wait until a set of operations being performed by other threads completes**.

---

## Key Idea

- Initialized with a **count**
- Threads call `countDown()` to decrease the count
- Other threads call `await()` to wait
- When count reaches **zero → waiting threads proceed**

---

## Real-World Analogy

Think of a race:

- Referee waits for 3 players to be ready  
- Each player signals readiness  
- Once all are ready → race starts  

CountDownLatch = counter controlling start

---

## Constructor
```
CountDownLatch latch = new CountDownLatch(int count);
```
Example:
```
CountDownLatch latch = new CountDownLatch(3);
```
---

## Important Methods

### await()

- Makes thread **wait until count reaches zero**

latch.await();

---

### countDown()

- Decreases count by 1

latch.countDown();

---

## Example
```
CountDownLatch latch = new CountDownLatch(3);

Runnable worker = () -> {
    System.out.println(Thread.currentThread().getName() + " working");
    latch.countDown();
};

new Thread(worker).start();
new Thread(worker).start();
new Thread(worker).start();

latch.await();

System.out.println("All tasks completed");
```
---

## Output Flow

Worker 1 working  
Worker 2 working  
Worker 3 working  
All tasks completed  

---

## How It Works

1. Latch initialized with count = 3  
2. Each thread calls `countDown()`  
3. Count becomes 0  
4. Waiting thread (main) resumes  

---

## Key Characteristics

### One-Time Use

- Cannot reset once count reaches zero
- Need new latch for reuse

---

### Thread Coordination

- Helps coordinate multiple threads
- Common in parallel execution

---

## Use Cases

### 1. Waiting for Multiple Tasks

Main thread waits until all worker threads finish

---

### 2. Starting Multiple Threads Together

All threads wait until latch reaches zero → start together

---

### 3. Testing Multithreaded Code

Ensures threads complete before assertions

---

## Example: Start All Threads Together
```
CountDownLatch latch = new CountDownLatch(1);

Runnable task = () -> {
    try {
        latch.await();
    } catch (Exception e) {}

    System.out.println(Thread.currentThread().getName() + " started");
};

new Thread(task).start();
new Thread(task).start();

Thread.sleep(1000);

latch.countDown();  // releases all threads
```
---

## CountDownLatch vs join()

| Feature | CountDownLatch | join() |
|---|---|---|
| Wait for multiple threads | Yes | No (one thread at a time) |
| Reusable | No | Yes |
| Flexible coordination | High | Low |

---

## Limitations

- Cannot reset
- One-time synchronization only

---

## Alternative

For reusable synchronization:

- CyclicBarrier  
- Phaser  

---

## Quick Interview Summary

CountDownLatch is a synchronization utility that allows threads to **wait until a set of operations completes**, using a countdown mechanism. Once the count reaches zero, all waiting threads are released.

---