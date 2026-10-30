---
title: Difference Between CrudRepository, PagingAndSortingRepository and JpaRepository
tags: [spring-boot, spring-data-jpa, repositories, database]
difficulty: medium
date: 2026-10-30
---

## What are CrudRepository, PagingAndSortingRepository and JpaRepository?

These are Spring Data repository interfaces that reduce boilerplate code when performing database operations.

Instead of writing implementations for common database operations, we extend these interfaces and Spring Data provides the implementation automatically at runtime.

## 1. CrudRepository

`CrudRepository` provides basic CRUD (Create, Read, Update, Delete) operations.

Common methods:

| Method           | Purpose                             |
| ---------------- | ----------------------------------- |
| `save(entity)`   | Saves or updates an entity          |
| `findById(id)`   | Finds an entity by ID               |
| `findAll()`      | Retrieves all entities              |
| `deleteById(id)` | Deletes an entity by ID             |
| `existsById(id)` | Checks whether an entity exists     |
| `count()`        | Returns the total number of records |

Example:

    public interface EmployeeRepository
            extends CrudRepository<Employee, Long> {
    }

Here:

- `Employee` is the entity type.
- `Long` is the primary key type.

## 2. PagingAndSortingRepository

`PagingAndSortingRepository` provides CRUD-independent pagination and sorting functionality.

Common methods:

| Method                       | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `findAll(Pageable pageable)` | Retrieves records page by page          |
| `findAll(Sort sort)`         | Retrieves records in a particular order |

Example:

    public interface EmployeeRepository
            extends PagingAndSortingRepository<Employee, Long> {
    }

Usage:

    Pageable pageable = PageRequest.of(0, 10);

    Page<Employee> employees =
            employeeRepository.findAll(pageable);

This retrieves the first 10 employees.

**Why do we need pagination?**

Imagine a table containing 1 million employee records. Fetching all records at once can consume significant memory and affect performance.

Pagination retrieves only the required subset.

## 3. JpaRepository

`JpaRepository` provides JPA-specific functionality along with CRUD, pagination, and sorting capabilities.

It includes methods such as:

| Method                 | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `flush()`              | Synchronizes pending changes with the database              |
| `saveAndFlush(entity)` | Saves an entity and immediately flushes changes             |
| `deleteAllInBatch()`   | Deletes entities using a batch operation                    |
| `getReferenceById(id)` | Obtains a reference to an entity, potentially lazily loaded |

Example:

    public interface EmployeeRepository
            extends JpaRepository<Employee, Long> {
    }

It supports:

- Basic CRUD operations.
- Pagination.
- Sorting.
- JPA-specific operations.
- Batch-related operations.

## 4. Difference Between Them

| Feature              | CrudRepository | PagingAndSortingRepository | JpaRepository |
| -------------------- | -------------- | -------------------------- | ------------- |
| CRUD operations      | Yes            | No, not by itself          | Yes           |
| Pagination           | No             | Yes                        | Yes           |
| Sorting              | No             | Yes                        | Yes           |
| JPA-specific methods | No             | No                         | Yes           |
| Batch operations     | No             | No                         | Yes           |

**Important version-specific detail:**

In older Spring Data versions, `PagingAndSortingRepository` extended `CrudRepository`.

In Spring Data 3.x and later, they are separate interfaces. `PagingAndSortingRepository` does not inherit CRUD methods.

`JpaRepository` combines the relevant CRUD and paging/sorting capabilities and adds JPA-specific functionality.

## 5. Which One Should We Use?

In most Spring Boot applications using Spring Data JPA, **JpaRepository is a common choice** because it provides all the commonly required repository operations in one interface.

Use:

- `CrudRepository` when only basic CRUD operations are required.
- `PagingAndSortingRepository` when you specifically need paging and sorting without the full JPA repository API.
- `JpaRepository` when working with JPA and needing CRUD, pagination, sorting, and additional JPA operations.

## 6. How to Answer: Which One Have You Used in Your Applications?

A good interview answer, if you have used Spring Data JPA in your project, would be:

"I have primarily used `JpaRepository` in my Spring Boot applications. It provides CRUD operations, pagination, sorting, and additional JPA-specific methods, so I don't need to extend multiple interfaces.

For example, in an employee management module, I can extend `JpaRepository<Employee, Long>` and use methods like `save()`, `findById()`, `findAll(Pageable)`, and `deleteById()` without writing the implementation.

For custom queries, I can use method naming conventions such as `findByDepartment()` or write custom queries using `@Query`."

**Interview tip:** Don't claim to have used a particular interface in a production application unless you actually have. You can explain that you have practised it in your Spring Boot project if that is your experience.

## 7. One-Line Interview Answer

`CrudRepository` provides basic CRUD operations, `PagingAndSortingRepository` provides pagination and sorting, and `JpaRepository` provides CRUD, pagination, sorting, and additional JPA-specific operations. In typical Spring Boot applications using JPA, `JpaRepository` is commonly preferred.

## Follow-up Questions

**Q1.** What is the difference between `save()` and `saveAndFlush()`?

**Q2.** What is the difference between `Page`, `Slice`, and `List` in Spring Data JPA?

**Q3.** How does Spring Data JPA generate repository implementations automatically?
