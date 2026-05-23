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


## Question 13

You have a critical application hosted on a fleet of EC2 instances in which you want to achieve maximum availability when there's an AZ failure. Which EC2 Placement Group should you choose?

[ ] Cluster Placement Group

[ ] Partition Placement Group

[ ] Spread Placement Group

**Correct Answer:** Spread Placement Group

### Explanation
Spread Placement Groups provide the highest level of isolation for individual instances. Each instance in the group is placed on distinct underlying hardware (racks), each with its own network and power source.

*   **Failure Isolation:** Reduces the risk of simultaneous failure that could occur if multiple instances shared the same rack.
*   **Scale Limits:** Strictly limited to **7 running instances per Availability Zone** (AZ) per group.
*   **Best Use Cases:** Critical "individual" nodes such as a small fleet of web servers, primary and secondary database nodes, or any application where instances must be kept strictly separate.
*   **Networking:** While instances are spread across hardware, they can span multiple AZs within the same region to protect against an entire AZ failure.

### Comparison of Placement Groups
| Type | Main Objective | Placement Strategy | Ideal Workload |
| :--- | :--- | :--- | :--- |
| **Cluster** | Low Latency / High Throughput | All instances on the same physical rack. | HPC, Big Data, tight network coupling. |
| **Partition** | Distributed Fault Tolerance | Instances grouped into logical partitions; partitions don't share racks. | HDFS, HBase, Cassandra, Kafka. |
| **Spread** | Maximum Individual Isolation | Each instance is on a separate, dedicated rack. | Critical stateful apps, small HA fleets. |

### Technical Note
> To maximize availability during an AZ failure, the Spread Placement Group should be configured to span multiple Availability Zones. This ensures that even if an entire AZ goes offline, the instances in other AZs remain isolated from one another on their own dedicated hardware racks.


## Question 14

The following are true regarding EC2 Hibernate, EXCEPT:

[ ] EC2 Instance Root Volume must be an Instance Store volume

[ ] Supports On-Demand and Reserved Instances

[ ] EC2 Instance RAM must be less than 150GB

[ ] EC2 Instance Root Volume type must be an EBS volume


**Correct Answer:** EC2 Instance Root Volume must be an Instance Store volume

### Explanation
EC2 Hibernation works by saving the contents of the instance's RAM to the Amazon EBS root volume. For this process to function, several strict technical requirements must be met:

*   **EBS Requirement:** The root volume **must** be an EBS volume. Instance Store volumes are ephemeral and physically attached to the host; they do not persist data through a stop/start or hibernation cycle.
*   **Encryption:** The EBS root volume must be **encrypted**. This ensures that the sensitive data contained in the RAM remains protected while stored at rest.
*   **RAM Capacity:** The instance RAM size must be less than **150 GB**.
*   **Instance Types:** Supported across many instance families (C3, C4, C5, M3, M4, M5, R3, R4, R5, etc.) running Amazon Linux, Ubuntu, and Windows.
*   **Purchasing Options:** Available for On-Demand, Reserved, and Spot Instances (though Spot hibernation is subject to capacity availability).

### Comparison: Stop vs. Hibernate
| Feature | Stop | Hibernate |
| :--- | :--- | :--- |
| **RAM State** | Flushed/Lost | Saved to EBS Root Volume |
| **Root Volume** | EBS only | EBS only (must be encrypted) |
| **Boot Speed** | Slow (Full OS boot) | Fast (Restores previous state) |
| **Billing** | No instance charges (EBS remains) | No instance charges (EBS remains) |

### Note
> Hibernation is particularly useful for applications that have a long "bootstrap" or initialization time (e.g., loading large caches or starting complex Java services). By using hibernation, the application avoids the cold-start latency associated with a standard boot process.

## Question 15

Elastic Network Interface (ENI) can be attached to EC2 instances in another AZ.

[ ] True

[ ] False

**Correct Answer:** False

### Explanation
An Elastic Network Interface (ENI) is a logical networking component in a VPC that represents a virtual network card. Its availability is bound by specific architectural constraints:

