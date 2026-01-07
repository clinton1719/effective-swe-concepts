---
title: What is an Inner Class in Java, how it can be instantiated and what are the types of Inner Classes?
tags: [java, inner-class, nested-class]
difficulty: easy
date: 2026-01-07
---

## What is an Inner Class?

An **Inner Class** in Java is a class defined **inside another class**. Inner classes have a special relationship with their outer class and can access its private members directly.

---

## Types of Inner Classes

Java supports **4 types** of inner classes:

| Type | Description | Instantiation Syntax |
|------|-------------|---------------------|
| **1. Member Inner Class** (Non-static) | Defined at class level, requires outer class instance | `outer.new InnerClass()` |
| **2. Static Nested Class** | Static inner class, no outer instance needed | `OuterClass.InnerClass()` |
| **3. Local Inner Class** | Defined inside a method/block | Local variable, method scope |
| **4. Anonymous Inner Class** | No name, used for one-time implementation | `new Interface() { ... }` |

---

## 1. Member Inner Class (Non-static)

**Characteristics:**
- Has access to **all members** of outer class (private included)
- **Requires outer class instance** to be created

```
class OuterClass {
    private int outerVar = 100;
    
    class InnerClass {
        void display() {
            System.out.println("Outer var: " + outerVar);
        }
    }
}

// Instantiation
OuterClass outer = new OuterClass();
OuterClass.InnerClass inner = outer.new InnerClass();
```

---

## 2. Static Nested Class

**Characteristics:**
- **Static** - doesn't need outer class instance
- Can only access **static members** of outer class
```
class OuterClass {
    static int staticVar = 200;
    
    static class StaticNestedClass {
        void display() {
            System.out.println("Static var: " + staticVar);
        }
    }
}
```
// Instantiation (no outer instance needed)
OuterClass.StaticNestedClass nested = new OuterClass.StaticNestedClass();

---

## 3. Local Inner Class

**Characteristics:**
- Defined **inside a method**
- Can only access **final/effectively final variables** of enclosing method
```
public class OuterClass {
    public void method() {
        class LocalInnerClass {
            void display() {
                System.out.println("Local inner class");
            }
        }
        
        LocalInnerClass local = new LocalInnerClass();
        local.display();
    }
}
```
---

## 4. Anonymous Inner Class

**Characteristics:**
- **No name**, used for one-time implementations
- Commonly used for event handlers, comparators
```
// Implementing interface
Runnable runnable = new Runnable() {
    public void run() {
        System.out.println("Anonymous inner class");
    }
};

// Extending class
Thread thread = new Thread() {
    public void run() {
        System.out.println("Anonymous thread");
    }
};
```
---

## 🧠 Key Interview Points

- **Member Inner Class** → `outer.new InnerClass()`
- **Static Nested Class** → `OuterClass.InnerClass()`
- Inner classes improve **encapsulation** and **code organization**
- Anonymous classes are perfect for **one-off implementations** (listeners, comparators)
