---
title: What is ConcurrentHashMap in Java?
tags: [java, collections, hashmap, concurrency, multithreading]
difficulty: medium
date: 2026-09-22
---

## What is ConcurrentHashMap?

`ConcurrentHashMap` is a thread-safe implementation of the `Map` interface designed for **concurrent access by multiple threads**.

It provides better concurrency than using `Hashtable` or `Collections.synchronizedMap()` because it does **not lock the entire map for every operation**.

It is commonly used when multiple threads need to read and update a shared map simultaneously.

---

## Why do we need ConcurrentHashMap?

A normal `HashMap` is **not thread-safe**.

If multiple threads modify a `HashMap` at the same time, it can lead to inconsistent or unexpected results.

We could use `Collections.synchronizedMap()` to make access synchronized, but its operations use a common lock, which can reduce concurrency when many threads access the map.

`ConcurrentHashMap` is designed specifically for this situation.

---

## How does ConcurrentHashMap provide concurrency?

The important idea is that **different threads can work with different parts of the map concurrently**.

Older Java implementations used **segments** internally. For example, a concurrency level of 16 could result in up to 16 independently locked segments.

However, this is an important interview update:

> Modern Java versions (Java 8+) do **not** implement `ConcurrentHashMap` using segments.

Instead, it uses a combination of:

- CAS (Compare-And-Swap)
- Fine-grained synchronization
- Bucket-level synchronization when required

So avoid saying:

> "ConcurrentHashMap has 16 segments, so 16 threads can work simultaneously."

That describes older implementations and is not accurate for modern Java.

---

## How do read operations work?

`get()` operations generally do **not require locking**.

This allows multiple threads to read from the map concurrently.

For example:

    Thread 1 → get("A")
    Thread 2 → get("B")
    Thread 3 → get("C")

These reads can happen concurrently.

The returned value reflects the map's concurrency guarantees and visibility rules; you should not interpret it as a snapshot of the entire map.

---

## How do write operations work?

Operations such as `put()` and updates use fine-grained synchronization/CAS rather than locking the entire map.

Conceptually:

    Thread 1 → update bucket A
    Thread 2 → update bucket B

If the operations involve different buckets, they can proceed concurrently.

This provides much better concurrency than synchronizing the entire map.

---

## Does ConcurrentHashMap allow null?

No.

`ConcurrentHashMap` does **not allow**:

- `null` keys
- `null` values

For example:

    map.put(null, "value");   // Not allowed
    map.put("key", null);     // Not allowed

This is intentional because `null` cannot safely represent the distinction between:

- a key that is absent
- a key whose value is `null`

That distinction is important for concurrent operations.

---

## What happens during iteration?

Iterators of `ConcurrentHashMap` are **weakly consistent**.

They:

- do not throw `ConcurrentModificationException` merely because another thread modifies the map
- can continue while other threads modify the map
- may reflect some modifications made during iteration
- do not represent a guaranteed snapshot of the map

So, technically, calling these iterators **"fail-safe"** is common in interview discussions, but **"weakly consistent"** is the more accurate Java terminology.

---

## ConcurrentHashMap vs synchronizedMap

| Feature | `ConcurrentHashMap` | `Collections.synchronizedMap()` |
|---|---|---|
| Thread-safe | Yes | Yes |
| Entire map locked for each operation | No | Generally uses a common lock |
| Concurrent reads | Yes | Synchronization can limit concurrency |
| Fine-grained concurrency | Yes | No |
| Allows null key | No | Depends on underlying map |
| Allows null values | No | Depends on underlying map |
| Iterator | Weakly consistent | Requires external synchronization for safe iteration |
| Modern implementation | CAS + fine-grained synchronization | Synchronized wrapper |

---

## ConcurrentHashMap vs Hashtable

| Feature | `ConcurrentHashMap` | `Hashtable` |
|---|---|---|
| Thread-safe | Yes | Yes |
| Synchronization | Fine-grained | Method-level synchronization |
| Concurrent access | Better supported | More restrictive |
| Null key | Not allowed | Not allowed |
| Null values | Not allowed | Not allowed |
| Iterator behavior | Weakly consistent | Legacy enumeration/iterator behavior |
| Recommended for new concurrent code | Generally | Legacy collection |

---

## Important Interview Points

Remember these points:

1. `ConcurrentHashMap` is a **thread-safe Map** designed for concurrent access.
2. It provides better concurrency than `Hashtable` and `synchronizedMap`.
3. Modern Java does **not** use the old 16-segment implementation.
4. Modern implementations use **CAS and fine-grained synchronization**.
5. Reads such as `get()` generally do not require locking.
6. Updates use localized synchronization/CAS instead of locking the entire map.
7. It does **not allow null keys or null values**.
8. Its iterators are **weakly consistent** and do not throw `ConcurrentModificationException` simply because another thread modifies the map.
9. The old `concurrencyLevel` concept should not be described as "the maximum number of threads that can access the map simultaneously." It is not a hard thread limit.

---

## One-Line Interview Answer

> `ConcurrentHashMap` is a thread-safe Map implementation designed for high concurrency, allowing multiple threads to read and update the map concurrently using fine-grained synchronization and CAS instead of locking the entire map.

---

**Q1.** Why does `ConcurrentHashMap` not allow `null` keys or values?

**Q2.** How does `ConcurrentHashMap` achieve thread safety using CAS and bucket-level locking?

**Q3.** What is the difference between `ConcurrentHashMap` and `HashMap` when multiple threads perform `put()` and `get()` simultaneously?

--- 