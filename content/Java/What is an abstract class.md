---
title: What is an abstract class?
tags: [java, java-basics, oops]
difficulty: easy
date: 2025-06-22
---

An **abstract class** is a class that is declared using the `abstract` keyword. It can contain:

- **Abstract methods** (methods without a body)
- **Concrete methods** (methods with a body)

### Key Characteristics:

- An abstract class **cannot be instantiated** — you cannot create objects of it directly.
- The purpose of an abstract class is to be **extended** by other classes.
- The **first concrete (non-abstract) subclass** that extends an abstract class **must implement** all its abstract methods.

### Example in Java:

```java
abstract class Animal {
    abstract void makeSound();  // abstract method

    void breathe() {
        System.out.println("Breathing...");
    }
}

class Dog extends Animal {
    void makeSound() {
        System.out.println("Bark");
    }
}
```

In the above example:
- `Animal` is an abstract class with one abstract method (`makeSound`) and one concrete method (`breathe`).
- `Dog` is a concrete class that provides an implementation for `makeSound`.

You **must** override all abstract methods in the first non-abstract subclass, or the subclass itself must be declared `abstract`.


