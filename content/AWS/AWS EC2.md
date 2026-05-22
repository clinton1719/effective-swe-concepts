---
title: AWS EC2 Quiz
tags: [aws, aws-ec2]
difficulty: medium
date: 2026-04-26
---

## Question 1

A user has launched an EC2 instance. The instance got terminated as soon as it was launched. Which of the below mentioned options is not a possible reason for this?

[ ] The user account has reached the maximum volume limit.

[ ] The AMI is missing. It is the required part.

[ ] The snapshot is corrupt.

[ ] **The user account has reached the maximum EC2 instance limit.**

**Correct Answer:** ✅ **The user account has reached the maximum EC2 instance limit.**

**Explanation:** This question tests your knowledge of **Immediate Instance Termination** (the "Pending -> Terminated" state transition).

* **Why "Instance Limit" is NOT the reason:** If you have reached your service quota (limit) for EC2 instances, AWS will prevent you from even *starting* the launch process. You will receive an `InstanceLimitExceeded` error immediately in the console or via API, and the instance will never even reach the "Pending" state.
* **Why the other options ARE possible reasons:**
    * **AMI Missing / Snapshot Corrupt:** If the underlying EBS snapshot is corrupt or the AMI is no longer available/accessible at the moment of creation, the instance will fail to initialize and terminate immediately.
    * **Volume Limit:** If your account has reached the limit for EBS storage (e.g., total GiB of GP3 volumes), the instance may attempt to launch, fail to create the root volume, and then terminate.
    * **Other common reasons (not listed):** The EBS volume is encrypted and you don't have KMS permissions, or the root EBS volume is not found.


## Question 2

What is the most secure way to connect to an EC2 instance without exposing the SSH port 22?

[ ] SSM Session Manager

[ ] Site-to-Site VPN

[ ] AWS Client VPN

[ ] Bastion Host

**Correct Answer:** ✅ **SSM Session Manager**

**Explanation:** **AWS Systems Manager (SSM) Session Manager** is widely considered the most secure modern method for instance access because it fundamentally changes how connectivity works.

*   **Zero Inbound Ports:** Unlike all other options, Session Manager requires **no inbound rules** in your Security Groups. You can completely close port 22. The SSM Agent on the instance initiates an *outbound* connection to the Systems Manager service over HTTPS (port 443).
*   **No Key Management:** It eliminates the need to manage, rotate, or secure SSH keys (PEM files). Authentication is handled entirely through **IAM policies**, meaning you can grant access based on who the user is, not whether they possess a specific file.
*   **Auditability:** Every command entered during a session can be logged to **Amazon CloudWatch Logs** or **Amazon S3**, providing a perfect audit trail for compliance.
*   **No Public IP Needed:** You can connect to instances in private subnets without a NAT Gateway or a Public IP by using VPC Endpoints.

**Why the others are less secure or more complex:**
*   **Bastion Host:** While it keeps your internal instances private, the Bastion itself is a "jump box" that must be exposed to the internet on port 22, creating a single point of failure and a primary target for brute-force attacks.
*   **Site-to-Site / Client VPN:** These are secure for broad network connectivity, but they are "heavy" solutions that require managing tunnels and certificates. Even with a VPN, the instance still typically has port 22 open to the internal network, which doesn't provide the same level of granular command logging and IAM-based access as SSM.

---

> **Pro Tip:** If an exam question asks for access that is **"most secure,"** involves **"no port 22,"** or requires **"audit logs of commands,"** the answer is almost always **SSM Session Manager**.


## Question 3

How long can you reserve an EC2 Reserved Instance?

[ ] 1 or 3 years

[ ] 2 or 4 years

[ ] 6 months or 1 year

[ ] Anytime between 1 and 3 years

**Correct Answer:** ✅ **1 or 3 years**

**Explanation:** Amazon EC2 Reserved Instances (RIs) require a specific commitment term in exchange for a significant discount (up to 75%) compared to On-Demand pricing.

