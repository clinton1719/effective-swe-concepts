---
title: HashSet in Java and How It Works Internally
tags: [java, hashset, collections, hashmap, hashing]
difficulty: medium
date: 2026-09-23
---

## What is HashSet?

`HashSet` is a collection in Java that stores **unique elements**.

It implements the `Set` interface and internally uses a `HashMap` to store its elements.

Key characteristics:

| Property | HashSet |
|---|---|
| Duplicates | Not allowed |
| Ordering | No guaranteed order |
| `null` | One `null` element allowed |
| Thread-safe | No |
| Average `add()` | O(1) |
| Average `remove()` | O(1) |
| Average `contains()` | O(1) |
| Internal structure | Backed by `HashMap` |

Example:

    Set<String> set = new HashSet<>();

    set.add("Java");
    set.add("Spring");
    set.add("Java");

The second `"Java"` is not added because a `Set` cannot contain duplicates.

---

## How Does HashSet Work Internally?

The most important interview point is:

> `HashSet` is internally backed by a `HashMap`.

Conceptually, when we create:

    HashSet<String> set = new HashSet<>();

Java internally maintains something equivalent to:

    HashMap<String, Object> map;

When we add an element:

    set.add("Java");

`HashSet` stores `"Java"` as the **key** of the internal `HashMap`.

The value is a shared dummy object.

Conceptually:

    HashSet
       |
       v
    HashMap
       |
       +---- "Java" -> PRESENT
       +---- "Spring" -> PRESENT

The actual value is not important. The key is the element that the `HashSet` cares about.

---

## How Does `add()` Work?

Consider:

    set.add("Java");

The process is roughly:

    "Java"
       ↓
    hashCode()
       ↓
    HashMap calculates hash
       ↓
    Finds appropriate bucket
       ↓
    Checks existing keys
       ↓
    equals() comparison if necessary
       ↓
    If key doesn't exist → insert
    If key already exists → don't insert

Therefore, uniqueness depends on both:

- `hashCode()`
- `equals()`

---

## Why Are `hashCode()` and `equals()` Important?

Suppose we have:

    set.add("Java");
    set.add("Java");

Both strings have the same logical value.

The `HashSet` eventually determines that the existing element is equal to the new element, so the second insertion is rejected.

The general rule is:

> If two objects are equal according to `equals()`, they must return the same `hashCode()`.

This is known as the `equals()` / `hashCode()` contract.

---

## How Does HashSet Prevent Duplicates?

When adding an element, `HashSet` relies on the underlying `HashMap`.

Suppose the set already contains:

    "Java"

Now we execute:

    set.add("Java");

The internal `HashMap`:

1. Calculates the hash of the new key.
2. Finds the corresponding bucket.
3. Looks for an existing key in that bucket.
4. Compares keys using `equals()`.
5. Finds that the existing key equals the new key.
6. Does not insert another entry.

Therefore:

    set.size()

remains `1`.

---

## What Happens When Two Different Objects Have the Same Hash?

This is called a **hash collision**.

For example:

    Object A → hash = 100
    Object B → hash = 100

They may be placed in the same bucket.

A collision does **not** mean the objects are duplicates.

HashMap must then compare the keys using `equals()`.

For example:

    hashCode() same
    +
    equals() true
    = duplicate

Whereas:

    hashCode() same
    +
    equals() false
    = different elements, both can exist

This distinction is very important in interviews.

---

## Internal Structure

Modern Java `HashSet` uses a `HashMap`, and modern `HashMap` uses an array of buckets.

Conceptually:

    HashSet
       |
       v
    HashMap
       |
       v
    Bucket array
       |
       +---- Bucket 0
       +---- Bucket 1
       +---- Bucket 2
       +---- ...
       +---- Bucket n

Each bucket can contain one or more entries.

When collisions occur, entries can be linked together, and in sufficiently collision-heavy buckets, modern Java `HashMap` can convert the bucket structure into a balanced tree.

So the simplified structure is:

    Bucket
       |
       +---- Node
       |
       +---- Node
       |
       +---- Tree structure (when treeified)

---

## What Happens When the HashSet Becomes Large?

The underlying `HashMap` has a capacity and load factor.

The default load factor of `HashMap` is `0.75`.

When the number of entries crosses the resize threshold:

    threshold = capacity × load factor

the `HashMap` resizes.

For example, conceptually:

    capacity = 16
    load factor = 0.75

Therefore:

    threshold = 16 × 0.75
              = 12

