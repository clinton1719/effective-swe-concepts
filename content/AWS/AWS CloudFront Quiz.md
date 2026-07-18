---
title: AWS CloudFront Quiz
tags: [aws, cloudfront]
difficulty: easy
date: 2026-03-29
---

## Question 1
You have a CloudFront Distribution that serves your website hosted on a fleet of EC2 instances behind an Application Load Balancer. All your clients are from the United States, but you found that some malicious requests are coming from other countries. What should you do to only allow users from the US and block other countries?


[ ] Use CloudFront Geo Restriction


[ ] Use Origin Access Control


[ ] Set up a security group and attach it to your CloudFront Distribution


[ ] Use a Route 53 Latency record and attach it to CloudFront

Correct Answer: ✅ Use CloudFront Geo Restriction

Explanation: CloudFront Geo Restriction (also known as geo-blocking) allows you to white-list or black-list specific countries. Since the requirement is to only allow users from the US and block others at the edge, this is the most efficient solution.

Note: Security Groups cannot be attached directly to CloudFront, and Origin Access Control (OAC) is used for securing S3 buckets, not blocking geographic regions.

## Question 2

A WordPress website is hosted in a set of EC2 instances in an EC2 Auto Scaling Group and fronted by a CloudFront Distribution which is configured to cache the content for 3 days. You have released a new version of the website and want to release it immediately to production without waiting for 3 days for the cached content to be expired. What is the easiest and most efficient way to solve this?


[ ] Open a support ticket with AWS Support to remove the CloudFront Cache


[ ] CloudFront Cache Invalidation


[ ] EC2 Cache Invalidation

Correct Answer: ✅ CloudFront Cache Invalidation

