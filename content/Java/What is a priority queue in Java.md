---
title: What is PriorityQueue in Java?
tags: [priority-queue, queue, heap]
difficulty: medium
date: 2026-03-29
---

# Java Heap and Priority Queue

In Java, the **PriorityQueue** class is the standard implementation of a **Heap** data structure. It is a tree-based structure that maintains the "Heap Property."  A heap is a specialized binary tree-based data structure that satisfies the heap property. The most common types of heaps are Min-Heap and Max-Heap.

---

## 1. Core Concepts
* **Min-Heap (Default):** The parent node is always smaller than or equal to its children. The smallest element is at the root.
* **Max-Heap:** The parent node is always larger than or equal to its children. The largest element is at the root.
* **Ordering:** Elements are ordered according to their natural ordering or by a **Comparator** provided at construction time.

---

## 2. Basic Syntax & Initialization

**Import Statements:**
```
import java.util.PriorityQueue;
import java.util.Collections;
import java.util.Comparator;
```
**Default Min-Heap:**
```
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
```
**Max-Heap using Collections.reverseOrder():**
```
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```
**Max-Heap using a custom Lambda Comparator:**
```
PriorityQueue<Integer> maxHeapLambda = new PriorityQueue<>((a, b) -> b - a);
```
---

## 3. Common Operations & Complexity

| Operation | Method | Time Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Insert** | add(e) / offer(e) | O(log n) | Adds an element to the heap. |
| **Remove Top** | poll() | O(log n) | Removes and returns the root element. |
| **Examine Top** | peek() | O(1) | Returns the root element without removing it. |
| **Remove Specific**| remove(obj) | O(n) | Removes a specific element (requires a linear search). |
| **Search** | contains(obj) | O(n) | Checks if the element exists. |
| **Size** | size() | O(1) | Returns the number of elements. |

---

## 4. PriorityQueue with Custom Objects

### Option A: Implementing Comparable
Best for defining the **natural ordering** of a class.
```
class Student implements Comparable<Student> {
    int id;
    double gpa;

    public Student(int id, double gpa) {
        this.id = id;
        this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return Double.compare(this.gpa, other.gpa); // Min-Heap based on GPA
    }
}
```
### Option B: Using a Comparator
Best for flexible sorting without modifying the original class.
```
PriorityQueue<Student> pq = new PriorityQueue<>(Comparator.comparingDouble((Student s) -> s.gpa).reversed());
```
---

## 5. Implementation Example: Heap Sort
```
public void heapSort(int[] arr) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int x : arr) minHeap.add(x);
    
    int i = 0;
    while (!minHeap.isEmpty()) {
        arr[i++] = minHeap.poll();
    }
}
```
---

## 6. Common Use Cases
1. **Dijkstra’s Algorithm:** To always expand the shortest path first.
2. **Kth Largest/Smallest Element:** - Use a **Min-Heap** of size K to find the Kth largest.
   - Use a **Max-Heap** of size K to find the Kth smallest.
3. **Median of Data Stream:** Maintaining a Max-Heap for the lower half and a Min-Heap for the upper half.
4. **Huffman Coding:** Building an optimal prefix tree for data compression.

---

## 7. Pro-Tips
* **Nulls:** PriorityQueue does **not** permit null elements.
* **Thread Safety:** It is not thread-safe. Use **PriorityBlockingQueue** for concurrent applications.
* **Iteration:** Iterating via a for-each loop **does not** guarantee any specific order. Only poll() or peek() interact with the sorted root.
* **Internal Storage:** Heaps are usually stored in an array. For an element at index i, its left child is at 2i + 1 and its right child is at 2i + 2.