---
title: Different methods of Object class
tags: [java, object-class, oops]
difficulty: easy
date: 2026-01-01
---

## Methods of the Object Class in Java

In Java, the **`Object`** class is the root of the class hierarchy, and every class directly or indirectly extends it, including arrays. This means all Java classes inherit a common set of core methods that provide basic behavior such as identity, comparison, synchronization, and representation.

---

### ✅ Core Methods of Object Class

| Method | Description |
|--------|-------------|
| `protected Object clone() throws CloneNotSupportedException` | Creates and returns a **shallow copy** of this object; the class must implement `Cloneable` or it throws `CloneNotSupportedException`. |
| `public boolean equals(Object obj)` | Compares this object with the specified object for **logical equality**, often overridden to compare state instead of reference. |
| `public int hashCode()` | Returns a **hash code** value for the object, used in hash-based collections like `HashMap` and `HashSet`; must be consistent with `equals`. |
| `public final Class<?> getClass()` | Returns the **runtime class** of this object, giving access to metadata such as methods and fields via reflection. |
| `public String toString()` | Returns a **string representation** of the object; commonly overridden to provide meaningful output for logging and debugging. |
| `protected void finalize() throws Throwable` | Called by the **garbage collector** before reclaiming the object's memory; this method is deprecated and will be removed in future Java versions. |
| `public final void wait() throws InterruptedException` | Causes the current thread to **wait** until another thread invokes `notify` or `notifyAll` on this object. |
| `public final void wait(long timeout) throws InterruptedException` | Causes the current thread to wait until `notify`/`notifyAll` is called or the specified **timeout in milliseconds** has elapsed. |
| `public final void wait(long timeout, int nanos) throws InterruptedException` | Similar to the above but allows waiting for a more **precise duration** using milliseconds and nanoseconds. |
| `public final void notify()` | Wakes up a **single thread** that is waiting on this object's monitor. |
| `public final void notifyAll()` | Wakes up **all threads** that are waiting on this object's monitor. |

---

### 🧠 Important Notes for Interviews

- `equals()` and `hashCode()` should be **overridden together** to maintain the general contract required by hash-based collections like `HashMap` and `HashSet`.  
- `toString()` is frequently overridden to return a **readable description** of the object instead of the default implementation (`ClassName@hashcode`).  
- `wait()`, `notify()`, and `notifyAll()` provide **low-level thread coordination** and must be called from synchronized blocks or methods that hold the object's monitor.  
- `finalize()` is **deprecated** and should be avoided; use alternatives such as `try-with-resources` or `Cleaner`/`PhantomReference` for resource cleanup.