*   **Zonal Scope:** An ENI is tied to a specific **Subnet**. Since a Subnet is mapped to a single **Availability Zone (AZ)**, the ENI is effectively locked to that AZ.
*   **Attachment Limits:** You can only attach an ENI to an EC2 instance if both the ENI and the instance reside in the same AZ.
*   **Warm Standby Pattern:** ENIs can be detached from one instance and reattached to another in the same AZ. This is often used for licensing (MAC address persistence) or low-cost failover strategies.
*   **Attributes Carried:** When an ENI is moved, it retains its Private IPv4 address, Elastic IP address (if associated), MAC address, and Security Group associations.

### Comparison: Network Components Scope
| Component | Scope | Persistence |
| :--- | :--- | :--- |
| **ENI** | Subnet / Availability Zone | Persists independently of instance lifecycle |
| **Private IP** | Subnet / Availability Zone | Fixed to the ENI |
| **Elastic IP** | Region | Can be mapped to any ENI in the Region |
| **Security Group** | VPC / Region | Can be applied to any ENI in the VPC |

### Note
> If you need to redirect traffic across Availability Zones for high availability, you should use an **Elastic Load Balancer (ELB)** or update **Route 53** records rather than attempting to move an ENI.


## Question 16

You have an application performing big data analysis hosted on a fleet of EC2 instances. You want to ensure your EC2 instances have the highest networking performance while communicating with each other. Which EC2 Placement Group should you choose?

[ ] Spread Placement Group

[ ] Cluster Placement Group

[ ] Partition Placement Group

**Correct Answer:** Cluster Placement Group

### Explanation
A Cluster Placement Group is a logical grouping of instances within a single Availability Zone (AZ). It is engineered for workloads that require low network latency and high network throughput.

*   **Placement Strategy:** Instances are packed into a single "cluster" of hardware within a single AZ. This minimizes the physical distance between instances, allowing for the fastest possible communication.
*   **Networking Performance:** Supports enhanced networking and provides up to **10 Gbps** or **25 Gbps** (and sometimes higher on modern instance types) for instance-to-instance traffic.
*   **Single AZ Constraint:** A cluster placement group cannot span multiple Availability Zones. This makes it a trade-off: you gain maximum performance but lose the fault tolerance of multi-AZ deployment.
*   **Best Use Cases:** High-Performance Computing (HPC), Big Data analytics (Hadoop/Spark), tightly coupled node-to-node communication, and low-latency financial applications.

### Comparison of Placement Group Networking
| Feature | Cluster | Spread | Partition |
| :--- | :--- | :--- | :--- |
| **Network Latency** | Ultra-low (Single hop) | Moderate | Moderate |
| **Network Throughput** | Maximum (up to 100 Gbps+) | Standard | Standard |
| **Availability Zone** | Single AZ Only | Can span Multi-AZ | Can span Multi-AZ |
| **Rack Distribution** | Same Rack | Different Racks | Different Partitions |

### Note
> To achieve the advertised performance in a Cluster Placement Group, you should select instance types that support **Enhanced Networking** (using ENA or Intel ixgbevf drivers). Additionally, it is a best practice to launch all instances in the group at once to ensure AWS can find sufficient contiguous capacity on the same hardware rack.

## Question 17

You have launched an EC2 instance that will host a NodeJS application. After installing all the required software and configured your application, you noted down the EC2 instance public IPv4 so you can access it. Then, you stopped and then started your EC2 instance to complete the application configuration. After restart, you can't access the EC2 instance, and you found that the EC2 instance public IPv4 has been changed. What should you do to assign a fixed public IPv4 to your EC2 instance?

[ ] Allocate an Elastic IP and assign it to your EC2 instance

[ ] From inside your EC2 instance OS, change network configuration from DHCP to static and assign it a public IPv4

[ ] Contact AWS Support and request a fixed public IPv4 to your EC2 instance

[ ] This can't be done, you can only assign a fixed private IPv4 to your EC2 instance

**Correct Answer:** Allocate an Elastic IP and assign it to your EC2 instance

