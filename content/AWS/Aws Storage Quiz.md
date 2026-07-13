---
title: AWS Storage Quiz
tags: [aws, aws-storage, aws-s3]
difficulty: medium
date: 2026-03-29
---

## Question 1

A company uses a lot of files and data which is stored in an FSx for Windows File Server storage on AWS. Those files are currently used by the resources hosted on AWS. There’s a requirement for those files to be accessed on-premises with low latency. Which AWS service can help you achieve this?


[ ] S3 File Gateway


[ ] FSx for Windows File Server On-Premises


[ ] FSx File Gateway


[ ] Volume Gateway


**Correct Answer:** ✅ FSx File Gateway

**Explanation:** Amazon FSx File Gateway is a specialized version of AWS Storage Gateway that provides low-latency, on-premises access to fully managed FSx for Windows File Server file shares. It caches frequently accessed data locally on-premises, providing faster access while maintaining the primary storage in the cloud.

## Question 2

Which AWS service is best suited to migrate a large amount of data from an S3 bucket to an EFS file system?


[ ] AWS Snowball


[ ] AWS DataSync


[ ] AWS Transfer Family


[ ] AWS Backup


**Correct Answer:** ✅ AWS DataSync

**Explanation:** AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between AWS storage services. It is specifically designed to handle transfers between S3, EFS, and FSx with high performance, handling the underlying complexity of data encryption, validation, and network optimization.

**Pro-Tip:** While Snowball is great for massive migrations from on-premises to AWS, DataSync is the preferred tool for high-speed transfers *between* AWS services like S3 and EFS.

## Question 3

A Solutions Architect is working on planning the migration of a startup company from on-premises to AWS. Currently, their infrastructure consists of many servers and 30 TB of data hosted on a shared NFS storage. He has decided to use Amazon S3 to host the data. Which AWS service can efficiently migrate the data from on-premises to S3?


[ ] AWS Storage Tape Gateway


[ ] Amazon EBS


[ ] AWS Transfer Family


[ ] AWS DataSync


**Correct Answer:** ✅ AWS DataSync

**Explanation:** AWS DataSync is the most efficient service for migrating large amounts of data (like 30 TB) from on-premises NFS or SMB shares to AWS storage services like Amazon S3. It automates the data transfer, including encryption, validation, and network optimization, making it much faster and more reliable than manual tools or Transfer Family for this specific migration use case.

## Question 4

You are planning to migrate your company's infrastructure from on-premises to AWS Cloud. You have an on-premises Microsoft Windows File Server that you want to migrate. What is the most suitable AWS service you can use?


[ ] Amazon FSx for Windows (File Server)


[ ] AWS Storage Gateway - S3 File Gateway


[ ] AWS Managed Microsoft AD


**Correct Answer:** ✅ Amazon FSx for Windows (File Server)

**Explanation:** Amazon FSx for Windows File Server is a fully managed service built on Windows Server, providing the full compatibility and features (like SMB support, Active Directory integration, and NTFS permissions) required to migrate an on-premises Windows File Server seamlessly to the cloud.

## Question 5

You have a large dataset stored in S3 that you want to access from on-premises servers using the NFS or SMB protocol. Also, you want to authenticate access to these files through on-premises Microsoft AD. What would you use?


[ ] AWS Storage Gateway - Volume Gateway


[ ] AWS Storage Gateway - S3 File Gateway


[ ] AWS Storage Gateway - Tape Gateway


[ ] AWS Data Migration Service


**Correct Answer:** ✅ AWS Storage Gateway - S3 File Gateway

**Explanation:** AWS S3 File Gateway allows on-premises applications to use standard file protocols (NFS and SMB) to access objects stored in Amazon S3. For the SMB protocol specifically, S3 File Gateway integrates with Microsoft Active Directory (either on-premises or in AWS) to provide authenticated access to the file shares.

## Question 6

Your EC2 Windows Servers need to share some data by having a Network File System mounted on them which respects the Windows security mechanisms and has integration with Microsoft Active Directory. What do you recommend?


[ ] Amazon FSx for Windows (File Server)


[ ] Amazon EFS


[ ] Amazon FSx for Lustre


[ ] S3 File Gateway


**Correct Answer:** ✅ Amazon FSx for Windows (File Server)

**Explanation:** Amazon FSx for Windows File Server provides fully managed, highly reliable, and scalable file storage that is accessible over the Service Message Block (SMB) protocol. It is built on Windows Server and offers full support for the Windows NTFS file system, including integration with Microsoft Active Directory (AD) for security and access control.

**Pro-Tip:** While Amazon EFS is also a managed file system, it is designed for Linux-based workloads using the NFS protocol and does not natively support Windows NTFS permissions or SMB.

## Question 7

Which AWS service is best suited when migrating from an on-premises ZFS file system to AWS?


[ ] Amazon FSx for OpenZFS


[ ] Amazon FSx for NetApp ONTAP


[ ] Amazon FSx for Windows File Server


[ ] Amazon FSx for Luster


**Correct Answer:** ✅ Amazon FSx for OpenZFS

**Explanation:** Amazon FSx for OpenZFS is a fully managed file storage service built on the open-source OpenZFS file system. It is designed specifically to help users migrate on-premises workloads running on ZFS (common in Linux environments) to AWS without changing their application code or how they manage data, maintaining features like snapshots, clones, and compression.

## Question 8

A company is running Amazon S3 File Gateway to host their data on S3 buckets and is able to mount them on-premises using SMB. The data currently is hosted on S3 Standard storage class and there is a requirement to reduce the costs for S3. So, they have decided to migrate some of those data to S3 Glacier. What is the most efficient way they can use to move the data to S3 Glacier automatically?


[ ] Create a Lambda function to migrate data to S3 Glacier and periodically trigger it every day using Amazon EventBridge


[ ] Use S3 Batch Operations to loop through S3 files and move them to S3 Glacier every day


[ ] Use S3 Lifecycle Policy


[ ] Use AWS DataSync to replicate data to S3 Glacier every day


[ ] Configure S3 File Gateway to send the data to S3 Glacier directly


**Correct Answer:** ✅ Use S3 Lifecycle Policy

**Explanation:** S3 Lifecycle Policies are the most efficient and cost-effective way to automate the transition of objects between storage classes. You can define rules (based on the age of the object or prefixes) to automatically move data from S3 Standard to S3 Glacier without writing any code or managing external services. 

**Note:** While S3 File Gateway can write to S3, it cannot directly "target" Glacier; the transition must happen at the bucket level via lifecycle management.

## Question 9

Which of the following protocols is NOT supported by AWS Transfer Family?


[ ] File Transfer Protocol (FTP)


[ ] File Transfer Protocol over SSL (FTPS)


[ ] Transport Layer Security (TLS)


[ ] Secure File Transfer Protocol (SFTP)


**Correct Answer:** ✅ Transport Layer Security (TLS)

**Explanation:** While AWS Transfer Family uses TLS as an underlying encryption layer for protocols like FTPS, TLS itself is not a "file transfer protocol." AWS Transfer Family specifically supports **SFTP**, **FTPS**, **FTP**, and **AS2** (Applicability Statement 2) for moving files directly into and out of Amazon S3 or Amazon EFS.

## Question 10

You want to expose virtually infinite storage for your tape backups. You want to keep the same software you're using and want an iSCSI compatible interface. What do you use?


[ ] AWS Snowball


[ ] AWS Storage Gateway - Tape Gateway


[ ] AWS Storage Gateway - Volume Gateway


[ ] AWS Storage Gateway - S3 File Gateway


**Correct Answer:** ✅ AWS Storage Gateway - Tape Gateway

**Explanation:** Tape Gateway allows you to replace your on-premises physical tape libraries with a virtual tape library (VTL) on AWS. It provides an iSCSI-based interface that is compatible with most leading backup applications, allowing you to maintain your existing backup workflows while storing data in "virtually infinite" S3 and Glacier storage.

## Question 11

You need to move hundreds of Terabytes into Amazon S3, then process the data using a fleet of EC2 instances. You have a 1 Gbit/s broadband. You would like to move the data faster and possibly processing it while in transit. What do you recommend?


[ ] Use your network


[ ] Use Snowcone


[ ] Use AWS Data Migration


[ ] Use Snowball Edge


