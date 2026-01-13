---
title: Explain enum with examples
tags: [java, enum, constants]
difficulty: easy
date: 2026-01-13
---

## What is enum in Java?

In Java, an enum (enumeration) is a special type used to define a fixed set of constants under one type name. Enums make code more readable, type-safe, and self-documenting compared to using plain int or String constants.

Common examples: days of the week, directions (NORTH, SOUTH, EAST, WEST), levels (LOW, MEDIUM, HIGH), statuses (NEW, IN_PROGRESS, DONE).

---

## Basic enum declaration

Syntax:

enum Level {
    LOW,
    MEDIUM,
    HIGH
}

You can use this enum like a type:

class Main {
    public static void main(String[] args) {
        Level l = Level.MEDIUM;
        System.out.println(l);     // MEDIUM
    }
}

Key points:

- Enum constants are usually written in UPPERCASE.
- Each constant is a public static final instance of the enum type.

---

## Using enum in switch

Enums work very well with switch statements, which makes decision logic clearer and safer than using numbers or strings.

enum Level {
    LOW,
    MEDIUM,
    HIGH
}
```
class Main {
    public static void main(String[] args) {
        Level level = Level.MEDIUM;

        switch (level) {
            case LOW:
                System.out.println("Low level");
                break;
            case MEDIUM:
                System.out.println("Medium level");
                break;
            case HIGH:
                System.out.println("High level");
                break;
        }
    }
}

Output:

Medium level
```
---

## Enum inside a class

Enums can be declared inside a class if they are only relevant to that class.
```
class Game {
    enum Difficulty {
        EASY,
        MEDIUM,
        HARD
    }

    public static void main(String[] args) {
        Difficulty d = Difficulty.HARD;
        System.out.println("Selected difficulty: " + d);
    }
}
```
---

## Enum with fields, constructor, and methods

Enums in Java are more powerful than just constant lists. They can:

- Have fields
- Have a constructor
- Have methods
- Implement interfaces (but cannot extend a class, as they already extend java.lang.Enum)

Example:
```
enum PizzaSize {
    SMALL(8),
    MEDIUM(10),
    LARGE(12);

    private int inches;

    // Enum constructor (implicitly private)
    PizzaSize(int inches) {
        this.inches = inches;
    }

    public int getInches() {
        return inches;
    }

    public String getDescription() {
        return "Pizza size: " + inches + " inches";
    }
}

class Main {
    public static void main(String[] args) {
        PizzaSize size = PizzaSize.MEDIUM;

        System.out.println(size);                      // MEDIUM
        System.out.println(size.getInches());          // 10
        System.out.println(size.getDescription());     // Pizza size: 10 inches
    }
}
```
---

## Useful built-in enum methods

Each enum type automatically gets some helpful methods:

- values() – returns an array of all constants in the enum
- valueOf(String name) – converts a String to the corresponding enum constant (throws exception if not found)
- name() – returns the constant name as a String
- ordinal() – returns the position (0-based index) of the constant

Example:
```
enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}

class Main {
    public static void main(String[] args) {
        // Iterate all enum constants
        for (Day d : Day.values()) {
            System.out.println(d + " -> ordinal: " + d.ordinal());
        }

        // Convert String to enum
        Day day = Day.valueOf("MONDAY");
        System.out.println("Chosen day: " + day.name());
    }
}
```
---

## Why use enums instead of constants?

- Type safety: A variable of type Day can only hold values defined in Day enum.
- Readability: Level.HIGH is more meaningful than 3 or "HIGH".
- Less error-prone: Avoids typos common with strings; the compiler checks enum names.
- Feature-rich: Can add behavior (methods) to constants, unlike primitive constants.

---

## 🧠 Interview Tips

- Definition: Enum is a special type representing a fixed set of constants.
- By default, enums extend java.lang.Enum and cannot extend other classes.
- Enums can have constructors, fields, and methods, and can be used in switch.
- Use enums for things like states, categories, types, roles, statuses instead of raw ints/strings.
