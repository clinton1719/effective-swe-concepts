---
title: wait(), notify(), and notifyAll() in Java and Why They Are in Object Class
tags: [java, multithreading, synchronization, concurrency]
difficulty: medium
date: 2026-03-14
---

## Overview

In Java multithreading, **wait(), notify(), and notifyAll()** are methods used for **inter-thread communication**.

They allow threads to **coordinate their execution when working with shared resources**.

These methods are defined in the **Object class**, meaning **every object in Java has a monitor that threads can wait on or notify**.

---

## The Problem They Solve

Sometimes a thread must **wait until another thread completes some work**.

Example:
```
Producer thread → produces data  
Consumer thread → waits until data is available
```
Without coordination:

- Consumer may try to read before data exists
- Results in incorrect behavior

`wait()` and `notify()` solve this problem.

---

## wait() Method

The **wait() method causes the current thread to pause execution until another thread sends a notification**.

Important behavior:

1. Thread releases the **monitor lock**
2. Thread enters **waiting state**
3. Thread stays suspended until notified

Example:
```
synchronized(sharedObject) {

    while(!condition) {
        sharedObject.wait();
    }

}
```
The thread waits until another thread signals it.

---

## notify() Method

The **notify() method wakes up one thread waiting on the object's monitor**.

Example:
```
synchronized(sharedObject) {

    condition = true;
    sharedObject.notify();

}
```
Behavior:

- Wakes **one waiting thread**
- That thread competes to regain the lock

---

## notifyAll() Method

The **notifyAll() method wakes up all threads waiting on the object's monitor**.

Example:
```
synchronized(sharedObject) {

    condition = true;
    sharedObject.notifyAll();

}
```
Behavior:

- All waiting threads become runnable
- Only one thread gets the lock at a time

---

## Example: Producer Consumer
The problem describes two processes, the
producer and the consumer, who share a common, fixed-size buffer used
as a queue. The producer's job is to generate data, put it into the buffer
and start again. At the same me, the consumer is consuming the data (i.e.
removing it from the buffer), one piece at a me. The problem is to make
sure that the producer won't try to add data into the buffer, if it's full and
that the consumer won't try to remove data from an empty buffer.
The solu on for the producer is to either go to sleep or discard data if the
buffer is full. The next me the consumer removes an item from the buffer,
it no fies the producer, who starts to fill the buffer again. In the same way,
the consumer can go to sleep if it finds the buffer empty. The next me the
producer puts data into the buffer, it wakes up the sleeping consumer

```
class Test {

    List<String> buffer;

    public void produce(String data) {
        buffer.add(data);
        notify();
    }

    public void consume() {
        while (buffer.isEmpty()) {
            wait;
        }
        return buffer.remove();
    }

}
```
How the race condition on problem can occur:
Suppose, a thread has called the consume() method and it finds that the
buffer is Empty

Now, just before the wait() method is called, another thread calls produce()
and adds an item to the buffer and calls notify()

And The first thread calls the wait() method. In this case, notify() call by the
second thread will be missed if by any chance, produce() method is not called then the consumer thread will be stuck in waiting state indefinitely, even though there is data
available in the buffer.

The solution to above problem is using synchronized method/block to
make sure that notify() is never called between the condition on isEmpty() and wait()

```
class Test {

    List<String> buffer;

    public synchronized void produce(String data) {
        buffer.add(data);
        notify();
    }

    public synchronized void consume() {
        while (buffer.isEmpty()) {
            wait;
        }
        return buffer.remove();
    }

}
```

---

## Rules for wait(), notify(), notifyAll()

These methods must always:

1. Be called inside a **synchronized block or method**
2. Use the **same object whose monitor is locked**

Example:
```
synchronized(obj) {

    obj.wait();

}
```
Otherwise JVM throws:

IllegalMonitorStateException

---

## Difference Between notify() and notifyAll()

| Method | Behavior |
|---|---|
| notify() | Wakes one waiting thread |
| notifyAll() | Wakes all waiting threads |

notifyAll() is safer in many cases because it prevents **missed signals**.

---

## Why These Methods Are in Object Class (Not Thread)

Key design reason:

**Locks belong to objects, not threads.**

In Java:

Every object has a **monitor lock**.

Threads synchronize on objects like:

synchronized(obj)

Because threads wait on **object monitors**, the wait/notify mechanism must be associated with the **object**, not the thread.

If these methods were in Thread:
```
Thread.wait()  ❌
```
It would not indicate **which object's lock the thread is waiting on**.

Correct design:
```
obj.wait()
```
Meaning:

Thread waits on **obj's monitor**.

---

## Conceptual Model

Thread → tries to enter object monitor

Example:
```
synchronized(obj) {

}
```
Inside this monitor:
```
obj.wait()  
obj.notify()
```
Thus **communication happens via shared objects**.

---

## Modern Alternatives

In modern Java, higher-level concurrency utilities are often preferred:

java.util.concurrent

Examples:

- BlockingQueue
- CountDownLatch
- Semaphore
- ReentrantLock + Condition

These provide safer and more flexible thread coordination.

---

## Quick Interview Summary

`wait()`, `notify()`, and `notifyAll()` are methods used for inter-thread communication. `wait()` pauses a thread and releases the object's monitor lock until another thread calls `notify()` or `notifyAll()`. These methods are defined in the **Object class because synchronization and monitor locks are associated with objects rather than threads**.

---