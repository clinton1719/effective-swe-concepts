---
title: Difference between Serializable and Externalizable
tags: [java, serialization, externalizable]
difficulty: medium
date: 2026-03-03
---

## Serializable vs Externalizable

Both interfaces enable object serialization, but they work fundamentally differently.

---

## Comparison Table

| Aspect | Serializable | Externalizable |
|--------|--------------|----------------|
| **Interface Type** | Marker (no methods) | Has 2 methods to implement |
| **Control** | Automatic (JVM handles everything) | Manual (you write custom logic) |
| **Methods** | None | writeExternal(), readExternal() |
| **Performance** | Slower (saves metadata + all fields) | Faster (custom format, no metadata) |
| **Constructor** | No constructor called | Public no-arg constructor REQUIRED |
| **Fields Serialized** | Non-static, non-transient fields | Only what you explicitly write |
| **Inheritance** | Automatically serializes superclasses | Manual handling of parent fields |
| **Versioning** | serialVersionUID needed | No versioning issues |
| **Flexibility** | Limited | Complete control |

---

## Serializable (Automatic)
```
class Person implements Serializable {
    private String name;
    private int age;
    private transient String password;  // Skipped automatically
    
    // No methods needed
}
```
**JVM automatically:**
- Serializes all non-static, non-transient fields
- Calls parent constructors
- Handles versioning with serialVersionUID
- Writes class metadata

---

## Externalizable (Manual Control)
```
class Person implements Externalizable {
    private String name;
    private int age;
    private String password;  // Can serialize even without transient
    
    // REQUIRED: Public no-arg constructor
    public Person() {}
    
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(name);
        out.writeInt(age);
        out.writeUTF(password);  // Custom logic
    }
    
    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        name = in.readUTF();
        age = in.readInt();
        password = in.readUTF();
    }
}
```
**You manually control:**
- Exactly what gets serialized
- Order of serialization
- Even transient/static fields
- Parent class fields (must handle yourself)

---

## Execution Flow Difference

**Serializable Flow:**

1. writeObject() (if overridden) or default serialization

2. All non-static, non-transient fields saved automatically

3. Class metadata written


**Externalizable Flow:**

1. Serialization:

 - writeExternal() called - YOU decide what to write

2. Deserialization:

 - Public no-arg constructor called

 - readExternal() called - YOU read and populate fields

 
---

## When to Use Each

**Use Serializable when:**
- Simple objects
- Don't need performance optimization
- Want automatic inheritance handling
- Team prefers simplicity

**Use Externalizable when:**
- Performance critical (high volume)
- Need custom serialization format
- Want to serialize transient fields
- Need precise control over data

---
