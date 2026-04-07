---
title: AWS Databases Quiz
tags: [aws, dynamoDb, rds, aurora]
difficulty: medium
date: 2026-04-05
---

## Question 1

A website is currently in the development process and it is going to be hosted on AWS. There is a requirement to store user sessions for users logged in to the website with an automatic expiry and deletion of expired user sessions. Which of the following AWS services are best suited for this use case?

[ ] Store users’ sessions in an S3 bucket and enable S3 Lifecycle Policy

[ ] Store users’ sessions locally in an EC2 instance

[ ] Store users’ sessions in a DynamoDB table and enable TTL

[ ] Store users’ sessions in an EFS file system


**Correct Answer:** ✅ Store users’ sessions in a DynamoDB table and enable TTL

**Explanation:** Amazon DynamoDB is a high-performance NoSQL database that is ideal for session management due to its sub-millisecond latency. The **Time to Live (TTL)** feature allows you to define a specific timestamp for when an item is no longer needed; DynamoDB then automatically deletes the expired items from the table without consuming any write throughput, perfectly fulfilling the requirement for automatic expiry and deletion.

## Question 2

A company has a serverless application on AWS which consists of Lambda, DynamoDB, and Step Functions. In the last month, there are an increase in the number of requests against the application which results in an increase in DynamoDB costs, and requests started to be throttled. After further investigation, it shows that the majority of requests are read requests against some queries in the DynamoDB table. What do you recommend to prevent throttles and reduce costs efficiently?

[ ] Use an EC2 instance with Redis installed and place it between the Lambda function and the DynamoDB table

[ ] Migrate from DynamoDB to Aurora and use ElastiCache to cache the most requested read data

[ ] Migrate from DynamoDB to S3 and use CloudFront to cache the most requested read data

[ ] Use DynamoDB Accelerator (DAX) to cache the most requested read data


**Correct Answer:** ✅ Use DynamoDB Accelerator (DAX) to cache the most requested read data

**Explanation:** **DynamoDB Accelerator (DAX)** is a fully managed, highly available, in-memory cache specifically designed for DynamoDB. It can reduce response times from milliseconds to microseconds. Because DAX handles the read requests from its own cache, it reduces the number of Read Capacity Units (RCUs) consumed on the underlying DynamoDB table, which prevents throttling and lowers costs for read-heavy workloads. Unlike ElastiCache/Redis, it is API-compatible with DynamoDB, meaning it requires minimal code changes.

## Question 3
The maximum size of an item in a DynamoDB table is ...................

[ ] 1 MB

[ ] 500 KB

[ ] 400 KB

[ ] 400 MB

Correct Answer: ✅ 400 KB

Explanation: The maximum size of an item in Amazon DynamoDB is 400 KB. This limit includes both the attribute names and the attribute values. If your application needs to store larger data sets (such as large documents or images), the recommended design pattern is to store the object in Amazon S3 and save the S3 object key (URL) as an attribute in the DynamoDB item.

## Question 4

You have an application that is served globally using CloudFront Distribution. You want to authenticate users at the CloudFront Edge Locations instead of authentication requests go all the way to your origins. What should you use to satisfy this requirement?

[ ] Lambda@Edge

[ ] API Gateway

[ ] DynamoDB

[ ] AWS Global Accelerator


**Correct Answer:** ✅ Lambda@Edge

**Explanation:** Lambda@Edge is a feature of Amazon CloudFront that lets you run code closer to users of your application, which improves performance and reduces latency. By using Lambda@Edge, you can intercept CloudFront requests (Viewer Request, Origin Request, Origin Response, Viewer Response) to perform functions like authentication and authorization directly at the Edge Location. This prevents unauthenticated traffic from ever reaching your origin server, saving resources and improving security.

## Question 5

You are a DevOps engineer in a football company that has a website that is backed by a DynamoDB table. The table stores viewers’ feedback for football matches. You have been tasked to work with the analytics team to generate reports on the viewers’ feedback. The analytics team wants the data in DynamoDB in json format and hosted in an S3 bucket to start working on it and create the reports. What is the best and most cost-effective way to convert DynamoDB data to json files?

[ ] Select DynamoDB table then select Export to S3

[ ] Create a Lambda function to read DynamoDB data, convert them to json files, then store the files in S3 bucket

[ ] Use AWS Transfer Family

[ ] Use AWS DataSync


**Correct Answer:** ✅ Select DynamoDB table then select Export to S3

**Explanation:** Amazon DynamoDB provides a native feature called **Export to S3**, which allows you to export data from a DynamoDB table to an Amazon S3 bucket in either DynamoDB JSON or Amazon Ion format. This feature is fully managed, highly scalable, and does not consume the table's read capacity units (RCUs), making it more cost-effective and easier to maintain than writing a custom Lambda script for large datasets.

