---
title: Red-Black Tree in Java
tags: [java, red-black-tree, tree, treemap, treeset, data-structures]
difficulty: medium
date: 2026-09-24
---

## What is a Red-Black Tree?

A **Red-Black Tree** is a **self-balancing Binary Search Tree (BST)**.

It stores elements in sorted order like a normal BST, but it uses an additional `color` property (`RED` or `BLACK`) on every node to prevent the tree from becoming highly unbalanced.

The main goal is to keep the tree approximately balanced so that:

- Search → O(log n)
- Insert → O(log n)
- Delete → O(log n)

A simplified node looks like:

    Node
    ├── key
    ├── value
    ├── color
    ├── left
    ├── right
    └── parent

The important idea is:

> A Red-Black Tree sacrifices some strict balancing to maintain a simpler balancing rule that guarantees logarithmic height.

---

## Why Do We Need a Red-Black Tree?

Consider a normal Binary Search Tree.

If values are inserted in this order:

    10
    20
    30
    40
    50

A normal BST can become:

    10
      \
       20
         \
          30
            \
             40
               \
                50

This is effectively a linked list.

Searching for `50` now takes:

    O(n)

A Red-Black Tree prevents this type of extreme imbalance.

It may instead maintain a structure roughly like:

          20
         /  \
       10    40
            /  \
           30   50

The exact structure depends on the insertion/deletion sequence and balancing operations.

---

## Red-Black Tree Rules

A Red-Black Tree maintains several rules.

### Rule 1: Every Node Is Red or Black

Each node has a color:

    RED
    or
    BLACK

The color is used for balancing; it does not represent the ordering of the values.

---

### Rule 2: The Root Is Black

The root of the tree is always black.

---

### Rule 3: Null Leaves Are Considered Black

Conceptually, every missing child is treated as a black leaf.

For example:

    20

/ \
 10 30

The missing children below `10` and `30` are conceptually black nodes.

These are often called **NIL leaves** or sentinel leaves in descriptions of Red-Black Trees.

---

### Rule 4: A Red Node Cannot Have a Red Child

This is one of the most important rules.

Invalid:

        20(B)
        /
      10(R)
      /
    5(R)

A red node cannot have a red child.

---

### Rule 5: Every Path Has the Same Number of Black Nodes

From a node to any descendant NIL leaf, every path must contain the same number of black nodes.

This is called the **black height** property.

For example:

        20(B)
       /    \
    10(R)   30(B)

The balancing rules ensure that paths through the tree maintain the required black-node count.

---

## How Does It Stay Balanced?

When a node is inserted or deleted, the operation may violate one of the Red-Black Tree rules.

The tree then performs:

1. **Recoloring**
2. **Rotations**

These operations restore the Red-Black Tree properties.

The two fundamental rotations are:

- Left rotation
- Right rotation

---

## What Is a Rotation?

A rotation changes the structure of the tree while preserving the BST ordering.

For example, consider:

        10
          \
           20
             \
              30

A left rotation around `10` can produce:

          20
         /  \
       10    30

Notice that the ordering is still valid:

    10 < 20 < 30

But the tree has become more balanced.

---

## Left Rotation

Conceptually:

Before:

        X
         \
          Y
         / \
        B   C

After:

          Y
         / \
        X   C
         \
          B

The important point is that the BST ordering is preserved.

---

## Right Rotation

The opposite operation is a right rotation.

Before:

          Y
         /
        X
       / \
      A   B

After:

        X
       / \
      A   Y
         /
        B

Again, the ordering remains valid.

---

## How Insertion Works

Suppose we insert:

    10
    20
    30

into a Red-Black Tree.

### Step 1: Insert Like a Normal BST

First:

        10

Then:

        10
          \
           20

Then inserting `30` initially gives:

        10
          \
           20
             \
              30

This creates a problem because the tree is becoming unbalanced and may violate Red-Black rules.

---

### Step 2: Detect the Violation

The newly inserted node is typically inserted as a **red node**.

The Red-Black Tree checks whether any rules have been violated.

If necessary, it performs recoloring and/or rotation.

---

### Step 3: Rotate

A left rotation can transform the structure into:

          20
         /  \
       10    30

The colors are then adjusted as required.

The exact recoloring depends on the specific insertion case.

---

## Recoloring

Sometimes rotation is not necessary.

For example, suppose we have:

          20(B)
         /    \
      10(R)   30(R)

If inserting another node causes a red-red violation, the tree may be able to resolve it by changing colors and moving the balancing problem upward.

Conceptually:

    Red → Black
    Black → Red

The exact recoloring depends on the surrounding nodes.

The important interview point is:

> Rotations change the tree's structure; recoloring changes node colors to restore Red-Black properties.

---

## What Happens During Deletion?

Deletion is more complicated than insertion.

First, the node is removed similarly to deletion in a BST.

Then the tree checks whether the Red-Black properties have been violated.

The tree may perform:

- Recoloring
- Left rotations
- Right rotations

until the Red-Black properties are restored.

One concept commonly encountered during deletion is **"double black"**, which represents a temporary imbalance in black height.

For an interview, you generally need to understand the purpose of this mechanism rather than memorize every deletion case unless the role specifically focuses on data structures.

---

## Why Are Operations O(log n)?

A Red-Black Tree guarantees that its height remains proportional to:

    log(n)

More specifically, the height is bounded by approximately:

    2 × log₂(n + 1)

Therefore:

    Search  → O(log n)
    Insert  → O(log n)
    Delete  → O(log n)

This is the primary benefit over an ordinary BST, whose worst-case height can be:

    O(n)

---

## Red-Black Tree in Java

You normally do not implement a Red-Black Tree yourself when using Java's standard collections.

