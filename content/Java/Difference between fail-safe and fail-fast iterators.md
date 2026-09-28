---
title: Difference Between Fail-Fast and Fail-Safe Iterators
tags: [java, collections, iterator, fail-fast, fail-safe]
difficulty: medium
date: 2026-09-28
---

## What Are Fail-Fast Iterators?

A **fail-fast iterator** detects structural modification of a collection while it is being iterated and attempts to stop immediately by throwing `ConcurrentModificationException`.

Example:

    List<Integer> list = new ArrayList<>();
    list.add(10);
    list.add(20);
    list.add(30);

    Iterator<Integer> iterator = list.iterator();

    while (iterator.hasNext()) {
        Integer value = iterator.next();

        if (value == 20) {
            list.remove(value);
        }
    }

The iterator will typically throw:

    ConcurrentModificationException

### How Does It Work?

Many Java collections maintain a modification counter, commonly called `modCount`.

When an iterator is created, it keeps track of the expected modification count.

Conceptually:

    expectedModCount = modCount

During iteration, the iterator checks whether the collection has been structurally modified:

    modCount != expectedModCount

If they differ, the iterator throws `ConcurrentModificationException`.

---

## What Are Fail-Safe Iterators?

"Fail-safe" is a commonly used interview term, but it is **not an official Java API category**.

It generally refers to iterators that can continue iterating without throwing `ConcurrentModificationException` when the underlying collection is modified.

This can happen because the iterator works on a snapshot or because the collection provides a different concurrency model.

For example, `CopyOnWriteArrayList` creates iterators that operate over the array state captured when the iterator was created.

    List<Integer> list = new CopyOnWriteArrayList<>();
    list.add(10);
    list.add(20);
    list.add(30);

    Iterator<Integer> iterator = list.iterator();

    list.add(40);

    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }

The iterator can continue without throwing `ConcurrentModificationException`.

However, the iterator may not see the newly added `40`, because it is iterating over the earlier snapshot.

---

## Fail-Fast vs "Fail-Safe"

| Feature                            | Fail-Fast                      | "Fail-Safe"                               |
| ---------------------------------- | ------------------------------ | ----------------------------------------- |
| Concurrent structural modification | Detects it                     | May tolerate it                           |
| `ConcurrentModificationException`  | May throw                      | Typically does not                        |
| What iterator sees                 | Current collection state       | May see a snapshot/weakly consistent view |
| Example                            | `ArrayList`, `HashMap`         | `CopyOnWriteArrayList`                    |
| Extra memory                       | Usually no snapshot            | May require snapshot/copy                 |
| Purpose                            | Detect unexpected modification | Support safe/concurrent iteration         |

---

## Important: Fail-Fast Does NOT Mean Thread-Safe

This is a common interview trap.

Fail-fast behavior is primarily a **bug-detection mechanism**, not a thread-safety mechanism.

For example:

    ArrayList

can have a fail-fast iterator, but `ArrayList` itself is **not thread-safe**.

Also, `ConcurrentModificationException` is not guaranteed to happen in every concurrent modification scenario. The Java documentation describes fail-fast behavior as **best-effort**.

So don't say:

> "Fail-fast guarantees that ConcurrentModificationException will always be thrown."

Instead say:

> "Fail-fast iterators attempt to detect structural modifications and throw `ConcurrentModificationException` on a best-effort basis."

---

## Important: ConcurrentHashMap Is Not Simply "Fail-Safe"

Another common interview misconception is:

> "ConcurrentHashMap has fail-safe iterators."

A more accurate description is that `ConcurrentHashMap` iterators are **weakly consistent**.

They:

- Do not throw `ConcurrentModificationException` merely because the map is concurrently modified.
- Can reflect some modifications made after the iterator was created.
- Do not provide a snapshot of the entire map.
- Do not necessarily reflect every modification.

So:

    HashMap
    -> fail-fast iterator (best effort)

    ConcurrentHashMap
    -> weakly consistent iterator

    CopyOnWriteArrayList
    -> snapshot-style iterator

---

## Easy Way to Remember

Think of them like this:

**Fail-fast:**

    "You changed the collection while I was iterating.
     I noticed it, so I'll stop."

**Snapshot-style iteration:**

    "I'll iterate over the snapshot I started with.
     Changes to the original collection won't affect my iteration."

**Weakly consistent iteration:**

    "The collection can change while I'm iterating.
     I'll continue, but what I see may reflect some of those changes."

---

## Interview Answer

> A fail-fast iterator detects structural modification of a collection during iteration and attempts to throw `ConcurrentModificationException`. Collections such as `ArrayList` and `HashMap` commonly provide fail-fast iterators.
>
> "Fail-safe" is not an official Java iterator category. It is commonly used to describe iterators that can continue when the collection is modified, such as the snapshot iterator of `CopyOnWriteArrayList`. For concurrent collections such as `ConcurrentHashMap`, the more accurate term is **weakly consistent iterator**.

## Interview Traps

1. **Fail-fast does not mean thread-safe.**
   `ArrayList` has fail-fast iterators but is not thread-safe.

2. **Fail-fast is best-effort.**
   `ConcurrentModificationException` is not a guaranteed concurrency detector.

3. **"Fail-safe" is not an official Java terminology.**
   Prefer precise terms such as **snapshot** or **weakly consistent** when discussing specific collections.

4. **`ConcurrentHashMap` is weakly consistent, not simply "fail-safe."**

5. **Using `Iterator.remove()` is different from directly modifying the collection.**
   An iterator can generally safely remove the current element through its own `remove()` method.

---

**Q1.** How does `modCount` work internally in `ArrayList` and `HashMap`?

**Q2.** Why does `ConcurrentHashMap` use weakly consistent iterators?

**Q3.** What is the difference between `Iterator`, `ListIterator`, and `Spliterator`?
