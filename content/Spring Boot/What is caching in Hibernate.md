---
title: First-Level and Second-Level Cache in Hibernate
tags: [java, spring-boot, hibernate, caching, jpa]
difficulty: medium
date: 2026-11-23
---

## What is caching in Hibernate?

Hibernate uses caching to reduce repeated database queries and improve application performance.

Hibernate provides two main cache levels:

1. **First-Level Cache (L1):** Associated with a Hibernate Session or JPA Persistence Context.
2. **Second-Level Cache (L2):** Shared across sessions within the same Hibernate `SessionFactory` (typically corresponding to a persistence unit).

## 1. First-Level Cache (L1)

The first-level cache is Hibernate's built-in cache. It is enabled by default and cannot be disabled.

- It is associated with a Hibernate `Session` or JPA `EntityManager` persistence context.
- Each session has its own first-level cache.
- When an entity is loaded, Hibernate stores it in the persistence context.
- Subsequent requests for the same entity (by entity type and ID) within that persistence context can be served from the cache without another database query.
- It ensures that the same persistent entity identity maps to the same managed Java object within a persistence context.

### Example

    Employee emp1 = session.find(Employee.class, 101L);
    Employee emp2 = session.find(Employee.class, 101L);

In this example:

- The first call checks the persistence context, finds no matching entity, and queries the database.
- Hibernate stores the entity in the first-level cache.
- The second call finds the entity in the cache and does not execute another SELECT query.

Therefore, only one SELECT query is generally executed.

### Important points

- Automatically enabled.
- Exists only for the lifetime of the persistence context.
- Not shared between different sessions.
- Cleared when the session is cleared or closed.
- Hibernate's dirty checking also uses the persistence context to track managed entity changes.

## 2. Second-Level Cache (L2)

The second-level cache is an optional cache shared across multiple Hibernate sessions belonging to the same `SessionFactory`.

Unlike the first-level cache, it must be explicitly configured.

- It stores entity data beyond the lifetime of an individual session.
- Multiple sessions can reuse cached entity data.
- It is useful when the same relatively stable data is frequently accessed.
- It requires a cache provider, such as Ehcache or Infinispan, with a compatible Hibernate integration.

### Example

Suppose two service methods execute in separate transactions, each using a different persistence context.

**First transaction:**

    Employee emp1 = entityManager.find(Employee.class, 101L);

Hibernate checks:
1. First-level cache — entity not found.
2. Second-level cache — entity not found.
3. Database — entity is retrieved and may be stored in the second-level cache.

**Second transaction:**

    Employee emp2 = entityManager.find(Employee.class, 101L);

Hibernate checks:
1. First-level cache — entity not found because this is a new persistence context.
2. Second-level cache — entity found.
3. Database query is avoided.

The second transaction can retrieve the entity from the second-level cache.

## 3. First-Level Cache vs Second-Level Cache

| Feature | First-Level Cache | Second-Level Cache |
|---|---|---|
| Scope | Session / Persistence Context | SessionFactory |
| Default | Enabled | Disabled |
| Configuration | Automatic | Requires configuration |
| Shared across sessions | No | Yes |
| Lifetime | Persistence context lifetime | Beyond individual sessions |
| Main purpose | Avoid repeated queries within one session | Avoid repeated queries across sessions |
| Provider required | No | Yes |
| JPA support | Persistence context is part of JPA | Optional provider-specific caching |

## 4. How Does Spring Boot Use These Caches?

In a typical Spring Boot application using Spring Data JPA and Hibernate:

- Spring manages the `EntityManager` and persistence context.
- With transaction-scoped persistence contexts, the first-level cache generally lives for the duration of the transaction.
- The second-level cache is managed by Hibernate and shared across persistence contexts belonging to the same `SessionFactory`.
- You can enable second-level caching through Hibernate configuration and configure cache regions for selected entities.

For example, to enable second-level caching:

    spring.jpa.properties.hibernate.cache.use_second_level_cache=true

You must also configure a compatible cache provider and its integration with your Hibernate version.

To mark an entity as eligible for second-level caching:

    @Entity
    @Cacheable
    @org.hibernate.annotations.Cache(
        usage = CacheConcurrencyStrategy.READ_WRITE
    )
    public class Employee {
        @Id
        private Long id;

        private String name;
    }

Here:

- `@Cacheable` is the JPA annotation indicating that the entity can be cached.
- Hibernate's `@Cache` annotation configures the Hibernate cache strategy.
- `READ_WRITE` is a concurrency strategy suitable for data that can be read and updated, with Hibernate coordinating cache consistency.

Actual caching also depends on the second-level cache being enabled and correctly configured.

## 5. Important Interview Points

**Does Spring Boot enable second-level caching by default?**

No. Hibernate's first-level cache is enabled by default, but second-level caching requires explicit configuration and a cache provider.

**Is first-level cache shared between two transactions?**

Not necessarily. With the usual transaction-scoped persistence context, each transaction gets its own persistence context. Extended persistence contexts are an exception.

**Can we clear the first-level cache?**

Yes. You can use:

    entityManager.clear();

This detaches all managed entities from the current persistence context.

**Can we evict an entity from the second-level cache?**

Yes. Hibernate exposes cache eviction through its `SessionFactory` cache API.

    sessionFactory.getCache()
        .evictEntityData(Employee.class, 101L);

**Does second-level cache store complete Java objects?**

Conceptually, it caches entity data, not necessarily the same Java object instance. Hibernate may reconstruct an entity from cached state when another persistence context loads it.

**What is query cache?**

Hibernate also provides an optional query cache. It caches query results, typically entity identifiers or scalar result data, rather than replacing the second-level entity cache. It is configured separately and is most useful when used alongside the second-level cache.

## Summary

- **First-Level Cache:** Automatically enabled, session/persistence-context scoped, and used to avoid repeated database queries within the same persistence context.
- **Second-Level Cache:** Optional, shared across sessions within a `SessionFactory`, and useful for frequently accessed data.
- **Query Cache:** An additional optional cache for query results.

For most Spring Boot applications, first-level caching is already available. Enable second-level caching selectively when repeated reads across transactions justify the added configuration and cache-consistency considerations.

## Follow-up Questions

**Q1.** What is the difference between Hibernate First-Level Cache and Spring's `@Cacheable`?

**Q2.** What are the different second-level cache concurrency strategies: `READ_ONLY`, `READ_WRITE`, `NONSTRICT_READ_WRITE`, and `TRANSACTIONAL`?

**Q3.** What is the difference between Hibernate Second-Level Cache and Query Cache?