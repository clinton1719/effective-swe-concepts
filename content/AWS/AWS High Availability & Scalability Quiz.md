---
title: AWS AWS High Availability & Scalability Quiz
tags: [aws, aws-alb]
difficulty: medium
date: 2026-04-26
---

## Question 1

You have an Application Load Balancer that is configured to redirect traffic to 3 Target Groups based on the following hostnames: users.example.com, api.external.example.com, and checkout.example.com. You would like to configure HTTPS for each of these hostnames. How do you configure the ALB to make this work?

[ ] Use an HTTP to HTTPS redirect rule

[ ] Use a security group SSL certificate

[ ] Use Server Name Indication (SNI)

**Correct Answer:** Use Server Name Indication (SNI)

### Explanation
Server Name Indication (SNI) is an extension of the TLS protocol that allows a client to indicate which hostname it is attempting to connect to at the start of the handshaking process. This is critical for Application Load Balancers (ALB) when hosting multiple secure domains on a single listener.

*   **Smart Certificate Selection:** When multiple SSL certificates are attached to an ALB HTTPS listener, the ALB uses SNI to present the correct certificate to the client based on the hostname provided in the TLS handshake.
*   **Multiple Certificates:** You can associate up to 25 certificates (in addition to the default certificate) with a single ALB listener.
*   **Host-Based Routing Integration:** While host-based routing (Host headers) directs traffic to target groups *after* the request is decrypted, SNI is required to select the correct certificate *before* the decryption happens.
*   **Legacy Support:** If a client does not support SNI, the ALB falls back to the "Default Certificate" configured on the listener.

### Comparison: SNI vs. Other Options
| Feature | Server Name Indication (SNI) | Wildcard Certificate | SAN Certificate |
| :--- | :--- | :--- | :--- |
| **Setup** | Attach multiple separate certs | One cert for `*.domain.com` | One cert with multiple FQDNs |
| **Scalability** | High; add certs as needed | High for subdomains | Low; must re-issue for new domains |
| **Security** | High (Isolation) | Lower (One key for all) | Moderate |
| **Cost** | Included with ALB/ACM | Included with ALB/ACM | Included with ALB/ACM |

### Note
> To implement this, you would go to the ALB HTTPS Listener, select "View/edit certificates," and add the specific certificates for `users.example.com`, `api.external.example.com`, and `checkout.example.com`. The ALB handles the mapping logic automatically.


## Question 2

Registered targets in a Target Group for an Application Load Balancer can be one of the following, EXCEPT:

[ ] EC2 Instances

[ ] Network Load Balancer

[ ] Private IP Addresses

[ ] Lambda Functions

**Correct Answer:** Network Load Balancer

### Explanation
An Application Load Balancer (ALB) operates at Layer 7 (Application Layer) and supports specific target types for routing requests. The supported target types are:

*   **Instance:** Targets are specified by Instance ID. The load balancer routes traffic to the primary private IP address of the instance on the specified port.
*   **IP:** Targets are specified by IP address (Private IPv4 or IPv6). This allows for routing to targets in the same VPC, peered VPCs, or even on-premises via AWS Direct Connect or VPN.
*   **Lambda:** Allows you to serve HTTP(S) requests using serverless functions. The ALB handles the conversion between HTTP and the Lambda JSON event format.
*   **Application Load Balancer (ALB):** An ALB can be a target of a **Network Load Balancer (NLB)**, but an NLB cannot be a registered target within an ALB's target group.

### Comparison: ALB vs. NLB Target Types
| Target Type | Supported by ALB | Supported by NLB |
| :--- | :---: | :---: |
| **EC2 Instance** | Yes | Yes |
| **IP Address** | Yes | Yes |
| **Lambda Function** | Yes | No |
| **Application Load Balancer** | No | Yes |

### Note
> The architecture of "NLB-to-ALB" is a common pattern used when you need a Static IP (provided by the NLB) for an application that requires the complex Layer 7 routing features of an ALB. In this scenario, the ALB is registered as a target of the NLB using the `alb` target type.



## Question 3

Application Load Balancers support the following protocols, EXCEPT:

[ ] HTTP

[ ] HTTPS

[ ] TCP

[ ] WebSocket

**Correct Answer:** TCP

### Explanation
The Application Load Balancer (ALB) is specifically designed as a **Layer 7 (Application Layer)** load balancer within the OSI model. Its primary function is to inspect traffic at the application level to make advanced routing decisions.

*   **HTTP/HTTPS Support:** ALB is optimized for web traffic, supporting both HTTP/1.1 and **HTTP/2**. It handles SSL/TLS termination, offloading encryption tasks from backend servers.
*   **WebSocket Support:** ALB natively supports the WebSocket protocol, allowing for long-running, bidirectional communication channels between clients and servers.
*   **gRPC Support:** Modern ALBs also support gRPC, which uses HTTP/2 as a transport protocol.
*   **Layer 7 Routing:** Because it understands HTTP/HTTPS, it can route traffic based on Host headers, Path patterns, Query strings, and HTTP methods.
*   **TCP/UDP Constraint:** Pure Layer 4 protocols like **TCP** and **UDP** are not supported by the ALB. For workloads requiring raw socket connections or extreme performance at the transport layer, a **Network Load Balancer (NLB)** must be used instead.

