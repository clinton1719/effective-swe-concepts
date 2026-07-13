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

[ ] Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. S3 to host videos with Lifecycle Management to archive original files to Glacier after a few days. CloudFront to serve HLS transcoded videos from S3.

[ ] A video transcoding pipeline running on EC2 using SQS to distribute tasks and Auto Scaling to adjust the number of nodes depending on the length of the queue. S3 to host videos with Lifecycle Management to archive all files to Glacier after a few days. CloudFront to serve HLS transcoded videos from Glacier.

**Correct Answer:** Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. S3 to host videos with Lifecycle Management to archive original files to Glacier after a few days. CloudFront to serve HLS transcoded videos from S3.**

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

[ ] **Implement IDS/IPS agents on each Instance running in VPC.

[ ] Configure an instance in each subnet to switch its network interface card to promiscuous mode and analyze network traffic.

[ ] Implement Elastic Load Balancing with SSL listeners in front of the web applications.

[ ] **Implement a reverse proxy layer in front of web servers and configure IDS/ IPS agents on each reverse proxy server.**

**Correct Answers:** Implement IDS/IPS agents on each Instance running in VPC.**
Implement a reverse proxy layer in front of web servers and configure IDS/ IPS agents on each reverse proxy server.**

**Explanation:** This question focuses on how to gain visibility into traffic within an AWS environment where traditional hardware-based "sniffing" isn't possible.

* **Agent-based (Host-based IDS/HIDS):** Since you cannot tap physical wires in AWS, installing agents directly on the EC2 instances allows the software to monitor all traffic entering and leaving that specific host. This is a very common and effective way to implement IDS/IPS in the cloud.
* **Reverse Proxy Layer:** By placing a layer of proxy servers (like Nginx, HAProxy, or a dedicated security appliance) in front of your application, you create a bottleneck where all incoming traffic must pass. By installing IDS/IPS agents on these proxies, you can inspect and filter traffic before it ever reaches your actual web servers.
* **Why the others are incorrect:**
    * **Promiscuous Mode:** In a standard AWS VPC, the underlying virtualization layer (Hypervisor) does not allow network interfaces to operate in promiscuous mode. You cannot simply "sniff" traffic from other instances on the same subnet this way.
    * **SSL Listeners on ELB:** While SSL listeners handle encryption/decryption, they do not perform deep packet inspection for intrusion detection or prevention. They are a load balancing and security feature, but not an IDS/IPS solution on their own.


## Question 3

**Question:**
Content and Media Server is the latest requirement that you need to meet for a client. The client has been very specific about his requirements such as low latency, high availability, durability, and access control. Potentially there will be millions of views on this server and because of 'spiky' usage patterns, operations teams will need to provision static hardware, network, and management resources to support the maximum expected need. The Customer base will be initially low but is expected to grow and become more geographically distributed. Which of the following would be a good solution for content distribution?

[ ] Amazon S3 as both the origin server and for caching.

[ ] AWS Storage Gateway as the origin server and Amazon EC2 for caching.

[ ] AWS CloudFront as both the origin server and for caching.

[ ] Amazon S3 as the origin server and Amazon CloudFront for caching.


**Correct Answer:** Amazon S3 as the origin server and Amazon CloudFront for caching.

---

### Why this is the correct approach:

This architectural pattern is the gold standard for global, high-scale, and cost-effective content distribution on AWS, perfectly matching all the client's criteria:

* **Handling "Spiky" Traffic and Scalability:** **Amazon S3** is designed to scale dynamically to handle massive request rates automatically without needing any infrastructure provisioning. **Amazon CloudFront** caches the content at globally distributed edge locations. Together, they eliminate the need for the operations team to provision static hardware for peak demand, transforming a complex capacity-planning problem into a fully serverless, pay-as-you-go workflow.
* **Low Latency & Geographical Distribution:** CloudFront distributes files via a global network of edge locations. A user in Europe fetches content cached in Europe, and a user in Asia fetches it in Asia, minimizing network latency.
* **Durability & High Availability:** Amazon S3 provides 99.999999999% (11 9s) of data durability. CloudFront inherently provides high availability by serving cached copies even if communication to the origin experiences transient blips.
* **Access Control:** By configuring CloudFront **Origin Access Control (OAC)** or using **CloudFront Signed URLs/Cookies**, you can fully restrict direct S3 bucket access, ensuring that only authenticated users can access the media content securely through CloudFront.

### Why others are incorrect:
* **Amazon S3 for both:** S3 is a centralized storage service and does not natively cache content closer to geographically distributed global users. Relying solely on S3 would result in higher latencies for far-away users and increased egress cost.
* **AWS Storage Gateway and EC2:** This introduces massive operational overhead. You would have to manually manage, size, scale, and patch EC2 instances to handle the "millions of views" and spiky traffic patterns.
* **AWS CloudFront for both:** CloudFront is a Content Delivery Network (CDN) designed for temporary caching; it is not a data storage system. It requires a persistent backing origin (like S3 or a custom HTTP server) to fetch objects from when a cache-miss occurs.