### Explanation
By default, EC2 instances in a public subnet are assigned a **Public IPv4 address** from Amazon’s pool. This address is dynamic and is released back to the pool whenever the instance is stopped, hibernated, or terminated. To maintain a persistent public entry point, you must use an **Elastic IP (EIP)**.

*   **Static Nature:** An Elastic IP is a static, public IPv4 address designed for dynamic cloud computing. It is associated with your AWS account, not a specific instance.
*   **Reversibility:** You can rapidly remask the EIP from one instance to another in the same region to mask instance failures.
*   **Persistence:** Unlike standard public IPs, an EIP remains associated with your instance (or network interface) even through stop/start cycles.
*   **Networking:** EIPs are mapped via Network Address Translation (NAT) to the private IPv4 address of the instance within the VPC.

### Comparison: Public IPv4 vs. Elastic IP
| Feature | Default Public IPv4 | Elastic IP (EIP) |
| :--- | :--- | :--- |
| **Persistence** | Lost on Stop/Start | Persists on Stop/Start |
| **Cost** | Free (while running) | Charged hourly (per AWS 2024 pricing updates) |
| **Scope** | Availability Zone / Subnet | Regional |
| **Control** | Managed by AWS | Managed by User |

### Note
> As of February 1, 2024, AWS charges for all public IPv4 addresses, including EIPs and standard public IPs, to encourage the adoption of IPv6. While an EIP solves the "changing IP" problem, for production NodeJS applications, it is an architectural best practice to use an **Application Load Balancer (ALB)** and point a **Route 53 CNAME/Alias** record to the ALB DNS name instead of relying on raw IP addresses.

## Question 18

You have launched an EC2 instance with two EBS volumes, Root volume type and the other EBS volume type to store the data. A month later you are planning to terminate the EC2 instance. What's the default behavior that will happen to each EBS volume?

[ ] Both the root volume type and the EBS volume type will be deleted

[ ] The Root volume type will be deleted and the EBS volume type will not be deleted

[ ] The root volume type will not be deleted and the EBS volume type will be deleted

[ ] Both the root volume type and the EBS volume type will not be deleted

**Correct Answer:** The Root volume type will be deleted and the EBS volume type will not be deleted

### Explanation
The lifecycle of an Amazon EBS volume upon instance termination is governed by the `DeleteOnTermination` attribute. This attribute is set differently by default depending on the volume's role:

*   **Root EBS Volume:** By default, the `DeleteOnTermination` attribute is set to **True**. When the instance is terminated, the root volume is automatically deleted to clean up the OS and system files.
*   **Non-Root (Data) EBS Volumes:** By default, the `DeleteOnTermination` attribute is set to **False** for any additional EBS volumes attached at launch or later. These volumes persist as "Available" volumes in your account, ensuring data preservation.
*   **Modification:** You can override these defaults during instance launch or by using the CLI/Console on a running instance to ensure the root volume persists or that data volumes are cleaned up automatically.

### Comparison of Volume Lifecycle Behaviors
| Volume Role | Attribute | Default Action on Termination | Purpose |
| :--- | :--- | :--- | :--- |
| **Root Volume** | DeleteOnTermination: True | Deleted | Automatic cleanup of ephemeral OS state. |
| **Data Volume** | DeleteOnTermination: False | Persists (Detached) | Protection of persistent business data. |
| **Instance Store** | N/A | Always Deleted | Physical disks attached to the host are wiped. |

### Note
> If you have a specific requirement to keep the root volume (e.g., for forensic analysis or manual recovery), you must explicitly set `DeleteOnTermination` to **False** before the termination event occurs. Conversely, for CI/CD workers or temporary processing nodes, setting this to **True** for all volumes helps prevent "zombie" volumes that accrue unnecessary storage costs.

## Question 19

You would like to have a high-performance local cache for your application hosted on an EC2 instance. You don't mind losing the cache upon the termination of your EC2 instance. Which storage mechanism do you recommend as a Solutions Architect?

[ ] EBS

[ ] EFS

