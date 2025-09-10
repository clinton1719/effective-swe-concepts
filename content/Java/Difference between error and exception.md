---
title: Difference Between Error and Exception in Java
tags: [java, error-handling]
difficulty: easy
date: 2025-09-10
---

## Error vs Exception in Java

In Java, both **Errors** and **Exceptions** are part of the `Throwable` hierarchy, but they serve **very different purposes**.

---

### ✅ Errors
- Represent **serious issues** that a program should not try to handle.  
- Usually caused by the **runtime environment (JVM issues)** rather than application logic.  
- Errors are **irrecoverable** — when they occur, the program typically **terminates abruptly**.  

**Examples:**
- `OutOfMemoryError` → JVM ran out of memory.  
- `StackOverflowError` → Too many recursive calls.  
- `VirtualMachineError` → Underlying JVM issue.

```java
public class ErrorExample {
    public static void main(String[] args) {
        causeStackOverflow();
    }

    static void causeStackOverflow() {
        causeStackOverflow(); // infinite recursion -> StackOverflowError
    }
}
```

---

### ✅ Exceptions
- Represent **conditions** that occur due to bad code or external factors.  
- They are **recoverable** if handled properly.  
- Exceptions are divided into:
  - **Checked Exceptions** (must be declared/handled, e.g., `IOException`)  
  - **Unchecked Exceptions** (runtime issues, e.g., `NullPointerException`, `ArithmeticException`)  

**Examples:**
- `NullPointerException` → Accessing a property/method on a null object.  
- `ArithmeticException` → Dividing an integer by zero.  
- `IOException` → File not found or input/output issue.

```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Recovering from exception: " + e.getMessage());
        }
    }
}
```

---

## 🔑 Key Differences

| Aspect            | Error                             | Exception                      |
|-------------------|-----------------------------------|--------------------------------|
| **Nature**        | Serious, unrecoverable issues     | Recoverable abnormal situations|
| **Cause**         | JVM/environment failures          | Application logic or external inputs |
| **Handling**      | Cannot/should not be handled      | Can and should be handled with try-catch |
| **Examples**      | `OutOfMemoryError`, `StackOverflowError` | `NullPointerException`, `IOException` |

---

👉 **In interviews:**  
Remember to stress that **Errors are fatal and usually unhandled**, while **Exceptions represent problems that can be anticipated and managed**.
