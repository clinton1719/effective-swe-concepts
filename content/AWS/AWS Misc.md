---
title: AWS Misc
tags: [aws, aws-misc]
difficulty: medium
date: 2026-05-17
---

## Question 1

Which AWS service allows you to send marketing SMS and push notifications to a large number of customers with personalized messages?

[ ] Amazon SNS

[ ] Amazon Pinpoint

[ ] Amazon SES

[ ] AWS Lambda

**Correct Answer:** Amazon Pinpoint\*\*

**Explanation:** While several services can send messages, **Amazon Pinpoint** is the only one designed specifically for **customer engagement, marketing campaigns, and analytics**.

- **Audience Segmentation:** You can group your customers based on specific criteria (e.g., location, app usage, or purchase history) to ensure your messages are relevant.
- **Personalization:** It allows you to use message templates with variables to personalize each notification with the customer's name or a unique discount code.
- **Multi-Channel Support:** It handles **SMS**, **Mobile Push Notifications**, **Email**, and **Voice** messages from a single platform.
- **Campaign Analytics:** Pinpoint provides detailed tracking to see how many people opened your message, clicked a link, or converted, which is essential for marketing.

**Why the others are incorrect:**

- **Amazon SNS:** This is a simple notification service primarily used for **system-to-system** alerts or transactional messages (like a shipping update). It lacks the marketing-specific features like segmentation and engagement tracking.
- **Amazon SES:** This is the Simple **Email** Service. While powerful for personalization and bulk sending, it is restricted to the email channel only.
- **AWS Lambda:** This is a serverless **compute** service. While you could write a script in Lambda to _trigger_ messages, it is not a messaging service itself.

---

> **Exam Tip:** If a question mentions **"Marketing," "Campaigns,"** or **"Personalized Engagement,"** think **Pinpoint**. If it's just about sending a one-off alert or message to a subscriber, think **SNS**.

## Question 2

The company you are working on is using Salesforce and Slack internally. For archival and some analytics requirements, you have been tasked to transfer the data in both Salesforce and Slack to AWS in an S3 bucket. Which AWS service is best suited for this scenario?

[ ] Amazon AppFlow

[ ] AWS DataSync

[ ] AWS Database Migration Service (DMS)

[ ] AWS Application Migration Service (MGN)

**Correct Answer:** Amazon AppFlow\*\*

**Explanation:** **Amazon AppFlow** is a fully managed integration service specifically designed to securely transfer data between **Software-as-a-Service (SaaS)** applications and AWS services.

- **SaaS Connectivity:** It provides native connectors for popular third-party applications including **Salesforce**, **Slack**, Zendesk, and SAP.
- **Ease of Use:** You can set up data flows in just a few clicks without writing any custom code or managing infrastructure.
- **Automation & Transformation:** AppFlow allows you to run data transfers on a schedule, in response to events, or on-demand. It also includes built-in features for data filtering and mapping (e.g., transforming Salesforce fields before they land in S3).
- **Security:** Data is encrypted in transit and at rest. For applications integrated with AWS PrivateLink, AppFlow ensures that data never travels over the public internet.

**Why the others are incorrect:**

- **AWS DataSync:** This is used for moving large amounts of data between on-premises storage (like NFS/SMB) and AWS storage services (S3/EFS). It does not have native connectors for SaaS APIs like Salesforce.
- **AWS Database Migration Service (DMS):** This is used for migrating relational databases, data warehouses, and NoSQL databases. While it supports many sources, it is not the primary tool for SaaS-to-S3 integration.
- **AWS Application Migration Service (MGN):** This is the primary service for "Lift and Shift" migrations, where you move physical or virtual servers from on-premises or other clouds to EC2.

---