### Comparison: Load Balancer Protocol Support
| Feature | Application (ALB) | Network (NLB) | Gateway (GWLB) |
| :--- | :--- | :--- | :--- |
| **OSI Layer** | Layer 7 | Layer 4 | Layer 3 |
| **Protocols** | HTTP, HTTPS, WebSocket, gRPC | TCP, UDP, TLS | IP (Raw Packets) |
| **Routing Basis** | URL, Path, Host, Headers | IP Protocol, Port | IP Header |
| **Static IP** | No (DNS Name only) | Yes (Elastic IP per AZ) | No |
| **Latency** | Milliseconds | Microseconds | Microseconds |

### Note
> If your application uses a non-HTTP protocol (e.g., SMTP, SSH, or a custom gaming protocol over TCP), the ALB will be unable to process the traffic. In such cases, the **Network Load Balancer** is the correct architectural choice as it passes the TCP/UDP traffic through to the targets without inspecting the application payload.


## Question 4

You have an ASG and a Network Load Balancer. The application on your ASG supports the HTTP protocol and is integrated with the Load Balancer health checks. You are currently using the TCP health checks. You would like to migrate to using HTTP health checks, what do you do?

[ ] Migrate to an Application Load Balancer

[ ] Migrate the health check to HTTP

**Correct Answer:** Migrate the health check to HTTP

### Explanation
A Network Load Balancer (NLB) operates at Layer 4 but is highly capable of performing Layer 7 health checks. You do not need to switch your entire load balancing infrastructure to an ALB just to verify application health via HTTP.

*   **NLB Health Check Capabilities:** NLB supports TCP, HTTP, and HTTPS health checks.
*   **Protocol Flexibility:** Even if the NLB is routing raw TCP traffic, it can initiate an HTTP "GET" request to a specific path (e.g., `/health`) to ensure the application layer is functioning, not just the socket layer.
*   **ASG Integration:** By configuring the NLB Target Group with an HTTP health check, the Auto Scaling Group (ASG) will automatically receive these health statuses. If the HTTP check fails (e.g., returns a 500 instead of 200), the ASG will mark the instance as unhealthy and replace it.
*   **Status Codes:** For HTTP/HTTPS health checks, the NLB considers a target healthy if it receives a response code in the **200-399** range.

### Comparison: TCP vs. HTTP Health Checks
| Feature | TCP Health Check | HTTP/HTTPS Health Check |
| :--- | :--- | :--- |
| **Layer** | Layer 4 (Transport) | Layer 7 (Application) |
| **Validation** | Successful 3-way handshake. | Successful HTTP response code. |
| **Precision** | Low (Process might be up, but app is hung). | High (Validates app logic and DB connectivity). |
| **NLB Support** | Supported | Supported |
| **ALB Support** | Not Supported | Supported |

### Note
> To perform this migration, you modify the **Target Group** settings associated with your NLB. Changing the health check protocol from TCP to HTTP allows you to specify a **Health Check Path** (e.g., `/index.html`) and an **HTTP Port**, providing much deeper insight into the actual availability of your service.

## Question 5

For compliance purposes, you would like to expose a fixed static IP address to your end-users so that they can write firewall rules that will be stable and approved by regulators. What type of Elastic Load Balancer would you choose?

[ ] Application Load Balancer with an Elastic IP attached to it

[ ] Network Load Balancer

[ ] Classic Load Balancer

**Correct Answer:** Network Load Balancer

### Explanation
The Network Load Balancer (NLB) is the only managed load balancing service in AWS that provides native support for static IP addresses.

*   **Static IP Assignment:** When you create an NLB, you can optionally assign one **Elastic IP (EIP)** per Availability Zone. This ensures the IP addresses remain constant for the life of the load balancer.
*   **DNS Stability:** While other load balancers (like ALB) only provide a DNS name whose underlying IPs change frequently, the NLB provides both a DNS name and fixed IPs.
*   **Whitelisting:** This feature is critical for "Internet-facing" applications where enterprise clients or regulators require specific IPs to be whitelisted in their corporate firewalls.
*   **Scale and Performance:** NLB is capable of handling millions of requests per second while maintaining ultra-low latency, as it operates at Layer 4 (Transport Layer).

### Load Balancer IP & Networking Comparison
| Feature | Network Load Balancer (NLB) | Application Load Balancer (ALB) |
| :--- | :--- | :--- |
| **IP Address Type** | **Static** (Elastic IP) | **Dynamic** (Managed by AWS) |
| **Connectivity** | Private & Public | Private & Public |
| **Zonal Behavior** | 1 Static IP per enabled AZ | Multiple dynamic IPs per AZ |
| **Client IP Preservation**| Native (Layer 4) | Via `X-Forwarded-For` headers |
| **Typical Use Case** | Fixed IP requirements, UDP/TCP traffic | Web apps, Path/Host routing |

### Note
> If you strictly require the Layer 7 features of an **ALB** (like path-based routing) but also need a **Static IP**, the recommended architecture is to place an **NLB in front of the ALB**. In this pattern, the NLB provides the static entry point and forwards traffic to the ALB, which handles the application-level logic.


