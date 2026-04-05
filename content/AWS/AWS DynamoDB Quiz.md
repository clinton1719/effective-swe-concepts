---
title: AWS DynamoDB Quiz
tags: [aws, dynamoDb]
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
