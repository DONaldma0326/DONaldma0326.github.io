---
title: "AWS Certified Data Engineer Associate - 05-Amazon Athena"
description: "Amazon Athena is a serverless interactive query service that lets user analyze data directly in S3 using standard SQL. It is Serverless and user pay per queries. It integrates with"
publishDate: 2026-06-27
tags:
  - "Exam Prep"
  - "AWS"
---

## Amazon Athena

Amazon Athena is a serverless interactive query service that lets user analyze data directly in S3 using standard SQL. It is Serverless and user pay per queries. It integrates with the **Glue Data Catalog** out of the box, so tables defined there are immediately queryable.

## Key Concepts

### Data Formats and Performance

Athena can query **CSV**, **JSON**, **Parquet**, **ORC**, and **Avro** formats. For production workloads, columnar formats would be better like **Parquet** and **ORC** as it significantly reduce the amount of data scanned, which lowers cost and improves query speed. Compression (gzip, snappy, zstd) further reduces scanned bytes.

### Partitioning

Partitioning divides table data into subdirectories based on a key like `year/month/day`. When a query includes a partition filter, Athena only scans the relevant partitions instead of the entire dataset. This is the single most impactful optimization for Athena.

```sql
CREATE EXTERNAL TABLE logs (
  log_id STRING,
  message STRING
)
PARTITIONED BY (year STRING, month STRING, day STRING)
STORED AS PARQUET
LOCATION 's3://my-bucket/logs/';
```

### CTAS and INSERT INTO

**CTAS (CREATE TABLE AS SELECT)** creates a new table from a query result, converting data to a more efficient format in the process. **INSERT INTO** appends results to an existing table. Both are useful for transforming raw data into optimized, partitioned tables.

### Federated Query

Athena Federated Query lets user run SQL across data sources like **DynamoDB**, **RDS**, **Redshift**, and on-premise databases using Lambda-powered data source connectors. This is useful when need to join data in S3 with operational databases without moving the data first.

### Workgroups

Workgroups isolate queries by team or project. They allow admin to set query limits, track costs, and control access. Each workgroup can have its own output location and encryption setting.

## Advantages

- **Serverless** — no clusters to manage, no idle cost. Queries scale automatically with demand.
- **Pay-per-query** — only pay for data scanned. Compression and columnar formats make it very cheap for well-structured data.
- **Immediate integration** — tables in the Glue Data Catalog are queryable instantly with no ETL.
- **Standard SQL** — uses Presto-based SQL, so anyone familiar with SQL can start immediately.

## Limitations

- **Not a database** — Athena is designed for ad-hoc analytics, not transactional or high-concurrency workloads. Concurrency limits apply per account.
- **Query cost can spike** — without partitioning and columnar formats, full-table scans on large datasets can get expensive quickly.
- **Write operations are limited** — no UPDATE or DELETE. Only CTAS, INSERT INTO, and CREATE TABLE are available for writing results.
- **Cold start latency** — first query after a period of inactivity can take a few extra seconds while the query engine initializes.

## Learn More

* [Amazon Athena Documentation](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
* [Athena Performance Tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html)
* [Athena Federated Query](https://docs.aws.amazon.com/athena/latest/ug/connect-to-a-data-source.html)
