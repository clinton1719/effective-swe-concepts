---
title: Explain @Transactional Annotation in Spring
tags: [spring, spring-boot, transactions, database, annotations]
difficulty: medium
date: 2026-10-23
---

## What Is `@Transactional`?

`@Transactional` is a Spring annotation used to manage database transactions declaratively.

It allows Spring to begin, commit, or roll back a transaction around a method or class without requiring the developer to write transaction-management code manually.

A transaction helps ensure that a group of database operations succeeds or fails as a unit.

**Example:** When transferring money between two accounts, the debit and credit operations should succeed together. If the credit operation fails, the debit should be rolled back.

---

## How Does `@Transactional` Work?

Spring typically implements declarative transactions using AOP proxies and a transaction manager.

1. A caller invokes a transactional method through the Spring-managed proxy.
2. Spring starts a transaction or joins an existing transaction, depending on the propagation setting.
3. The method executes its database operations.
4. If the method completes successfully, Spring commits the transaction.
5. If an exception triggers rollback rules, Spring rolls back the transaction.

The actual transaction behavior depends on the configured transaction manager and the underlying resource.

---

## Example

Consider transferring money between two accounts.

    @Service
    public class AccountService {

        private final AccountRepository accountRepository;

        public AccountService(AccountRepository accountRepository) {
            this.accountRepository = accountRepository;
        }

        @Transactional
        public void transfer(Long fromId, Long toId, BigDecimal amount) {
            Account from = accountRepository.findById(fromId)
                    .orElseThrow();

            Account to = accountRepository.findById(toId)
                    .orElseThrow();

            from.setBalance(from.getBalance().subtract(amount));
            to.setBalance(to.getBalance().add(amount));

            accountRepository.save(from);
            accountRepository.save(to);
        }
    }

If a qualifying exception occurs during the transaction, both database updates can be rolled back instead of leaving only one account updated.

**Important:** The example assumes both updates participate in the same transaction and use a transaction manager capable of managing them atomically.

---

## Where Can We Use `@Transactional`?

### 1. Method Level

    @Transactional
    public void updateAccount() {
        // Transactional operations
    }

The annotation applies to the method's transactional execution.

### 2. Class Level

    @Service
    @Transactional
    public class AccountService {

        public void deposit() {
            // Transactional operations
        }

        public void withdraw() {
            // Transactional operations
        }
    }

Class-level `@Transactional` provides default transaction settings for eligible methods of the class. Method-level settings can override these defaults.

---

## Important Attributes of `@Transactional`

| Attribute       | Purpose                                                        | Default                                |
| --------------- | -------------------------------------------------------------- | -------------------------------------- |
| `propagation`   | Defines how the method participates in an existing transaction | `REQUIRED`                             |
| `isolation`     | Controls transaction isolation behavior                        | `DEFAULT`                              |
| `readOnly`      | Indicates that the transaction is intended for read-only work  | `false`                                |
| `timeout`       | Sets the transaction timeout in seconds                        | `-1` (no explicitly specified timeout) |
| `rollbackFor`   | Specifies exception types that trigger rollback                | No additional types                    |
| `noRollbackFor` | Specifies exception types that do not trigger rollback         | No additional types                    |

---

## Rollback Rules

By default, Spring rolls back a transaction when a method throws an unchecked exception (`RuntimeException`) or an `Error`.

Checked exceptions do **not** trigger rollback by default.

You can customize this behavior using `rollbackFor`.

    @Transactional(rollbackFor = Exception.class)
    public void processPayment() throws Exception {
        // Database operations
    }

With this configuration, checked exceptions covered by `Exception.class` also trigger rollback.

**Interview tip:** Catching an exception and suppressing it can prevent Spring from detecting it as a rollback-triggering failure. If you catch an exception, decide explicitly whether to rethrow it or mark the transaction for rollback.

---

## Transaction Propagation

Propagation determines how a method behaves when a transaction already exists.

| Propagation     | Behavior                                                                             |
| --------------- | ------------------------------------------------------------------------------------ |
| `REQUIRED`      | Joins the existing transaction or creates a new one.                                 |
| `REQUIRES_NEW`  | Suspends the existing transaction and starts a new one, when supported.              |
| `SUPPORTS`      | Uses an existing transaction if available; otherwise, runs without one.              |
| `MANDATORY`     | Requires an existing transaction; otherwise, throws an exception.                    |
| `NOT_SUPPORTED` | Suspends an existing transaction and executes without a transaction, when supported. |
| `NEVER`         | Requires that no transaction exists; otherwise, throws an exception.                 |
| `NESTED`        | Uses a nested transaction when supported, commonly implemented using savepoints.     |

**Most commonly asked:** `REQUIRED` versus `REQUIRES_NEW`.

- `REQUIRED`: The inner method participates in the outer transaction. Its failure can mark the shared transaction for rollback.
- `REQUIRES_NEW`: The inner method runs in an independent transaction. It can commit even if the outer transaction later rolls back.

---

## Important Interview Traps

- **Proxy limitation:** In Spring's default proxy-based mode, self-invocation (one method calling another transactional method on the same object) does not pass through the proxy, so the inner method's transactional settings may not be applied.
- **Private methods:** Private methods are not intercepted as transactional entry points by Spring's standard proxy-based approach.
- **Rollback is not automatic for every exception:** Checked exceptions do not cause rollback by default.
- **`readOnly = true` is not a universal write-prevention mechanism:** It is a hint that the transaction is read-only; enforcement and optimization depend on the transaction manager and persistence provider.
- **Database support matters:** Atomicity depends on the operations participating in the same transaction and on the resource supporting transactional behavior.
- **Transactions do not automatically cover external services:** A database transaction cannot, by itself, roll back an email, HTTP request, or message already sent to another system.
- **Transaction boundaries matter:** In typical Spring applications, transactional methods are commonly placed in the service layer to group related repository operations into one business transaction.

---

## Follow-up Questions

**Q1.** What is the difference between `Propagation.REQUIRED` and `Propagation.REQUIRES_NEW`?

**Q2.** Why does `@Transactional` sometimes fail when one method calls another method in the same class?

**Q3.** What is the difference between checked and unchecked exceptions in Spring transaction rollback behavior?
