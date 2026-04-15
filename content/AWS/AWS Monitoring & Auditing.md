---
title: AWS Monitoring & Auditing Quiz
tags: [aws, cloudwatch, cloudtrail, aws-config]
difficulty: medium
date: 2026-04-15
---

## Question 1

You are running a website on a fleet of EC2 instances with OS that has a known vulnerability on port 84. You want to continuously monitor your EC2 instances if they have port 84 exposed. How should you do this?

[ ] Setup CloudWatch Metrics
[ ] Setup CloudTrail Trails
[x] Setup Config Rules
[ ] Schedule a CloudWatch Event to trigger a Lambda function to scan your EC2 instances

**Correct Answer:** ✅ Setup Config Rules

**Explanation:** **AWS Config** is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. To solve this problem, you would use a **Config Rule** (specifically a managed rule like `restricted-common-ports`) to continuously monitor the configuration of your EC2 Security Groups. If a Security Group is modified to allow traffic on port 84, AWS Config will flag the resource as **non-compliant**. 

While a Lambda function could technically scan instances, AWS Config is the "native" way to track configuration changes over time and provide a history of compliance without writing custom scanning logic.

## Question 2

A DevOps engineer is working for a company and managing its infrastructure and resources on AWS. There was a sudden spike in traffic for the main application for the company which was not normal in this period of the year. The application is hosted on a couple of EC2 instances in private subnets and is fronted by an Application Load Balancer in a public subnet. To detect if this is normal traffic or an attack, the DevOps engineer enabled the VPC Flow Logs for the subnets and stored those logs in CloudWatch Log Group. The DevOps wants to analyze those logs and find out the top IP addresses making requests against the website to check if there is an attack. Which of the following can help the DevOps engineer to analyze those logs?

[ ] CloudWatch Metric Stream
[ ] CloudWatch Alarm
[x] CloudWatch Contributor Insights
[ ] CloudWatch Metric Filter

**Correct Answer:** ✅ CloudWatch Contributor Insights

**Explanation:** **CloudWatch Contributor Insights** is specifically designed to analyze log data to provide "Top N" contributors. In this scenario, it can parse the VPC Flow Logs to identify which unique IP addresses are responsible for the highest volume of traffic (the "Top Contributors"). This allows the DevOps engineer to quickly identify if a few malicious IPs are performing a DDoS or brute-force attack. While Metric Filters can count occurrences of a pattern, they cannot easily provide a ranked list of high-volume contributors in real-time like Contributor Insights can.

## Question 3

…………………………. is a CloudWatch feature that allows you to send CloudWatch metrics in near real-time to S3 bucket (through Kinesis Data Firehose) and 3rd party destinations (e.g., Splunk, Datadog, …).

[x] CloudWatch Metric Stream
[ ] CloudWatch Log Stream
[ ] CloudWatch Metric Filter
[ ] CloudWatch Log Group

**Correct Answer:** ✅ CloudWatch Metric Stream

**Explanation:** **CloudWatch Metric Streams** is a fully managed feature that allows you to continuously stream CloudWatch metrics to a destination of your choice. Before this feature, you had to rely on "polling" (calling the `GetMetricData` API repeatedly), which was slow and expensive. With Metric Streams, you can export metrics with very low latency to an **Amazon S3** bucket or to external observability providers like **Datadog, New Relic, or Splunk** via **Amazon Kinesis Data Firehose**. This is essential for organizations that use a centralized dashboarding tool outside of the AWS Management Console.

## Question 4

You have an application hosted on a fleet of EC2 instances managed by an Auto Scaling Group that you configured its minimum capacity to 2. Also, you have created a CloudWatch Alarm that is configured to scale in your ASG when CPU Utilization is below 60%. Currently, your application runs on 2 EC2 instances and has low traffic and the CloudWatch Alarm is in the ALARM state. What will happen?