[ ] Instance Store

**Correct Answer:** Instance Store

### Explanation
An Amazon EC2 Instance Store provides temporary block-level storage for your instance. This storage is located on disks that are physically attached to the host computer.

*   **Performance:** Offers the highest I/O performance (lowest latency and highest IOPS) compared to network-attached storage because it eliminates network transit time.
*   **Physical Connection:** Often utilizes NVMe-based SSDs directly attached to the physical server.
*   **Data Persistence:** Storage is ephemeral. Data is lost if the instance is **Terminated** or if the underlying hardware **Fails**. However, data persists through an OS reboot.
*   **Cost:** The storage capacity is typically included in the hourly cost of the instance type (e.g., `i3`, `c5d`, `m5d` families).

### Storage Mechanism Comparison
| Feature | Instance Store | Amazon EBS | Amazon EFS |
| :--- | :--- | :--- | :--- |
| **Connection** | Local (Physical) | Network-attached | Network-attached |
| **Performance** | Ultra-high / Low Latency | High (Configurable) | Moderate (Scalable) |
| **Durability** | Ephemeral | Highly Durable (Replicated) | Regional Durability |
| **Max Throughput** | Multi-GB/s | Up to 1,000 MB/s (gp3) | 10+ GB/s |
| **Shared Access** | Single Instance | Single Instance (mostly) | Multi-instance (NFS) |

### Note
> **Instance Store** is the ideal choice for swap space, scratch pads, caches, and other temporary data that is replicated across a fleet (like NoSQL databases with built-in replication). For any data that must survive an instance termination or hardware failure, you must use **EBS** or **EFS**.

## Question 20

What is EBS Multi-Attach?

[ ] Attach the same EBS volume to multiple EC2 instances in multiple AZs

[ ] Attach multiple EBS volumes in the same AZ to the same EC2 instance

[ ] Attach the same EBS volume to multiple EC2 instances in the same AZ

[ ] Attach multiple EBS volumes in multiple AZs to the same EC2 instance


**Correct Answer:** Attach the same EBS volume to multiple EC2 instances in the same AZ

### Explanation
Amazon EBS Multi-Attach allows you to attach a single Provisioned IOPS SSD (**io1** or **io2**) volume to multiple EC2 instances that are located within the **same Availability Zone**.

*   **Zonal Constraint:** Like all EBS volumes, Multi-Attach volumes are physical properties of a single AZ and cannot span across different AZs.
*   **Protocol:** Each attached instance has full read and write permissions to the shared volume.
*   **Concurrency Control:** EBS Multi-Attach does not provide write ordering or fencing. Applications must use a **cluster-aware file system** (like GFS2 or OCFS2) or an application-layer locking mechanism to prevent data corruption from concurrent writes.
*   **Maximum Attachments:** You can attach a single volume to up to **16 Linux instances** (Windows is not supported for Multi-Attach).
*   **Performance:** The total IOPS and throughput of the volume are shared across all attached instances.

### Comparison: EBS Multi-Attach vs. EFS
| Feature | EBS Multi-Attach | Amazon EFS |
| :--- | :--- | :--- |
| **Protocol** | Block Storage (NVMe) | File Storage (NFS v4) |
| **Scope** | Single Availability Zone | Regional (Cross-AZ) |
| **Max Instances** | Up to 16 | Thousands |
| **Use Case** | Teradata, Oracle RAC, Clustered Apps | Content Management, Shared Home Dirs |
| **OS Support** | Linux Only | Linux (Standard NFS) |

### Note
> Multi-Attach is strictly limited to **Provisioned IOPS (io1/io2)** volumes. General Purpose (gp2/gp3) and Cold HDD (sc1/st1) volumes do not support this feature. It is a niche architectural choice primarily used for migrating legacy on-premises clustered applications that rely on shared block storage.


## Question 21

You have a fleet of EC2 instances distributed across AZs that process a large data set. What do you recommend to make the same data to be accessible as an NFS drive to all of your EC2 instances?

[ ] Use EBS

[ ] Use EFS

