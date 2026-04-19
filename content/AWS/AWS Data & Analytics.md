---
title: AWS Data & Analytics Quiz
tags: [aws, aws-redshift, aws-athena, aws-opensearch, aws-glue, aws-quicksight, aws-emr, aws-apache-flink, aws-msk]
difficulty: medium
date: 2026-04-12
---

## Question 1

Which feature in Redshift forces all COPY and UNLOAD traffic moving between your cluster and data repositories through your VPCs?


[ ] Enhanced VPC Routing


[ ] Improved VPC Routing


[ ] Redshift Spectrum


**Correct Answer:** ✅ Enhanced VPC Routing

**Explanation:** By default, **Amazon Redshift** routes `COPY` and `UNLOAD` traffic through the internet to reach other AWS services like S3. When you enable **Enhanced VPC Routing**, Redshift forces all such traffic through your **VPC** instead. This allows you to use VPC features—such as Security Groups, Network ACLs, and VPC Endpoints—to manage and secure data movement. It is a critical feature for compliance and security-sensitive workloads that require data to stay within a private network.

## Question 2

Which AWS Glue feature allows you to save and track the data that has already been processed during a previous run of a Glue ETL job?


[ ] Glue Job Bookmarks


[ ] Glue Elastic Views


[ ] Glue Streaming ETL


[ ] Glue DataBrew


**Correct Answer:** ✅ Glue Job Bookmarks

**Explanation:** **AWS Glue Job Bookmarks** are used to maintain state information and prevent the reprocessing of old data. When a Glue ETL job runs, the bookmark tracks the source data (like files in S3 or partitions in a database) that has been processed. In the next execution, the job uses the bookmark to identify and process only the new data added since the last successful run. This is essential for building efficient, incremental ETL pipelines.

## Question 3

……………………….. makes it easy and cost-effective for data engineers and analysts to run applications built using open source big data frameworks such as Apache Spark, Hive, or Presto without having to operate or manage clusters.


[ ] AWS Lambda


[ ] Amazon EMR


[ ] Amazon Athena


[ ] Amazon OpenSearch Service


**Correct Answer:** ✅ Amazon EMR

**Explanation:** **Amazon EMR (Elastic MapReduce)** is the industry-leading cloud big data platform for processing vast amounts of data using open-source tools such as **Apache Spark, Hive, HBase, Flink, and Presto**. While EMR originally started with managed EC2 clusters, it now offers **EMR Serverless**, which allows you to run these frameworks without having to configure, optimize, or manage the underlying clusters at all. It automatically scales resources up and down based on the application's requirements.

## Question 4

An AWS service allows you to create, run, and monitor ETL (extract, transform, and load) jobs in a few clicks.


[ ] AWS Glue


[ ] Amazon Redshift


[ ] Amazon RDS


[ ] Amazon DynamoDB


**Correct Answer:** ✅ AWS Glue

**Explanation:** **AWS Glue** is a fully managed, serverless ETL (Extract, Transform, and Load) service that makes it simple and cost-effective to categorize your data, clean it, enrich it, and move it reliably between various data stores. It consists of a central metadata repository known as the **AWS Glue Data Catalog**, an ETL engine that automatically generates Python or Scala code, and a flexible scheduler that handles dependency resolution, job monitoring, and retries.

## Question 5

An e-commerce company has all its historical data such as orders, customers, revenues, and sales for the previous years hosted on a Redshift cluster. There is a requirement to generate some dashboards and reports indicating the revenues from the previous years and the total sales, so it will be easy to define the requirements for the next year. The DevOps team is assigned to find an AWS service that can help define those dashboards and have native integration with Redshift. Which AWS service is best suited?


[ ] Amazon OpenSearch Service


[ ] Amazon Athena


[ ] Amazon QuickSight


[ ] Amazon EMR


**Correct Answer:** ✅ Amazon QuickSight

**Explanation:** **Amazon QuickSight** is a fast, cloud-powered business intelligence (BI) service that makes it easy to deliver insights to everyone in your organization. It has native integration with **Amazon Redshift**, allowing you to point to your cluster and start building interactive dashboards, performing ad-hoc analysis, and generating reports. QuickSight also features **SPICE** (Super-fast, Parallel, In-memory Calculation Engine), which allows you to perform advanced calculations and serve data rapidly without putting additional load on your Redshift cluster.