## Question 6

You have provisioned a DynamoDB table with 10 RCUs and 10 WCUs. A month later you want to increase the RCU to handle more read traffic. What should you do?

[ ] Increase RCU and keep WCU the same

[ ] You need to increase both RCU and WCU

[ ] Increase RCU and decrease WCU


**Correct Answer:** ✅ Increase RCU and keep WCU the same

**Explanation:** In Amazon DynamoDB, Read Capacity Units (RCU) and Write Capacity Units (WCU) are independent settings. You can scale them separately based on your application's specific traffic patterns. If your application becomes read-heavy, you can increase the RCU to meet that demand without being forced to change or pay for additional WCU that you don't need.

## Question 7

You have an e-commerce website where you are using DynamoDB as your database. You are about to enter the Christmas sale and you have a few items which are very popular and you expect that they will be read often. Unfortunately, last year due to the huge traffic you had the ProvisionedThroughputExceededException exception. What would you do to prevent this error from happening again?

[ ] Increase the RCU to a very high value

[ ] Create a DAX Cluster

[ ] Migrate the database away from DynamoDB for the time of the sale


**Correct Answer:** ✅ Create a DAX Cluster

**Explanation:** In a high-traffic sale, a few "hot" items are read much more frequently than others, potentially causing a "hot partition" and triggering a `ProvisionedThroughputExceededException` even if your total RCU is high. **DynamoDB Accelerator (DAX)** is an in-memory cache that sits in front of DynamoDB. It can handle millions of requests per second for these hot items with microsecond latency, effectively shielding the underlying table from the read heavy-lifting and preventing throughput exceptions.

## Question 8

You have created a Lambda function that typically will take around 1 hour to process some data. The code works fine when you run it locally on your machine, but when you invoke the Lambda function it fails with a "timeout" error after 3 seconds. What should you do?

[ ] Configure your Lambda's timeout to 25 minutes

[ ] Configure your Lambda's memory to 10 GB

[ ] Run your code somewhere else (e.g., EC2 instance)


**Correct Answer:** ✅ Run your code somewhere else (e.g., EC2 instance)

**Explanation:** AWS Lambda has a hard maximum execution timeout of **15 minutes (900 seconds)**. Since your workload requires approximately 1 hour to process, it is fundamentally incompatible with the Lambda execution limits. In this scenario, you should move the workload to a service that supports long-running processes, such as **Amazon EC2**, **AWS Fargate**, or **Amazon ECS**.

## Question 9

You are running an application in production that is leveraging DynamoDB as its datastore and is experiencing smooth sustained usage. There is a need to make the application run in development mode as well, where it will experience the unpredictable volume of requests. What is the most cost-effective solution that you recommend?

[ ] Use Provisioned Capacity Mode with Auto Scaling enabled for both development and production

[ ] Use Provisioned Capacity Mode with Auto Scaling enabled for production and use On-Demand Capacity Mode for development

[ ] Use Provisioned Capacity Mode with Auto Scaling enabled for development and use On-Demand Capacity Mode for production

[ ] Use On-Demand Capacity Mode for both development and production


**Correct Answer:** ✅ Use Provisioned Capacity Mode with Auto Scaling enabled for production and use On-Demand Capacity Mode for development

**Explanation:** **Provisioned Capacity Mode** is more cost-effective for workloads with predictable, sustained traffic (like your production environment) because you pay a lower hourly rate for the capacity you reserve. **On-Demand Capacity Mode** is ideal for development or unpredictable workloads because you only pay for the requests you actually make. In a dev environment where the table might sit idle for hours and then face sudden bursts of testing, On-Demand prevents you from paying for idle provisioned capacity.

## Question 10

You have developed a mobile application that uses DynamoDB as its datastore. You want to automate sending welcome emails to new users after they sign up. What is the most efficient way to achieve this?

[ ] Schedule a Lambda function to run every minute using CloudWatch Events, scan the entire table looking for new users

[ ] Enable SNS and DynamoDB integration

[ ] Enable DynamoDB Streams and configure it to invoke a Lambda function to send emails


**Correct Answer:** ✅ Enable DynamoDB Streams and configure it to invoke a Lambda function to send emails

**Explanation:** This is a classic event-driven architecture pattern. By enabling **DynamoDB Streams**, any new record (a new user signup) is captured as an event. You can then configure **AWS Lambda** to trigger automatically whenever a new item is added to the stream. The Lambda function can then use **Amazon SES** (Simple Email Service) or an external API to send the welcome email. This is much more efficient than scanning the table, as it only processes new changes and happens in near real-time.

## Question 11

You have created a DynamoDB table in ap-northeast-1 and would like to make it available in eu-west-1, so you decided to create a DynamoDB Global Table. What needs to be enabled first before you create a DynamoDB Global Table?

[ ] DynamoDB Streams

