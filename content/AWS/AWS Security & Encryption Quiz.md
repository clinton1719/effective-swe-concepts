---
title: AWS Security & Encryption Quiz
tags: [aws, aws-kms, aws-ssm, aws-acm, aws-shield, aws-guardduty, aws-macie, aws-inspector]
difficulty: medium
date: 2026-04-19
---

## Question 1

You have created a Customer-managed CMK in KMS that you use to encrypt both S3 buckets and EBS snapshots. Your company policy mandates that your encryption keys be rotated every 6 months. What should you do?

[ ] Re-configure your KMS CMK and enable Automatic Key Rotation, and configure the Retention Period with 180 days
[ ] Use AWS Managed Keys as they are automatically rotated by AWS every 3 months
[x] Rotate the KMS CMK manually. Create a new KMS CMK and use Key Aliases to reference the new KMS CMK. Keep the old KMS CMK so you can decrypt the old data

**Correct Answer:** ✅ Rotate the KMS CMK manually. Create a new KMS CMK and use Key Aliases to reference the new KMS CMK. Keep the old KMS CMK so you can decrypt the old data

**Explanation:** This is a tricky one regarding rotation intervals. **Automatic Key Rotation** for Customer Managed Keys (CMKs) is managed by AWS, but it occurs automatically every **1 year (365 days)** and this interval cannot be changed. 

Since your company policy requires rotation every **6 months**, you must perform a **Manual Rotation**. This involves:
1. Creating a new CMK.
2. Updating the **Key Alias** to point to the new CMK so your application code doesn't have to change.
3. Keeping the old CMK active so that data previously encrypted with it (like older EBS snapshots or S3 objects) can still be decrypted.

*Note: AWS Managed Keys are rotated automatically every 3 years, not 3 months.*

## Technical Deep Dive: KMS Key Rotation

### Why the "Automatic Rotation" option is incorrect:
1.  **Fixed Rotation Interval:** For Customer Managed Keys (CMKs), when you enable **Automatic Key Rotation**, AWS rotates the key exactly every **365 days**. This interval is hardcoded by AWS and **cannot be configured** to 180 days or any other value.
2.  **Retention Period Confusion:** In AWS KMS, the "Retention Period" (usually 7 to 30 days) refers to how long KMS waits before permanently deleting a key after you have scheduled it for deletion. It has nothing to do with the frequency of rotation.

### Why Manual Rotation is the correct choice:
Since you cannot change the 365-day timer on automatic rotation, a 6-month (180-day) requirement **must** be handled manually:
* **New Key Material:** You create a brand new CMK every 6 months.
* **Aliases:** By using a Key Alias (e.g., `alias/app-key`), your application always points to the alias. You simply update the alias to point to the new ID every 6 months so your code remains unchanged.
* **Backwards Compatibility:** You must never delete the old keys. KMS needs the old key material to decrypt data that was encrypted 6+ months ago.

## Question 2

Your user-facing website is a high-risk target for DDoS attacks and you would like to get 24/7 support in case they happen and AWS bill reimbursement for the incurred costs during the attack. What AWS service should you use?

[ ] AWS WAF
[x] AWS Shield Advanced
[ ] AWS Shield
[ ] AWS DDoS OpsTeam

**Correct Answer:** ✅ AWS Shield Advanced

**Explanation:** While **AWS Shield Standard** is free and protects all customers from common Layer 3 and 4 attacks, **AWS Shield Advanced** provides the specific enterprise-level features mentioned in the question:
* **Shield Response Team (SRT):** Provides 24/7 access to specialized AWS engineers during an active DDoS attack.
* **DDoS Cost Protection:** Provides credits/reimbursement for bill spikes (like scaling out EC2 or CloudFront) caused by a DDoS attack.
* **Advanced Metrics & Visibility:** Real-time reporting and deeper integration with AWS WAF for Layer 7 protection.

