---
title: Difference between Abstract Class and Interface
tags: [java, java-basics, oop]
difficulty: medium
date: 2025-09-08
---

This is a classic interview question where candidates often get confused, especially after Java 8 introduced default and static methods in interfaces. The answer is:

✅ Abstract classes and interfaces both provide abstraction, but they differ in purpose, usage, and capabilities.

# Key Differences:

## Methods:

Abstract class → Can have both abstract and concrete methods.

Interface → Before Java 8, only abstract methods; from Java 8 onwards, can have default and static methods; from Java 9, private methods too.

## Access Modifiers:

Abstract class → Methods can have any access modifier (public, protected, private).

Interface → All methods are implicitly public and abstract (except default, static, and private methods which have fixed modifiers).

## Variables:

Abstract class → Can have final, non-final, static, and non-static variables.

Interface → Variables are always public static final (constants).

## Inheritance:

Abstract class → A class can extend only one abstract (or concrete) class because Java does not support multiple class inheritance.

Interface → A class can implement multiple interfaces, achieving multiple inheritance of type.

## Extensibility:

Abstract class → Can extend another class (abstract or concrete) and implement multiple interfaces.

Interface → Can only extend other interfaces, not classes.

## Use-case:

Abstract class → Used when classes share a common state or base implementation.

Interface → Used to define a contract of behavior across unrelated classes.

```
Example:
abstract class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    abstract void makeSound();

    void sleep() {
        System.out.println(name + " is sleeping...");
    }
}

interface Pet {
    void play();

    default void feed() {
        System.out.println("Feeding the pet...");
    }
}

class Dog extends Animal implements Pet {
    Dog(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println(name + " barks!");
    }

    @Override
    public void play() {
        System.out.println(name + " is playing fetch!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Buddy");
        d.makeSound();
        d.sleep();
        d.play();
        d.feed();
    }
}
```

```
Output:
Buddy barks!
Buddy is sleeping...
Buddy is playing fetch!
Feeding the pet...
```

Interview Tip:

Even though Java 8 introduced default and static methods in interfaces, the core difference still remains:

A class can extend only one abstract class,

But it can implement multiple interfaces.

That’s why interfaces are preferred when you need multiple inheritance of behavior, while abstract classes are better suited when you need a shared base state and implementation.

Version-specific Notes:

Java 7 and below → Interfaces could only have abstract methods and constants.

Java 8 → Introduced default and static methods in interfaces.

Java 9 → Added private methods in interfaces.

Thus, abstract classes and interfaces complement each other but serve different design purposes in Java.