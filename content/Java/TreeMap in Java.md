---
title: TreeMap in Java
tags: [java, treemap, collections, map, red-black-tree]
difficulty: medium
date: 2026-09-24
---

## What is TreeMap?

`TreeMap` is a class in Java that implements the `NavigableMap` interface and stores key-value pairs in **sorted order of keys**.

Internally, `TreeMap` is implemented using a **Red-Black Tree**, which is a self-balancing binary search tree.

Example:

    TreeMap<Integer, String> map = new TreeMap<>();

    map.put(30, "C");
    map.put(10, "A");
    map.put(20, "B");

The keys are stored in sorted order:

    10 → A
    20 → B
    30 → C

Unlike `HashMap`, `TreeMap` maintains ordering based on the keys.

---

## Key Characteristics

| Property | TreeMap |
|---|---|
| Stores | Key-value pairs |
| Ordering | Sorted by key |
| Internal structure | Red-Black Tree |
| `get()` | O(log n) |
| `put()` | O(log n) |
| `remove()` | O(log n) |
| Duplicate keys | Not allowed |
| Duplicate values | Allowed |
| `null` key | Generally not allowed with natural ordering |
| `null` values | Allowed |
| Thread-safe | No |

---

## How Does TreeMap Work Internally?

The most important interview point is:

> `TreeMap` uses a **Red-Black Tree** internally.

A Red-Black Tree is a self-balancing Binary Search Tree (BST).

Conceptually:

    TreeMap
       |
       v
    Red-Black Tree
       |
       +-------- 20
       |        /  \
       |      10    30
       |
       +-------- Each node contains:
                  key
                  value
                  color
                  left
                  right
                  parent

The tree remains approximately balanced as elements are inserted and removed.

This allows `TreeMap` operations to remain O(log n).

---

## How Does `put()` Work?

Suppose:

    map.put(20, "B");

The process is roughly:

    1. Start at the root.
    2. Compare the new key with the current key.
    3. If smaller → move left.
    4. If larger → move right.
    5. Continue until the correct position is found.
    6. Insert the new node.
    7. Perform Red-Black Tree balancing if necessary.

For example:

    put(20)
    put(10)
    put(30)

The tree could look conceptually like:

          20
         /  \
       10    30

---

## Why Does TreeMap Need a Red-Black Tree?

A normal Binary Search Tree can become unbalanced.

For example, inserting:

    10
    20
    30
    40
    50

into a normal BST could produce:

    10
      \
       20
         \
          30
            \
             40
               \
                50

This behaves almost like a linked list.

Searching could then become:

    O(n)

A Red-Black Tree automatically performs rotations and recoloring to maintain balance.

Conceptually:

    Unbalanced BST
         ↓
    potentially O(n)

    Red-Black Tree
         ↓
    balanced enough
         ↓
    O(log n)

---

## How Does TreeMap Find a Key?

Suppose the tree contains:

    20
   /  \
 10    30

We search for `30`.

TreeMap compares:

    30 vs 20

Since:

    30 > 20

it moves right.

Then:

    30 vs 30

The key is found.

Because the tree remains balanced, the search takes O(log n).

---

## How Does TreeMap Maintain Sorted Order?

`TreeMap` compares keys while inserting them.

There are two common ways to determine ordering:

### 1. Natural Ordering

Keys implement `Comparable`.

Example:

    TreeMap<Integer, String> map = new TreeMap<>();

`Integer` implements `Comparable`, so TreeMap can determine the ordering automatically.

### 2. Custom Comparator

We can provide a `Comparator`:

    TreeMap<Integer, String> map =
        new TreeMap<>((a, b) -> b - a);

Now the keys are ordered in descending order.

Conceptually:

    30 → C
    20 → B
    10 → A

---

## What Happens When We Add a Duplicate Key?

Suppose:

    map.put(10, "A");
    map.put(10, "Updated");

The second `put()` does not create another node.

Instead, the value associated with key `10` is replaced:

    10 → Updated

So:

> TreeMap does not allow duplicate keys, but it allows duplicate values.

---

## Important: TreeMap Ordering Is Based on Keys

Consider:

    TreeMap<Integer, String> map = new TreeMap<>();

    map.put(30, "Apple");
    map.put(10, "Mango");
    map.put(20, "Banana");

The order is:

    10 → Mango
    20 → Banana
    30 → Apple

The values are not sorted.

The **keys determine the ordering**.

---

## Useful TreeMap Methods

Because `TreeMap` implements `NavigableMap`, it provides several useful navigation operations.

