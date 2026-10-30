---
title: Dynamic Method Dispatch in Java
tags: [java, oops, polymorphism, inheritance]
difficulty: medium
date: 2026-10-30
---

## What is Dynamic Method Dispatch in Java?

Dynamic Method Dispatch is the mechanism by which Java determines **at runtime which overridden method to execute**, based on the actual object type rather than the reference variable type.

It is an important part of **runtime polymorphism** in Java.

In simple terms, when a parent class reference points to a child class object, Java executes the overridden method belonging to the actual object.

## 1. Example

    class Animal {
        void sound() {
            System.out.println("Animal makes a sound");
        }
    }

    class Dog extends Animal {
        @Override
        void sound() {
            System.out.println("Dog barks");
        }
    }

    class Cat extends Animal {
        @Override
        void sound() {
            System.out.println("Cat meows");
        }
    }

    public class Main {
        public static void main(String[] args) {

            Animal animal;

            animal = new Dog();
            animal.sound();  // Dog barks

            animal = new Cat();
            animal.sound();  // Cat meows
        }
    }

**Why does this happen?**

- `Animal` is the reference type.
- `Dog` and `Cat` are the actual object types.
- Both child classes override the `sound()` method.
- At runtime, Java determines which implementation to execute based on the actual object.

This mechanism is called Dynamic Method Dispatch.

## 2. Why Do We Need Dynamic Method Dispatch?

It allows us to write flexible and extensible code using polymorphism.

For example, imagine a payment application:

- `Payment` is the parent class.
- `CreditCardPayment`, `UPIPayment`, and `NetBankingPayment` are child classes.
- Each child class implements its own `pay()` method.

We can write:

    Payment payment = new UPIPayment();
    payment.pay();

    payment = new CreditCardPayment();
    payment.pay();

The same parent reference can work with different child objects, and Java automatically invokes the correct overridden method.

**Benefits:**

1. Runtime polymorphism.
2. Loose coupling between calling code and concrete implementations.
3. Easier extensibility when adding new implementations.
4. Less conditional logic based on object types.

## 3. Compile-Time vs Runtime Method Binding

| Feature         | Static Binding                                     | Dynamic Binding             |
| --------------- | -------------------------------------------------- | --------------------------- |
| Binding time    | Compile time                                       | Runtime                     |
| Also called     | Early binding                                      | Late binding                |
| Common examples | Overloaded methods, private, static, final methods | Overridden instance methods |
| Based on        | Reference type and method signature                | Actual object type          |

**Important:** Static methods are hidden, not overridden. Dynamic method dispatch applies to overridden instance methods, not static methods.

## 4. Important Interview Points

- Dynamic method dispatch is the mechanism behind runtime polymorphism.
- It works through inheritance and method overriding.
- The reference type determines which members are accessible at compile time.
- The actual object type determines which overridden instance method executes at runtime.
- Constructors cannot be overridden, so dynamic method dispatch does not apply to constructors.
- Fields are not dynamically dispatched; field access depends on the reference type.

## 5. One-Line Interview Answer

Dynamic Method Dispatch is Java's runtime mechanism for selecting the overridden method based on the actual object type rather than the reference variable type. It enables runtime polymorphism.

## Follow-up Questions

**Q1.** What is the difference between method overloading and method overriding?

**Q2.** Can static methods be overridden in Java?

**Q3.** What happens when a parent reference points to a child object, but the child has a method that does not exist in the parent class?
