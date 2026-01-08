---
title: What is called first, constructor or init block?
tags: [java, initialization, blocks, constructors]
difficulty: easy
date: 2026-01-08
---

## What is Called First?

The **init block is called FIRST**, then the constructor is executed.

When an object is created:

1. **Instance init block** executes
2. **Constructor** executes

---

## How the Compiler Handles It

The compiler **copies all the code of the instance init block into the constructor AFTER the first statement `super()`**.

This means the execution order inside the constructor becomes:

1. `super()` call (if present, otherwise implicit)
2. **Init block code** (inserted by compiler)
3. **Constructor body code**

---

## Execution Order Example
```
class Demo {
    Demo() {
        System.out.println("Constructor executing");
    }
    
    {
        System.out.println("Init block executing");
    }
}

// Usage
new Demo();

Output:
Init block executing
Constructor executing
```
---

## What Compiler Does Internally

The compiler transforms your code to something like:
```
Demo() {
    super();  // implicit
    // Init block code is inserted here by compiler
    System.out.println("Init block executing");
    // Then constructor body
    System.out.println("Constructor executing");
}
```
---

## Complete Execution Order (With Static Blocks)

When you create an object, the complete order is:

1. **Static init block** (runs once when class loads, before anything else)
2. **Instance init block** (runs before every constructor)
3. **Constructor** (runs after init block)
```
class Student {
    static {
        System.out.println("1. Static init block");
    }
    
    {
        System.out.println("2. Instance init block");
    }
    
    Student() {
        System.out.println("3. Constructor");
    }
}

// Usage
System.out.println("Creating first object:");
new Student();
System.out.println("\nCreating second object:");
new Student();

Output:
Creating first object:
1. Static init block
2. Instance init block
3. Constructor
```
Creating second object:
2. Instance init block
3. Constructor

(Static block runs only once, when class loads)

---

## Multiple Init Blocks

If there are **multiple instance init blocks**, they execute **in the order they are written** in the class, then the constructor runs.
```
class Test {
    {
        System.out.println("Init block 1");
    }
    
    {
        System.out.println("Init block 2");
    }
    
    Test() {
        System.out.println("Constructor");
    }
}

// Usage
new Test();

Output:
Init block 1
Init block 2
Constructor
```
---

## Key Points

- **Instance init blocks** always run **before the constructor body**
- The compiler **inserts init block code** into the constructor after `super()`
- **Static init blocks** run **once** when the class is loaded, even before the first object is created
- If there are **multiple init blocks**, they run in **top-to-bottom order**
- The constructor body runs **after all init block code** has finished

---

## Why This Order?

The init block runs first to **ensure common initialization** happens for every object, regardless of which constructor is called. The compiler achieves this by copying init block code into every constructor. This allows you to place shared setup logic in the init block instead of repeating it in every constructor.

---

## 🧠 Interview Tips

- Remember: **Init block code executes BEFORE constructor body**
- Compiler **copies init block into each constructor** after `super()`
- **Static blocks** run once at **class loading time**
- **Instance blocks** run **every time** an object is created, before constructor body
- Order: Static block → Instance block code → Constructor body
