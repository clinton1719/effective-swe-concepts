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



## Question 22

You have set up read replicas on your RDS database, but users are complaining that upon updating their social media posts, they do not see their updated posts right away. What is a possible cause for this?

[ ] There must be a bug in your application

[ ] Read Replicas have Asynchronous Replication, therefore it's likely your users will only read Eventual Consistency

[ ] You should have setup Multi-AZ instead

**Correct Answer:** Read Replicas have Asynchronous Replication, therefore it's likely your users will only read Eventual Consistency

### Explanation
This scenario illustrates the trade-off between performance and consistency in distributed database systems, specifically regarding **Replication Lag**.

*   **Asynchronous Replication:** RDS Read Replicas use an asynchronous mechanism where the primary database instance writes data to its local storage and acknowledges the transaction to the application *before* the data is sent to the replica.
*   **Eventual Consistency:** Because the replication happens after the write, there is a time delay (lag). If an application writes a post to the primary and immediately tries to read it from a replica, the replica might not have received the update yet.
*   **Replication Lag Metric:** You can monitor the `ReplicaLag` metric in CloudWatch. Lag can increase due to high write volume on the primary, network latency, or insufficient instance sizing on the replica.
*   **Read-After-Write Consistency:** To ensure a user sees their own update immediately, the application logic should be designed to read highly critical or recently updated data from the **Primary (Writer) Endpoint** rather than the Reader endpoint.

### Comparison: Multi-AZ vs. Read Replicas
| Feature | Multi-AZ (High Availability) | Read Replicas (Scalability) |
| :--- | :--- | :--- |
| **Replication Type** | Synchronous | Asynchronous |
| **Primary Purpose** | Disaster Recovery / Fault Tolerance | Scaling Read-heavy workloads |
| **Consistency** | Strong Consistency | Eventual Consistency |
| **Active Use** | Standby is passive (cannot be read) | Replicas are active (can be read) |
| **Scope** | Regional (Across AZs) | Within Region or Cross-Region |

### Note
> While Multi-AZ provides synchronous replication, it does not solve this problem because the standby instance is not accessible for read traffic. It is strictly a failover target. To scale reads, you must use replicas and architect for eventual consistency.


## Question 23

You're planning for a new solution that requires a MySQL database that must be available even in case of a disaster in one of the Availability Zones. What should you use?

[ ] Create Read Replicas

[ ] Enable Encryption

[ ] Enable Multi-AZ

**Correct Answer:** Enable Multi-AZ

### Explanation
Amazon RDS Multi-AZ deployments provide high availability and failover support for DB instances. This is the standard "best practice" for production workloads requiring disaster recovery within a region.

*   **Synchronous Replication:** When Multi-AZ is enabled, RDS automatically provisions and maintains a synchronous "standby" replica in a different Availability Zone. Every write to the primary is synchronously replicated to the standby.
*   **Automatic Failover:** In the event of an AZ failure, primary instance failure, or even a planned maintenance event, RDS performs an automatic failover to the standby instance.
*   **DNS Endpoint Persistence:** The application continues to use the same DNS endpoint; RDS simply updates the CNAME record to point to the standby-turned-primary instance. This typically completes in 60-120 seconds.
*   **Disaster Recovery (DR):** Unlike Read Replicas, which are primarily for scaling, Multi-AZ is designed for durability and availability. It ensures no data loss during an AZ-level disaster because of its synchronous nature.

### Comparison: RDS High Availability vs. Scalability
| Feature | Multi-AZ (High Availability) | Read Replicas (Scalability) |
| :--- | :--- | :--- |
| **Replication** | Synchronous | Asynchronous |
| **Primary Goal** | Disaster Recovery / Fault Tolerance | Scaling read-heavy workloads |
| **Failover** | Automatic (managed by RDS) | Manual (must promote replica) |
| **Instance Use** | Standby is passive (not accessible) | Replicas are active (readable) |
| **Performance** | Slight write latency due to sync | Improved read throughput |

### Note
> To maximize availability, ensure your application is configured to handle the temporary connection loss during the 1-2 minute failover window (e.g., using a connection pooling library with retry logic).


## Question 24

