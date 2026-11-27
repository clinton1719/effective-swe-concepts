---
title: Why Do We Use FULL OUTER JOIN in SQL?
tags: [sql, joins, database, queries]
difficulty: easy
date: 2026-11-27
---

## Why is FULL OUTER JOIN used if it returns all records from both tables?

The important distinction is that `FULL OUTER JOIN` does not simply return all records from both tables independently. It **combines matching records from both tables and also preserves non-matching records from either table**.

It is useful when you want a complete view of two datasets, including records that have no corresponding match.

## Example

Suppose we have two tables:

**Employees**

| employee_id | name |
|---|---|
| 1 | John |
| 2 | Alice |
| 3 | Bob |

**Salaries**

| employee_id | salary |
|---|---|
| 1 | 50000 |
| 2 | 60000 |
| 4 | 70000 |

### 1. INNER JOIN

Returns only records that match in both tables.

    SELECT *
    FROM Employees e
    INNER JOIN Salaries s
        ON e.employee_id = s.employee_id;

Result:

| employee_id | name | salary |
|---|---|---|
| 1 | John | 50000 |
| 2 | Alice | 60000 |

Bob and employee 4 are excluded because they have no matching record.

### 2. LEFT JOIN

Returns all records from the left table (`Employees`) and matching records from the right table.

    SELECT *
    FROM Employees e
    LEFT JOIN Salaries s
        ON e.employee_id = s.employee_id;

Result:

| employee_id | name | salary |
|---|---|---|
| 1 | John | 50000 |
| 2 | Alice | 60000 |
| 3 | Bob | NULL |

Bob is included even though he has no salary record.

### 3. RIGHT JOIN

Returns all records from the right table (`Salaries`) and matching records from the left table.

    SELECT *
    FROM Employees e
    RIGHT JOIN Salaries s
        ON e.employee_id = s.employee_id;

Result:

| employee_id | name | salary |
|---|---|---|
| 1 | John | 50000 |
| 2 | Alice | 60000 |
| 4 | NULL | 70000 |

Employee 4 is included even though there is no corresponding employee record.

### 4. FULL OUTER JOIN

Returns:
- All matching records from both tables.
- Unmatched records from the left table.
- Unmatched records from the right table.

    SELECT *
    FROM Employees e
    FULL OUTER JOIN Salaries s
        ON e.employee_id = s.employee_id;

Result:

| employee_id | name | salary |
|---|---|---|
| 1 | John | 50000 |
| 2 | Alice | 60000 |
| 3 | Bob | NULL |
| 4 | NULL | 70000 |

Notice that it combines the results of the LEFT JOIN and RIGHT JOIN without duplicating the matching rows.

## So, When Do We Actually Use FULL OUTER JOIN?

Consider a financial application where you have:

- An employee table containing all employees.
- A payroll table containing employees who received salary payments.

You want to identify:

1. Employees who received salary payments.
2. Employees who did not receive salary payments.
3. Payroll records that do not have a corresponding employee.

A FULL OUTER JOIN gives you all three categories in one result.

You can then identify unmatched records using NULL checks:

    SELECT
        e.employee_id,
        e.name,
        s.salary,
        CASE
            WHEN e.employee_id IS NULL THEN 'No Employee Record'
            WHEN s.employee_id IS NULL THEN 'No Salary Record'
            ELSE 'Matched'
        END AS status
    FROM Employees e
    FULL OUTER JOIN Salaries s
        ON e.employee_id = s.employee_id;

## Important Interview Point

If you only want all records from one particular table, use LEFT JOIN or RIGHT JOIN.

If you want all records from both tables, including unmatched records on either side, use FULL OUTER JOIN.

**FULL OUTER JOIN = LEFT JOIN + RIGHT JOIN, with matching rows appearing only once.**

## Follow-up Questions

**Q1.** What is the difference between FULL OUTER JOIN and UNION?

**Q2.** How can you find records present in one table but missing from another using JOIN?

**Q3.** What happens when multiple rows in both tables have the same join key?