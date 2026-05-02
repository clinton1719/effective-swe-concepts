---
title: AWS Disaster Recovery & Migration Quiz
tags: [aws, DMS, aws-application-migration-services]
difficulty: medium
date: 2026-05-02
---

## Question 1

You would like to get the Disaster Recovery strategy with the lowest Recovery Time Objective (RTO) and Recovery Point Objective (RPO), regardless of the cost. Which DR should you choose?

[ ] Backup and Restore

[ ] Pilot Light

[ ] Warm Standby

[ ] ✅ **Multi-Site**

**Correct Answer:** ✅ **Multi-Site**

**Explanation:** Disaster Recovery (DR) strategies exist on a spectrum where cost is directly proportional to how quickly you can recover.

*   **Multi-Site (Active-Active):** This is the most robust and expensive option. Your application is fully functional and running in two or more AWS Regions simultaneously. Traffic is distributed across these regions (typically using Route 53). If one region fails, the other is already live and capable of handling the full load. This results in an **RPO and RTO of near zero**.
*   **Warm Standby:** A scaled-down but functional version of your environment is always running in a secondary region. In a disaster, you must scale up the resources, leading to an RTO of minutes.
*   **Pilot Light:** Only the critical "heart" of the infrastructure is running (usually the database with live replication). Application servers are only provisioned during a disaster, leading to a higher RTO than Warm Standby.
*   **Backup and Restore:** This is the cheapest method. Data is backed up, and in the event of a disaster, the entire infrastructure must be redeployed and data restored. This has the highest RTO/RPO.



---

### Comparison Table

| Strategy | RPO/RTO | Cost | Recovery Method |
| :--- | :--- | :--- | :--- |
| **Backup & Restore** | Hours | $ | Restore from backups |
| **Pilot Light** | 10s of Minutes | $$ | Start dormant services |
| **Warm Standby** | Minutes | $$$ | Scale up small environment |
| **Multi-Site** | **Seconds** | **$$$$** | **Already running (Active-Active)** |

## Question 2

A company is using RDS for MySQL as their main database but, lately they have been facing issues in managing the database, performance issues, and the scalability. And they have decided to use Aurora for MySQL instead for better performance, less complexity and less administrative tasks required. What is the best way and most cost-effective way to migrate from RDS for MySQL to Aurora for MySQL?

[ ] Raise an AWS support ticket to do the migration as it is not supported

[ ] Create a database dump from RDS from MySQL, store it in an S3 bucket, then restore it to Aurora for MySQL

[ ] You can not migrate directly to Aurora for MySQL, you have to create a custom application to insert the data manually

[ ] ✅ **Create a snapshot from RDS for MySQL and restore it to Aurora for MySQL**

**Correct Answer:** ✅ **Create a snapshot from RDS for MySQL and restore it to Aurora for MySQL**

**Explanation:** AWS provides a native and highly efficient path to migrate from a standard RDS MySQL instance to an Aurora MySQL cluster.

*   **The Snapshot Method:** This is the most straightforward and cost-effective approach for many scenarios. You simply take a DB snapshot of your existing RDS MySQL instance and then choose the option to **"Migrate Snapshot"** to Aurora. AWS handles the underlying data conversion and creates a new Aurora cluster based on that data.
*   **Alternative (Aurora Read Replica):** For production environments that require **minimal downtime**, you can also create an **Aurora Read Replica** of your RDS MySQL instance. Once the replica is synchronized with the primary, you "promote" the replica to be a standalone Aurora cluster.
*   **Why the others are incorrect:**
    *   **AWS Support Ticket:** Migration is a self-service feature; you don't need a support ticket to perform it.
    *   **S3 Dump/Restore:** While possible (using tools like `mysqldump` or Percona XtraBackup), this is much more complex, manual, and time-consuming than the native snapshot migration tool.
    *   **Custom Application:** This is unnecessary and extremely inefficient compared to the built-in AWS migration tools.


## Question 3

A company planning to migrate its existing websites, applications, servers, virtual machines, and data to AWS. They want to do a lift-and-shift migration with minimum downtime and reduced costs. Which AWS service can help in this scenario?