You have an un-encrypted RDS DB instance and you want to create Read Replicas. Can you configure the RDS Read Replicas to be encrypted?

[ ] No

[ ] Yes

**Correct Answer:** No

### Explanation
In Amazon RDS, the encryption state of a Read Replica is strictly tied to the encryption state of the primary (source) DB instance. 

*   **Encryption Symmetry:** If the primary DB instance is unencrypted, you cannot create an encrypted Read Replica from it. Conversely, if the primary is encrypted, all Read Replicas must also be encrypted using the same or a different KMS key.
*   **Fundamental Rule:** You cannot "encrypt on the fly" during the creation of a Read Replica. Encryption at rest must be enabled at the time the DB instance is created.
*   **The Workaround (Migration Path):** To encrypt an existing unencrypted RDS instance, you must follow these specific steps:
    1.  Create a **Snapshot** of the unencrypted DB instance.
    2.  **Copy** that snapshot to a new snapshot while enabling **Encryption** during the copy process.
    3.  **Restore** a new DB instance from the encrypted snapshot.
    4.  Once the new encrypted primary is active, you can then create encrypted Read Replicas.

### Encryption Compatibility Matrix
| Source Instance State | Read Replica Capability | Action Required to Change |
| :--- | :--- | :--- |
| **Unencrypted** | Must be Unencrypted | Snapshot -> Copy (Encrypt) -> Restore |
| **Encrypted** | Must be Encrypted | Cannot be decrypted |
| **KMS Key Change** | Possible during Replica creation | Specify new KMS Key ID in Create call |

### Note
> While you cannot encrypt the storage of a replica if the master is unencrypted, you *can* and should ensure that **Encryption in Transit** (SSL/TLS) is enabled for the connection between the application and the database, regardless of the storage encryption state.

## Question 25

You have 100 EC2 instances connected to your RDS database and you see that upon a maintenance of the database, all your applications take a lot of time to reconnect to RDS, due to poor application logic. How do you improve this? 

[ ] Fix all the applications

[ ] Disable Multi-AZ 

[ ] Enable Multi-AZ

[ ] Use an RDS Proxy

**Correct Answer:** Use an RDS Proxy

### Explanation
**Amazon RDS Proxy** is a fully managed, highly available database proxy that makes applications more scalable, more resilient to database failures, and more secure.

*   **Connection Pooling:** Instead of every EC2 instance maintaining its own pool of idle connections, RDS Proxy pools and shares connections. This reduces the CPU and memory overhead on the database server caused by managing hundreds of open connections.
*   **Reduced Failover Time:** During a database failover (due to maintenance or failure), RDS Proxy automatically connects to the new standby instance while maintaining the application connection. This can reduce failover times by up to **79%** because the application does not need to perform a DNS lookup or renegotiate a new connection.
*   **Resiliency to Poor Logic:** If the application logic handles reconnection poorly (e.g., lack of exponential backoff or aggressive retry storms), RDS Proxy acts as a buffer, shielding the database from a "thundering herd" of reconnection requests.
*   **IAM Authentication:** RDS Proxy allows you to enforce IAM authentication for database access, keeping database credentials out of application configuration files.

### Comparison: Standard Connection vs. RDS Proxy
| Feature | Direct RDS Connection | Using RDS Proxy |
| :--- | :--- | :--- |
| **Failover Handling** | App must detect failure and re-resolve DNS. | Proxy manages failover; App connection stays open. |
| **Connection Limits** | Hard-capped by DB instance size (RAM). | Multiplexes many app connections to fewer DB connections. |
| **Scaling Impact** | High overhead for "thundering herd" events. | Smooths out spikes and maintains stable DB load. |
| **Authentication** | Database native (Username/Password). | Supports IAM and Secrets Manager integration. |

### Note
> While "Fix all the applications" is a valid long-term architectural goal, it is often impractical and time-consuming in large-scale environments. RDS Proxy provides an immediate infrastructure-level solution to application-level connection management deficiencies.


## Question 26

How can you enhance the security of your ElastiCache Redis Cluster by allowing users to access your ElastiCache Redis Cluster using their IAM Identities (e.g., Users, Roles)?

[ ] Using Redis Authentication

[ ] Using IAM Authentication

[ ] Use Security Groups

