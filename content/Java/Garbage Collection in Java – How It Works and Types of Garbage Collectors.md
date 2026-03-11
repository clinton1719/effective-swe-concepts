---
title: Garbage Collection in Java – How It Works and Types of Garbage Collectors
tags: [java, jvm, garbage-collection, memory-management, gc]
difficulty: medium
date: 2026-03-11
---

## What is Garbage Collection in Java?

**Garbage Collection (GC)** is the automatic process by which the JVM **reclaims memory occupied by objects that are no longer reachable or used by the application**.

Instead of developers manually freeing memory (as in C/C++), Java’s JVM **automatically identifies unused objects and removes them**, preventing memory leaks and improving stability.

Example:
```
String a = new String("Hello");
a = null;
```
The object `"Hello"` is no longer referenced by any variable, so it becomes **eligible for garbage collection**.

---

## Why Garbage Collection Is Important

Without garbage collection:

- Memory would fill up quickly
- Applications would crash with **OutOfMemoryError**
- Developers would have to manually manage memory

Garbage collection provides:

- Automatic memory management
- Reduced memory leaks
- Safer applications

---

## How Garbage Collection Works

Java GC works based on the concept of **object reachability**.

An object is considered **alive** if it is reachable from **GC Roots**.

### GC Roots

GC Roots are starting points used by the JVM to determine reachable objects.

Examples:

- Local variables in stack frames
- Active threads
- Static variables
- JNI references

Example:
```
User user = new User();
```
If `user` exists on the stack → object is reachable → **not collected**.

If no reference points to the object → **eligible for GC**.

---

## Mark and Sweep Algorithm

Most garbage collectors follow variations of the **Mark and Sweep** process.

### 1. Mark Phase

The JVM scans all reachable objects starting from **GC Roots** and marks them as **alive**.

### 2. Sweep Phase

Objects that are **not marked** are considered garbage and removed from memory.

---

## Generational Garbage Collection

Java heap memory is divided into generations because **most objects die young**.

Heap structure:
```
Young Generation  
Old Generation  
Metaspace (for class metadata)
```
---

### Young Generation

Where **new objects are created**.

Contains:

- Eden Space
- Survivor Space S0
- Survivor Space S1

Process:

1. Objects created in Eden
2. Minor GC occurs
3. Surviving objects move to Survivor spaces
4. After several cycles → promoted to Old Generation

---

### Old Generation

Stores **long-lived objects**.

When this space fills up:

**Major GC (Full GC)** runs.

Full GC is slower because it scans a much larger memory region.

---

## Types of Garbage Collectors

Modern JVM provides multiple GC algorithms optimized for different workloads.

---

## 1. Serial Garbage Collector

Uses **a single thread** for garbage collection.

All application threads pause during GC.

Characteristics:

- Simple
- Low overhead
- Suitable for small applications

JVM option:

-XX:+UseSerialGC

---

## 2. Parallel Garbage Collector (Throughput Collector)

Uses **multiple threads for GC**.

Goal:

Maximize **application throughput**.

Characteristics:

- Faster GC than Serial
- Still pauses application threads

JVM option:

-XX:+UseParallelGC

Common for **CPU-intensive applications**.

---

## 3. CMS (Concurrent Mark Sweep)

Designed to **reduce GC pause times**.

Most of the GC work runs **concurrently with application threads**.

Phases:

1. Initial Mark
2. Concurrent Mark
3. Remark
4. Sweep

Advantages:

- Low pause times

Disadvantages:

- Memory fragmentation
- Deprecated in modern Java versions

JVM option:

-XX:+UseConcMarkSweepGC

---

## 4. G1 Garbage Collector (Garbage First)

Default GC in modern Java (Java 9+).

Heap is divided into **many small regions instead of large generations**. G1 collector partitions the heap into a set of equal-sized heap regions.
When G1 performs garbage collection then a concurrent global marking
phase is performed to determine the liveliness of objects throughout the
heap. After this mark phase is complete, G1 knows which regions are
mostly empty. It collects unreachable objects from these regions first,
which usually yields a large amount of free space, also called Sweeping. So
G1 collects these regions (containing garbage) first, and hence the name
Garbage-First

Goal:

Predictable **low pause times**.

Features:

- Region-based memory management
- Prioritizes regions with most garbage
- Performs mixed collections

Advantages:

- Good for large heaps
- Balanced throughput and latency

JVM option:

-XX:+UseG1GC

---

## 5. Z Garbage Collector (ZGC)

Designed for **very low latency systems**. The Z Garbage Collector (ZGC) is a low-latency, scalable JVM garbage collector designed for massive heaps (from a few MB to 16TB) with pause times consistently below 10ms (often sub-millisecond). It achieves this by performing nearly all costly work concurrently with application threads, including compaction

Pause times:

Typically **under 10 milliseconds**, even with huge heaps.

Features:

- Concurrent GC
- Colored pointers
- Scales to **terabytes of memory**

JVM option:

-XX:+UseZGC

---

## 6. Shenandoah GC

Also designed for **low pause times**.

Key idea:

Performs **concurrent compaction** to avoid long pauses.

Benefits:

- Pause times independent of heap size

JVM option:

-XX:+UseShenandoahGC

---

### Key Differences and Comparisons b/w ZGC and G1:
1. **Latency vs. Throughput**: ZGC excels in minimizing pause times (under 1ms). G1 prioritizes a balance of throughput and moderate pause times.

2. **Heap Size**: ZGC scales better for very large heaps (multi-TB). G1 is ideal for moderate to large heaps (up to ~4TB).

3. **Concurrency**: ZGC performs most work concurrently, including marking and relocation. G1 performs concurrent marking but pauses to evacuate memory.

4. **Generational Support**: As of Java 21+, Generational ZGC is available, making it highly efficient for most workloads, including those previously suited for G1.

5. **Performance**: In many scenarios, ZGC provides superior response times and higher throughput compared to G1, particularly when tail latency is a concern. 

### When to Choose Which:
**Choose G1**: For most general-purpose enterprise applications, 4GB–32GB heap sizes, and when maximum throughput is preferred over sub-millisecond latency.

**Choose ZGC**: For latency-critical applications, large heaps, and when you need to avoid "stop-the-world" pauses, particularly on Java 21+.

## Summary of Garbage Collectors

| Collector | Focus | Pause Time | Use Case |
|---|---|---|---|
| Serial GC | Simplicity | High | Small apps |
| Parallel GC | Throughput | Medium | Batch processing |
| CMS | Low pause | Low | Legacy systems |
| G1 GC | Balanced | Low | Modern default |
| ZGC | Ultra low latency | Very low | Large memory systems |
| Shenandoah | Low latency | Very low | Large heap applications |

---

## When Garbage Collection Runs

GC may run when:

- Heap memory becomes full
- System.gc() is called (not guaranteed)
- JVM heuristics decide memory pressure exists

Developers **cannot force GC execution**, only request it.

---

## Quick Interview Summary

Garbage Collection in Java is an automatic memory management mechanism where the JVM identifies and removes objects that are no longer reachable from GC roots. It uses algorithms like **Mark-and-Sweep and generational collection** to efficiently manage memory. Modern JVMs provide several collectors such as **Serial, Parallel, G1, ZGC, and Shenandoah**, each optimized for different performance and latency requirements.

---