**Correct Answer:** ✅ Use Snowball Edge

**Explanation:** For "hundreds of Terabytes," migrating over a 1 Gbit/s line would take weeks or months and consume significant bandwidth. **Snowball Edge** is the best choice here because it not only provides high-capacity physical storage for data transfer but also includes on-board computing capabilities (Storage Optimized or Compute Optimized). This allows you to perform pre-processing or data filtering using EC2-compatible instances directly on the device before shipping it back to AWS.

## Question 12

Which deployment option in the FSx file system provides you with long-term storage that's replicated within AZ?


[ ] Scratch File System


[ ] Persistent File System


**Correct Answer:** ✅ Persistent File System

**Explanation:** Amazon FSx (specifically for Lustre) offers two deployment types: **Scratch** and **Persistent**. The Persistent file system is designed for longer-term storage and high availability; it automatically replicates data within a single Availability Zone (AZ) to protect against hardware failure. In contrast, Scratch storage is intended for temporary processing and does not replicate data, meaning if a file server fails, the data is lost.

## Question 13

You would like to have a distributed POSIX-compliant file system that will allow you to maximize the IOPS in order to perform some High-Performance Computing (HPC) and genomics computational research. This file system has to easily scale to millions of IOPS. What do you recommend?


[ ] EFS with Max. IO enabled


[ ] Amazon FSx for Lustre


[ ] Amazon S3 mounted on the EC2 instances


[ ] EC2 Instance Store


**Correct Answer:** ✅ Amazon FSx for Lustre

**Explanation:** Amazon FSx for Lustre is a high-performance, POSIX-compliant file system specifically designed for workloads like HPC, machine learning, and genomics. It provides sub-millisecond latencies and can scale to hundreds of gigabytes per second of throughput and millions of IOPS, making it far more capable of handling extreme compute-heavy requirements than standard EFS or S3 mounts.

## Question 14

You have on-premises sensitive files and documents that you want to regularly synchronize to AWS to keep another copy. Which AWS service can help you with that?


[ ] AWS Database Migration Service


[ ] Amazon EFS


[ ] AWS DataSync


**Correct Answer:** ✅ AWS DataSync

**Explanation:** AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between on-premises storage and AWS. It is specifically designed for recurring, scheduled synchronization of file data, providing built-in encryption and data integrity validation to ensure sensitive documents are copied accurately and securely.

## Question 15

AWS DataSync supports the following locations, EXCEPT ....................


[ ] Amazon S3


[ ] Amazon EBS


[ ] Amazon EFS


[ ] Amazon FSx for Windows File Server


**Correct Answer:** ✅ Amazon EBS

**Explanation:** AWS DataSync is designed to transfer file and object data between storage services like Amazon S3, Amazon EFS, and all types of Amazon FSx (Windows, Lustre, ONTAP, OpenZFS). It does not support Amazon EBS (Elastic Block Store) as a direct source or destination; EBS data is typically managed via snapshots, or you must mount the EBS volume to an EC2 instance to move its file-level data using DataSync.

## Question 16

A Machine Learning company is working on a set of datasets that are hosted on S3 buckets. The company decided to release those datasets to the public to be useful for others in their research, but they don’t want to configure the S3 bucket to be public. And those datasets should be exposed over the FTP protocol. What can they do to do the requirement efficiently and with the least effort?


[ ] Use AWS Transfer Family


[ ] Create an EC2 instance with an FTP server installed then copy the data from S3 to the EC2 instance


[ ] Use AWS Storage Gateway


[ ] Copy the data from S3 to an EFS file system, then expose them over the FTP protocol


**Correct Answer:** ✅ Use AWS Transfer Family

**Explanation:** AWS Transfer Family is a fully managed service that enables the transfer of files over SFTP, FTPS, and FTP directly into and out of Amazon S3 or Amazon EFS. It eliminates the need to manage your own FTP servers or EC2 instances, providing a highly available and scalable solution with minimal operational effort. You can keep your S3 bucket private and use Transfer Family as the secure gateway for public or authenticated access.

## Question 17

You have hundreds of Terabytes that you want to migrate to AWS S3 as soon as possible. You tried to use your network bandwidth and it will take around 3 weeks to complete the upload process. What is the recommended approach to using in this situation?


[ ] AWS Storage Gateway - Volume Gateway


[ ] S3 Multi-part Upload


[ ] AWS Snowball Edge


[ ] AWS Data Migration Service


**Correct Answer:** ✅ AWS Snowball Edge

**Explanation:** When dealing with hundreds of Terabytes of data and a migration timeline that is hindered by network bandwidth (3 weeks in this case), the most efficient approach is to use a physical migration device. **AWS Snowball Edge** devices can be shipped to your data center, loaded with data via local high-speed connections, and then shipped back to AWS for local upload into S3, bypassing the limitations of your internet connection entirely.

## Question 18

Amazon FSx for NetApp ONTAP is compatible with the following protocols, EXCEPT ………………


[ ] NFS


[ ] SMB


[ ] FTP


[ ] iSCSI


**Correct Answer:** ✅ FTP

**Explanation:** Amazon FSx for NetApp ONTAP is a multi-protocol storage service that natively supports **NFS** (v3, v4.0, v4.1, v4.2), **SMB** (2.0, 2.1, 3.0, 3.1.1), and block storage via **iSCSI**. While you can move data into it using other tools, it does not natively support the **FTP** protocol. For FTP requirements, you would typically use the AWS Transfer Family.

## Question 19

Which set of Amazon S3 features helps to prevent and recover from accidental data loss?

[ ] Object lifecycle and service access logging.

[ ] Object versioning and Multi-factor authentication.

[ ] Access controls and server-side encryption.

[ ] Website hosting and Amazon S3 policies.

**Correct Answer:** Object versioning and Multi-factor authentication.**

**Explanation:** This combination provides a robust defense-in-depth strategy specifically for data preservation:

* **Object Versioning:** This is the primary tool for **recovery**. It keeps multiple variants of an object in the same bucket. If an object is accidentally deleted or overwritten, you can simply restore a previous version. 
* **Multi-factor authentication (MFA) Delete:** This is the primary tool for **prevention**. When enabled, it adds an extra layer of security by requiring a 6-digit code from a physical or virtual MFA device before a user can permanently delete an object version or change the versioning state of the bucket.

**Why the others aren't the best fit:**
* **Lifecycle policies** are generally used for cost optimization (moving data to Glacier) or scheduled deletions, not specifically for accidental loss prevention.
* **Encryption** protects data from unauthorized viewing (confidentiality), but does not prevent someone with permissions from deleting the file.
* **S3 Policies** control access, but without Versioning/MFA, a user with "Allow" permissions could still accidentally delete data beyond recovery.

## Question 20

Which of the following are valid statements about Amazon S3? (Choose 2 answers)

[ ] Amazon S3 provides read-after-write consistency for any type of PUT or DELETE.

[ ] Consistency is not guaranteed for any type of PUT or DELETE.

[ ] A successful response to a PUT request only occurs when a complete object is saved.

[ ] Partially saved objects are immediately readable with a GET after an overwrite PUT.

[ ] S3 provides eventual consistency for overwrite PUTS and DELETE.

**Correct Answers:** Amazon S3 provides read-after-write consistency for any type of PUT or DELETE.**
A successful response to a PUT request only occurs when a complete object is saved.**

**Explanation:** This question covers the data consistency model and the "all-or-nothing" nature of S3 uploads.

* **Strong Consistency:** Historically, S3 was eventually consistent for overwrites and deletes. However, as of **December 2020**, S3 provides **strong read-after-write consistency** for all applications. This means that after a successful `PUT` of a new object, an overwrite of an existing object, or a `DELETE`, any subsequent `GET` or `LIST` request will immediately see the latest data.
* **Atomic Operations:** S3 operations are atomic. A `PUT` request is either 100% successful and the object is available, or it fails completely. There is no "partial" state where a user can read half-written data.
* **Why the others are incorrect:** * Statements about "eventual consistency" or "consistency not guaranteed" are outdated as of the 2020 update.
    * The idea that partially saved objects are readable is false because S3 does not serve an object until the upload is fully completed and acknowledged.


## Question 21

When should I choose Provisioned IOPS over Standard RDS storage?

[ ] If you have batch-oriented workloads.