**Correct Answer:** Using IAM Authentication

### Explanation
Amazon ElastiCache for Redis supports **IAM Authentication** to simplify and secure the way users connect to the cluster. This replaces the traditional "Redis AUTH" password mechanism with temporary credentials managed by AWS.

*   **RBAC and IAM Integration:** You define **User Groups** and **Users** within ElastiCache (Role-Based Access Control) and map them to specific AWS IAM Users or Roles.
*   **Authentication Token:** Instead of a static password, applications use the AWS SDK to generate a signed **IAM Auth Token**. The Redis client uses this token to authenticate with the cluster.
*   **Centralized Security:** By using IAM, you can leverage centralized password policies, Multi-Factor Authentication (MFA), and audit trails via **AWS CloudTrail**.
*   **Credential Management:** This eliminates the need to store sensitive Redis passwords in application configuration files or environment variables.

### Comparison: ElastiCache Redis Access Control Methods
| Feature | Redis AUTH (Default) | IAM Authentication | Security Groups |
| :--- | :--- | :--- | :--- |
| **Primary Method** | Static Password (Secret) | IAM Identity / Signature | Network Filtering |
| **Granularity** | Basic (Level 1: AUTH) | High (User/Role mapping) | Coarse (IP/Port only) |
| **Secret Storage** | Required (e.g., Secrets Manager) | Not Required (IAM driven) | N/A |
| **Auditability** | Limited (Redis logs) | High (CloudTrail integration) | VPC Flow Logs only |

### Note
> To use IAM Authentication, your cluster must be running **Redis version 7.0 or above**. Older versions only support the standard `AUTH` command or simple Security Group isolation. Security Groups are still required at the network layer to allow traffic on port 6379, even when IAM Authentication is enabled.


## Question 27

How many Aurora Read Replicas can you have in a single Aurora DB Cluster?

[ ] 5

[ ] 10

[ ] 15

**Correct Answer:** 15

### Explanation
Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud that features a proprietary, distributed, log-structured storage subsystem. Its replication architecture differs significantly from standard RDS.

*   **Cluster Volume:** All replicas in an Aurora cluster share the same underlying storage volume. This eliminates the need for data to be physically copied to the replica's disk, significantly reducing replication lag (typically < 10ms).
*   **Scale-Out Capacity:** A single Aurora DB Cluster supports up to **15 Aurora Replicas** plus the primary (writer) instance, for a total of 16 instances.
*   **Reader Endpoint:** Aurora provides a single "Reader Endpoint" that automatically load-balances incoming read requests across all available replicas in the cluster.
*   **Auto Scaling:** Aurora supports **Auto Scaling** for replicas. You can define a target metric (like average CPU utilization), and Aurora will automatically add or remove replicas between 0 and 15 to match the load.
*   **Failover Priority:** Each replica is assigned a priority tier (0-15). In the event of a primary failure, Aurora promotes the replica with the highest priority (Tier 0 being the highest).

### Comparison: Aurora vs. Standard RDS Replication
| Feature | Aurora Replicas | RDS Read Replicas (MySQL/PostgreSQL) |
| :--- | :--- | :--- |
| **Max Replicas** | 15 | 5 (Up to 15 for some engines via cascading) |
| **Replication Type** | Asynchronous (Shared Storage) | Asynchronous (Binlog/Physical) |
| **Performance Impact** | Near-zero impact on primary | Can impact primary performance |
| **Replication Lag** | Milliseconds (Very low) | Seconds to Minutes (Variable) |
| **Load Balancing** | Native Cluster Reader Endpoint | Manual or Route 53 setup required |
| **Failover Target** | Yes (Automated) | No (Manual promotion required) |

### Note
> Because Aurora Replicas share the same storage as the primary instance, they do not incur additional storage costs—you only pay for the compute (instance hours) for each replica added. This makes them highly cost-effective for scaling read-heavy applications.


## Question 28

Which RDS database technology does NOT support IAM Database Authentication?

[ ] Oracle

[ ] PostgreSQL

[ ] MySQL

**Correct Answer:** Oracle

### Explanation
IAM Database Authentication allows you to authenticate to your DB instance using AWS Identity and Access Management (IAM) users and roles instead of a standard password. As of current AWS capabilities, this feature is only supported for specific engines.

