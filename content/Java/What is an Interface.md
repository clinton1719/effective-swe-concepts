---
title: What is an Interface?
tags: [java-basics, oops]
difficulty: easy
date: 2025-09-08
---

Yes — this is one of the most fundamental Java interview questions, and the answer is:

✅ An interface in Java is a blueprint of a class that defines a contract which implementing classes must fulfill.

Key Characteristics of Interfaces:

Contractual nature: Interfaces specify what a class must do but not how it does it.

Constants: All variables declared in an interface are implicitly public, static, and final.

Methods:

Before Java 8 → methods are implicitly public and abstract.

From Java 8 → interfaces can also contain default and static methods with concrete implementations.

From Java 9 → interfaces can include private methods to share code between default methods.

Multiple inheritance: A class can implement multiple interfaces, which is Java’s way of supporting multiple inheritance of type.

Abstraction: Interfaces are one of the main tools for achieving abstraction and loose coupling in Java.

Why use an Interface?

To define a common set of behaviors across unrelated classes.

To achieve polymorphism, since multiple classes can implement the same interface.

To provide a plug-and-play mechanism where new classes can be introduced without modifying existing code.

Example:
```
interface Vehicle {
    int MAX_SPEED = 120; // implicitly public static final

    void drive(); // implicitly public and abstract

    default void honk() {
        System.out.println("Beep beep!");
    }

    static void showInfo() {
        System.out.println("Vehicle interface with max speed " + MAX_SPEED);
    }
}

class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Car is driving...");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.drive();
        v.honk();
        Vehicle.showInfo();
    }
}
```

Output:
```
Car is driving...
Beep beep!
Vehicle interface with max speed 120
```

Important Points:

Interfaces cannot be instantiated.

Implementing classes must provide concrete implementations for all abstract methods.

A class can extend one superclass but can implement multiple interfaces.

Since Java 8, interfaces are no longer limited to just abstract methods.

Version-specific Notes:

Java 7 and below → only abstract methods and constants allowed.

Java 8 → introduction of default and static methods.

Java 9 → introduction of private methods inside interfaces.

Thus, an interface in Java is a powerful construct for defining contracts, supporting abstraction, and enabling multiple inheritance of type.