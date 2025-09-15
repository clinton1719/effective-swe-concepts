---
title: Difference between `throw` and `throws` keyword, and discuss Exception Propagation
tags: [exception]
difficulty: medium
date: 2025-09-15
---

## Difference between `throw` and `throws`

| Feature | `throw` | `throws` |
|---------|---------|----------|
| **Purpose** | Used to actually **throw** an exception object. | Used in a method signature to **declare** exceptions that the method might throw. |
| **Usage** | Inside a method or block. | With method declaration. |
| **Number of Exceptions** | Can throw **only one exception** at a time. | Can declare **multiple exceptions**, separated by commas. |
| **Keyword Position** | Followed by an **exception object**. | Followed by **exception class names**. |
| **Example** | `throw new ArithmeticException("Divide by zero");` | `public void readFile() throws IOException, SQLException { ... }` |

### Example of `throw`
```java
public class ThrowExample {
    public static void main(String[] args) {
        int age = 15;
        if (age < 18) {
            throw new ArithmeticException("Not eligible to vote");
        }
        System.out.println("Eligible to vote");
    }
}
```

### Example of `throws`
```java
import java.io.*;

public class ThrowsExample {
    public static void main(String[] args) throws IOException {
        readFile();
    }

    static void readFile() throws IOException {
        FileReader file = new FileReader("test.txt");
        BufferedReader br = new BufferedReader(file);
        System.out.println(br.readLine());
        br.close();
    }
}
```

---

## Exception Propagation

**Definition:**  
When an exception occurs inside a method, it is **propagated up the call stack** until it is caught by a matching `catch` block, or else the program terminates.

### How Propagation Works
1. If an exception occurs in a method and is not handled there, the method **exits immediately** and passes the exception to its **caller**.
2. This continues up the stack until:
   - The exception is caught by a `catch` block, or  
   - It reaches the JVM (which will terminate the program).

---

### Example of Exception Propagation
```java
public class PropagationExample {

    void method1() {
        int result = 10 / 0; // ArithmeticException
    }

    void method2() {
        method1(); // Exception propagates here
    }

    void method3() {
        try {
            method2();
        } catch (ArithmeticException e) {
            System.out.println("Exception handled in method3");
        }
    }

    public static void main(String[] args) {
        PropagationExample obj = new PropagationExample();
        obj.method3();
        System.out.println("Program continues...");
    }
}
```

**Output:**
```
Exception handled in method3
Program continues...
```

---

## Summary

- **`throw`** → Used to throw an exception object.  
- **`throws`** → Used to declare exceptions a method might throw.  
- **Exception Propagation** → If an exception is not handled in a method, it propagates to the caller until it’s caught or the program terminates.

✅ Interview Tip: Always highlight that **checked exceptions must be declared with `throws`** if not handled, while unchecked exceptions (like `RuntimeException`) are propagated automatically.

