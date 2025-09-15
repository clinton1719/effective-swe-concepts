---
title: Why Java 8 Introduced Default Methods?
tags: [java-8, oops, java-basics]
difficulty: medium
date: 2025-09-08
---

This is an important Java 8 feature that often comes up in interviews. The answer is:

✅ Default methods were introduced in Java 8 to allow interfaces to evolve without breaking existing implementations.

## Why Were Default Methods Introduced?

Before Java 8, all interface methods were abstract.

If you added a new method to an interface, every implementing class (possibly hundreds of them) would break because they had to implement the new method.

To solve this, Java 8 introduced default methods where you can provide a method body directly in the interface.

This means existing classes can continue working unchanged, while still gaining new functionality if they want.

## Key Benefits:

Allows backward compatibility of interfaces.

Provides default implementation so implementing classes are not forced to override.

Classes can still override default methods if they want to customize behavior.

```
Example:
interface Vehicle {
    void drive();

    default void honk() {
        System.out.println("Default honk: Beep beep!");
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
        v.honk(); // uses default implementation
    }
}
```

```
Output:
Car is driving...
Default honk: Beep beep!
```

## The Diamond Problem Scenario:

If a class implements two interfaces with the same default method, Java forces you to resolve the conflict:

interface Interface1 {
    default void hello() {
        System.out.println("Hello from Interface1");
    }
}

interface Interface2 {
    default void hello() {
        System.out.println("Hello from Interface2");
    }
}

class MyClass implements Interface1, Interface2 {
    @Override
    public void hello() {
        System.out.println("Hello from MyClass (resolving conflict)");
    }
}

Output:
Hello from MyClass (resolving conflict)

Important Point for Interviews:

Default methods were introduced for backward compatibility, not as a replacement for abstract classes.

If two interfaces have the same default method, the implementing class must override it to resolve ambiguity (avoiding the Diamond Problem).

Thus, Java 8 default methods strike a balance between flexibility and backward compatibility while still maintaining clarity in multiple inheritance scenarios.