*   **Fixed Terms:** You can only choose a **1-year** or a **3-year** term. There are no options for 2-year, 4-year, or custom month-to-month durations.
*   **Savings:** A 3-year commitment always offers a higher discount percentage than a 1-year commitment.
*   **Payment Options:** For either term, you can choose between **All Upfront**, **Partial Upfront**, or **No Upfront** payment models to further adjust your cost savings.

**Key Difference with Savings Plans:**
While **Savings Plans** (the newer flexible pricing model) also use 1 or 3-year terms, they allow you to commit to a consistent *amount of spend* (e.g., $10/hour) rather than specific instance attributes, but the time commitment remains the same.

---

| Term | Ideal For | Discount Level |
| :--- | :--- | :--- |
| **1 Year** | Moderate predictability; some flexibility needed annually. | High |
| **3 Years** | Steady-state workloads; maximum cost optimization. | Highest |

## Question 4

What should you use to control traffic in and out of EC2 instances?

[ ] Network Access Control List (NACL)

[ ] Security Groups

[ ] IAM Policies

    
**Correct Answer:** ✅ **Security Groups**

**Explanation:** While both Security Groups and NACLs are firewalls used within a VPC, **Security Groups** are the primary tool used to control traffic specifically for **EC2 instances**.

*   **Instance-Level Protection:** A Security Group acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic. You associate the security group with the instance's network interface (ENI).
*   **Stateful:** Security Groups are stateful. If you send a request from your instance, the response traffic for that request is allowed to reach the instance regardless of inbound security group rules (and vice versa).
*   **Allow Rules Only:** You specify "Allow" rules. Any traffic not explicitly allowed is denied by default.
*   **Granularity:** You can filter traffic based on protocol, port range, and source/destination (which can be IP ranges or even other Security Groups).

**Why the others are incorrect:**
*   **Network Access Control List (NACL):** NACLs control traffic at the **Subnet level**, not the instance level. They act as an optional layer of security that impacts all instances within a subnet. They are stateless and support both allow and deny rules.
*   **IAM Policies:** These are used for **Identity and Access Management**. They control which users or services have permission to perform actions on AWS resources (e.g., "Who can start this EC2 instance?"). They do not control network traffic or firewall ports.

---

### Key Comparison

| Feature | Security Group | Network ACL (NACL) |
| :--- | :--- | :--- |
| **Scope** | **Instance Level** | Subnet Level |
| **Type** | Stateful | Stateless |
| **Rules** | Allow rules only | Allow and Deny rules |
| **Evaluation** | All rules evaluated | Rules evaluated in order |


## Question 5

You have an e-commerce application with an OLTP database hosted on-premises. This application has popularity which results in its database has thousands of requests per second. You want to migrate the database to an EC2 instance. Which EC2 Instance Type should you choose to handle this high-frequency OLTP database?

[ ] Compute Optimized

[ ] Storage Optimized

[ ] Memory Optimized

[ ] General Purpose

**Correct Answer:** ✅ **Storage Optimized**

**Explanation:** For a high-frequency **Online Transaction Processing (OLTP)** database with thousands of requests per second, the primary bottleneck is usually **I/O (Input/Output)** performance.

*   **High IOPS:** **Storage Optimized (I-series)** instances are specifically designed for workloads that require high, sequential read and write access to very large data sets on local storage. They provide thousands of low-latency, random IOPS (Input/Output Operations Per Second).
*   **Local NVMe:** These instances often come with local NVMe SSD storage, which is much faster than standard network-attached EBS volumes, making them ideal for high-performance databases.
*   **OLTP Nature:** OLTP workloads involve a high volume of small transactions. Having high-speed, local storage ensures that these transactions are committed and acknowledged as quickly as possible.

**Why the others are less ideal for this specific scenario:**
*   **Compute Optimized (C-series):** These are best for CPU-intensive tasks like high-performance web servers, scientific modeling, or video encoding, rather than high-I/O databases.
*   **Memory Optimized (R/X-series):** These are excellent for **In-Memory** databases (like Redis) or big data analytics (OLAP) where the entire dataset needs to fit into RAM. While good for some databases, "thousands of requests per second" in a standard OLTP context typically points toward storage throughput and IOPS.
*   **General Purpose (M/T-series):** These provide a balance of resources but are generally not recommended for high-performance, production-grade databases with intense request volumes.

