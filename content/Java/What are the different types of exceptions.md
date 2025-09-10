---
title: Types of Exceptions in Java
tags: [java, error-handling]
difficulty: easy
date: 2025-09-10
---

## Types of Exceptions in Java

In Java, exceptions are broadly categorized into **two types**:  

---

### ✅ Checked Exceptions
- All exceptions **other than `RuntimeException` and `Error`**.  
- **Checked at compile-time** — the compiler enforces handling of these exceptions.  
- Must be either **caught using try-catch** or **declared using `throws`** in the method signature.  
- Typically represent **external conditions** outside the program's control.  

**Examples:**
- `IOException` → Issues while performing input/output operations.  
- `SQLException` → Errors related to database operations.  
- `FileNotFoundException` → When trying to access a file that doesn’t exist.  

```java
import java.io.*;

public class CheckedExample {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("nonexistent.txt"); // Checked Exception
        } catch (FileNotFoundException e) {
            System.out.println("Handled Checked Exception: " + e.getMessage());
        }
    }
}
```

---

### ✅ Unchecked Exceptions
- Subclasses of **`RuntimeException`**.  
- **Not checked at compile-time** — no obligation to handle them explicitly.  
- Usually caused by **programming mistakes** (bad logic, invalid data, etc.).  
- Though not enforced, good practice is to **validate inputs** and handle these cases.  

**Examples:**
- `NullPointerException` → Accessing methods/properties on `null` objects.  
- `ArithmeticException` → Dividing by zero.  
- `ArrayIndexOutOfBoundsException` → Accessing invalid array indices.  

```java
public class UncheckedExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        System.out.println(numbers[5]); // Unchecked Exception
    }
}
```

---

## 🔑 Key Differences

| Aspect              | Checked Exceptions                      | Unchecked Exceptions             |
|---------------------|-----------------------------------------|----------------------------------|
| **Compile-time check** | Yes (must be handled or declared)       | No                               |
| **Parent class**    | Extends `Exception` (excluding `RuntimeException`) | Extends `RuntimeException`       |
| **Typical cause**   | External conditions (I/O, DB, network)  | Programming errors, bad logic    |
| **Examples**        | `IOException`, `SQLException`, `FileNotFoundException` | `NullPointerException`, `ArithmeticException` |

---

👉 **In interviews:**  
- Emphasize that **checked exceptions enforce robustness** by making developers handle external issues.  
- **Unchecked exceptions** reflect bugs and are usually avoided through better coding practices.
