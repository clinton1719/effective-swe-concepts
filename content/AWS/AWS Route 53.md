---
title: AWS Route 53 Quiz
tags: [aws, aws-route53, aws-records]
difficulty: medium
date: 2026-04-26
---

## Question 1

How can the domain's zone apex, for example, 'myzoneapexdomain.com', be pointed towards an Elastic Load Balancer?

[ ] **By using an Amazon Route 53 Alias record.**

[ ] By using an AAAA record.

[ ] By using an Amazon Route 53 CNAME record.

[ ] By using an A record.

**Correct Answer:** ✅ **By using an Amazon Route 53 Alias record.**

**Explanation:** This is a classic DNS challenge in AWS. 

* **The Zone Apex Restriction:** According to standard DNS protocol (RFC), you cannot create a **CNAME** record for the zone apex (the "naked" domain without the `www`). However, Elastic Load Balancers do not have a static IP address; they only provide a DNS name.
* **The Route 53 Alias Solution:** An **Alias record** is a Route 53-specific extension to DNS. It allows you to point your zone apex to an AWS resource (like an ELB, CloudFront distribution, or S3 bucket). 
* **How it works:** When Route 53 receives a query for an Alias record, it responds with the IP address of the underlying resource. Unlike a CNAME, the Alias record is recognized by Route 53 as being at the apex, solving the protocol restriction.
* **Why not CNAME?** As mentioned, DNS standards forbid using a CNAME for the root domain (myzoneapexdomain.com).
* **Why not A record?** A standard A record requires a static IP address. Since ELB IPs can change, you cannot use a standard A record.


## Question 2

Which of the following are NOT valid Route 53 Health Checks?

[ ] Health Check that monitor SQS Queue

[ ] Health Check that monitors an Endpoint

[ ] Health Check that monitors other Health Checks

[ ] Health Check that monitor CloudWatch Alarms

**Correct Answer:** Health Check that monitor SQS Queue

**Explanation:** Amazon Route 53 does not have a native health check type specifically designed to monitor an SQS Queue directly. Route 53 officially supports three primary types of health checks:

*   **Endpoint Health Checks:** Route 53 monitors a specific resource (via IP address or domain name) by sending regular requests using HTTP, HTTPS, or TCP.
*   **Calculated Health Checks:** These are "parent" health checks that monitor the status of other "child" health checks. They use logical operators (AND, OR, NOT) to determine overall health based on multiple components.
*   **CloudWatch Alarm Health Checks:** This type associates the health check with a CloudWatch alarm. Route 53 marks the resource as healthy or unhealthy based on the state of that alarm. 

**Why SQS Queue is the correct answer:**
While you can monitor an SQS queue using **CloudWatch Alarms** (e.g., alarming if the number of visible messages exceeds a threshold) and then point a Route 53 health check at that alarm, there is no direct "SQS Queue" health check type in the Route 53 console or API.

---

### Summary of Route 53 Health Check Types

| Health Check Type | Mechanism | Target Example |
| :--- | :--- | :--- |
| **Endpoint** | Global probes (HTTP/HTTPS/TCP) | Web servers, Load Balancers |
| **Calculated** | Aggregates child check statuses | Multi-region application stacks |
| **CloudWatch Alarm** | Monitors alarm state (OK/ALARM) | Databases, internal SQS metrics |
| **Recovery Control** | Integration with ARC | Tightly coupled failover systems |


## Question 3

You have an application that's hosted in two different AWS Regions us-west-1 and eu-west-2. You want your users to get the best possible user experience by minimizing the response time from application servers to your users. Which Route 53 Routing Policy should you choose?

[ ] Multi Value

[ ] Weighted

[ ] Latency

[ ] Geolocation

**Correct Answer:** Latency

**Explanation:** **Latency-Based Routing** is specifically designed to improve user experience by directing traffic to the AWS Region that provides the lowest network latency for the end user.

*   **Dynamic Measurement:** AWS continuously measures network latency between internet users and AWS Regions. When a user makes a DNS request, Route 53 selects the region that currently offers the fastest round-trip time for that specific user.
*   **Performance Optimization:** Unlike Geolocation (which is based purely on physical distance or boundaries), Latency routing accounts for the actual performance of the internet "pipes." Sometimes a user in one country might actually have a faster connection to a distant region than a local one due to submarine cable routing.
*   **Global Scaling:** This policy is the standard choice for multi-region active-active architectures where "speed to first byte" is the primary priority.

**Why the others are less ideal for this specific goal:**
*   **Geolocation:** Routes based on the user's physical location (continent/country). While often faster, it doesn't account for real-time network congestion or performance—it is primarily used for content localization or legal compliance (like GDPR).
*   **Weighted:** Distributes traffic based on a percentage (e.g., 50/50). It does not take the user's location or performance into account.
*   **Multi Value:** Returns multiple healthy IP addresses to the client to allow for client-side load balancing and high availability, but it does not prioritize the "fastest" connection.

---

> **Exam Tip:** If the question emphasizes **"Minimize response time"** or **"Performance,"** choose **Latency**. If it mentions **"Compliance,"** **"Language,"** or **"Restricted Content,"** choose **Geolocation**.


