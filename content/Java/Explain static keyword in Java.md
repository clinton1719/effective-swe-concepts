---
title: Explain static keyword in Java
tags: [java, oops]
difficulty: easy
date: 2026-01-06
---

In Java, the **static** keyword means “belonging to the class, not to any particular object.” A static member is shared across all instances and can often be accessed using the class name directly.

---

## Where can static be used?

The static keyword can be applied to:

- Static variable (class variable)  
- Static method  
- Static block  
- Static nested class  

These members are loaded and handled at the class level rather than per object.

---

## Static variables (class variables)

- A static variable is **shared** by all instances of the class.  
- Only **one copy** of a static variable exists in the JVM, created when the class is loaded.  
- Static variables are typically used for **common properties** of all objects (like a company name shared by all Employee objects).

Example idea:
- All Employee objects share the same companyName static variable instead of each object storing its own copy.

Key points:

- Memory is allocated once when the class is loaded.  
- Accessed using ClassName.variableName (though instance access is also allowed, it is not recommended).

---

## Static methods

- A static method **belongs to the class**, not to any object.  
- It can be called using the class name without creating an object (for example, `Math.max(...)` or `ClassName.methodName()`).

Important rules:

- A static method **cannot access non-static (instance) members directly**, because it does not have an instance (`this`) to work with.  
- `this` and `super` **cannot** be used in a static context.  
- The `main` method (`public static void main(String[] args)`) is static so that the JVM can call it **without creating an object** of the class.

---

## Static blocks

- A static block is a block of code marked with the `static` keyword inside a class.  
- It runs **exactly once**, when the class is first loaded by the JVM.  
- Commonly used to **initialize static variables** or perform one-time setup.

Example idea:

- Load configuration or initialize static resources in a static block, which runs before any object is created or any static method is called.

---

## Static nested classes

- A static nested class is a **static inner class** declared inside another class.  
- It can be created **without an instance** of the outer class.

Key properties:

- A static nested class can **only access static members** of the outer class directly.  
- It improves **organization and readability** when the nested class is logically tied to the outer class but does not need an outer instance.

Object creation syntax:

OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();

Notes:

- A normal (non-static) inner class requires an instance of the outer class to be created.  
- A static nested class does **not** require an outer class object; it behaves more like a top-level class scoped inside another class.

---

## Summary-style interview tips

- Use **static variables** for data shared by all objects (like constants or global config).  
- Use **static methods** for utility/helper behavior that does not depend on instance state (for example, factory methods, math helpers).  
- Use **static blocks** for one-time static initialization.  
- Use **static nested classes** when the nested type is related to the outer class but does not need access to its instance data.