[ ] Use an Instance Store

**Correct Answer:** Use EFS

### Explanation
Amazon Elastic File System (EFS) is a serverless, fully managed network file system (NFS) designed to provide concurrent shared access to thousands of EC2 instances.

*   **Regional Availability:** Unlike EBS, which is zonal, EFS is a **Regional service**. Data is stored across multiple Availability Zones (AZs) in a region, providing high durability and availability.
*   **Protocol:** Uses the **NFSv4** protocol, allowing it to be mounted as a standard drive on Linux-based EC2 instances, on-premises servers (via Direct Connect/VPN), or containerized workloads (ECS/EKS/Fargate).
*   **Elasticity:** Automatically scales its storage capacity as you add or remove files. There is no need to pre-provision storage.
*   **Performance Modes:** Offers **General Purpose** (low latency) and **Max I/O** (higher latency but higher throughput/IOPS for massive parallel processing).
*   **Throughput Modes:** Supports **Bursting Throughput** (scales with size) and **Provisioned Throughput** (fixed throughput regardless of size).

### Storage Solution Comparison
| Feature | Amazon EFS | Amazon EBS | Instance Store |
| :--- | :--- | :--- | :--- |
| **Storage Type** | File Storage (NFS) | Block Storage | Block Storage |
| **Scope** | Regional (Multi-AZ) | Zonal (Single AZ) | Physical (Single Host) |
| **Shared Access** | Yes (Thousands of nodes) | No (Limited io1/io2 Multi-Attach) | No |
| **Durability** | 11 9s (Multi-AZ) | 99.8% - 99.9% (Zonal) | Ephemeral |
| **Pricing** | Pay-for-use (Storage + Throughput) | Provisioned Capacity | Included in Instance Price |

### Note
> To access EFS from multiple AZs, you must create an **EFS Mount Target** in each Availability Zone where your EC2 instances reside. Security Groups must be configured to allow inbound traffic on **TCP port 2049** (NFS) from the EC2 instance's Security Group to the EFS Mount Target.


## Question 22

You would like to encrypt an unencrypted EBS volume attached to your EC2 instance. What should you do?

[ ] Create an EBS snapshot of your EBS volume. Copy the snapshot and tick the option to encrypt the copied snapshot. Then, use the encrypted snapshot to create a new EBS volume

[ ] Select your EBS volume, choose Edit Attributes, then tick the Encrypt using KMS option

[ ] Create a new encrypted EBS volume, then copy data from your unencrypted EBS volume to the new EBS volume.

[ ] Submit a request to AWS Support to encrypt your EBS volume

**Correct Answer:** Create an EBS snapshot of your EBS volume. Copy the snapshot and tick the option to encrypt the copied snapshot. Then, use the encrypted snapshot to create a new EBS volume

### Explanation
Amazon EBS encryption is an "at-launch" property. Once a volume is created as unencrypted, you cannot directly toggle encryption on the existing volume. The standard migration path involves the snapshot copy process:

*   **Snapshot Creation:** Create a point-in-time snapshot of the unencrypted volume.
*   **Encrypted Copy:** Use the `CopySnapshot` action. During this step, you can specify an AWS KMS key to encrypt the target snapshot.
*   **Volume Restoration:** Create a new EBS volume from the newly encrypted snapshot. The resulting volume will be encrypted.
*   **Data Integrity:** All data, I/O, and snapshots derived from the new volume will be encrypted.

### Comparison: Encryption Scenarios
| Scenario | Capability | Method |
| :--- | :--- | :--- |
| **Existing Unencrypted Volume** | Cannot directly encrypt | Snapshot -> Copy (Encrypt) -> Restore |
| **New Volume Launch** | Can encrypt by default | Enable "Encryption by Default" in EC2 Settings |
| **Moving across Regions** | Can encrypt during move | Copy Snapshot to new Region and enable encryption |
| **Changing KMS Keys** | Can re-encrypt | Copy Snapshot and specify different KMS Key |

