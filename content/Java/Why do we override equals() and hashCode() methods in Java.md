---
title: Why do we override equals() and hashCode() methods in Java?
tags: [java, equals, hashcode, collections]
difficulty: medium
date: 2025-09-15
---

## ✅ Short Answer
We override `equals()` and `hashCode()` in Java to ensure that **objects with the same logical state are treated as equal** — especially when they are used in **collections** like `HashMap`, `HashSet`, and `Hashtable`.  

If only `equals()` is overridden without `hashCode()`, collections relying on hashing may not work correctly.

---

## 🔎 Why Override Both?

### 1. `equals()`  
Defines what it means for **two objects to be "equal"** logically.  
By default (from `Object`), it behaves like `==` (compares references).  

If we want **value-based equality** (e.g., two `Employee` objects with the same ID should be equal), we override `equals()`.

---

### 2. `hashCode()`  
Used by hash-based collections (`HashMap`, `HashSet`, `HashTable`) to place objects in buckets.  
- Contract: If two objects are equal (via `equals()`), they **must have the same hashCode**.  
- Otherwise, the collection may store duplicates or fail lookups.

---

## 📖 Example Without Overriding
```java
import java.util.*;

class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

public class Test {
    public static void main(String[] args) {
        Employee e1 = new Employee(101, "Alice");
        Employee e2 = new Employee(101, "Alice");

        System.out.println(e1.equals(e2)); // false (reference equality)

        HashSet<Employee> set = new HashSet<>();
        set.add(e1);
        set.add(e2);

        System.out.println(set.size()); // 2 (treated as different objects)
    }
}
```

---

## 📖 Example With Overriding
```java
import java.util.*;

class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee e = (Employee) o;
        return id == e.id && name.equals(e.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}

public class Test {
    public static void main(String[] args) {
        Employee e1 = new Employee(101, "Alice");
        Employee e2 = new Employee(101, "Alice");

        System.out.println(e1.equals(e2)); // true (value equality)

        HashSet<Employee> set = new HashSet<>();
        set.add(e1);
        set.add(e2);

        System.out.println(set.size()); // 1 (duplicate avoided)
    }
}
```

---

## ⚖️ The `equals()` and `hashCode()` Contract

1. If `a.equals(b) == true` → then `a.hashCode() == b.hashCode()` must also be true.  
2. If `a.equals(b) == false` → hashCodes *may* still be the same (hash collision possible).  
3. If you override one, **always override both**.  

---

## 👉 Interview Tip
- If asked "Why must we override both?", say:  
  > "Because `HashMap` and `HashSet` first use `hashCode()` to find the bucket, then use `equals()` to resolve collisions. Overriding only one breaks this logic."  

