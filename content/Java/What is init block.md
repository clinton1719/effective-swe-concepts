---
title: What is init block?
tags: [java, initialization]
difficulty: easy
date: 2026-01-08
---

## What is Init Block?

An **init block** (initialization block) is a block of code in a class that runs **every time an object is created**, before the constructor executes. It is used to initialize instance variables and perform setup logic that should run for every object.

There are **two types** of init blocks:

1. **Instance Initialization Block** (non-static)
2. **Static Initialization Block** (static)

---

## 1. Instance Initialization Block

An instance init block is a **block of code without a name** enclosed in curly braces `{ }` at the class level.

**Characteristics:**
- Runs **every time** an object is created
- Runs **before the constructor**
- Can access instance variables and methods
- Useful for **common initialization logic** across multiple constructors
```
class Student {
    int rollNo;
    String name;
    
    // Instance init block
    {
        System.out.println("Instance init block running");
        rollNo = 0;
        name = "Unknown";
    }
    
    // Constructor 1
    Student(int rollNo) {
        System.out.println("Constructor 1 running");
        this.rollNo = rollNo;
    }
    
    // Constructor 2
    Student(int rollNo, String name) {
        System.out.println("Constructor 2 running");
        this.rollNo = rollNo;
        this.name = name;
    }
}

// Usage
Student s1 = new Student(101);

Output:
Instance init block running
Constructor 1 running
```
---

## 2. Static Initialization Block

A static init block is declared with the `static` keyword and runs **once when the class is loaded**, before any object is created.

**Characteristics:**
- Runs **exactly once** when the class loads
- Runs **before any constructor**
- Can only access **static members**
- Used to initialize **static variables** or perform one-time setup
```
class Config {
    static String dbURL;
    static int maxConnections;
    
    // Static init block
    static {
        System.out.println("Static init block running");
        dbURL = "jdbc:mysql://localhost:3306/mydb";
        maxConnections = 100;
    }
    
    // Constructor
    Config() {
        System.out.println("Constructor running");
    }
}

// Usage
new Config();
new Config();

Output:
Static init block running
Constructor running
Constructor running
```
(Static block runs only once, constructor runs twice)

---

## Execution Order

When an object is created, the execution order is:

1. **Static blocks** (if class is loaded for the first time)
2. **Instance init blocks**
3. **Constructor**
```
class Demo {
    static {
        System.out.println("1. Static init block");
    }
    
    {
        System.out.println("2. Instance init block");
    }
    
    Demo() {
        System.out.println("3. Constructor");
    }
}

// Usage
new Demo();

Output:
1. Static init block
2. Instance init block
3. Constructor
```
---

## When to Use Init Blocks

| Block Type | When to Use |
|-----------|-----------|
| **Instance Init Block** | Common initialization logic needed in **multiple constructors** |
| **Static Init Block** | One-time initialization of **static variables** or resources (database connections, configuration files) |

---

## Benefits

- **Code Reusability** → Avoid repeating initialization in every constructor
- **Cleaner Code** → Separates initialization logic from constructor logic
- **Flexibility** → Static blocks for class-level setup, instance blocks for object-level setup

---

## 🧠 Interview Tips

- **Instance init block** runs **every time an object is created**, before constructor
- **Static init block** runs **once** when the class is first loaded
- Init blocks help **reduce code duplication** across multiple constructors
- **Order matters**: Static block → Instance block → Constructor