[ ] **If you use production online transaction processing (OLTP) workloads.

[ ] If you have workloads that are not sensitive to consistent performance.

**Correct Answer:** If you use production online transaction processing (OLTP) workloads.**

**Explanation:** **Provisioned IOPS (PIOPS)** is designed to meet the needs of I/O-intensive workloads that require low latency and consistent throughput.

* **OLTP Workloads:** Production databases for applications (like e-commerce sites or banking systems) typically involve many small, concurrent transactions. These require consistent, high-speed performance to ensure a smooth user experience.
* **Predictability:** With Provisioned IOPS, you specify the exact number of IOPS you need, and AWS guarantees that performance. This is critical for production environments where performance dips could lead to application timeouts.
* **Standard (General Purpose SSD) vs. PIOPS:** * **General Purpose (gp2/gp3):** Good for dev/test or small databases. They use a "burst" bucket for high I/O, which can run out during sustained heavy use.
    * **Provisioned IOPS (io1/io2):** Best for large-scale, mission-critical databases that need consistent performance 100% of the time.

**Why the others are incorrect:**
* **Batch-oriented workloads:** These are often better suited for "Throughput Optimized" storage or General Purpose SSDs, as they can usually tolerate some variance in performance and are more concerned with total data processed rather than individual transaction latency.
* **Non-sensitive workloads:** If performance consistency isn't a priority, Standard or General Purpose storage is much more cost-effective.

## Question 22

Your department creates regular analytics reports from your company's log files. All log data is collected in Amazon S3 and processed by daily Amazon Elastic MapReduce (EMR) jobs that generate daily PDF reports and aggregated tables in CSV format for an Amazon Redshift data warehouse. Which of the following alternatives will lower costs without compromising average performance of the system or data integrity for the raw data?

[ ] Use reduced redundancy storage (RRS) for all data in S3. Use a combination of Spot Instances and Reserved Instances for Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.

[ ] Use reduced redundancy storage (RRS) for PDF and .csv data in S3. Add Spot Instances to EMR jobs. Use Spot Instances for Amazon Redshift.

[ ] **Use reduced redundancy storage (RRS) for PDF and .csv data in Amazon S3. Add Spot Instances to Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.

[ ] Use reduced redundancy storage (RRS) for all data in Amazon S3. Add Spot Instances to Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.

**Correct Answer:** Use reduced redundancy storage (RRS) for PDF and .csv data in Amazon S3. Add Spot Instances to Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.**

**Explanation:** This strategy optimizes costs across three different services while protecting the most critical data:

* **S3 Strategy:** The prompt specifies not compromising data integrity for **raw data**. Therefore, raw data should stay in Standard S3. However, the PDF reports and CSV files are *derived* data—if they are lost, they can be re-generated by running the EMR job again. Using **Reduced Redundancy Storage (RRS)** for these reproducible files saves money. *(Note: In modern AWS, S3 One Zone-IA has largely replaced the use case for RRS, but RRS remains the classic answer for this scenario in certification contexts).*
* **EMR Strategy:** EMR is perfect for **Spot Instances**. Since EMR is a distributed processing framework, if a Spot Instance is reclaimed by AWS, the job might slow down slightly, but the cluster will continue to work. Adding Spot Instances significantly lowers the hourly cost of the processing power.
* **Redshift Strategy:** Redshift is a data warehouse that typically runs 24/7 for analytics. Since it's a persistent, always-on service, **Reserved Instances** offer a massive discount (up to 75%) compared to On-Demand pricing.
* **Why not Spot for Redshift?** There is no such thing as a "Spot Instance" for a Redshift cluster in the same way there is for EC2. Redshift requires persistent nodes to maintain data availability.


## Question 23

You want to install software updates on 100s of Linux EC2 instances that you manage. You want to store these updates on shared storage which should be dynamically loaded on the EC2 instances and shouldn't require heavy operations. What do you suggest?

[ ] Store the software updates on EBS and sync them using data replication software from one master in each AZ

[ ] Store the software updates on EFS and mount EFS as a network drive at startup

[ ] Package the software updates as an EBS snapshot and create EBS volumes for each new software update

[ ] Store the software updates on Amazon RDS

**Correct Answer:** Store the software updates on EFS and mount EFS as a network drive at startup

**Explanation:** **Amazon EFS (Elastic File System)** is designed exactly for this "one-to-many" shared storage use case.

*   **Shared Access:** Unlike EBS, which is a block storage device typically limited to a single instance, EFS is a network file system (NFS) that can be mounted simultaneously by thousands of EC2 instances across multiple Availability Zones.
*   **Operational Efficiency:** EFS is a fully managed service. You don't need to manage replication software, worry about syncing data between zones, or handle the underlying hardware. You simply store your update packages once, and every instance sees them immediately.
*   **Dynamic Loading:** By adding a mount command to your instances' `userdata` or `/etc/fstab`, the instances can dynamically access the shared update files the moment they boot up.
*   **Scalability:** EFS automatically scales its storage capacity and performance as you add more files, making it ideal for managing a growing library of software updates for large fleets.

**Why the others are incorrect:**
*   **EBS with Sync Software:** This is "heavy operations." You would have to manage multiple EBS volumes and complex third-party replication software to keep the updates in sync across different instances and AZs.
*   **EBS Snapshots:** Creating thousands of EBS volumes from a snapshot every time you have an update is slow, expensive, and operationally exhausting. 
*   **Amazon RDS:** RDS is a relational database service. It is meant for structured data queries (SQL), not for storing and serving binary software update files or acting as a shared file system.

---

### Shared Storage Comparison: EFS vs. EBS

| Feature | Amazon EFS | Amazon EBS |
| :--- | :--- | :--- |
| **Access Model** | **Shared (1 to 1000s of instances)** | Single (1 instance to 1 volume*) |
| **Protocol** | NFSv4 (File) | Block Storage |
| **Availability** | Regional (Multi-AZ by default) | Zonal (Single AZ) |
| **Management** | Fully Managed | Requires Manual Snapshots/Replication |

*\*Note: Some EBS volumes support Multi-Attach, but only within the same AZ and with specific cluster-aware file systems.*




## Question 24

How can you be notified when there's an object uploaded to your S3 bucket?

[ ] S3 Select

[ ] S3 Access Logs

[ ] S3 Event Notifications
[ ] S3 Analytics

**Correct Answer:** S3 Event Notifications

**Explanation:** **S3 Event Notifications** are the native AWS feature designed to trigger actions or alerts automatically in response to specific events within an S3 bucket, such as `s3:ObjectCreated:Put` or `s3:ObjectCreated:Post`.

*   **Near Real-Time Response:** Unlike polling (where you constantly check the bucket for changes), S3 Event Notifications push information to a destination the moment an upload completes.
*   **Supported Destinations:** You can send these notifications to three primary AWS services to kick off workflows:
    *   **Simple Notification Service (SNS):** To fan-out alerts to emails, SMS, or multiple SQS queues.
    *   **Simple Queue Service (SQS):** To decouple your application and ensure events are queued for processing.
    *   **AWS Lambda:** To immediately execute code (e.g., to resize an uploaded image or scan for malware).
*   **Filtering:** You can use **Prefix** (folder-level) and **Suffix** (file extension) filters so that notifications only fire for specific types of uploads (e.g., only files in the `/images/` folder ending in `.jpg`).

**Why the others are incorrect:**
*   **S3 Select:** A performance feature used to retrieve only a subset of data from an object using simple SQL expressions; it does not provide alerts or notifications.
*   **S3 Access Logs:** Provides detailed records for requests made to a bucket (who accessed what and when). While you can analyze these logs later, they are not a proactive notification system.
*   **S3 Analytics:** A tool used to analyze storage access patterns (e.g., identifying which objects should be moved to S3 Glacier for cost savings). It provides reports, not real-time event triggers.

---

### S3 Event Notification Workflow

| Trigger Event | Destination | Use Case |
| :--- | :--- | :--- |
| **Object Created** | **AWS Lambda** | Trigger an ETL job or image processing |
| **Object Created** | **Amazon SNS** | Send an "Upload Complete" email to an admin |
| **Object Created** | **Amazon SQS** | Add a message to a processing queue for workers |

## Question 25

