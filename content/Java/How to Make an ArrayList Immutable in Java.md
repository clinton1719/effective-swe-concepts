---
title: How to Make an ArrayList Immutable in Java
tags: [java, arraylist, immutable, collections]
difficulty: easy
date: 2026-08-05
---

# What is an Immutable ArrayList?

An **immutable ArrayList** is a list whose contents **cannot be modified** after it is created.

Any attempt to:
- `add()`
- `remove()`
- `set()`
- `clear()`

will result in an exception.

---

# Method 1: Using `List.of()` (Java 9+) ⭐ Recommended

```java
List<String> list = List.of("Apple", "Banana", "Orange");
```

Attempting to modify it:

```java
list.add("Mango");
```

Output:

```
Exception in thread "main"
java.lang.UnsupportedOperationException
```

### Characteristics

- Completely immutable
- Cannot add or remove elements
- Cannot contain `null` values

---

# Method 2: Using `Collections.unmodifiableList()`

```java
ArrayList<String> fruits = new ArrayList<>();

fruits.add("Apple");
fruits.add("Banana");

List<String> immutableList =
        Collections.unmodifiableList(fruits);
```

Trying to modify through the immutable reference:

```java
immutableList.add("Orange");
```

Throws:

```
UnsupportedOperationException
```

## But There Is a Catch!

The original list is still mutable.

```java
fruits.add("Orange");
```

Now:

```
immutableList
↓

[Apple, Banana, Orange]
```

`unmodifiableList()` creates a **read-only view**, **not** a separate immutable copy.

---

# Method 3: Create an Immutable Copy (Java 10+)

```java
List<String> immutable =
        List.copyOf(fruits);
```

Now even if the original list changes:

```java
fruits.add("Mango");
```

The immutable copy remains:

```
[Apple, Banana]
```

This is a true immutable snapshot.

---

# Comparison

| Method | Truly Immutable? | Reflects Changes to Original List? |
|---------|------------------|------------------------------------|
| `List.of()` | ✅ Yes | No |
| `Collections.unmodifiableList()` | ❌ No (read-only view) | ✅ Yes |
| `List.copyOf()` | ✅ Yes | No |

---

# Visual Example

### Original List

```
fruits
│
▼
[Apple, Banana]
```

---

### Using `Collections.unmodifiableList()`

```
fruits
│
├──────────────► [Apple, Banana]
│
immutableView
│
└──────────────► Same List
```

If:

```java
fruits.add("Orange");
```

Both references now see:

```
[Apple, Banana, Orange]
```

---

### Using `List.copyOf()`

```
fruits
│
▼
[Apple, Banana]

immutableCopy
│
▼
[Apple, Banana]
```

After:

```java
fruits.add("Orange");
```

Result:

```
fruits
[Apple, Banana, Orange]

immutableCopy
[Apple, Banana]
```

The immutable copy is unaffected.

---

# When to Use Which?

| Scenario | Best Choice |
|----------|-------------|
| Create a fixed list | `List.of()` |
| Expose a read-only view of an existing list | `Collections.unmodifiableList()` |
| Make a permanent immutable copy | `List.copyOf()` |

---

# Key Takeaways

- **`List.of()`** creates a brand-new immutable list.
- **`Collections.unmodifiableList()`** provides a read-only view but the original list can still change.
- **`List.copyOf()`** creates an independent immutable copy of an existing collection.
- Any modification operation (`add`, `remove`, `set`, `clear`) on an immutable list throws **`UnsupportedOperationException`**.
- If you need a truly immutable list that cannot change regardless of the original collection, prefer **`List.copyOf()`** or **`List.of()`**.