---
title: Difference Between Iterator and ListIterator in Java
tags: [java, collections, iterator, listiterator]
difficulty: easy
date: 2026-09-29
---

## What is an Iterator?

`Iterator` is an interface in Java used to traverse elements of a collection **in one direction**.

It can be used with many collection types such as:

- `ArrayList`
- `LinkedList`
- `HashSet`
- `TreeSet`
- `HashMap` through its collection views

Common methods:

    hasNext()
    next()
    remove()

Example:

    Iterator<Integer> iterator = list.iterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();
    }

---

## What is a ListIterator?

`ListIterator` is a specialized iterator that can be used only with **List** implementations.

It extends `Iterator` and provides additional capabilities:

- Traverse forward
- Traverse backward
- Add elements
- Modify elements
- Get the next/previous index

Common methods:

    hasNext()
    next()
    hasPrevious()
    previous()
    add()
    set()
    remove()
    nextIndex()
    previousIndex()

Example:

    ListIterator<Integer> iterator = list.listIterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();
    }

---

## Iterator vs ListIterator

| Feature | Iterator | ListIterator |
|---|---|---|
| Works with | Most collections | Only `List` |
| Forward traversal | Yes | Yes |
| Backward traversal | No | Yes |
| `remove()` | Yes | Yes |
| `add()` | No | Yes |
| `set()` | No | Yes |
| `nextIndex()` | No | Yes |
| `previousIndex()` | No | Yes |
| Introduced | Java 1.2 | Java 1.2 |

---

## Forward vs Backward Traversal

With `Iterator`, you can only move forward:

    10 → 20 → 30 → 40

Once you move forward, you cannot use the iterator to move back.

With `ListIterator`, you can move in both directions:

    10 → 20 → 30 → 40
             ←
            20

For example:

    ListIterator<Integer> iterator = list.listIterator();

    iterator.next();        // 10
    iterator.next();        // 20
    iterator.previous();    // 20

---

## `set()` and `add()`

One major advantage of `ListIterator` is that it can modify the list while iterating.

### `set()`

`set()` replaces the last element returned by `next()` or `previous()`.

Conceptually:

    [10, 20, 30]

    next() → 10
    set(100)

Result:

    [100, 20, 30]

### `add()`

`add()` inserts an element at the iterator's current position.

Conceptually:

    [10, 20, 30]

    next() → 10
    add(15)

Result:

    [10, 15, 20, 30]

---

## Why Does ListIterator Only Work With Lists?

`ListIterator` provides index-based concepts such as:

    nextIndex()
    previousIndex()

and supports positional modifications.

These operations make sense for an ordered `List`, but not for collections such as `Set`, where there is no list-style position.

Therefore:

    Iterator
        ↓
    General-purpose collection traversal

    ListIterator
        ↓
    Specialized traversal for List

---

## Interview Example

Suppose you have:

    List<String> names = new ArrayList<>();

If you only need to traverse forward:

    Iterator<String> iterator = names.iterator();

If you need to traverse in both directions or modify the list during traversal:

    ListIterator<String> iterator = names.listIterator();

---

## Important Interview Points

### 1. ListIterator extends Iterator

The relationship is:

    Iterator
       ↑
    ListIterator

So `ListIterator` supports all the basic iterator operations and adds additional functionality.

### 2. ListIterator is not available for Set

This is invalid:

    Set<Integer> set = new HashSet<>();

    set.listIterator(); // Not available

A `Set` only provides an `Iterator`.

### 3. Both can safely remove through the iterator

If you need to remove the current element during iteration, use the iterator's `remove()` method rather than directly modifying the collection.

Direct modification can cause `ConcurrentModificationException` for fail-fast iterators.

### 4. `ListIterator` is not automatically thread-safe

Neither `Iterator` nor `ListIterator` makes the underlying collection thread-safe.

---

## Interview Answer

> `Iterator` is a general-purpose interface used to traverse collections in the forward direction. It supports `hasNext()`, `next()`, and `remove()`. `ListIterator` extends `Iterator` and is specifically designed for `List` implementations. It supports both forward and backward traversal and additionally provides `add()`, `set()`, `nextIndex()`, and `previousIndex()`.

## Easy Way to Remember

> **Iterator = forward traversal**

> **ListIterator = forward + backward traversal + list modification**

**Q1.** How does `ListIterator` internally maintain its current position?

**Q2.** Why does directly modifying an `ArrayList` during iteration cause `ConcurrentModificationException`?

**Q3.** What is the difference between `Iterator`, `Iterable`, and `ListIterator`?