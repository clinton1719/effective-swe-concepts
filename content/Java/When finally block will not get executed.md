---
title: When will `finally` block not get executed in Java?
tags: [exception]
difficulty: medium
date: 2025-09-15
---

## Overview
The `finally` block in Java is designed to **always execute** after the `try` and `catch` blocks, regardless of whether an exception occurs.  
It is typically used for **resource cleanup** (closing files, database connections, releasing locks, etc.).

However, there are certain **special cases** where the `finally` block will **not execute**.

---

## Cases When `finally` Does Not Execute

### 1. When the JVM Terminates Abruptly
If the JVM shuts down or exits before the `finally` block executes, it won’t run.

```java
public class FinallyExample {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try block");
            System.exit(0);  // Terminates JVM
        } finally {
            System.out.println("Finally block"); // ❌ Not executed
        }
    }
}
```

**Reason:** `System.exit(0)` halts the JVM immediately.

---

### 2. When the Thread is Killed/Interrupted Forcefully
If a thread running the `try-finally` block is killed (e.g., via `Thread.stop()` — deprecated), the `finally` block may not run.

---

### 3. When a Fatal Error Occurs
For example, **OutOfMemoryError** or **StackOverflowError** may prevent execution of `finally`.

```java
try {
    int[] arr = new int[Integer.MAX_VALUE]; // Causes OutOfMemoryError
} finally {
    System.out.println("Cleanup code"); // ❌ May not run
}
```

---

### 4. When JVM Crashes
Any **native crash** (e.g., due to native code or external library failure) may prevent `finally` from executing.

---

## Normal Execution Example
In normal cases (even with `return` or exceptions), the `finally` block **does execute**:

```java
public class NormalFinally {
    public static void main(String[] args) {
        System.out.println(test());
    }

    static int test() {
        try {
            return 1;
        } finally {
            System.out.println("Finally executed!"); // ✅ Will run
        }
    }
}
```

Output:
```
Finally executed!
1
```

---

## Summary

| Case | Will `finally` execute? |
|------|--------------------------|
| Normal execution | ✅ Yes |
| With `return` statement | ✅ Yes |
| With exception thrown | ✅ Yes (after catch or directly) |
| `System.exit(0)` | ❌ No |
| JVM crash | ❌ No |
| Fatal errors (`OutOfMemoryError`, `StackOverflowError`) | ❌ No guarantee |
| Thread killed | ❌ No guarantee |

✅ **Key Point:** The `finally` block is *almost always* executed, except in cases where the JVM itself is terminated abnormally.