[ ] One EC2 instance will be terminated and the ASG desired and minimum capacity will go to 1
[x] The CloudWatch Alarm will remain in ALARM state but never decrease the number of EC2 instances in the ASG
[ ] The CloudWatch Alarm will be detached from my ASG
[ ] The CloudWatch Alarm will go in OK state

**Correct Answer:** ✅ The CloudWatch Alarm will remain in ALARM state but never decrease the number of EC2 instances in the ASG

**Explanation:** **Auto Scaling Groups (ASG)** respect the **Minimum Capacity** setting above all scaling policies. In this scenario, since your minimum capacity is set to 2 and you currently have 2 instances, the ASG will not allow the "scale-in" action to execute, as it would violate the minimum constraint. The CloudWatch Alarm correctly stays in the **ALARM** state because the CPU utilization is indeed below 60%, but the ASG simply ignores the instruction to terminate an instance.

## Question 5

Someone changed the configuration of a resource and made it non-compliant. Which AWS service is responsible for logging **who** made modifications to resources?

[ ] Amazon CloudWatch
[x] AWS CloudTrail
[ ] AWS Config

**Correct Answer:** ✅ AWS CloudTrail

**Explanation:** While **AWS Config** tracks **what** changed (the configuration state), **AWS CloudTrail** is the service responsible for recording **who** (the "identity") made the change. CloudTrail logs every API call made in your account, including the IAM user or role, the time of the event, the source IP address, and the specific action taken. To find out who caused a non-compliance event, you would look at CloudTrail logs for that specific resource at the time the configuration change occurred.

## Question 6

A company is developing a Serverless application on AWS using Lambda, DynamoDB, and Cognito. A junior developer joined a few weeks ago and accidentally deleted one of the DynamoDB tables in the dev AWS account which contained important data. The CTO asks you to prevent this from happening again and there must be a notification system to monitor if there is an attempt to make such deletion actions for the DynamoDB tables. What would you do?

[ ] Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through S3 and send a notification using KMS
[x] Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using SNS
[ ] Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using KMS

**Correct Answer:** ✅ Assign developers to a certain IAM group which prevents deletion of DynamoDB tables. Configure EventBridge to capture any DeleteTable API calls through CloudTrail and send a notification using SNS

**Explanation:** This solution addresses the CTO's requirement in two ways:
1.  **Prevention:** By putting developers in an IAM group with a policy that explicitly denies `dynamodb:DeleteTable`, you prevent the action from succeeding.
2.  **Monitoring/Notification:** **Amazon EventBridge** can monitor **AWS CloudTrail** for specific API calls (like `DeleteTable`). When an attempt is made, EventBridge triggers a rule that sends a message to an **Amazon SNS** (Simple Notification Service) topic, which then alerts the necessary stakeholders (via email, SMS, etc.). 

**KMS** (Key Management Service) is used for encryption and is not a notification service, which makes the other options incorrect.

## Question 7

You have enabled AWS Config to monitor Security Groups if there's unrestricted SSH access to any of your EC2 instances. Which AWS Config feature can you use to automatically re-configure your Security Groups to their correct state?

[x] AWS Config Remediations
[ ] AWS Config Rules
[ ] AWS Config Notifications

**Correct Answer:** ✅ AWS Config Remediations

**Explanation:** While **AWS Config Rules** are used to *detect* non-compliant resources (like a Security Group with port 22 open to `0.0.0.0/0`), **AWS Config Remediations** are what allow you to take action. You can associate a remediation action with a Config rule using **AWS Systems Manager Automation** documents. For example, if a rule finds an unrestricted Security Group, the remediation can automatically trigger a script to remove the offending inbound rule and restore the Security Group to its authorized state.

## Question 8

You are running a critical website on a set of EC2 instances with a tightened Security Group that has restricted SSH access. You have enabled AWS Config in your AWS Region and you want to be notified via email when someone modified your EC2 instances' Security Group. Which AWS Config feature helps you do this?

