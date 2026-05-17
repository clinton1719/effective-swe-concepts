---
title: AWS Misc
tags: [aws, aws-misc]
difficulty: medium
date: 2026-05-17
---

## Question 1

Which AWS service allows you to send marketing SMS and push notifications to a large number of customers with personalized messages?

[ ] Amazon SNS

[ ] ✅ **Amazon Pinpoint**

[ ] Amazon SES

[ ] AWS Lambda

**Correct Answer:** ✅ **Amazon Pinpoint**

**Explanation:** While several services can send messages, **Amazon Pinpoint** is the only one designed specifically for **customer engagement, marketing campaigns, and analytics**.

*   **Audience Segmentation:** You can group your customers based on specific criteria (e.g., location, app usage, or purchase history) to ensure your messages are relevant.
*   **Personalization:** It allows you to use message templates with variables to personalize each notification with the customer's name or a unique discount code.
*   **Multi-Channel Support:** It handles **SMS**, **Mobile Push Notifications**, **Email**, and **Voice** messages from a single platform.
*   **Campaign Analytics:** Pinpoint provides detailed tracking to see how many people opened your message, clicked a link, or converted, which is essential for marketing.

**Why the others are incorrect:**
*   **Amazon SNS:** This is a simple notification service primarily used for **system-to-system** alerts or transactional messages (like a shipping update). It lacks the marketing-specific features like segmentation and engagement tracking.
*   **Amazon SES:** This is the Simple **Email** Service. While powerful for personalization and bulk sending, it is restricted to the email channel only.
*   **AWS Lambda:** This is a serverless **compute** service. While you could write a script in Lambda to *trigger* messages, it is not a messaging service itself.

---

> **Exam Tip:** If a question mentions **"Marketing," "Campaigns,"** or **"Personalized Engagement,"** think **Pinpoint**. If it's just about sending a one-off alert or message to a subscriber, think **SNS**.

## Question 2

The company you are working on is using Salesforce and Slack internally. For archival and some analytics requirements, you have been tasked to transfer the data in both Salesforce and Slack to AWS in an S3 bucket. Which AWS service is best suited for this scenario?

[ ] ✅ **Amazon AppFlow**

[ ] AWS DataSync

[ ] AWS Database Migration Service (DMS)

[ ] AWS Application Migration Service (MGN)

**Correct Answer:** ✅ **Amazon AppFlow**

**Explanation:** **Amazon AppFlow** is a fully managed integration service specifically designed to securely transfer data between **Software-as-a-Service (SaaS)** applications and AWS services.

*   **SaaS Connectivity:** It provides native connectors for popular third-party applications including **Salesforce**, **Slack**, Zendesk, and SAP. 
*   **Ease of Use:** You can set up data flows in just a few clicks without writing any custom code or managing infrastructure.
*   **Automation & Transformation:** AppFlow allows you to run data transfers on a schedule, in response to events, or on-demand. It also includes built-in features for data filtering and mapping (e.g., transforming Salesforce fields before they land in S3).
*   **Security:** Data is encrypted in transit and at rest. For applications integrated with AWS PrivateLink, AppFlow ensures that data never travels over the public internet.

**Why the others are incorrect:**
*   **AWS DataSync:** This is used for moving large amounts of data between on-premises storage (like NFS/SMB) and AWS storage services (S3/EFS). It does not have native connectors for SaaS APIs like Salesforce.
*   **AWS Database Migration Service (DMS):** This is used for migrating relational databases, data warehouses, and NoSQL databases. While it supports many sources, it is not the primary tool for SaaS-to-S3 integration.
*   **AWS Application Migration Service (MGN):** This is the primary service for "Lift and Shift" migrations, where you move physical or virtual servers from on-premises or other clouds to EC2.

---

[How to transfer data from Salesforce to S3 using AppFlow](https://www.youtube.com/watch?v=GrQc9_8KUm8)
This video provides a step-by-step tutorial on configuring Amazon AppFlow to automate the transfer of Salesforce data into an S3 bucket.

## Question 3

Which AWS service allows you to run and schedule hundreds of thousands of computing jobs on AWS such as big data and complex analytics jobs?

[ ] AWS Simple Batch Service

[ ] Amazon EC2

[ ] ✅ **AWS Batch**

[ ] AWS Lambda

**Correct Answer:** ✅ **AWS Batch**

**Explanation:** **AWS Batch** is a fully managed service designed specifically to plan, schedule, and execute batch computing workloads of any scale.

*   **Massive Scale:** It is built to handle the heavy lifting of running hundreds of thousands of jobs, making it ideal for big data processing, genomics research, and financial risk modeling.
*   **Managed Orchestration:** You don't have to manage the underlying infrastructure. AWS Batch dynamically provisions the optimal quantity and type of compute resources (like CPU, memory, or GPU-optimized instances) based on the specific requirements of your jobs.
*   **Cost Optimization:** It integrates deeply with **Amazon EC2 Spot Instances**, allowing you to run these large-scale jobs at a significant discount (up to 90%) compared to On-Demand prices.
*   **Job Queues & Priorities:** You can define job queues and priorities so that your most critical analytics jobs are processed first, while less urgent tasks wait for available capacity.

**Why the others are incorrect:**
*   **AWS Simple Batch Service:** This is a "distractor" name; no such service exists in the AWS portfolio.
*   **Amazon EC2:** While you *could* manually set up a cluster on EC2 to run these jobs, you would be responsible for the complex task of building a scheduler, managing scaling, and handling job failures yourself.
*   **AWS Lambda:** Lambda is great for short-lived, event-driven tasks. However, it has a 15-minute execution limit and specific memory/storage constraints that make it unsuitable for "complex analytics jobs" that might take hours or days to complete.

## Question 4

As part of your Disaster Recovery strategy, you would like to make sure your entire infrastructure is code (IaC) so that you can easily re-deploy it in any AWS region. Which AWS service do you recommend?

[ ] AWS CodePipeline
[ ] AWS Elastic Beanstalk
[ ] AWS CodeDeploy
[ ] ✅ **AWS CloudFormation**

**Correct Answer:** ✅ **AWS CloudFormation**

**Explanation:** **AWS CloudFormation** is the primary service for **Infrastructure as Code (IaC)** on AWS.

*   **Declarative Templates:** It allows you to define your entire infrastructure (VPCs, EC2 instances, S3 buckets, RDS databases, etc.) in a single text file (JSON or YAML).
*   **Consistency and Repeatability:** Because the environment is codified, you can use the same template to spin up an identical stack in a different AWS region in minutes. This is a cornerstone of a robust Disaster Recovery plan.
*   **Automation:** CloudFormation handles the provisioning and configuration of resources in the correct order, resolving dependencies automatically.
*   **StackSets:** You can use **CloudFormation StackSets** to deploy your infrastructure across multiple AWS accounts and regions in a single operation, making it ideal for large-scale DR strategies.

**Why the others are incorrect:**
*   **AWS CodePipeline:** This is a Continuous Integration and Continuous Delivery (CI/CD) service. While it can *orchestrate* a CloudFormation deployment, it is not the service that defines the infrastructure as code itself.
*   **AWS Elastic Beanstalk:** This is a Platform as a Service (PaaS) for deploying web applications. While it manages infrastructure for you, it is not a general-purpose IaC tool for defining custom networking or complex architectural stacks.
*   **AWS CodeDeploy:** This is a deployment service that automates software deployments to compute services like EC2, Lambda, or ECS. It manages the **code running on the servers**, not the creation of the servers and network themselves.