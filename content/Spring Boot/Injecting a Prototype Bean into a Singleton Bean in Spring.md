---
title: Injecting a Prototype Bean into a Singleton Bean in Spring
tags: [spring, spring-boot, dependency-injection, bean-scopes]
difficulty: medium
date: 2026-10-14
---

## What Happens When a Prototype Bean Is Injected into a Singleton Bean?

When a prototype-scoped bean is directly injected into a singleton-scoped bean, **Spring creates the prototype bean when the singleton is created and injects that instance into the singleton**.

The singleton retains that same prototype instance for its lifetime. Spring does not automatically create a new prototype instance every time the singleton uses the dependency.

### Example

    @Component
    @Scope("prototype")
    public class PrototypeBean {
    }

    @Component
    @Scope("singleton")
    public class SingletonBean {

        private final PrototypeBean prototypeBean;

        public SingletonBean(PrototypeBean prototypeBean) {
            this.prototypeBean = prototypeBean;
        }

        public PrototypeBean getPrototypeBean() {
            return prototypeBean;
        }
    }

Now, suppose we retrieve the singleton twice:

    SingletonBean s1 = context.getBean(SingletonBean.class);
    SingletonBean s2 = context.getBean(SingletonBean.class);

    System.out.println(s1 == s2); // true

    System.out.println(
        s1.getPrototypeBean() == s2.getPrototypeBean()
    ); // true

**Why?**

1. Spring creates one `SingletonBean` instance.
2. While creating it, Spring creates a `PrototypeBean` instance.
3. Spring injects that prototype instance into the singleton.
4. Every subsequent request for `SingletonBean` returns the same singleton, which holds the same `PrototypeBean` reference.

Even though `PrototypeBean` has prototype scope, the singleton does not receive a new instance for every method call.

## How Can We Get a New Prototype Instance Each Time?

If the singleton needs a fresh prototype instance whenever it requests one, use one of the following approaches.

### 1. Use `ObjectProvider` — Recommended

    @Component
    @Scope("prototype")
    public class PrototypeBean {
    }

    @Component
    public class SingletonBean {

        private final ObjectProvider<PrototypeBean> provider;

        public SingletonBean(
                ObjectProvider<PrototypeBean> provider) {
            this.provider = provider;
        }

        public PrototypeBean getPrototypeBean() {
            return provider.getObject();
        }
    }

Each call to `provider.getObject()` requests a prototype instance from Spring.

    PrototypeBean p1 = singletonBean.getPrototypeBean();
    PrototypeBean p2 = singletonBean.getPrototypeBean();

    System.out.println(p1 == p2); // false

Assuming normal prototype creation without custom scope or other special configuration, each call returns a distinct instance.

### 2. Use `@Lookup`

Spring can override a lookup method so that each invocation retrieves a bean from the container.

    @Component
    @Scope("prototype")
    public class PrototypeBean {
    }

    @Component
    public abstract class SingletonBean {

        @Lookup
        public abstract PrototypeBean getPrototypeBean();
    }

Each call to `getPrototypeBean()` obtains a new prototype instance. This approach relies on Spring generating a subclass, so lookup methods must be suitable for method overriding.

## Comparison

| Approach                     | Result                                                     |
| ---------------------------- | ---------------------------------------------------------- |
| Direct prototype injection   | Same injected instance throughout the singleton's lifetime |
| `ObjectProvider.getObject()` | Requests a fresh prototype instance each call              |
| `@Lookup`                    | Requests a fresh prototype instance on each lookup         |

## Important Interview Points

- A singleton bean is generally created once per Spring `ApplicationContext`.
- A prototype bean is created each time the container is asked for that bean.
- Direct injection does not mean Spring repeatedly resolves the dependency.
- Spring generally does not manage the complete destruction lifecycle of prototype beans after handing them to the caller.
- Use `ObjectProvider` when a singleton needs to obtain prototype instances dynamically.

## Interview Answer

When a prototype-scoped bean is directly injected into a singleton-scoped bean, Spring creates the prototype instance during singleton creation and injects it once. The singleton continues to use that same instance. To obtain a new prototype instance whenever needed, we can use `ObjectProvider` or `@Lookup`.

## Follow-up Questions

**Q1.** What happens when a singleton bean is injected into a prototype bean?

**Q2.** What is the difference between `ObjectProvider` and `ApplicationContext.getBean()`?

**Q3.** Why does Spring not automatically destroy prototype-scoped beans?