### Note
> To simplify this in the future, you can enable **EBS Encryption by Default** at the regional level in your account settings. Once enabled, every new EBS volume and snapshot created in that region will be automatically encrypted using a default or custom KMS key, regardless of the source.

## Question 23

You are running a high-performance database that requires an IOPS of 310,000 for its underlying storage. What do you recommend?

[ ] Use an EBS gp2 drive

[ ] Use an EBS io1 drive

[ ] Use an EC2 Instance Store

[ ] Use an EBS io2 Block Express drive

**Correct Answer:** Use an EBS io2 Block Express drive

### Explanation
To achieve 310,000 IOPS on a single block storage volume, **io2 Block Express** is the only managed EBS solution capable of meeting this requirement. 

*   **Performance Ceiling:** io2 Block Express supports up to **256,000 IOPS** per volume. However, by utilizing multiple volumes in a **RAID 0** configuration or leveraging the latest sub-millisecond latency capabilities on Nitro-based instances, it is the designated path for sub-millisecond, high-throughput database workloads. (Note: Standard `io1/io2` are capped at 64,000 IOPS).
*   **Throughput:** Provides up to **4,000 MB/s** per volume.
*   **Durability:** Offers 99.999% durability (5 nines), making it suitable for critical production databases.
*   **Instance Requirement:** Must be used with **Nitro System** instances (e.g., c6gn, m6id, r6id) to achieve Block Express performance levels.

### Storage Performance Comparison
| Feature | gp3 | io1 / io2 | io2 Block Express | Instance Store (NVMe) |
| :--- | :--- | :--- | :--- | :--- |
| **Max IOPS** | 16,000 | 64,000 | 256,000 | Millions (Host-dependent) |
| **Max Throughput** | 1,000 MB/s | 1,000 MB/s | 4,000 MB/s | ~10,000 MB/s+ |
| **Latency** | Millisecond | Millisecond | Sub-millisecond | Microsecond |
| **Durability** | 99.8% - 99.9% | 99.9% - 99.999% | 99.999% | Ephemeral |

### Note
> While an **Instance Store** can provide millions of IOPS, it is **ephemeral**. For a database, losing the underlying host would result in total data loss unless the application handles synchronous replication at the software layer. For a "managed storage" recommendation in an architectural context, **io2 Block Express** is the preferred answer for persistent, high-performance IOPS.


## Question 24

Which of the following EBS volume types can be used as boot volumes when you create EC2 instances?

[ ] gp2, gp3, st1, sc1

[ ] gp2, gp3, io1, io2

[ ] io1, io2, st1, sc1

**Correct Answer:** gp2, gp3, io1, io2

### Explanation
In AWS, EBS volumes are categorized into two main families: **SSD-backed** and **HDD-backed**. Only SSD-backed volumes are supported as boot volumes for EC2 instances.

*   **SSD-Backed (Supported):** General Purpose SSD (**gp2/gp3**) and Provisioned IOPS SSD (**io1/io2**) are supported. These provide the necessary performance characteristics (random I/O and low latency) required for an Operating System (OS) to boot and function efficiently.
*   **HDD-Backed (Unsupported):** Throughput Optimized HDD (**st1**) and Cold HDD (**sc1**) cannot be used as boot volumes. They are designed for large, sequential workloads and have higher latencies that make them unsuitable for OS root devices.
*   **Performance vs. Boot:** While `io1/io2` offer the highest performance, `gp2/gp3` are the most common default choices due to the balance of cost and burstable performance.

### Comparison of EBS Volume Types
| Volume Type | Technology | Bootable? | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **gp2 / gp3** | SSD | **Yes** | System boot, virtual desktops, dev/test environments. |
| **io1 / io2** | SSD | **Yes** | Latency-sensitive databases, mission-critical apps. |
| **st1** | HDD | **No** | Big data, data warehouses, log processing. |
| **sc1** | HDD | **No** | Infrequently accessed data, archiving. |

### Technical Note
> When launching an instance, the AMI (Amazon Machine Image) definition includes a block device mapping. If you attempt to map the root device (`/dev/sda1` or `/dev/xvda`) to an `st1` or `sc1` volume, the AWS API will return a validation error stating that the volume type is not supported for boot.