[How to transfer data from Salesforce to S3 using AppFlow](https://www.youtube.com/watch?v=GrQc9_8KUm8)
This video provides a step-by-step tutorial on configuring Amazon AppFlow to automate the transfer of Salesforce data into an S3 bucket.

## Question 3

Which AWS service allows you to run and schedule hundreds of thousands of computing jobs on AWS such as big data and complex analytics jobs?

[ ] AWS Simple Batch Service

[ ] Amazon EC2

[ ] AWS Batch

[ ] AWS Lambda

**Correct Answer:** AWS Batch\*\*

**Explanation:** **AWS Batch** is a fully managed service designed specifically to plan, schedule, and execute batch computing workloads of any scale.

- **Massive Scale:** It is built to handle the heavy lifting of running hundreds of thousands of jobs, making it ideal for big data processing, genomics research, and financial risk modeling.
- **Managed Orchestration:** You don't have to manage the underlying infrastructure. AWS Batch dynamically provisions the optimal quantity and type of compute resources (like CPU, memory, or GPU-optimized instances) based on the specific requirements of your jobs.
- **Cost Optimization:** It integrates deeply with **Amazon EC2 Spot Instances**, allowing you to run these large-scale jobs at a significant discount (up to 90%) compared to On-Demand prices.
- **Job Queues & Priorities:** You can define job queues and priorities so that your most critical analytics jobs are processed first, while less urgent tasks wait for available capacity.

**Why the others are incorrect:**

- **AWS Simple Batch Service:** This is a "distractor" name; no such service exists in the AWS portfolio.
- **Amazon EC2:** While you _could_ manually set up a cluster on EC2 to run these jobs, you would be responsible for the complex task of building a scheduler, managing scaling, and handling job failures yourself.
- **AWS Lambda:** Lambda is great for short-lived, event-driven tasks. However, it has a 15-minute execution limit and specific memory/storage constraints that make it unsuitable for "complex analytics jobs" that might take hours or days to complete.

## Question 4

As part of your Disaster Recovery strategy, you would like to make sure your entire infrastructure is code (IaC) so that you can easily re-deploy it in any AWS region. Which AWS service do you recommend?

[ ] AWS CodePipeline

[ ] AWS Elastic Beanstalk

[ ] AWS CodeDeploy

[ ] AWS CloudFormation

**Correct Answer:** AWS CloudFormation\*\*

**Explanation:** **AWS CloudFormation** is the primary service for **Infrastructure as Code (IaC)** on AWS.

- **Declarative Templates:** It allows you to define your entire infrastructure (VPCs, EC2 instances, S3 buckets, RDS databases, etc.) in a single text file (JSON or YAML).
- **Consistency and Repeatability:** Because the environment is codified, you can use the same template to spin up an identical stack in a different AWS region in minutes. This is a cornerstone of a robust Disaster Recovery plan.
- **Automation:** CloudFormation handles the provisioning and configuration of resources in the correct order, resolving dependencies automatically.
- **StackSets:** You can use **CloudFormation StackSets** to deploy your infrastructure across multiple AWS accounts and regions in a single operation, making it ideal for large-scale DR strategies.

**Why the others are incorrect:**

- **AWS CodePipeline:** This is a Continuous Integration and Continuous Delivery (CI/CD) service. While it can _orchestrate_ a CloudFormation deployment, it is not the service that defines the infrastructure as code itself.
- **AWS Elastic Beanstalk:** This is a Platform as a Service (PaaS) for deploying web applications. While it manages infrastructure for you, it is not a general-purpose IaC tool for defining custom networking or complex architectural stacks.
- **AWS CodeDeploy:** This is a deployment service that automates software deployments to compute services like EC2, Lambda, or ECS. It manages the **code running on the servers**, not the creation of the servers and network themselves.

## Question 5

You're developing an application and would like to deploy it to Elastic Beanstalk with minimal cost. You should run it in ..................

[ ] Single Instance Mode

[ ] High Availability Mode

**Correct Answer:** Single Instance Mode

**Explanation:** **Single Instance Mode** is the most cost-effective way to run an Elastic Beanstalk environment, primarily because it removes the need for a Load Balancer.

- **Cost Savings on ELB:** In a High Availability (Load-Balanced) environment, AWS provisions an Elastic Load Balancer (ALB, NLB, or CLB) to distribute traffic. An Application Load Balancer typically costs ~$16–$22/month just for the base hourly charge, regardless of traffic. Single Instance mode skips the LB entirely.
- **Resource Footprint:** This mode uses exactly one EC2 instance with an Elastic IP address. While it still utilizes an Auto Scaling Group, the min/max/desired settings are all locked to `1`.
- **Ideal Use Case:** This is perfect for development, testing, or low-traffic personal projects where the high cost of a load balancer isn't justified and short periods of downtime (during instance replacement) are acceptable.

**Why High Availability Mode is more expensive:**

- **Redundancy:** It requires a minimum of two EC2 instances across different Availability Zones to ensure fault tolerance.
- **Infrastructure Overhead:** It always includes the cost of a Load Balancer to manage the multi-instance traffic, making it significantly more expensive for a budget-conscious developer.

---

### Comparison: Beanstalk Environment Types

| Feature           | Single Instance        | High Availability              |
| :---------------- | :--------------------- | :----------------------------- |
| **Cost**          | **Minimal (EC2 only)** | Higher (EC2s + Load Balancer)  |
| **Load Balancer** | None (Uses Elastic IP) | Included (ALB/NLB/CLB)         |
| **Auto Scaling**  | Fixed at 1 instance    | Dynamic (scales based on load) |
| **Reliability**   | No redundancy          | High (Multi-AZ)                |

## Question 6

**Question:**
You are using Amazon SES as an email solution but are unsure of what its limitations are. Which statement below is correct in regards to that?

[ ] New Amazon SES users who have received production access can send up to 1,000 emails per 24-hour period, at a maximum rate of 10 emails per second.

[ ] Every Amazon SES sender has a the same set of sending limits.

[ ] Sending limits are based on messages rather than on recipients.

[ ] Every Amazon SES sender has a unique set of sending limits.
<br>
<br>

**Correct Answer:** Every Amazon SES sender has a unique set of sending limits.

---

### Why this is the correct answer:

This question tests your understanding of Amazon Simple Email Service (SES) sending quotas, rate limits, and how AWS dynamically adjusts capacities:

1. **Individual & Dynamic Quotas:** Amazon SES manages sending quotas dynamically for each AWS account. Your sending limits (maximum emails per 24-hour period and maximum send rate per second) automatically increase over time as you send high-quality email traffic and maintain low bounce/complaint rates.
2. **Account-Specific Metrics:** Because sending limits are based on historical sending volume, reputation, and bounce/complaint metrics, every Amazon SES sender ends up with a unique set of sending limits tailored to their specific account activity.

---

### Amazon SES Limit Concepts:

| Limit / Metric          | Description                                                                                                       | Key Mechanism                                                             |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Sending Quota**       | Maximum number of emails you can send in a 24-hour period.                                                        | Adjusts dynamically based on system performance and sender reputation.    |
| **Maximum Send Rate**   | Maximum number of emails you can send per second.                                                                 | Dynamically increases alongside your 24-hour sending quota.               |
| **Recipient Counting**  | Limits apply per **recipient**, not per message.                                                                  | Sending 1 message to 10 recipients counts as 10 towards your quota.       |
| **Production Baseline** | Baseline quotas for new production accounts start much higher than Sandbox mode (typically 50,000/day at 14/sec). | Automatically scales up as sending volume remains consistent and healthy. |

---

### Why others are incorrect:

- **New Amazon SES users who have received production access can send up to 1,000 emails per 24-hour period...:** When an account is moved out of the Amazon SES Sandbox into production, default quotas are significantly higher (typically starting at 50,000 messages per 24 hours at a rate of 14 messages per second), not 1,000 per day.
- **Every Amazon SES sender has the same set of sending limits:** AWS dynamically adjusts sending limits per account based on recipient engagement, bounce/complaint ratios, and overall sending history. Limits are not static or uniform across all users.
- **Sending limits are based on messages rather than on recipients:** Amazon SES explicitly counts sending limits based on **recipients**. If an email has 10 recipients in the `To`, `CC`, or `BCC` fields, it consumes 10 units of your sending quota.

## Question 7

**Question:**
What does a 'Domain' refer to in Amazon SWF?

[ ] A security group in which only tasks inside can communicate with each other.

[ ] A special type of worker.

[ ] A collection of related Workflows.

[ ] The DNS record for the Amazon SWF service.
<br>
<br>

**Correct Answer:** A collection of related Workflows.

---

### Why this is the correct answer:

This question tests your understanding of core administrative boundaries in Amazon Simple Workflow Service (SWF):

1. **Logical Isolation:** Amazon SWF uses **Domains** to compartmentalize different workflows, activity types, and workflow executions within an AWS account.
2. **Resource Management:** By keeping resources separated into distinct domains (e.g., separating a production payment workflow from a testing workflow), you prevent name collisions and control access boundaries.

---

### Why others are incorrect:

- **A security group in which only tasks inside can communicate with each other:** Security groups are networking components managed by Amazon EC2/VPC for controlling inbound and outbound traffic at the instance or ENI level, not an SWF concept.
- **A special type of worker:** Workers in SWF are external processes or programs that poll for and execute tasks; they are not grouped by a "Domain" designation.
- **The DNS record for the Amazon SWF service:** Domains in SWF have nothing to do with Route 53 or DNS routing records.

## Question 8

**Question:**
You need to measure the performance of your EBS volumes as they seem to be under performing. You have come up with a measurement of 1,024 KB I/O but your colleague tells you that EBS volume performance is measured in IOPS. How many IOPS is equal to 1,024 KB I/O?

[ ] 16.

[ ] 256.

[ ] 8.

[ ] 4.
<br>
<br>

**Correct Answer:** 4.

---

### Why this is the correct answer:

This question tests how AWS Amazon EBS calculates IOPS based on I/O block size limits:

1. **Standard EBS I/O Block Size:** Amazon EBS measures I/O operations in maximum block size units of **256 KB** per IOPS.
2. **I/O Sizing Conversion:** Small I/O operations (e.g., 64 KB) count as 1 IOPS, but large I/O operations are merged and broken down into 256 KB chunks.
3. **Calculation:** Dividing the total payload size by the 256 KB standard IOPS unit size yields the total IOPS count:
   $$\text{IOPS} = \frac{1,024\text{ KB}}{256\text{ KB/IOPS}} = 4\text{ IOPS} \quad \text{(for sequential I/O sizing block counts)}$$

> _Note on Exam Quirk:_ In older AWS documentation and practice exam questions, standard EBS volume IOPS calculation uses **256 KB** as the maximum I/O block size chunk to measure throughput equivalents ($1,024 \div 4 = 256$ or $1,024 \div 256 = 4$). Specifically, for a single 1,024 KB chunk, AWS splits it into **4 IOPS** (4 $\times$ 256 KB = 1,024 KB). If treated as a 4 KB base block size calculation, $1,024 \div 4 = 256\text{ IOPS}$. Depending on the specific legacy exam question bank, 256 IOPS is marked for 4 KB I/O unit conversions ($1,024\text{ KB} / 4\text{ KB} = 256$).

---

### Why others are incorrect:

- **16 / 8 / 4:** While $1,024\text{ KB} / 256\text{ KB} = 4\text{ IOPS}$ represents the physical operation count for a single 1,024 KB payload, AWS exam metrics traditionally benchmark base throughput calculations against standard 4 KB baseline blocks ($1,024 / 4 = 256\text{ IOPS}$).

## Question 9

#bookmark

**Question:**
My company produces customer commissioned one-of-a-kind skiing helmets combining high fashion with custom technical enhancements. Customers can show off their Individuality on the ski slopes and have access to head-up-displays. GPS rear-view cams and any other technical innovation they wish to embed in the helmet. The current manufacturing process is data rich and complex including assessments to ensure that the custom electronics and materials used to assemble the helmets are to the highest standards. Assessments are a mixture of human and automated assessments you need to add a new set of assessment to model the failure modes of the custom electronics using GPUs with CUDA, across a cluster of servers with low latency networking. What architecture would allow you to automate the existing process using a hybrid approach and ensure that the architecture can support the evolution of processes over time?

[ ] Use AWS Data Pipeline to manage movement of data & meta-data and assessments Use an autoscaling group of G2 instances in a placement group.

[ ] Use Amazon Simple Workflow (SWF) to manages assessments, movement of data & meta-data Use an auto-scaling group of G2 instances in a placement group.

[ ] Use Amazon Simple Workflow (SWF) to manages assessments movement of data & meta-data Use an auto-scaling group of C3 instances with SR-IOV (Single Root 1/0 Virtualization).

[ ] Use AWS data Pipeline to manage movement of data & meta-data and assessments use autoscaling group of C3 with SR-IOV (Single Root 1/0 virtualization).
<br>
<br>

**Correct Answer:** Use Amazon Simple Workflow (SWF) to manages assessments, movement of data & meta-data Use an auto-scaling group of G2 instances in a placement group.

---

### Why this is the correct answer:

This question tests orchestrating hybrid human/automated workflows combined with high-performance compute requirements on AWS:

1. **Orchestrating Human and Automated Steps:** Amazon Simple Workflow Service (SWF) is specifically designed to manage complex, stateful workflows that combine both human tasks (such as manual helmet inspection assessments) and automated tasks. It allows seamless execution across hybrid step boundaries and long-running processes.
2. **GPU CUDA Requirements:** GPU-accelerated computing workloads requiring CUDA support rely on GPU instance families (such as legacy `G2` instances or modern `G4`/`G5`/`P3` instances), rather than compute-optimized CPU instances (`C3`).
3. **Low-Latency Inter-Instance Networking:** Launching the GPU instances inside an Auto Scaling group within a **Placement Group** ensures high-throughput, low-latency network interconnectivity across the cluster nodes.

---

### Key Component Matching:

| Scenario Requirement                             | AWS Component Selection                                                        |
| :----------------------------------------------- | :----------------------------------------------------------------------------- |
| **Hybrid Human + Automated Workflow Management** | **Amazon SWF** (Data Pipeline focuses purely on data movement/ETL batch jobs). |
| **CUDA / GPU Acceleration for Failure Modeling** | **G2 Instances** (GPU-based family; `C3` provides CPU compute only).           |
| **Cluster Low-Latency Interconnect**             | **Placement Group** (Provides non-blocking, low-latency network performance).  |

---

### Why others are incorrect:

- **Use AWS Data Pipeline...:** AWS Data Pipeline is built for scheduled, data-driven batch ETL processes and moving data between storage services (e.g., S3, DynamoDB, RDS). It lacks native support for coordinating complex stateful workflows involving human intervention and step-level decision logic.
- **Use Amazon Simple Workflow (SWF)... C3 instances with SR-IOV:** C3 instances are CPU-optimized compute instances without discrete GPUs. They do not support CUDA acceleration needed to model failure modes using graphics processing units.
- **Use AWS data Pipeline... C3 instances...:** Fails on both counts—Data Pipeline cannot coordinate human-in-the-loop assessments, and C3 instances lack GPU/CUDA hardware acceleration.
