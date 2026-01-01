---
title: Difference between Comparator and Comparable with Example
tags: [collections]
difficulty: medium
date: 2025-09-15
---

## Comparable
- **Definition:** `Comparable<T>` is an interface in `java.lang` that defines the *natural ordering* of objects.  
- **Method:**  
  ```java
  int compareTo(T other);
  ```
- **Effect:** The class itself decides how its instances should be compared.  
- **Use case:** When objects have a single natural/default order (e.g., numbers, alphabetical strings, IDs).

### Example
```java
class Employee implements Comparable<Employee> {
    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id); // natural order by ID
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

public class ComparableExample {
    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee(3, "Alice"),
            new Employee(1, "Bob"),
            new Employee(2, "Charlie")
        );

        List<Employee> sorted = new ArrayList<>(employees);
        Collections.sort(sorted); // uses compareTo
        System.out.println(sorted);
    }
}
```

**Output**
```
[1 - Bob, 2 - Charlie, 3 - Alice]
```

---

## Comparator
- **Definition:** `Comparator<T>` is an interface in `java.util` that defines *external comparison logic*.  
- **Method:**  
  ```java
  int compare(T o1, T o2);
  ```
- **Effect:** You can define multiple sorting strategies without modifying the class itself.  
- **Use case:** When you need different ways to sort the same objects (e.g., by name, by ID descending).

### Example
```java
import java.util.*;

class Employee {
    int id;
    String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return id + " - " + name;
    }
}

class EmployeeComparators {

    public static final Comparator<Employee> BY_NAME_THEN_ID =
        Comparator.comparing((Employee e) -> e.name)
                  .thenComparingInt(e -> e.id);

    public static final Comparator<Employee> BY_SALARY_DESC =
        Comparator.comparingDouble((Employee e) -> e.salary)
                  .reversed();

    public static final Comparator<Employee> BY_ID =
        Comparator.comparingInt(e -> e.id);
}



List<Employee> employees = List.of(
    new Employee(3, "Alice", 90000),
    new Employee(1, "Bob", 120000),
    new Employee(2, "Alice", 95000)
);

List<Employee> byName = new ArrayList<>(employees);
byName.sort(EmployeeComparators.BY_NAME_THEN_ID);

List<Employee> bySalary = new ArrayList<>(employees);
bySalary.sort(EmployeeComparators.BY_SALARY_DESC);

System.out.println(byName);
System.out.println(bySalary);

```

**Output**
```
Sorted by name: [3 - Alice, 1 - Bob, 2 - Charlie]
Sorted by ID desc: [3 - Alice, 2 - Charlie, 1 - Bob]
```

---

## Key Differences

| Aspect                | Comparable                           | Comparator                           |
|-----------------------|--------------------------------------|--------------------------------------|
| Package               | `java.lang`                          | `java.util`                          |
| Method                | `compareTo(T other)`                 | `compare(T o1, T o2)`                |
| Defines ordering      | **Natural ordering** (one per class) | **Custom ordering** (many possible)  |
| Modification required | Yes — class must implement it        | No — can be separate from the class  |
| Use case              | Default sort order                   | Multiple / flexible sort orders      |

---

✅ **Rule of thumb:**  
- Use **Comparable** for natural/default ordering.  
- Use **Comparator** for alternative or multiple orderings.
