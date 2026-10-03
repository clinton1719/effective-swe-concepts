---
title: AWS Networking Quiz
tags: [aws, aws-vpc, subnet, transit-gateway, site-to-site-vpn]
difficulty: medium
date: 2026-05-02
---

## Question 1

What does this CIDR 10.0.4.0/28 correspond to?

[ ] 10.0.4.0 to 10.0.4.15

[ ] 10.0.4.0 to 10.0.32.0

[ ] 10.0.4.0 to 10.0.4.28

[ ] 10.0.0.0 to 10.0.16.0

**Correct Answer:** 10.0.4.0 to 10.0.4.15\*\*

**Explanation:** To find the range of an IPv4 CIDR block, you look at the prefix length (the number after the slash).

- **The Math:** An IPv4 address has 32 bits. A `/28` means the first 28 bits are fixed (the network portion), leaving $32 - 28 = 4$ bits for host addresses.
- **Calculating Hosts:** $2^4 = 16$. This means the block contains **16 total IP addresses**.
- **The Range:** Starting at `10.0.4.0`, we count 16 addresses:
  - .0, .1, .2, .3, .4, .5, .6, .7, .8, .9, .10, .11, .12, .13, .14, .15.
- **The Last Address:** Therefore, the range ends at `10.0.4.15`.

**Quick Tip for AWS:** Remember that in an AWS VPC subnet, 5 IP addresses are reserved (the first four and the last one), so a `/28` would only provide 11 usable IP addresses for your resources!

## Question 2

If you want a 500 Mbps Direct Connect connection between your corporate datacenter to AWS, you would choose a .................. connection.

[ ] Dedicated

[ ] **Hosted**

**Correct Answer:** Hosted\*\*

**Explanation:** AWS Direct Connect offers two distinct types of connections, and the available bandwidth is the primary differentiator between them:

- **Hosted Connection:** These are provided by AWS Direct Connect Partners. They support sub-1 Gbps capacities, specifically: **50Mbps, 100Mbps, 200Mbps, 300Mbps, 400Mbps, and 500Mbps**, as well as higher capacities of 1Gbps, 2Gbps, 5Gbps, and 10Gbps. Since your requirement is 500 Mbps, a Hosted connection is the correct choice.
- **Dedicated Connection:** This is a physical ethernet port dedicated to a single customer. These are only available in two fixed capacities: **1 Gbps, 10 Gbps, and 100 Gbps**. You cannot have a Dedicated connection at 500 Mbps.

**Key Difference:**
With a **Dedicated** connection, you work directly with AWS to provision a physical port. With a **Hosted** connection, a partner has a large capacity link to AWS and "carves out" a specific portion (like 500 Mbps) for you.

## Question 3

You have 3 VPCs A, B, and C. You want to establish a VPC Peering connection between all the 3 VPCs. What should you do?

[ ] As VPC Peering supports Transitive Peering, so you need to establish 2 VPC Peering connections (A-B, B-C)

[ ] **Establish 3 VPC Peering connections (A-B, A-C, B-C)**

**Correct Answer:** Establish 3 VPC Peering connections (A-B, A-C, B-C)\*\*

**Explanation:** This question highlights one of the most critical limitations of VPC Peering.

- **No Transitive Peering:** AWS VPC Peering does **not** support transitive peering. This means if VPC A is peered with VPC B, and VPC B is peered with VPC C, traffic from A cannot "hop" through B to reach C.
- **The Mesh Requirement:** To allow all three VPCs to communicate with each other, you must create a direct peering relationship between every possible pair. For 3 VPCs, this requires 3 connections ($A \leftrightarrow B$, $B \leftrightarrow C$, and $A \leftrightarrow C$).
- **Scaling Note:** As the number of VPCs increases, the number of required peering connections grows significantly (following the formula $n(n-1)/2$). For large-scale environments with many VPCs, AWS recommends using a **Transit Gateway**, which _does_ support a hub-and-spoke transitive architecture.

## Question 4

Security Groups operate at the ................. level while NACLs operate at the ................. level.

[ ] \*\*EC2 instance, Subnet

[ ] Subnet, EC2 instance

**Correct Answer:** EC2 instance, Subnet\*\*

**Explanation:** This is a fundamental concept of AWS networking security. Think of them as two different layers of a defense-in-depth strategy:

- **Security Groups (Instance Level):** A Security Group acts as a virtual firewall for your **individual EC2 instances** (specifically, their Network Interfaces). It controls the traffic that is allowed to reach and leave the instance itself.
- **Network Access Control Lists (NACLs) (Subnet Level):** A NACL acts as a firewall for the **entire subnet**. Any traffic entering or leaving the subnet must pass through the NACL rules.

**Key Differences:**

- **Statefulness:** Security Groups are **stateful** (if you allow inbound traffic, the outbound response is automatically allowed). NACLs are **stateless** (you must explicitly define both inbound and outbound rules).
- **Order of Evaluation:** NACLs evaluate rules in numerical order (starting from the lowest number) and stop as soon as a match is found. Security Groups evaluate all rules before deciding whether to allow traffic.

## Question 5

You would like to provide Internet access to your EC2 instances in private subnets with IPv4 while making sure this solution requires the least amount of administration and scales seamlessly. What should you use?

[ ] NAT Instances with Source/Destination Check flag off

[ ] Egress Only Internet Gateway

[ ] **NAT Gateway**

**Correct Answer:** NAT Gateway\*\*

**Explanation:** This question compares various ways to handle outbound-only traffic from a private subnet.

- **NAT Gateway (The Right Choice):** This is a managed AWS service. It is designed to be **highly available** within an Availability Zone and **scales automatically** up to 100 Gbps. Because AWS manages the underlying software and hardware, it requires the least amount of administration.
- **NAT Instances:** These are legacy solutions where you manage an EC2 instance yourself. You have to handle patching, scaling (by changing instance sizes), and high availability (manually setting up failover). This violates the "least administration" requirement.
- **Egress-Only Internet Gateway:** While this is a managed service that scales well, it is specifically designed for **IPv6** traffic. The prompt explicitly asks for a solution for **IPv4**.
- **Source/Destination Check:** While you _do_ need to disable this flag for a manual NAT Instance to work, doing so doesn't make the instance scale seamlessly or reduce the administration burden.

## Question 6

VPC Peering has been enabled between VPC A and VPC B, and the route tables have been updated for VPC A. But, the EC2 instances cannot communicate. What is the likely issue?

[ ] Check the NACL

[ ] \*\*Check the Route Tables in VPC B

[ ] Check the EC2 instance attached Security Groups

[ ] Check if DNS Resolution is enabled

**Correct Answer:** Check the Route Tables in VPC B\*\*

**Explanation:** Routing in a VPC Peering connection is not automatic and must be configured on **both ends** of the peering relationship.

