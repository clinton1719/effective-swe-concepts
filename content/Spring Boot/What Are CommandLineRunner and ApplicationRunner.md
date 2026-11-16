---
title: CommandLineRunner vs ApplicationRunner in Spring Boot
tags: [spring-boot, commandlinerunner, applicationrunner, application-lifecycle]
difficulty: easy
date: 2026-11-16
---

## 1. What Are CommandLineRunner and ApplicationRunner?

`CommandLineRunner` and `ApplicationRunner` are Spring Boot interfaces used to execute code **once the Spring application context has been initialized and the application startup process is nearly complete**.

They are useful when we want to perform initialization tasks after Spring Boot starts.

Common use cases:

- Loading initial data into the database.
- Validating application configuration.
- Initializing caches.
- Performing startup checks.
- Running some one-time initialization logic.

Both interfaces provide a callback method that Spring Boot invokes automatically during application startup.

## 2. CommandLineRunner

`CommandLineRunner` is a functional interface that provides a `run()` method accepting a `String...` argument.

It receives application arguments as an array of strings.

### Example

    @Component
    public class MyCommandLineRunner implements CommandLineRunner {

        @Override
        public void run(String... args) {

            System.out.println("Application started!");

            for (String arg : args) {
                System.out.println(arg);
            }
        }
    }

If we start the application with:

    java -jar application.jar hello world

Output:

    Application started!
    hello
    world

The arguments are passed directly as strings.

## 3. ApplicationRunner

`ApplicationRunner` provides similar functionality, but instead of receiving a simple string array, it receives an `ApplicationArguments` object.

This makes it easier to work with named options and non-option arguments.

### Example

    @Component
    public class MyApplicationRunner implements ApplicationRunner {

        @Override
        public void run(ApplicationArguments args) {

            System.out.println("Application started!");

            System.out.println(
                args.getOptionNames()
            );

            System.out.println(
                args.getOptionValues("mode")
            );

            System.out.println(
                args.getNonOptionArgs()
            );
        }
    }

If we start the application with:

    java -jar application.jar --mode=production file1.txt

Output:

    Application started!
    [mode]
    [production]
    [file1.txt]

Here:

- `getOptionNames()` returns option names such as `mode`.
- `getOptionValues("mode")` returns the values associated with that option.
- `getNonOptionArgs()` returns arguments that are not options.

## 4. Difference Between CommandLineRunner and ApplicationRunner

| Feature              | CommandLineRunner          | ApplicationRunner                |
| -------------------- | -------------------------- | -------------------------------- |
| Package              | `org.springframework.boot` | `org.springframework.boot`       |
| Method               | `run(String... args)`      | `run(ApplicationArguments args)` |
| Arguments            | String array               | ApplicationArguments object      |
| Named arguments      | Must parse manually        | Built-in support                 |
| Non-option arguments | Must inspect strings       | `getNonOptionArgs()`             |
| Execution time       | During application startup | During application startup       |

**The main difference is how they receive command-line arguments.** Their startup execution purpose is essentially the same.

## 5. Can We Control the Execution Order?

Yes. If multiple `CommandLineRunner` or `ApplicationRunner` beans exist, we can control their execution order using `@Order` or the `Ordered` interface.

Example:

    @Component
    @Order(1)
    public class FirstRunner implements CommandLineRunner {

        @Override
        public void run(String... args) {
            System.out.println("First runner");
        }
    }

    @Component
    @Order(2)
    public class SecondRunner implements CommandLineRunner {

        @Override
        public void run(String... args) {
            System.out.println("Second runner");
        }
    }

Output:

    First runner
    Second runner

Lower order values execute first.

The ordering mechanism also applies when using both runner types together.

## 6. When Are They Executed?

A simplified Spring Boot startup sequence:

1. Spring Boot starts.
2. The application context is created.
3. Beans are instantiated and initialized.
4. The application context is refreshed.
5. Application startup callbacks are invoked, including `ApplicationRunner` and `CommandLineRunner`.
6. The application startup process completes.

For web applications, the embedded web server is generally already initialized before these runners execute.

**Important:** These runners execute during startup, not on every HTTP request. Long-running operations inside them can delay application startup.

## 7. Can We Use Both in the Same Application?

Yes. A Spring Boot application can have multiple beans implementing either interface.

Spring Boot invokes them during startup, respecting their configured ordering.

For example:

- `ApplicationRunner` can validate command-line configuration.
- `CommandLineRunner` can load initial reference data.

## 8. One-Line Interview Answer

"Both `CommandLineRunner` and `ApplicationRunner` are Spring Boot interfaces used to execute initialization logic after the application context has been initialized. The main difference is that `CommandLineRunner` receives arguments as a String array, whereas `ApplicationRunner` receives an `ApplicationArguments` object, which provides convenient methods to access named and non-option arguments."

## Follow-up Questions

**Q1.** What is the difference between `CommandLineRunner` and `@PostConstruct`?

**Q2.** What happens if an exception is thrown inside a `CommandLineRunner`?

**Q3.** How can we execute initialization logic only after the application is fully ready?
