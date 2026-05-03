---
title: ArrayList in Java
tags: [java, arraylist, list, collections, data-structures]
difficulty: easy
date: 2026-05-03
---

## Overview

ArrayList is a resizable array implementation of the List interface in Java. It maintains insertion order, allows duplicates, and provides fast random access to elements.

---

## Detailed Explanation

### 1. What is ArrayList

- Part of java.util package
- Implements List interface
- Backed by a dynamic array

Unlike normal arrays:
- Size is flexible
- Grows automatically when capacity is exceeded
- **Has a default initial size of 10**

---

### 2. Internal Working

- Internally uses an array (Object[])
- When capacity is full:
  → Creates a new larger array
  → Copies old elements to new array

Growth strategy (simplified):
- New capacity ≈ 1.5 × old capacity

---

### 3. Key Characteristics

- Ordered collection
- Allows duplicates
- Allows null values
- Index-based access (O(1))

---

### 4. Time Complexity

| Operation        | Complexity |
|-----------------|-----------|
| get(index)      | O(1)      |
| add(element)    | O(1)*     |
| add(index)      | O(n)      |
| remove(index)   | O(n)      |
| search          | O(n)      |

*Amortized O(1) due to resizing

---

### 5. When Resizing Happens

Steps:
1. Array becomes full
2. New array created
3. Elements copied
4. Reference updated

This makes occasional add() expensive, but overall efficient.

---

## Examples

### Example 1: Basic Usage
```
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("A"); // duplicates allowed
```
---

### Example 2: Access Elements
```
String value = list.get(0);
```
---

### Example 3: Insert at Index
```
list.add(1, "X"); // shifts elements
```
---

### Example 4: Remove Element
```
list.remove(0); // shifts remaining elements
```
---

## Key Points

- Backed by dynamic array
- Fast reads, slower inserts/deletes in middle
- Maintains insertion order
- Not synchronized (not thread-safe)
- Best for frequent reads

---

## Comparison (if applicable)

| Aspect           | ArrayList              | LinkedList            |
|------------------|------------------------|-----------------------|
| Structure        | Dynamic array          | Doubly linked list    |
| Access           | Fast O(1)              | Slow O(n)             |
| Insert/Delete    | Slow (shifting)        | Fast (node update)    |
| Memory           | Less                   | More (node overhead)  |
| Use Case         | Read-heavy operations  | Frequent insert/delete|

---

## Real-World Use Cases

- Storing ordered data (UI lists, logs)
- Caching small datasets
- Reading-heavy applications
- Batch processing results
- API response collections

---

## Common Mistakes

- Using ArrayList for frequent insert/delete in middle
- Assuming it is thread-safe
- Ignoring resizing cost in tight loops
- Not setting initial capacity when size is known

---

## Quick Interview Summary

ArrayList is a dynamic array implementation of List that provides fast random access and maintains order, but has slower insertions and deletions due to element shifting.

---

**Q1:** Why is ArrayList preferred over arrays in most real applications?  
**Q2:** How does ArrayList resizing impact performance in high-scale systems?  
**Q3:** When would LinkedList significantly outperform ArrayList?