## Question 3

You have updated a Route 53 Record's myapp.mydomain.com value to point to a new Elastic Load Balancer, but it looks like users are still redirected to the old ELB. What is a possible cause for this behavior?

[ ] Because of the Alias record

[ ] Because of the CNAME record

[ ] Because of the TTL

[ ] Because of Route 53 Health Checks

**Correct Answer:** Because of the TTL

**Explanation:** **TTL (Time to Live)** is the primary reason why DNS changes do not take effect immediately for all users. It determines how long a DNS resolver should cache a record before querying the authoritative name servers (Route 53) again.

*   **Caching Mechanism:** When a user's browser or an ISP's DNS resolver queries your domain, it caches the result for the duration of the TTL (e.g., 300 seconds). Until that time expires, the resolver will keep serving the **old ELB's IP address** even if you have already updated the record in AWS.
*   **Propagation Delay:** While Route 53 updates its own name servers globally within 60 seconds, the "propagation" people experience is actually just waiting for thousands of local caches around the world to expire and fetch the new data.
*   **Best Practice:** Before performing a planned migration between Load Balancers, it is a standard "Senior Dev" move to lower the TTL (e.g., to 60 seconds) a few hours in advance. This ensures that when you make the final switch, the transition happens almost instantly for your users.

**Why the others are incorrect:**
*   **Alias/CNAME records:** These are methods of mapping names to resources. While they might have different default behaviors (Alias records for ALBs typically have a fixed 60-second TTL), they are the *structure* of the record, not the *cause* of the delay.
*   **Health Checks:** These are used for failover. If a health check fails, Route 53 stops sending traffic to that resource, but it doesn't cause a record update to "stick" to an old value.

---

> **Note:** If you use an **Alias** record pointing to an AWS ALB, AWS sets the TTL to 60 seconds automatically. If you use a **CNAME**, you can set the TTL yourself, sometimes to much higher values like 3600 (1 hour), which would cause a significantly longer delay.


## Question 4

You have purchased mycoolcompany.com on Amazon Route 53 Registrar and would like the domain to point to your Elastic Load Balancer my-elb-1234567890.us-west-2.elb.amazonaws.com. Which Route 53 Record type must you use here?

[ ] CNAME

[ ] Alias

**Correct Answer:** Alias

**Explanation:** In AWS Route 53, an **Alias record** is the required choice when you need to point the **zone apex** (the "naked" or root domain, like `mycoolcompany.com`) to an AWS resource like an Elastic Load Balancer.

*   **The Zone Apex Restriction:** Standard DNS protocols (RFC 1034) prohibit the use of a CNAME for the root domain. Since your goal is to point the top-level domain itself to the ELB, a CNAME is technically impossible.
*   **AWS Native Integration:** Alias records are a Route 53-specific extension. They act as a pointer to the AWS resource's DNS name but appear to the outside world as a standard A record (returning the current IP addresses of the ELB).
*   **Automatic Updates:** If the underlying IP addresses of your Elastic Load Balancer change (which happens frequently as the ELB scales), Route 53 automatically tracks these changes and updates the Alias record without any manual intervention.
*   **Cost Efficiency:** Unlike CNAME queries, Route 53 does not charge for queries to Alias records that point to AWS resources like ELBs, CloudFront distributions, or S3 buckets.

**Why CNAME is incorrect:**
While a **CNAME** can be used for subdomains (e.g., `www.mycoolcompany.com`), it cannot be used for the root domain. Additionally, using a CNAME for AWS resources incurs standard DNS query charges and requires an extra resolution step, making it less efficient than an Alias record.

---

### Comparison: Alias vs. CNAME

| Feature | Alias Record | CNAME Record |
| :--- | :--- | :--- |
| **Zone Apex Support** | **Yes (`mycoolcompany.com`)** | No (Subdomains only) |
| **AWS Resource Integration** | Optimized for ELB, S3, CloudFront | Generic (any domain) |
| **Query Charges** | **Free for AWS targets** | Standard query rates |
| **Record Type** | Type A or AAAA | Type CNAME |
| **Performance** | Faster (single lookup) | Slower (two lookups) |


## Question 5

You have a legal requirement that people in any country but France should NOT be able to access your website. Which Route 53 Routing Policy helps you in achieving this?

[ ] Latency

[ ] Simple

[ ] Multi Value

[ ] Geolocation

**Correct Answer:** Geolocation

**Explanation:** **Geolocation Routing** allows you to route traffic based on the geographic location of your users (continent, country, or even specific U.S. states).

*   **Geographic Restricting (Blocking):** To satisfy a requirement like "France only," you create a record specifically for France that points to your web resources.
*   **The "No Default" Rule:** In Route 53 Geolocation routing, if you **do not** create a "Default" record, any DNS query originating from a location that doesn't have a specific matching record will return `NODATA`. This effectively prevents users in those locations from resolving your domain name.
*   **Compliance & Licensing:** This is the primary policy used for digital rights management (e.g., streaming content only in specific countries) or legal compliance (e.g., GDPR or localized gambling laws).

