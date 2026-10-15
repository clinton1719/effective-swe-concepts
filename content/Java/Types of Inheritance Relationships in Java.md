---
title: Types of Inheritance Relationships in Java
tags: [java, oops, inheritance, polymorphism]
difficulty: easy
date: 2026-10-14
---

## What Is Inheritance?

Inheritance is an OOP concept in which one class acquires the properties and behaviors of another class.

In Java, a child class extends a parent class using `extends`, while a class implements an interface using `implements`.

There are five commonly discussed types of inheritance.

## 1. Single Inheritance

One child class inherits from one parent class.

    class Animal {
        void eat() {
            System.out.println("Eating");
        }
    }

    class Dog extends Animal {
        void bark() {
            System.out.println("Barking");
        }
    }

**Relationship:** `Dog → Animal`

Java supports single inheritance through classes.

## 2. Multilevel Inheritance

A class inherits from a class that itself inherits from another class.

    class Animal {
        void eat() {}
    }

    class Dog extends Animal {
        void bark() {}
    }

    class Puppy extends Dog {
        void weep() {}
    }

**Relationship:** `Puppy → Dog → Animal`

`Puppy` inherits accessible members from both `Dog` and `Animal`.

## 3. Hierarchical Inheritance

Multiple child classes inherit from the same parent class.

    class Animal {
        void eat() {}
    }

    class Dog extends Animal {}

    class Cat extends Animal {}

**Relationship:** `Dog → Animal` and `Cat → Animal`

Both `Dog` and `Cat` inherit from `Animal`, but they are separate subclasses.

## 4. Multiple Inheritance

One child inherits from multiple parent classes.

Conceptually:

    class Child extends ParentA, ParentB {
    }

**Java does not support multiple inheritance through classes.** A class cannot extend two classes because Java avoids the ambiguity that can arise when both parents provide the same inherited method implementation.

However, Java supports multiple inheritance of type through interfaces.

    interface Printable {
        void print();
    }

    interface Savable {
        void save();
    }

    class Document implements Printable, Savable {
        public void print() {}

        public void save() {}
    }

Here, `Document` implements multiple interfaces.

## 5. Hybrid Inheritance

Hybrid inheritance combines two or more types of inheritance, such as hierarchical and multiple inheritance.

For example, a design might combine a class hierarchy with multiple interfaces.

Java does not support hybrid inheritance when it requires a class to extend multiple classes. However, hybrid structures can be created using a combination of class inheritance and interface implementation.

## Summary

| Type | Description | Supported in Java? |
|---|---|---|
| Single | One child, one parent | Yes |
| Multilevel | Inheritance across multiple levels | Yes |
| Hierarchical | Multiple children, one parent | Yes |
| Multiple | One child, multiple parents | Through interfaces, not classes |
| Hybrid | Combination of inheritance types | Through classes and interfaces, with restrictions |

## Important Interview Points

- Java supports **single, multilevel, and hierarchical inheritance through classes**.
- Java does **not** support multiple inheritance through classes.
- A class can implement multiple interfaces.
- An interface can extend multiple interfaces.
- These five categories are common OOP classifications, not five separate Java language constructs.

## Follow-up Questions

**Q1.** Why does Java not support multiple inheritance through classes?

**Q2.** What is the diamond problem in inheritance?

**Q3.** What is the difference between inheritance and composition?