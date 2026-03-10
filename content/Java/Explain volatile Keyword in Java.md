---
title: Explain volatile Keyword in Java
tags: [java, concurrency, volatile, memory-model, multithreading]
difficulty: medium
date: 2026-03-10
---

## What is the volatile Keyword in Java?

The **volatile keyword** is used to indicate that a variable’s **value will be modified by multiple threads** and should **always be read from and written to main memory**, not from a thread’s local CPU cache.

In simple terms:

volatile ensures **visibility of changes across threads**.

---

## Why volatile Is Needed

Modern CPUs use **thread-local caches** for performance.

Without volatile:

Thread A may update a variable in **main memory**, but  
Thread B might still read the **old value from its CPU cache**.

Result → **inconsistent values across threads**.

volatile forces the JVM to:

- Write changes **directly to main memory**
- Read the latest value **from main memory**

---

## Example Problem Without volatile

Consider this code:
```
class FlagExample {

    private static boolean running = true;

    public static void main(String[] args) {

        Thread t = new Thread(() -> {
            while (running) {
            }
            System.out.println("Stopped");
        });

        t.start();

        try {
            Thread.sleep(1000);
        } catch (Exception e) {}

        running = false;
    }
}
```
Expected behavior:

Thread stops after 1 second.

Actual problem:

The loop may **never stop**.

Reason:

Thread may cache `running = true` and never see the update.

---

## Fix Using volatile
```
class FlagExample {

    private static volatile boolean running = true;

}
```
Now:

- Any write to `running` goes to **main memory**
- Other threads **immediately see the change**

Thread exits correctly.

---

## What volatile Guarantees

### 1. Visibility

Changes made by one thread are **immediately visible** to others.

Example:

Thread A → counter = 5  
Thread B → reads counter → sees 5

Without volatile → may still see old value.

---

### 2. Happens-Before Relationship

volatile creates a **happens-before relationship** in the Java Memory Model.

Meaning:

Write to volatile variable → happens before → subsequent reads.

Example:
```
volatile boolean ready;
```
Thread A:
```
data = 42  
ready = true
```
Thread B:
```
if (ready)  
print(data)
```
Because `ready` is volatile, Thread B will **always see data = 42**.

---

### 3. Prevents Instruction Reordering

The JVM and CPU sometimes **reorder instructions for optimization**.

volatile prevents certain reordering operations around that variable.

Example:

Without volatile:

1. Allocate object memory  
2. Assign reference  
3. Initialize object  

Reordering may produce:

1. Allocate memory  
2. Assign reference  
3. Initialize later

Another thread may receive **partially constructed object**.

volatile prevents this issue.

---

## Important Limitation
A common mistake is using volatile for counters, like volatile int count;. Although the read and write operations on count are individually volatile, the operation count++ is not. 

Volatile **does NOT guarantee atomicity** for compound operations. This means while all threads will see the most up-to-date value of a volatile variable, multiple threads acting on it simultaneously can still cause data inconsistencies, such as lost updates

Example:
```
volatile int count = 0;

count++;
```
count++ is actually three distinct steps:

1. Read the current value of count from memory.
2. Increment the value (local to the thread).
3. Write the new value back to memory

If two threads perform count++ simultaneously, they might both read the value 0, increment it to 1, and write 1 back to memory, resulting in a lost update (the value should be 2). 

Expected → 2  
Actual → 1

---

## When volatile Is Appropriate

Use volatile when:

- Variable is **shared across threads**
- Only **simple reads/writes** occur
- No compound operations (++, +=, etc.)
- Writes to the variable do not depend on its current value, OR
Only one thread updates the variable while others only read it

Common examples:

- Status flags
- Shutdown signals
- Configuration updates

---

## volatile vs synchronized

| Feature | volatile | synchronized |
|------|------|------|
| Visibility | Yes | Yes |
| Atomicity | No | Yes |
| Locking | No | Yes |
| Performance | Faster | Slower due to locking |

volatile is **lighter weight** than synchronization.

---

## volatile in Double Checked Locking

In Singleton implementation:
```
private static volatile Singleton instance;
```
Why needed?

Without volatile:

Object creation may be **reordered**.

Possible sequence:

1. Allocate memory
2. Assign reference to instance
3. Initialize object

Another thread may see a **non-null but partially constructed object**.

volatile prevents this.

---

## Real-World Uses

### Thread Stop Flags

volatile boolean stopped;

---

### State Indicators

volatile boolean initialized;

---

### Singleton Double-Checked Locking

Ensures safe publication of object.

---

## Quick Interview Summary

volatile ensures **visibility and ordering guarantees for shared variables in multithreaded programs**. It forces reads and writes to occur directly from main memory and prevents instruction reordering, but it **does not guarantee atomicity**.

---