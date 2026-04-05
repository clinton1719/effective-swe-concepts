---
title: AWS DynamoDB Quiz
tags: [aws, aws-cognito]
difficulty: medium
date: 2026-04-05
---

## Question 1

You are running a mobile application where you want each registered user to upload/download images to/from his own folder in the S3 bucket. Also, you want to give your users to sign-up and sign in using their social media accounts (e.g., Facebook). Which AWS service should you choose?

[ ] AWS Identity and Access Management (IAM)

[ ] AWS IAM Identity Center

[ ] Amazon Cognito

[ ] Amazon CloudFront


**Correct Answer:** ✅ Amazon Cognito

**Explanation:** **Amazon Cognito** is the go-to service for adding user sign-up, sign-in, and access control to web and mobile apps. It consists of two main components:
* **User Pools:** Provides a secure user directory that scales to hundreds of millions of users and supports social identity providers like Facebook, Google, and Amazon.
* **Identity Pools (Federated Identities):** Enables you to create unique identities for your users and federate them with identity providers. With an identity pool, you can obtain temporary, limited-privilege AWS credentials to access AWS services, such as giving a user access to their specific folder in an S3 bucket.

## Question 2

You have a mobile application and would like to give your users access to their own personal space in the S3 bucket. How do you achieve that?

[ ] Generate IAM user credentials for each of your application's users

[ ] Use Amazon Cognito Identity Federation

[ ] Use SAML Identity Federation

[ ] Use a Bucket Policy to make your bucket public


**Correct Answer:** ✅ Use Amazon Cognito Identity Federation

**Explanation:** **Amazon Cognito Identity Federation** (specifically Identity Pools) is the best practice for providing mobile or web users with temporary, limited-privilege AWS credentials. It allows you to map a user's identity (from a User Pool or Social Provider) to an IAM role. By using **IAM Policy Variables** (like `${cognito-identity.amazonaws.com:sub}`), you can create a single dynamic policy that restricts each user to a folder in S3 that matches their unique Identity ID.

## Question 3

You are developing a new web and mobile application that will be hosted on AWS and currently, you are working on developing the login and signup page. The application backend is serverless and you are using Lambda, DynamoDB, and API Gateway. Which of the following is the best and easiest approach to configure the authentication for your backend?

[ ] Store users’ credentials in a DynamoDB table encrypted using KMS

[ ] Store users’ credentials in an S3 bucket encrypted using KMS

[ ] Use Cognito User Pools

[ ] Store users’ credentials in AWS Secrets Manager


**Correct Answer:** ✅ Use Cognito User Pools

**Explanation:** **Amazon Cognito User Pools** is a fully managed user directory that handles user registration, authentication, and account recovery (like forgotten passwords). It integrates natively and seamlessly with **API Gateway** as an authorizer, allowing you to secure your serverless backend with minimal code. Storing credentials yourself in DynamoDB or S3 requires you to manage complex security tasks like salt/hashing, password reset flows, and Multi-Factor Authentication (MFA), all of which Cognito provides out-of-the-box.

