---
title: What is shallow copy and deep copy?
tags: [java, cloning, shallow-copy, deep-copy]
difficulty: medium
date: 2026-02-18
---

## Shallow Copy vs Deep Copy

**Shallow Copy** and **Deep Copy** are two different ways to create copies of objects in Java, especially when using the `clone()` method.

---

## Shallow Copy

**Shallow copy** creates a new object but **copies only the top-level values**. Object references (nested objects) point to the **same original objects**.

**Characteristics:**
- **Primitives**: Copied (independent values)
- **Object references**: Same reference (shared objects)
- **Default behavior** of `Object.clone()`
- **Faster** and uses **less memory**
```
class Address {
    String city;
    Address(String city) { this.city = city; }
}

class Employee implements Cloneable {
    int id;
    String name;
    Address address;
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // Shallow copy (default)
    }
}

Example Result:
- `e1.address` and `e2.address` point to **same Address object**
- Changing `e2.address.city` affects `e1.address.city`
```
---

## Deep Copy

**Deep copy** creates a **completely independent copy** by recursively copying **all nested objects** as well.

**Characteristics:**
- **Primitives**: Copied (independent values)
- **Object references**: New objects created (independent)
- **Custom implementation** required
- **Slower** and uses **more memory**
```
class Employee implements Cloneable {
    int id;
    String name;
    Address address;
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        Employee cloned = (Employee) super.clone();
        cloned.address = new Address(this.address.city);  // Deep copy Address
        return cloned;
    }
}
```
Example Result:
- `e1.address` and `e2.address` point to **different Address objects**
- Changing `e2.address.city` does NOT affect `e1.address.city`

---

## Comparison Table

| Aspect              | Shallow Copy                  | Deep Copy                     |
|---------------------|-------------------------------|-------------------------------|
| **Primitives**      | Copied (independent) ✓       | Copied (independent) ✓       |
| **Object refs**     | Same reference (shared) ❌    | New objects (independent) ✓  |
| **`Object.clone()`**| Default behavior              | Custom implementation        |
| **Speed**           | Faster                        | Slower                       |
| **Memory**          | Less memory                   | More memory                  |
| **Safety**          | Unsafe for mutable objects    | Safe for nested objects      |

---

## When to Use Each

**Use Shallow Copy when:**
- Object has **no nested mutable objects**
- **Performance** is critical
- Nested objects are **immutable** (String, Integer, etc.)

**Use Deep Copy when:**
- Object contains **nested mutable objects** (List, custom classes)
- You need **completely independent copies**
- **Data integrity** is important

---

## Real-World Example

```java
// Shallow copy problem
Employee e1 = new Employee(1, "John", new Address("NYC"));
Employee e2 = (Employee) e1.clone();

e2.address.city = "LA";
System.out.println(e1.address.city);  // LA (affected!)

// Deep copy solution
class SafeEmployee implements Cloneable {
    @Override
    protected Object clone() throws CloneNotSupportedException {
        SafeEmployee cloned = (SafeEmployee) super.clone();
        cloned.address = new Address(this.address.city);  // Deep copy
        return cloned;
    }
}
```

## 🧠 Interview Tips
Shallow = copy primitives, share object references

Deep = copy everything recursively

Object.clone() gives shallow copy by default

Deep copy requires custom clone() implementation

Most common mistake: Forgetting to deep-copy nested objects

Interview question follow-up: "How do you implement deep copy?"