You are looking to build an index of your files in S3, using Amazon RDS PostgreSQL. To build this index, it is necessary to read the first 250 bytes of each object in S3, which contains some metadata about the content of the file itself. There are over 100,000 files in your S3 bucket, amounting to 50 TB of data. How can you build this index efficiently?

[ ] Use the RDS Import feature to load the data from S3 to PostgreSQL, and run a SQL query to build the index

[ ] Create an application that will traverse the S3 bucket, read all the files one by one, extract the first 250 bytes, and store that information in RDS

[X] Create an application that will traverse the S3 bucket, issue a Byte Range Fetch for the first 250 bytes, and store that information in RDS

[ ] Create an application that will traverse the S3 bucket, use S3 Select to get the first 250 bytes, and store that information in RDS

**Correct Answer:** Create an application that will traverse the S3 bucket, issue a Byte Range Fetch for the first 250 bytes, and store that information in RDS

**Explanation:** In a scenario involving 50 TB of data, downloading entire objects just to read a 250-byte header is extremely inefficient and costly. **Byte Range Fetch** is the specific tool for this job.

*   **Massive Bandwidth Savings:** By requesting only the range `bytes=0-249`, you transfer approximately **25 MB** total for 100,000 files, instead of the full **50 TB**. This reduces data transfer by a factor of 2 million.
*   **Cost Efficiency:** AWS charges for "Data Transfer Out." Reducing the payload size directly slashes your monthly bill.
*   **Lower Latency:** Since the instance only waits for the first 250 bytes, each request completes in milliseconds, allowing for high-concurrency indexing.

**Why the others are incorrect:**
*   **RDS Import / Read all files:** Both require moving the full 50 TB of data. This is a "brute force" approach that is slow and prohibitively expensive.
*   **S3 Select:** While S3 Select filters data, it is designed for querying structured records (CSV, JSON, Parquet) using SQL. For grabbing a raw byte-offset at the start of any file type, a Byte Range Fetch is the standard and more efficient protocol-level feature.

---

### Retrieval Optimization

| Method | Data Transferred | Best Use Case |
| :--- | :--- | :--- |
| **Standard GET** | 100% of Object | When you need the entire file |
| **S3 Select** | Filtered Rows | Querying specific data in structured files |
| **Byte Range Fetch** | **Specific Bytes** | **Reading headers, footers, or metadata** |


## Question 26

You are looking to get recommendations for S3 Lifecycle Rules. How can you analyze the optimal number of days to move objects between different storage tiers?

[ ] S3 Inventory

[ ] S3 Analytics

[ ] S3 Lifecycle Rules Advisor

**Correct Answer:** S3 Analytics

**Explanation:** **S3 Storage Class Analysis** (a feature within S3 Analytics) is specifically designed to help you determine when you should transition objects from S3 Standard to lower-cost storage classes like S3 Standard-IA.

*   **Access Pattern Observation:** S3 Analytics monitors the access patterns of your objects over time. It identifies objects that are infrequently accessed, which are prime candidates for cheaper storage tiers.
*   **Actionable Recommendations:** Once the analysis has run for a sufficient period (usually 30 days of data), it provides a visualization and data output that tells you exactly how many days of "infrequent access" are typical for your dataset.
*   **Lifecycle Integration:** You can use these insights to create highly accurate **S3 Lifecycle Rules**. For example, if S3 Analytics shows that most objects aren't accessed after 45 days, you can confidently set a rule to transition them to Standard-IA at that exact mark.

**Why the others are incorrect:**
*   **S3 Inventory:** This tool provides a scheduled report (CSV or ORC) listing your objects and their metadata (size, storage class, encryption status). While it tells you *what* you have, it doesn't analyze access patterns or provide recommendations.
*   **S3 Lifecycle Rules Advisor:** This is not a real AWS service or feature name. The logic for lifecycle recommendations is contained within **S3 Storage Class Analysis**.

---

### S3 Management Toolset

| Tool | Primary Purpose | Key Output |
| :--- | :--- | :--- |
| **S3 Analytics** | **Analyzing access patterns** | **Recommended transition days** |
| **S3 Inventory** | Auditing and reporting | List of all objects and their metadata |
| **S3 Lens** | Organization-wide visibility | Dashboards for cost and security |
| **S3 Lifecycle** | Automating movements | Moves or deletes objects based on age |


## Question 27

While you're uploading large files to an S3 bucket using Multi-part Upload, there are a lot of unfinished parts stored in the S3 bucket due to network issues. You are not using these unfinished parts and they cost you money. What is the best approach to remove these unfinished parts?

[ ] Use AWS Lambda to loop on each old/unfinished part and delete them

[ ] Request AWS Support to help you delete old/unfinished parts

[ ] Use an S3 Lifecycle Policy to automate old/unfinished parts deletion

**Correct Answer:** Use an S3 Lifecycle Policy to automate old/unfinished parts deletion

**Explanation:** Managing incomplete multipart uploads is a classic cost-optimization task in AWS. Unfinished parts are essentially "invisible" during normal bucket listing but still incur storage charges.

*   **Automation:** The **AbortIncompleteMultipartUpload** action within an S3 Lifecycle Policy is the industry-standard "set and forget" solution. You can configure it to automatically purge parts a specific number of days (e.g., 7 days) after the upload was initiated.
*   **Operational Excellence:** Unlike a custom Lambda script, a Lifecycle Policy is a built-in, managed feature of S3. It requires no code to maintain, handles scale automatically, and costs nothing to run (you only pay for the storage until the parts are deleted).
*   **Cost Efficiency:** Since incomplete parts occupy storage space and are billed at the same rate as standard objects, automating their deletion ensures you aren't paying for "hidden" data that can't be used to reconstruct a full object.

**Why the others are incorrect:**
*   **AWS Lambda:** While you *could* write a script to list and abort uploads via the API, it is operationally "heavy." You would have to manage the Lambda's triggers, permissions, and timeout logic, which is unnecessary when S3 has a native feature to do it.
*   **AWS Support:** AWS Support does not perform manual data cleanup or bucket management tasks for customers. These are "self-service" configuration tasks that fall under the customer's responsibility in the Shared Responsibility Model.

---

### S3 Lifecycle Action Summary

| Action Type | What it does | Best Use Case |
| :--- | :--- | :--- |
| **Transition** | Moves objects to cheaper classes | Cost saving for aged data |
| **Expiration** | Permanently deletes objects | Removing logs or temp files |
| **Abort Multipart** | **Cleans up failed/abandoned parts** | **Eliminating hidden storage costs** |


## Question 28

You have a 25 GB file that you're trying to upload to S3 but you're getting errors. What is a possible solution for this?

[ ] The file size limit on S3 is 5 GB

[ ] Update your bucket policy to allow the larger file

[ ] Use Multi-Part upload when uploading files larger than 5GB

[ ] Encrypt the file

**Correct Answer:** Use Multi-Part upload when uploading files larger than 5GB

**Explanation:** While the maximum size for a single object in S3 is 5 TB, there is a physical limit on how much data can be sent in a **single PUT operation**.

*   **The 5 GB Limit:** A single PUT request has a maximum limit of **5 GB**. Since your file is 25 GB, any attempt to upload it in one go will result in an error.
*   **Multipart Upload:** To upload files larger than 5 GB, you **must** use the Multipart Upload API. This breaks the file into smaller chunks (parts), uploads them in parallel, and reassembles them in S3 once all parts are received.
*   **Benefits:**
    *   **Improved Throughput:** You can upload parts in parallel to utilize more bandwidth.
    *   **Fault Tolerance:** If a single part fails to upload due to a network error, you only have to re-upload that specific part, not the entire 25 GB file.
    *   **Pause and Resume:** You can stop the upload and resume it later.

**Why the others are incorrect:**
*   **File size limit on S3 is 5 GB:** This is partially true for a *single request*, but the total limit for an object in S3 is actually 5 TB.
*   **Bucket Policy:** Bucket policies control permissions (Who can upload). If you are already able to start the upload but it fails due to size, it is a technical limitation of the PUT operation, not a permission issue.
*   **Encryption:** Encrypting the file does not change its size or the S3 API limits for single PUT requests.

---

### S3 Upload Limits at a Glance

