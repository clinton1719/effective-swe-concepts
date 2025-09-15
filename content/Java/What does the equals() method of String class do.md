---
title: What does the equals() method of String class do?
tags: [string]
difficulty: easy
date: 2025-09-15
---

## ✅ Short Answer
The `equals()` method of the `String` class **compares the contents (sequence of characters)** of two strings for equality.  
It does **not** check whether both references point to the same object — that is done by the `==` operator.

---

## 🔎 Explanation

### 1. `==` Operator
- Compares **object references**, i.e., whether two variables point to the same memory location.
- Example:
  ```java
  String s1 = "hello";
  String s2 = "hello";
  String s3 = new String("hello");

  System.out.println(s1 == s2); // true (both refer to String Pool object)
  System.out.println(s1 == s3); // false (s3 is a new object in heap)
  ```

---

### 2. `equals()` Method
- Overridden in the `String` class to compare **character sequences**.
- Example:
  ```java
  String s1 = "hello";
  String s2 = new String("hello");

  System.out.println(s1.equals(s2)); // true (content is the same)
  ```

---

## 📌 Why Was `equals()` Overridden in String?
- In `Object` class, the default `equals()` compares **references (like `==`)**.  
- Since strings are meant to represent **textual data**, comparing references is not meaningful.  
- Thus, `String` overrides `equals()` to check **value equality**.

---

## 📖 Example with Both Cases
```java
public class EqualsTest {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        // Using ==
        System.out.println(s1 == s2);   // true (same reference from String Pool)
        System.out.println(s1 == s3);   // false (different object)

        // Using equals()
        System.out.println(s1.equals(s2)); // true (same content)
        System.out.println(s1.equals(s3)); // true (same content)
    }
}
```

---

## 👉 Interview Tip
If asked:  
- "`==` vs `equals()` in String?"  
  - **`==` checks references**.  
  - **`equals()` checks content**.  
- Always use `equals()` when you want to compare the **actual text** inside strings.  

