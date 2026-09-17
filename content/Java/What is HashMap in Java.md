---
title: What is HashMap in Java?
tags: [java, hashmap, collections, map, hashing]
difficulty: easy
date: 2026-09-17
---

## What is HashMap?

`HashMap` is a Java Collection Framework class that implements the `Map` interface.

It stores data as **key-value pairs**:

```text
Key   → Value

101   → "John"
102   → "Alice"
103   → "Bob"
```

A key must be **unique**, while values can be duplicated.

---

## How Does HashMap Store Data?

Internally, `HashMap` uses an **array of buckets**.

Each bucket can contain multiple entries.

Conceptually:

```text
HashMap

Bucket 0  →  [Node] → [Node]
Bucket 1  →  null
Bucket 2  →  [Node]
Bucket 3  →  [Node] → [Node] → [Node]
...
Bucket 15 →  null
```

Each entry is represented internally by a `Node`.

A simplified `Node` contains:

```text
Node
 ├── hash
 ├── key
 ├── value
 └── next
```

The `next` reference connects entries that happen to belong to the same bucket.

---

## How Does `put()` Work?

Suppose we execute:

```text
map.put("Apple", 100)
```

HashMap roughly performs these steps:

### 1. Calculate the hash

HashMap obtains the hash code of the key:

```text
"Apple".hashCode()
```

It then processes this hash to determine the bucket.

### 2. Find the bucket

The hash determines which bucket should contain the entry.

```text
hash → bucket index
```

For example:

```text
hash
 ↓
Bucket 5
```

### 3. Store the Node

The entry is stored in that bucket:

```text
Bucket 5

[hash | "Apple" | 100 | next]
```

---

## What Happens If Two Keys Go to the Same Bucket?

This is called a **hash collision**.

For example:

```text
"Apple" → Bucket 5
"Orange" → Bucket 5
```

The bucket can contain multiple nodes:

```text
Bucket 5

["Apple", 100] → ["Orange", 200] → null
```

Historically, HashMap buckets were linked lists.

In modern Java, when a bucket becomes sufficiently large, HashMap can convert the bucket's structure into a **Red-Black Tree**, improving lookup performance in heavily-collided buckets.

---

## How Does `get()` Work?

Suppose:

```text
map.get("Orange")
```

HashMap:

```text
"Orange"
    ↓
hashCode()
    ↓
calculate bucket
    ↓
find bucket
    ↓
compare keys
    ↓
return value
```

If the bucket contains:

```text
["Apple", 100] → ["Orange", 200]
```

HashMap checks the entries and uses key equality to identify the requested key.

Conceptually:

```text
hashCode()
    ↓
Find bucket
    ↓
hash comparison
    ↓
equals()
    ↓
Value
```

This is why **both `hashCode()` and `equals()` are important** for HashMap keys.

---

## Why Are `get()` and `put()` O(1)?

Normally, HashMap doesn't search every entry.

Instead:

```text
Key
 ↓
hash
 ↓
bucket
 ↓
entry
```

It can directly narrow the search to a particular bucket.

Therefore, under normal conditions:

```text
get() → O(1) average
put() → O(1) average
```

However, this depends on keys being distributed reasonably across buckets and on a correct `equals()` / `hashCode()` contract.

In the worst case, many keys can collide into the same bucket.

Modern Java can use a Red-Black Tree for sufficiently large collision chains, giving approximately:

```text
O(log n)
```

for operations within that tree.

---

# Why `equals()` and `hashCode()` Matter

Suppose you create a custom class:

```text
Employee
```

and use it as a HashMap key.

The contract is:

> If two objects are equal according to `equals()`, they must return the same `hashCode()`.

Conceptually:

```text
key
 ↓
hashCode()
 ↓
bucket
 ↓
equals()
 ↓
matching key
```

If this contract is violated, HashMap may not be able to find an entry that was previously inserted.

---

# What Happens With Duplicate Keys?

Keys must be unique.

Suppose:

```text
map.put("Apple", 100)
map.put("Apple", 500)
```

The second operation does **not** create another `"Apple"` key.

Instead:

```text
"Apple" → 500
```

The old value is replaced.

So:

```text
put(existingKey, newValue)
```

means:

```text
Update the value
```

---

# HashMap Capacity