| Constraint | Limit |
| :--- | :--- |
| **Max Object Size** | 5 TB |
| **Max Size per Single PUT** | **5 GB** |
| **Multipart Upload Requirement** | **Recommended > 100 MB, Mandatory > 5 GB** |
| **Max Parts per Multipart Upload** | 10,000 |


## Question 29

A company is preparing for compliance and regulatory review on its infrastructure on AWS. Currently, they have their files stored on S3 buckets encrypted using S3 Default Encryption, which must be encrypted using KMS as required for compliance and regulatory review. Which S3 feature allows them to encrypt all files in their S3 buckets in the most efficient and cost-effective way?

[ ] S3 Access Points

[ ] S3 Cross-Region Replication

[ ] S3 Batch Operations

[ ] S3 Lifecycle Rules

**Correct Answer:** S3 Batch Operations

**Explanation:** To move from **SSE-S3** (Default) to **SSE-KMS** for existing objects at scale, you need a way to perform a "copy" operation on every single file to re-encrypt it with the new KMS key. **S3 Batch Operations** is the correct tool for this.

*   **Retroactive Encryption:** S3 Default Encryption only applies to *new* objects uploaded after the setting is enabled. It does not automatically re-encrypt objects that are already in the bucket. 
*   **Scale and Efficiency:** S3 Batch Operations can perform a "Copy" operation on millions or billions of objects in a single job. By copying the objects onto themselves while specifying the new KMS encryption settings, you effectively re-encrypt the entire bucket.
*   **Cost-Effectiveness:** When using S3 Batch Operations for KMS encryption, you should also enable **S3 Bucket Keys**. This reduces the number of calls to AWS KMS by up to 99%, significantly lowering the costs associated with KMS API requests during the large-scale re-encryption process.

**Why the others are incorrect:**
*   **S3 Access Points:** These are used to manage shared data access for different applications or teams; they have no native functionality for bulk re-encryption of data.
*   **S3 Cross-Region Replication:** While CRR can encrypt data during replication, it is primarily used for geographic redundancy. Using it just to change encryption settings would be much more expensive and complex than an in-place batch job.
*   **S3 Lifecycle Rules:** Lifecycle rules are used to transition objects between storage classes (e.g., S3 Standard to Glacier) or delete them. They cannot be used to change the encryption type of an object.

---

### Comparison of Encryption Update Methods

| Method | Target | Operational Effort | Best Use Case |
| :--- | :--- | :--- | :--- |
| **Default Encryption** | New objects only | Zero (Automatic) | Preventing future unencrypted uploads |
| **AWS CLI (Recursive CP)** | Existing objects | High (Manual/Scripted) | Small buckets (< 10,000 objects) |
| **S3 Batch Operations** | **Existing objects** | **Low (Managed Job)** | **Massive buckets / Compliance audits** |


## Question 30

You have an S3 bucket that has S3 Versioning enabled. This S3 bucket has a lot of objects, and you would like to remove old object versions to reduce costs. What's the best approach to automate the deletion of these old object versions?

[ ] S3 Lifecycle Rules - Transition Actions

[ ] S3 Lifecycle Rules - Expiration Actions

[ ] S3 Access Logs

**Correct Answer:** S3 Lifecycle Rules - Expiration Actions

**Explanation:** To permanently delete data and stop incurring storage costs, you must use **Expiration Actions** within an S3 Lifecycle policy.

*   **Noncurrent Version Expiration:** When versioning is enabled, S3 distinguishes between the "Current" version and "Noncurrent" (old) versions. You can specifically create a rule to expire noncurrent versions after a set number of days (e.g., delete all versions older than 30 days).
*   **Cost Optimization:** Since every version of an object takes up space and costs money, automating the removal of these older versions is a primary way to prevent "version bloat" and reduce your monthly S3 bill.
*   **Granular Control:** You can combine expiration with a "number of newer versions to retain" setting. For example, you can tell S3 to "delete versions after 90 days, but always keep the last 3 versions" to ensure you still have a safety net for recovery.

**Why the others are incorrect:**
*   **S3 Lifecycle Rules - Transition Actions:** These are used to move objects to a different, cheaper storage class (like S3 Glacier or Standard-IA). While this reduces the cost *per GB*, the objects still exist and you are still paying for them. It does not delete them.
*   **S3 Access Logs:** These are simply text files that track who accessed your bucket and when. They provide audit information but have no capability to automate the management or deletion of objects.

---

### Versioning Lifecycle Actions

| Action Type | Target | Result |
| :--- | :--- | :--- |
| **Transition** | Noncurrent Versions | Moves old versions to S3 Glacier (Cheaper storage) |
| **Expiration** | **Noncurrent Versions** | **Permanently deletes old versions (Zero cost)** |
| **Expiration** | Current Version | Creates a Delete Marker (Hides the object) |


## Question 31

**Question:** 
You have a large dataset stored on-premises that you want to upload to the S3 bucket. The dataset is divided into 10 GB files. You have good bandwidth but your Internet connection isn't stable. What is the best way to upload this dataset to S3 and ensure that the process is fast and avoid any problems with the Internet connection?

[ ] Use Multi-part Upload Only

[ ] Use S3 Select & Use S3 Transfer Acceleration

[ ] Use S3 Multi-part Upload & S3 Transfer Acceleration

**Correct Answer:** 
Use S3 Multi-part Upload & S3 Transfer Acceleration

---

### Why this is the best approach:

*   **S3 Multi-part Upload (Reliability):** Since your 10 GB files are being sent over an *unstable* connection, standard uploads are risky. If a connection drops at 9 GB, you lose everything. With Multi-part, the file is broken into chunks; if one chunk fails, you only retry that specific part.
*   **S3 Transfer Acceleration (Speed):** This feature uses Amazon CloudFront's globally distributed Edge Locations. Your data enters the AWS private network as quickly as possible, bypassing much of the "jittery" public internet, which maximizes your available bandwidth.
*   **The Combination:** Together, they provide the "Reliability" (Multi-part) to handle the unstable connection and the "Performance" (Transfer Acceleration) to utilize your high bandwidth.

### Why others are incorrect:
*   **S3 Select:** This is for *reading* specific data from a file using SQL. It has nothing to do with the *upload* process.
*   **Multi-part Only:** While this helps with connection failures, it doesn't solve for the high latency or routing inefficiencies that come with uploading directly to a distant S3 region over the public internet.


## Question 32

**Question:**
You have updated an S3 bucket policy to allow IAM users to read/write files in the S3 bucket, but one of the users complains that he can't perform a PutObject API call. What is a possible cause for this?

[ ] The S3 bucket policy must be wrong

[ ] The user is lacking permissions

[ ] The IAM user must have an explicit DENY in the attached IAM Policy

[ ] You need to contact AWS Support to lift this limit

---

Correct answer: The IAM user must have an explicit DENY in the attached IAM Policy

### Why this is the correct answer:

In AWS, the evaluation logic for permissions follows a specific hierarchy. Even if a **Bucket Policy** (resource-based) explicitly grants access, an **Explicit DENY** in an **IAM Policy** (identity-based) will always take precedence.

*   **The "Deny Wins" Rule:** In AWS, a single `Deny` statement in any applicable policy (IAM User, Group, Role, or Bucket Policy) overrides any number of `Allow` statements. 
*   **Evaluation Logic:**
    1.  Start with a default **Implicit Deny**.
    2.  Check all applicable policies for an **Explicit Deny**. If found, the request is **Denied**.
    3.  If no explicit deny, check for an **Explicit Allow**. If found, the request is **Allowed**.
    4.  If neither is found, the request remains **Denied**.

### Why others are incorrect:
*   **Bucket policy must be wrong:** While possible, the question states you *have* updated it to allow access. In multiple-choice scenarios, the "Explicit Deny" is the classic architectural answer for why an "Allow" isn't working.
*   **User is lacking permissions:** This would result in an **Implicit Deny**. While it causes the same error, an "Explicit Deny" is a more specific and common cause of "Access Denied" errors when other policies supposedly grant access.
*   **AWS Support:** API limits or service quotas typically result in `Throttling` or `LimitExceeded` errors, not a standard "Access Denied" on a `PutObject` call.


## Question 33

**Question:**
You want the content of an S3 bucket to be fully available in different AWS Regions. That will help your team perform data analysis at the lowest latency and cost possible. What S3 feature should you use?

[ ] Amazon CloudFront Distributions