When the map needs to grow beyond the threshold, it resizes, and the entries are redistributed across the larger bucket array.

### Important Interview Point

Do not say:

> "HashSet increases its size when 75% is reached."

The load factor is a threshold used by the **underlying HashMap to decide when to resize its table**. It does not mean the `HashSet` itself is 75% full in a simple physical-storage sense.

---

## Why Is HashSet `add()` Usually O(1)?

Normally:

    add()
      ↓
    hashCode()
      ↓
    bucket lookup
      ↓
    small number of comparisons
      ↓
    insert

Therefore, average complexity is:

    O(1)

However, collisions can increase the cost.

Modern `HashMap` can treeify heavily populated buckets, which gives better worst-case behavior for those buckets.

So for interview purposes:

| Operation | Average | Worst case |
|---|---:|---:|
| `add()` | O(1) | O(log n) in treeified bucket |
| `contains()` | O(1) | O(log n) in treeified bucket |
| `remove()` | O(1) | O(log n) in treeified bucket |

These assume the usual modern `HashMap` implementation and do not account for pathological behavior such as poorly implemented hashing or unusual implementation conditions.

---

## What Happens With a Custom Object?

Consider:

    class Employee {
        int id;
        String name;
    }

If we put `Employee` objects into a `HashSet`, the correctness of duplicate detection depends on properly implementing `equals()` and `hashCode()` when logical equality is based on their fields.

For example, suppose:

    Employee(101, "John")
    Employee(101, "John")

represent the same employee.

If `equals()` and `hashCode()` are implemented consistently, the `HashSet` can recognize them as duplicates.

If they are not overridden appropriately, two logically identical employees may be treated as different objects.

---

## Important Interview Trap: Mutable Objects

Be careful when modifying an object after putting it into a `HashSet`.

Suppose the fields used by `hashCode()` and `equals()` are changed after insertion.

The object may now produce a different hash code and effectively become difficult to locate in the set.

Example:

    Set<Employee> employees = new HashSet<>();

    Employee employee = new Employee(101);
    employees.add(employee);

    employee.setId(999);

If `id` participates in `hashCode()` and `equals()`, changing it after insertion can cause problems with:

    contains()
    remove()

This is why objects used as `HashSet` elements should generally have stable equality-related fields while they are stored in the set.

---

## HashSet vs LinkedHashSet vs TreeSet

| Feature | HashSet | LinkedHashSet | TreeSet |
|---|---|---|---|
| Ordering | No guaranteed order | Insertion order | Sorted order |
| Internal structure | HashMap | LinkedHashMap | TreeMap / Red-Black tree |
| Average search | O(1) | O(1) | O(log n) |
| Allows `null` | Yes, one | Yes, one | Generally no with natural ordering |
| Duplicates | No | No | No |

Use:

- `HashSet` when you primarily need uniqueness.
- `LinkedHashSet` when you need uniqueness + insertion order.
- `TreeSet` when you need uniqueness + sorted order.

---

## Important Interview Points

- `HashSet` implements the `Set` interface.
- `HashSet` does not allow duplicate elements.
- `HashSet` permits one `null` element.
- `HashSet` does not guarantee iteration order.
- Internally, `HashSet` is backed by a `HashMap`.
- The set element becomes the key of the internal map.
- A shared dummy value is used internally.
- `hashCode()` determines the hash/bucket location.
- `equals()` is used to determine whether an existing key is logically equal.
- Equal objects must have the same hash code.
- Different objects can have the same hash code.
- Hash collisions are handled by the underlying `HashMap`.
- Modern Java `HashMap` can treeify heavily populated buckets.
- `HashSet` is not thread-safe.
- Modifying equality-related fields after insertion can break expected `HashSet` behavior.
- Average `add()`, `remove()`, and `contains()` operations are O(1).

## Key Takeaway

The easiest way to remember `HashSet` internally is:

    HashSet
       ↓
    HashMap
       ↓
    Element becomes HashMap key
       ↓
    hashCode()
       ↓
    Bucket
       ↓
    equals() for duplicate checking

So the core idea is:

> `HashSet` provides uniqueness by using the hashing and key-equality mechanism of its internal `HashMap`.

**Q1.** What exactly happens inside `HashMap` when two keys have the same hash code?

**Q2.** Why must `equals()` and `hashCode()` be overridden together when using custom objects in a `HashSet`?

**Q3.** How does `HashSet` differ internally from `TreeSet` and `LinkedHashSet`?