[ ] DynamoDB DAX

[ ] DynamoDB Versioning

[ ] DynamoDB Backups


**Correct Answer:** ✅ DynamoDB Streams

**Explanation:** To use **DynamoDB Global Tables**, you must first enable **DynamoDB Streams** on the participant tables. The stream captures every change made to the data in one region and uses that information to replicate the change to the other regions in the Global Table group. Specifically, the stream must be configured to show the "New and Old Images" of the items to ensure accurate synchronization across the globe.

## Question 12

Which AWS service provides you with caching capability that is compatible with Redis API?

[ ] Amazon RDS

[ ] Amazon DynamoDB

[ ] Amazon OpenSearch

[ ] Amazon ElastiCache


**Correct Answer:** ✅ Amazon ElastiCache

**Explanation:** **Amazon ElastiCache** is a fully managed, in-memory caching service that supports two open-source engines: **Redis** and **Memcached**. It allows you to seamlessly set up, run, and scale popular open-source compatible in-memory data stores in the cloud. Using ElastiCache for Redis significantly improves the performance of your applications by retrieving data from high- throughput, low-latency in-memory caches instead of relying entirely on slower disk-based databases.

## Question 13

You are looking to perform Online Transaction Processing (OLTP). You would like to use a database that has built-in auto-scaling capabilities and provides you with the maximum number of replicas for its underlying storage. What AWS service do you recommend?

[ ] Amazon ElastiCache

[ ] Amazon Neptune

[ ] Amazon Aurora

[ ] Amazon RDS

Correct Answer: ✅ Amazon Aurora

Explanation: Amazon Aurora is a cloud-native relational database engine that is fully managed and compatible with MySQL and PostgreSQL. It is specifically designed for high-performance OLTP workloads. Key features that satisfy this requirement include:

Storage Replication: Aurora automatically maintains 6 copies of your data across 3 Availability Zones (AZs), providing superior durability and availability compared to standard RDS.

Auto-scaling: Aurora can automatically scale its storage (up to 128 TiB) and can also utilize Aurora Auto Scaling to adjust the number of Read Replicas based on actual traffic.

Performance: It offers up to 5x the throughput of standard MySQL and 3x the throughput of standard PostgreSQL.

## Question 14

As a Solutions Architect, a startup company asked you for help as they are working on an architecture for a social media website where users can be friends with each other, and like each other's posts. The company plan on performing some complicated queries such as "What are the number of likes on the posts that have been posted by the friends of Mike?". Which database do you recommend?

[ ] Amazon RDS

[ ] Amazon QLDB

[ ] Amazon Neptune

[ ] Amazon OpenSearch


**Correct Answer:** ✅ Amazon Neptune

**Explanation:** **Amazon Neptune** is a fast, reliable, fully managed **graph database** service that makes it easy to build and run applications that work with highly connected datasets. Social media features like "friends of friends," "likes on posts by friends," and "recommendations" involve complex relationships that are difficult and slow to query in a traditional relational database (which would require multiple expensive JOIN operations). Neptune uses graph structures (nodes and edges) to store these relationships, allowing you to perform deep traversals and complex relationship queries with millisecond latency.

## Question 15

A startup is working on developing a new project to reduce forest fires due to climate change. The startup is developing sensors that will be spread across the entire forest to make some readings such as temperature, humidity, and pressures which will help detect the forest fires before it happens. They are going to have thousands of sensors that are going to store a lot of readings each second. There is a requirement to store those readings and do fast analytics so they can predict if there is a fire. Which AWS service can they use to store those readings?

[ ] Amazon Timestream

[ ] Amazon Neptune

[ ] Amazon S3

[ ] Amazon ElastiCache


**Correct Answer:** ✅ Amazon Timestream

**Explanation:** **Amazon Timestream** is a fast, scalable, and fully managed **time-series database** service for IoT and operational applications. It is specifically designed to store and process trillions of events per day (like sensor readings over time). It automatically scales up or down to adjust for capacity and has a built-in analytical engine that allows you to run complex time-series queries (e.g., smoothing, approximation, and interpolation) to identify trends or anomalies like a sudden spike in temperature across multiple sensors.

## Question 16

A company using a self-hosted on-premises Apache Cassandra database which they want to migrate to AWS. Which AWS service can they use which provides them with a fully managed, highly available, and scalable Apache Cassandra database?

[ ] Amazon DocumentDB

[ ] Amazon DynamoDB

[ ] Amazon Timestream

[ ] Amazon Keyspaces


**Correct Answer:** ✅ Amazon Keyspaces

**Explanation:** **Amazon Keyspaces (for Apache Cassandra)** is a scalable, highly available, and managed Apache Cassandra-compatible database service. Since it is serverless, you don't have to worry about provisioning, patching, or managing servers. It allows you to run your Cassandra workloads on AWS using the same **Cassandra Query Language (CQL)** code and developer tools that you use today, making it the ideal migration target for on-premises Cassandra clusters.