[ ] S3 Versioning

[ ] S3 Static Website Hosting

[ ] S3 Replication

**Correct Answer:** 
S3 Replication

---

### Why this is the correct approach:

*   **Regional Availability for Analysis:** For data analysis (which usually involves compute services like EC2, Athena, or EMR in a specific region), the data needs to be *physically present* in that same region to minimize data transfer costs and maximize processing speed. **S3 Replication** (specifically Cross-Region Replication or CRR) ensures that every object in the source bucket is automatically copied to a destination bucket in another region.
*   **Latency vs. Delivery:** While **CloudFront** is excellent for low-latency *content delivery* to end-users (via edge locations), it is not a data storage solution. Data analysis tools require direct access to the objects in an S3 bucket, not a cached copy at an edge location.
*   **Cost Efficiency:** By having a local copy of the data in the region where the analysis is being performed, you avoid the high costs and latency associated with cross-region S3 GET requests.

### Why others are incorrect:
*   **Amazon CloudFront:** Designed for distributing content to users, not for providing a full dataset to a compute cluster for analysis.
*   **S3 Versioning:** A prerequisite for replication, but on its own, it only preserves historical states of objects within a single bucket/region.
*   **S3 Static Website Hosting:** Used for serving web content (HTML/images) over HTTP; it does not provide regional data redundancy or multi-region availability.


## Question 34

**Question:**
Which of the following is NOT a Glacier Deep Archive retrieval mode?

[ ] Expedited (1 - 5 minutes)

[ ] Standard (12 hours)

[ ] Bulk (48 hours)

**Correct Answer:** 
Expedited (1 - 5 minutes)

---

### Why this is the correct answer:

**S3 Glacier Deep Archive** is designed for the absolute lowest-cost storage of "cold" data that is rarely accessed. Because of its extreme cost-optimization, it does not support the high-speed "Expedited" retrieval tier.

*   **Expedited Retrieval:** This tier is only available for **S3 Glacier Flexible Retrieval** (formerly just S3 Glacier). It allows you to access data in 1–5 minutes for emergency needs.
*   **Deep Archive Tiers:** Deep Archive only offers two retrieval options:
    *   **Standard:** Typically takes **12 hours**.
    *   **Bulk:** Typically takes **48 hours** (the lowest-cost option for large datasets).

### Retrieval Comparison at a Glance:

| Storage Class | Expedited (1-5m) | Standard (Hours) | Bulk (Hours) |
| :--- | :---: | :---: | :---: |
| **Glacier Flexible Retrieval** | ✅ Yes | ✅ 3–5 Hours | ✅ 5–12 Hours |
| **Glacier Deep Archive** | ❌ No | ✅ 12 Hours | ✅ 48 Hours |

---

> **Note:** If you need millisecond access to archived data, you should use **S3 Glacier Instant Retrieval**, though it has a higher storage cost than the Flexible or Deep Archive tiers.

## Question 35

**Question:**
Which of the following is NOT a Glacier Flexible retrieval mode?

[ ] Instant (10 seconds)

[ ] Expedited (1 - 5 minutes)

[ ] Standard (3 - 5 hours)

[ ] Bulk (5 - 12 hours)

**Correct Answer:** 
Instant (10 seconds)

---

### Why this is the correct answer:

**S3 Glacier Flexible Retrieval** (formerly known simply as S3 Glacier) is an asynchronous storage class, meaning you must initiate a "restore" request and wait for the data to become available. It does not support any form of "Instant" or synchronous access.

*   **S3 Glacier Instant Retrieval:** This is a separate, specific storage class designed for millisecond retrieval of archived data. It is **not** a retrieval mode of the Flexible Retrieval class.
*   **Glacier Flexible Tiers:**
    *   **Expedited:** 1–5 minutes (for urgent access).
    *   **Standard:** 3–5 hours (the default option).
    *   **Bulk:** 5–12 hours (free of cost for the data retrieval itself).

### Quick Summary of Retrieval Options:

| Option | Availability | Use Case |
| :--- | :--- | :--- |
| **Expedited** | 1–5 Minutes | Emergency data recovery |
| **Standard** | 3–5 Hours | Typical backup restoration |
| **Bulk** | 5–12 Hours | Large-scale data processing (cost-free retrieval) |
| **Instant** | Milliseconds | Only available via **S3 Glacier Instant Retrieval** storage class |

---

> **Tip for the Exam:** If the question asks for "Instant" or "Millisecond" access to archives, look for the **S3 Glacier Instant Retrieval** *storage class*. If it asks for the most flexible asynchronous options, the answer is **S3 Glacier Flexible Retrieval**.

## Question 36

**Question:**
You have 3 S3 buckets. One source bucket A, and two destination buckets B and C in different AWS Regions. You want to replicate objects from bucket A to both bucket B and C. How would you achieve this?

[ ] Configure replication from bucket A to bucket B, then from bucket A to bucket C

[ ] Configure replication from bucket A to bucket B, then from bucket B to bucket C

[ ] Configure replication from bucket A to bucket C, then from bucket C to bucket B

**Correct Answer:** 
Configure replication from bucket A to bucket B, then from bucket A to bucket C

---

### Why this is the correct approach:

S3 Cross-Region Replication (CRR) supports **multi-destination replication**. You can configure a single source bucket to replicate data to multiple destination buckets (up to 15) by adding multiple replication rules to the source bucket configuration.

*   **Direct Fan-out:** In this setup, Bucket A acts as the central hub. When an object is uploaded to A, S3 independently triggers replication events to both B and C.
*   **Replication is not Transitive:** This is a key AWS rule. If you replicate from A to B, and then set up replication from B to C, the objects that arrived in B *via replication* will **not** be automatically sent to C. Only objects uploaded *directly* to B would be replicated to C. This is why the "chain" options (A→B→C) fail.
*   **Requirements:** As with all S3 replication, you must ensure that **Versioning** is enabled on all three buckets (A, B, and C) and that the IAM Role used for replication has the necessary permissions to read from A and write to both B and C.

---

### Replication Logic Summary

| Configuration | Will it work? | Reason |
| :--- | :---: | :--- |
| **A → B AND A → C** | ✅ **Yes** | **Multi-destination replication is natively supported.** |
| **A → B → C** | ❌ **No** | **Replication is not transitive; replicated objects aren't re-replicated.** |


## Question 37

**Question:**
You have enabled versioning in your S3 bucket which already contains a lot of files. Which version will the existing files have?

[ ] 1

[ ] 0

[ ] -1

[ ] null

**Correct Answer:** 
null

---

### Why this is the correct answer:

When you enable versioning on an existing S3 bucket, Amazon S3 does not retroactively assign unique version IDs to the objects already stored there. Instead, it follows these rules:

*   **Default State:** Objects that were uploaded to the bucket *before* versioning was enabled are assigned a version ID of **null**.
*   **New Uploads:** Any objects uploaded *after* versioning is enabled will receive a unique, randomly generated version ID (e.g., `3/L4kqtJlcpXroDTDmJ+rmSpXd3dIbrH`).
*   **Suspended State:** If you later suspend versioning on the bucket, new objects (or overwrites) will also receive a version ID of **null**. If a `null` version already exists, it will be overwritten.

### Important Behavior:
If you have an existing file with a `null` version ID and you upload a new version of that same file, the new file gets a **unique version ID**, and the old one remains in the bucket with its **null** ID. You can still access the original file by specifically requesting the `null` version.

---

### S3 Versioning States Summary

| State | Version ID of New Objects | Effect on Existing Objects |
| :--- | :--- | :--- |
| **Unversioned (Default)** | null | N/A |
| **Versioning Enabled** | **Unique String** | **Existing objects keep "null" ID** |
| **Versioning Suspended** | null | Existing versions are preserved |


## Question 38

**Question:**
Which of the following S3 Object Lock configurations allows you to prevent an object or its versions from being overwritten or deleted indefinitely and gives you the ability to remove it manually?

[ ] Retention Governance Mode

[ ] Retention Compliance Mode

[ ] Legal Hold

**Correct Answer:** 
Legal Hold

---

### Why this is the correct answer:

S3 Object Lock provides two main ways to manage data immutability: **Retention Periods** and **Legal Holds**.