- **Bidirectional Routing:** For traffic to flow between two VPCs, a route must exist in the source VPC to send traffic _to_ the peering connection, and a route must exist in the destination VPC to send the response _back_ to the peering connection.
- **The Scenario:** The prompt states that route tables have been updated for VPC A. This means traffic can leave VPC A and reach VPC B. However, without an entry in VPC B's route table pointing back to VPC A, the instances in VPC B won't know how to send a return packet.
- **Why the others are secondary:**
  - **NACLs/Security Groups:** While these could certainly block traffic, the "likely issue" in a new peering setup is almost always the routing, especially since the prompt specifically mentions that only one side's route table was updated.
  - **DNS Resolution:** This only affects your ability to resolve private DNS hostnames between VPCs. The instances would still be able to communicate via IP address even if DNS resolution was disabled.

## Question 7

You have set up a Direct Connect connection between your corporate data center and your VPC A in your AWS account. You need to access VPC B in another AWS region from your corporate datacenter as well. What should you do?

[ ] Enable VPC Peering

[ ] Use a Customer Gateway

[ ] \*\*Use a Direct Connect Gateway

[ ] Set up a NAT Gateway

**Correct Answer:** Use a Direct Connect Gateway\*\*

**Explanation:** A **Direct Connect Gateway (DXGW)** is a global resource that acts as a grouping for Virtual Private Gateways (VGWs) and Private Virtual Interfaces (VIFs).

- **Multi-Region Connectivity:** The primary purpose of a Direct Connect Gateway is to allow a single Direct Connect connection to access VPCs in **any AWS Region** (except China). This eliminates the need to establish a separate physical connection for every region you use.
- **Architecture:** You associate your Direct Connect connection with the DXGW, and then associate that DXGW with the Virtual Private Gateways of both VPC A and VPC B.
- **Why the others are incorrect:**
  - **VPC Peering:** While it connects VPCs, you cannot "hop" through VPC A to reach VPC B from your data center due to the lack of transitive routing in peering.
  - **Customer Gateway:** This is just a physical or software appliance on your side of a VPN/Direct Connect; it doesn't solve the cross-region routing problem.
  - **NAT Gateway:** This is used for allowing private instances to reach the internet, not for corporate-to-VPC connectivity.

## Question 8

You have a VPC in your AWS account that runs in a dual-stack mode. You are continuously trying to launch an EC2 instance, but it fails. After further investigation, you have found that you are no longer have IPv4 addresses available. What should you do?

[ ] Modify your VPC to run in IPv6 mode only

[ ] Modify your VPC to run in IPv4 mode only

[ ] **Add an additional IPv4 CIDR to your VPC**

**Correct Answer:** Add an additional IPv4 CIDR to your VPC\*\*

**Explanation:** In a dual-stack VPC, resources use both IPv4 and IPv6. If you run out of IPv4 addresses in your existing CIDR block, you cannot simply switch to "IPv6 only" for existing infrastructure that likely relies on IPv4 for internal or external communication.

- **VPC CIDR Expansion:** AWS allows you to expand your VPC by associating additional IPv4 CIDR blocks with your existing VPC.
- **How it works:** You can add up to five secondary IPv4 CIDR blocks to a VPC. Once added, you can create new subnets using this new range or expand existing ones (if the address space allows). This provides the necessary "room" to launch more EC2 instances.
- **Why the others are incorrect:**
  - **IPv6 mode only:** While IPv6 provides a near-infinite address space, most AWS services and many internet-facing applications still require IPv4 support. Transitioning an entire VPC to IPv6-only is a massive architectural shift and doesn't solve the immediate need for IPv4 connectivity.
  - **IPv4 mode only:** This would actually make the problem worse by removing the IPv6 capability without adding any new IPv4 addresses.

## Question 9

When using VPC Endpoints, what are the only two AWS services that have a Gateway Endpoint available?

[ ] Amazon S3 & Amazon SQS

[ ] Amazon SQS & DynamoDB

[ ] **Amazon S3 & DynamoDB**

**Correct Answer:** Amazon S3 & DynamoDB\*\*

**Explanation:** AWS offers two types of VPC Endpoints to allow private communication between your VPC and AWS services without requiring an Internet Gateway or NAT device: **Interface Endpoints** and **Gateway Endpoints**.

- **Gateway Endpoints:** These are specifically configured as a target in your VPC **route table**. Currently, only two services support this specific type of endpoint: **Amazon S3** and **DynamoDB**. They are free to use and provide a highly available way to route traffic to these services.
- **Interface Endpoints (PrivateLink):** These use an Elastic Network Interface (ENI) with a private IP address from your subnet's range to serve as an entry point for traffic. Almost all other AWS services (like SQS, SNS, Kinesis, etc.) use Interface Endpoints.
- **Why the distinction matters:** Gateway Endpoints are typically preferred for S3 and DynamoDB because they don't incur the hourly and data-processing charges associated with Interface Endpoints/PrivateLink.

## Question 10

You need to set up a dedicated connection between your on-premises corporate datacenter and AWS Cloud. This connection must be private, consistent, and traffic must not travel through the Internet. Which AWS service should you use?

[ ] Site-to-Site VPN

[ ] AWS PrivateLink

[ ] \*\*AWS Direct Connect

[ ] Amazon EventBridge

**Correct Answer:** AWS Direct Connect\*\*

**Explanation:** This question highlights the difference between a virtual connection over the public internet and a dedicated physical connection.

- **AWS Direct Connect:** This service establishes a dedicated network connection from your premises to AWS. Because it uses a private, dedicated line (bypassing your internet service provider), the network performance is far more **consistent** and predictable than internet-based connections. It also ensures traffic remains completely **private** and off the public internet.
- **Site-to-Site VPN:** While a VPN provides a private, encrypted "tunnel," it still travels over the **public internet**. This means it is subject to fluctuating internet congestion and latency, making it less "consistent" than Direct Connect.
- **AWS PrivateLink:** This is used to provide private connectivity between VPCs, AWS services, and on-premises applications, but it requires an underlying transport layer like a VPN or Direct Connect to reach your datacenter.
- **Amazon EventBridge:** This is a serverless event bus used for connecting applications together using data from your own applications, integrated SaaS applications, and AWS services. it is not a networking connectivity service.

## Question 11

AWS reserves 5 IP addresses each time you create a new subnet in a VPC. When you create a subnet with CIDR 10.0.0.0/24, the following IP addresses are reserved, EXCEPT ....................

[ ] 10.0.0.1

[ ] 10.0.0.2

[ ] 10.0.0.3

[ ] **10.0.0.4**

**Correct Answer:** 10.0.0.4\*\*

**Explanation:** In every VPC subnet, AWS reserves the **first four** IP addresses and the **last one** IP address. For a `10.0.0.0/24` network, the breakdown is as follows:

