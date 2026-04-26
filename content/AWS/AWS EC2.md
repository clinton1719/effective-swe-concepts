---
title: AWS EC2 Quiz
tags: [aws, aws-ec2]
difficulty: medium
date: 2026-04-26
---

## Question 1

A user has launched an EC2 instance. The instance got terminated as soon as it was launched. Which of the below mentioned options is not a possible reason for this?

[ ] The user account has reached the maximum volume limit.

[ ] The AMI is missing. It is the required part.

[ ] The snapshot is corrupt.

[ ] **The user account has reached the maximum EC2 instance limit.**

**Correct Answer:** ✅ **The user account has reached the maximum EC2 instance limit.**

**Explanation:** This question tests your knowledge of **Immediate Instance Termination** (the "Pending -> Terminated" state transition).

* **Why "Instance Limit" is NOT the reason:** If you have reached your service quota (limit) for EC2 instances, AWS will prevent you from even *starting* the launch process. You will receive an `InstanceLimitExceeded` error immediately in the console or via API, and the instance will never even reach the "Pending" state.
* **Why the other options ARE possible reasons:**
    * **AMI Missing / Snapshot Corrupt:** If the underlying EBS snapshot is corrupt or the AMI is no longer available/accessible at the moment of creation, the instance will fail to initialize and terminate immediately.
    * **Volume Limit:** If your account has reached the limit for EBS storage (e.g., total GiB of GP3 volumes), the instance may attempt to launch, fail to create the root volume, and then terminate.
    * **Other common reasons (not listed):** The EBS volume is encrypted and you don't have KMS permissions, or the root EBS volume is not found.