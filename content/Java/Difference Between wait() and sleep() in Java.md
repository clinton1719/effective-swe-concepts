---
title: Difference Between wait() and sleep() in Java
tags: [java, multithreading, wait, sleep, concurrency]
difficulty: easy
date: 2026-03-14
---

## Overview

Both **wait()** and **sleep()** are used to pause thread execution, but they serve **completely different purposes** in Java concurrency.

- `wait()` → used for **thread communication and synchronization**
- `sleep()` → used for **pausing execution for a fixed time**

---

## Key Differences

| Feature | wait() | sleep() |
|---|---|---|
| Class | Object class | Thread class |
| Purpose | Inter-thread communication | Pause execution |
| Lock Release | Releases lock | Does NOT release lock |
| Requires synchronized | Yes | No |
| Wake-up mechanism | notify()/notifyAll() | Time completion |
| State | Waiting state | Timed waiting state |

---

## 1. wait() Method

`wait()` is used when a thread needs to **wait until a condition is met by another thread**.

Behavior:

- Releases the **monitor lock**
- Moves thread to **waiting state**
- Waits until `notify()` or `notifyAll()` is called

Example:
```
synchronized(obj) {

    while(!condition) {
        obj.wait();
    }

}
```
Important points:

- Must be called inside a **synchronized block**
- Always used with **shared objects**

---

## 2. sleep() Method

`sleep()` pauses execution for a **specific amount of time**.

Example:
```
Thread.sleep(1000);  // sleep for 1 second
```
Behavior:

- Does **not release any locks**
- Thread remains blocked for the specified time
- Automatically resumes after time expires

---

## Example Comparison

### Using sleep()
```
synchronized(obj) {

    Thread.sleep(1000);

}
```
Effect:

- Thread sleeps
- Lock is still held
- Other threads cannot access `obj`

---

### Using wait()
```
synchronized(obj) {

    obj.wait();

}
```
Effect:

- Thread waits
- Lock is released
- Other threads can enter synchronized block

---

## Practical Difference

### wait()

Used when:

- Thread depends on another thread’s action
- Example: Producer–Consumer problem

---

### sleep()

Used when:

- Delay is required
- Example: Retry mechanism, polling, animation delay

---

## Important Notes

### wait() releases lock

Allows other threads to proceed.

---

### sleep() does NOT release lock

Can cause blocking issues if used inside synchronized blocks.

---

### wait() requires notify()

Thread remains waiting indefinitely unless notified.

---

### sleep() auto-resumes

After specified time, thread continues execution.

---

## Common Mistake

Using `sleep()` instead of `wait()` for coordination.

Problem:

- No communication between threads
- Leads to inefficient polling

Correct approach:

Use `wait()` + `notify()` for coordination.

---

## Quick Interview Summary

`wait()` is used for **inter-thread communication** and releases the object's lock, while `sleep()` is used to **pause execution for a fixed duration** and does not release any locks. `wait()` must be called inside a synchronized block, whereas `sleep()` can be called anywhere.

---