- **10.0.0.0:** Network address.
- **10.0.0.1:** Reserved by AWS for the **VPC router**.
- **10.0.0.2:** Reserved by AWS for the **Amazon Provided DNS**.
- **10.0.0.3:** Reserved by AWS for **future use**.
- **10.0.0.255:** Network broadcast address (AWS does not support broadcast, but the address remains reserved).

**10.0.0.4** is the **first usable IP address** available for you to assign to a resource (like an EC2 instance or an ENI).

## Question 12

You plan on creating a subnet and want it to have at least capacity for 28 EC2 instances. What's the minimum size you need to have for your subnet?

[ ] /28

[ ] /27

[ ] \*\*/26

[ ] /25

**Correct Answer:** /26\*\*

**Explanation:** This is a classic "trick" question that tests your knowledge of the **5 reserved IP addresses** in every AWS subnet.

1.  **Understand the Requirement:** You need capacity for **28** instances.
2.  **Calculate Usable IPs:**
    - **/28:** $2^{(32-28)} = 16$ total IPs. Subtract 5 reserved = **11 usable IPs**. (Too small)
    - **/27:** $2^{(32-27)} = 32$ total IPs. Subtract 5 reserved = **27 usable IPs**. (Still too small! You need 28).
    - **/26:** $2^{(32-26)} = 64$ total IPs. Subtract 5 reserved = **59 usable IPs**. (This fits the requirement).
3.  **Conclusion:** Even though 28 is very close to the 32 addresses provided by a `/27`, the 5 reserved addresses by AWS ($10.x.x.0$ through $10.x.x.3$ and $10.x.x.255$) mean you only have 27 available slots. Therefore, you must step up to a **/26**.

## Question 13

When you set up an AWS Site-to-Site VPN connection between your corporate on-premises datacenter and VPCs in AWS Cloud, what are the two major components you want to configure for this connection?

[ ] Customer Gateway and NAT Gateway

[ ] Internet Gateway and Customer Gateway

[ ] Virtual Private Gateway and Internet Gateway

[ ] **Virtual Private Gateway and Customer Gateway**

**Correct Answer:** Virtual Private Gateway and Customer Gateway\*\*

**Explanation:** An AWS Site-to-Site VPN consists of two specific "anchors" on either side of the connection:

- **Virtual Private Gateway (VGW):** This is the VPN concentrator on the **AWS side** of the connection. It is attached to the VPC that you want to connect to your on-premises network. (Alternatively, a **Transit Gateway** can be used for more complex setups, but VGW is the standard answer for basic Site-to-Site VPNs).
- **Customer Gateway (CGW):** This is a resource you create in AWS that represents your **on-premises side** of the connection. It provides information to AWS about your physical device (like its public IP address and routing preference).

**Why the others are incorrect:**

- **NAT Gateway:** This is used to allow instances in a private subnet to reach the internet, not for VPN connectivity.
- **Internet Gateway:** While the VPN traffic travels over the internet, the VPN connection itself is defined by the VGW and CGW. You do not "configure" the IGW specifically to establish the VPN tunnel.

## Question 14

A company has set up a Direct Connect connection between their corporate data center to AWS. There is a requirement to prepare a cost-effective secure backup connection in case there are issues with this Direct Connect connection. What is the most cost-effective and secure solution you recommend?

[ ] Setup another Direct Connect connection to the same AWS region

[ ] Setup another Direct Connect connection to a different AWS region

[ ] Setup a Site-to-Site VPN connection as a backup\*\*

**Correct Answer:** Setup a Site-to-Site VPN connection as a backup\*\*

**Explanation:** When designing for high availability, you must balance redundancy with cost.

- **Cost-Effectiveness:** A **Site-to-Site VPN** is significantly cheaper than a second Direct Connect (DX) line. VPNs run over the public internet, so there are no expensive dedicated hardware or circuit monthly costs associated with them—you only pay for the connection time and data transfer.
- **Security:** Even though it travels over the public internet, a Site-to-Site VPN is highly **secure** because it uses IPsec (Internet Protocol Security) to encrypt the traffic between your datacenter and your VPC.
- **The Hybrid Approach:** This is a very common architecture. The Direct Connect serves as the primary, high-bandwidth path, while the VPN sits idle (or carries low-priority traffic) as a "failover" path. If the DX goes down, your routing (typically handled via BGP) will automatically shift traffic to the VPN tunnel.

**Why the others are less ideal for this specific requirement:**

