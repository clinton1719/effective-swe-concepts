---
title: How to Make a HashMap Synchronized in Java?
tags: [java, hashmap, synchronization, collections, multithreading]
difficulty: easy
date: 2026-09-21
---

## How to Make a HashMap Synchronized?

A `HashMap` is **not synchronized** by default.

To make it synchronized, we can use:

```java
Collections.synchronizedMap(map);
```

Example:

```java
Map<String, Integer> map = new HashMap<>();

Map<String, Integer> synchronizedMap =
        Collections.synchronizedMap(map);
```

Now operations performed through `synchronizedMap` are synchronized.

---

## How Does `Collections.synchronizedMap()` Work?

`Collections.synchronizedMap()` returns a **wrapper** around the original map.

Conceptually:

```text
Original HashMap
      ↑
      |
Synchronized Map Wrapper
      ↑
      |
   Multiple Threads
```

The wrapper synchronizes access to the underlying `HashMap`.

For example:

```java
synchronizedMap.put("A", 10);
synchronizedMap.get("A");
synchronizedMap.remove("A");
```

These operations are synchronized by the wrapper.

The important point is:

> `Collections.synchronizedMap()` does not change the internal implementation of `HashMap`. It wraps the existing map and synchronizes access to it.

---

## What Happens Internally?

Conceptually, the wrapper does something similar to:

```java
synchronized (mutex) {
    // perform operation on the original HashMap
}
```

For example:

```text
Thread 1
   |
   ↓
synchronizedMap.put()
   |
   ↓
 acquire lock
   |
   ↓
 original HashMap
   |
   ↓
 release lock
```

If another thread tries to perform a synchronized operation at the same time, it waits for the lock.

---

## Important: Iteration Requires Manual Synchronization

One important detail is that iteration over a synchronized map needs to be performed inside a synchronized block.

For example:

```java
Map<String, Integer> map =
        Collections.synchronizedMap(new HashMap<>());

synchronized (map) {
    for (String key : map.keySet()) {
        System.out.println(key);
    }
}
```

Why?

Because operations such as `keySet()` and the iterator itself are not automatically protected for the entire iteration.

The synchronization needs to cover the **whole iteration**.

Conceptually:

```text
synchronizedMap
      |
      +-- put()       → synchronized
      +-- get()       → synchronized
      +-- remove()    → synchronized
      |
      +-- iteration   → synchronize externally
```

---

## Another Important Point

If you still keep a reference to the original `HashMap` and modify it directly, those modifications are **not protected by the synchronized wrapper**.

Example:

```java
HashMap<String, Integer> map = new HashMap<>();

Map<String, Integer> syncMap =
        Collections.synchronizedMap(map);
```

If you do:

```java
syncMap.put("A", 10);
```

the operation goes through the synchronized wrapper.

But if you do:

```java
map.put("B", 20);
```

you are accessing the original `HashMap` directly, bypassing the wrapper's synchronization.

Therefore, once the synchronized map is created, access the map through the synchronized reference.

---

## Why Use `Collections.synchronizedMap()`?

Suppose multiple threads access the same `HashMap`:

```text
Thread 1 ──┐
Thread 2 ──┼──→ HashMap
Thread 3 ──┘
```

A normal `HashMap` does not provide synchronized access.

Using:

```java
Collections.synchronizedMap(map);
```

gives:

```text
Thread 1 ──┐
Thread 2 ──┼──→ Synchronized Wrapper ──→ HashMap
Thread 3 ──┘
```

The wrapper coordinates access to the underlying map.

---

## Interview Answer

> `HashMap` is not synchronized by default. We can make it synchronized using `Collections.synchronizedMap(map)`. It returns a synchronized wrapper around the existing `HashMap`, so individual map operations such as `get()`, `put()`, and `remove()` are synchronized. For iteration, we need to manually synchronize on the returned map for the entire iteration. Also, we should access the map through the synchronized wrapper rather than directly through the original `HashMap`.

---

## Key Takeaways

- `HashMap` is **not synchronized** by default.
- Use `Collections.synchronizedMap(map)` to create a synchronized wrapper.
- It **wraps** the existing `HashMap`; it does not change its implementation.
- Individual map operations are synchronized through the wrapper.
- Iteration requires an explicit `synchronized` block.
- Avoid modifying the original `HashMap` directly because that bypasses the wrapper's synchronization.