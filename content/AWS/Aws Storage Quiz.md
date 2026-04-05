---
title: AWS Storage Quiz
tags: [aws, aws-storage, s3]
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