*   **Legal Hold (Indefinite & Manual):** Unlike retention periods, a Legal Hold has **no expiration date**. It stays in effect indefinitely once applied. The only way to remove the lock is for a user with the `s3:PutObjectLegalHold` permission to **manually** turn it off. This makes it ideal for situations like active litigation or audits where the end date is unknown.
*   **Retention Governance Mode (Time-based & Overridable):** This uses a fixed "Retain Until Date." While it allows users with special permissions (like `s3:BypassGovernanceRetention`) to delete the object, it is primarily designed as a time-based lock, not an indefinite one.
*   **Retention Compliance Mode (Time-based & Strictest):** This also uses a fixed "Retain Until Date." During the retention period, **no one** (including the root user) can delete the object or shorten the period. Like Governance mode, it is fundamentally tied to a specific duration, not an indefinite manual switch.

### Comparison Summary:

| Feature | Duration | Manual Removal? | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Governance Mode** | Fixed Period | Yes (with permissions) | Testing or internal policy |
| **Compliance Mode** | Fixed Period | **No** (Strict WORM) | SEC/FINRA regulatory compliance |
| **Legal Hold** | **Indefinite** | **Yes (Explicit off-switch)** | **Legal discovery or ongoing audits** |


## Question 39

**Question:**
An e-commerce company has its customers and orders data stored in an S3 bucket. The company’s CEO wants to generate a report to show the list of customers and the revenue for each customer. Customer data stored in files on the S3 bucket has sensitive information that we don’t want to expose in the report. How do you recommend the report can be created without exposing sensitive information?

[ ] Use S3 Object Lambda to change the objects before they are retrieved by the report generator application

[ ] Create another S3 bucket. Create a lambda function to process each file, remove the sensitive information, and then move them to the new S3 bucket

[ ] Use S3 Object Lock to lock the sensitive information from being fetched by the report generator application

**Correct Answer:** Use S3 Object Lambda to change the objects before they are retrieved by the report generator application

---

### Why this is the correct approach:

**Amazon S3 Object Lambda** allows you to add your own code to S3 `GetObject` requests to modify and process data as it is being returned to an application. 

* **On-the-Fly Redaction:** Instead of maintaining multiple copies of the data (one raw and one redacted), S3 Object Lambda runs an AWS Lambda function inline. When the report generator requests a file, the Lambda function automatically strips out or anonymizes the sensitive columns (like PII, credit card numbers, etc.) before the data ever leaves the S3 ecosystem.
* **Single Source of Truth:** This eliminates the operational overhead, storage costs, and security risks of creating a duplicate "clean" bucket. 
* **Context-Aware Access:** You can serve the full data to authorized internal systems while automatically routing the report generator through an Object Lambda Access Point to get the safe, redacted version.

### Why others are incorrect:
* **Creating another S3 bucket:** While this works, it is not the *most* efficient or cost-effective method. It introduces data duplication, extra storage costs, and the operational complexity of managing synchronization pipelines between two buckets.
* **S3 Object Lock:** This is a data-protection feature used to enforce WORM (Write Once, Read Many) compliance to prevent files from being deleted or overwritten. It does not filter or mask data within a file during retrieval.


## Question 40

**Question:**
You have a website that loads files from an S3 bucket. When you try the URL of the files directly in your Chrome browser it works, but when a website with a different domain tries to load these files it doesn't. What's the problem?

[ ] The Bucket policy is wrong

[ ] The IAM policy is wrong

[ ] CORS is wrong

[ ] Encryption is wrong

**Correct Answer:** 
CORS is wrong

---

### Why this is the correct answer:

This is a classic scenario involving **Cross-Origin Resource Sharing (CORS)**. 

*   **Same-Origin Policy:** Browsers enforce a security measure that prevents a script on one domain (e.g., `www.your-app.com`) from making requests to a different domain (e.g., `your-bucket.s3.amazonaws.com`) unless that server explicitly allows it.
*   **Direct Access vs. Script Access:** When you paste the URL directly into Chrome, it is a **direct browser request** (not a cross-origin script request), so the Same-Origin Policy doesn't apply. However, when your website's JavaScript or CSS tries to fetch that same file, the browser sees it as a cross-origin request.
*   **The Fix:** You must configure a CORS policy on the S3 bucket to include the `AllowedOrigins` header, specifying the domain of your website.

### Why others are incorrect:
*   **Bucket/IAM Policy:** If these were wrong, the file would fail to load even when accessed directly in the browser (you would get a 403 Forbidden error). Since the file works directly, the permissions are likely correct.
*   **Encryption:** Encryption settings (like SSE-S3 or SSE-KMS) affect how data is stored and decrypted upon retrieval. They do not distinguish between direct browser access and cross-domain web requests.


## Question 41

**Question:**
You have a website that loads files from an S3 bucket. When you try the URL of the files directly in your Chrome browser it works, but when a website with a different domain tries to load these files it doesn't. What's the problem?

[ ] The Bucket policy is wrong

[ ] The IAM policy is wrong

[ ] CORS is wrong

[ ] Encryption is wrong

**Correct Answer:** 
CORS is wrong

---

### Why this is the correct answer:

This is a classic scenario involving **Cross-Origin Resource Sharing (CORS)**. 

*   **Same-Origin Policy:** Browsers enforce a security measure that prevents a script on one domain (e.g., `www.your-app.com`) from making requests to a different domain (e.g., `your-bucket.s3.amazonaws.com`) unless that server explicitly allows it.
*   **Direct Access vs. Script Access:** When you paste the URL directly into Chrome, it is a **direct browser request** (not a cross-origin script request), so the Same-Origin Policy doesn't apply. However, when your website's JavaScript or CSS tries to fetch that same file, the browser sees it as a cross-origin request.
*   **The Fix:** You must configure a CORS policy on the S3 bucket to include the `AllowedOrigins` header, specifying the domain of your website.

### Why others are incorrect:
*   **Bucket/IAM Policy:** If these were wrong, the file would fail to load even when accessed directly in the browser (you would get a 403 Forbidden error). Since the file works directly, the permissions are likely correct.
*   **Encryption:** Encryption settings (like SSE-S3 or SSE-KMS) affect how data is stored and decrypted upon retrieval. They do not distinguish between direct browser access and cross-domain web requests.


## Question 42

**Question:**
Your company does not trust AWS for the encryption process and wants it to happen on the application. You recommend them to use ....................

[ ] SSE-S3

[ ] SSE-KMS

[ ] SSE-C

[ ] Client-Side Encryption

**Correct Answer:** 
Client-Side Encryption

---

### Why this is the correct answer:

**Client-Side Encryption (CSE)** is the only option where the encryption process happens **before** the data ever reaches the AWS network.

*   **Zero-Knowledge Storage:** In this model, your application encrypts the data locally using an encryption library (like the Amazon S3 Encryption Client). By the time the data is sent to S3, it is already ciphertext. AWS only ever sees and stores a "meaningless blob of information."
*   **Trust Model:** This is designed for organizations with the highest security requirements or those that do not want to trust a third-party cloud provider with their plaintext data or encryption keys.
*   **Key Ownership:** You maintain absolute control over the master keys. Even if the S3 service or the AWS infrastructure were fully compromised, the attacker would only find encrypted data that cannot be decrypted without your local keys.

### Why others are incorrect:
*   **SSE-S3 & SSE-KMS:** These are "Server-Side" encryption methods. The data travels to AWS in plaintext (over HTTPS), and **AWS performs the encryption** using their own hardware.
*   **SSE-C:** While you provide the key, the **encryption process still happens on AWS servers**. You send the key and the plaintext data to S3, and S3 handles the actual encryption/decryption. If you "do not trust AWS for the encryption process," you cannot use SSE-C.


## Question 43

**Question:**
You suspect that some of your employees try to access files in an S3 bucket that they don't have access to. How can you verify this is indeed the case without them noticing?

[ ] Enable S3 Access Logs and analyze them using Athena

[ ] Restrict their IAM policies and look at CloudTail logs

[ ] Use a bucket policy

**Correct Answer:** 
Enable S3 Access Logs and analyze them using Athena

---

### Why this is the correct approach:

To catch unauthorized access attempts silently and comprehensively, you need a logging mechanism that captures detailed "denied" requests at the bucket level.

