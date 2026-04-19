---
title: AWS Lambda Quiz
tags: [aws, aws-lambda]
difficulty: medium
date: 2026-04-05
---

## Question 1

You have configured a Lambda function to run each time an item is added to a DynamoDB table using DynamoDB Streams. The function is meant to insert messages into the SQS queue for further long processing jobs. Each time the Lambda function is invoked, it seems able to read from the DynamoDB Stream but it isn't able to insert the messages into the SQS queue. What do you think the problem is?


[ ] Lambda can't be used to insert messages into the SQS queue, use an EC2 instance instead


[ ] The Lambda Execution IAM Role is missing permissions


[ ] The Lambda security group must allow outbound access to SQS


[ ] The SQS security group must be edited to allow AWS Lambda


**Correct Answer:** ✅ The Lambda Execution IAM Role is missing permissions

**Explanation:** In AWS, services are "secure by default." For a Lambda function to interact with another service like **Amazon SQS**, its **Execution Role** (an IAM Role) must have an explicit policy allowing the `sqs:SendMessage` action. Since the Lambda is successfully reading from the stream but failing to write to the queue, the most likely culprit is a missing or misconfigured IAM policy.

> **Note:** SQS does not use Security Groups (it uses Resource-based Policies), and Lambda functions only require Security Groups if they need to access resources inside a private VPC.