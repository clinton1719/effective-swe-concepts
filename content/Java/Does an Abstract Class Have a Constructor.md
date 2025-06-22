---
title: Does Abstract class have constructor?
tags: [java, java-basics]
difficulty: easy
date: 2025-06-22
---

## Does an Abstract Class Have a Constructor?

Yes — this is a common interview question, and the answer is:

> ✅ **Yes, abstract classes in Java do have constructors.**  
You can define one explicitly, or Java will provide a default constructor if you don't.

### Why does an abstract class need a constructor?

Even though you **cannot instantiate** an abstract class directly, its constructor is still called **when a subclass is instantiated**. The constructor helps to **initialize data members** defined in the abstract class.

### Important Concepts:

- Constructors are used to initialize instance variables.
- An abstract class **can have instance variables** (just like any class).
- When a subclass extends an abstract class and is instantiated, the **abstract class constructor is executed first** via an implicit or explicit `super()` call.

### Example:

```java
abstract class Vehicle {
    String type;

    Vehicle(String type) {
        this.type = type;
        System.out.println("Vehicle constructor called: " + type);
    }
}

class Car extends Vehicle {
    Car() {
        super("Car");
        System.out.println("Car constructor called");
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
    }
}
```

### Output:

```
Vehicle constructor called: Car
Car constructor called
```

As shown above:
- The abstract class `Vehicle` has a constructor.
- When `Car` is instantiated, `Vehicle`'s constructor is called first using `super("Car")`.

This demonstrates that **abstract class constructors participate in the object initialization chain**, just like constructors in concrete superclasses.