Explanation: When you need to remove files from CloudFront edge caches before their TTL (Time To Live) expires, you perform an invalidation. You can invalidate specific file paths (e.g., /images/logo.png) or use wildcards (e.g., /*) to clear the entire cache so that CloudFront fetches the latest version from the origin on the next request.

## Question 3
A company is deploying a media-sharing website to AWS. They are going to use CloudFront to deliver the content with low latency to their customers where they are located in both US and Europe only. After a while there a huge costs for CloudFront. Which CloudFront feature allows you to decrease costs by targeting only US and Europe?


[ ] CloudFront Cache Invalidation


[ ] CloudFront Price Classes


[ ] CloudFront Cache Behavior


[ ] Origin Access Control

Correct Answer: ✅ CloudFront Price Classes

Explanation: CloudFront charges different rates based on the Edge Location used. By selecting a Price Class (like Price Class 100), you can limit the distribution to only the least expensive regions (typically US, Canada, and Europe). This reduces costs by not serving traffic from more expensive edge locations in South America or Asia, even if a user is technically closer to those spots.

## Question 4

You have a media-sharing website that uses an S3 bucket as an origin for a CloudFront Distribution. You want to serve your content only to authenticated users. You have already set up a CloudFront Signed URL for your content. However, your users can still access your content directly from the S3 bucket. What should you do to prevent this?


[ ] Use a CloudFront Cache Policy to block S3 access


[ ] Configure Origin Access Control (OAC) and update the S3 Bucket Policy to allow access only from CloudFront


[ ] Use a Lambda@Edge function to verify the URL on every S3 request


[ ] Create a secondary S3 bucket for authenticated users


**Correct Answer:** ✅ Configure Origin Access Control (OAC) and update the S3 Bucket Policy to allow access only from CloudFront

**Explanation:** Even with Signed URLs, the S3 bucket remains a separate entry point unless restricted. By using Origin Access Control (OAC), you ensure that the S3 bucket policy only permits requests that originate from your CloudFront distribution. This forces all traffic through CloudFront, where your Signed URL requirement is enforced.

## Question 6

What does this S3 bucket policy do?
```json
{
    "Version": "2012-10-17",
    "Id": "Mystery policy",
    "Statement": [{
        "Sid": "What could it be?",
        "Effect": "Allow",
        "Principal": {
           "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::examplebucket/*",
        "Condition": {
            "StringEquals": {
                "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE"
            }
        }
    }]
}
```


[ ] Forces GetObject request to be encrypted if coming from CloudFront


[ ] Only allows the S3 bucket content to be accessed from your CloudFront Distribution


[ ] Only allows GetObject type of request on the S3 bucket from anybody


**Correct Answer:** ✅ Only allows the S3 bucket content to be accessed from your CloudFront Distribution

**Explanation:** This policy uses the `Principal` of `cloudfront.amazonaws.com` combined with a `Condition` that matches a specific `SourceArn`. This is the standard configuration for **Origin Access Control (OAC)**, ensuring that only requests originating from that specific CloudFront distribution ID can retrieve objects from the bucket.

## Question 7

You are running a photo-sharing website where your images are downloaded from all over the world. Every month you publish a master pack of beautiful mountain images that are over 15 GB in size. The content is currently hosted on an Elastic File System (EFS) file system and distributed by an Application Load Balancer and a set of EC2 instances. Each month, you are experiencing very high traffic which increases the load on your EC2 instances and increases network costs. What do you recommend to reduce EC2 load and network costs without refactoring your website?


[ ] Hosts the master pack into S3


[ ] Enable Application Load Balancer Caching


[ ] Scale up the EC2 instances


[ ] Create a CloudFront Distribution


**Correct Answer:** ✅ Create a CloudFront Distribution

**Explanation:** **Amazon CloudFront** is a Content Delivery Network (CDN) that caches content at Edge Locations closer to your users. By placing a CloudFront distribution in front of your **Application Load Balancer (ALB)**, the large 15 GB master pack is cached at the edge after the first request. Subsequent downloads are served directly from CloudFront, which significantly reduces the CPU/Network load on your EC2 instances and lowers data transfer out (DTO) costs compared to serving directly from the origin. Best of all, it requires no code changes or "refactoring" of the underlying website.


## Question 8

**Question:**
Which one of the following can't be used as an origin server with Amazon CloudFront?

[ ] A web server running in your infrastructure.

[ ] Amazon S3.

[ ] Amazon Glacier.

[ ] A web server running on Amazon EC2 instances.


**Correct Answer:** Amazon Glacier.

---

### Why this is the correct answer:

Amazon CloudFront is a Content Delivery Network (CDN) designed to cache and serve objects with ultra-low latency. Because of this, it requires an **active, HTTP/HTTPS-accessible origin server** that can immediately return an object whenever a cache miss occurs.

* **The Glacier Bottleneck:** Amazon Glacier is an archival storage service built for cold, long-term backups. Retrieving data from Glacier is an asynchronous process that can take anywhere from minutes (Expedited) to hours (Standard/Bulk). Because Glacier does not expose an immediate, synchronous HTTP web endpoint for real-time web requests, CloudFront cannot communicate with it directly as an origin.
* **Valid CloudFront Origins:** CloudFront natively supports two primary types of origins:
  1. **Amazon S3 Buckets:** For serving static web assets (images, video files, frontend builds).
  2. **Custom Origins:** Any server that speaks HTTP/HTTPS and is accessible via a public IP address or public DNS record. This includes web servers running on **Amazon EC2**, behind an **Application Load Balancer (ALB)**, or even a **web server running on-premises** in your own physical infrastructure.

---

### Summary Table: CloudFront Origin Compatibility

| Origin Type | Supported? | Description / Requirement |
| :--- | :---: | :--- |
| **Amazon S3** | ✅ **Yes** | Standard object storage engine; highly optimized for CloudFront. |
| **Amazon EC2 / ALB** | ✅ **Yes** | Acts as a Custom Origin; must accept inbound public HTTP/HTTPS traffic. |
| **On-Premises Servers** | ✅ **Yes** | Acts as a Custom Origin; must be reachable over the public internet. |
| **Amazon Glacier** | ❌ **No** | Cold storage with retrieval delays; lacks an active synchronous web server interface. |



## Question 9

**Question:**
Which one of the below doesn't affect Amazon CloudFront billing?

[ ] Distribution Type.

[ ] Data Transfer Out.

[ ] Dedicated IP SSL Certificates.

[ ] Requests.

**Correct Answer:** Distribution Type.

---

### Why this is the correct answer:

Amazon CloudFront charges you based on the actual usage of your content delivery network features rather than the logical structural wrapper of the asset.

* **No Cost for Configurations:** You are not charged simply for creating a specific "Distribution Type" (e.g., creating a distribution targeted for web static content vs. streaming dynamic media). You can create multiple CloudFront distributions within an AWS account without incurring a base configuration fee. 
* **Focus on Traffic and Features:** CloudFront metrics track the quantitative workload running through the distribution, not the metadata categorization of the setup itself.

---

### CloudFront Pricing Drivers vs. Non-Drivers:

| Cost Component | Pricing Status | Impact Details |
| :--- | :--- | :--- |
| **Distribution Type** | ❌ **Does NOT affect billing** | Creating, deleting, or grouping distributions carries no base cost. |
| **Data Transfer Out** |  **Affects billing** | You are charged per GB for data transferred out of CloudFront edge locations to your end-users. |
| **Requests** |  **Affects billing** | You are charged for the total number of HTTP or HTTPS requests made to your distribution. |
| **Dedicated IP Custom SSL** |  **Affects billing** | While standard SNI SSL certificates are free, allocating a **Dedicated IP Custom SSL** mapping carries a heavy fixed charge (typically $600/month). |