*   **Supported Engines:** IAM Database Authentication is available for **MySQL** (5.6+), **MariaDB** (10.6+), and **PostgreSQL** (9.5+). It is also natively supported in **Amazon Aurora** (both MySQL and PostgreSQL editions).
*   **Unsupported Engines:** **Oracle** and **Microsoft SQL Server** do not currently support IAM Database Authentication. For these engines, you must use standard database native authentication or integrate with **Active Directory (AD)** using AWS Directory Service.
*   **Mechanism:** When enabled, your application requests a temporary **Authentication Token** from the RDS service (via the `generate-db-auth-token` API). This token has a lifetime of **15 minutes** and acts as the password for the connection.
*   **Connection Limits:** One critical architecting consideration is that IAM authentication is limited to approximately **200-256 new connections per second**, depending on the instance type. For applications with higher connection rates, **RDS Proxy** or standard password authentication is recommended.

### Comparison: RDS Authentication Methods
| Feature | IAM Database Auth | Native Database Auth | Active Directory (AD) |
| :--- | :--- | :--- | :--- |
| **Credential Type** | Temporary Token (15m) | Static Password | Domain User/Pass |
| **Management** | Centralized in IAM | Local to Database | Centralized in AD |
| **Supported on Oracle**| **No** | Yes | Yes (via Kerberos) |
| **Supported on MySQL** | Yes | Yes | No (RDS version dependent) |
| **Performance** | Lower (Token generation) | High | Medium |

### Note
> To implement IAM Authentication for supported engines, you must explicitly enable the `IAMDatabaseAuthenticationEnabled` attribute on the DB instance. Additionally, you must create a database user account (e.g., `CREATE USER 'iam_user' IDENTIFIED WITH AWSAuthenticationPlugin AS 'RDS';` for MySQL) to link the DB user to the IAM identity.


## Question 29

**Question:**
Because of the extensibility limitations of striped storage attached to Windows Server, Amazon RDS does not currently support increasing storage on a [...] DB Instance.

[ ] SQL Server

[ ] MySQL

[ ] Oracle

.

.

.

**Correct Answer:** SQL Server

---

### Why this is the correct answer:

Historically, Amazon RDS for **SQL Server** had specific storage modification restrictions due to how its underlying storage was provisioned on Windows Server environments. 

* **The Striping Limitation:** In older RDS architecture configurations, SQL Server DB instances utilized a striped storage volume layout attached to Windows Server. Because of the way Windows handled extending these specific striped volumes, RDS could not dynamically scale the storage size upward after creation without complex migration workarounds.
* **Context for Modern AWS Architecture:** It is worth noting that AWS has since introduced updates to newer generation RDS SQL Server instances to allow storage scaling. However, this question remains a classic AWS exam concept highlighting the legacy architectural dependency where **SQL Server** was the outlier compared to Linux-based engines like MySQL and Oracle (which natively supported online storage scaling much earlier).

### Why others are incorrect:
* **MySQL & Oracle:** Both of these database engines run on optimized Linux-based environments within Amazon RDS. Linux Logical Volume Manager (LVM) and filesystem architectures have long supported seamless, online volume extension without the specific striping limitations encountered on legacy Windows Server RDS deployments.

## Question 30

**Question:**
Amazon RDS supports SOAP only through [...].

[ ] HTTP or HTTPS.

[ ] TCP/IP.

[ ] HTTP.

[ ] HTTPS.

**Correct Answer:** HTTPS.

---

### Why this is the correct answer:

This question targets older, fundamental security mandates in legacy AWS API endpoints. 

* **Mandatory Transport Security:** Historically, when interacting with Amazon RDS via its Simple Object Access Protocol (SOAP) API interface, AWS strictly mandated that all SOAP requests use **HTTPS (Hypertext Transfer Protocol Secure)**. 
* **Data Encryption in Transit:** Because SOAP API requests pass sensitive configuration parameters and credentials (such as master database usernames or access keys), standard, unencrypted HTTP requests were rejected by default to guarantee the encryption and protection of data in transit.

