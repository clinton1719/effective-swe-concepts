---
title: Difference Between get() and load() in Hibernate
tags: [hibernate, jpa, orm, database]
difficulty: medium
date: 2026-11-18
---

## 1. What Are get() and load() in Hibernate?

Both `get()` and `load()` are methods of Hibernate's `Session` interface used to retrieve an entity from the database using its primary key.

The main difference is **how they handle lazy loading and what happens when the requested record does not exist.**

## 2. Difference Between get() and load()

| Feature | get() | load() |
|---|---|---|
| Database query | Generally executes a SELECT immediately if the entity is not already in the session cache | Can return a proxy without immediately querying the database |
| Return type | Actual entity or `null` | Entity reference, potentially a proxy |
| Record not found | Returns `null` | Typically throws `ObjectNotFoundException` when the missing entity is initialized |
| Lazy loading | Does not defer retrieval through an uninitialized proxy | Supports proxy-based lazy loading |
| Database hit | Usually immediate, unless already cached | May be delayed until entity state is accessed |
| Main purpose | Retrieve an entity when it may or may not exist | Obtain a reference when the entity is expected to exist |

## 3. Example of get()

Suppose we have an Employee entity.

    Employee employee = session.get(Employee.class, 101L);

Hibernate retrieves the employee from the database if it is not already available in the session's first-level cache.

If the record exists:

    Employee employee = session.get(Employee.class, 101L);
    System.out.println(employee.getName());

If the record does not exist:

    Employee employee = session.get(Employee.class, 999L);

    System.out.println(employee); // null

**Use `get()` when you want to check whether an entity exists and handle a missing record.**

## 4. Example of load()

    Employee employee = session.load(Employee.class, 101L);

Hibernate may return a proxy object without immediately querying the database.

For example:

    Employee employee = session.load(Employee.class, 101L);

    System.out.println(employee.getId());

The proxy may be able to return the identifier without initializing the entity.

However, when we access another property:

    System.out.println(employee.getName());

Hibernate initializes the proxy and retrieves the entity from the database.

If the record does not exist, Hibernate typically throws `ObjectNotFoundException` when the proxy is initialized.

**Use of `load()` is appropriate when you need a reference to an entity without necessarily loading its complete state immediately.**

## 5. Visual Example

Suppose the Employee table contains:

| ID | Name |
|---|---|
| 101 | John |
| 102 | David |

Calling:

    Employee employee = session.get(Employee.class, 101L);

Generally retrieves the employee immediately.

Calling:

    Employee employee = session.load(Employee.class, 101L);

May return a proxy first. The actual database query happens when the proxy needs to initialize.

## 6. Important Version-Specific Detail

This is a common Hibernate interview question, but there is an important modern Hibernate distinction.

- In older Hibernate versions, `Session.get()` and `Session.load()` were commonly used.
- In Hibernate 6, `Session.get()` remains available.
- `Session.load()` is deprecated in Hibernate 6.
- The recommended alternative for obtaining a reference without immediately loading the entity is `Session.getReference()`.

Example:

    Employee employee =
            session.getReference(Employee.class, 101L);

`getReference()` provides proxy/reference-based behavior similar to the older `load()` approach.

In JPA, the equivalent method is:

    Employee employee =
            entityManager.getReference(Employee.class, 101L);

## 7. How to Answer in an Interview

"`get()` and `load()` are Hibernate Session methods used to retrieve entities by their primary key.

The main difference is that `get()` generally fetches the entity immediately and returns null if the record does not exist.

`load()` can return a proxy without immediately hitting the database. When we access the entity's properties, Hibernate initializes the proxy and fetches the actual data. If the record does not exist, an exception is typically thrown when the proxy is initialized.

In modern Hibernate 6, `load()` is deprecated, and `getReference()` is the recommended alternative when we need a lazy entity reference."

## 8. Important Interview Traps

1. `get()` does not always execute a database query; Hibernate may find the entity in its first-level cache.
2. `load()` does not guarantee that a database query is avoided; accessing the entity's state can initialize the proxy.
3. `get()` returns `null` for a missing entity, whereas a missing entity obtained through a proxy typically results in an exception when initialized.
4. A proxy may require an active Hibernate session when it is initialized. Accessing it after the session is closed can result in `LazyInitializationException`.
5. Do not confuse `Session.load()` with JPA's `EntityManager.getReference()`.

## Follow-up Questions

**Q1.** What is lazy loading in Hibernate, and how does a proxy work?

**Q2.** What is the difference between `getReference()` and `find()` in JPA?

**Q3.** What is the difference between first-level cache and second-level cache in Hibernate?