---

> **Exam Tip:** Whenever you see **"OLTP," "NoSQL,"** or **"Thousands of IOPS,"** think **Storage Optimized**. If you see **"In-memory"** or **"Large-scale caching,"** think **Memory Optimized**.

## Question 6

Which EC2 Instance Type should you choose for a critical application that uses an in-memory database?

[ ] Compute Optimized
[ ] Storage Optimized
[ ] Memory Optimized
[ ] General Purpose

**Correct Answer:** ✅ **Memory Optimized**

**Explanation:** **Memory Optimized** instances (such as the **R**, **X**, and **High Memory** families) are designed to deliver fast performance for workloads that process large data sets in memory.

*   **In-Memory Performance:** For databases like **Redis**, **Memcached**, or **SAP HANA**, the entire dataset is held in RAM rather than on a disk. These instances provide the highest RAM-to-CPU ratio to accommodate these large datasets and ensure rapid access.
*   **High Throughput:** These instances often feature high memory bandwidth and are powered by the latest processors to ensure that the "in-memory" operations happen with minimal latency.
*   **Critical Workloads:** For enterprise-grade, mission-critical applications, the **X1** or **High Memory** instances can scale up to several terabytes of RAM, providing the stability and capacity required for massive production environments.

**Why the others are incorrect:**
*   **Compute Optimized (C-series):** These are built for workloads that are "CPU-bound," meaning they need raw processing power (like batch processing or video encoding) but do not necessarily require large amounts of RAM.
*   **Storage Optimized (I/D-series):** These are designed for applications that require high, sequential read/write access to data on local *physical* storage (like NoSQL databases or data warehousing). They focus on high IOPS, not large RAM capacity.
*   **General Purpose (M/T-series):** While they provide a balance, they lack the specialized memory density required for a large or critical in-memory database.

---

### Memory-Optimized Use Cases

| Family | Best Used For |
| :--- | :--- |
| **R-Series (e.g., R7g)** | Open-source databases, high-performance relational databases, and mid-sized caches. |
| **X-Series (e.g., X2gd)** | Enterprise-grade in-memory applications, electronic design automation (EDA), and massive datasets. |
| **U-Series (High Memory)** | Large-scale SAP HANA deployments and mission-critical enterprise applications requiring 3TB to 24TB of RAM. |

## Question 7

You would like to deploy a database technology on an EC2 instance and the vendor license bills you based on the physical cores and underlying network socket visibility. Which EC2 Purchasing Option allows you to get visibility into them?

[ ] Spot Instances

[ ] On-Demand

[ ] Dedicated Hosts

[ ] Reserved Instances


**Correct Answer:** ✅ **Dedicated Hosts**

**Explanation:** **Amazon EC2 Dedicated Hosts** provide a physical server with EC2 instance capacity fully dedicated to your use.

*   **Visibility into Hardware:** This is the only option that gives you visibility into the underlying physical server, including **sockets and physical cores**.
*   **Compliance & Licensing:** This is specifically designed for software that requires **Bring Your Own License (BYOL)** models where the vendor (like Microsoft or Oracle) checks the physical hardware configuration for billing.
*   **Host Affinity:** It allows you to ensure that your instances are always launched onto the same physical server, which can be a requirement for specific server-bound software licenses.

**Why the others are incorrect:**
*   **On-Demand / Reserved Instances:** While these can run on **Dedicated Instances** (where you are the only one on the hardware), you do not get visibility into the physical host's sockets or cores. They are managed as virtual resources.
*   **Spot Instances:** These use spare AWS capacity and provide no control or visibility over the underlying physical hardware.

---

### Dedicated Instances vs. Dedicated Hosts

| Feature | Dedicated Instance | Dedicated Host |
| :--- | :--- | :--- |
| **Visibility** | No visibility into sockets/cores | **Visibility into physical sockets/cores** |
| **BYOL Support** | Limited | **Full support for hardware-bound licenses** |
| **Host Affinity** | No | **Yes (Instances stay on the same host)** |
| **Billing** | Per Instance | **Per Host** |


## Question 8