*Note: AWS WAF is often used alongside Shield Advanced to block specific malicious requests, but WAF itself does not offer bill reimbursement or a dedicated 24/7 support team.*

## Question 3

You have generated a public certificate using LetsEncrypt and uploaded it to the ACM so you can use and attach to an Application Load Balancer that forwards traffic to EC2 instances. As this certificate is generated outside of AWS, it does not support the automatic renewal feature. How would you be notified 30 days before this certificate expires so you can manually generate a new one?

[ ] Configure ACM to send notifications by linking it to 3rd party certificate provider LetsEncrypt
[x] **Configure EventBridge for Daily Expiration Events from ACM to invoke SNS notifications to your email**
[ ] Configure EventBridge for Monthly Expiration Events from ACM to invoke SNS notifications to your email
[ ] Configure CloudWatch Alarms for Daily Expiration Events from ACM to invoke SNS notifications to your email

**Correct Answer:** ✅ **Configure EventBridge for Daily Expiration Events from ACM to invoke SNS notifications to your email**

**Explanation:** AWS Certificate Manager (ACM) automatically publishes **"ACM Certificate Expiration Threshold"** events to Amazon EventBridge. 
* By default, ACM starts sending these events **daily** starting 45 days before expiration.
* You can create an **EventBridge Rule** to filter these events and trigger an **SNS Topic** as a target, which then sends an email or SMS notification.
* **Why not Monthly?** EventBridge receives these events based on ACM's schedule (which is daily), so you wouldn't configure a "Monthly" event trigger; you simply react to the event ACM sends.
* **Imported Certificates:** Since ACM cannot contact LetsEncrypt to renew the cert (as it doesn't have the private key material or DNS control for external providers), this manual notification workflow is the standard solution for imported certificates.


## Question 4

When you enable Automatic Rotation on your KMS Key, the backing key is rotated every .................

[ ] 90 days
[x] 1 year
[ ] 2 years
[ ] 3 years

**Correct Answer:** ✅ 1 year

**Explanation:** For **Customer Managed Keys (CMKs)** in AWS KMS, automatic key rotation occurs exactly every **365 days** (1 year). 

When you enable this feature:
* AWS KMS generates new cryptographic material for the CMK every year.
* It saves the older cryptographic material forever so that it can be used to decrypt any data that was encrypted with it.
* You do not need to change your application code or update your resource aliases.

**Important Distinction:**
* **Customer Managed Keys:** Rotated every **1 year**.
* **AWS Managed Keys:** Rotated automatically every **3 years**.

## Question 5

What is the most suitable AWS service for storing RDS DB passwords which also provides you automatic rotation?

[x] AWS Secrets Manager
[ ] AWS KMS
[ ] AWS SSM Parameter Store

**Correct Answer:** ✅ AWS Secrets Manager

**Explanation:** While both Secrets Manager and SSM Parameter Store can store sensitive strings, **AWS Secrets Manager** is the specific service designed for secrets that require rotation logic.

* **Native Integration:** Secrets Manager has built-in integration with **Amazon RDS**, allowing it to rotate passwords automatically without manual coding.
* **Lambda Rotation:** It uses an AWS Lambda function behind the scenes to update the password in both the RDS database and the secret itself.
* **SSM Parameter Store:** While it can store passwords (SecureString), it does not offer a native "out-of-the-box" rotation feature; you would have to build and manage a custom rotation solution yourself.

## Question 6

To enable In-flight Encryption (In-Transit Encryption), we need to have ........................

[ ] an HTTP endpoint with an SSL certificate
[x] an HTTPS endpoint with an SSL certificate
[ ] a TCP endpoint

**Correct Answer:** ✅ an HTTPS endpoint with an SSL certificate

**Explanation:** **In-flight encryption** ensures that data is encrypted while it is traveling over the network between a client and a server. 

* **HTTPS (Hypertext Transfer Protocol Secure)** is the secure version of HTTP. It uses **SSL/TLS certificates** to encrypt the communication channel.
* **HTTP** is unencrypted (plain text), meaning anyone intercepting the traffic can read the data.
* While you can use TLS over raw **TCP**, the most common and standard implementation for web applications and APIs is **HTTPS** using an SSL/TLS certificate managed by services like **AWS Certificate Manager (ACM)**.

## Question 7

You are managing an AWS Organization with multiple AWS accounts. Each account has a separate application with different resources. You want an easy way to manage Security Groups and WAF Rules across those accounts as there was a security incident the last week and you want to tighten up your resources. Which AWS service can help you to do so?

[ ] AWS Guard Duty
[ ] Amazon Shield
[ ] Amazon Inspector
[x] AWS Firewall Manager

**Correct Answer:** ✅ AWS Firewall Manager

**Explanation:** **AWS Firewall Manager** is a security management service that allows you to centrally configure and manage firewall rules across all your accounts and applications in **AWS Organizations**.

* **Centralized Control:** Instead of manually updating Security Groups or WAF Web ACLs in every single account, you create "policies" in Firewall Manager that are automatically rolled out across the organization.
* **Compliance:** It ensures that new resources created in any account automatically comply with your mandatory security rules. If a developer creates a resource that violates a policy, Firewall Manager can notify you or even automatically remediate it.
* **Supported Protections:** It manages AWS WAF rules, AWS Shield Advanced protections, VPC Security Groups, and AWS Network Firewalls.

## Question 8

You have a secret value that you use for encryption purposes, and you want to store and track the values of this secret over time. Which AWS service should you use?

[ ] AWS KMS Versioning feature
[x] SSM Parameter Store
[ ] Amazon S3

**Correct Answer:** ✅ SSM Parameter Store

**Explanation:** **AWS Systems Manager (SSM) Parameter Store** is the ideal service for storing configuration data and secrets (using the `SecureString` type). 

* **Tracking over time:** Parameter Store automatically maintains a **version history** for every parameter. Each time you update a value, the version number increments (e.g., Version 1, Version 2, Version 3), allowing you to track changes and even "roll back" to a previous value if needed.
* **Encryption:** When using the `SecureString` type, Parameter Store integrates with **AWS KMS** to encrypt the data.
* **Why not KMS Versioning?** AWS KMS manages "Key Material" versions internally for rotation, but it is not a storage service for your own custom secrets or strings.

## Question 9

You have created the main Edge-Optimized API Gateway in us-west-2 AWS region. This main Edge-Optimized API Gateway forwards traffic to the second level API Gateway in ap-southeast-1. You want to secure the main API Gateway by attaching an ACM certificate to it. Which AWS region are you going to create the ACM certificate in?

[x] us-east-1
[ ] us-west-2
[ ] ap-southeast-1
[ ] Both us-east-1 and us-west-2 works

**Correct Answer:** ✅ us-east-1

**Explanation:** This is a specific requirement for **Edge-Optimized** endpoints in AWS.

* **Edge-Optimized API Gateway:** These endpoints are actually managed by **Amazon CloudFront** behind the scenes to route traffic through the nearest AWS edge location. 
* **ACM Regional Requirement:** Because CloudFront is a global service, it requires any SSL/TLS certificates used for its distributions (including those for Edge-Optimized APIs) to be stored in the **us-east-1 (N. Virginia)** region.
* Even though your API Gateway resources are defined in `us-west-2`, the certificate itself must reside in `us-east-1` for the edge distribution to access it.

*Note: If this were a **Regional** API Gateway instead of Edge-Optimized, you would create the certificate in the same region as the API (us-west-2).*

## Question 10

Which AWS service allows you to centrally manage EC2 Security Groups and AWS Shield Advanced across all AWS accounts in your AWS Organization?

[ ] AWS Shield
[ ] AWS GuardDuty
[ ] AWS Config
[x] AWS Firewall Manager

**Correct Answer:** ✅ AWS Firewall Manager

**Explanation:** **AWS Firewall Manager** is the correct service for central management across an entire organization. While other services monitor or protect, Firewall Manager is designed for **administration and enforcement**:

* **Cross-Account Management:** It integrates with **AWS Organizations** to apply security policies to all accounts or specific Organizational Units (OUs).
* **Supported Services:** It can centrally manage VPC Security Groups, AWS Shield Advanced, AWS WAF rules, and AWS Network Firewall.
* **Automatic Compliance:** If a new account is added to the organization or a new resource is created, Firewall Manager automatically applies the mandatory security rules you've defined.

## Question 11

You would like to analyze OS vulnerabilities from within EC2 instances. You need these analyses to occur weekly and provide you with concrete recommendations in case vulnerabilities are found. Which AWS service should you use?

[ ] AWS Shield
[ ] Amazon GuardDuty
[x] Amazon Inspector
[ ] AWS Config

**Correct Answer:** ✅ Amazon Inspector

**Explanation:** **Amazon Inspector** is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS.

* **Vulnerability Scanning:** It specifically scans **EC2 instances**, container images in ECR, and Lambda functions for software vulnerabilities (CVEs) and unintended network exposure.
* **Deep Analysis:** It looks at the **OS level** and installed software packages to find security flaws.
* **Continuous/Scheduled Scanning:** It can be configured to run automatically and provides a prioritized list of security findings with **actionable recommendations** for remediation.
* **Why not GuardDuty?** GuardDuty is a threat detection service that monitors network logs (like VPC Flow Logs and DNS logs) for malicious activity, but it does not scan the internal OS for vulnerabilities like Inspector does.

## Question 12

An online-payment company is using AWS to host its infrastructure. The frontend is created using VueJS and is hosted on an S3 bucket and the backend is developed using PHP and is hosted on EC2 instances in an Auto Scaling Group. As their customers are worldwide, they use both CloudFront and Aurora Global database to implement multi-region deployments to provide the lowest latency and provide availability, and resiliency. A new feature required which gives customers the ability to store data encrypted on the database and this data must not be disclosed even by the company admins. The data should be encrypted on the client side and stored in an encrypted format. What do you recommend to implement this?

[x] Using Aurora Client-side Encryption and KMS Multi-region Keys
[ ] Using Lambda Client-side Encryption and KMS Multi-region Keys
[ ] Using Aurora Client-side Encryption and CloudHSM
[ ] Using Lambda Client-side Encryption and CloudHSM

**Correct Answer:** ✅ Using Aurora Client-side Encryption and KMS Multi-region Keys

**Explanation:** This scenario requires **Client-side Encryption** to ensure that data is encrypted before it ever reaches the database, preventing even DB admins from viewing the plaintext.

* **AWS Encryption SDK (Client-side):** By using the AWS Encryption SDK within the application (in this case, the PHP backend acting as the "client" to the database), data is encrypted before being sent to Aurora. 
* **KMS Multi-Region Keys:** Since the company uses **Aurora Global Database** across multiple regions, **KMS Multi-Region Keys** are the perfect fit. They allow you to "replicate" the same key identity across different regions. This means data encrypted in one region can be decrypted in another region without having to re-encrypt the data or cross-call a different region's KMS, maintaining low latency.
* **Why not CloudHSM?** While CloudHSM provides high security, it is significantly more complex to manage and does not offer the same seamless multi-region replication and integration for this specific use case as KMS Multi-Region keys do.

## Question 13

AWS KMS supports both symmetric and asymmetric KMS keys.

[x] True
[ ] False

**Correct Answer:** ✅ True

**Explanation:** AWS KMS supports two types of Key Management Service (KMS) keys:

* **Symmetric KMS Keys:** These use a single 256-bit encryption key that is used for both encryption and decryption. The key material never leaves AWS KMS unencrypted. This is the most common type used by AWS services (like S3, EBS, and RDS) for "envelope encryption."
* **Asymmetric KMS Keys:** These consist of a mathematically related **public key** and **private key** pair. You can share the public key with anyone to encrypt data or verify a digital signature, but the private key (which never leaves KMS) is required to decrypt data or create a digital signature. These are commonly used for signing code or communicating with outside parties who don't have access to your AWS account.

## Question 14

You have an AMI that has an encrypted EBS snapshot using KMS CMK. You want to share this AMI with another AWS account. You have shared the AMI with the desired AWS account, but the other AWS account still can't use it. How would you solve this problem?

[ ] The other AWS account needs to logout and login again to refresh its credentials
[x] You need to share the KMS CMK used to encrypt the AMI with the other AWS account
[ ] You can't share an AMI that has an encrypted EBS snapshot

**Correct Answer:** ✅ You need to share the KMS CMK used to encrypt the AMI with the other AWS account

**Explanation:** When you share an AMI that is backed by an encrypted EBS snapshot, the target account needs two things to launch an instance:
1. **Permission to the AMI:** (Which you have already granted).
2. **Permission to use the KMS Key:** Because the data is encrypted, the target account's EC2 service must be able to use the KMS CMK to decrypt the volume during the launch process.

To fix this, you must update the **KMS Key Policy** of the CMK in the source account to include the Target Account ID as an authorized user. Specifically, the target account needs `kms:DescribeKey`, `kms:CreateGrant`, and `kms:Decrypt` permissions.

*Note: You cannot share AMIs encrypted with the **default AWS Managed Key** (aws/ebs). To share an encrypted AMI, it must be encrypted with a **Customer Managed Key (CMK)**.*

## Question 15

In Client-Side Encryption, the server must know our encryption scheme before we can upload the data.

[x] False
[ ] True

**Correct Answer:** ✅ False

**Explanation:** In **Client-Side Encryption**, the process of encrypting data happens entirely on your side (the client) before the data is even sent to the AWS service (the server).

* **Server Blindness:** Because the data is already encrypted when it reaches AWS (e.g., an S3 bucket), the server has no way of knowing what encryption scheme, algorithm, or key was used. 
* **Opaque Objects:** To the server, the data is just an unreadable "blob" of binary. It simply stores the bytes exactly as received and returns them exactly as stored when requested.
* **Responsibility:** You are responsible for managing the encryption process, the keys, and the decryption logic. The server's only job is storage.

## Question 16

What should you use to control access to your KMS CMKs?

[x] KMS Key Policies
[ ] KMS IAM Policy
[ ] AWS GuardDuty
[ ] KMS Access Control List (KMS ACL)

**Correct Answer:** ✅ KMS Key Policies

**Explanation:** **Key Policies** are the primary way to control access to KMS keys in AWS. 

* **Mandatory Requirement:** Every KMS key must have exactly one key policy. It is the fundamental document that determines who can use or manage the key.
* **IAM Integration:** While you can use IAM policies to grant access to KMS, the **Key Policy** itself must explicitly allow the use of IAM policies for that key (by granting permission to the "Root" user of the account). Without this specific statement in the Key Policy, IAM policies targeting the key will be ignored.
* **Scope:** Key policies are resource-based, meaning they are attached directly to the key, similar to how an S3 Bucket Policy is attached to a bucket.
* **KMS ACL:** This does not exist. AWS uses Policies and Grants for KMS access control, not ACLs.

## Question 17

You need to create KMS Keys in AWS KMS before you are able to use the encryption features for EBS, S3, RDS ...

[ ] True
[x] False

**Correct Answer:** ✅ False

**Explanation:** You do **not** need to manually create keys to use encryption in AWS. AWS provides two categories of KMS keys:

* **AWS Managed Keys:** These are created and managed by AWS services (like `aws/s3`, `aws/ebs`, `aws/rds`) on your behalf. They are free to "create" (AWS does it automatically the first time you enable encryption for that service) and are used by default if you don't specify a custom key.
* **Customer Managed Keys (CMKs):** These are keys that you create, own, and manage. You only need to create these if you require features like **manual rotation**, **cross-account sharing**, or **granular key policies**.

So, while KMS is used behind the scenes, the "creation" step is handled automatically by AWS for the default encryption experience.

## Question 18

You have a Lambda function used to process some data in the database. You would like to give your Lambda function access to the database password. Which of the following options is the most secure?

[ ] Embed it in the code
[ ] Have it as a plaintext environment variable
[x] **Have it as an encrypted environment variable and decrypt it at runtime**

**Correct Answer:** ✅ **Have it as an encrypted environment variable and decrypt it at runtime**

**Explanation:** This follows the principle of "Least Privilege" and "Secure Storage."

* **Embed it in the code (Least Secure):** This is extremely dangerous. Anyone with access to the source code (including developers or anyone with access to the Git repository) can see the password. If the code is leaked, the database is compromised.
* **Plaintext environment variable:** While better than hardcoding, anyone with access to the AWS Console or the `GetFunction` API can see the password in clear text.
* **Encrypted environment variable:** This is the most secure of the three options. You use **AWS KMS** to encrypt the value. The Lambda function’s execution role must then have the `kms:Decrypt` permission to decrypt the value at runtime. This ensures that even if someone can see the environment variables, they only see a ciphertext string.

> **Pro-Tip:** While this option is the most secure *among the choices provided*, the **AWS Best Practice** for modern architectures is to use **AWS Secrets Manager** or **SSM Parameter Store** to fetch secrets at runtime. This allows for easier password rotation without redeploying the Lambda function.

## Question 19

You have a website hosted on a fleet of EC2 instances fronted by an Application Load Balancer. What should you use to protect your website from common web application attacks (e.g., SQL Injection)?

[ ] AWS Shield
[x] AWS WAF
[ ] AWS Security Hub
[ ] AWS GuardDuty

**Correct Answer:** ✅ AWS WAF

**Explanation:** **AWS WAF (Web Application Firewall)** is specifically designed to protect web applications at **Layer 7** (the Application Layer) of the OSI model.

* **Layer 7 Protection:** It inspects the actual content of HTTP/HTTPS requests. This allows it to identify and block common patterns used in attacks like **SQL Injection (SQLi)** and **Cross-Site Scripting (XSS)**.
* **Integration:** WAF can be directly attached to an **Application Load Balancer (ALB)**, Amazon CloudFront, or Amazon API Gateway.
* **Rule Sets:** You can use "Managed Rules" provided by AWS to protect against common threats or write your own custom rules to block specific IP addresses or request headers.
* **Why not others?** 
    * **AWS Shield:** Protects against DDoS attacks at Layers 3 and 4 (Network/Transport).
    * **AWS GuardDuty:** A threat detection service that monitors logs for malicious behavior; it doesn't actively block web traffic.
    * **AWS Security Hub:** A security posture management service that aggregates alerts from other AWS security services.

## Question 20

You would like to externally maintain the configuration values of your main database, to be picked up at runtime by your application. What's the best place to store them to maintain control and version history?

[ ] Amazon DynamoDB
[ ] Amazon S3
[ ] Amazon EBS
[x] SSM Parameter Store

**Correct Answer:** ✅ SSM Parameter Store

**Explanation:** **AWS Systems Manager (SSM) Parameter Store** is the best-fit service for managing application configuration and secrets.

* **Version History:** Every time you update a parameter (like a database endpoint or username), Parameter Store automatically creates a new version. You can easily track who changed what and when, or roll back to a previous configuration version if a change causes an issue.
* **Centralized Control:** It provides a hierarchical way to organize data (e.g., `/dev/db/endpoint` or `/prod/db/endpoint`), making it easy to manage environments.
* **Native Integration:** Applications running on EC2, Lambda, or ECS can easily fetch these values at runtime using the AWS SDK, often integrated directly into frameworks like Spring Boot or .NET.
* **Cost & Simplicity:** Unlike DynamoDB or S3, it is specifically optimized for this use case and offers a "Standard" tier that is free for most basic configuration needs.

## Question 21

AWS GuardDuty scans the following data sources, EXCEPT ................

[ ] CloudTrail Logs
[ ] VPC Flow Logs
[ ] DNS Logs
[x] CloudWatch Logs

**Correct Answer:** ✅ CloudWatch Logs

**Explanation:** **Amazon GuardDuty** is a threat detection service that continuously monitors your AWS accounts and workloads for malicious activity. It pulls data directly from specific "Foundational" AWS data sources:

* **VPC Flow Logs:** Used to detect unusual network traffic patterns or communication with known malicious IP addresses.
* **CloudTrail Event Logs:** Used to monitor API activity and detect unauthorized access or account compromises.
* **DNS Logs:** Used to identify if your EC2 instances are communicating with malicious domains (e.g., Command & Control servers).
* **Other Sources:** It also supports scanning S3 Data Events, EBS volumes (for malware), Lambda network logs, and RDS login activity.

**Why CloudWatch Logs is the exception:** While you *can* send logs from many services to CloudWatch, GuardDuty does not scan CloudWatch Logs natively as a primary source. It monitors the raw logs directly from the services (VPC, CloudTrail, Route 53) to ensure performance and security without requiring you to manage the log ingestion yourself.

## Question 22

Which AWS service helps you protect your sensitive data stored in S3 buckets?

[ ] Amazon GuardDuty
[ ] Amazon Shield
[x] Amazon Macie
[ ] AWS KMS

**Correct Answer:** ✅ Amazon Macie

**Explanation:** **Amazon Macie** is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS.

* **Sensitive Data Discovery:** Macie automatically scans your **S3 buckets** to identify sensitive information such as Personally Identifiable Information (PII) (e.g., names, addresses, credit card numbers) and intellectual property.
* **Visibility:** It provides an inventory of your S3 buckets, including those that are publicly accessible, unencrypted, or shared with AWS accounts outside of your organization.
* **Continuous Monitoring:** It generates actionable security findings if it detects sensitive data in buckets where it shouldn't be, allowing you to remediate the risk quickly.
* **Why not KMS?** While AWS KMS provides the *encryption* used to lock the data, it doesn't "discover" or "identify" what is inside the files. Macie is the service that tells you, "This file contains a social security number."

## Question 23

You have an S3 bucket that is encrypted with SSE-KMS. You have been tasked to replicate the objects to a target bucket in the same AWS region but with a different KMS Key. You have configured the S3 replication, the target bucket, and the target KMS key and it is still not working. What is missing to make the S3 replication work?

[ ] This is not a supported feature
[ ] You have to raise a support ticket for AWS to start this replication process for you
[x] **You have to configure permissions for both Source KMS Key kms:Decrypt and Target KMS Key kms:Encrypt to be used by the S3 Replication Service**
[ ] The source KMS Key and the target KMS key must be the same

**Correct Answer:** ✅ **You have to configure permissions for both Source KMS Key kms:Decrypt and Target KMS Key kms:Encrypt to be used by the S3 Replication Service**

**Explanation:** When you use S3 Cross-Region or Same-Region Replication with **SSE-KMS**, the IAM role used by the S3 replication service needs explicit permission to handle the cryptographic keys in both the source and destination.

* **The "Hand-off" Process:** To move an encrypted object, S3 must first **decrypt** it from the source bucket using the source KMS key and then **re-encrypt** it using the target KMS key before storing it in the destination bucket.
* **Source Permissions:** The IAM role needs `kms:Decrypt` for the source KMS key.
* **Target Permissions:** The IAM role needs `kms:Encrypt` for the destination KMS key.
* **Policy Updates:** You must update the **KMS Key Policies** for both keys to allow the IAM role to perform these actions. Without these permissions, the replication will fail even if the buckets themselves are configured correctly.



