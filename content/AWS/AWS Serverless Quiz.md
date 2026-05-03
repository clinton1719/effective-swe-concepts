---
title: AWS Serverless Quiz
tags: [aws, aws-lambda, aws-sqs, aws-eventbridge]
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


## Question 2

You are working on a Serverless application where you want to process objects uploaded to an S3 bucket. You have configured S3 Events on your S3 bucket to invoke a Lambda function every time an object has been uploaded. You want to ensure that events that can't be processed are sent to a Dead Letter Queue (DLQ) for further processing. Which AWS service should you use to set up the DLQ?

[ ] S3 Events

[ ] SNS Topic

[ ] ✅ **Lambda Function**

**Correct Answer:** ✅ **Lambda Function**

**Explanation:** In this specific serverless architecture, the Dead Letter Queue (DLQ) configuration is a **property of the Lambda function itself**, not the S3 bucket or the event source.

*   **Asynchronous Invocation:** When S3 triggers a Lambda function, it is an **asynchronous invocation**. Lambda manages its own internal queue to handle these events.
*   **The DLQ Role:** If the Lambda function fails to process the event after the configured number of retries (default is 2), Lambda can send the "failed" event payload to a DLQ so you don't lose the data.
*   **Configuration:** You configure the DLQ by specifying an **Amazon SQS queue** or an **Amazon SNS topic** as the target within the **Lambda function's configuration settings**.

**Why the others are incorrect:**
*   **S3 Events:** S3 events are responsible for *sending* the notification to Lambda. They do not have a built-in mechanism to track whether the downstream Lambda function succeeded or failed.
*   **SNS Topic:** While an SNS Topic can *act* as the destination for a DLQ, it is not the service where you *set up* or define the DLQ logic for a failed Lambda execution. You point the Lambda function toward the SNS topic.

> **Pro Tip:** While DLQs are still supported, AWS now recommends using **Lambda Destinations** (On Failure) instead of DLQs, as Destinations provide more metadata about the failure (like stack traces) and support more target types.

