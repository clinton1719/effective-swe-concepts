---
title: CyclicBarrier in Java
tags: [java, multithreading, concurrency, cyclicbarrier, synchronization]
difficulty: medium
date: 2026-03-27
---

## What is CyclicBarrier?

**CyclicBarrier** is a synchronization utility from:
```
java.util.concurrent
```
It allows a group of threads to **wait for each other at a common barrier point**, and once all threads arrive, they are **released together**.

---

## Key Idea

- Initialized with a number of threads (**parties**)
- Each thread calls `await()`
- When all threads reach the barrier → all are released
- Then barrier **resets automatically (cyclic)**

---

## Why “Cyclic”?

Because it can be **reused multiple times**, unlike CountDownLatch.

After releasing threads:

- Barrier resets
- Can be used again

---

## Constructor
```
CyclicBarrier barrier = new CyclicBarrier(int parties);
```
Optional:
```
CyclicBarrier barrier = new CyclicBarrier(int parties, Runnable barrierAction);
```

A CyclicBarrier supports an optional Runnable command that is run once per barrier point, after the last thread in the party arrives, but before any threads are released. This barrier action is useful for updating shared-state before any of the parties continue.

---

## Parameters

### parties

Number of threads that must reach the barrier

---

### barrierAction (optional)

A task executed **once when all threads reach the barrier**

---

## Important Methods

### await()

- Thread waits until all threads reach barrier

barrier.await();

---

### reset()

- Resets barrier manually

---

## Example
```
CyclicBarrier barrier = new CyclicBarrier(3);

Runnable task = () -> {

    System.out.println(Thread.currentThread().getName() + " reached barrier");

    try {
        barrier.await();
    } catch (Exception e) {}

    System.out.println(Thread.currentThread().getName() + " passed barrier");

};

new Thread(task).start();
new Thread(task).start();
new Thread(task).start();
```
---

## Output Flow
```
Thread-1 reached barrier  
Thread-2 reached barrier  
Thread-3 reached barrier  
```
(All threads wait)
```
Thread-1 passed barrier  
Thread-2 passed barrier  
Thread-3 passed barrier  
```
---

## Example with barrierAction
```
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("All threads reached barrier!");
});
```
---

## How It Works

1. Barrier initialized with count = 3  
2. Each thread calls `await()`  
3. When count reaches 3 → all threads released  
4. Barrier resets for reuse  

---

## Use Cases

### 1. Parallel Computation

Split work across threads → wait → combine results

---

### 2. Multi-step Processing

All threads complete phase 1 → move to phase 2 together

---

### 3. Simulation Systems

Multiple threads sync at checkpoints

---

## CyclicBarrier vs CountDownLatch

| Feature | CyclicBarrier | CountDownLatch |
|---|---|---|
| Reusable | Yes | No |
| Reset automatically | Yes | No |
| Threads wait for each other | Yes | No (one waits for others) |
| Coordination style | Mutual | One-directional |

---

## Important Notes

### All Threads Must Reach Barrier

If one thread fails:

- Others remain blocked

---

### BrokenBarrierException

Thrown if:

- Barrier is broken
- Thread interrupted

---

### Deadlock Risk

If required threads never reach barrier → threads wait forever

---

## Real-World Analogy

Think of a team:

- All members must reach checkpoint  
- Only when everyone arrives → team moves forward  

---

## Quick Interview Summary

CyclicBarrier is a synchronization utility that allows a group of threads to **wait for each other at a barrier point**, and once all threads arrive, they are released simultaneously. It is reusable, making it suitable for multi-phase parallel processing.

---