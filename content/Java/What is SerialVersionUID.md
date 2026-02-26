---
title: What is serialVersionUID in Java?
tags: [java, serialization, serialversionuid]
difficulty: easy
date: 2026-02-26
---

## What is serialVersionUID?

**serialVersionUID** is a **version identifier** used during Java **serialization and deserialization** to ensure **class compatibility** between the serialized object and the class definition during deserialization.

**Declaration:**
private static final long serialVersionUID = 1L;

---

## Why is it Needed?

When you serialize an object and later deserialize it:

1. JVM checks if the **class structure matches** the serialized data
2. **serialVersionUID** acts as a **version number** for the class
3. If versions **don't match** → `InvalidClassException`

---

## How It Works

### Without explicit serialVersionUID (Default)
JVM **automatically generates** a hash based on:
- Class name
- Fields
- Methods
- Constructors

**Problem**: Small changes (adding comments, refactoring) → different hash → `InvalidClassException`

### With explicit serialVersionUID
You **control the version** manually:
```
class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Explicit version
    
    String name;
    int age;
}
```
**Same version** = Compatible, even if class changes slightly

---

## Example: Version Compatibility

**Version 1** (serialized):
```
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;
}
```
**Version 2** (deserialization):
```
class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Same version!
    String name;
    int age;
    String city;  // New field added
}
```
**Result**: ✅ **Compatible** - `city` gets `null` during deserialization

---

## What Changes Break Compatibility?

| Safe Changes (Same serialVersionUID) | Breaking Changes (Need new serialVersionUID) |
|-------------------------------------|---------------------------------------------|
| Add new fields | Remove fields |
| Add methods | Change field types |
| Modify method bodies | Change class hierarchy |
| Add comments | Change `implements Serializable` |

---

## Best Practices

### 1. **Always declare explicitly**
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    // rest of class
}

### 2. **Increment on breaking changes**
// Version 2 - incompatible changes made
private static final long serialVersionUID = 2L;

### 3. **Generate automatically** (IDE)
- Eclipse/IntelliJ: Right-click → Source → Generate serialVersionUID
- Generates hash based on current class structure

---

## Common Scenarios

| Scenario | Action |
|----------|--------|
| **New Serializable class** | Add `serialVersionUID = 1L` |
| **Minor changes** (add field) | Keep **same** serialVersionUID |
| **Breaking changes** (remove field) | **Increment** serialVersionUID |
| **Multiple microservices** | Use **same version** across services |
| **Production deployment** | **Never change** without planning |

---

## Example with Error

**Without explicit serialVersionUID** - adding a field breaks deserialization:
```
// Original class (serialized)
class Person implements Serializable {
    String name;
}

// Modified class (deserialization fails)
class Person implements Serializable {
    String name;
    int age;  // Added field → JVM hash changes → InvalidClassException
}
```
**Solution**: Explicit `serialVersionUID = 1L` in both versions

---

## 🧠 Interview Tips

- **Purpose**: Version control for **serialization compatibility**
- **Default**: JVM auto-generates (fragile, avoid)
- **Explicit**: `private static final long serialVersionUID = 1L`
- **Same version** = Compatible, **different version** = `InvalidClassException`
- **Increment** on breaking changes (field removal, type changes)
- **Always declare explicitly** in production Serializable classes
- If a parent class has implemented Serializable interface then
child class doesn’t need to implement it but the reverse is not
true
- Static data members and transient data members are not
saved via Serialization process (serialVersionUID is an
exception). So, if you don’t want to save value of a non-static
data member then make it transient
- Constructor of serialized class is never called when the
serialized object is deserialized (in case of inheritance, no-arg
constructor of parent gets called during de-serialization)