Java already uses this data structure internally in important classes.

### TreeMap

`TreeMap` uses a Red-Black Tree internally.

Conceptually:

    TreeMap
       ↓
    Red-Black Tree
       ↓
    Key → Value

This gives `TreeMap`:

    put()       → O(log n)
    get()       → O(log n)
    remove()    → O(log n)

while keeping keys sorted.

---

### TreeSet

`TreeSet` is also based on a tree structure backed by `TreeMap`.

Conceptually:

    TreeSet
       ↓
    TreeMap
       ↓
    Red-Black Tree

This allows `TreeSet` to maintain its elements in sorted order.

---

## Practical Applications

Red-Black Trees are useful when you need:

- Sorted data
- Fast search
- Fast insertion/deletion
- Guaranteed logarithmic performance
- Navigation to neighboring values
- Range-based operations

### 1. Sorted Maps

Java's `TreeMap` is a practical example.

For example, suppose we store employees by employee ID:

    1001 → Alice
    1005 → Bob
    1010 → Charlie
    1020 → David

The keys remain sorted, while lookup, insertion, and deletion remain O(log n).

---

### 2. Sorted Sets

`TreeSet` is useful when you need unique values in sorted order.

For example:

    10
    20
    30
    40

The collection automatically maintains ordering and uniqueness.

---

### 3. Range Queries

A major advantage of balanced search trees is ordered navigation.

Suppose we have:

    10, 20, 30, 40, 50, 60

and need values between:

    25 and 50

A tree-based ordered structure can efficiently navigate to the relevant section rather than treating the data as an unordered collection.

Java's `TreeMap` and `TreeSet` provide methods such as:

    lower()
    floor()
    ceiling()
    higher()

and range-view methods such as:

    subMap()
    subSet()

These are practical examples of why maintaining sorted structure is useful.

---

### 4. Scheduling / Ordered Data

A system may need to maintain items ordered by:

- timestamp
- priority
- ID
- price
- score

When both ordering and dynamic insertion/deletion are important, a balanced search tree can be useful.

For example:

    timestamp → event

The tree can maintain events in timestamp order while allowing events to be inserted and removed efficiently.

---

### 5. Ordered In-Memory Indexes

A Red-Black Tree can be useful as an in-memory index when:

- data changes dynamically
- sorted access is required
- predictable O(log n) operations are desired

However, for many practical Java applications, you would use `TreeMap` or `TreeSet` rather than implementing the tree yourself.

---

## Red-Black Tree vs AVL Tree

Both are self-balancing BSTs.

| Feature                       | Red-Black Tree                 | AVL Tree                               |
| ----------------------------- | ------------------------------ | -------------------------------------- |
| Balance                       | Less strict                    | More strict                            |
| Search                        | O(log n)                       | O(log n)                               |
| Insert                        | O(log n)                       | O(log n)                               |
| Delete                        | O(log n)                       | O(log n)                               |
| Rotations                     | Generally fewer during updates | Can require more                       |
| Typical strength              | Frequent insert/delete         | Search-heavy workloads                 |
| Java standard library example | `TreeMap`, `TreeSet`           | No general-purpose standard collection |

The key conceptual difference:

> AVL trees maintain stricter height balance, while Red-Black Trees allow slightly more imbalance in exchange for efficient updates.

---

## Red-Black Tree vs HashMap

These structures solve different problems.

| Feature       | Red-Black Tree | HashMap                 |
| ------------- | -------------- | ----------------------- |
| Ordering      | Sorted         | No guaranteed ordering  |
| Search        | O(log n)       | Average O(1)            |
| Insert        | O(log n)       | Average O(1)            |
| Delete        | O(log n)       | Average O(1)            |
| Range queries | Efficient      | Not naturally supported |
| Main strength | Ordered data   | Fast average lookup     |

So:

    Need fast average lookup?
        → HashMap

    Need sorted keys + navigation?
        → TreeMap / Red-Black Tree

---

## Important Interview Points

- A Red-Black Tree is a self-balancing Binary Search Tree.
- Every node has a color: red or black.
- Its balancing rules prevent the tree from becoming highly skewed.
- It uses rotations and recoloring to maintain its properties.
- Search, insertion, and deletion are O(log n).
- The tree does not need to be perfectly balanced.
- Red-Black Trees provide a guarantee on tree height.
- Java's `TreeMap` uses a Red-Black Tree internally.
- `TreeSet` is implemented using `TreeMap` and therefore benefits from the same underlying tree structure.
- Red-Black Trees are useful when data must remain sorted while being dynamically inserted and deleted.
- You generally use `TreeMap` or `TreeSet` in application code rather than implementing a Red-Black Tree yourself.
- A Red-Black Tree and a HashMap solve different problems: ordered access versus fast average key lookup.

## Key Takeaway

Think of a Red-Black Tree as:

    Binary Search Tree
          +
    Self-balancing
          +
    Red/Black coloring
          ↓
    Height stays O(log n)
          ↓
    Search / Insert / Delete → O(log n)

In Java:

    TreeMap
       ↓
    Red-Black Tree
       ↓
    Sorted keys + O(log n) operations

    TreeSet
       ↓
    TreeMap
       ↓
    Red-Black Tree
       ↓
    Sorted unique elements

The practical reason to use this structure is **not simply that it is a tree**. Its value comes from maintaining **sorted data with predictable logarithmic performance while allowing frequent insertions and deletions**.

**Q1.** Why does a Red-Black Tree guarantee O(log n) height even though it is not perfectly balanced?

**Q2.** What exactly happens during a `TreeMap.put()` when inserting a key causes a Red-Black Tree violation?

**Q3.** Why might you choose a Red-Black Tree over an AVL Tree for a workload with frequent insertions and deletions?
