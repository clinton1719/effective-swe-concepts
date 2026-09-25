---
title: TreeSet in Java
tags: [java, treeset, collections, set, red-black-tree]
difficulty: medium
date: 2026-09-25
---

## What is TreeSet?

`TreeSet` is a Java collection that implements the `NavigableSet` interface and stores **unique elements in sorted order**.

Internally, `TreeSet` is backed by a `TreeMap`, which uses a **Red-Black Tree**.

The basic relationship is:

    TreeSet
       ↓
    TreeMap
       ↓
    Red-Black Tree

For example:

    TreeSet<Integer> set = new TreeSet<>();

    set.add(30);
    set.add(10);
    set.add(20);

The elements are stored in sorted order:

    10
    20
    30

---

## Key Characteristics

| Property                  | TreeSet                                     |
| ------------------------- | ------------------------------------------- |
| Duplicates                | Not allowed                                 |
| Ordering                  | Sorted order                                |
| Internal implementation   | Backed by `TreeMap`                         |
| Underlying data structure | Red-Black Tree                              |
| `add()`                   | O(log n)                                    |
| `remove()`                | O(log n)                                    |
| `contains()`              | O(log n)                                    |
| Thread-safe               | No                                          |
| `null`                    | Generally not allowed with natural ordering |

---

## How Does TreeSet Work Internally?

The most important interview point is:

> `TreeSet` is backed by a `TreeMap`.

Conceptually, when we write:

    TreeSet<Integer> set = new TreeSet<>();

Java internally maintains a structure equivalent to:

    TreeMap<Integer, Object>

The elements of the `TreeSet` become the **keys** of the underlying `TreeMap`.

The values are not important; the `TreeSet` uses a shared dummy value internally.

Conceptually:

    TreeSet
       |
       v
    TreeMap
       |
       +---- 10 → PRESENT
       +---- 20 → PRESENT
       +---- 30 → PRESENT

So the actual data structure is essentially:

    Red-Black Tree of elements

---

## How Does `add()` Work?

Suppose:

    set.add(20);

The operation is roughly:

    20
     ↓
    TreeMap.put(20, PRESENT)
     ↓
    Compare 20 with existing keys
     ↓
    Find correct position
     ↓
    Insert into Red-Black Tree
     ↓
    Rebalance if necessary

Because the underlying tree remains balanced, insertion takes O(log n).

---

## How Does TreeSet Maintain Uniqueness?

Suppose we have:

    set.add(10);
    set.add(20);
    set.add(10);

When the second `10` is added, the underlying `TreeMap` compares it with existing keys.

The comparison determines that the key already exists.

Therefore, no new node is created.

The set remains:

    10
    20

And:

    set.size()

returns:

    2

---

## How Is Uniqueness Determined?

This is an important difference from `HashSet`.

`HashSet` uses:

    hashCode()
    equals()

`TreeSet` uses its **ordering mechanism**:

    compareTo()

or:

    Comparator.compare()

If the comparison returns:

    0

TreeSet treats the elements as duplicates for set purposes.

For example:

    compare(a, b) == 0

means TreeSet considers `a` and `b` equivalent in terms of the set's ordering.

### Important Interview Trap

The ordering used by a `TreeSet` should generally be **consistent with `equals()`**.

Otherwise, you can get surprising behavior where two objects are not equal according to `equals()`, but the `TreeSet` still treats them as duplicates because their comparison returns `0`.

---

## Natural Ordering

If the elements implement `Comparable`, TreeSet can use their natural ordering.

For example:

    TreeSet<Integer> set = new TreeSet<>();

`Integer` implements `Comparable`, so TreeSet knows how to order the values.

Similarly:

    TreeSet<String> set = new TreeSet<>();

Strings are sorted according to their natural ordering.

Example:

    set.add("Java");
    set.add("Spring");
    set.add("AWS");

The result is ordered according to `String`'s natural ordering.

---

## Custom Ordering with Comparator

We can also provide a `Comparator`.

For example:

    TreeSet<Integer> set =
        new TreeSet<>((a, b) -> b.compareTo(a));

Now the elements are stored in descending order:

    30
    20
    10

This is useful when the default natural ordering is not what the application requires.

---

## TreeSet Navigation Methods

One major advantage of TreeSet over HashSet is that TreeSet provides efficient navigation through the sorted elements.

Suppose:

    TreeSet<Integer> set = new TreeSet<>();

    10, 20, 30, 40, 50

We can use:

| Method        | Result for `30` |
| ------------- | --------------: |
| `lower(30)`   |              20 |
| `floor(30)`   |              30 |
| `higher(30)`  |              40 |
| `ceiling(30)` |              30 |

### `lower()`

Returns the greatest element strictly less than the given element.

    lower(30) → 20

### `floor()`

Returns the greatest element less than or equal to the given element.

    floor(30) → 30

### `higher()`

Returns the smallest element strictly greater than the given element.

    higher(30) → 40

### `ceiling()`

Returns the smallest element greater than or equal to the given element.

    ceiling(30) → 30

These operations are very useful for ordered/range-based problems.

---

## Other Useful Methods