## Question 6

You want to create a custom application-based cookie in your Application Load Balancer. Which of the following you can use as a cookie name?

[ ] AWSALBAPP

[ ] APPUSERC

[ ] AWSALBTG

[ ] AWSALB

**Correct Answer:** APPUSERC

### Explanation
When configuring Sticky Sessions (Session Affinity) on an Application Load Balancer (ALB), you can choose between **Duration-based cookies** (generated by the ALB) or **Application-based cookies** (generated by your target application).

*   **Reserved Keywords:** AWS reserves several specific names for its own internal session management. You **cannot** use the following names for your custom application cookies:
    *   `AWSALB`
    *   `AWSALBAPP`
    *   `AWSALBTG`
*   **Custom Cookie Characteristics:**
    *   The cookie is generated by the backend application, but the ALB adds its own metadata to it to ensure the client is consistently routed to the same target.
    *   You must specify the cookie name in the Target Group configuration.
    *   The application must set the cookie in the HTTP response.
*   **Use Case:** Application-based cookies are ideal when you need the session state to be controlled by the application logic rather than just a simple timeout duration.

### Sticky Session Cookie Types
| Feature | Duration-Based | Application-Based |
| :--- | :--- | :--- |
| **Generated By** | Load Balancer | Target Application |
| **Cookie Name** | `AWSALB` (fixed) | Custom (e.g., `APPUSERC`) |
| **Expiration** | Defined by Load Balancer | Defined by Application |
| **Flexibility** | Low | High (App logic driven) |
| **Reserved Names**| N/A | Cannot start with `AWSALB...` |

### Note
> If your application is intended to be used with a custom cookie, ensure that your application includes the cookie in its responses to the load balancer. If the ALB does not see the specified cookie name in the backend response, it cannot maintain the sticky session.



## Question 7

You are running a website on 10 EC2 instances fronted by an Elastic Load Balancer. Your users are complaining about the fact that the website always asks them to re-authenticate when they are moving between website pages. You are puzzled because it's working just fine on your machine and in the Dev environment with 1 EC2 instance. What could be the reason?

[ ] Your website must have an issue when hosted on multiple EC2 instances

[ ] The EC2 instances log out users as they can't see their IP addresses, instead, they receive ELB IP addresses.

[ ] The Elastic Load Balancer does not have Sticky Sessions enabled

**Correct Answer:** The Elastic Load Balancer does not have Sticky Sessions enabled

### Explanation
This scenario describes a classic **Session State** management issue in a distributed system. When you move from a single-instance environment (Dev) to a multi-instance environment (Production), the load balancer's default behavior causes the problem.

*   **Default Behavior:** By default, an Application Load Balancer (ALB) routes each request independently to the registered target with the smallest load (Round Robin or Least Outstanding Requests).
*   **The Problem:** If a user authenticates on **Instance A**, their session data (login state) is stored in the local memory of Instance A. When the user clicks the next page, the ALB may route that request to **Instance B**. Since Instance B has no record of the session, it redirects the user to the login page.
*   **Sticky Sessions (Session Affinity):** Enabling this feature at the **Target Group** level allows the ALB to bind a user's session to a specific instance using a cookie (`AWSALB` for duration-based). All subsequent requests from that user during the session are sent to the same instance.
*   **Dev vs. Prod:** In your Dev environment with only 1 instance, every request goes to that same instance by necessity, so the session is always found. This masks the lack of session affinity configuration.

### Comparison: Session Management Strategies
| Strategy | Implementation | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Sticky Sessions** | ALB Target Group Attribute | Easy to implement; no code changes. | Can cause unbalanced load; not fault-tolerant. |
| **Distributed Cache** | ElastiCache (Redis/Memcached) | High availability; scalable; instances stay stateless. | Requires code changes to store/retrieve sessions. |
| **Centralized DB** | DynamoDB | Persistent; highly durable. | Higher latency than ElastiCache. |
| **Client-side** | JWT / Encrypted Cookies | Truly stateless backend. | Security risks if not handled correctly (token size/theft). |

### Note
> While Sticky Sessions solve the immediate problem, the best practice for high-performance cloud applications is to make the application **Stateless**. This is achieved by offloading session data to a centralized store like **Amazon ElastiCache** or **DynamoDB**. This ensures that if an instance fails or is terminated by Auto Scaling, the user doesn't lose their session.


## Question 8

You have an application hosted on a set of EC2 instances managed by an Auto Scaling Group (ASG) where you configured both desired and maximum capacity to 3. You have also created a CloudWatch Alarm configured to scale out your ASG when CPU Utilization reaches 60%. Your application suddenly receives huge traffic and is now running at 80% CPU Utilization. What will happen?

[ ] Nothing

[ ] The desired capacity will go up to 4 and the maximum capacity will stay at 3

[ ] The desired capacity will go up to 4 and the maximum capacity will stay at 4

**Correct Answer:** Nothing

### Explanation
In an AWS Auto Scaling Group, the **Maximum Capacity** acts as a hard ceiling for the number of instances the group can maintain. 

