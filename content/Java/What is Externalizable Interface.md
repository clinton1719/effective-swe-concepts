---
title: What is Externalizable Interface in Java?
tags: [java, serialization, externalizable]
difficulty: medium
date: 2026-02-28
---

## What is Externalizable Interface?

**Externalizable** is an interface in `java.io` package that extends `Serializable`. It gives **complete control** over the serialization/deserialization process by requiring you to implement **custom logic**.

Unlike `Serializable` (automatic serialization), `Externalizable` makes you **explicitly define** what gets serialized and how.

---

## Key Methods
```
public interface Externalizable extends Serializable {
    void writeExternal(ObjectOutput out) throws IOException;
    void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
}
```
**Must implement both methods.**

---

## Externalizable vs Serializable

| Aspect | Serializable | Externalizable |
|--------|--------------|----------------|
| **Control** | Automatic (JVM handles) | **Manual** (you control) |
| **Methods** | Marker interface (none) | `writeExternal()`, `readExternal()` |
| **Performance** | Slower (saves everything) | **Faster** (custom logic) |
| **Constructor** | No constructor called | **Public no-arg constructor required** |
| **Flexibility** | Limited | **Complete control** |

---

## Complete Example
```
import java.io.*;

class Employee implements Externalizable {
    private String name;
    private int id;
    private transient String password;  // Can serialize transient fields!
    
    // REQUIRED: Public no-arg constructor
    public Employee() {}
    
    public Employee(String name, int id, String password) {
        this.name = name;
        this.id = id;
        this.password = password;
    }
    
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(name);
        out.writeInt(id);
        out.writeUTF(password);  // Custom: serialize transient field
    }
    
    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        name = in.readUTF();
        id = in.readInt();
        password = in.readUTF();
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', id=" + id + ", password='" + password + "'}";
    }
}
```
**Usage:**
```
public class ExternalizableExample {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 123, "secret");
        
        // Serialize
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("emp.dat"))) {
            oos.writeObject(emp);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("emp.dat"))) {
            Employee deserialized = (Employee) ois.readObject();
            System.out.println(deserialized);  // Works perfectly!
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
---

## Execution Flow

1. **Serialization**: `writeExternal()` called
2. **Deserialization**: 
   - **Public no-arg constructor** called first
   - Then `readExternal()` called

**Important**: No-arg constructor **MUST** be public, otherwise `InvalidClassException`.

---

## Advantages of Externalizable

1. **Better Performance** - Only serialize needed fields
2. **Control Order** - Define exact serialization format
3. **Serialize transient/static** - Manual control over all fields
4. **Versioning** - No `serialVersionUID` issues
5. **Smaller Size** - Exclude unnecessary data

---

## When to Use Externalizable?

**Use when:**
- **Performance critical** (high-volume serialization)
- Need to **exclude certain fields**
- **Custom data format** required
- Serializing **transient/static fields**
- **Legacy systems** with specific formats

**Avoid when:**
- Simple objects (use `Serializable`)
- Frequent class changes
- Team unfamiliar with custom serialization

---

## Common Pitfalls

| Issue | Solution |
|-------|----------|
| `InvalidClassException` | Add **public no-arg constructor** |
| `NullPointerException` | Initialize fields in `readExternal()` |
| Missing fields | Handle **version compatibility** manually |

---

## 🧠 Interview Tips

- **Externalizable extends Serializable** → `writeExternal()` + `readExternal()`
- **Public no-arg constructor REQUIRED** for deserialization
- **Full control** vs Serializable's automatic approach
- **Faster** but **more complex** than Serializable
- **Use for performance-critical** serialization scenarios
- **Overrides** `writeObject()`/`readObject()` if both exist