[ ] AWS Database Migration Service

[ ] ✅ **AWS Application Migration Service**

[ ] AWS Backup

[ ] AWS Schema Conversion Tool

**Correct Answer:** ✅ **AWS Application Migration Service (MGN)**

**Explanation:** **AWS Application Migration Service (AWS MGN)** is the primary service recommended for **lift-and-shift** (rehosting) migrations to AWS.

*   **How it works:** It uses continuous, block-level data replication. You install an agent on your source servers (physical or virtual), and it replicates the data into a staging area in your AWS account. 
*   **Minimum Downtime:** Because the replication is continuous and happens while the source server is still running, the actual "cutover" to AWS typically takes only a few minutes, minimizing downtime.
*   **Automation:** It automates the conversion of your source servers so they can run natively on AWS EC2, which reduces manual effort and costs.
*   **Broad Support:** It supports a wide range of operating systems and applications, making it ideal for migrating entire "stacks" (servers, VMs, and data).

**Why the others are incorrect:**
*   **AWS Database Migration Service (DMS):** This is specifically for migrating **databases** (e.g., Oracle to RDS). It does not migrate web servers, applications, or full virtual machines.
*   **AWS Schema Conversion Tool (SCT):** This is used alongside DMS to convert database schemas when switching engines (e.g., SQL Server to PostgreSQL).
*   **AWS Backup:** This is a centralized backup service to protect data *already* in AWS or on-premises; it is not a primary migration tool for lift-and-shift projects.

## Question 4

You want to make a Disaster Recovery plan where you have a scaled-down version of your system up and running, and when a disaster happens, it scales up quickly. Which DR strategy should you choose?

[ ] Backup and Restore

[ ] Pilot Light

[ ] ✅ **Warm Standby**

[ ] Multi-Site

**Correct Answer:** ✅ **Warm Standby**

**Explanation:** The key phrase in this scenario is **"scaled-down version... up and running."** 

*   **Warm Standby:** In this strategy, a smaller, "minimum-viable" version of your entire application environment is always running in the secondary region. It is already handling a small amount of traffic or is ready to do so immediately. When a disaster occurs, you simply scale up your Auto Scaling Groups and increase the capacity of your databases to handle the full production load.
*   **The "Warm" Difference:** Unlike "Pilot Light" (where application servers are usually off or not even provisioned), a Warm Standby environment has functional servers already active, which allows for a faster **Recovery Time Objective (RTO)**.



**Why the others are incorrect:**
*   **Backup and Restore:** There is no "scaled-down version" running; you are simply storing data that must be redeployed from scratch.
*   **Pilot Light:** Only the data is kept live (the "pilot light"). The application servers are kept "off" or as AMIs and are only started during a disaster. 
*   **Multi-Site:** This is a full-capacity, active-active setup, not a "scaled-down" version. 
---

## Question 5

Which AWS service can you use to automate the backup across different AWS services such as RDS, DynamoDB, Aurora, and EFS file systems, and EBS volumes?

[ ] Amazon S3 Lifecycle Policy

[ ] AWS DataSync

[ ] ✅ **AWS Backup**

[ ] Amazon Glacier

**Correct Answer:** ✅ **AWS Backup**

**Explanation:** **AWS Backup** is a fully managed, policy-based service that centralizes and automates the protection of your data across AWS services in the cloud and on-premises.

*   **Centralized Control:** Instead of managing backups individually for EBS, RDS, or DynamoDB, you can create a single **Backup Plan** that governs all of them from one dashboard.
*   **Policy-Driven:** You can define a schedule (e.g., daily at 2:00 AM) and retention rules (e.g., delete after 30 days) that AWS Backup applies automatically to tagged resources.
*   **Compliance:** It supports features like **AWS Backup Audit Manager**, which helps you track your backup activity to meet regulatory requirements.
*   **Breadth of Support:** It covers **EBS volumes**, **RDS** (including **Aurora**), **DynamoDB**, **EFS**, **FSx**, **S3**, and even **Storage Gateway** volumes.

