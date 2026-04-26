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
