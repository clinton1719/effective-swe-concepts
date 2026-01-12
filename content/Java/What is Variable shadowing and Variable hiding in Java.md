---
title: What is Variable shadowing and Variable hiding in Java?
tags: [java, oops]
difficulty: medium
date: 2026-01-12
---

## Variable Shadowing vs Variable Hiding

**Variable Shadowing** and **Variable Hiding** are related concepts but apply to different types of variables in Java.

---

## 1. Variable Shadowing

Variable shadowing occurs when a **local variable** has the **same name** as an **instance variable** (or class variable) in the same class. The local variable **hides/shadows** the instance variable within that scope.

**Characteristics:**
- Occurs with **instance variables vs local variables**
- The local variable **shadows** the instance variable in the current method scope
- Access instance variable using `this.variableName`

class Student {
    int age = 20;  // Instance variable
    
    void display() {
        int age = 25;  // Local variable shadows instance variable
        
        System.out.println("Local age: " + age);        // 25 (local variable)
        System.out.println("Instance age: " + this.age); // 20 (instance variable)
    }
}

// Usage
Student s = new Student();
s.display();

Output:
Local age: 25
Instance age: 20

---

## 2. Variable Hiding

Variable hiding occurs when a **static variable** (or instance variable) in a **child class** has the **same name** as a **static variable** in the **parent class**. The child class variable **hides** the parent class variable.

**Characteristics:**
- Occurs with **static variables in inheritance**
- The child class variable **hides** the parent class variable
- Access parent variable using `SuperClassName.variableName`
- Different from **method overriding** (overriding is for methods, hiding is for variables)

class Parent {
    static int count = 10;  // Parent static variable
}

class Child extends Parent {
    static int count = 20;  // Child static variable hides parent's count
}

// Usage
System.out.println("Parent count: " + Parent.count);  // 10
System.out.println("Child count: " + Child.count);    // 20

Child c = new Child();
System.out.println("Via object: " + c.count);         // 20 (static, so class-level)

---

## Key Differences

| Aspect | Variable Shadowing | Variable Hiding |
|--------|-------------------|-----------------|
| **Variable Type** | Instance vs Local | Static (or instance in child) |
| **Scope** | Within method/block | Within class hierarchy (inheritance) |
| **Access** | Use `this.variableName` | Use `ClassName.variableName` or `super.variableName` |
| **Example** | Local variable shadows instance variable | Child class static variable hides parent static variable |

---

## Example: Instance Variable Hiding (Shadowing in Inheritance)

Instance variables can also be hidden in inheritance (similar to static variable hiding):

class Animal {
    String name = "Animal";  // Instance variable
}

class Dog extends Animal {
    String name = "Dog";     // Instance variable hides parent's name
}

// Usage
Dog dog = new Dog();
System.out.println(dog.name);  // Dog (child's variable)
System.out.println(((Animal) dog).name);  // Dog (still Dog, not Animal)

// To access parent's variable, you would need to store it
// But direct access to parent instance variable is NOT possible like super.name

---

## When to Avoid Shadowing/Hiding

- **Variable Shadowing** → Confusing and reduces readability. Use different variable names
- **Variable Hiding** → Avoid hiding static/instance variables in child classes. Use different names

**Better approach:**

class Student {
    int age = 20;
    
    void display() {
        int localAge = 25;  // Different name, no shadowing
        System.out.println("Local age: " + localAge);
        System.out.println("Instance age: " + age);
    }
}

---

## 🧠 Interview Tips

- **Shadowing** = Local variable hides instance variable (use `this.` to access instance variable)
- **Hiding** = Child class static/instance variable hides parent class variable (use `ParentClass.` or `super.`)
- Both reduce code clarity and should be **avoided** in good programming practice
- Shadowing is about **scope**, hiding is about **inheritance hierarchy**