[ ] AWS Config Remediations
[ ] AWS Config Rules
[x] AWS Config Notifications

**Correct Answer:** ✅ AWS Config Notifications

**Explanation:** **AWS Config Notifications** leverage **Amazon SNS (Simple Notification Service)** to alert you of configuration changes or compliance status changes. When a resource (like a Security Group) is modified, AWS Config streams these configuration changes to an Amazon SNS topic. You can subscribe your email address to that topic to receive an immediate alert. While Rules detect the state and Remediations fix it, Notifications are specifically responsible for the "alerting" aspect of the service.

## Question 9

Someone has terminated an EC2 instance in your AWS account last week, which was hosting a critical database that contains sensitive data. Which AWS service helps you find who did that and when?

[ ] CloudWatch Metrics
[ ] CloudWatch Alarms
[ ] CloudWatch Events
[x] AWS CloudTrail

**Correct Answer:** ✅ AWS CloudTrail

**Explanation:** **AWS CloudTrail** is the primary service for governance, compliance, and operational auditing. It records all API activity in your AWS account. When an EC2 instance is terminated, CloudTrail logs a `TerminateInstances` event. This log includes the **identity** of the caller (who), the **timestamp** (when), the **IP address**, and the specific **resource ID** affected. Since the event happened last week, you can easily find it by filtering the CloudTrail Event History for the "TerminateInstances" event name within that time range.

## Question 10

You have an RDS DB instance that's configured to push its database logs to CloudWatch. You want to create a CloudWatch alarm if there's an **Error** found in the logs. How would you do that?

[ ] Create a scheduled CloudWatch Event that triggers an AWS Lambda every 1 hour, scans the logs, and notify you through SNS topic
[x] Create a CloudWatch Logs Metric Filter that filter the logs for the keyword **Error**, then create a CloudWatch Alarm based on that Metric Filter
[ ] Create an AWS Config Rule that monitors **Error** in your database logs and notify you through SNS topic

**Correct Answer:** ✅ Create a CloudWatch Logs Metric Filter that filter the logs for the keyword **Error**, then create a CloudWatch Alarm based on that Metric Filter

**Explanation:** To alert on specific text within logs, you use a **CloudWatch Logs Metric Filter**. This filter scans the incoming log data for a specific pattern (in this case, the term "Error") and turns those occurrences into a **CloudWatch Metric** (e.g., a count of errors per minute). Once you have a metric, you can attach a standard **CloudWatch Alarm** to it that triggers an SNS notification whenever the count stays above zero. This is a real-time, built-in solution that doesn't require custom code or scheduled scans.

## Question 11

You have CloudTrail enabled for your AWS Account in all AWS Regions. What should you use to detect unusual activity in your AWS Account?

[ ] CloudTrail Data Events
[x] CloudTrail Insights
[ ] CloudTrail Management Events

**Correct Answer:** ✅ CloudTrail Insights

**Explanation:** **CloudTrail Insights** is a feature that helps you identify and respond to unusual operational activity. It analyzes your historical "Management Events" to establish a baseline of normal behavior and then automatically detects anomalies—such as a sudden spike in `TerminateInstances` API calls or a burst of IAM permission changes. When an anomaly is detected, it generates an "Insight" event, allowing you to quickly investigate potential security issues or operational failures without having to manually parse through thousands of log entries.

## Question 12

One of your teammates terminated an EC2 instance 4 months ago which has critical data. You don't know who made this so you are going to review all API calls within this period using CloudTrail. You already have CloudTrail set up and configured to send logs to the S3 bucket. What should you do to find out who made this?

[ ] Use CloudTrail Event History in CloudTrail Console
[x] Analyze CloudTrail logs in S3 bucket using Amazon Athena

**Correct Answer:** ✅ Analyze CloudTrail logs in S3 bucket using Amazon Athena

