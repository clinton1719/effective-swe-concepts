---
title: Difference Between save(), saveOrUpdate(), and persist() in Hibernate
tags: [java, hibernate, jpa, persistence]
difficulty: medium
date: 2026-11-19
---

## What is the difference between save(), saveOrUpdate(), and persist()?

All three methods are used to make an entity persistent in Hibernate, but they differ in how they handle entity state, return values, and compatibility with JPA.

### 1. `save()`

- Saves a new transient entity to the database.
- Returns the generated identifier (`Serializable`).
- Historically, it schedules an insert and may execute it immediately depending on the identifier-generation strategy and transaction context.
- It is a Hibernate-specific method, not part of JPA.

Example:

    Employee employee = new Employee();
    employee.setName("John");

    Serializable id = session.save(employee);

### 2. `saveOrUpdate()`

- Determines whether the entity should be inserted or updated.
- If the entity is considered transient, Hibernate inserts it.
- If it is considered detached, Hibernate updates the existing database record.
- Returns `void`.
- It is Hibernate-specific and not part of JPA.

Example:

    Employee employee = new Employee();
    employee.setId(101);
    employee.setName("John");

    session.saveOrUpdate(employee);

**Important:** Hibernate uses its entity-state and identifier/version information to determine whether to insert or update. It does not simply check whether the ID is non-null.

### 3. `persist()`

- Makes a new transient entity persistent.
- Returns `void`.
- Does not return the generated identifier; the identifier becomes available through the entity's ID property according to the identifier-generation strategy.
- The insert is generally executed during flush or transaction commit, though identifier-generation strategies can affect timing.
- Part of the JPA standard and supported by Hibernate.

Example:

    Employee employee = new Employee();
    employee.setName("John");

    session.persist(employee);

    // Access the generated ID through the entity
    Long id = employee.getId();

---

## Comparison Table

| Feature | `save()` | `saveOrUpdate()` | `persist()` |
|---|---|---|---|
| Purpose | Insert new entity | Insert or update | Make new entity persistent |
| Return value | Generated ID | `void` | `void` |
| Handles transient entity | Yes | Yes | Yes |
| Handles detached entity | Not intended for this | Yes | No; use merge for detached state |
| JPA standard | No | No | Yes |
| Typical use | Hibernate-specific insert | Hibernate-specific insert/update | Standard JPA persistence |

## Important: What should you use in modern Hibernate?

In modern Hibernate applications, prefer JPA-standard methods:

- `persist()` — for making a new entity persistent.
- `merge()` — for copying the state of a detached entity into a managed entity.

Example:

    // New entity
    session.persist(employee);

    // Detached entity
    Employee managedEmployee = session.merge(detachedEmployee);

**Important difference between `merge()` and `saveOrUpdate()`:**

`merge()` copies the detached entity's state into a managed instance and returns that managed instance. The original detached object remains detached.

`saveOrUpdate()` is an older Hibernate-specific operation that associates the supplied entity with the session and chooses insert or update based on its state.

## Interview Takeaway

The key distinction is:

- `save()` inserts and returns the generated ID.
- `saveOrUpdate()` decides between insert and update.
- `persist()` makes a new entity managed and follows the JPA standard.

For modern applications, prefer `persist()` and `merge()` over legacy Hibernate methods such as `save()` and `saveOrUpdate()`.

## Follow-up Questions

**Q1.** What is the difference between `persist()` and `merge()` in Hibernate?

**Q2.** What are transient, persistent, and detached entity states in Hibernate?

**Q3.** When does Hibernate execute an INSERT or UPDATE query: immediately, during flush, or at transaction commit?