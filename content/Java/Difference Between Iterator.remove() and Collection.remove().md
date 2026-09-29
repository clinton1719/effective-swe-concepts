---
title: Difference Between Iterator.remove() and Collection.remove()
tags: [java, collections, iterator, arraylist]
difficulty: easy
date: 2026-09-29
---

## What Is the Difference?

Both `Iterator.remove()` and `Collection.remove()` can remove an element, but the important difference is **how they interact with an active iteration**.

- `Iterator.remove()` removes the element that was **most recently returned by that iterator**.
- `Collection.remove()` directly modifies the collection, independently of the iterator.

Iterator.remove() does not throw ConcurrentModificationException while iterating over a collection but Collections.remove() (list.remove(item); etc) method will throw ConcurrentModificationException.

When modifying a collection while iterating, `Iterator.remove()` is the safe approach for collections with fail-fast iterators.

---

## Iterator.remove()

`Iterator.remove()` removes the last element returned by `next()`.

Conceptually:

    List<Integer> numbers = new ArrayList<>();
    numbers.add(10);
    numbers.add(20);
    numbers.add(30);

    Iterator<Integer> iterator = numbers.iterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();

        if (value == 20) {
            iterator.remove();
        }
    }

Result:

    [10, 30]

The iterator knows that the removal happened through itself and can update its internal state accordingly.

---

## Collection.remove()

`Collection.remove()` removes a matching element directly from the collection.

For example:

    List<Integer> numbers = new ArrayList<>();
    numbers.add(10);
    numbers.add(20);
    numbers.add(30);

    numbers.remove(Integer.valueOf(20));

Result:

    [10, 30]

The collection is modified directly, but an existing iterator may still have its previous state.

---

## What Happens During Iteration?

Consider:

    List<Integer> numbers = new ArrayList<>();
    numbers.add(10);
    numbers.add(20);
    numbers.add(30);

    Iterator<Integer> iterator = numbers.iterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();

        if (value == 20) {
            numbers.remove(value);
        }
    }

For a typical fail-fast collection such as `ArrayList`, this can result in:

    ConcurrentModificationException

Why?

The iterator keeps track of the collection's modification state.

Conceptually:

    Iterator:
        expectedModCount = current modCount

When `numbers.remove()` is called:

    collection.modCount changes

But the iterator's:

    expectedModCount

has not been updated.

So the iterator detects that the collection was structurally modified outside the iterator.

---

## Why Iterator.remove() Works

When you call:

    iterator.remove();

the iterator itself performs the removal and updates its expected modification state.

Conceptually:

    iterator.remove()
          ↓
    collection is modified
          ↓
    iterator updates its internal state
          ↓
    iteration can safely continue

This is why `Iterator.remove()` is specifically provided.

---

## Key Difference

| Feature                                                             | `Iterator.remove()`               | `Collection.remove()`    |
| ------------------------------------------------------------------- | --------------------------------- | ------------------------ |
| Removes                                                             | Last element returned by `next()` | Matching element         |
| Called on                                                           | Iterator                          | Collection               |
| Designed for removal during iteration                               | Yes                               | No                       |
| Maintains iterator state                                            | Yes                               | Iterator is not informed |
| Can cause `ConcurrentModificationException` during active iteration | Normally no                       | May cause it             |
| Can remove arbitrary matching element                               | No                                | Yes                      |
| Must call `next()` first?                                           | Yes                               | No                       |

---

## Important Rule

`Iterator.remove()` must follow a successful call to `next()`.

This is invalid:

    Iterator<Integer> iterator = numbers.iterator();

    iterator.remove();

It can throw:

    IllegalStateException

The correct sequence is:

    iterator.next();
    iterator.remove();

Also, you cannot normally call `remove()` twice for the same `next()` result:

    iterator.next();
    iterator.remove();
    iterator.remove(); // IllegalStateException

You need another `next()` before removing again.

---

## Example: Removing Multiple Elements

Suppose:

    [10, 20, 30, 40, 50]

You want to remove all even numbers.

Using `Iterator.remove()`:

    Iterator<Integer> iterator = numbers.iterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();

        if (value % 2 == 0) {
            iterator.remove();
        }
    }

Result:

    [10, 20, 30, 40, 50]
         ↓
    [10, 30, 50]

The important point is that the iterator remains synchronized with the collection's modification state.

---

## What About `removeIf()`?

For modern Java, if the goal is simply to remove elements matching a condition, `removeIf()` is often cleaner:

    numbers.removeIf(value -> value % 2 == 0);

This is preferable when you don't specifically need to control the iteration yourself.

---

## Interview Answer

> `Iterator.remove()` removes the last element returned by that iterator and keeps the iterator's state consistent, so it is the appropriate way to remove elements while iterating. `Collection.remove()` directly modifies the collection without updating an existing iterator's state, so using it during iteration can result in `ConcurrentModificationException` for fail-fast collections such as `ArrayList`.

## Interview Trap

Don't say:

> "`Collection.remove()` always causes `ConcurrentModificationException`."

That's not correct.

`ConcurrentModificationException` is associated with the behavior of the **iterator** and is generally a best-effort fail-fast mechanism. The problem occurs when a collection is structurally modified outside the iterator while that iterator is active.

Also, not every collection has the same iterator behavior. Concurrent collections such as `ConcurrentHashMap` have different iteration semantics.

## Easy Way to Remember

> **Iterator.remove() = "I am the iterator, so I will remove it."**

> **Collection.remove() = "The collection changed behind the iterator's back."**

**Q1.** Why does `ArrayList` use `modCount` and `expectedModCount`?

**Q2.** What exactly happens internally when `Iterator.remove()` is called on an `ArrayList`?

**Q3.** Why does `ConcurrentHashMap` not throw `ConcurrentModificationException` like `ArrayList`?