| Method            | Purpose                              |
| ----------------- | ------------------------------------ |
| `first()`         | Returns smallest element             |
| `last()`          | Returns largest element              |
| `lower(e)`        | Greatest element `< e`               |
| `floor(e)`        | Greatest element `<= e`              |
| `higher(e)`       | Smallest element `> e`               |
| `ceiling(e)`      | Smallest element `>= e`              |
| `pollFirst()`     | Removes and returns smallest element |
| `pollLast()`      | Removes and returns largest element  |
| `descendingSet()` | Returns reverse-order view           |
| `subSet()`        | Returns a range view                 |
| `headSet()`       | Returns elements before a value      |
| `tailSet()`       | Returns elements from a value onward |

---

## How Does TreeSet Stay Balanced?

Because TreeSet uses TreeMap, it indirectly uses a **Red-Black Tree**.

A Red-Black Tree is a self-balancing Binary Search Tree.

When elements are inserted or removed, the tree may perform:

- Rotations
- Recoloring

to maintain its balancing properties.

This prevents the tree from becoming highly skewed.

Therefore:

    add()       → O(log n)
    remove()    → O(log n)
    contains()  → O(log n)

---

## TreeSet vs HashSet

| Feature            | TreeSet                             | HashSet                    |
| ------------------ | ----------------------------------- | -------------------------- |
| Ordering           | Sorted                              | No guaranteed order        |
| Internal structure | TreeMap → Red-Black Tree            | HashMap                    |
| `add()`            | O(log n)                            | Average O(1)               |
| `remove()`         | O(log n)                            | Average O(1)               |
| `contains()`       | O(log n)                            | Average O(1)               |
| Navigation         | Yes                                 | No                         |
| Range operations   | Yes                                 | No                         |
| `null`             | Generally not with natural ordering | One `null` allowed         |
| Main use case      | Sorted unique elements              | Fast unique-element lookup |

The choice depends on the requirement:

    Need uniqueness + fast average lookup
        → HashSet

    Need uniqueness + sorted order
        → TreeSet

---

## TreeSet vs LinkedHashSet

| Feature            | TreeSet                  | LinkedHashSet                          |
| ------------------ | ------------------------ | -------------------------------------- |
| Ordering           | Sorted                   | Insertion order                        |
| Internal structure | TreeMap / Red-Black Tree | Hash table + linked list               |
| `add()`            | O(log n)                 | Average O(1)                           |
| `contains()`       | O(log n)                 | Average O(1)                           |
| Main use case      | Sorted unique data       | Unique data preserving insertion order |

For example:

If you insert:

    30, 10, 20

`TreeSet` gives:

    10, 20, 30

`LinkedHashSet` gives:

    30, 10, 20

---

## What Happens With `null`?

With natural ordering, TreeSet generally does not allow `null` because it needs to compare elements.

For example:

    TreeSet<Integer> set = new TreeSet<>();

    set.add(null);

This generally results in a `NullPointerException`.

A custom comparator can explicitly define how `null` should be ordered, but relying on this should be a deliberate design choice.

---

## Practical Applications

TreeSet is useful when you need **unique elements that remain sorted as the collection changes**.

### 1. Maintaining Sorted IDs

For example:

    TreeSet<Integer> employeeIds;

If employees are added or removed dynamically, the IDs remain sorted.

### 2. Finding Nearest Values

Suppose we have:

    10, 20, 30, 40, 50

and need the smallest value greater than `27`.

We can use:

    higher(27)

Result:

    30

Similarly, `floor(27)` gives:

    20

This is useful in scheduling, pricing, ranking, and range-related problems.

### 3. Range Queries

TreeSet provides:

    subSet()
    headSet()
    tailSet()

These allow us to work with portions of the sorted collection efficiently.

### 4. Removing Duplicates While Sorting

If we have:

    40, 10, 30, 10, 20, 40

and need unique sorted values:

    10, 20, 30, 40

TreeSet handles both requirements automatically.

---

## Important Interview Points

- `TreeSet` implements `NavigableSet`.
- It stores unique elements in sorted order.
- It is backed by a `TreeMap`.
- The underlying `TreeMap` uses a Red-Black Tree.
- `TreeSet` does not use `hashCode()` for ordering.
- Ordering comes from natural ordering (`Comparable`) or a supplied `Comparator`.
- If comparison returns `0`, TreeSet treats the elements as duplicates.
- `add()`, `remove()`, and `contains()` are O(log n).
- It provides navigation methods such as `lower()`, `floor()`, `higher()`, and `ceiling()`.
- It is not thread-safe.
- With natural ordering, `null` is generally not allowed.
- The ordering should generally be consistent with `equals()` to avoid surprising behavior.
- Use `TreeSet` when you need **uniqueness + sorted order + efficient navigation**.

## Key Takeaway

Remember TreeSet as:

    TreeSet
       ↓
    TreeMap
       ↓
    Red-Black Tree
       ↓
    Unique + Sorted elements
       ↓
    add / remove / contains → O(log n)

The biggest difference from `HashSet` is:

    HashSet
        → uniqueness
        → average O(1) lookup
        → no sorted-order guarantee

    TreeSet
        → uniqueness
        → O(log n) operations
        → sorted order
        → navigation methods

So, if an interviewer asks:

> "When would you use TreeSet?"

A concise answer is:

> Use `TreeSet` when I need a collection of unique elements that must remain sorted and I also need efficient operations such as finding the nearest smaller/larger element or querying a range.

**Q1.** Why does TreeSet use `compareTo()` or `Comparator` for duplicate detection instead of `equals()`?

**Q2.** How does `TreeSet` internally use `TreeMap`, and why does that make its operations O(log n)?

**Q3.** What would happen if a `Comparator` considers two different objects equal by returning `0`?
