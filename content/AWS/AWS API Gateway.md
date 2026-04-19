---
title: AWS API Gateway Quiz
tags: [aws, api-gateway]
difficulty: medium
date: 2026-04-05
---

## Question 1

When you are using an Edge-Optimized API Gateway, your API Gateway lives in CloudFront Edge Locations across all AWS Regions.


[ ] False


[ ] True


**Correct Answer:** ✅ False

**Explanation:** This is a common misconception. When you use an **Edge-Optimized API Gateway**, the API Gateway itself still resides in a specific **AWS Region**. However, AWS automatically creates and manages a **CloudFront Distribution** in front of it. Requests are routed to the nearest CloudFront Edge Location and then travel over the optimized AWS private network to the API Gateway in its home region.