---
title: Thread Life Cycle in Java – Phases of a Thread
tags: [java, multithreading, thread-lifecycle, concurrency]
difficulty: easy
date: 2026-03-22
---

## Overview

In Java, a thread goes through **different phases (states)** during its lifetime, from creation to termination.

These states are defined in:
```
Thread.State enum
```
Understanding these states helps in debugging and designing multithreaded applications.

---

## Thread Life Cycle Phases

A thread typically goes through the following states:

1. NEW  
2. RUNNABLE  
3. RUNNING (conceptual, part of RUNNABLE)  
4. BLOCKED  
5. WAITING  
6. TIMED_WAITING  
7. TERMINATED  

---

## 1. NEW State

Thread is **created but not yet started**.

Example:
```
Thread t = new Thread();
```
- No system resources allocated yet
- Thread is not scheduled for execution

---

## 2. RUNNABLE State

Thread is **ready to run** and waiting for CPU.

Example:
```
t.start();
```
- Thread enters runnable pool
- Scheduler decides when to execute

Note:

Java combines **Ready + Running** into RUNNABLE.

---

## 3. RUNNING State (Conceptual)

Thread is **actively executing**.

- Not a separate state in Java API
- Internally part of RUNNABLE

---

## 4. BLOCKED State

Thread is **waiting to acquire a monitor lock**.

Example:
```
synchronized(obj) {

}
```
If another thread holds the lock → current thread becomes BLOCKED.

---

## 5. WAITING State

Thread waits **indefinitely** until another thread notifies it.

Triggered by:

- wait()
- join()

Example:
```
obj.wait();
```
Thread stays here until:

- notify()
- notifyAll()

---

## 6. TIMED_WAITING State

Thread waits for a **specified amount of time**.

Triggered by:

- sleep(ms)
- wait(ms)
- join(ms)

Example:
```
Thread.sleep(1000);
```
After time expires → thread moves back to RUNNABLE.

---

## 7. TERMINATED State

Thread has **completed execution**.

- run() method finishes
- Thread cannot be restarted

After run() ends → thread dies

---

## State Transition Flow

NEW  
 ↓ (start())  
RUNNABLE  
 ↓ (scheduled)  
RUNNING  
 ↓  
BLOCKED / WAITING / TIMED_WAITING  
 ↓  
RUNNABLE  
 ↓  
TERMINATED  

---

## Example Demonstration
```
Thread t = new Thread(() -> {

    try {
        Thread.sleep(1000);
    } catch (Exception e) {}

});

System.out.println(t.getState()); // NEW

t.start();

System.out.println(t.getState()); // RUNNABLE
```
---

## Key Notes

### RUNNING is not explicit

Java does not expose RUNNING as a separate state.

---

### BLOCKED vs WAITING

BLOCKED → waiting for lock  
WAITING → waiting for signal (notify/join)

---

### Thread Cannot Restart

Once TERMINATED:

t.start();  ❌ (throws exception)

---

## Real-World Understanding

Think of thread states like:

NEW → created  
RUNNABLE → ready  
RUNNING → executing  
WAITING → paused for signal  
TIMED_WAITING → paused for time  
BLOCKED → waiting for resource  
TERMINATED → finished  

---

## Quick Interview Summary

A thread in Java goes through states like **NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED**. These states represent different phases of execution and waiting conditions, helping manage thread scheduling and synchronization.

---