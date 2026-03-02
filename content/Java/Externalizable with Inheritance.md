---
title: Externalizable with Inheritance
tags: [java, serialization, externalizable, inheritance]
difficulty: medium
date: 2026-03-02
---

## Problem Statement

If a class implements **Externalizable** and also has a **parent class**, how can we:
- **Save (serialize)** the data of the parent class, and  
- **Recover (deserialize)** it back correctly?

---

## Key Idea

With **Externalizable**, **nothing is serialized automatically** – not even the fields of the current class, and definitely not the parent's fields.

So, if a child class implements `Externalizable`:

- You are responsible for **manually writing**:
  - Parent fields
  - Child fields  
- And **manually reading** them back in **the same order**.

The parent class itself **does not need** to implement `Serializable` or `Externalizable` for its fields to be saved – you can access them via getters/setters or directly (if visible) and handle them in `writeExternal`/`readExternal`.

---

## Example Setup

### Parent Class (No Serialization Interface)
```
class ClassA {
    private int deptId;
    private String deptName;
    
    public ClassA() {
    }
    
    public ClassA(int deptId, String deptName) {
        this.deptId = deptId;
        this.deptName = deptName;
    }
    
    public int getDeptId() {
        return deptId;
    }
    
    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }
    
    public String getDeptName() {
        return deptName;
    }
    
    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }
}
```
### Child Class (Implements Externalizable)
```
class ClassB extends ClassA implements Externalizable {
    private String empId;
    private String empName;
    
    // 1. Mandatory public no-arg constructor
    public ClassB() {
        // Important: parent no-arg constructor gets called automatically
    }
    
    public ClassB(int deptId, String deptName, String empId, String empName) {
        super(deptId, deptName);  // initialize parent fields
        this.empId = empId;
        this.empName = empName;
    }
    
    public String getEmpId() {
        return empId;
    }
    
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    
    public String getEmpName() {
        return empName;
    }
    
    public void setEmpName(String empName) {
        this.empName = empName;
    }
    
    // 2. Custom serialization logic
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        // Write parent fields manually
        out.writeInt(getDeptId());
        out.writeObject(getDeptName());
        
        // Write child fields
        out.writeObject(getEmpId());
        out.writeObject(getEmpName());
    }
    
    // 3. Custom deserialization logic
    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        // Read parent fields in EXACTLY the same order
        setDeptId(in.readInt());
        setDeptName((String) in.readObject());
        
        // Read child fields
        setEmpId((String) in.readObject());
        setEmpName((String) in.readObject());
    }
}

### Usage Example

class TestExternalizableInheritance {
    public static void main(String[] args) {
        ClassB original = new ClassB(101, "IT", "E001", "Alice");
        
        // Serialize
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("b.ser"))) {
            oos
```