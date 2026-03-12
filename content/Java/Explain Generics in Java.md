---
title: Explain Generics in Java
tags: [java, generics, type-safety, collections, compile-time]
difficulty: medium
date: 2026-03-12
---

## What Are Generics in Java?

**Generics** allow classes, interfaces, and methods to operate on **different data types while providing type safety at compile time**.

Instead of using `Object` and casting, generics allow specifying the **type parameter** when creating objects.

Example idea:

List<String> → List containing only Strings  
List<Integer> → List containing only Integers

Generics improve:

- **Type safety**
- **Code reusability**
- **Readability**
- **Compile-time error detection**

---

## Problem Before Generics

Before Java 5, collections stored objects as `Object`.

Example:
```
List list = new ArrayList();

list.add("Hello");
list.add(10);

String s = (String) list.get(0);
```
Problems:

1. **No compile-time type checking**
2. Requires **explicit casting**
3. Risk of **ClassCastException**

---

## Solution With Generics

Using generics:
```
List<String> list = new ArrayList<>();

list.add("Hello");

String s = list.get(0);
```
Now:

- Compiler ensures only **String values** are added
- No casting required
- Errors detected **during compilation**

---

## Generic Class

A **generic class** allows the type to be specified when the object is created.

Example:
```
class Box<T> {

    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
```
Usage:
```
Box<Integer> intBox = new Box<>();
intBox.set(10);

Box<String> strBox = new Box<>();
strBox.set("Hello");
```
`T` represents **Type Parameter**.

---

## Multiple Type Parameters

Generics can use multiple parameters.

Example:
```
class Pair<K, V> {

    private K key;
    private V value;

}
```
Usage:
```
Pair<String, Integer> p = new Pair<>();
```
Common naming conventions:
```
T → Type  
E → Element  
K → Key  
V → Value  
N → Number
```
---

## Generic Methods

Methods can also be generic.

Example:
```
class Utility {

    public static <T> void printArray(T[] array) {

        for (T element : array) {
            System.out.println(element);
        }

    }

}
```
Usage:
```
Integer[] nums = {1,2,3};
Utility.printArray(nums);

String[] words = {"A","B"};
Utility.printArray(words);
```
---

## Bounded Generics

Sometimes we want to restrict the allowed types.

Example:
```
<T extends Number>
```
Example code:
```
class Calculator {

    public static <T extends Number> double add(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }

}
```
Allowed types:

- Integer
- Double
- Float

Not allowed:

- String

---

## Wildcards in Generics

Wildcards allow flexible use of generics.

Symbol:
```
?
```
Example:
```
List<?>
```
Means **list of unknown type**.

---

### 1. Upper Bounded Wildcard
```
<? extends T>
```
Example:
```
List<? extends Number>
```
Allows:

- Integer
- Double
- Float

A producer provides values to your code. The ? extends T syntax means the type can be T or any of its subtypes. This allows you to read elements as type T, but **you cannot add elements (except null)** to the collection because the compiler doesn't know the exact subtype at runtime, which prevents type-safety issues. 

Example: A method that prints all numbers from a list. The list is a producer of Number objects.

```
public static void printNumbers(List<? extends Number> list) {
    for (Number n : list) { // Reading elements (producing) - OK
        System.out.println(n);
    }
    // list.add(1); // Compilation error: Cannot add to a producer list (except null)
}
```

---

### 2. Lower Bounded Wildcard
```
<? super T>
```
Example:
```
List<? super Integer>
```
Allows:

- Integer
- Number
- Object

Useful when **inserting elements**.

A consumer accepts values from your code. The ? super T syntax means the type can be T or any of its supertypes. This allows you to add elements of type T (or any subtype of T), but when you read elements, the only guarantee you have is that they are at least Object (the highest common supertype), requiring a cast for specific types.

Example: A method that adds Integer values to a list. The list is a consumer of Integer objects.

```
public static void addIntegers(List<? super Integer> list) {
    list.add(1); // Writing elements (consuming) - OK
    list.add(new Integer(2)); // OK
    Object element = list.getFirst(); // Reading elements returns only Object
}
```

---

## PECS Principle

Rule used for wildcards:

PECS

Producer → Extends  
Consumer → Super

Meaning:

If a structure **produces data**, use:
```
<? extends T>
```
If a structure **consumes data**, use:
```
<? super T>
```
Example:
```
void printNumbers(List<? extends Number> list)
```
---

## Type Erasure

Java generics work using **Type Erasure**.

During compilation:

Generic type information is **removed**.

Example:
```
List<String>  
List<Integer>
```
Both become:
```
List
```
At runtime.

Reason:

Maintains **backward compatibility** with older Java versions.

---

## Limitations of Generics

Because of type erasure:

### Cannot create generic arrays

T[] arr = new T[10];  ❌

---

### Cannot instantiate generic types

T obj = new T();  ❌

---

### Cannot use primitives directly
```
List<int> ❌  
List<Integer> ✔
```
---

## Real-World Usage

Generics are heavily used in:

Java Collections

Examples:
```
List<String>  
Map<String, Integer>  
Set<User>
```
Frameworks:

- Spring
- Hibernate
- Streams API

---

## Quick Interview Summary

Generics in Java allow **classes, interfaces, and methods to operate on parameterized types**, ensuring compile-time type safety and eliminating the need for explicit casting. They improve code reusability and are implemented internally using **type erasure**, where generic type information is removed during compilation.

---