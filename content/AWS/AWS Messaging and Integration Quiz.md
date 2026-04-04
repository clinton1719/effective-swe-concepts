---
title: AWS Messaging and Integration Quiz
tags: [aws, sqs, sns, kinesis]
difficulty: medium
date: 2026-04-04
---

## Question 1

You have an e-commerce website and you are preparing for Black Friday which is the biggest sale of the year. You expect that your traffic will increase by 100x. Your website already using an SQS Standard Queue, and you're running a fleet of EC2 instances in an Auto Scaling Group to consume SQS messages. What should you do to prepare your SQS Queue?

[ ] Contact AWS Support to pre-warm your SQS Standard Queue

[ ] Enable Auto Scaling in your SQS queue

[ ] Increase the capacity of the SQS queue

[ ] Do nothing, SQS scales automatically


**Correct Answer:** ✅ Do nothing, SQS scales automatically

**Explanation:** Amazon SQS is a fully managed message queuing service that is designed to scale transparently. It can handle nearly unlimited throughput (especially Standard Queues) without any pre-provisioning or "pre-warming" by the user. While you would need to ensure your **EC2 Auto Scaling Group** is configured to scale based on the number of messages in the queue (using the `ApproximateNumberOfMessagesVisible` metric), the queue itself requires no manual capacity adjustments.

## Question 2

You're running many micro-services applications on-premises and they communicate using a message broker that supports the MQTT protocol. You're planning to migrate these applications to AWS without re-engineering the applications and modifying the code. Which AWS service allows you to get a managed message broker that supports the MQTT protocol?

[ ] Amazon SQS

[ ] Amazon SNS

[ ] Amazon Kinesis

[ ] Amazon MQ


**Correct Answer:** ✅ Amazon MQ

**Explanation:** Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ. It is specifically designed for migrating existing applications that rely on industry-standard APIs and protocols such as **MQTT**, **AMQP**, **STOMP**, **WSS**, and **OpenWire**. Unlike SQS or SNS, which are AWS-proprietary APIs, Amazon MQ allows for a "lift-and-shift" migration without requiring code changes to the messaging logic.

## Question 3

You have 3 different applications that you'd like to send them the same message. All 3 applications are using SQS. What is the best approach would you choose?

[ ] Use SQS Replication Feature

[ ] Use SNS + SQS Fan Out Pattern

[ ] Send messages individually to 3 SQS queues


**Correct Answer:** ✅ Use SNS + SQS Fan Out Pattern

**Explanation:** The "Fan-out" pattern is a standard architectural design where a message published to an SNS topic is automatically pushed to multiple subscribed SQS queues. This ensures that all applications receive the same data simultaneously while remaining decoupled, and it is much more scalable and less error-prone than manually sending individual messages to multiple queues.

## Question 4

You have an SQS Queue where each consumer polls 10 messages at a time and finishes processing them in 1 minute. After a while, you noticed that the same SQS messages are received by different consumers resulting in your messages being processed more than once. What should you do to resolve this issue?

[ ] Enable Long Polling

[ ] Add DelaySeconds parameter to the messages when being produced

[ ] Increase the Visibility Timeout

[ ] Decrease the Visibility Timeout


**Correct Answer:** ✅ Increase the Visibility Timeout

**Explanation:** In SQS, the **Visibility Timeout** is the period during which SQS prevents other consumers from receiving and processing a message that is already being processed by one consumer. If a consumer takes 1 minute to process messages but the Visibility Timeout is set to a shorter period (e.g., 30 seconds), the message will become visible again before the first consumer can delete it. Increasing the timeout to exceed the processing time (e.g., to 90 seconds) ensures the first consumer has enough time to finish and delete the message.

## Question 5

You are running an application that produces a large amount of real-time data that you want to load into S3 and Redshift. Also, these data need to be transformed before being delivered to their destination. What is the best architecture would you choose?

[ ] SQS + AWS Lambda

[ ] SNS + HTTP Endpoint

[ ] Kinesis Data Streams + Kinesis Data Firehose


**Correct Answer:** ✅ Kinesis Data Streams + Kinesis Data Firehose

**Explanation:** This is a classic "Streaming ETL" architecture. Kinesis Data Streams captures the high-volume real-time data, and Kinesis Data Firehose acts as the delivery stream. Firehose has built-in integration to transform data (via Lambda) and then load it directly into S3, Redshift, or OpenSearch.

## Question 6

Which of the following is NOT a supported subscriber for AWS SNS?

[ ] Amazon Kinesis Data Streams

[ ] Amazon SQS

[ ] HTTP(S) Endpoint

[ ] AWS Lambda


**Correct Answer:** ✅ Amazon Kinesis Data Streams

**Explanation:** Amazon SNS natively supports pushing messages to **Amazon SQS**, **AWS Lambda**, **HTTP(S) endpoints**, **SMS**, **Email**, and **Mobile Push Notifications**. It does **not** natively support Kinesis Data Streams as a direct subscriber. To move data from SNS to Kinesis, you would typically need a "glue" component, such as a Lambda function, to receive the SNS message and then write it into the Kinesis stream.

## Question 7

You have a website where you want to analyze clickstream data such as the sequence of clicks a user makes, the amount of time a user spends, and where the navigation begins and how it ends. You decided to use Amazon Kinesis, so you have configured the website to send these clickstream data all the way to a Kinesis data stream. While you checking the data sent to your Kinesis data stream, you found that the users' data is not ordered and the data for one individual user is spread across many shards. How would you fix this problem?

[ ] There are too many shards, you should only use 1 shard

[ ] You shouldn't use multiple consumers, only one and it should re-order data

[ ] For each record sent to Kinesis add a partition key that represents the identity of the user


**Correct Answer:** ✅ For each record sent to Kinesis add a partition key that represents the identity of the user

**Explanation:** In Kinesis Data Streams, the **Partition Key** is used to group data by shard. All records with the same partition key are sent to the same shard, which guarantees that they are processed in the exact order they arrived (FIFO). By using a `user_id` or `session_id` as the partition key, you ensure all clicks from a single user stay on the same shard in chronological order.

## Question 8

You have a Kinesis data stream with 6 shards provisioned. This data stream usually receiving 5 MB/s of data and sending out 8 MB/s. Occasionally, your traffic spikes up to 2x and you get a ProvisionedThroughputExceeded exception. What should you do to resolve the issue?

[ ] Add more Shards

[ ] Enable Kinesis Replication

[ ] Use SQS as a buffer to Kinesis


**Correct Answer:** ✅ Add more Shards

**Explanation:** A single Kinesis shard provides a fixed unit of capacity: 1 MB/s for input and 2 MB/s for output. With 6 shards, your current limits are 6 MB/s (input) and 12 MB/s (output). When your traffic spikes 2x (to 10 MB/s input), you exceed the 6 MB/s limit, triggering the `ProvisionedThroughputExceeded` exception. To resolve this, you must "reshard" the stream by adding more shards to increase the total aggregate throughput.
