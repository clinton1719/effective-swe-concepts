---
title: AWS System Design Quiz
tags: [aws, system-design]
difficulty: medium
date: 2026-04-26
---

## Question 1

Your website is serving on-demand training videos to your workforce. Videos are uploaded monthly in high resolution MP4 format. Your workforce is distributed globally often on the move and using company-provided tablets that require the HTTP Live Streaming (HLS) protocol to watch a video. Your company has no video transcoding expertise and it required you may need to pay for a consultant. How do you implement the most cost-efficient architecture without compromising high availability and quality of video delivery?

[ ] A video transcoding pipeline running on EC2 using SQS to distribute tasks and Auto Scaling to adjust the number of nodes depending on the length of the queue. EBS volumes to host videos and EBS snapshots to incrementally backup original files after a few days. CloudFront to serve HLS transcoded videos from EC2.

[ ] Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. EBS volumes to host videos and EBS snapshots to incrementally backup original files after a few days. CloudFront to serve HLS transcoded videos from EC2.

[ ] **Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. S3 to host videos with Lifecycle Management to archive original files to Glacier after a few days. CloudFront to serve HLS transcoded videos from S3.**

[ ] A video transcoding pipeline running on EC2 using SQS to distribute tasks and Auto Scaling to adjust the number of nodes depending on the length of the queue. S3 to host videos with Lifecycle Management to archive all files to Glacier after a few days. CloudFront to serve HLS transcoded videos from Glacier.

**Correct Answer:** ✅ **Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. S3 to host videos with Lifecycle Management to archive original files to Glacier after a few days. CloudFront to serve HLS transcoded videos from S3.**

**Explanation:** This architecture is the most cost-efficient and "Serverless" approach, addressing all the constraints mentioned:

* **No Transcoding Expertise:** **Amazon Elastic Transcoder** (or its modern successor, AWS Elemental MediaConvert) is a managed service. You don't need to manage servers, install software (FFmpeg), or hire a consultant to build a custom pipeline on EC2.
* **Storage Efficiency:** **Amazon S3** is significantly cheaper and more durable than keeping data on EBS volumes. Using **S3 Lifecycle Management** to move original high-resolution files to **S3 Glacier** saves costs while keeping the originals safe for future needs.
* **Global Performance:** **Amazon CloudFront** is essential for a globally distributed workforce, as it caches the HLS segments at Edge Locations near the users, ensuring high-quality, low-latency playback on their tablets.
* **HLS Support:** Elastic Transcoder specifically supports presets for HLS, which is the required format for the company-provided tablets.

**Why the others fall short:**
* **EC2-based options:** These require manual management, scaling logic, and specialized video expertise, which the prompt explicitly states the company lacks.
* **EBS for Hosting:** EBS is designed for block storage for instances, not for serving high-scale video content globally.
* **Glacier for CloudFront:** CloudFront cannot serve content directly from Glacier; data must be restored to S3 Standard before it can be served.

## Question 2

You are designing an intrusion detection prevention (IDS/IPS) solution for a customer web application in a single VPC. You are considering the options for implementing IDS/IPS protection for traffic coming from the Internet. Which of the following options would you consider? (Choose 2 answers)

[ ] **Implement IDS/IPS agents on each Instance running in VPC.**

[ ] Configure an instance in each subnet to switch its network interface card to promiscuous mode and analyze network traffic.

[ ] Implement Elastic Load Balancing with SSL listeners in front of the web applications.

[ ] **Implement a reverse proxy layer in front of web servers and configure IDS/ IPS agents on each reverse proxy server.**

**Correct Answers:** ✅ **Implement IDS/IPS agents on each Instance running in VPC.**
✅ **Implement a reverse proxy layer in front of web servers and configure IDS/ IPS agents on each reverse proxy server.**

**Explanation:** This question focuses on how to gain visibility into traffic within an AWS environment where traditional hardware-based "sniffing" isn't possible.

* **Agent-based (Host-based IDS/HIDS):** Since you cannot tap physical wires in AWS, installing agents directly on the EC2 instances allows the software to monitor all traffic entering and leaving that specific host. This is a very common and effective way to implement IDS/IPS in the cloud.
* **Reverse Proxy Layer:** By placing a layer of proxy servers (like Nginx, HAProxy, or a dedicated security appliance) in front of your application, you create a bottleneck where all incoming traffic must pass. By installing IDS/IPS agents on these proxies, you can inspect and filter traffic before it ever reaches your actual web servers.
* **Why the others are incorrect:**
    * **Promiscuous Mode:** In a standard AWS VPC, the underlying virtualization layer (Hypervisor) does not allow network interfaces to operate in promiscuous mode. You cannot simply "sniff" traffic from other instances on the same subnet this way.
    * **SSL Listeners on ELB:** While SSL listeners handle encryption/decryption, they do not perform deep packet inspection for intrusion detection or prevention. They are a load balancing and security feature, but not an IDS/IPS solution on their own.