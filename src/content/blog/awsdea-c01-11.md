---
title: "AWS Certified Data Engineer Associate - 11-DynamoDB"
description: "DynamoDB is a serverless NoSQL database built to handle large volumes of data and high request rates. It manages data in key-value or document format. Despite being a NoSQL databas"
publishDate: 2026-07-04
tags:
  - "Exam Prep"
  - "AWS"
---

## Amazon DynamoDB

DynamoDB is a serverless NoSQL database built to handle large volumes of data and high request rates. It manages data in key-value or document format. Despite being a NoSQL database, DynamoDB supports PartiQL, a SQL-compatible query language that allows users to DELETE, UPDATE, INSERT, and SELECT data in DynamoDB.

### Partition Keys, Sort Keys, and Primary Keys

A DynamoDB data record has a **partition key** which is the unique identifier for a data item. A **sort key** is used when you don't have a unique partition key, allowing multiple items with the same partition key. The partition key plus sort key (if any) forms the primary key of a record.

### DynamoDB Indexes

There are two types of indexes:

- **Global Secondary Index (GSI)** — allows an alternative query pattern with a partition key and optional sort key different from the original table. This creates a new view of the data with a different partition and sort key, enabling different query patterns.
- **Local Secondary Index (LSI)** — uses the **same** partition key as the base table but a different sort key. The index is scoped to the same partition key as the base table.

Use GSI when you need a query pattern with a different partition key and want to scale throughput independently from the base table. Use LSI when you only need to query on a different sort key with the same partition key. GSI is more costly than LSI as it essentially maintains another table.

### DynamoDB RCUs and WCUs

DynamoDB throughput is measured in **Read Capacity Units (RCUs)** and **Write Capacity Units (WCUs)**.

- **RCU** — 1 strongly consistent read per second or 2 eventually consistent reads per second, for items up to 4 KB. For example, reading a 3 KB item with strongly consistent read costs 1 RCU; with eventually consistent read it costs 0.5 RCU.
- **WCU** — 1 write per second for an item up to 1 KB. A 500-byte item consumes 1 WCU. A 3 KB item consumes 3 WCUs (3 KB / 1 KB = 3).

### DynamoDB Capacity Modes

- **Provisioned Mode** — specify the number of RCUs and WCUs needed. Suitable for predictable traffic patterns.
- **On-Demand Mode** — DynamoDB automatically adjusts capacity to accommodate workloads. You pay for actual read/write usage. Suitable for unpredictable traffic.


### DynamoDB Accelerator (DAX)

DAX is a fully managed in-memory caching service for DynamoDB. It provides significant improvement to **read** performance by caching data, reducing response time from milliseconds to microseconds. Ideal for read-intensive applications.

### DynamoDB Streams

DynamoDB Streams captures a time-ordered, item-level change log (insert, update, delete) in a DynamoDB table. When enabled, it records changes and produces them as streams of data records that can be consumed by other services such as AWS Lambda or Amazon MSK.

## Learn More

* [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
* [DynamoDB PartiQL Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html)
* [DynamoDB DAX Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html)
* [DynamoDB Streams Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
* [DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
