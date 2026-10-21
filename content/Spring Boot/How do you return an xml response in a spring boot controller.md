---
title: How to Return an XML Response in a Spring Boot Controller
tags: [spring-boot, rest-api, xml, jackson]
difficulty: medium
date: 2026-10-21
---

## How Do You Return an XML Response?

In Spring Boot, you can return an XML response from a REST controller by returning a Java object and configuring an XML message converter.

A common approach is to use **Jackson XML** with `@RestController` and `produces = MediaType.APPLICATION_XML_VALUE`.

## 1. Add the XML Dependency

For a Maven project, add the Jackson XML data format dependency:

    <dependency>
        <groupId>com.fasterxml.jackson.dataformat</groupId>
        <artifactId>jackson-dataformat-xml</artifactId>
    </dependency>

If you use Spring Boot's dependency management, you generally do not need to specify the version manually.

## 2. Create a Model Class

    public class User {

        private Long id;
        private String name;

        public User() {
        }

        public User(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

Jackson XML uses the model's properties to serialize the object into XML.

## 3. Create the REST Controller

    @RestController
    public class UserController {

        @GetMapping(
            value = "/user",
            produces = MediaType.APPLICATION_XML_VALUE
        )
        public User getUser() {
            return new User(1L, "Clinton");
        }
    }

When a client requests `/user` with an appropriate `Accept: application/xml` header, Spring MVC selects a compatible message converter and serializes the returned object into XML.

## 4. Example XML Response

The response would be similar to:

    <User>
        <id>1</id>
        <name>Clinton</name>
    </User>

The exact XML structure depends on the Jackson XML configuration and annotations.

## How Does It Work Internally?

1. The request reaches the controller.
2. The controller returns a Java `User` object.
3. Spring MVC examines the endpoint's `produces` attribute and the client's `Accept` header.
4. An appropriate `HttpMessageConverter` serializes the object into XML.
5. Spring sends the XML response with an appropriate content type, typically `application/xml`.

## Important Interview Points

- `@RestController` makes returned objects response bodies by default.
- `produces = MediaType.APPLICATION_XML_VALUE` declares that the endpoint produces XML.
- Jackson XML provides XML serialization support; the dependency alone does not guarantee that every application configuration will automatically register the required converter.
- Spring Boot's web starter commonly configures JSON support, but XML support may require an additional dependency and compatible converter configuration.
- You can use Jackson XML annotations, such as `@JacksonXmlRootElement` and `@JacksonXmlProperty`, to customize element names and XML structure.
- If you need to return a prebuilt XML string, you can return a `String` and set the response content type to XML. However, returning a Java object and letting a message converter serialize it is generally preferable for structured responses.

## Follow-up Questions

**Q1.** What is the difference between `produces` and `consumes` in Spring MVC?

**Q2.** What is an `HttpMessageConverter`, and how does Spring Boot select one?

**Q3.** How would you customize XML element names using Jackson XML annotations?