**Why the others are incorrect:**
*   **Amazon S3 Lifecycle Policy:** This is used to manage the transition and expiration of objects *already in* an S3 bucket; it cannot reach out to trigger backups for an RDS database or an EBS volume.
*   **AWS DataSync:** This is a data transfer service designed to move large amounts of data between on-premises storage and AWS (or between AWS services), not a backup orchestration tool.
*   **Amazon Glacier:** This is a cold storage *class* within S3 meant for long-term archiving. It is a destination for data, not the engine that automates the backup process across the AWS ecosystem.

## Question 6

As part of your Disaster Recovery plan, you would like to have only the critical infrastructure up and running in AWS. You don't mind a longer Recovery Time Objective (RTO). Which DR strategy do you recommend?

[ ] Backup and Restore

[ ] ✅ **Pilot Light**

[ ] Warm Standby

[ ] Multi-Site

**Correct Answer:** ✅ **Pilot Light**

**Explanation:** The "Pilot Light" strategy is designed for scenarios where you want to keep costs low by only maintaining the "glowing embers" of your application in a standby region.

*   **Core Concept:** You keep your most critical data live and synchronized (usually the database). However, the rest of your infrastructure—like application servers, web servers, and load balancers—are not running. They might exist as AMIs (Amazon Machine Images) or code templates (CloudFormation/Terraform) ready to be provisioned.
*   **Recovery Process:** When a disaster occurs, you "turn up the flame" by provisioning the application tier based on those AMIs. Because you have to start or create these resources from scratch, the **RTO is longer** (usually tens of minutes to a few hours) compared to Warm Standby.
*   **Why it fits:** It perfectly matches your requirement of having only **critical infrastructure** (the data) up and running while accepting a **longer RTO**.


**Why the others are incorrect:**
*   **Backup and Restore:** This has the longest RTO because nothing is "up and running." You have to restore data from S3 and then build the entire stack.
*   **Warm Standby:** This involves having a "scaled-down" but fully functional version of the *entire* stack running at all times. It has a shorter RTO than Pilot Light.
*   **Multi-Site:** This is an active-active setup where the full production environment is running in two places at once. It has the shortest RTO but is the most expensive.

## Question 7

You have an on-premises Oracle database that you want to migrate to AWS, specifically to Amazon Aurora. How would you do the migration?

[ ] ✅ **Use AWS Schema Conversion Tool (AWS SCT) to convert the database schema, then use AWS Database Migration Service (AWS DMS) to migrate the data**

[ ] Use AWS Database Migration Service (AWS DMS) to convert the database schema, then use AWS Schema Conversion Tool (AWS SCT) to migrate the data

**Correct Answer:** ✅ **Use AWS Schema Conversion Tool (AWS SCT) to convert the database schema, then use AWS Database Migration Service (AWS DMS) to migrate the data**

**Explanation:** When migrating between **different database engines** (Heterogeneous migration), such as Oracle to Aurora (MySQL or PostgreSQL compatible), you must follow a two-step process:

1.  **SCT (Schema Conversion Tool):** Because the source and target speak different "languages," you first use SCT to analyze the Oracle schema and convert the database objects (tables, indexes, views, stored procedures) into a format compatible with Aurora.
2.  **DMS (Database Migration Service):** Once the target structure (the "schema") is ready, you use DMS to move the actual data from the source Oracle database to the target Aurora database. DMS can also handle ongoing replication to keep them in sync during the migration process.

**Why the second option is incorrect:**
AWS DMS is primarily designed for data movement and replication. While it can create basic table structures, it does not have the capability to perform complex schema conversions (like converting PL/SQL to a different procedural language). That logic is strictly the job of the **Schema Conversion Tool**.

## Question 8

You are running many resources in AWS such as EC2 instances, EBS volumes, DynamoDB tables... You want an easy way to manage backups across all these AWS services from a single place. Which AWS offering makes this process easy?

[ ] Amazon S3

[ ] AWS Storage Gateway

[ ] ✅ **AWS Backup**

[ ] EC2 Snapshots

**Correct Answer:** ✅ **AWS Backup**

**Explanation:** **AWS Backup** is specifically designed as a centralized backup management service to consolidate backup tasks that were previously dispersed across different service consoles.