A HashMap internally maintains an array of buckets.

The commonly used default initial capacity is:

```text
16
```

So conceptually:

```text
Bucket 0
Bucket 1
Bucket 2
...
Bucket 15
```

Total:

```text
16 buckets
```

The default load factor is:

```text
0.75
```

---

# What is Load Factor?

Load factor determines when HashMap should resize.

The resize threshold is approximately:

```text
capacity × load factor
```

For the default configuration:

```text
16 × 0.75 = 12
```

Therefore, the threshold is **12 entries**.

When adding an entry causes the size to exceed that threshold, HashMap resizes.

For example:

```text
Capacity = 16
Threshold = 12
```

After inserting the 13th entry:

```text
Capacity:
16 → 32
```

The entries are redistributed into the new bucket array.

> More precisely, HashMap resizes when the insertion makes `size > threshold`; so with capacity 16 and load factor 0.75, the resize is triggered by the 13th insertion.

---

# Why Does HashMap Resize?

As more entries are added, buckets become increasingly populated.

For example:

```text
16 buckets

Bucket 0 → A → B → C
Bucket 1 → D
Bucket 2 → E → F
...
```

More collisions can mean more work during lookup.

Increasing the number of buckets helps distribute entries more evenly:

```text
16 buckets
    ↓ resize
32 buckets
    ↓ resize
64 buckets
```

This helps HashMap maintain good average performance.

---

# What Happens During Resize?

Suppose:

```text
Capacity = 16
```

and it grows to:

```text
Capacity = 32
```

HashMap creates a larger bucket array and redistributes the existing entries according to the new capacity.

Conceptually:

```text
Old table

16 buckets
    ↓
resize
    ↓
New table
32 buckets
```

This is an expensive operation because existing entries need to be processed.

However, resizing happens occasionally, so normal `put()` remains **O(1) amortized**.

---

# Null Keys and Values

HashMap allows:

```text
One null key
Multiple null values
```

Example:

```text
null → "A"
101  → null
102  → null
103  → "C"
```

You can have only **one `null` key** because keys must be unique.

---

# Does HashMap Maintain Insertion Order?

No.

For example:

```text
put(A)
put(B)
put(C)
```

You should **not** assume iteration will produce:

```text
A → B → C
```

HashMap does not guarantee insertion order.

If you need insertion order, use:

```text
LinkedHashMap
```

---

# Is HashMap Thread-Safe?

No.

`HashMap` is **not synchronized** and should not be treated as thread-safe for concurrent modification.

For concurrent access, Java provides alternatives such as:

```text
ConcurrentHashMap
```

depending on the requirements.

---

# HashMap Internal Picture

A simplified representation:

```text
                  HashMap
                     |
              bucket array
                     |
     +---------------+---------------+
     |               |               |
     ↓               ↓               ↓
 Bucket 0         Bucket 1         Bucket 2
   null          Node → Node         Node
                   |                  |
                   ↓                  ↓
                 key/value          key/value
```

Each Node conceptually contains:

```text
+------+-------+-------+------+
| hash |  key  | value | next |
+------+-------+-------+------+
```

---

# HashMap vs ArrayList

The fundamental difference is how data is accessed.

### ArrayList

```text
index → element

0 → A
1 → B
2 → C
```

### HashMap

```text
key
 ↓
hash
 ↓
bucket
 ↓
value
```

Therefore:

```text
ArrayList → access using index
HashMap   → access using key
```

---

# Key Takeaways

- `HashMap` implements the **Map** interface.
- It stores data as **key-value pairs**.
- Keys are unique; values don't have to be.
- A duplicate key replaces the existing value.
- HashMap internally uses a **bucket array**.
- Entries are represented using `Node` objects.
- Collisions can result in multiple entries in the same bucket.
- Modern Java can convert heavily-collided buckets into **Red-Black Trees**.
- `get()` and `put()` are **O(1) average** under normal conditions.
- `hashCode()` determines where to look; `equals()` helps identify the exact key.
- Default initial capacity is commonly **16**.
- Default load factor is **0.75**.
- With capacity 16, the threshold is 12, so the **13th insertion triggers resizing**.
- HashMap allows **one null key** and multiple null values.
- HashMap does **not guarantee insertion order**.
- HashMap is **not synchronized**.