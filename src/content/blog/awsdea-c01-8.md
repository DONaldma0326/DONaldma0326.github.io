---
title: "AWS Certified Data Engineer Associate - 08-Amazon Kinesis"
description: "Amazon Kinesis is a fully managed AWS service that provides real-time streaming data ingestion and processing. It is highly scalable and can handle large amounts of data from hundr"
publishDate: 2026-07-03
tags:
  - "Exam Prep"
  - "AWS"
---

## Amazon Kinesis

Amazon Kinesis is a fully managed AWS service that provides real-time streaming data ingestion and processing. It is highly scalable and can handle large amounts of data from hundreds of thousands of sources with low latency.

Amazon Kinesis can be used in the following ways:

- **Kinesis Data Streams** — for building custom streaming applications
- **Kinesis Firehose** — for loading streaming data into AWS data stores
- **Managed Service for Apache Flink** — for running Apache Flink applications to process streaming data

## Amazon Kinesis Data Streams

### Architecture

Kinesis Data Streams consists of three parts:

**Producer -> Data Stream -> Consumer**

**Producer** — where data is generated. This can be an application server, EC2 instance, or client machine.

**Data Stream** — the central part of the solution. Each stream consists of a number of **shards**, and each shard contains an ordered sequence of data records.

**Consumer** — the destination of your data. Consumers read data from the stream and offload it to data storage such as Redshift, RDS, or S3.

### Key Terminology

**Data Record** — the smallest unit of data in a stream. It is composed of a sequence number, a partition key, and an immutable data blob. The data blob has a maximum size of **1 MB**.

**Partition Key** — used to group data across different shards in a stream. When a data record arrives, the partition key determines which shard the record belongs to.

**Sequence Number** — a unique identifier within each data record, scoped to a partition key within a shard. It is assigned when a client writes to the stream using `putRecords` or `putRecord`. Sequence numbers are important for maintaining the logical order of data in a stream.

## Kinesis Data Streams KCL

KCL stands for **Kinesis Consumer Library**. It is a comprehensive library that handles data stream connections, data checkpointing, and other complexities for multiple data sources, allowing users to focus on business logic rather than the details of distributed streaming. It is recommended to use KCL whenever possible, as it lowers operational complexity compared to implementing manual logic with the SDK.

## Enhanced Fan-Out

Enhanced fan-out improves the performance of Kinesis Data Streams. It provides dedicated throughput of **2 MB/s per shard per registered consumer**. Compared to standard Kinesis, which has a throughput of 2 MB/s per shard shared across all consumers, enhanced fan-out greatly increases scalability since multiple applications can read data from a shard without competing for bandwidth. It supports up to 20 consumers per stream.

## Kinesis Firehose

Amazon Kinesis Firehose is a fully managed service for delivering real-time streaming data to destinations such as S3, Redshift, and OpenSearch. It reliably loads real-time streams into a destination with minimal operational effort. Firehose can also read from Kinesis Data Streams and load the data into storage like S3.

## Amazon Managed Service for Apache Flink

Amazon Managed Service for Apache Flink (formerly Kinesis Data Analytics) provides a managed environment for running Apache Flink applications. Users do not need to handle the underlying infrastructure and can use Flink to transform and analyze streaming data in real time.

## Learn More

* [Amazon Kinesis Documentation](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)
* [Kinesis Data Streams Developer Guide](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)
* [Kinesis Firehose Developer Guide](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html)
* [Managed Service for Apache Flink](https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html)
