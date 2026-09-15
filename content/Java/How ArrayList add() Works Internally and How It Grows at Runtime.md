---
title: How ArrayList add() Works Internally and How It Grows at Runtime
tags: [java, arraylist, collections, internal-working]
difficulty: easy
date: 2026-08-04
---

# How `ArrayList.add()` Works Internally

`ArrayList` is backed by a **dynamic array**. Unlike a normal array, it automatically increases its capacity when it becomes full.

## Internal Structure

Internally, `ArrayList` maintains an array similar to this:

```java
transient Object[] elementData;
private int size;
```

- `elementData` → Stores the actual elements.
- `size` → Number of elements currently in the list.

> **Important:** Capacity and size are different.

Example:

```java
ArrayList<String> list = new ArrayList<>();
```

Initially:

```
elementData -> []
size = 0
capacity = 0
```

The array isn't allocated immediately.

---

# What Happens When You Call `add()`

```java
list.add("A");
```

Internally (simplified):

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);
    elementData[size++] = e;
    return true;
}
```

Two major steps happen:

1. Ensure enough capacity.
2. Insert the element and increase `size`.

---

# Step 1: Ensuring Capacity

Before inserting, `ArrayList` checks whether there is enough room.

```java
if (size == elementData.length)
    grow();
```

If the internal array is full, it creates a larger array.

---

# Step 2: Insert the Element

Once enough space exists:

```java
elementData[size] = element;
size++;
```

Example:

Before:

```
Index : 0 1 2 3
Data  : A B C -
size = 3
```

After:

```java
add("D");
```

```
Index : 0 1 2 3
Data  : A B C D
size = 4
```

Time Complexity:

- Average: **O(1)**
- Worst case (when resizing): **O(n)**

---

# How ArrayList Grows

Suppose the current capacity is:

```
10
```

After inserting the 11th element:

`ArrayList` creates a new array whose capacity is:

```
newCapacity = oldCapacity + (oldCapacity >> 1)
```

which is equivalent to:

```
newCapacity = oldCapacity × 1.5
```

Example:

| Old Capacity | New Capacity |
|--------------|--------------|
| 10 | 15 |
| 15 | 22 |
| 22 | 33 |
| 33 | 49 |
| 49 | 73 |

So Java increases capacity by approximately **50%** each time.

---

# What Happens During Resizing?

Suppose capacity = 4.

```
Old Array

+---+---+---+---+
| A | B | C | D |
+---+---+---+---+
```

Now you add another element.

Java creates a larger array:

```
New Array (capacity = 6)

+---+---+---+---+---+---+
| A | B | C | D |   |   |
+---+---+---+---+---+---+
```

Then it copies every element:

```
Copy

A
B
C
D
```

Finally:

```
+---+---+---+---+---+---+
| A | B | C | D | E |   |
+---+---+---+---+---+---+
```

The old array becomes eligible for garbage collection.

---

# Why Doesn't It Increase by Only One Element?

Imagine increasing the array by just one slot every time.

```
1
2
3
4
5
...
100000
```

Each insertion would require:

- Creating a new array
- Copying all existing elements

This would make insertion **O(n)** almost every time.

Instead, Java increases the capacity by **50%**, reducing the number of resizes dramatically.

This is why `ArrayList` provides **amortized O(1)** insertion.

---

# Capacity vs Size

Example:

```java
ArrayList<Integer> list = new ArrayList<>();
```

After adding 7 elements:

```
Capacity = 10
Size = 7
```

```
+----+----+----+----+----+----+----+----+----+----+
| 10 | 20 | 30 | 40 | 50 | 60 | 70 |    |    |    |
+----+----+----+----+----+----+----+----+----+----+

Size = 7
Capacity = 10
```

- **Size** = Number of elements actually stored.
- **Capacity** = Total number of elements that can be stored before resizing.

---

# Time Complexity

| Operation | Complexity |
|-----------|------------|
| `add()` (normal case) | O(1) |
| `add()` (after resize) | O(n) |
| `get(index)` | O(1) |
| `set(index)` | O(1) |
| `remove(last)` | O(1) |
| `remove(index)` | O(n) |
| `contains()` | O(n) |

---

# Example Runtime

```java
ArrayList<Integer> list = new ArrayList<>();

list.add(10);
list.add(20);
list.add(30);
...
```

Growth:

```
Initial:
Capacity = 0

First add:
Capacity = 10

After adding 10 elements:
Capacity = 10

Add 11th element:
Capacity = 15

Add 16th element:
Capacity = 22

Add 23rd element:
Capacity = 33
```

The list continues growing by roughly **1.5×** whenever it runs out of space.

---

# Key Takeaways

- `ArrayList` is backed by a dynamic array (`Object[]`).
- `add()` first checks if there is enough capacity.
- If full, a larger array is created and existing elements are copied.
- The new capacity is approximately **1.5×** the old capacity.
- Normal insertion is **O(1)**.
- Resizing insertion is **O(n)** because all elements are copied.
- Thanks to geometric growth, repeated `add()` operations have an **amortized O(1)** time complexity.