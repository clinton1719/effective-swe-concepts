---
title: What are the 4 pillars of OOPS?
tags: [java, OOP, java-basics]
difficulty: easy
date: 2025-06-22
---

The four fundamental pillars of OOP are:

1. **Abstraction**  
2. **Encapsulation**  
3. **Inheritance**  
4. **Polymorphism**

---

### 1. Abstraction

**Definition**: Abstraction is the process of hiding internal implementation details and showing only the functionality to the user.

**Real-world examples**:
- **TV Remote**: To turn on the TV, you press the power button — you don’t need to know how the internal circuits work or how infrared signals are transmitted.
- **Car Gear**: You know what happens when you change gears, but the underlying mechanism is hidden from you. That technical detail is abstracted.

**In Java**, abstraction can be achieved in two ways:
- Using **abstract classes**
- Using **interfaces**

```java
// Abstract class example
abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    void makeSound() {
        System.out.println("Bark");
    }
}
```

---

### 2. Encapsulation

**Definition**: Encapsulation is the process of binding data (variables) and methods that operate on the data into a single unit — typically a class. It is also used to restrict access to internal details using access modifiers (`private`, `public`, `protected`).

Encapsulation supports **data hiding** and helps in achieving **abstraction**.

**Example**:  
A Java Bean where all data members are private and are accessed via public getters/setters.

```java
public class Person {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

---

### 3. Inheritance

**Definition**: Inheritance allows one class (child/subclass) to inherit properties and methods from another class (parent/superclass). This promotes **code reusability** and establishes a **parent-child relationship** between classes.

> Java supports single inheritance through classes and multiple inheritance through interfaces.

**Example**:
```java
class Animal {
    void eat() {
        System.out.println("This animal eats food");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("The dog barks");
    }
}
```

---

### 4. Polymorphism

**Definition**: "Poly" means many, and "morph" means forms. Polymorphism allows objects or methods to take multiple forms.

There are **two types of polymorphism**:

#### a) Compile-time Polymorphism (Method Overloading)
Occurs when multiple methods have the same name but different parameters in the same class. The method to call is decided at **compile-time**.

```java
class MathUtils {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}
```

#### b) Run-time Polymorphism (Method Overriding)
Occurs when a subclass provides a specific implementation of a method already defined in its superclass. The method to call is determined at **runtime**.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes sound");
    }
}

class Cat extends Animal {
    void sound() {
        System.out.println("Cat meows");
    }
}
```

---

### Summary Table

| Pillar        | Key Concept                            | Java Support                         |
|---------------|----------------------------------------|--------------------------------------|
| Abstraction   | Hide internal details, show only needed| Abstract classes, Interfaces         |
| Encapsulation | Bind data & methods, restrict access   | Classes, Access Modifiers            |
| Inheritance   | Reuse code via parent-child classes    | `extends`, Interfaces (`implements`) |
| Polymorphism  | One name, many forms                   | Overloading & Overriding             |