## Question 6

You have a lot of log files stored in an S3 bucket that you want to perform a quick analysis, if possible Serverless, to filter the logs and find users that attempted to make an unauthorized action. Which AWS service allows you to do so?


[ ] Amazon DynamoDB


[ ] Amazon Redshift


[ ] S3 Glacier


[ ] Amazon Athena


**Correct Answer:** ✅ Amazon Athena

**Explanation:** **Amazon Athena** is an interactive, serverless query service that makes it easy to analyze data directly in **Amazon S3** using standard SQL. There is no need for complex ETL jobs to prepare your data; you simply point Athena at your S3 bucket, define a schema, and start querying. This is the ideal tool for log analysis (such as CloudTrail logs, VPC Flow Logs, or access logs) because it allows you to filter and search through terabytes of data quickly while only paying for the queries you run.

## Question 7

You have an on-premises application that is used together with an on-premises Apache Kafka to receive a stream of clickstream events from multiple websites. You have been tasked to migrate this application as soon as possible without any code changes. You decided to host the application on an EC2 instance. What is the best option you recommend to migrate Apache Kafka?


[ ] Kinesis Data Streams


[ ] AWS Glue


[ ] Amazon MSK


[ ] Kinesis Data Analytics


**Correct Answer:** ✅ Amazon MSK

**Explanation:** **Amazon MSK (Managed Streaming for Apache Kafka)** is a fully managed service that makes it easy to build and run applications that use Apache Kafka to process streaming data. Because it uses native Apache Kafka, it is fully compatible with your existing Kafka tools and code. This allows for a "lift-and-shift" migration where you can move your workload to AWS without rewriting your producers or consumers, which satisfies the requirement of making **no code changes**.

## Question 8

You are running a gaming website that is using DynamoDB as its data store. Users have been asking for a search feature to find other gamers by name, with partial matches if possible. Which AWS technology do you recommend to implement this feature?


[ ] Amazon DynamoDB


[ ] Amazon Redshift


[ ] Amazon OpenSearch Service


[ ] Amazon Neptune


**Correct Answer:** ✅ Amazon OpenSearch Service

**Explanation:** While **Amazon DynamoDB** is excellent for key-value lookups, it is not optimized for complex search patterns like partial matches (fuzzy search) or full-text search across large datasets. **Amazon OpenSearch Service** (the successor to Amazon Elasticsearch Service) is specifically designed for high-performance search and analytics. It allows you to perform advanced queries, including prefix matching, "contains" searches, and ranking results by relevance. 

In a typical architecture, you would use **DynamoDB Streams** and an **AWS Lambda** function to automatically sync data from your DynamoDB table to OpenSearch, enabling powerful search capabilities on your gamer profiles.

## Question 9

A company is using AWS to host its public websites and internal applications. Those different websites and applications generate a lot of logs and traces. There is a requirement to centrally store those logs and efficiently search and analyze those logs in real-time for detection of any errors and if there is a threat. Which AWS service can help them efficiently store and analyze logs?


[ ] Amazon S3

[x] Amazon OpenSearch Service

[ ] Amazon ElastiCache

[ ] Amazon QLDB

**Correct Answer:** ✅ Amazon OpenSearch Service

**Explanation:** **Amazon OpenSearch Service** (the successor to Amazon Elasticsearch Service) is the go-to service for **log analytics** and real-time application monitoring. It allows you to ingest massive amounts of log data from various sources (via CloudWatch Logs, Kinesis Data Firehose, or Managed Service for Kafka) and provides powerful, near real-time search capabilities. With its integrated **OpenSearch Dashboards** (formerly Kibana), you can visualize errors, track performance metrics, and set up alerts for security threats or system failures.

## Question 10

You would like to have a database that is efficient at performing analytical queries on large sets of columnar data. You would like to connect to this Data Warehouse using a reporting and dashboard tool such as Amazon QuickSight. Which AWS technology do you recommend?


