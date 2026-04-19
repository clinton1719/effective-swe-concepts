---
title: AWS IAM Quiz
tags: [aws, aws-iam, aws-directory, aws-control-tower, aws-organization]
difficulty: medium
date: 2026-04-15
---

## Question 1

When configuring permissions for EventBridge to configure a Lambda function as a target you should use ………………….. but when you want to configure a Kinesis Data Streams as a target you should use …………………..


[ ] Identity-Based Policy, Resource-based Policy

[x] Resource-Based Policy, Identity-based Policy

[ ] Identity-Based Policy, Identity-Based Policy

[ ] Resource-based Policy, Resource-based Policy

**Correct Answer:** ✅ Resource-Based Policy, Identity-based Policy

**Explanation:** This distinction is a key concept in AWS security:

* **Lambda (Resource-Based):** To allow EventBridge to trigger a Lambda function, you add a **Resource-Based Policy** to the Lambda function itself (using the `lambda:AddPermission` API). This policy tells the Lambda function, "I trust EventBridge to invoke me."
* **Kinesis (Identity-Based):** For most other targets like Kinesis Data Streams or SQS, EventBridge needs an **IAM Role** (an **Identity-Based Policy**) with permissions to write to that specific stream. EventBridge "assumes" this role to gain the necessary permissions to push data into the Kinesis Data Stream.

## Question 2

Which of the following IAM condition key you can use only to allow API calls to a specified AWS region?


[ ] aws:RequiredRegion

[ ] aws:SourceRegion

[ ] aws:InitialRegion

[x] aws:RequestedRegion

**Correct Answer:** ✅ aws:RequestedRegion

**Explanation:** The condition key **`aws:RequestedRegion`** is used to restrict the AWS Region that the API request is targeting. For example, you can create an IAM policy that denies any action if the `aws:RequestedRegion` is not `ap-south-1`.

* **`aws:SourceRegion`** is different—it identifies the region from which the request was *sent* (relevant for service-to-service calls).
* **`aws:RequestedRegion`** identifies where the resource being acted upon is located. This is a common security best practice to ensure developers only deploy resources in approved geographic regions.

## Question 3

You are managing the AWS account for your company, and you want to give one of the developers access to read files from an S3 bucket. You have updated the bucket policy to this, but he still can't access the files in the bucket. What is the problem?

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "AllowsRead",
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::123456789012:user/Dave"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::static-files-bucket-xxx"
     }]
}

[ ] Everything is okay, he just needs to logout and login again

[ ] The bucket does not contain any files yet

[x] You should change the resource to arn:aws:s3:::static-files-bucket-xxx/* , because this is an object-level permission
```

**Correct Answer:** ✅ You should change the resource to arn:aws:s3:::static-files-bucket-xxx/* , because this is an object-level permission

**Explanation:** In AWS S3, there is a clear distinction between Bucket-level actions and Object-level actions:

s3:GetObject is an Object-level action. It applies to the files inside the bucket.

The Resource arn:aws:s3:::static-files-bucket-xxx refers to the bucket itself.

To refer to the objects within the bucket, you must append /* to the ARN (e.g., arn:aws:s3:::static-files-bucket-xxx/*).

Without the wildcard, the policy is essentially trying to perform a "get file" action on a container, which results in an Access Denied error.

## Question 4

You have 5 AWS Accounts that you manage using AWS Organizations. You want to restrict access to certain AWS services in each account. How should you do that?


[ ] Using IAM Roles

[x] Using AWS Organizations SCP

[ ] Using AWS Config

**Correct Answer:** ✅ Amazon CloudWatch

**Explanation:** **Service Control Policies (SCPs)** are the primary tool for managing permissions at the organizational level. They act as **permission guardrails**, defining the maximum available permissions for all IAM users and roles within a member account. 

Even if a user is granted `AdministratorAccess` within their specific account, an **SCP** that denies a service (e.g., "Deny access to Amazon Redshift") will override that local permission. This allows central administrators to ensure that no account in the organization can deviate from the company's security or cost-management policies.

## Question 5

You have strong regulatory requirements to only allow fully internally audited AWS services in production. You still want to allow your teams to experiment in a development environment while services are being audited. How can you best set this up?


[ ] Provide the Dev team with a completely independent AWS account

[ ] Apply a global IAM policy on your Prod account

[x] Create an AWS Organization and create two Prod and Dev OUs, then Apply an SCP on the Prod OU

[ ] Create an AWS Config Rule

**Correct Answer:** ✅ Create an AWS Organization and create two Prod and Dev OUs, then Apply an SCP on the Prod OU

**Explanation:** The best way to manage this is using **AWS Organizations** with **Organizational Units (OUs)**. By placing Production accounts in a "Prod" OU and Development accounts in a "Dev" OU, you can apply different **Service Control Policies (SCPs)** to each. 

For the **Prod OU**, you would apply an SCP that restricts access to only the specific audited services. For the **Dev OU**, you can leave the permissions more open to allow for experimentation. This provides a central, scalable way to enforce compliance without stifling innovation in non-production environments.