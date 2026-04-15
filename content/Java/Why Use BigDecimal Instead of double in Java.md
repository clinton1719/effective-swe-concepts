---
title: Why Use BigDecimal Instead of double in Java
tags: [java, bigdecimal, precision, floating-point, numbers]
difficulty: easy
date: 2026-04-12
---

## Overview

In Java, both `double` and `BigDecimal` are used for numeric calculations, but they behave very differently.

- `double` → fast but **approximate**
- `BigDecimal` → slower but **precise**

---

## Core Problem with double

`double` uses **binary floating-point representation**, which cannot accurately represent many decimal values.

Example:
```
double a = 0.1;
double b = 0.2;

System.out.println(a + b);

Expected:

0.3

Actual:

0.30000000000000004
```
---

## Why This Happens

Computers store numbers in **binary (base 2)**.

Some decimal values (like 0.1) cannot be represented exactly in binary.

Result:

- Small rounding errors
- Accumulated inaccuracies

---

## What is BigDecimal?

`BigDecimal` is a class that provides **arbitrary-precision decimal arithmetic**.

It stores numbers as:

- Exact decimal values
- No rounding errors (unless explicitly specified)

---

## Example with BigDecimal
```
BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");

System.out.println(a.add(b));

Output:

0.3
```
---

## Key Differences

| Feature | double | BigDecimal |
|---|---|---|
| Precision | Approximate | Exact |
| Speed | Fast | Slower |
| Memory | Low | Higher |
| Use case | Scientific calculations | Financial calculations |
| Rounding | Implicit | Explicit |

---

## When to Use BigDecimal

Use BigDecimal when:

- Precision is critical
- Financial calculations (money)
- Tax, billing, accounting
- Currency calculations

Example:
```
Bank balance  
Interest calculations  
```
---

## When double Is Fine

Use double when:

- Minor precision loss is acceptable
- Scientific calculations
- Graphics, physics simulations
- Performance-critical scenarios

---

## Important Best Practice

Always use **String constructor** for BigDecimal.

Correct:
```
new BigDecimal("0.1")

Wrong:

new BigDecimal(0.1)
```
Reason:

`new BigDecimal(0.1)` carries floating-point error into BigDecimal.

---

## Operations in BigDecimal
```
BigDecimal a = new BigDecimal("10");
BigDecimal b = new BigDecimal("3");

a.add(b)  
a.subtract(b)  
a.multiply(b)  
a.divide(b, 2, RoundingMode.HALF_UP)
```
---

## Rounding Control

BigDecimal requires explicit rounding:
```
a.divide(b, 2, RoundingMode.HALF_UP)
```
This avoids unexpected results.

---

## Real-World Example

Money calculation:
```
double total = 0.1 + 0.2;   // inaccurate

BigDecimal total = new BigDecimal("0.1")
                      .add(new BigDecimal("0.2"));  // accurate
```
---

## Summary

- `double` → fast but may introduce precision errors  
- `BigDecimal` → precise but slower and more verbose  

---

## Quick Interview Summary

BigDecimal is used instead of double when **precision is critical**, especially in financial applications, because double uses binary floating-point representation that can introduce rounding errors, while BigDecimal provides exact decimal arithmetic.

---