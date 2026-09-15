---
title: What is LinkedList in Java?
tags: [java, linkedlist, collections, doubly-linked-list, data-structures]
difficulty: easy
date: 2026-09-15
---

## What is LinkedList?

`LinkedList` is a Java Collection Framework class that implements the **linked list data structure**.

Internally, Java's `LinkedList` uses a **doubly linked list** to store its elements.

Unlike an `ArrayList`, elements are **not stored in a contiguous block of memory**. Each element is stored inside a separate `Node`, and nodes are connected using references to the previous and next nodes.

---

## How is a LinkedList Stored?

Each element is represented by a `Node` containing three things:

```text
+----------+----------+----------+
|   prev   |   data   |   next   |
+----------+----------+----------+
```

- **prev** → reference to the previous node
- **data/item** → actual element
- **next** → reference to the next node

For example:

```text
null
  ↓
[A] ⇄ [B] ⇄ [C] ⇄ [D]
                     ↓
                    null
```

This is why it is called a **doubly linked list**: each node can move both forward and backward.

---

## Internal Structure of LinkedList

Simplified from the JDK implementation:

```text
size
first ───────────────┐
                     ↓
                  [Node A]
                  prev = null
                  item = A
                  next ──────┐
                             ↓
                          [Node B]
                          prev ──→ A
                          item = B
                          next ──────┐
                                    ↓
                                 [Node C]
                                 prev ──→ B
                                 item = C
                                 next = null

last ───────────────────────────────→ Node C
```

Internally, `LinkedList` maintains references to both the **first** and **last** nodes.

Conceptually:

```text
first → first node
last  → last node
size  → number of elements
```

---

## What Does a Node Look Like?

The internal `Node` class is essentially:

```text
Node<E>
 ├── E item
 ├── Node<E> next
 └── Node<E> prev
```

So for:

```text
LinkedList = [10, 20, 30]
```

the structure looks like:

```text
null ← [10] ⇄ [20] ⇄ [30] → null
        ↑                 ↑
      first              last
```

---

## How Does `add()` Work Internally?

When you do:

```text
list.add(40)
```

`LinkedList` adds the new element at the end.

Before:

```text
null ← [10] ⇄ [20] ⇄ [30] → null
                          ↑
                         last
```

A new node is created:

```text
[40]
```

Then the references are updated:

```text
null ← [10] ⇄ [20] ⇄ [30] ⇄ [40] → null
                                   ↑
                                  last
```

The important point is that **existing elements don't need to be shifted**.

Only the references between the nodes need to be modified.

---

## Why is `add()` O(1)?

For adding at the end, `LinkedList` already maintains a `last` reference.

Therefore, it can directly attach the new node:

```text
last → new node
```

No traversal through the entire list is required.

So:

```text
add(element) → O(1)
```

### Important Interview Point

If you're adding at a **specific index**, there are actually two operations:

1. Find the node at that index → potentially **O(n)**
2. Change the node references → **O(1)**

Therefore:

```text
add(element at end) → O(1)
add(index, element) → O(n)
```

The insertion itself is O(1), but **finding the insertion position can take O(n)**.

---

## Why is `get(index)` O(n)?

Consider:

```text
[10] ⇄ [20] ⇄ [30] ⇄ [40] ⇄ [50]
```

Suppose you want:

```text
get(4)
```

A linked list cannot directly jump to index 4 like an array can.

It must follow the node references:

```text
10 → 20 → 30 → 40 → 50
```

Therefore, accessing an arbitrary element takes **O(n)** in the general case.

### Optimization in Java

Java's `LinkedList` can traverse from either direction:

```text
If index is near the beginning:
first → → → target

If index is near the end:
last  ← ← ← target
```

So it chooses the closer end, but the worst-case complexity is still **O(n)**.

---

## Why is `remove()` O(1)?

Once the target node has already been located, removing it only requires changing references.

Before:

```text
[A] ⇄ [B] ⇄ [C]
```

Remove `B`:

```text
[A] ⇄ [C]
```

The references are changed so that:

```text
A.next → C
C.prev → A
```

No other elements need to be shifted.

Therefore:

```text
remove(node) → O(1)
```

But:

```text
remove(index)
```

may first need to find the node, making the overall operation **O(n)**.

---

## LinkedList vs ArrayList

| Operation | ArrayList | LinkedList |
|---|---:|---:|
| `get(index)` | O(1) | O(n) |
| Add at end | O(1) amortized | O(1) |
| Add at beginning | O(n) | O(1) |
| Remove from beginning | O(n) | O(1) |
| Remove from end | O(1) | O(1) |
| Insert/remove at known node | O(n) | O(1) |
| Memory usage | Lower | Higher |

