---
title: AWS Containers Quiz
tags: [aws, fargate, ecs, eks]
difficulty: medium
date: 2026-04-04
---

## Question 1

You are migrating your on-premises Docker-based applications to Amazon ECS. You were using Docker Hub Container Image Library as your container image repository. Which is an alternative AWS service which is fully integrated with Amazon ECS?

[ ] AWS Fargate

[ ] Elastic Container Registry (ECR)

[ ] Elastic Kubernetes Service (EKS)

[ ] Amazon EC2


**Correct Answer:** ✅ Elastic Container Registry (ECR)

**Explanation:** Amazon ECR is a fully managed Docker container registry that makes it easy for developers to store, manage, and deploy Docker container images. It is highly integrated with Amazon ECS, allowing the service to securely pull images for deployment using IAM roles. While Fargate and EC2 are launch types (compute), and EKS is a Kubernetes-based orchestrator, ECR is the direct AWS equivalent to Docker Hub.

## Question 2

You have an application hosted on an ECS Cluster (EC2 Launch Type) where you want your ECS tasks to upload files to an S3 bucket. Which IAM Role for your ECS Tasks should you modify?

[ ] EC2 Instance Profile

[ ] ECS Task Role


**Correct Answer:** ✅ ECS Task Role

**Explanation:** In Amazon ECS, the **ECS Task Role** is specifically used to grant permissions to the application code running *inside* the container. While the **EC2 Instance Profile** (or Task Execution Role) allows the ECS agent to perform actions like pulling images from ECR or sending logs to CloudWatch, the Task Role is what allows your code to interact with AWS services like S3, DynamoDB, or SQS. This follows the principle of least privilege by ensuring only the specific task has the necessary access.

## Question 3

You have multiple Docker-based applications hosted on-premises that you want to migrate to AWS. You don't want to provision or manage any infrastructure; you just want to run your containers on AWS. Which AWS service should you choose?

[ ] Elastic Container Service (ECS) in EC2 Launch Mode

[ ] Elastic Container Registry (ECR)

[ ] AWS Fargate on ECS


**Correct Answer:** ✅ AWS Fargate on ECS

**Explanation:** AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and Amazon EKS. When you use Fargate, you do not need to provision, configure, or scale clusters of virtual machines (EC2 instances) to run your containers. You simply define your application’s requirements (CPU, memory, networking), and Fargate manages the underlying infrastructure for you, making it the best choice for a "no-infrastructure-management" requirement.

## Question 4

You are deploying an application on an ECS Cluster made of EC2 instances. Currently, the cluster is hosting one application that is issuing API calls to DynamoDB successfully. Upon adding a second application, which issues API calls to S3, you are getting authorization issues. What should you do to resolve the problem and ensure proper security?

[ ] Edit the EC2 instance role to add permissions to S3

[ ] Create an IAM task role for the new application

[ ] Enable the Fargate mode

[ ] Edit the S3 bucket policy to allow the ECS task


**Correct Answer:** ✅ Create an IAM task role for the new application

**Explanation:** In ECS, security best practices dictate using **Task Roles** rather than the EC2 Instance Role. If you modify the Instance Role, *every* container on that instance would gain access to S3, violating the principle of least privilege. By creating a specific IAM Task Role for the second application, you provide only that specific container with the S3 permissions it needs without affecting the first application or the underlying host.

## Question 5

You're planning to migrate a WordPress website running on Docker containers from on-premises to AWS. You have decided to run the application in an ECS Cluster, but you want your docker containers to access the same WordPress website content such as website files, images, videos, etc. What do you recommend to achieve this?

[ ] Mount an EFS volume

[ ] Mount an EBS volume

[ ] Use an EC2 Instance Store


**Correct Answer:** ✅ Mount an EFS volume

**Explanation:** For a WordPress deployment where multiple containers (tasks) need to access and share the same set of static files (uploads, themes, plugins), you need a shared file system. **Amazon EFS** is a regional service that allows concurrent access from multiple ECS tasks, even if they are running on different EC2 instances or using Fargate. In contrast, an EBS volume is typically locked to a single instance at a time, making it unsuitable for a scaled-out container architecture.

## Question 6

Amazon Elastic Container Service (ECS) has two Launch Types: .................. and ..................

[ ] Amazon EC2 Launch Type and Fargate Launch Type

[ ] Amazon EC2 Launch Type and EKS Launch Type

[ ] Fargate Launch Type and EKS Launch Type


**Correct Answer:** ✅ Amazon EC2 Launch Type and Fargate Launch Type

**Explanation:** Amazon ECS offers two main ways to determine how your containerized workloads are hosted:
* **EC2 Launch Type:** You manage a cluster of EC2 instances. You are responsible for patching, scaling, and managing the underlying servers.
* **Fargate Launch Type:** A serverless approach where AWS manages the underlying infrastructure. You only pay for the CPU and memory resources requested by your containers.

## Question 7

A developer has a running website and APIs on his local machine using containers and he wants to deploy both of them on AWS. The developer is new to AWS and doesn’t know much about different AWS services. Which of the following AWS services allows the developer to build and deploy the website and the APIs in the easiest way according to AWS best practices?

[ ] AWS App Runner

[ ] EC2 Instances + Application Load Balancer

[ ] Amazon ECS

[ ] AWS Fargate


**Correct Answer:** ✅ AWS App Runner

**Explanation:** AWS App Runner is a fully managed service that makes it easy for developers to quickly deploy containerized web applications and APIs, at scale and with no prior infrastructure experience required. It handles the infrastructure, networking, load balancing, and scaling automatically. While ECS and Fargate are powerful, they require more configuration (Task Definitions, Services, Clusters). App Runner is the "easiest" path for a developer to go from a container to a live URL.

## Question 8

Amazon EKS supports the following node types, EXCEPT ………………..

[ ] Managed Node Groups

[ ] Self-Managed Nodes

[ ] AWS Fargate

[ ] AWS Lambda


**Correct Answer:** ✅ AWS Lambda

**Explanation:** Amazon EKS (Elastic Kubernetes Service) allows you to run Kubernetes nodes using **Managed Node Groups** (where AWS handles EC2 provisioning and updates), **Self-Managed Nodes** (where you manage the EC2 instances yourself), or **AWS Fargate** (the serverless option). **AWS Lambda** is a separate serverless functions service and cannot be used as a "node" to join a Kubernetes cluster.