[ ] Amazon RDS

[ ] Amazon S3

[x] Amazon Redshift

[ ] Amazon Neptune

**Correct Answer:** ✅ Amazon Redshift

**Explanation:** **Amazon Redshift** is a fully managed, petabyte-scale **Data Warehouse** service. Unlike traditional relational databases (RDS) that store data in rows, Redshift uses **columnar storage**, which is highly efficient for complex analytical queries (OLAP) because it reduces the amount of data loaded from disk. It integrates seamlessly with BI tools like **Amazon QuickSight**, allowing you to run high-performance queries across massive datasets to generate business insights and dashboards.


## Question 11

As a Solutions Architect, you have been instructed to prepare a disaster recovery plan for a Redshift cluster. What should you do?


[ ] Enable Multi-AZ

[x] Enable Automated Snapshots, then configure your Redshift cluster to automatically copy snapshots to another AWS region

[ ] Take a snapshot then restore to a Redshift Global cluster

**Correct Answer:** ✅ Enable Automated Snapshots, then configure your Redshift cluster to automatically copy snapshots to another AWS region

**Explanation:** **Amazon Redshift** does not support a "Global Cluster" feature in the same way Aurora does. For a robust **Disaster Recovery (DR)** plan, you should use **Cross-Region Snapshot Copy**. By enabling automated snapshots and configuring them to be copied to a secondary AWS region, you ensure that even if an entire AWS region goes down, your data is safe and can be restored into a new cluster in the destination region.

## Question 12

You have data stored in RDS, S3 buckets and you are using AWS Lake Formation as a data lake to collect, move and catalog data so you can do some analytics. You have a lot of big data and ML engineers in the company and you want to control access to part of the data as it might contain sensitive information. What can you use?


[x] Lake Formation Fine-grained Access Control

[ ] Amazon Cognito

[ ] AWS Shield

[ ] S3 Object Lock

**Correct Answer:** ✅ Lake Formation Fine-grained Access Control

**Explanation:** **AWS Lake Formation** simplifies the process of setting up a data lake, but its standout feature for security is **Fine-grained Access Control**. Unlike standard S3 bucket policies which are often "all or nothing," Lake Formation allows you to define permissions at the **database, table, column, row, and even cell level**. This ensures that your ML engineers can access the datasets they need for training models while sensitive information (like PII) remains restricted to only those with specific authorization.

## Question 13

You are a DevOps engineer in a machine learning company which 3 TB of JSON files stored in an S3 bucket. There’s a requirement to do some analytics on those files using Amazon Athena and you have been tasked to find a way to convert those files’ format from JSON to Apache Parquet. Which AWS service is best suited?


[ ] S3 Object Versioning

[ ] Kinesis Data Streams

[ ] Amazon MSK

[x] AWS Glue

**Correct Answer:** ✅ AWS Glue

**Explanation:** **AWS Glue** is the ideal service for this task because it is a serverless ETL (Extract, Transform, Load) service designed specifically for data preparation. Converting 3 TB of JSON to **Apache Parquet** is a common use case; Parquet is a columnar storage format that is much more efficient for services like **Amazon Athena** to query, as it reduces both the amount of data scanned and the associated costs. You can use a Glue ETL job to point to the S3 source, perform the format conversion, and write the output back to a target S3 bucket.

## Question 14

Which AWS service is most appropriate when you want to perform real-time analytics on streams of data?


[ ] Amazon SQS

[ ] Amazon SNS

[x] Amazon Kinesis Data Analytics

[ ] Amazon Kinesis Data Firehose

**Correct Answer:** ✅ Amazon Kinesis Data Analytics

**Explanation:** **Amazon Kinesis Data Analytics** (now largely integrated into **Amazon Managed Service for Apache Flink**) is specifically designed to process and analyze streaming data in real-time. It allows you to use SQL or Java/Scala (via Apache Flink) to perform complex analytics—such as sliding time windows, filtering, and aggregations—as the data flows through the pipeline. While Kinesis Data Firehose is used for *loading* data streams into data stores, Kinesis Data Analytics is the engine used for *analyzing* that data before it reaches its destination.



