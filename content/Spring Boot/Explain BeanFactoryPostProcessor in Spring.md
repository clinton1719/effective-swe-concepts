---
title: Explain BeanFactoryPostProcessor in Spring
tags: [spring, spring-boot, bean-lifecycle, ioc]
difficulty: medium
date: 2026-10-08
---

## What is a BeanFactoryPostProcessor?

A `BeanFactoryPostProcessor` is a Spring extension point that allows us to **modify bean definitions before Spring creates the application beans**.

It works with the metadata that describes how beans should be created, rather than modifying the actual bean instances.

For example, a bean definition contains information such as:

- Bean class
- Scope (`singleton`, `prototype`, etc.)
- Property values
- Lazy initialization settings

A `BeanFactoryPostProcessor` can modify this metadata before Spring instantiates the beans.

## When Is It Invoked?

It is invoked **after Spring loads the bean definitions but before regular application beans are instantiated**.

Simplified Spring startup sequence:

1. Spring creates the `ApplicationContext`.
2. Spring loads and registers bean definitions.
3. Spring invokes `BeanFactoryPostProcessor` implementations.
4. Spring instantiates regular non-lazy singleton beans and injects their dependencies.
5. Spring invokes `BeanPostProcessor` callbacks during bean initialization.
6. The application context finishes refreshing and becomes ready.

**Important:** A `BeanFactoryPostProcessor` works on bean definitions, whereas a `BeanPostProcessor` works on actual bean instances.

## What Is It Used For?

Common uses include:

- Modifying bean definitions before bean creation.
- Changing property values or bean configuration metadata.
- Registering or adjusting configuration programmatically.
- Implementing framework-level configuration features.

Spring's `PropertySourcesPlaceholderConfigurer` is a well-known example. It resolves placeholders such as `${app.name}` in bean definitions using configured property sources.

## Example

Suppose we have a bean definition for a service, and we want to make it lazy before Spring creates the service.

    @Component
    public class MyBeanFactoryPostProcessor
            implements BeanFactoryPostProcessor {

        @Override
        public void postProcessBeanFactory(
                ConfigurableListableBeanFactory beanFactory) {

            BeanDefinition beanDefinition =
                    beanFactory.getBeanDefinition("myService");

            beanDefinition.setLazyInit(true);
        }
    }

Here, Spring changes the `myService` bean definition so that it is lazily initialized.

This assumes `myService` is registered under that bean name. In a Spring Boot application, the processor must also be registered as a Spring bean, for example with `@Component` in a scanned package.

## BeanFactoryPostProcessor vs BeanPostProcessor

| Feature      | BeanFactoryPostProcessor                          | BeanPostProcessor                                                          |
| ------------ | ------------------------------------------------- | -------------------------------------------------------------------------- |
| Works on     | Bean definitions                                  | Actual bean instances                                                      |
| Invoked      | Before regular application beans are instantiated | During bean initialization                                                 |
| Main purpose | Modify bean configuration metadata                | Modify or wrap bean instances                                              |
| Main method  | `postProcessBeanFactory()`                        | `postProcessBeforeInitialization()` and `postProcessAfterInitialization()` |
| Example use  | Resolve placeholders, change bean definitions     | Create proxies, support annotation-driven behavior                         |

## Interview Answer

A `BeanFactoryPostProcessor` is a Spring extension point used to modify bean definition metadata before regular application beans are instantiated. It is invoked during application context startup, after bean definitions have been loaded but before regular singleton bean creation. A common example is `PropertySourcesPlaceholderConfigurer`, which resolves property placeholders in bean definitions.

## Common Interview Traps

- **It does not normally modify an already-created bean instance.** That is the role of a `BeanPostProcessor`.
- It runs before regular application bean instantiation, but Spring must instantiate certain infrastructure objects to perform startup processing.
- It is different from a `BeanDefinitionRegistryPostProcessor`, which provides an earlier callback and can register additional bean definitions.

## Follow-up Questions

**Q1.** What is a `BeanPostProcessor`, and when is it invoked?

**Q2.** What is the difference between `BeanFactoryPostProcessor` and `BeanDefinitionRegistryPostProcessor`?

**Q3.** How does Spring resolve `${...}` property placeholders using `PropertySourcesPlaceholderConfigurer`?