| Method | Purpose |
|---|---|
| `firstKey()` | Returns the smallest key |
| `lastKey()` | Returns the largest key |
| `lowerKey(k)` | Greatest key strictly less than `k` |
| `floorKey(k)` | Greatest key less than or equal to `k` |
| `higherKey(k)` | Smallest key strictly greater than `k` |
| `ceilingKey(k)` | Smallest key greater than or equal to `k` |
| `pollFirstEntry()` | Removes and returns first entry |
| `pollLastEntry()` | Removes and returns last entry |
| `descendingMap()` | Returns a reverse-order view |

For example:

    TreeMap<Integer, String> map = new TreeMap<>();

    map.put(10, "A");
    map.put(20, "B");
    map.put(30, "C");

Then:

    lowerKey(20)   → 10
    floorKey(20)   → 20
    higherKey(20)  → 30
    ceilingKey(20) → 20

---

## TreeMap vs HashMap

| Feature | HashMap | TreeMap |
|---|---|---|
| Ordering | No guaranteed order | Sorted by key |
| Internal structure | Hash table | Red-Black Tree |
| `get()` | Average O(1) | O(log n) |
| `put()` | Average O(1) | O(log n) |
| `remove()` | Average O(1) | O(log n) |
| Navigation methods | Limited | Extensive |
| `null` key | Allows one | Generally not with natural ordering |
| Best use case | Fast key lookup | Sorted keys / range queries |

The important trade-off is:

> `HashMap` generally prioritizes faster average lookup, while `TreeMap` provides sorted keys and efficient ordered navigation.

---

## TreeMap vs LinkedHashMap

| Feature | TreeMap | LinkedHashMap |
|---|---|---|
| Ordering | Sorted by key | Insertion/access order |
| Internal structure | Red-Black Tree | Hash table + linked list |
| Average lookup | O(log n) | O(1) |
| Range queries | Supported | Not naturally supported |
| Main use case | Sorted data | Predictable iteration order |

---

## Does TreeMap Allow `null`?

With natural ordering, a `TreeMap` generally does **not** permit a `null` key because it needs to compare keys.

For example:

    TreeMap<Integer, String> map = new TreeMap<>();

    map.put(null, "A");

This results in a `NullPointerException` under the usual natural-ordering configuration.

However, a custom comparator can define an ordering that explicitly handles `null`.

`null` values are allowed.

---

## Important Interview Point: Comparable vs Comparator

If you use:

    TreeMap<Employee, String> map = new TreeMap<>();

TreeMap needs a way to compare `Employee` keys.

It can use:

- `Employee`'s natural ordering through `Comparable`, or
- a `Comparator` supplied to the `TreeMap`.

If the keys cannot be compared according to the map's ordering, insertion/search operations can fail with a `ClassCastException`.

---

## Time Complexity

Because `TreeMap` uses a Red-Black Tree:

| Operation | Complexity |
|---|---:|
| `put()` | O(log n) |
| `get()` | O(log n) |
| `remove()` | O(log n) |
| `containsKey()` | O(log n) |
| `firstKey()` | O(log n) in general implementation terms |
| `lastKey()` | O(log n) in general implementation terms |
| Iteration | O(n) |

The key reason for the O(log n) operations is that the tree remains balanced.

---

## Important Interview Points

- `TreeMap` implements `NavigableMap`.
- It stores entries in sorted order of keys.
- Internally, it uses a Red-Black Tree.
- It does not allow duplicate keys.
- Adding an existing key replaces its value.
- Values can be duplicated.
- Ordering is determined by natural ordering or a supplied `Comparator`.
- `TreeMap` is not synchronized.
- `TreeMap` is useful when sorted keys or range/navigation operations are required.
- `TreeMap` generally does not allow a `null` key when using natural ordering.
- `TreeMap` provides methods such as `floorKey()`, `ceilingKey()`, `lowerKey()`, and `higherKey()`.
- Its basic search, insertion, and deletion operations are O(log n).
- The Red-Black Tree is what prevents the structure from degenerating into a highly unbalanced BST.

## Key Takeaway

Remember `TreeMap` as:

    TreeMap
       ↓
    Red-Black Tree
       ↓
    Keys kept sorted
       ↓
    Search / Insert / Delete → O(log n)
       ↓
    Supports navigation and range-based operations

The main reason to choose `TreeMap` over `HashMap` is not raw lookup speed; it is when you need **ordered keys and efficient navigation through that ordering**.

**Q1.** How does a Red-Black Tree remain balanced after inserting or deleting a node?

**Q2.** What is the difference between `floorKey()`, `ceilingKey()`, `lowerKey()`, and `higherKey()`?

**Q3.** Why would you choose `TreeMap` over `HashMap` when implementing a range-query or sorted-data requirement?