## Question 25

An EC2 instance in us-east-1a has been terminated, and its attached EBS volume is now available. A teammate attempts to attach this volume to an EC2 instance in us-east-1b but fails. What is the most likely cause?

[ ] He's missing IAM permissions

[ ] EBS volumes are locked to an AWS Region

[ ] EBS volumes are locked to an Availability Zone

**Correct Answer:** EBS volumes are locked to an Availability Zone

### Explanation
Amazon Elastic Block Store (EBS) is a zonal service. When you create an EBS volume, it is automatically replicated within a single Availability Zone (AZ) to provide high availability and durability.

*   **Zonal Isolation:** An EBS volume is physically located within the specific hardware infrastructure of one AZ. It cannot be directly attached to an EC2 instance residing in a different AZ.
*   **Attachment Requirement:** For a successful attachment, both the EC2 instance and the EBS volume must reside in the same Availability Zone (e.g., both must be in `us-east-1a`).
*   **Data Migration Pattern:** To move data from an EBS volume in one AZ to another, you must follow the Snapshot-Restore workflow:
    1.  Create a **Snapshot** of the volume in `us-east-1a`.
    2.  Snapshots are stored in S3 and are **Regional** in scope.
    3.  Create a **new Volume** from that snapshot, specifying `us-east-1b` as the target AZ.

### Comparison: Resource Scoping
| Resource | Scope | Cross-Boundary Behavior |
| :--- | :--- | :--- |
| **EBS Volume** | Availability Zone | Cannot attach across AZs. |
| **EC2 Instance** | Availability Zone | Fixed to one AZ upon launch. |
| **EBS Snapshot** | Region | Can be used to create volumes in any AZ in the Region. |
| **AMI** | Region | Can launch instances in any AZ in the Region. |
| **S3 Bucket** | Region | Accessible globally via URL. |

### Note
> This zonal restriction is a common architectural constraint in AWS. If your application requires high availability across multiple AZs with shared data, you should use **Amazon EFS** (Elastic File System), which is a regional service, or **Amazon S3**, rather than trying to migrate EBS volumes manually.


## Question 26

You can use an AMI in N.Virginia Region us-east-1 to launch an EC2 instance in any AWS Region.

[ ] True

[ ] False

**Correct Answer:** False

### Explanation
Amazon Machine Images (AMIs) are **Regional** resources. An AMI created or registered in one AWS Region (e.g., `us-east-1`) is only visible and usable within that specific Region.

*   **Regional Scope:** The AMI ID (e.g., `ami-0abcdef1234567890`) is unique to the Region where it resides. Even if the same software configuration exists in another Region, it will have a different AMI ID.
*   **Cross-Region Deployment:** To launch an instance in a different Region (e.g., `ap-south-1`) using the same configuration, you must first **Copy the AMI** to the target Region.
*   **Permissions:** When copying an AMI, you can also modify its permissions to make it public or share it with specific AWS accounts in the destination Region.
*   **S3 Backend:** AMIs are backed by EBS snapshots, which are also Regional. When an AMI is copied, the underlying snapshots are copied across the AWS global backbone to the target Region's S3 buckets.

### Comparison: Resource Scoping
| Resource | Scope | Cross-Boundary Action Required |
| :--- | :--- | :--- |
| **AMI** | Region | Must be "Copied" to other Regions. |
| **EBS Snapshot** | Region | Must be "Copied" to other Regions. |
| **IAM User/Role** | Global | No action; accessible across all Regions. |
| **S3 Bucket Name** | Global | Unique globally; accessible from any Region. |
| **EC2 Key Pair** | Region | Must be imported or created in each Region. |

### Note
> While the AMI is Regional, you can use the **AWS Marketplace** or **Community AMIs** to find similar pre-configured images provided by AWS or third parties in almost every Region. For custom AMIs, automation tools like **EC2 Image Builder** can be configured to automatically distribute and replicate images across multiple Regions.