The key difference is:

```text
ArrayList
→ Fast random access
→ Elements stored in an array
→ Insertion/removal may require shifting elements

LinkedList
→ Slow random access
→ Elements stored in linked nodes
→ Insertion/removal is cheap once the node is known
```

---

## Important Characteristics of LinkedList

### 1. Maintains insertion order

Elements remain in the order in which they were inserted.

```text
add(A)
add(B)
add(C)

→ [A, B, C]
```

### 2. Allows duplicates

```text
[A, B, A, C]
```

Duplicate elements are allowed.

### 3. Allows null

`LinkedList` can contain `null` elements.

```text
[A, null, B, null]
```

### 4. Not synchronized

`LinkedList` is **not thread-safe by default**.

If multiple threads modify it concurrently, external synchronization or another concurrent collection may be required depending on the use case.

### 5. Can be used as List, Queue, or Deque

`LinkedList` implements:

```text
List
Deque
```

Therefore, it can be used for different purposes:

```text
List      → general list
Queue     → FIFO operations
Deque     → add/remove from both ends
```

---

## Class Hierarchy

Conceptually:

```text
AbstractSequentialList
          ↑
      LinkedList
       ↙      ↘
     List     Deque
```

The JDK declaration is essentially:

```text
LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, Serializable
```

This is why a `LinkedList` can be referenced as either a `List` or a `Deque`.

---

## The Most Important Interview Concept

Don't simply say:

> "LinkedList insertion and deletion are O(1)."

The more accurate statement is:

> **Insertion or deletion is O(1) when the target node is already known. Finding that node by index can take O(n).**

For example:

```text
add at beginning
→ already know first
→ O(1)

add at end
→ already know last
→ O(1)

add at index 500
→ first find node 500
→ O(n)
→ then modify links
→ O(1)
```

So the overall operation is:

```text
Find node + Modify links
       O(n)  +    O(1)
       = O(n)
```

---

The primary difference between ArrayList and LinkedList in Java lies in their underlying data structures and how they manage memory. While ArrayList is backed by a dynamically resizing array, LinkedList is implemented as a doubly-linked list. 

Direct Comparison Overview 

| Feature |  |   |
| --- | --- | --- |
| Underlying Structure | Dynamic Array | Doubly Linked List  |
| Memory Allocation | Contiguous blocks | Non-contiguous (fragmented nodes)  |
| Random Access () | ⚡ Fast: O(1) | 🐢 Slow: O(n)  |
| Insertion / Deletion (Ends) | Fast at end, slow at start (O(n)) | ⚡ Fast at both ends (O(1))  |
| Insertion / Deletion (Middle) | 🐢 Slow: O(n) due to shifting | 🐢 Slow: O(n) to find, O(1) to mutate  |
| Memory Overhead | Low (stores only data) | High (stores data + 2 node pointers)  |
| Interfaces Implemented | List, RandomAccess | List, Queue, Deque  |
| Default Initial Capacity | 10 | 0 (Empty)  |

Core Structural Differences 

### 1. ArrayList 
• How it works: Elements are stored in contiguous memory locations just like a standard array. When the capacity is reached, Java automatically creates a new, larger array and copies the old elements over. 

• Pros: Since memory is contiguous, calculating the exact location of any index is a simple mathematical equation. This yields immediate, constant-time random access (O(1)). 

• Cons: Adding or removing elements from the beginning or middle of the list forces Java to shift every subsequent element over in memory, which is a slow (O(n)) operation. 



### 2. LinkedList 

• How it works: Every element is wrapped in an isolated object called a Node. Each node contains the data itself alongside two pointer references: one pointing to the previous node and one pointing to the next node. 

• Pros: To insert or delete a node, Java only needs to change the pointers of the immediate neighboring nodes. No massive array shifting is required. 

• Cons: There is no index tracking system. To reach index 500, Java must literally start at the first item (or last) and traverse through the references 500 times, resulting in poor search efficiency (O(n)). Furthermore, storing those extra pointers consumes significantly more memory. 


Summary: When to Use Which? 


• Use ArrayList by default for almost all standard collections. It performs better during iteration, utilizes CPU caching efficiently due to contiguous memory, and excels when your application performs mostly read operations () with occasional additions to the end of the list.

• Use LinkedList only if your application features constant data manipulation through heavy insertions and deletions specifically at the beginning or the absolute end of the list (e.g., using it as a FIFO Queue or LIFO Stack).