*   **Capacity Constraints:** The ASG follows a hierarchy of constraints: `Minimum <= Desired <= Maximum`. 
*   **Scale-Out Logic:** Even if a CloudWatch Alarm triggers a scaling policy (e.g., Target Tracking or Step Scaling) because a threshold like 60% CPU has been breached, the ASG will refuse to launch new instances if the `Desired Capacity` is already equal to the `Maximum Capacity`.
*   **Alarm State:** The CloudWatch Alarm will remain in the `ALARM` state as long as the CPU is at 80%, but the ASG will log a "failed to scale" event because the limit has been reached.
*   **Resolution:** To allow the application to handle the load, an administrator must manually increase the **Maximum Capacity** value.

### ASG Capacity Attributes
| Attribute | Definition | Priority |
| :--- | :--- | :--- |
| **Minimum Size** | The absolute floor of instances. ASG will replace failed instances to maintain this. | High |
| **Desired Capacity** | The target number of instances. Scaling policies adjust this value. | Medium |
| **Maximum Size** | The absolute ceiling. Scaling policies cannot increase Desired beyond this. | **Highest (Hard Limit)** |

### Note
> This is a common "trick" scenario in the Solutions Architect exam. It highlights the importance of setting a Maximum Capacity that allows for peak traffic. If you want the ASG to scale to 4, you must set `MaxSize` to at least 4.


## Question 9

You have a Network Load Balancer that distributes traffic across a set of EC2 instances in us-east-1. You have 2 EC2 instances in us-east-1b AZ and 5 EC2 instances in us-east-1e AZ. You have noticed that the CPU utilization is higher in the EC2 instances in us-east-1b AZ. After more investigation, you noticed that the traffic is equally distributed across the two AZs. How would you solve this problem?

[ ] Enable Cross-Zone Load Balancing

[ ] Enable Sticky Sessions

[ ] Enable ELB Health Checks

[ ] Enable SSL Termination

**Correct Answer:** Enable Cross-Zone Load Balancing

### Explanation
By default, a **Network Load Balancer (NLB)** is configured with Cross-Zone Load Balancing disabled. This results in traffic being distributed equally across the enabled Availability Zones, regardless of the number of healthy instances within those zones.

*   **The Problem (Zonal Imbalance):** If 50% of traffic goes to `us-east-1b` (2 instances) and 50% goes to `us-east-1e` (5 instances), each instance in `1b` handles 25% of total traffic, while each instance in `1e` handles only 10%. This causes the observed higher CPU utilization in the zone with fewer instances.
*   **The Solution:** Enabling **Cross-Zone Load Balancing** allows the NLB to distribute traffic evenly across *all* registered instances in all enabled Availability Zones, regardless of their zonal location. Each instance would then handle ~14.2% of the total traffic ($1/7$).
*   **Cost Implications:** For NLBs, data transfer charges apply for cross-zone traffic (unlike the Application Load Balancer, where cross-zone is enabled by default and free).

### Comparison: Load Balancer Cross-Zone Behavior
| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) |
| :--- | :--- | :--- |
| **Default State** | Enabled | Disabled |
| **Cross-Zone Charges** | Free (Included) | Paid (Inter-AZ Data Transfer) |
| **Routing Granularity** | Instance-level by default | AZ-level by default |
| **Use Case** | Web applications/Microservices | Ultra-low latency / Static IPs |

### Note
> Cross-Zone Load Balancing is critical for maintaining high availability and even utilization when your Auto Scaling Group (ASG) cannot maintain a perfectly symmetrical number of instances across zones due to spot interruptions or zonal capacity issues.


## Question 10

An application is deployed with an Application Load Balancer and an Auto Scaling Group. Currently, you manually scale the ASG and you would like to define a Scaling Policy that will ensure the average number of connections to your EC2 instances is around 1000. Which Scaling Policy should you use?

[ ] Simple Scaling Policy

[ ] Step Scaling Policy

[ ] Target Tracking Policy

[ ] Scheduled Scaling Policy

**Correct Answer:** Target Tracking Policy

### Explanation
A **Target Tracking Policy** is the most efficient and recommended scaling policy for maintaining a specific metric at a target value.

*   **Self-Managing Logic:** You define a specific metric (e.g., `ALBRequestCountPerTarget`) and a target value (e.g., 1000). AWS Auto Scaling automatically creates and manages the CloudWatch alarms that trigger the scaling adjustments.
*   **Metric Support:** It works with standard metrics such as average CPU utilization, average network in/out, and—crucially for this scenario—the **Application Load Balancer request count per target**.
*   **Continuous Adjustment:** Unlike Simple or Step scaling, which require you to define specific thresholds and adjustment magnitudes (e.g., "Add 2 instances if CPU > 70%"), Target Tracking acts like a thermostat, adding or removing capacity to keep the metric as close to the target as possible.
*   **Scaling In:** It includes built-in scale-in logic, though it is generally more conservative with scale-in than scale-out to prevent rapid oscillation (flapping).