> **Modern AWS Context:** AWS has deprecated SOAP API support across almost all services (including RDS) in favor of lightweight, secure **REST (Representational State Transfer)** API architectures and the **Query API**, which interact natively via the AWS CLI and SDKs. However, this legacy exam concept reinforces the hard requirement that secure data transport over **HTTPS** is non-negotiable for administrative operations.

### Why others are incorrect:
* **HTTP or HTTPS / HTTP:** Standard unencrypted HTTP was not permitted for SOAP interactions due to the lack of transit encryption.
* **TCP/IP:** TCP/IP is the foundational network layer protocol suite that handles connection routing, whereas SOAP is an application layer protocol that relies specifically on an application transport protocol like HTTP/HTTPS to function.


## Question 31

**Question:**
Which of the following services natively encrypts data at rest within an AWS region? (Choose 2 answers)

[ ] AWS Storage Gateway.

[ ] Amazon DynamoDB.

[ ] Amazon CloudFront.

[ ] Amazon Glacier.

[ ] Amazon Simple Queue Service.

.

.

.

**Correct Answers:** 

* Amazon DynamoDB
* Amazon Glacier

---

### Why these are the correct answers:

AWS designs certain managed data layer services to enforce **default, transparent encryption at rest** directly at the storage infrastructure tier. 

* **Amazon DynamoDB:** DynamoDB natively encrypts all tables at rest by default. This behavior cannot be disabled or turned off. It protects all internal database components—including tables, indexes, backups, and local streams—transparently using an internal AWS-owned key or a customer-provided KMS key.
* **Amazon Glacier:** All data stored directly inside Amazon Glacier (and S3 Glacier storage classes) is strictly encrypted at rest at the server side by default. AWS automatically handles data protection using unique keys evaluated through Advanced Encryption Standard 256-bit (**AES-256**) cyphers prior to writing archives to media.

---

### Why the others are incorrect:
* **AWS Storage Gateway:** While data stored in transit to AWS or inside the cloud is protected, the *on-premises hardware/virtual appliance cache* storage layer requires local management or hypervisor configurations to secure data locally at rest. 
* **Amazon CloudFront:** CloudFront is an edge-caching delivery network (CDN) rather than an regional storage engine. While it supports secure network transit (HTTPS), standard edge-caching files are transient and do not enforce mandatory storage-tier encryption configurations at rest by default.
* **Amazon Simple Queue Service (SQS):** SQS offers Server-Side Encryption (SSE) through AWS KMS integration, but it is **not mandatory or hardcoded natively** for standard queues. You must choose to explicitly enable and configure it per queue during creation or through update modifications.

## Question 32

**Question:**
When running my DB Instance as a Multi-AZ deployment, can I use the standby for read or write operations?
#bookmark

[ ] Yes.

[ ] Only with MSSQL based RDS.

[ ] Only for Oracle RDS instances.

[ ] No.

**Correct Answer:** No.

---

### Why this is the correct answer:

This question relates specifically to the core, standard **Amazon RDS Multi-AZ DB Instance** deployment model. 

* **High Availability, Not Scalability:** Standard Multi-AZ deployments are designed strictly for disaster recovery and high availability. AWS automatically provisions and maintains a synchronous standby replica in a separate Availability Zone. 
* **Passive Nature:** The standby database instance serves as a passive failover target. It does **not** accept connections, and you cannot perform read or write queries against it during normal operation. All active traffic goes directly to the primary instance.
* **Automatic Failover:** The standby only comes online and accepts traffic after being automatically promoted to the "primary" role during an infrastructure failure or planned maintenance event.

> **Modern Architectural Nuance:** To achieve high availability *plus* readable standbys, AWS introduced a separate option called **Multi-AZ DB Clusters** (supporting MySQL and PostgreSQL) which deploys one primary and two readable standby instances. However, for standard single-standby DB instance deployments, the standby remains completely unreadable and unwritable. If you need to scale read workloads, you must spin up **Read Replicas**.

### Why others are incorrect:
* **Yes:** This violates the core functionality of a traditional passive Multi-AZ standby replica.
* **Engine Specific Options (MSSQL / Oracle):** Neither Microsoft SQL Server nor Oracle engines allow active traffic on a standard RDS Multi-AZ standby instance; the restriction applies globally across all engines using the classic single-standby architecture.