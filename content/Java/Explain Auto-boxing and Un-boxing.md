---
title: Explain Auto-boxing and Un-boxing
tags: [java]
difficulty: easy
date: 2026-01-05
---

Autoboxing and unboxing in Java refer to the automatic conversion between primitive types and their wrapper classes. This feature was introduced in Java 5 to reduce boilerplate code when working with APIs that operate on objects, such as collections.

---

## Autoboxing

Autoboxing is the automatic conversion of a primitive value to its corresponding wrapper class object. For example, converting int to Integer, double to Double, and boolean to Boolean happens implicitly when an object is needed.

Examples:

// Autoboxing in variable assignment  
int a = 10;  
Integer obj = a; // int -> Integer  

// Autoboxing in collections (which store objects)  
List<Integer> list = new ArrayList<>();  
list.add(5);     // int 5 is autoboxed to Integer(5)

In these cases, the compiler rewrites the code to use methods like Integer.valueOf(a) internally.

---

## Unboxing

Unboxing is the automatic conversion of a wrapper class object to its corresponding primitive type. For example, converting Integer to int or Double to double when a primitive value is required.

Examples:

// Unboxing in assignment  
Integer obj = Integer.valueOf(20);  
int b = obj; // Integer -> int  

// Unboxing when reading from collections  
List<Integer> list = new ArrayList<>();  
list.add(5);          // autoboxing  
int x = list.get(0);  // unboxing Integer -> int

Internally, the compiler inserts calls such as obj.intValue() or obj.doubleValue().

---

## Why Autoboxing/Unboxing Are Useful

- Allow easy use of primitives with collections and APIs that work only with objects, such as List<Integer>.  
- Reduce explicit conversion code, making source code cleaner and more readable.

---

## Pitfalls to Remember

- NullPointerException: Unboxing a null wrapper (for example, Integer i = null; int x = i;) throws NullPointerException. 
- Performance overhead: Excessive boxing and unboxing can create many temporary objects and hurt performance in tight loops.