Spot Fleet is a set of Spot Instances and optionally ...............

[ ] Reserved Instances

[ ] On-Demand Instances

[ ] Dedicated Hosts

[ ] Dedicated Instances

**Correct Answer:** **On-Demand Instances**

**Explanation:** An **Amazon EC2 Spot Fleet** is a collection of Spot Instances and, optionally, On-Demand Instances that work together to meet a target capacity that you define.

*   **Mixed Capacity:** By including On-Demand Instances, you can ensure that your application maintains a "baseline" of guaranteed capacity while using Spot Instances to scale out and reduce costs.
*   **Automatic Management:** Spot Fleet manages the launching and termination of instances to maintain your target capacity. If a Spot Instance is interrupted due to a price increase or capacity needs, the fleet can automatically seek to replace it from other available Spot pools or fall back to the On-Demand capacity if configured.
*   **Cost Optimization:** This strategy allows you to benefit from the significant discounts of Spot Instances (up to 90%) without risking total downtime for the application if Spot capacity becomes unavailable.

**Why the others are incorrect:**
*   **Reserved Instances:** These are a billing discount applied to On-Demand instances; they are not a "type" of instance that you specifically add to a fleet configuration.
*   **Dedicated Hosts / Instances:** These involve physical hardware isolation and are generally not combined within a standard Spot Fleet request, as Spot Instances utilize "spare" multi-tenant capacity.

---

> **Pro Tip:** If you want even more flexibility, look into **EC2 Fleet**, which is the newer version of Spot Fleet. It supports Spot, On-Demand, and **Savings Plans** or **Reserved Instance** discounts all in a single API call.


## Question 9
You would like to deploy a High-Performance Computing (HPC) application on EC2 instances. Which EC2 instance type should you choose?

[ ] Storage Optimized

[ ] Compute Optimized

[ ] Memory Optimized 

[ ] General Purpose

**Correct Answer:** Compute Optimized

**Explanation:** In the context of standard AWS instance families, **Compute Optimized** (C-series) is the primary choice for High-Performance Computing (HPC) workloads.
* **Processor Power:** HPC applications—such as scientific modeling, batch processing, and complex simulations—are typically "compute-bound." These instances offer the highest performance processors.
* **Networking:** Modern Compute Optimized instances often support **Elastic Fabric Adapter (EFA)**, which provides the high-speed, low-latency inter-node communication required for parallelized HPC clusters.


## Question 10

You're planning to migrate on-premises applications to AWS. Your company has strict compliance requirements that require your applications to run on dedicated servers. You also need to use your own server-bound software license to reduce costs. Which EC2 Purchasing Option is suitable for you?

[ ] Convertible Reserved Instances

[ ] Dedicated Hosts

[ ] Spot Instances

**Correct Answer:** Dedicated Hosts

**Explanation:** **Amazon EC2 Dedicated Hosts** are the only option that satisfies both the hardware isolation requirement and the specific "server-bound" licensing requirement.

*   **Physical Server Visibility:** Dedicated Hosts give you full visibility into the physical server's **sockets and cores**. This is a technical requirement for many legacy software licenses (like certain versions of Windows Server or SQL Server) that are billed based on physical hardware rather than virtualized resources.
*   **Compliance:** Because the physical server is dedicated entirely to your AWS account, it meets the strictest regulatory and corporate compliance mandates that forbid sharing hardware with other tenants.
*   **Host Affinity:** It allows you to ensure that your instances always restart on the same physical hardware, which helps maintain license compliance over long periods.
*   **BYOL (Bring Your Own License):** This is the primary use case for Dedicated Hosts, allowing you to move existing on-premises licenses to the cloud to avoid the cost of "License Included" instances.

**Why the others are incorrect:**
*   **Convertible Reserved Instances:** These are a billing discount for standard (shared) instances. While they offer flexibility to change instance families, they do not provide dedicated physical hardware or visibility into sockets/cores.
*   **Spot Instances:** These utilize spare AWS capacity on shared hardware. They can be interrupted with a two-minute notice, making them unsuitable for strict compliance or stable, license-bound database workloads.

---

### Comparison: Dedicated Hosts vs. Dedicated Instances

