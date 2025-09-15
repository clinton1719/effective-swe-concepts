---
title: What is the `final` Keyword and Where Can It Be Used?
tags: [oops]
difficulty: easy
date: 2025-09-10
---

This is a fundamental Java interview question. The answer is:

> ✅ **The `final` keyword in Java is a non-access modifier used to restrict variables, methods, and classes.**

## Usage of `final`

1. **Final Variables**  
   - If a variable is declared as `final`, its value **cannot be reassigned** after initialization.  
   - For **primitive types**, the value itself cannot change.  
   - For **object references**, the reference cannot point to a new object (but the object’s internal state can still be modified, unless the object is immutable).

   ```java
   final int x = 10;
   // x = 20; // ❌ Compile-time error

   final List<String> list = new ArrayList<>();
   list.add("A"); // ✅ Allowed (modifying object state)
   // list = new ArrayList<>(); // ❌ Not allowed
   ```

2. **Final Methods**  
   - A `final` method cannot be **overridden** by subclasses.  
   - Useful when you want to prevent alteration of important logic.  

   ```java
   class Parent {
       public final void show() {
           System.out.println("Parent logic");
       }
   }

   class Child extends Parent {
       // ❌ Not allowed
       // public void show() { ... }
   }
   ```

3. **Final Classes**  
   - A `final` class cannot be **extended** (no subclass can inherit it).  
   - Example: `java.lang.String` is a `final` class in Java.

   ```java
   final class Utility {
       void helper() {
           System.out.println("Helper method");
       }
   }

   // ❌ Not allowed
   // class ExtendedUtility extends Utility { }
   ```

4. **Final Parameters**  
   - A method parameter declared as `final` cannot be reassigned within the method body.  

   ```java
   void process(final int value) {
       // value = 20; // ❌ Not allowed
       System.out.println(value);
   }
   ```

---

## Key Point for Interviews

- **Final variable** → value/reference cannot be reassigned.  
- **Final method** → cannot be overridden.  
- **Final class** → cannot be extended.  
- **Final parameter** → cannot be reassigned inside method.  

This ensures **immutability**, **security**, and prevents **unintended modification** of code.  
