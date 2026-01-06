---
title: Why are wrapper classes used in java?
tags: [java]
difficulty: easy
date: 2026-01-05
---

Wrapper classes in Java are used to treat primitive values as **objects**. This allows primitives to participate in Java’s object-oriented features and work with APIs that require objects.

---

## 1. Work with Collections and Generics

- Collections like List, Map, Set can store **only objects**, not primitives.  
- Wrapper classes (Integer, Double, Boolean, etc.) allow primitives to be stored in these collections, for example: List<Integer> instead of List<int>.

---

## 2. Nullability Support

- Primitive types (int, double, boolean, etc.) **cannot be null**.  
- Wrapper classes can hold **null** to represent “no value” or “missing data”, which is useful in database operations, APIs, and optional values.

---

## 3. Utility Methods and Conversions

- Wrapper classes provide **helper methods** like valueOf(), parseXxx(), toString(), compareTo(), etc.  
- These methods make it easy to convert between strings and numbers, compare values, and format them.

---

## 4. Multithreading Synchronization

- Synchronization mechanisms in multithreading often require objects to lock on. Wrapper classes allow primitives to be used in these synchronized contexts..

## 5. Serialization

- If you need to convert data into streams (serialization) for storage or transmission, it typically requires the data to be in object form. 

---

## 6. Required Where Objects Are Expected

Wrapper classes are needed whenever:

- A method parameter or return type is **Object** or a generic type (like T), and you want to pass a primitive.  
- You interact with frameworks and libraries (collections, streams, reflection, etc.) that work only with objects.

---

# When to Prefer Primitives vs Wrappers

- Use **primitives** when you care about **performance and memory** and do not need null or object features.  
- Use **wrapper classes** when you need **nullability, collections/generics compatibility, or utility methods**.