- **Secondary Direct Connect:** While this provides the highest performance and reliability (it's the "gold standard" for redundancy), it is very expensive. The prompt specifically asks for the **most cost-effective** solution.

## Question 15

Your company has several on-premises sites across the USA. These sites are currently linked using private connections, but your private connections provider has been recently quite unstable, making your IT architecture partially offline. You would like to create a backup connection that will use the public Internet to link your on-premises sites, that you can failover in case of issues with your provider. What do you recommend?

[ ] VPC Peering

[ ] \*\*AWS VPN CloudHub

[ ] Direct Connect

[ ] AWS PrivateLink

**Correct Answer:** AWS VPN CloudHub\*\*

**Explanation:** This scenario requires a **hub-and-spoke** model for connecting multiple on-premises sites to each other using the public internet.

- **AWS VPN CloudHub:** This is a feature of the AWS Virtual Private Gateway (VGW) that allows multiple remote sites to communicate with each other, not just with the VPC. You establish multiple Site-to-Site VPN connections from each site to the same VGW. CloudHub then routes traffic between these sites over the public internet, acting as a "hub."
- **The Use Case:** It is specifically designed for companies with multiple branch offices and existing internet connections that need a low-cost, primary, or backup hub-and-spoke model for site-to-site connectivity.

**Why the others are incorrect:**

- **VPC Peering:** This connects two AWS VPCs together. It cannot be used to connect on-premises sites to one another.
- **Direct Connect:** This is a private, physical connection. The prompt specifically asks for a solution that uses the **public Internet** as a backup for when private connections fail.
- **AWS PrivateLink:** This is used to expose services from one VPC to another VPC or on-premises privately using Interface Endpoints; it is not a site-to-site networking solution.

## Question 16

You have a corporate network of size 10.0.0.0/8 and a satellite office of size 192.168.0.0/16. Which CIDR is acceptable for your AWS VPC if you plan on connecting your networks later on?

[ ] 172.16.0.0/12

[ ] 172.16.0.0/16

[ ] 10.0.16.0/16

[ ] 192.168.4.0/18

**Correct Answer:** 172.16.0.0/16\*\*

**Explanation:** The golden rule of networking when connecting multiple environments (on-premises to cloud, or VPC to VPC) is that **CIDR blocks must not overlap.**

- **Analyzing Overlaps:**
  - **10.0.16.0/16:** This is a subset of your corporate network ($10.0.0.0/8$). If you use this, your routers won't know whether to send traffic to the local corporate network or the AWS VPC.
  - **192.168.4.0/18:** This is a subset of your satellite office ($192.168.0.0/16$). Again, this creates an IP overlap.
  - **172.16.0.0/12 vs 172.16.0.0/16:** Both are in the Private IP range (RFC 1918) and do not overlap with your existing networks. However, **AWS VPCs have a maximum size of /16.** You cannot create a VPC with a $/12$ prefix.
- **The Best Choice:** `172.16.0.0/16` is a valid VPC size, sits in the private IP space, and completely avoids overlapping with your corporate ($10.x.x.x$) or satellite ($192.168.x.x$) ranges.

---

### Comparison of RFC 1918 Private Address Ranges

| Range Name  | IP Address Block              | Max VPC Size | Usable for VPC?           |
| :---------- | :---------------------------- | :----------- | :------------------------ |
| **Class A** | 10.0.0.0 – 10.255.255.255     | /16          | Yes (if not used on-prem) |
| **Class B** | 172.16.0.0 – 172.31.255.255   | /16          | Yes                       |
| **Class C** | 192.168.0.0 – 192.168.255.255 | /16          | Yes                       |

## Question 17

A web application backend is hosted on EC2 instances in private subnets fronted by an Application Load Balancer in public subnets. There is a requirement to give some of the developers access to the backend EC2 instances but without exposing the backend EC2 instances to the Internet. You have created a bastion host EC2 instance in the public subnet and configured the backend EC2 instances Security Group to allow traffic from the bastion host. Which of the following is the best configuration for bastion host Security Group to make it secure?

[ ] Allow traffic only on port 80 from the company’s public CIDR

[ ] Allow traffic only on port 22 from the company’s public CIDR

[ ] Allow traffic only on port 22 from the company’s private CIDR

[ ] Allow traffic only on port 80 from the company’s private CIDR

**Correct Answer:** Allow traffic only on port 22 from the company’s public CIDR\*\*

**Explanation:** This question tests your understanding of how "Jump Servers" or Bastion hosts function as a security gateway.

- **Port 22 (SSH):** To manage a Linux backend instance, developers need to log in via SSH, which defaults to port 22. Port 80 is for HTTP (web traffic), which is handled by the Load Balancer, not the administrative login.
- **Public CIDR vs. Private CIDR:** The Bastion host lives in a **public subnet** so that it can be reached from the outside world (the internet). When developers at the company office try to connect to it, their traffic will originate from the **company's public IP address** (Public CIDR). The Bastion host cannot see or "talk to" a company's internal private IP range directly over the internet.
- **The Workflow:**
  1.  Developer (from Company Public IP) connects to the Bastion Host on Port 22.
  2.  Bastion Host (acting as a bridge) connects to the Private Backend EC2 instance.
  3.  Because the Backend's Security Group only allows Port 22 from the **Bastion's Security Group ID**, the backend remains completely hidden from the rest of the internet.

**Why the others are incorrect:**

- **Port 80:** As mentioned, this is for web traffic. You wouldn't use a Bastion host to "browse" the website; you use it for terminal access.
- **Private CIDR:** A Security Group on a public-facing instance cannot filter based on a remote office's private IP range because those addresses are not routable over the public internet.

## Question 18

You want to scale up an AWS Site-to-Site VPN connection throughput, established between your on-premises data and AWS Cloud, beyond a single IPsec tunnel's maximum limit of 1.25 Gbps. What should you do?

[ ] Use 2 Virtual Private Gateways

[ ] Use Direct Connect Gateway

[ ] Use Transit Gateway\*\*

**Correct Answer:** Use Transit Gateway\*\*

**Explanation:** A standard Site-to-Site VPN connection to a Virtual Private Gateway (VGW) is limited to a maximum bandwidth of **1.25 Gbps** per tunnel. To go beyond this limit without switching to Direct Connect, you must use **AWS Transit Gateway**.

- **Equal Cost Multi-Path (ECMP):** Transit Gateway supports ECMP routing. By establishing multiple VPN tunnels between your on-premises customer gateway and the Transit Gateway, you can load balance traffic across these tunnels.
- **Scaling:** If you have four active tunnels and enable ECMP, your aggregate throughput can theoretically reach $4 \times 1.25\text{ Gbps} = 5\text{ Gbps}$.
- **Why Virtual Private Gateway (VGW) doesn't work:** A VGW does not support ECMP for VPN. Even if you create multiple tunnels to a VGW, it will typically operate in an active-passive configuration or simply won't aggregate the bandwidth in the same way.
- **Direct Connect Gateway:** While Direct Connect offers higher speeds (up to 100 Gbps), the question specifically asks how to scale an **AWS Site-to-Site VPN connection**.

## Question 19

Which AWS service allows you to protect and control traffic in your VPC from layer 3 to layer 7?

[ ] \*\*✅ AWS Network Firewall

[ ] Amazon GuardDuty

[ ] Amazon Inspector

[ ] Amazon Shield

**Correct Answer:** AWS Network Firewall\*\*

**Explanation:** **AWS Network Firewall** is a managed security service that makes it easy to deploy essential network protections for all of your VPCs.

- **OSI Layer Coverage:** Unlike standard Security Groups or NACLs (which primarily operate at Layer 3/4), AWS Network Firewall provides deep packet inspection (DPI) and can filter traffic from **Layer 3 (Network)** all the way up to **Layer 7 (Application)**.
- **Capabilities:** It allows you to create rules for:
  - **IP/Port filtering** (Layer 3/4).
  - **FQDN (Fully Qualified Domain Name) filtering** (e.g., blocking all traffic except to `*.example.com`).
  - **Suricata-compatible IPS/IDS rules** for signature-based threat detection (Layer 7).
- **Why the others are incorrect:**
  - **Amazon GuardDuty:** This is a threat _detection_ service that monitors logs (CloudTrail, VPC Flow Logs) for malicious activity; it does not "control" or block traffic itself.
  - **Amazon Inspector:** This is a vulnerability _scanning_ service that looks for security flaws in EC2 instances, ECR images, and Lambda functions.
  - **Amazon Shield:** This is a managed **DDoS protection** service. While it protects the network, it is not used for granular Layer 3-7 traffic control and rule-based filtering in the same way a firewall is.

## Question 20

Using a Direct Connect connection, you can access both public and private AWS resources.

[ ] \*\*✅ True

[ ] False

**Correct Answer:** True\*\*

**Explanation:** AWS Direct Connect allows you to create different types of **Virtual Interfaces (VIFs)** to access different types of resources over the same physical connection:

- **Private VIF:** Used to access resources within your VPC using their **private IP addresses** (e.g., EC2 instances, RDS databases).
- **Public VIF:** Used to access AWS services that have **public endpoints** (e.g., Amazon S3, DynamoDB, Amazon SQS) without needing to traverse the public internet. This ensures that even traffic to public services stays on the dedicated, private Direct Connect path.
- **Transit VIF:** Used to connect to an AWS Transit Gateway, which can then connect multiple VPCs.

By setting up both a Private VIF and a Public VIF on your Direct Connect connection, you can manage your entire AWS infrastructure privately.

## Question 21

A web application hosted on a fleet of EC2 instances managed by an Auto Scaling Group. You are exposing this application through an Application Load Balancer. Both the EC2 instances and the ALB are deployed on a VPC with the following CIDR 192.168.0.0/18. How do you configure the EC2 instances' security group to ensure only the ALB can access them on port 80?

[ ] Add an Inbound Rule with port 80 and 0.0.0.0/0 as the source

[ ] Add an Inbound Rule with port 80 and 192.168.0.0/18 as the source

[ ] Add an Inbound Rule with port 80 and ALB's Security Group as the source

[ ] Load an SSL certificate on the ALB

**Correct Answer:** Add an Inbound Rule with port 80 and ALB's Security Group as the source\*\*

**Explanation:** This is a fundamental security best practice in AWS known as **Security Group Referencing** (or chaining).

- **Security Group Referencing:** Instead of using an IP address or a CIDR range as the source, you can specify the **ID of another Security Group** (e.g., `sg-12345678`). This tells AWS: "Allow traffic only if it comes from a resource associated with this specific Security Group."
- **Why this is the most secure:**
  - Using **0.0.0.0/0** would open the backend instances to the entire internet, defeating the purpose of the load balancer.
  - Using the **VPC CIDR (192.168.0.0/18)** would allow _any_ resource inside your VPC to talk to your backend instances, which is too broad (e.g., a test instance or a database could connect to your web server).
  - By referencing the **ALB's Security Group**, you ensure that even if the ALB's IP addresses change (which happens frequently as the ALB scales), the security rule remains valid and restrictive only to the load balancer.
- **SSL Certificates:** While important for encryption (HTTPS), loading an SSL certificate on the ALB does not control network access or "source" permissions to the backend instances.

## Question 22

How can you capture information about IP traffic inside your VPCs?

[ ] Enable VPC Flow Logs

[ ] Enable VPC Traffic Mirroring

[ ] Enable CloudWatch Traffic Logs

**Correct Answer:** Enable VPC Flow Logs\*\*

**Explanation:** **VPC Flow Logs** is the standard AWS feature used to capture information about the IP traffic going to and from network interfaces in your VPC.

- **What it captures:** It records metadata about network flows, such as source and destination IP addresses, ports, protocol, packet count, byte count, and whether the traffic was **Accepted** or **Rejected** by Security Groups or Network ACLs.
- **Where data is sent:** You can publish flow log data to **Amazon CloudWatch Logs**, **Amazon S3**, or **Amazon Kinesis Data Firehose**.
- **Use Cases:** It is essential for troubleshooting connectivity issues (e.g., "Why is my instance not reaching the database?"), monitoring for security anomalies, and ensuring network access rules are working as intended.

**Why the others are different:**

- **VPC Traffic Mirroring:** This is a more advanced feature used to copy _actual_ network traffic (the full payload) from an ENI and send it to security or monitoring appliances for deep packet inspection. It is far more "heavyweight" than Flow Logs, which only capture metadata.
- **CloudWatch Traffic Logs:** This is not a standard AWS service name. While Flow Logs can be sent _to_ CloudWatch, the feature itself is called VPC Flow Logs.

## Question 23

You have attached an Internet Gateway to your VPC, but your EC2 instances still don't have access to the internet. What is **NOT** a possible issue?

[ ] Route Tables are missing entries

[ ] The EC2 instances don't have public IPs

[ ] \*\*✅ The Security Group does not allow traffic in

[ ] The NACL does not allow network traffic out

**Correct Answer:** The Security Group does not allow traffic in\*\*

**Explanation:** To understand why "traffic in" is not the issue, we have to look at how EC2 instances initiate requests to the internet.

- **Egress vs. Ingress:** When an EC2 instance tries to "access the internet" (e.g., to download a software update), it is initiating an **outbound** request.
- **Stateful Security Groups:** Security Groups are **stateful**. This means if an outbound request is allowed, the response traffic (the "inbound" part of that specific conversation) is **automatically allowed** back in, regardless of what the inbound rules say. Therefore, you do not need an inbound rule to allow the internet to _respond_ to your instance.

**Why the others ARE possible issues:**

- **Route Tables:** Even with an Internet Gateway (IGW) attached, you must manually add a route (typically `0.0.0.0/0`) pointing to that IGW in the subnet's route table. Without this "map," the instance doesn't know how to find the gateway.
- **Public IPs:** An IGW performs 1-to-1 NAT for instances. If an instance only has a private IP, it has no valid "return address" on the public internet, so communication will fail.
- **NACLs (Network Access Control Lists):** Unlike Security Groups, NACLs are **stateless**. If you allow outbound traffic but forget to allow the return traffic on the ephemeral ports in the inbound rules, the connection will be dropped.

## Question 24

You have a set of Linux EC2 instances deployed in a Cluster Placement Group in order to perform High-Performance Computing (HPC). You would like to maximize network performance between your EC2 instances. What should you use?

[ ] Elastic Fabric Adapter (EFA)

[ ] Elastic Network Interface (ENI)

[ ] Elastic Network Adapter (ENA)

[ ] FSx for Lustre

**Correct Answer:** Elastic Fabric Adapter (EFA)\*\*

**Explanation:** For High-Performance Computing (HPC) and Machine Learning workloads, **Elastic Fabric Adapter (EFA)** is the specialized network interface you need to maximize performance.

- **OS-Bypass:** The defining feature of EFA is "OS-bypass." This allows the application to communicate directly with the network interface hardware, bypassing the operating system kernel. This significantly reduces latency and jitter.
- **HPC Optimization:** It is specifically designed to enhance inter-node communications, which is critical for applications using Message Passing Interface (MPI) or NVIDIA Collective Communications Library (NCCL).
- **Scale:** While a standard ENA is great for general networking, EFA provides the ultra-low latency required when thousands of CPU or GPU cores need to work together as a single cluster.

**Why the others are incorrect:**

- **Elastic Network Interface (ENI):** This is the basic virtual network card for an EC2 instance. It does not provide specialized performance enhancements.
- **Elastic Network Adapter (ENA):** This provides high throughput (up to 100 Gbps) and enhanced networking for most standard workloads, but it lacks the OS-bypass capability required for true HPC optimization.
- **FSx for Lustre:** While this is a high-performance file system often used _with_ HPC, it is a storage service, not a network interface used for communication between instances.

---

### Comparison of EC2 Networking

| Feature         | Elastic Network Adapter (ENA)        | Elastic Fabric Adapter (EFA)         |
| :-------------- | :----------------------------------- | :----------------------------------- |
| **Primary Use** | General purpose, high-bandwidth apps | **HPC, Machine Learning, MPI**       |
| **Latency**     | Low                                  | **Ultra-low (via OS-bypass)**        |
| **Max Speed**   | 100 Gbps+                            | 100 Gbps+                            |
| **Protocol**    | Standard TCP/UDP                     | **Scalable Reliable Datagram (SRD)** |

## Question 25

**Question:**
Any person or application that interacts with AWS requires security credentials. AWS uses these credentials to identify who is making the call and whether to allow the requested access. You have just set up a VPC network for a client and you are now thinking about the best way to secure this network. You set up a security group called vpcsecuritygroup. Which following statement is true in respect to the initial settings that will be applied to this security group if you choose to use the default settings for this group?

[ ] Allow all inbound traffic and allow no outbound traffic.

[ ] Allow no inbound traffic and allow all outbound traffic.

[ ] Allow inbound traffic on port 80 only and allow all outbound traffic.

[ ] Allow all inbound traffic and allow all outbound traffic.
<br>
<br>

**Correct Answer:** Allow no inbound traffic and allow all outbound traffic.

---

### Why this is the correct answer:

This question tests fundamental AWS VPC Security Group rules and default state behaviors:

1. **Default Inbound Policy (Deny All):** When you create a custom security group in Amazon VPC, it starts with **no inbound rules**. By default, all incoming traffic from outside the security group is blocked/denied.
2. **Default Outbound Policy (Allow All):** Custom security groups automatically include an outbound rule that **allows all egress traffic** (IPv4: `0.0.0.0/0`) on all protocols and ports unless manually modified.
3. **Stateful Behavior:** Security groups are stateful. Even though all inbound traffic is blocked by default, if an outbound request is initiated from an instance, the return/response traffic is automatically allowed regardless of inbound rules.

---

### Comparison of Default Security Group vs Custom Security Group Rules:

| Type                           | Default Inbound Rules                                  | Default Outbound Rules         |
| :----------------------------- | :----------------------------------------------------- | :----------------------------- |
| **New Custom Security Group**  | ❌ **Block All** (No rules)                            | ✅ **Allow All** (`0.0.0.0/0`) |
| **Default VPC Security Group** | ✅ **Allow All Inbound from itself** (Same SG members) | ✅ **Allow All** (`0.0.0.0/0`) |

---

### Why others are incorrect:

- **Allow all inbound traffic and allow no outbound traffic:** Completely opposite of security group mechanics. Allowing all inbound traffic by default would create an immediate security vulnerability.
- **Allow inbound traffic on port 80 only and allow all outbound traffic:** Port 80 (HTTP) is not open by default. Inbound rules must be explicitly added to open specific ports (e.g., HTTP on 80, HTTPS on 443, SSH on 22).
- **Allow all inbound traffic and allow all outbound traffic:** This describes an open Network Access Control List (NACL) default for a custom VPC or default security group self-referential ingress rules, not the default ruleset of a newly created custom security group.

## Question 26

**Question:**
I am designing Internet connectivity for your VPC. The Web servers must be available on the Internet. The application must have a highly available architecture. Which alternatives should you consider? (Choose 2 answers)

[ ] Configure a NAT instance in your VPC Create a default route via the NAT instance and associate it with all subnets Configure a DNS A record that points to the NAT instance public IP address.

[ ] Configure a CloudFront distribution and configure the origin to point to the private IP addresses of your Web servers Configure a Route 53 CNAME record to your CloudFront distribution.

[ ] Place all your web servers behind ELB Configure a Route 53 CNAME to point to the ELB DNS name.

[ ] Assign EIPs to all web servers. Configure a Route 53 record set with all EIPs. With health checks and DNS failover.

[ ] Configure ELB with an EIP Place all your Web servers behind ELB Configure a Route 53 A record that points to the EIP.
<br>
<br>

**Correct Answer:** Configure a CloudFront distribution and configure the origin to point to the private IP addresses of your Web servers Configure a Route 53 CNAME record to your CloudFront distribution. **AND** Place all your web servers behind ELB Configure a Route 53 CNAME to point to the ELB DNS name.

---

### Why these are the correct answers:

This question tests public internet entry-point design and high-availability architecture patterns for web workloads in Amazon VPC:

1. **Elastic Load Balancing (ELB) Architecture:** Placing web servers in multiple subnets/AZs behind an Elastic Load Balancer provides automatic traffic distribution and high availability. Since ELBs do not have static IP addresses, traffic is routed to them by configuring a Route 53 CNAME (or Alias record) pointing to the ELB’s DNS name.
2. **Amazon CloudFront CDN Fronting:** CloudFront acts as a global Content Delivery Network (CDN) edge entry point. It can securely forward requests to web servers running in private subnets, keeping the origin instances shielded while distributing incoming global traffic highly effectively. Route 53 CNAME records easily point domain traffic to the CloudFront distribution domain.

---

### Comparison of Public Entry-Point Options:

| Architecture Alternative                                         | High Availability          | Security / VPC Best Practice                                                 | Verdict     |
| :--------------------------------------------------------------- | :------------------------- | :--------------------------------------------------------------------------- | :---------- |
| **Route 53 $\rightarrow$ CloudFront $\rightarrow$ Private EC2s** | ✅ **Native HA**           | Origins stay private; global edge caching and DDoS protection.               | **Correct** |
| **Route 53 $\rightarrow$ ELB $\rightarrow$ EC2 Auto Scaling**    | ✅ **Native HA**           | Load balancer distributes across AZs; handles instance failures.             | **Correct** |
| **Direct EIPs on Web Servers**                                   | ❌ Poor HA                 | Exposes all web servers directly to internet; manual DNS failover.           | Incorrect   |
| **Routing Inbound via NAT Instance**                             | ❌ Single Point of Failure | NAT instances are for _outbound_ egress traffic, not inbound load balancing. | Incorrect   |

---

### Why others are incorrect:

- **Configure a NAT instance in your VPC...:** NAT instances (and NAT Gateways) are designed exclusively for **outbound** internet egress for private subnet instances. They do not act as inbound load balancers or high-availability entry points.
- **Assign EIPs to all web servers...:** Assigning static public Elastic IPs directly to every web server increases attack surface and relies on DNS-level failover rather than dynamic, active load balancing.
- **Configure ELB with an EIP...:** AWS Elastic Load Balancers (ALB/CLB) do not support assigning a single static Elastic IP address directly to the load balancer (unlike Network Load Balancers which use static IPs per AZ). Furthermore, DNS routing to standard ELBs should always use DNS names (CNAME or Alias A-records).

## Question 27

**Question:**
You have deployed a web application targeting a global audience across multiple AWS Regions under the domain name example.com. You decide to use Route 53 Latency-Based Routing to serve web requests to users from the region closest to the user. To provide business continuity in the event of server downtime you configure weighted record sets associated with two web servers in separate Availability Zones per region. During a DR test you notice that when you disable all web servers in one of the regions Route 53 does not automatically direct all users to the other region. What could be happening? (Choose 2 answers)

[ ] Latency resource record sets cannot be used in combination with weighted resource record sets.

[ ] You did not setup an HTTP health check for one or more of the weighted resource record sets associated with the disabled web servers.

[ ] The value of the weight associated with the latency alias resource record set in the region with the disabled servers is higher than the weight for the other region.

[ ] One of the two working web servers in the other region did not pass its HTTP health check.

[ ] You did not set 'Evaluate Target Health' to 'Yes' on the latency alias resource record set associated with example.com in the region where you disabled the servers.
<br>
<br>

**Correct Answer:** You did not setup an HTTP health check for one or more of the weighted resource record sets associated with the disabled web servers. **AND** You did not set 'Evaluate Target Health' to 'Yes' on the latency alias resource record set associated with example.com in the region where you disabled the servers.

---

### Why these are the correct answers:

This question tests multi-region DNS failover architecture, complex Route 53 record set nesting, and health check evaluation mechanics:

1. **Missing Health Checks on Child Records:** Route 53 needs explicit health checks attached to the individual weighted records (the web servers) to detect that they are down. If no health check is associated, Route 53 assumes the weighted targets are healthy and continues serving DNS responses for that region.
2. **Evaluate Target Health Setting:** When combining Latency Routing (top-level) with Weighted Routing (child-level) via Alias records, the top-level Latency Alias record must have **Evaluate Target Health** set to **Yes**. Without this setting enabled, Route 53 ignores the health status of the underlying weighted targets and routes latency-matched traffic to the region even if all web servers inside it are unhealthy.

---

### Route 53 Nested Failover Dependency Matrix:

| Component Level                    | Required Configuration                            | Behavior if Misconfigured                                                       |
| :--------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------ |
| **Child Records (Weighted)**       | Must have active Route 53 Health Checks attached. | Route 53 cannot detect server failure in the local AZ/region.                   |
| **Parent Alias Records (Latency)** | Must have **Evaluate Target Health = Yes**.       | Route 53 will not trigger cross-region failover even if all child targets fail. |

---

### Why others are incorrect:

- **Latency resource record sets cannot be used in combination with weighted resource record sets:** AWS explicitly supports nesting routing policies (such as Latency-based alias records pointing to Weighted record sets) to build multi-tier global failover architectures.
- **The value of the weight associated with the latency alias resource record set...:** Latency-based records evaluate user proximity/latency measurements across regions—weights are applied within a weighted record group, not used to override latency-based parent routing.
- **One of the two working web servers in the other region did not pass its HTTP health check:** As long as at least one server in the healthy secondary region passes its health check, Route 53 considers that target region available and routes failover traffic to it.

## Question 28

**Question:**
You've been hired to enhance the overall security posture for a very large e-commerce site. They have a well architected multi-tier application running in a VPC that uses ELBs in front of both the web and the app tier with static assets served directly from S3. They are using a combination of RDS and DynamoDB for their dynamic data and then archiving nightly into S3 for further processing with EMR. They are concerned because they found questionable log entries and suspect someone is attempting to gain unauthorized access. Which approach provides a cost effective scalable mitigation to this kind of attack?

[ ] Recommend that they lease space at a DirectConnect partner location and establish a 1G DirectConnect connection to their VPC. They would then establish Internet connectivity into their space, filter the traffic in hardware Web Application Firewall (WAF), and then pass the traffic through the DirectConnect connection into their application running in their VPC.

[ ] Add previously identified hostile source IPs as an explicit INBOUND DENY NACL to the web tier sub net.

[ ] Add a WAF tier by creating a new ELB and an AutoScaling group of EC2 Instances running a host based WAF. They would redirect Route 53 to resolve to the new WAF tier ELB. The WAF tier would then pass the traffic to the current web tier. The web tier Security Groups would be updated to only allow traffic from the WAF tier Security Group.

[ ] Remove all but TLS 1.2 from the web tier ELB and enable Advanced Protocol Filtering. This will enable the ELB itself to perform WAF functionality.
<br>
<br>

**Correct Answer:** Add a WAF tier by creating a new ELB and an AutoScaling group of EC2 Instances running a host based WAF. They would redirect Route 53 to resolve to the new WAF tier ELB. The WAF tier would then pass the traffic to the current web tier. The web tier Security Groups would be updated to only allow traffic from the WAF tier Security Group.

---

### Why this is the correct answer:

This question tests cost-effective, scalable Web Application Firewall (WAF) design in classic AWS architectures before AWS WAF became a native, fully managed service:

1. **Scalable Application-Layer Protection:** Suspicious log entries attempting unauthorized access (such as SQL injection, cross-site scripting, or application-layer exploits) require deep packet/HTTP payload inspection. Introducing an Auto Scaling tier of EC2 instances running host-based software WAFs (e.g., ModSecurity, nginx-WAF) allows the security layer to scale dynamically alongside application traffic.
2. **Layered VPC Security:** Placing an Auto Scaling WAF proxy tier behind an ELB and chaining security groups ensures that the web tier only accepts traffic originating from the WAF tier security group, securing the application while keeping infrastructure scalable within AWS.

---

### Security Mitigation Strategy Comparison:

| Approach                                 | Inspection Level          | Scalability & Cost                                         | Suitability                                                |
| :--------------------------------------- | :------------------------ | :--------------------------------------------------------- | :--------------------------------------------------------- |
| **Auto Scaling Host-Based WAF Tier**     | **Layer 7 (Application)** | ✅ High (Scales with Auto Scaling; pay-as-you-go)          | **Correct** (Cost-effective, native in-cloud WAF pattern). |
| **Network ACL IP Blocking**              | **Layer 3/4 (Network)**   | ❌ Low (Manual IP lists hit NACL rule limits)              | Reactive, easily bypassed by dynamic IPs.                  |
| **On-Prem / DirectConnect Hardware WAF** | **Layer 7**               | ❌ Extremely Low (High capital expense & colocation costs) | Inefficient, introduces latency and complex routing.       |
| **ELB SSL/TLS Tuning**                   | **Layer 4 (Transport)**   | ✅ High                                                    | Does not filter application payload attacks.               |

---

### Why others are incorrect:

- **Recommend that they lease space at a DirectConnect partner location...:** Backhauling all public internet traffic through an external colocation facility to pass through hardware firewalls over DirectConnect is excessively expensive, introduces physical single points of failure, and ruins cloud scalability.
- **Add previously identified hostile source IPs as an explicit INBOUND DENY NACL...:** Network Access Control Lists (NACLs) operate strictly at Layers 3/4 (IP and port). Blocking specific IPs manually is a reactive "cat-and-mouse" approach that easily hits NACL entry quotas (typically 20–40 rules) and cannot protect against complex application-layer (Layer 7) attacks from changing IP addresses.
- **Remove all but TLS 1.2 from the web tier ELB and enable Advanced Protocol Filtering...:** Updating TLS security policies only enforces encryption protocols. ELBs do not natively possess a feature named "Advanced Protocol Filtering" to inspect and mitigate Layer 7 application attacks.

## Question 29

**Question:**
You are designing the network infrastructure for an application server in Amazon VPC. Users will access all the application instances from the Internet as well as from an on-premises network. The on-premises network is connected to your VPC over an AWS Direct Connect link. How would you design routing to meet the above requirements?

[ ] Configure a single routing Table with a default route via the Internet gateway. Propagate a default route via BGP on the AWS Direct Connect customer router. Associate the routing table with all VPC subnets.

[ ] Configure a single routing table with a default route via the internet gateway. Propagate specific routes for the on-premises networks via BGP on the AWS Direct Connect customer router. Associate the routing table with all VPC subnets.

[ ] Configure a single routing table with two default routes: one to the internet via an Internet gateway, the other to the on-premises network via the VPN gateway. Use this routing table across all subnets in your VPC.

[ ] Configure two routing tables: one that has a default route via the Internet gateway and another that has a default route via the VPN gateway. Associate both routing tables with each VPC subnet.
<br>
<br>

**Correct Answer:** Configure a single routing table with a default route via the internet gateway. Propagate specific routes for the on-premises networks via BGP on the AWS Direct Connect customer router. Associate the routing table with all VPC subnets.

---

### Why this is the correct answer:

This question tests hybrid VPC routing principles using AWS Direct Connect and Internet Gateways:

1. **Internet Traffic Routing:** A default route (`0.0.0.0/0`) pointing to an Internet Gateway (IGW) ensures that public internet traffic reaches the application servers directly.
2. **On-Premises Traffic Routing:** BGP Route Propagation dynamically advertises the specific internal IP CIDR ranges of the on-premises network (e.g., `10.0.0.0/8` or `172.16.0.0/12`) to the VPC route table via the Virtual Private Gateway (VGW) attached to Direct Connect.
3. **Longest Prefix Match Rule:** Because specific on-premises routes (e.g., `10.1.0.0/16`) are more specific than the default route (`0.0.0.0/0`), VPC routers always prioritize sending corporate traffic over Direct Connect while sending all other public internet traffic through the IGW.

---

### VPC Routing Table Configuration Summary:

| Destination CIDR                          | Target / Gateway                       | Traffic Path                             |
| :---------------------------------------- | :------------------------------------- | :--------------------------------------- |
| **`10.0.0.0/16`** (Example VPC CIDR)      | `local`                                | Internal VPC communications              |
| **`192.168.1.0/24`** (Propagated via BGP) | `vgw-xxxxxx` (Virtual Private Gateway) | Corporate On-Premises via Direct Connect |
| **`0.0.0.0/0`** (Default Route)           | `igw-xxxxxx` (Internet Gateway)        | Public Internet Inbound & Outbound       |

---

### Why others are incorrect:

- **Configure a single routing Table... Propagate a default route via BGP...:** Propagating `0.0.0.0/0` via BGP creates conflicting default routes in the route table, potentially causing asymmetric routing or forcing all internet traffic back through the on-premises network rather than out the IGW.
- **Configure a single routing table with two default routes...:** VPC route tables do not allow entering duplicate identical destination prefixes (`0.0.0.0/0`) pointing to two different gateway targets.
- **Configure two routing tables... Associate both routing tables with each VPC subnet:** A subnet in an Amazon VPC can only be associated with **one** route table at a time.

## Question 30

**Question:**
You have multiple VPN connections and want to provide secure communication between sites using the AWS VPN CloudHub. Which statement is the most accurate in describing what you must do to set this up correctly?

[ ] Create a virtual private gateway with multiple customer gateways, each with unique Border Gateway Protocol (BGP) Autonomous System Numbers (ASNs).

[ ] Create a virtual private gateway with multiple customer gateways, each with a unique set of keys.

[ ] Create a virtual public gateway with multiple customer gateways, each with a unique Private subnet.

[ ] Create a virtual private gateway with multiple customer gateways, each with unique subnet id.
<br>
<br>

**Correct Answer:** Create a virtual private gateway with multiple customer gateways, each with unique Border Gateway Protocol (BGP) Autonomous System Numbers (ASNs).

---

### Why this is the correct answer:

This question tests AWS VPN CloudHub architecture and requirement dependencies:

1. **Hub-and-Spoke VPN Architecture:** AWS VPN CloudHub operates on a hub-and-spoke model that enables secure inter-site communication between remote offices/sites through an AWS Virtual Private Gateway (VGW).
2. **Dynamic Routing Requirement:** AWS VPN CloudHub relies on **dynamic BGP peering** to route traffic between sites. Each customer gateway (spoke site) must be configured with a unique BGP Autonomous System Number (ASN) so that BGP routes can be properly advertised, distinguished, and propagated across the hubs.

---

### AWS VPN CloudHub Key Requirements:

| Requirement              | Details                                                                                         |
| :----------------------- | :---------------------------------------------------------------------------------------------- |
| **AWS Target Component** | Single Virtual Private Gateway (VGW) attached to a VPC.                                         |
| **Routing Protocol**     | Dynamic Routing via **BGP (Border Gateway Protocol)**.                                          |
| **BGP ASN Rules**        | Each site/Customer Gateway must use a **unique ASN** (or unique public/private ASN allocation). |
| **IP Addressing**        | Non-overlapping IP ranges across all connected remote sites.                                    |

---

### Why others are incorrect:

- **Create a virtual private gateway... each with a unique set of keys:** While pre-shared keys are used for IPSec authentication, possessing unique keys does not satisfy the essential architectural requirement of dynamic BGP ASN assignment needed for CloudHub routing.
- **Create a virtual public gateway...:** AWS has no service or component named a "Virtual Public Gateway." AWS site-to-site VPNs terminate on a Virtual Private Gateway (VGW) or Transit Gateway (TGW).
- **Create a virtual private gateway... each with unique subnet id:** Subnet IDs are VPC-level construct resources within AWS. Remote customer sites use internal corporate IP CIDR ranges, not AWS Subnet IDs.
