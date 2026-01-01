---
title: What type of arguments are allowed in System.out.println() method
tags: [java, io, printing]
difficulty: easy
date: 2026-01-01
---

## Arguments Allowed in System.out.println()

The **`System.out.println()`** method is overloaded to accept **multiple data types** as arguments. It ultimately converts any argument to its **string representation** using `toString()` or `String.valueOf()` before printing.

---

### ✅ Supported Argument Types

| Type | Examples | Behavior |
|------|----------|----------|
| **String** | `"Hello World"`, `"Name: " + name` | Prints the string as-is |
| **char** | `'A'`, `'\n'` | Prints the character |
| **char[]** | `char[] chars = {'H','i'}` | Prints the characters as a string |
| **boolean** | `true`, `false` | Prints `"true"` or `"false"` |
| **int** | `42`, `x` | Prints the decimal integer value |
| **long** | `123456789L` | Prints the long integer value |
| **float** | `3.14f` | Prints decimal with 6 digits precision |
| **double** | `Math.PI` | Prints decimal with 17 digits precision |
| **Object** | `new Object()`, `myList` | Calls `obj.toString()` for representation |

---

### 🧠 Key Points

- **Any object** can be passed — it calls `toString()` on the object (default is `ClassName@hashcode`).
- **null** prints as the string `"null"`.
- **Arrays** print their `toString()` representation (e.g., `[I@1b6d3586` for int arrays).
- The method **always appends a newline** (`\n`) after printing.

---

### 💡 Examples
```
public class PrintlnExamples {
public static void main(String[] args) {
System.out.println("String"); // String
System.out.println(42); // int → "42"
System.out.println(3.14); // double → "3.14"
System.out.println(true); // boolean → "true"
System.out.println('A'); // char → "A"
    int[] arr = {1, 2, 3};
    System.out.println(arr);                // Array → "[I@1b6d3586"
    
    System.out.println(null);               // null → "null"
}
}
```


**Output:**
```
String
42
3.14
true
A
[I@1b6d3586
null
```


---

👉 **Interview Tip:**  
Remember: `println()` works with **any type** because it uses `String.valueOf(argument)` internally, which handles the conversion to string representation for you.