**Explanation:** The **CloudTrail Event History** in the AWS Console only keeps records of management events for the last **90 days**. Since the event in question happened **4 months ago**, it is no longer visible in the console's Event History. However, because CloudTrail is configured to send logs to an **S3 bucket**, those logs are preserved indefinitely (depending on your S3 lifecycle policy). To search through these historical log files efficiently, you should use **Amazon Athena**, which allows you to run SQL queries directly against the data stored in S3 to pinpoint exactly who made the `TerminateInstances` call.

## Question 13

You have made a configuration change and would like to evaluate the impact of it on the performance of your application. Which AWS service should you use?

[x] Amazon CloudWatch
[ ] AWS CloudTrail

**Correct Answer:** ✅ Amazon CloudWatch

**Explanation:** **Amazon CloudWatch** is the primary monitoring and observability service for AWS. It collects and tracks **metrics**, which are variables that measure the performance of your resources and applications (e.g., CPU utilization, latency, request counts). To evaluate the impact of a change, you would use CloudWatch Dashboards to compare performance metrics before and after the configuration update. While CloudTrail records *that* a change happened, it does not provide performance data like speed, throughput, or resource usage.


## Question 14

How would you monitor your EC2 instance memory usage in CloudWatch?

[ ] Enable EC2 Detailed Monitoring
[ ] By default, the EC2 instance pushes memory usage to CloudWatch
[x] Use the Unified CloudWatch Agent to push memory usage as a custom metric to CloudWatch

**Correct Answer:** ✅ Use the Unified CloudWatch Agent to push memory usage as a custom metric to CloudWatch

**Explanation:** By default, Amazon EC2 sends "Standard Metrics" to CloudWatch (like CPU utilization, disk I/O, and network traffic). However, **Memory (RAM) usage** is considered an OS-level metric, which the AWS hypervisor cannot see from the outside. To monitor memory, you must install and configure the **Unified CloudWatch Agent** inside the EC2 instance. The agent collects these internal metrics and pushes them to CloudWatch as **Custom Metrics**. 

*Note: Detailed Monitoring only increases the frequency of data reporting (from 5-minute intervals to 1-minute intervals) but still does not include memory usage.*

## Question 15

A company has a running Serverless application on AWS which uses EventBridge as an inter-communication channel between different services within the application. There is a requirement to use the events in the prod environment in the dev environment to make some tests. The tests will be done every 6 months, so the events need to be stored and used later on. What is the most efficient and cost-effective way to store EventBridge events and use them later?

[x] Use EventBridge Archive and Replay feature
[ ] Create a Lambda function to store the EventBridge events in an S3 bucket for later usage
[ ] Configure EventBridge to store events in a DynamoDB table

**Correct Answer:** ✅ Use EventBridge Archive and Replay feature

**Explanation:** **Amazon EventBridge Archive and Replay** is a built-in feature designed specifically for this use case. You can create an **Archive** to record all (or a filtered subset of) events sent to an event bus. When you are ready to test (even months later), you can use the **Replay** feature to "re-send" those stored events to a specific event bus or target. This is much more efficient than building a custom solution with Lambda, S3, or DynamoDB, as AWS handles the storage, indexing, and re-injection of the events automatically.

## Question 16

You would like to evaluate the compliance of your resource's configurations over time. Which AWS service will you choose?

[x] AWS Config
[ ] Amazon CloudWatch
[ ] AWS CloudTrail

**Correct Answer:** ✅ AWS Config

**Explanation:** **AWS Config** is specifically designed to provide a detailed view of the configuration of AWS resources in your account. This includes how resources are related to one another and how their configurations have changed over time. By using **Config Rules**, you can evaluate whether these configurations comply with your desired settings (e.g., "Are all S3 buckets encrypted?"). The service maintains a **Configuration History** and a **Configuration Timeline**, allowing you to look back at any point in time to see the state of a resource and its compliance status.
