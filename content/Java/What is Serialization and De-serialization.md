---
title: What is Serialization and Deserialization in Java?
tags: [java, serialization, io]
difficulty: medium
date: 2026-02-19
---

## What is Serialization?

**Serialization** is the process of **converting a Java object into a byte stream** so it can be:
- **Saved to a file**
- **Sent over a network**
- **Stored in a database**

**Deserialization** is the **reverse process** - converting the byte stream back into a Java object.

---

## How it Works

**Requirements:**
- Class must implement **`Serializable` interface** (marker interface)
- Use **`ObjectOutputStream`** for serialization
- Use **`ObjectInputStream`** for deserialization

---

## Complete Example
```
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    
    String name;
    int age;
    transient String password;  // Won't be serialized
    
    Person(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", password='" + password + "'}";
    }
}

class SerializationExample {
    public static void main(String[] args) {
        Person person = new Person("John", 30, "secret123");
        
        // Serialization
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            oos.writeObject(person);
            System.out.println("Serialized: " + person);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialization
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person deserialized = (Person) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

Output:
Serialized: Person{name='John', age=30, password='secret123'}
Deserialized: Person{name='John', age=30, password='null'}
```
---

## Key Concepts

### 1. Serializable Interface
- **Marker interface** - no methods to implement
- Class must implement it to be serializable
- Without it → `NotSerializableException`

### 2. transient Keyword
- Fields marked `transient` are **NOT serialized**
- Gets default value during deserialization (`null`, `0`, `false`)

### 3. static Fields
- **Static fields are NOT serialized**
- They belong to class, not object → get current class value on deserialization

### 4. serialVersionUID
- **Version identifier** for the class
- Ensures compatibility between serialized object and class definition
- Add explicitly: `private static final long serialVersionUID = 1L;`

---

## What Gets Serialized?

| Field Type | Serialized? | Notes |
|------------|-------------|-------|
| **Primitive** | ✅ Yes | Copied as-is |
| **Non-transient instance fields** | ✅ Yes | Including private fields |
| **Serializable objects** | ✅ Yes | Recursively serialized |
| **transient fields** | ❌ No | Default value on deserialization |
| **static fields** | ❌ No | Current class value used |

---

## Use Cases

1. **Session persistence** - Save user sessions to disk
2. **Distributed systems** - Send objects over network (RMI)
3. **Caching** - Store complex objects in Redis/Memcached
4. **Backup/restore** - Save application state
5. **Deep copy** - Serialize → deserialize for object cloning

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `NotSerializableException` | Implement `Serializable` or mark field `transient` |
| Version mismatch | Add explicit `serialVersionUID` |
| Sensitive data | Mark fields `transient` |
| Performance | Use `Externalizable` for custom serialization |

---

## Custom Serialization (readObject/writeObject)

Override these methods for custom behavior:
```
private void writeObject(ObjectOutputStream oos) throws IOException {
    oos.defaultWriteObject();
    // Custom serialization logic
}

private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
    ois.defaultReadObject();
    // Custom deserialization logic
}
```

## 🧠 Interview Tips
Serialization = Object → Byte stream, Deserialization = Byte stream → Object

Serializable interface is mandatory (marker interface)

transient = skip serialization, static = not serialized

serialVersionUID prevents version compatibility issues

Java uses reflection to serialize private fields automatically

Security risk: Deserialization can execute arbitrary code (use carefully)