### ASG Scaling Policy Comparison
| Policy Type | Use Case | Configuration Complexity |
| :--- | :--- | :--- |
| **Target Tracking** | Maintaining a steady state (e.g., "Keep CPU at 50%"). | **Low** (Define metric + target). |
| **Simple Scaling** | Basic response to a single alarm (e.g., "Add 1 instance"). | **Moderate** (Must define cooldowns). |
| **Step Scaling** | Aggressive response based on the size of the breach. | **High** (Define multiple "steps"). |
| **Scheduled Scaling** | Known traffic patterns (e.g., "Scale up every Friday at 6 PM"). | **Low** (Cron-based). |
| **Predictive Scaling**| Long-term cyclical patterns using Machine Learning. | **Low** (Requires 24h+ data). |

### Note
> The `ALBRequestCountPerTarget` metric is particularly powerful because it measures the actual workload landing on each instance. If one instance is replaced or the number of targets changes, the policy automatically adjusts the total capacity to keep the average connection count stable.

## Question 11

You are using an Application Load Balancer to distribute traffic to your website hosted on EC2 instances. It turns out that your website only sees traffic coming from private IPv4 addresses which are in fact your Application Load Balancer's IP addresses. What should you do to get the IP address of clients connected to your website?

[ ] Modify your website's frontend so that users send their IP in every request

[ ] Modify your website's backend to get the client IP address from the X-Forwarded-For header

[ ] Modify your website's backend to get the client IP address from the X-Forwarded-Port header

[ ] Modify your website's backend to get the client IP address from the X-Forwarded-Proto header

**Correct Answer:** Modify your website's backend to get the client IP address from the X-Forwarded-For header

### Explanation
When an Application Load Balancer (ALB) intercepts traffic, it acts as a reverse proxy. The connection between the client and the ALB is terminated, and a new connection is established between the ALB and the backend EC2 instances. Consequently, the backend instances see the ALB's private IP address as the source.

*   **X-Forwarded-For (XFF):** This standard HTTP header is used to identify the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer. 
*   **ALB Behavior:** The ALB automatically appends the client's IP address to the `X-Forwarded-For` header before forwarding the request to the target group.
*   **Backend Configuration:** Modern web servers (Nginx, Apache, IIS) and application frameworks can be configured to parse this header to log the real client IP or use it for rate limiting and geolocation.
*   **Header Chain:** If the request passes through multiple proxies, the `X-Forwarded-For` header will contain a comma-separated list of IP addresses `[client, proxy1, proxy2]`.

### Comparison of Connection Metadata Headers
| Header | Purpose | Use Case |
| :--- | :--- | :--- |
| **X-Forwarded-For** | Identifies the **Source IP** of the client. | Logging, Geolocation, Security whitelisting. |
| **X-Forwarded-Proto**| Identifies the **Protocol** (HTTP or HTTPS). | Enforcing HTTPS redirects at the app level. |
| **X-Forwarded-Port** | Identifies the **Destination Port** used by client. | Mapping internal traffic to external listeners. |

### Note
> If your application requires the client's source IP address at the **Transport Layer (TCP)** without using HTTP headers, you should use a **Network Load Balancer (NLB)**. Unlike the ALB, the NLB can preserve the source IP address of the client natively when targets are specified by Instance ID.

## Question 12

Your boss asked you to scale your Auto Scaling Group based on the number of requests per minute your application makes to your database. What should you do?

[ ] Create a CloudWatch custom metric then create a CloudWatch Alarm on this metric to scale your ASG

[ ] You politely tell him it's impossible

[ ] Enable Detailed Monitoring then create a CloudWatch Alarm to scale your ASG


**Correct Answer:** Create a CloudWatch custom metric then create a CloudWatch Alarm on this metric to scale your ASG

### Explanation
AWS Auto Scaling Groups (ASG) can scale based on any metric that can be tracked in CloudWatch. While AWS provides standard metrics (CPU, Network, Disk I/O), application-specific logic—such as database request counts—requires **Custom Metrics**.

*   **Custom Metric Implementation:** Your application code must use the `PutMetricData` API to send the count of database requests per minute to CloudWatch.
*   **Resolution:** Custom metrics can be high-resolution (data at 1-second intervals) or standard-resolution (1-minute intervals). For scaling based on "requests per minute," standard resolution is sufficient.
*   **CloudWatch Alarm:** Once the metric exists, you create a CloudWatch Alarm that monitors the metric and enters the `ALARM` state when it crosses a defined threshold.
*   **Scaling Policy:** Link the Alarm to an ASG Step Scaling or Simple Scaling policy to increase or decrease the `Desired Capacity`.

### Metric Source Comparison
| Metric Type | Provided By | Use Case |
| :--- | :--- | :--- |
| **Standard Metrics** | AWS (Hypervisor) | CPU, Network In/Out, Status Checks. |
| **Detailed Monitoring** | AWS (Hypervisor) | 1-minute frequency for standard metrics (instead of 5-min). |
| **Custom Metrics** | Your Application/Agent | Memory Utilization (inside OS), DB connection counts, App Logic. |
| **Unified Agent** | CloudWatch Agent | OS-level metrics (RAM, Swap, Disk Space) without custom code. |

### Note
> "Detailed Monitoring" only increases the frequency of existing EC2 metrics; it does not "see" inside your application to count database calls. For database-centric scaling, custom metrics are the industry-standard approach.

