---
title: How to make a class Immutable in Java?
tags: [java, immutable, oops]
difficulty: medium
date: 2026-03-03
---

## What is Immutable Class?

An **immutable class** is a class whose state **cannot be modified** after object creation. Once constructed, the object's fields remain constant.

**Examples**: String, Integer, LocalDateTime, BigDecimal

---

## Rules to Create Immutable Class

### 1. **Declare class as final**
Prevents inheritance that could break immutability.
```
public final class ImmutablePerson {
    // class body
}
```
### 2. **Make all fields private and final**
No external modification, no reassignment.
```
private final String name;
private final int age;
private final List<String> hobbies;
```
### 3. **No setter methods**
Only constructor provides initialization.

### 4. **Constructor does deep copy of mutable objects**
Don't store original references.
```
public ImmutablePerson(String name, List<String> hobbies) {
    this.name = name;
    this.hobbies = new ArrayList<>(hobbies);  // Deep copy
    this.age = age;
}
```
### 5. **Getters return defensive copies for mutable objects**
Prevent external modification of internal state.
```
public List<String> getHobbies() {
    return new ArrayList<>(hobbies);  // Defensive copy
}

---
```
## Complete Immutable Class Example
```
public final class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;
    
    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy - don't use original list reference
        this.hobbies = (hobbies == null) ? null : new ArrayList<>(hobbies);
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public List<String> getHobbies() {
        // Defensive copy - don't expose original list
        return (hobbies == null) ? null : new ArrayList<>(hobbies);
    }
}
```
---

## Usage Example
```
public class TestImmutable {
    public static void main(String[] args) {
        List<String> hobbies = new ArrayList<>();
        hobbies.add("reading");
        hobbies.add("coding");
        
        ImmutablePerson person1 = new ImmutablePerson("John", 30, hobbies);
        
        // Modify original list - person1 is unaffected
        hobbies.add("swimming");
        
        System.out.println("person1 hobbies: " + person1.getHobbies());  // [reading, coding]
        System.out.println("original hobbies: " + hobbies);              // [reading, coding, swimming]
    }
}
```
---

## Common Mistakes (BREAKS IMMUTABILITY)

### ❌ Mistake 1: No defensive copy in constructor
public ImmutablePerson(List<String> hobbies) {
    this.hobbies = hobbies;  // WRONG - stores original reference
}

### ❌ Mistake 2: Direct field exposure in getter
public List<String> getHobbies() {
    return hobbies;  // WRONG - exposes internal reference
}

### ❌ Mistake 3: Mutable objects without copy
private final Date birthDate;  // WRONG - Date is mutable

---

## Immutable Class Checklist

| Rule | Status |
|------|--------|
| `final class` | ✅ |
| `private final fields` | ✅ |
| No setters | ✅ |
| Deep copy in constructor | ✅ |
| Defensive copy in getters | ✅ |
| No methods that modify state | ✅ |
| Handles `null` inputs | ✅ |

---

## Benefits of Immutability

- **Thread-safe** - No synchronization needed
- **Cacheable** - Safe to cache instances
- **Predictable** - State never changes unexpectedly
- **Functional programming friendly**
- **Easier debugging** - No side effects

---

## Modern Java: Records (Java 14+)

Java 14+ has **records** - automatically immutable:

public record Person(String name, int age, List<String> hobbies) {}

**Behind the scenes**: Creates final fields, proper getters, equals(), hashCode(), toString()

---

## 🧠 Interview Tips

1. **Always mention all 5 rules** (final class, private final fields, no setters, deep copy constructor, defensive getters)
2. **Show defensive copying** for mutable objects (ArrayList, Date, etc.)
3. **Records** = modern shortcut (Java 14+)
4. **String, Integer, LocalDate** = common immutable examples
5. **Thread-safety without locks** = biggest benefit