| Feature | Dedicated Instances | Dedicated Hosts |
| :--- | :--- | :--- |
| **Hardware Isolation** | Yes | Yes |
| **Socket/Core Visibility** | No | **Yes** |
| **Host Affinity** | No | **Yes** |
| **Billing Model** | Per Instance | **Per Host** |
| **Best Use Case** | Compliance/Security | **BYOL / Server-bound Licenses** |



## Question 11

You are preparing to launch an application that will be hosted on a set of EC2 instances. This application needs some software installation and some OS packages need to be updated during the first launch. What is the best way to achieve this when you launch the EC2 instances?

[ ] Connect to each EC2 instance using SSH, then install the required software and update your OS packages manually

[ ] Write a bash script that installs the required software and updates to your OS, then contact AWS Support and provide them with the script. They will run it on your EC2 instances at launch

[ ] Write a bash script that installs the required software and updates to your OS, then use this script in EC2 User Data when you launch your EC2 instances

**Correct Answer:** Write a bash script that installs the required software and updates to your OS, then use this script in EC2 User Data when you launch your EC2 instances

**Explanation:** **EC2 User Data** is the standard AWS feature for bootstrapping instances. It allows you to automate the configuration process without manual intervention.

*   **Automation:** By providing a shell script (for Linux) or a PowerShell script (for Windows), you ensure that every instance launched is configured identically and automatically.
*   **Execution Timing:** User Data scripts run only once, specifically during the **very first boot cycle** of the instance.
*   **Root Privileges:** On Linux, scripts in User Data are executed as the `root` user, so you don't need to use `sudo` for commands like `yum install` or `apt-get update`.
*   **Scalability:** This is essential for Auto Scaling Groups, where instances are launched and terminated automatically. You cannot manually SSH into every instance in a dynamic environment.

**Why the others are incorrect:**
*   **Manual SSH:** This is highly inefficient, prone to human error, and does not scale. If you have 100 instances, manual configuration becomes impossible.
*   **AWS Support:** AWS Support does not manage the internal software or OS configuration of your EC2 instances. Under the **Shared Responsibility Model**, the customer is responsible for managing the guest operating system and any software installed on it.

---

> **Pro Tip:** For a Senior Software Engineer like yourself, if the configuration becomes too complex for a simple bash script, the next step is usually creating a **Golden Image** using **EC2 Image Builder** or **Packer**. This bakes the software directly into a custom AMI for even faster boot times.

## Question 12

Which EC2 Purchasing Option can provide you the biggest discount, but it is not suitable for critical jobs or databases?

[ ] Convertible Reserved Instances

[ ] Dedicated Hosts

[ ] Spot Instances

**Correct Answer:** Spot Instances

### Explanation
Spot Instances allow you to request unused EC2 capacity at steep discounts (up to 90% off On-Demand prices). However, they come with specific technical trade-offs:

*   **Interruption Mechanism:** AWS can reclaim capacity with a **2-minute notice** via EC2 Instance Rebalance Recommendation or CloudWatch Events.
*   **Pricing Model:** The Spot Price fluctuates based on long-term supply and demand for the specific Instance Type in an Availability Zone (AZ).
*   **Best Use Cases:** Stateless, fault-tolerant, or flexible applications such as Big Data (Hadoop/Spark), Batch Processing, CI/CD workloads, and optional rendering tasks.
*   **Anti-Patterns:** Not suitable for stateful workloads, long-running jobs that cannot be checkpointed, or production databases.

### Comparison
| Feature | Spot Instances | Reserved Instances | Dedicated Hosts |
| :--- | :--- | :--- | :--- |
| **Max Discount** | Up to 90% | Up to 72% | Minimal (via RI/Savings Plans) |
| **Commitment** | None (On-demand request) | 1 or 3 Years | 1 or 3 Years |
| **Interruption** | Yes (2-minute warning) | No | No |
| **Key Use Case** | Flexible, fault-tolerant | Predictable, steady-state | Compliance, BYOL licensing |

> **Note:** To improve Spot Instance availability, use **Spot Fleet** to diversify your request across multiple Instance Types and Availability Zones.