## Question 13

Which feature in both Application Load Balancers and Network Load Balancers allows you to load multiple SSL certificates on one listener?

[ ] TLS Termination

[ ] Server Name Indication (SNI)

[ ] SSL Security Policies

[ ] Host Headers

**Correct Answer:** Server Name Indication (SNI)

### Explanation
Server Name Indication (SNI) is an extension of the TLS protocol that allows multiple domains to be served from a single IP address and port, each with its own SSL/TLS certificate.

*   **Mechanism:** During the TLS handshake, the client includes the hostname of the server it is attempting to connect to. The load balancer (ALB or NLB) uses this information to select and present the correct certificate from its certificate list.
*   **ALB vs. NLB Support:** 
    *   **ALB:** Uses SNI to support multiple domains on a single listener and can also use the hostname for host-based routing.
    *   **NLB:** Supports SNI for TLS listeners, allowing you to associate multiple certificates from AWS Certificate Manager (ACM) or IAM.
*   **Default Certificate:** Both load balancers require a default certificate. If a client does not support SNI or requests a hostname that doesn't match any associated certificate, the default certificate is presented.
*   **Limits:** You can typically associate up to 25 certificates per load balancer (plus the default certificate) using SNI.

### Comparison: SSL/TLS Management Features
| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) |
| :--- | :--- | :--- |
| **OSI Layer** | Layer 7 (Application) | Layer 4 (Transport) |
| **SNI Support** | Yes (HTTP/S listeners) | Yes (TLS listeners) |
| **TLS Termination** | Yes | Yes |
| **Security Policies** | Supports predefined SSL policies | Supports predefined TLS policies |
| **ALPN Support** | Yes (HTTP/2, gRPC) | Yes |

### Note
> SNI effectively solves the "one-to-one" limitation where an IP/Port combination could previously only support one certificate. This is essential for SaaS applications or multi-tenant environments where a single load balancer must handle traffic for `site-a.com`, `site-b.com`, and `site-c.com` simultaneously.

## Question 14

You are working as a Solutions Architect for a company and you are required to design an architecture for a high-performance, low-latency application that will receive millions of requests per second. Which type of Elastic Load Balancer should you choose?

[ ] Application Load Balancer

[ ] Classic Load Balancer

[ ] Network Load Balancer

**Correct Answer:** Network Load Balancer

### Explanation
The Network Load Balancer (NLB) is engineered specifically for ultra-high performance and low-latency workloads. It operates at Layer 4 (Transport Layer) of the OSI model, allowing it to handle volatile traffic patterns with millions of requests per second.

*   **Ultra-Low Latency:** NLB provides significantly lower latency (measured in microseconds) compared to the Application Load Balancer (measured in milliseconds), as it does not perform deep packet inspection.
*   **Static IP Addresses:** NLB provides one static IP address (Elastic IP) per Availability Zone, which simplifies firewall management and whitelisting.
*   **Scaling Characteristics:** Unlike the ALB, which scales through a "warming" process, the NLB is capable of handling sudden, massive spikes in traffic instantaneously.
*   **Protocol Support:** Natively handles TCP, UDP, and TLS traffic.
*   **Source IP Preservation:** When using instance-id targets, the NLB preserves the client's source IP address at the application level without needing `X-Forwarded-For` headers.

### Comparison: ELB Performance & Use Cases
| Feature | Network Load Balancer (NLB) | Application Load Balancer (ALB) |
| :--- | :--- | :--- |
| **OSI Layer** | Layer 4 | Layer 7 |
| **Performance** | Millions of requests per second | Best for varied application logic |
| **Latency** | Microseconds | Milliseconds |
| **Scaling** | Instantaneous | Gradual / Managed Warming |
| **Common Use Case** | Real-time gaming, FinTech, IoT | Web apps, Microservices, Containers |
| **Routing** | IP / Port based | Path, Host, Header, Query string |

### Note
> Use the NLB when performance is the absolute priority. If your application requires complex routing (e.g., URL path-based routing) or SSL termination with advanced header inspection, an ALB is typically the better choice, provided the millisecond latency is acceptable.

## Question 15

You have a website hosted in EC2 instances in an Auto Scaling Group fronted by an Application Load Balancer. Currently, the website is served over HTTP, and you have been tasked to configure it to use HTTPS. You have created a certificate in ACM and attached it to the Application Load Balancer. What you can do to force users to access the website using HTTPS instead of HTTP?

[ ] Send an email to all customers to use HTTPS instead of HTTP

[ ] Configure the Application Load Balancer to redirect HTTP to HTTPS

[ ] Configure the DNS record to redirect HTTP to HTTPS

**Correct Answer:** Configure the Application Load Balancer to redirect HTTP to HTTPS

### Explanation
To enforce secure communication, the Application Load Balancer (ALB) provides a native **Redirect Action** within its listener rules. This prevents users from accessing the site over unencrypted connections without requiring changes to the application code.