*   **Centralized Management:** It provides a single "pane of glass" where you can create backup policies (Backup Plans), monitor backup activity, and ensure compliance across your entire AWS environment.
*   **Automation:** You can automate the lifecycle of your backups, including their creation, retention periods, and even transitioning older backups to cheaper cold storage.
*   **Broad Integration:** It acts as an umbrella service that coordinates backups for **EBS**, **EC2**, **RDS**, **DynamoDB**, **EFS**, **FSx**, **S3**, and **AWS Storage Gateway**.

**Why the others are incorrect:**
*   **Amazon S3:** While S3 is often the *destination* where backups are stored, it is a storage service, not a backup management orchestrator.
*   **AWS Storage Gateway:** This is a hybrid cloud storage service that gives on-premises applications access to virtually unlimited cloud storage. It is not used to manage backups for native AWS resources like DynamoDB.
*   **EC2 Snapshots:** These are specific to EBS volumes and EC2. While they are a form of backup, they do not provide a way to manage backups for other services like DynamoDB or EFS from a single place.


## Question 9

A company is using VMware on its on-premises data center to manage its infrastructure. There is a requirement to extend their data center and infrastructure to AWS but keep using the technology stack they are using which is VMware. Which AWS service can they use?

[ ] ✅ **VMware Cloud on AWS**

[ ] AWS DataSync

[ ] AWS Application Migration Service

[ ] AWS Application Discovery Service

**Correct Answer:** ✅ **VMware Cloud on AWS**

**Explanation:** **VMware Cloud on AWS** is the specific service designed for hybrid cloud scenarios where a company wants to use the same VMware software-defined data center (SDDC) stack they use on-premises, but running on AWS bare-metal infrastructure.

*   **Consistency:** It allows IT teams to manage their AWS resources using the same **vCenter** console they already use for their on-premises environment.
*   **Hybrid Extension:** It is ideal for "extending" a data center because it allows for seamless workload portability (using vMotion) between on-premises and AWS without having to refactor or rewrite applications.
*   **Best of Both Worlds:** You get the familiarity of VMware combined with the scalability and reach of the AWS global infrastructure.

**Why the others are incorrect:**
*   **AWS DataSync:** This is a data transfer service for moving files/objects between on-premises storage and AWS storage (like S3 or EFS). It does not provide a platform to run VMware virtual machines.
*   **AWS Application Migration Service (MGN):** This is used to migrate (rehost) servers to native AWS EC2 instances. It converts the VMs into EC2 format, which changes the technology stack.
*   **AWS Application Discovery Service:** This is a planning tool that helps you gather information about your on-premises data center (dependencies and performance) before a migration. It does not run or extend the infrastructure itself.


## Question 10

Which of the following Disaster Recovery strategies has a potentially high Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?

[ ] ✅ **Backup and Restore**

[ ] Pilot Light

[ ] Warm Standby

[ ] Multi-Site

**Correct Answer:** ✅ **Backup and Restore**

**Explanation:** In the context of AWS Disaster Recovery, the "High" in RPO and RTO refers to the amount of time elapsed—meaning it takes the **longest** to recover and involves the **most** potential data loss.

*   **Backup and Restore:** This is the most traditional and manual approach. Because you are only saving data backups (to S3, for example), you have no infrastructure running in the DR region. 
    *   **High RTO:** To recover, you must provision all servers, install software, and restore the data. This process can take hours or even days.
    *   **High RPO:** If you only take backups once every 24 hours, and a disaster occurs 23 hours after the last backup, you lose nearly a full day's worth of data.
*   **Comparison:** As you move toward **Multi-Site**, the RTO and RPO decrease (becoming "Low" or "Near Zero"), but the complexity and cost increase significantly.

**Summary of the DR Spectrum:**
*   **Backup & Restore:** High RPO/RTO | Lowest Cost
*   **Pilot Light:** Medium RPO/RTO | Low Cost
*   **Warm Standby:** Low RPO/RTO | Medium Cost
*   **Multi-Site:** Near-Zero RPO/RTO | Highest Cost