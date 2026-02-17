---
title: What is Cloneable interface in Java?
tags: [java, cloneable, shallow-copy, deep-copy]
difficulty: medium
date: 2026-02-17
---

## What is Cloneable Interface?

**Cloneable** is a **marker interface** in Java (`java.lang.Cloneable`) that a class must implement to enable **cloning** of its objects using the `Object.clone()` method.

**Key Points:**
- It's a **marker interface** (no methods to implement)
- Indicates that `Object.clone()` can legally create a field-for-field copy
- Without `Cloneable`, calling `clone()` throws `CloneNotSupportedException`

---

## Example 1: Without Cloneable (Reference Copy)
```
class Employee {
    int id;
    String name;
    
    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee(1, "John");
        Employee e2 = e1;  // Same reference, not clone
        
        e2.name = "Jane";
        System.out.println("e1.name: " + e1.name);  // Jane (changed!)
        System.out.println("e2.name: " + e2.name);  // Jane
    }
}

Output:
e1.name: Jane
e2.name: Jane
```

**Problem**: Changes to `e2` affect `e1` (same object reference)

---

## Example 2: With Cloneable (Shallow Copy)
```
class Employee implements Cloneable {
    int id;
    String name;
    
    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

class Main {
    public static void main(String[] args) throws CloneNotSupportedException {
        Employee e1 = new Employee(1, "John");
        Employee e2 = (Employee) e1.clone();  // Shallow copy
        
        e2.name = "Jane";
        System.out.println("e1.name: " + e1.name);  // John
        System.out.println("e2.name: " + e2.name);  // Jane
    }
}

Output:
e1.name: John
e2.name: Jane
```

**Success**: `e1` and `e2` are independent objects

---

## Example 3: Shallow Copy Problem (Object Reference)
```
class Address {
    String city;
    Address(String city) { this.city = city; }
}

class Employee implements Cloneable {
    int id;
    String name;
    Address address;  // Object reference
    
    Employee(int id, String name, String city) {
        this.id = id;
        this.name = name;
        this.address = new Address(city);
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // Shallow copy
    }
}

class Main {
    public static void main(String[] args) throws CloneNotSupportedException {
        Employee e1 = new Employee(1, "John", "NYC");
        Employee e2 = (Employee) e1.clone();
        
        e2.address.city = "LA";  // Modify cloned object's address
        
        System.out.println("e1.address.city: " + e1.address.city);  // LA (changed!)
        System.out.println("e2.address.city: " + e2.address.city);  // LA
    }
}

Output:
e1.address.city: LA
e2.address.city: LA
```

**Problem**: Both objects share the **same Address object** (shallow copy)

---

## Shallow Copy vs Deep Copy

| Aspect | Shallow Copy | Deep Copy |
|--------|--------------|-----------|
| **Primitive fields** | Copied (independent) | Copied (independent) |
| **Object references** | Same reference (shared) | New objects created |
| **`Object.clone()`** | Default behavior | Requires custom implementation |
| **Memory** | Less memory | More memory |
| **Safety** | Unsafe for nested objects | Safe for nested objects |

---

## How to Implement Deep Copy

Override `clone()` to create new objects for nested references:
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

Now `e1.address.city` and `e2.address.city` are truly independent!

---

## Key Rules for Cloning

1. **Class must implement `Cloneable`**
2. **Override `clone()` method**
3. **`super.clone()`** creates field-for-field copy
4. **Handle nested objects** for deep copying
5. **Handle `CloneNotSupportedException`**
6. **Return type should be your class** (not `Object`)

---

## 🧠 Interview Tips

- **Cloneable = marker interface** for enabling `Object.clone()`
- **Default clone() = shallow copy** (object references shared)
- **Deep copy needed** for nested objects/collections
- **Always override `clone()`** and call `super.clone()`
- **Common mistake**: Forgetting to deep-copy nested objects