*   **Listener Rule Logic:** You configure the HTTP listener (typically port 80) with a rule that catches all incoming traffic and issues an **HTTP 301 (Permanent)** or **HTTP 302 (Found)** redirect to the HTTPS protocol (port 443).
*   **Protocol & Port:** The redirect rule specifies the destination protocol (HTTPS), port (443), and can preserve the original hostname, path, and query parameters.
*   **ACM Integration:** The HTTPS listener must be associated with the SSL/TLS certificate from **AWS Certificate Manager (ACM)** to handle the encrypted handshake.
*   **Infrastructure Efficiency:** Handling the redirect at the ALB layer offloads the processing from the backend EC2 instances, ensuring that only encrypted traffic reaches your application.

### Comparison: Traffic Redirection Methods
| Feature | ALB Redirect Rule | DNS-Level Redirection | App-Level Redirection |
| :--- | :--- | :--- | :--- |
| **Layer** | Layer 7 (Application) | Layer 3 (DNS) | Layer 7 (Application) |
| **Efficiency** | High (Offloaded to ELB) | N/A (Standard DNS cannot redirect protocols) | Low (Consumes EC2 resources) |
| **Implementation** | Listener Rules / Actions | Not supported by Route 53/Standard DNS | Middleware/Code logic |
| **Ease of Use** | Best Practice (Simple toggle) | Impossible | High maintenance |

### Note
> DNS records (like those in Route 53) are used for name resolution (mapping a domain to an IP or Alias), not for protocol-level redirection. While you could technically use a specialized service like S3 static website hosting for redirection, the ALB's native redirect feature is the architecturally correct and most performant solution for this scenario.

## Question 16

Application Load Balancers can route traffic to different Target Groups based on the following, EXCEPT:

[ ] Client's Location (Geography)

[ ] Hostname

[ ] Request URL Path

[ ] Source IP Address

**Correct Answer:** Client's Location (Geography)

### Explanation
The Application Load Balancer (ALB) operates at **Layer 7** and uses **Listener Rules** to route traffic based on the content of the HTTP/HTTPS request. While it has advanced routing capabilities, it does not natively support routing based on the geographic location of the client.

*   **Hostname (Host-based Routing):** ALB can route traffic based on the `Host` header in the HTTP request. This allows a single load balancer to serve multiple domains (e.g., `api.example.com` and `web.example.com`) and route them to different target groups.
*   **Request URL Path (Path-based Routing):** ALB can route based on the path pattern in the URL (e.g., `/images/*` goes to one target group, while `/orders/*` goes to another). This is fundamental for microservices architectures.
*   **Source IP Address:** You can define rules to route traffic based on the **CIDR block** of the source IP address. This is often used for internal whitelisting or blocking specific ranges.
*   **Other Supported Conditions:** HTTP headers (custom or standard), HTTP request methods (GET, POST, etc.), and Query strings.
*   **Geographic Routing Limitation:** Geography-based routing is a feature of **Amazon Route 53** (DNS layer), which directs users to different endpoints (like different ALBs in different regions) based on their physical location. The ALB itself only sees the traffic once it reaches the specified regional endpoint.

### ALB Listener Rule Conditions Comparison
| Condition Type | Description | Example |
| :--- | :--- | :--- |
| **Host Header** | Routes based on the domain name. | `*.example.com` |
| **Path Pattern** | Routes based on the URL suffix. | `/v1/api/*` |
| **Source IP** | Routes based on client IP/CIDR. | `192.168.1.0/24` |
| **Query String**| Routes based on key-value pairs in URL. | `?version=beta` |
| **HTTP Header** | Routes based on custom headers. | `User-Agent: Mobile` |

### Note
> If your requirement is to route users from Europe to a European server and users from the US to a US server, you must implement **Route 53 Geolocation Routing**. The ALB's "Source IP" condition can technically be used to manually map known IP ranges to target groups, but it is not a dynamic "Geography" feature and is impractical for global location-based routing.


## Question 17

Elastic Load Balancers provide a .......................

[ ] static IPv4 we can use in our application

[ ] static DNS name we can use in our application

[ ] static IPv6 we can use in our application

**Correct Answer:** static DNS name we can use in our application

### Explanation
By default, most Elastic Load Balancers (ALB and CLB) do not provide a fixed, static IP address. Instead, AWS provides a **DNS Name** (FQDN) that resolves to a set of dynamic IP addresses.

*   **Managed Scalability:** As traffic increases, AWS scales the Load Balancer infrastructure. This scaling often involves adding or removing nodes, which changes the underlying IP addresses. 
*   **DNS Resolution:** To ensure high availability, AWS updates the DNS record of the Load Balancer to point to the current, healthy set of IP addresses. Users should always point their CNAME or Alias records to the ELB DNS name rather than specific IPs.
*   **NLB Exception:** While this question focuses on the general behavior of ELBs, it is important to note that the **Network Load Balancer (NLB)** specifically allows for a static IPv4 (Elastic IP) per Availability Zone.
*   **Alias Records:** When using Route 53, it is recommended to use an **Alias record** to point your domain (e.g., `example.com`) to the ELB DNS name. Alias records are internal to AWS and resolve to the ELB's dynamic IPs without the overhead of an extra DNS lookup.