**Why the others are incorrect:**
*   **Latency:** Routes traffic based on the fastest connection. It does not care about national boundaries; a user in a neighboring country might still be routed to your server if the latency is low.
*   **Simple:** Does not have any intelligence regarding the user's location; it simply returns a static value.
*   **Multi Value:** Aimed at high availability and basic load balancing, not geographic filtering.

---

### Comparison: Geolocation vs. Geoproximity

| Feature | Geolocation | Geoproximity |
| :--- | :--- | :--- |
| **Logic** | Based on user's **Country/Continent** | Based on **Physical Distance** to resources |
| **Control** | Precise boundary control | Uses "Bias" to expand/shrink region influence |
| **Use Case** | **Compliance / Geo-blocking** | Shifting traffic between data centers |



## Question 6

You have deployed a new Elastic Beanstalk environment and would like to direct 5% of your production traffic to this new environment. This allows you to monitor for CloudWatch metrics and ensure that no bugs exist with your new environment. Which Route 53 Record type allows you to do so?

[ ] Simple

[ ] Weighted

[ ] Latency

[ ] Failover

**Correct Answer:** Weighted

**Explanation:** **Weighted Routing** is the standard mechanism for traffic shifting, canary deployments, and A/B testing in AWS.

*   **Percentage-Based Control:** You assign a numerical weight (0-255) to each record. Route 53 calculates the total weight of all healthy records and directs traffic proportionally. For a 5% split, you could set the new environment's weight to `5` and the old environment's weight to `95`.
*   **Canary Testing:** This specific use case is called a **Canary Deployment**. It allows you to test new code on a small subset of real-world traffic to limit the "blast radius" if a bug is discovered.
*   **Gradual Rollouts:** Once you are confident in the 5% traffic performance (checking CloudWatch metrics for 4xx/5xx errors), you can incrementally increase the weight (e.g., 25%, 50%) until you reach 100%.
*   **Instant Rollback:** If a bug is detected, you can set the weight of the new environment to `0`, and Route 53 will immediately stop sending traffic to that endpoint.

**Why the others are incorrect:**
*   **Simple:** Can return multiple IP addresses but has no mechanism to control the percentage of traffic; the client chooses an IP randomly.
*   **Latency:** Routes based on network performance between the user and the AWS region, not based on a predetermined percentage.
*   **Failover:** Used for active-passive disaster recovery (100% to primary, switching to secondary only if primary is unhealthy).

---

### Canary Deployment Workflow

| Step | Action | Result |
| :--- | :--- | :--- |
| **1. Deploy** | Spin up "Green" environment | Two identical environments exist |
| **2. Initial Shift** | Set weights to 95 (Blue) / 5 (Green) | **5% of users see new version** |
| **3. Monitor** | Check CloudWatch for errors | Validate new code with real data |
| **4. Full Cutover** | Set weights to 0 (Blue) / 100 (Green) | Migration complete |


## Question 7

You have purchased a domain on GoDaddy and would like to use Route 53 as the DNS Service Provider. What should you do to make this work?

[ ] Request for a domain transfer

[ ] Create a Private Hosted Zone and update the 3rd party Registrar NS records

[ ] Create a Public Hosted Zone and update the Route 53 NS records

[ ] Create a Public Hosted Zone and update the 3rd party Registrar NS records

**Correct Answer:** Create a Public Hosted Zone and update the 3rd party Registrar NS records

**Explanation:** To use Route 53 as your DNS service while keeping your domain registration with a third-party registrar like GoDaddy, you must perform a "DNS delegation."

*   **Public Hosted Zone:** Since your website needs to be reachable from the public internet, you must create a **Public Hosted Zone** in Route 53. Upon creation, AWS generates a set of four unique **Name Servers (NS records)** for that zone.
*   **Registrar Update:** You must then log into your GoDaddy account and replace their default name servers with the four Route 53 name servers you just generated. This tells the global DNS system that Route 53 is now the "authoritative" source for your domain's records.
*   **Registration vs. DNS:** It is important to distinguish between the **Registrar** (who you pay for the domain name) and the **DNS Provider** (who manages the traffic routing). You do not need to transfer the domain registration to AWS to use Route 53 for DNS.

**Why the others are incorrect:**
*   **Domain Transfer:** This is a separate, more complex process that moves the *ownership and billing* of the domain to AWS. While possible, it is not required just to change the DNS provider.
*   **Private Hosted Zone:** These are used for internal DNS resolution within a VPC and are invisible to the public internet.
*   **Update Route 53 NS records:** You don't update the records inside Route 53 to point elsewhere; you update the **Registrar (GoDaddy)** to point to Route 53.

---

### The 4-Step Migration Process

| Step | Action | Platform |
| :--- | :--- | :--- |
| **1. Create Zone** | Create a Public Hosted Zone | AWS Route 53 |
| **2. Copy NS** | Copy the 4 assigned Name Servers | AWS Route 53 |
| **3. Update Registrar** | Replace default NS with AWS NS | **GoDaddy** |
| **4. Verification** | Wait for propagation (TTL) | Global DNS |
