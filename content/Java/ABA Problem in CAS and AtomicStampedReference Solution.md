---
title: ABA Problem in CAS and AtomicStampedReference Solution
tags: [java, concurrency, cas, aba-problem, atomic]
difficulty: medium
date: 2026-04-18
---

## Overview

The ABA problem occurs in Compare-And-Swap (CAS) when a value changes from A → B → A, making it appear unchanged. CAS cannot detect this intermediate modification, leading to subtle concurrency bugs. AtomicStampedReference solves this by attaching a version (stamp) to the value.

---

## Detailed Explanation

### 1. What CAS Assumes

CAS checks:
```
if (currentValue == expectedValue)
→ update
```
It only compares **value**, not history.

---

### 2. The ABA Problem

Scenario:

Initial value = A

Thread T1:
- Reads A
- Gets paused

Thread T2:
- Changes A → B
- Changes B → A

Thread T1 resumes:
- Sees value is still A
- CAS succeeds

⚠️ Problem:
T1 assumes nothing changed, but value was modified twice.

---

### 3. Why This Is Dangerous

- Intermediate changes may carry meaning (e.g., resource reused)
- Can corrupt data structures (e.g., lock-free stacks, queues)
- Leads to inconsistent state despite CAS success

---

### 4. Real Example (Stack Issue)

In lock-free stack:

- Node A popped
- Another thread modifies stack
- Node A reused

CAS sees "same A" → allows incorrect linking

---

### 5. Solution: AtomicStampedReference

AtomicStampedReference adds:

(value, stamp)

Stamp = version number

Now CAS checks:
```
if (currentValue == expectedValue AND currentStamp == expectedStamp)
→ update value + increment stamp
```
---

### 6. How It Fixes ABA

Same scenario:

Initial: (A, 1)

T1 reads → (A, 1)

T2:
- A → B → A
- Stamp changes: 1 → 2 → 3

Now state = (A, 3)

T1 tries CAS with (A, 1)

❌ Fails because stamp mismatch

---

### 7. Key Methods

- getReference()
- getStamp()
- compareAndSet(expectedRef, newRef, expectedStamp, newStamp)

---

## Examples

### Without Fix (ABA issue possible)

AtomicInteger value = new AtomicInteger(1);

// Only value tracked → ABA undetected

---

### With AtomicStampedReference
```
AtomicStampedReference<Integer> ref =
    new AtomicStampedReference<>(1, 0);

int[] stampHolder = new int[1];
Integer value = ref.get(stampHolder);

int stamp = stampHolder[0];

ref.compareAndSet(1, 2, stamp, stamp + 1);
```
---

## Key Points

- CAS only checks value → ignores history
- ABA = value appears unchanged but was modified
- AtomicStampedReference adds version tracking
- Ensures both value and version match
- Prevents stale updates

---

## Comparison (if applicable)

| Aspect                  | AtomicInteger (CAS) | AtomicStampedReference |
|------------------------|--------------------|------------------------|
| Tracks value           | Yes                | Yes                    |
| Tracks history/version | No                 | Yes                    |
| ABA safe               | No                 | Yes                    |
| Complexity             | Simple             | Slightly higher        |
| Use case               | Basic counters     | Lock-free structures   |

---

## Real-World Use Cases

- Lock-free stacks and queues
- Memory/resource management
- Concurrent data structures
- Systems where intermediate state matters
- High-frequency trading systems

---

## Common Mistakes

- Ignoring ABA in lock-free designs
- Using AtomicInteger when versioning is needed
- Forgetting to update stamp correctly
- Assuming CAS guarantees full correctness

---

## Quick Interview Summary

ABA occurs when a value changes and returns to its original state, fooling CAS into thinking nothing changed. AtomicStampedReference solves this by attaching a version stamp, ensuring both value and history are validated.

---

**Q1:** How does the ABA problem affect lock-free data structures like stacks and queues?  
**Q2:** What are the performance trade-offs of using AtomicStampedReference vs simple CAS?  
**Q3:** Are there alternative ways to solve ABA besides version stamping?