### Comparison: ELB Addressing by Type
| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) | Classic Load Balancer (CLB) |
| :--- | :--- | :--- | :--- |
| **Primary Identifier** | DNS Name | DNS Name | DNS Name |
| **IP Stability** | Dynamic (Changes with scaling) | **Static** (Elastic IP option) | Dynamic (Changes with scaling) |
| **Route 53 Target** | Alias / CNAME | Alias / CNAME | Alias / CNAME |
| **IP Versions** | IPv4 and Dual-stack (IPv6) | IPv4 and Dual-stack (IPv6) | IPv4 and Dual-stack (IPv6) |

### Note
> Hardcoding IP addresses of an ALB or CLB in your application or firewall is a common anti-pattern. If your infrastructure strictly requires a static IP for whitelisting or legacy compliance, you must use a **Network Load Balancer** or place an **AWS Global Accelerator** in front of your ALB.

## Question 18

You have an Auto Scaling Group fronted by an Application Load Balancer. You have configured the ASG to use ALB Health Checks, then one EC2 instance has just been reported unhealthy. What will happen to the EC2 instance?

[ ] The ASG will keep the instance running and re-start the application

[ ] The ASG will detach the EC2 instance and leave it running

[ ] The ASG will terminate the EC2 instance

**Correct Answer:** The ASG will terminate the EC2 instance

### Explanation
When an Auto Scaling Group (ASG) is integrated with an Application Load Balancer (ALB) and "ELB Health Checks" are enabled, the ASG gains the ability to react to application-level failures rather than just instance-level hardware failures.

*   **Default Behavior:** By default, ASG only monitors **EC2 Status Checks**. If the hardware or OS is fine but the web server (e.g., Apache/Nginx) crashes, the EC2 check remains "Healthy," and the ASG does nothing.
*   **ALB Health Check Integration:** When the ASG is configured to use **ELB Health Checks**, it relies on the ALB's active probing (e.g., a `GET /health` request). If the ALB marks the instance as `Unhealthy`, it informs the ASG.
*   **Termination & Replacement:** Once the ASG receives the unhealthy signal, it marks the instance for replacement. It will **terminate** the unhealthy instance and launch a new one to maintain the `Desired Capacity`.
*   **Grace Period:** ASG respects a "Health Check Grace Period" (default 300s) to allow new instances to finish booting and initializing before it starts performing health checks on them.

### Health Check Comparison
| Feature | EC2 Status Checks (Default) | ELB Health Checks (Optional) |
| :--- | :--- | :--- |
| **Monitored By** | EC2 Hypervisor | Load Balancer |
| **Check Level** | Hardware / Network / OS | Application / Port / URL Path |
| **ASG Action** | Terminates if instance fails | Terminates if app/target fails |
| **Visibility** | `StatusCheckFailed_System` | Target Group Health Status |

### Note
> To prevent a "boot loop" or unnecessary terminations, ensure the **Health Check Grace Period** is longer than the time it takes for your application to become fully operational (including data downloads, script executions, or warm-ups).


## Question 19
You hosted an application on a set of EC2 instances fronted by an Elastic Load Balancer. A week later, users begin complaining that sometimes the application just doesn't work. You investigate the issue and found that some EC2 instances crash from time to time. What should you do to protect users from connecting to the EC2 instances that are crashing?

[ ] Enable ELB Health Checks

[ ] Enable ELB Stickiness

[ ] Enable SSL Termination

[ ] Enable Cross-Zone Load Balancing

**Correct Answer:** Enable ELB Health Checks

### Explanation
The core function of an Elastic Load Balancer (ELB) is to ensure high availability by directing traffic only to "Healthy" targets. Without active health checks, the load balancer continues to send traffic to crashed instances, resulting in 5xx errors for users.

*   **Active Monitoring:** Health checks allow the ELB to periodically ping a specific protocol, port, or URL (e.g., `HTTP:80/health`) on the EC2 instances.
*   **In-Service vs. Out-of-Service:** 
    *   If an instance fails the health check (e.g., exceeds the `UnhealthyThreshold`), the ELB marks it as **Out-of-Service**.
    *   The ELB immediately stops routing new requests to that specific instance.
    *   Once the instance passes the `HealthyThreshold` again, it is automatically returned to the **In-Service** rotation.
*   **Auto Scaling Integration:** If the instances are part of an Auto Scaling Group (ASG), you should also configure the ASG to use **ELB Health Checks**. This ensures that the ASG terminates and replaces instances that are healthy at the hardware level but failing at the application level.

### ELB Health Check Parameters
| Parameter | Definition |
| :--- | :--- |
| **Ping Protocol** | The protocol used to communicate with the target (HTTP, HTTPS, TCP). |
| **Response Timeout** | The amount of time the ELB waits for a response before the check fails. |
| **Health Check Interval** | The frequency (e.g., every 30 seconds) at which the ELB performs the check. |
| **Healthy Threshold** | The number of consecutive successful checks required to mark an instance healthy. |
| **Unhealthy Threshold** | The number of consecutive failed checks required to mark an instance unhealthy. |

### Note
> To avoid false negatives, ensure your application's security groups allow inbound traffic from the Load Balancer's IP range on the health check port. If the ELB cannot reach the instance due to a firewall rule, the instance will be marked unhealthy even if the application is running perfectly.