## Question 17

A company has an on-premises website that uses ReactJS as its frontend, NodeJS as its backend, and MongoDB for the database. There are some issues with the self-hosted MongoDB database as there is a lot of maintenance required and they don’t have and can’t afford the resources or experience to handle those issues. So, a decision was made to migrate the website to AWS. They have decided to host the frontend ReactJS application in an S3 bucket and the NodeJS backend on a set of EC2 instances. Which AWS service can they use to migrate the MongoDB database that provides them with high scalability and availability without making any code changes?

[ ] Amazon ElastiCache

[ ] Amazon DocumentDB

[ ] Amazon Neptune

[ ] Amazon RDS for MongoDB


**Correct Answer:** ✅ Amazon DocumentDB

**Explanation:** **Amazon DocumentDB (with MongoDB compatibility)** is a fully managed native JSON document database service. It is designed to be compatible with your existing MongoDB drivers and tools. Since the requirement is to migrate without making code changes and to reduce the maintenance burden (patching, backups, scaling), DocumentDB is the perfect fit. It scales storage automatically up to 64 TiB and supports millions of requests per second. 

> **Note:** "Amazon RDS for MongoDB" does not exist as a managed service; RDS supports relational engines like MySQL, PostgreSQL, and SQL Server.

## Question 18

An online payment company is using AWS to host its infrastructure. Due to the application’s nature, they have a strict requirement to store an accurate record of financial transactions such as credit and debit transactions. Those transactions must be stored in secured, immutable, encrypted storage which can be cryptographically verified. Which AWS service is best suited for this use case?

[ ] Amazon DocumentDB

[ ] Amazon Aurora

[ ] Amazon QLDB

[ ] Amazon Neptune


**Correct Answer:** ✅ Amazon QLDB

**Explanation:** **Amazon QLDB (Quantum Ledger Database)** is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log. Unlike traditional databases where data can be overwritten or deleted, QLDB tracks every single change to your data and maintains a complete, verifiable history of changes over time. This makes it the perfect fit for banking, finance, and supply chain applications where you need an authoritative "system of record" that proves no data has been tampered with.

## Question 19

You have a set of files, 100MB each, that you want to store in a reliable and durable key-value store. Which AWS service do you recommend?

[ ] Amazon Aurora

[ ] Amazon S3

[ ] Amazon DynamoDB

[ ] Amazon ElastiCache


**Correct Answer:** ✅ Amazon S3

**Explanation:** While **Amazon DynamoDB** is a "key-value" database, it has a strict item size limit of **400 KB**. Since your files are **100 MB** each, they far exceed what DynamoDB can handle. **Amazon S3** is an object store that functions as a key-value store (the "Key" is the prefix/filename and the "Value" is the file content itself) and can store objects up to **5 TB** in size. It offers 99.999999999% (11 9's) of durability, making it the most reliable and cost-effective choice for large files.

## Question 20

Which database helps you store relational datasets, with SQL language compatibility and the capability of processing transactions such as insert, update, and delete?

[ ] Amazon DocumentDB

[ ] Amazon RDS

[ ] Amazon DynamoDB

[ ] Amazon ElastiCache


**Correct Answer:** ✅ Amazon RDS

**Explanation:** **Amazon RDS (Relational Database Service)** is the primary AWS service for relational datasets. It supports popular SQL engines like **MySQL, PostgreSQL, MariaDB, Oracle, and Microsoft SQL Server**. It is specifically designed for **OLTP (Online Transaction Processing)**, allowing you to perform standard SQL operations like `INSERT`, `UPDATE`, and `DELETE` while maintaining ACID compliance (Atomicity, Consistency, Isolation, Durability) for your transactions.

## Question 21

You want to migrate an on-premises MongoDB NoSQL database to AWS. You don't want to manage any database servers, so you want to use a managed NoSQL Serverless database, that provides you with high availability, durability, and reliability, and the capability to take your database global. Which database should you choose?

[ ] Amazon RDS

[ ] Amazon DynamoDB

[ ] Amazon DocumentDB

[ ] Amazon Aurora


**Correct Answer:** ✅ Amazon DynamoDB

**Explanation:** While **Amazon DocumentDB** is MongoDB-compatible, it is not "Serverless" in the same way **Amazon DynamoDB** is (DocumentDB requires you to choose instance types for its clusters). DynamoDB is a truly serverless, NoSQL database that:
* **No Server Management:** You don't manage instances or clusters.
* **Global Tables:** Provides the capability to go global with multi-region, multi-active replication.
* **Scalability:** It scales to support any workload with consistent single-digit millisecond performance.
* **High Availability:** It is highly available and durable by default, replicating data across three Availability