*   **S3 Server Access Logs:** These logs provide detailed records for the requests that are made to a bucket. This includes both successful requests and **Access Denied (403)** errors. Importantly, enabling these logs is a management-plane action that is invisible to the end-user.
*   **Analyzing with Amazon Athena:** Because access logs are delivered as text files to a destination bucket, they can be difficult to read manually. **Athena** allows you to run SQL queries directly against these log files to filter for `403 Forbidden` responses, the IAM user agent, and the source IP addresses of the employees.
*   **Audit Trail:** This method provides a clear, forensic trail of *who* tried to access *what* and *when*, without changing any permissions that might tip off the employees.

### Why others are incorrect:
*   **Restrict their IAM policies:** If you change their policies, the employees will immediately notice they have lost access to things they previously used. This fails the "without them noticing" requirement. Furthermore, checking **CloudTrail** is a valid alternative, but S3 data-level events (like `GetObject`) are not logged by CloudTrail by default—you have to explicitly enable "Data Events," which can be very expensive compared to Access Logs.
*   **Use a bucket policy:** A bucket policy is used to *enforce* permissions, not to *log* or *analyze* history. Updating a policy doesn't show you past attempts; it only prevents or allows future ones.


## Question 44

**Question:**
You have enabled versioning and want to be extra careful when it comes to deleting files on an S3 bucket. What should you enable to prevent accidental permanent deletions?

[ ] Use a bucket policy

[ ] Enable MFA Delete

[ ] Encrypt the files

[ ] Disable versioning

**Correct Answer:** 
Enable MFA Delete

---

### Why this is the correct answer:

**MFA Delete** is a security feature that provides an additional layer of protection specifically for versioned buckets. When enabled, it requires multi-factor authentication (a physical or virtual MFA device code) for two high-risk operations:

1.  **Permanently deleting an object version:** To remove a specific version of a file (which is irreversible), you must provide an MFA code.
2.  **Changing the versioning state of the bucket:** Suspending or disabling versioning also requires MFA.

### Key Operational Rules:
*   **Root Account Only:** Only the **AWS Account Root User** can enable or disable MFA Delete. Even an administrator with "Full S3 Access" cannot toggle this feature.
*   **CLI/API Only:** You cannot enable MFA Delete via the AWS Management Console. It must be configured using the **AWS CLI** or **S3 API**.
*   **Accidental Protection:** Standard "deletes" in a versioned bucket only create a **Delete Marker**. This is reversible. MFA Delete specifically protects against the "Permanent Delete" action that would actually erase the data from AWS storage.

### Why others are incorrect:
*   **Bucket policy:** While you can use a bucket policy to deny the `s3:DeleteObjectVersion` permission, it doesn't provide the "second factor" hardware/software token requirement that MFA Delete offers.
*   **Encrypt the files:** Encryption protects the *confidentiality* of the data but has no impact on whether a file can be deleted.
*   **Disable versioning:** This would actually make accidental deletions **more** dangerous, as deleting an object without versioning enabled is permanent and immediate.


## Question 45

**Question:**
For compliance reasons, your company has a policy mandate that database backups must be retained for 4 years. It shouldn't be possible to erase them. What do you recommend?

[ ] Glacier Vaults with Vault Lock Policies

[ ] EFS network drives with restrictive Linux permissions

[ ] S3 with Bucket Policies

**Correct Answer:** 
Glacier Vaults with Vault Lock Policies

---

### Why this is the correct approach:

When dealing with strict compliance mandates (like a 4-year non-erasable rule), you need a **WORM (Write Once, Read Many)** solution that cannot be bypassed even by administrators or the root user.

*   **Vault Lock Policy:** Amazon S3 Glacier allows you to deploy a Vault Lock policy on a vault. Once you initiate the lock, you have a **24-hour testing period** where you can still delete it. After you "lock" the policy permanently, the rules become **immutable**. 
*   **Compliance Enforcement:** If your policy says "Deny Delete if object age is less than 4 years," this rule is now hard-coded into the AWS infrastructure. No one—not even the AWS root account—can delete that data until the 4-year timer expires.
*   **Audit-Ready:** This is a standard architectural pattern for industries with high regulatory requirements (like Finance or Healthcare) because it provides a verifiable guarantee to auditors that data cannot be tampered with.

### Why others are incorrect:
*   **EFS with Linux permissions:** Linux permissions (chmod/chown) are easily bypassed by a "root" user or anyone with sudo access. Furthermore, the underlying EFS file system can still be deleted via the AWS Console/API by an IAM administrator.
*   **S3 with Bucket Policies:** While bucket policies can deny deletions, an administrator with the `PutBucketPolicy` permission can simply delete the policy itself and then delete the data. To achieve WORM on S3, you would specifically need **S3 Object Lock in Compliance Mode** (which wasn't the option provided). Standard bucket policies are not considered "immutable" guardrails.


## Question 46

**Question:**
Your client wants to make sure that file encryption is happening in S3, but he wants to fully manage the encryption keys and never store them in AWS. You recommend him to use ............................

[ ] SSE-S3

[ ] SSE-KMS

[ ] SSE-C

[ ] Client-Side Encryption

**Correct Answer:** 
SSE-C

---

### Why this is the correct answer:

**SSE-C (Server-Side Encryption with Customer-Provided Keys)** is the specific AWS feature designed for users who want AWS to handle the heavy lifting of encryption but refuse to let AWS store or manage the actual keys.

*   **Key Possession:** You maintain absolute control over the encryption keys. You do not upload them to AWS KMS or any other AWS service for storage.
*   **The Workflow:** When you perform a `PutObject` or `GetObject` request, you must include the encryption key as a header in the API call. S3 uses that key to encrypt (or decrypt) the data in memory and then **immediately discards the key**. 
*   **Requirement Met:** Since AWS only sees the key for the duration of the cryptographic operation and never saves it to disk, the "never store them in AWS" requirement is satisfied while still allowing the actual encryption processing to happen on S3 infrastructure.

### Why others are incorrect:
*   **SSE-S3:** AWS manages both the keys and the storage. 
*   **SSE-KMS:** While you can manage the *policies*, the keys themselves are physically stored within the AWS KMS infrastructure.
*   **Client-Side Encryption:** While this also keeps keys away from AWS, the encryption happens **on the client's application**, not "in S3" as specified in the prompt's first requirement.

---

> **Crucial Warning:** With SSE-C, if you lose your encryption key, the data in S3 is **permanently unrecoverable**. AWS has no "backup" key and cannot help you recover the files.

## Question 47

**Question:**
A company has its data and files stored on some S3 buckets. Some of these files need to be kept for a predefined period of time and protected from being overwritten and deletion according to company compliance policy. Which S3 feature helps you in doing this?

[ ] S3 Object Lock - Retention Governance Mode

[ ] S3 Versioning

[ ] S3 Object Lock - Retention Compliance Mode

[ ] S3 Glacier Vault Lock

**Correct Answer:** 
S3 Object Lock - Retention Compliance Mode

---

### Why this is the correct approach:

When a company mandate requires data to be protected for a **predefined period** and strictly secured against any deletion (even by administrators), **S3 Object Lock in Compliance Mode** is the intended solution.

*   **Strict WORM (Write Once, Read Many):** In Compliance mode, a protected object version cannot be overwritten or deleted by **any user**, including the AWS account root user.
*   **Immutable Retention:** Once the lock is set, the retention period cannot be shortened, and the mode cannot be changed. This ensures the data remains available for the exact duration required by legal or regulatory standards (e.g., SEC Rule 17a-4(f)).
*   **Compliance vs. Governance:** While Governance mode also protects against deletion, users with special IAM permissions (`s3:BypassGovernanceRetention`) can still delete the data or alter the settings. Compliance mode removes this "backdoor," making it the standard for strict regulatory requirements.

### Why others are incorrect:
*   **S3 Versioning:** This is a **prerequisite** for Object Lock. While it keeps older versions of files, it does not prevent a user with sufficient permissions from permanently deleting those versions.
*   **S3 Glacier Vault Lock:** This is used specifically for **Glacier Vaults** (the archive-only service). While it offers similar WORM protection, the question specifically asks about files stored in **S3 buckets**.
*   **Governance Mode:** As mentioned, this mode is less restrictive and allows authorized administrators to bypass the lock, which usually doesn't satisfy a "strict compliance" mandate.

