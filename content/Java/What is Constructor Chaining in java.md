---
title: What is Constructor Chaining in java?
tags: [java, constructors, oops]
difficulty: easy
date: 2026-01-08
---

## What is Constructor Chaining?

Constructor chaining is a **technique** where one constructor calls another constructor of the **same class** or a **parent class**. This helps avoid code duplication and improves readability by reusing constructor logic.

---

## Types of Constructor Chaining

### 1. Constructor Chaining within the Same Class (using `this()`)

One constructor calls another constructor of the same class using the `this()` keyword.

**Rules:**
- `this()` must be the **first statement** in the constructor
- Can only call **one** `this()` per constructor
```
class Student {
    int rollNo;
    String name;
    String course;
    
    // Constructor 1 (takes 1 parameter)
    Student(int rollNo) {
        this(rollNo, "Unknown", "General");
    }
    
    // Constructor 2 (takes 2 parameters)
    Student(int rollNo, String name) {
        this(rollNo, name, "General");
    }
    
    // Constructor 3 (takes 3 parameters - main constructor)
    Student(int rollNo, String name, String course) {
        this.rollNo = rollNo;
        this.name = name;
        this.course = course;
    }
}

// Usage
Student s1 = new Student(101);  // Calls Constructor 1
Student s2 = new Student(102, "Alice");  // Calls Constructor 2
Student s3 = new Student(103, "Bob", "CSE");  // Calls Constructor 3
```
---

### 2. Constructor Chaining to Parent Class (using `super()`)

A child class constructor calls a parent class constructor using the `super()` keyword.

**Rules:**
- `super()` must be the **first statement** in the constructor
- If not explicitly called, Java automatically calls the **no-argument parent constructor**
```
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    String breed;
    
    Dog(String name, String breed) {
        super(name);  // Calls parent constructor
        this.breed = breed;
    }
}

// Usage
Dog dog = new Dog("Buddy", "Labrador");
```
---

## Constructor Chaining Flow

When you create an object with constructor chaining, constructors are called in sequence:

1. Constructor 1 calls Constructor 2
2. Constructor 2 calls Constructor 3
3. Constructor 3 executes (main constructor)
4. Control returns to Constructor 2
5. Control returns to Constructor 1

---

## Benefits of Constructor Chaining

- **Code Reusability** → Avoid repeating initialization logic
- **Maintainability** → Changes need to be made in only one place
- **Readability** → Clear which constructor handles what
- **Flexibility** → Provide multiple ways to create objects with different parameters

---

## Important Notes

- `this()` and `super()` must be the **first statement** in a constructor
- You **cannot use both** `this()` and `super()` in the same constructor
- If you don't call `super()` explicitly in a child class, Java calls the **parent's no-argument constructor** automatically
- Constructor chaining helps create a **hierarchy of initialization** from minimal to complete object setup

---

## 🧠 Interview Tips

- Explain that constructor chaining **reduces code duplication**
- Mention **`this()`** for same-class and **`super()`** for parent-class chaining
- Remember: **`this()` and `super()` must be first statement**
- Constructor chaining helps build objects with **varying initialization levels**
