---
title: What to Choose – Interface or Abstract Class?
tags: [java-basics, oops]
difficulty: medium
date: 2025-09-08
---

This is a very common design-oriented interview question. The answer is:

✅ Choose an interface when you want to define a contract for unrelated classes, and choose an abstract class when you want to provide shared state or partial implementation.

## When to Use an Abstract Class:

When you want to provide default implementations for some methods while keeping others abstract.

When subclasses need to share common state (fields).

When new methods are expected to be added frequently — because you can provide a default implementation in the abstract class without breaking existing subclasses.

Example: AbstractList in Java Collections Framework provides skeletal implementations that subclasses can reuse.

## When to Use an Interface:

When you want to define a contract that multiple, potentially unrelated, classes can implement.

When you need multiple inheritance of type (since a class can implement multiple interfaces but extend only one class).

When you are designing APIs that should be flexible and loosely coupled.

Example: List, Set, and Queue interfaces define behaviors that can be implemented by many classes.

## Java 8+ Consideration:

From Java 8 onwards, interfaces can have default and static methods, which makes them slightly closer to abstract classes. However:

Interfaces still cannot have instance fields.

Abstract classes are better if you need to share stateful logic.

Interfaces remain the go-to choice when you need polymorphism across unrelated types.

## Best Practice:

Prefer interfaces when in doubt, especially for API design.

Use abstract classes only when you need state + partial implementation.

```
Example:
interface Drivable {
    void drive();

    default void service() {
        System.out.println("Default vehicle service.");
    }
}

abstract class Vehicle {
    String name;

    Vehicle(String name) {
        this.name = name;
    }

    void fuelUp() {
        System.out.println(name + " is refueling...");
    }

    abstract void honk();
}

class Car extends Vehicle implements Drivable {
    Car(String name) {
        super(name);
    }

    @Override
    void honk() {
        System.out.println(name + " says: Beep beep!");
    }

    @Override
    public void drive() {
        System.out.println(name + " is driving...");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("Tesla");
        car.drive();
        car.service();
        car.fuelUp();
        car.honk();
    }
}
```
```
Output:
Tesla is driving...
Default vehicle service.
Tesla is refueling...
Tesla says: Beep beep!
```

Interview Tip:

Use abstract class if you need to share state or provide default implementation for evolving behavior.

Use interface when you need a clean contract and multiple inheritance.

Even after Java 8’s default methods, the main distinction remains:

Interfaces define contracts.

Abstract classes provide base implementations and state.
