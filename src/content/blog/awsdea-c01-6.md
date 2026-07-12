---
title: "AWS Certified Data Engineer Associate - 06-Amazon Redshift"
description: "Amazon Redshift is a fully managed, petabyte-scale unified data warehouse. It is columnar and MPP (Massively Parallel Processing), which makes it well-suited for analytical workloa"
publishDate: 2026-06-28
tags:
  - "Exam Prep"
  - "AWS"
  - "Data Engineer"
---

## Amazon Redshift

Amazon Redshift is a fully managed, petabyte-scale unified data warehouse. It is columnar and MPP (Massively Parallel Processing), which makes it well-suited for analytical workloads on structured data.

## Architecture

A Redshift cluster consists of a **leader node** and one or more **compute nodes**. The leader node coordinates queries and workloads. Compute nodes execute the plan in parallel, with each node divided into **slices** — the number of slices depends on the node type. SQL queries are automatically parallelized across all slices, which is why Redshift performs well on large datasets.
JDBC/ODBC is supported for clients to connect to Redshift. There are also RA nodes with Redshift Managed Storage that allow offloading data to this storage. It separates the compute and storage layers so users can scale data volume without increasing the number of compute nodes.

## Durability & Scalability

The data in Redshift is replicated within a cluster, backed up to S3 with automated snapshots, and S3 snapshots can asynchronously replicate to multiple regions. RA node can have multiple Availability Zone options.

- **Elastic resizing** — add or remove nodes of the same instance type, needs a few minutes downtime
- **Classic resize** — allows changing the instance type and number of nodes, requires hours to days downtime
- **Snapshot restore** — restore a snapshot into a new cluster, route traffic to it, then scale up. Near-zero downtime

## Distribution Styles

Distribution determines how data is distributed across compute nodes. Choosing the right style is critical for query performance:
- **Auto** — Redshift handles distribution automatically. Best when there is no knowledge that suggests a better distribution approach
- **EVEN** — rows are distributed round-robin across all slices. Good for fact tables with no clear join keys.
- **KEY** — rows are distributed by a column's hash value. When both tables use the same distribution key on join columns, data stays co-located and shuffling is eliminated.
- **ALL** — a full copy of the table is placed on every node. Best for small dimension tables that are frequently joined with large fact tables.

## Sort Keys

Sort keys define the physical order of rows within a node. They improve query performance by allowing the query engine to skip irrelevant blocks during scans.

- **Compound sort key** — applies sorting on multiple columns in order. Efficient for queries that filter on the leading column.
- **Interleaved sort key** — gives equal weight to each column. Useful when queries filter on different columns unpredictably.

## Data Loading

The **COPY command** is the recommended way to load data into Redshift. It bulk-loads from S3, DynamoDB, or remote hosts and automatically compresses and parallelizes the ingestion.

```sql
COPY orders
FROM 's3://my-bucket/orders/'
IAM_ROLE 'arn:aws:iam::123456:role/MyRedshiftRole'
FORMAT AS PARQUET;
```

The COPY command can decrypt or unzip files.

### Zero-ETL

Zero-ETL refers to the ability to query operational data directly in Redshift without building and maintaining ETL pipelines. Redshift supports zero-ETL integrations with:

- **Amazon Aurora** — query Aurora data directly from Redshift with near-real-time replication
- **Amazon RDS** — similar zero-ETL integration for MySQL and PostgreSQL
- **Amazon DynamoDB** — query DynamoDB tables directly without data movement

This is a key exam topic. Zero-ETL eliminates the need for traditional extract-transform-load pipelines by enabling direct analytics on live operational data.

Kinesis Data Firehose and Amazon MSK can also deliver streaming data directly into Redshift.

Copy data between Redshift clusters in different regions:
1. Create a KMS key in the destination region
2. Create a unique name for the **snapshot copy grant** in the destination region
3. Specify the KMS Key ID in the **snapshot copy grant** in the destination region
4. Enable the copying of snapshots to the **snapshot copy grant** in the source region

## Data Exporting

The **UNLOAD command** is the recommended way to export data from Redshift. It exports query results to S3 in text, CSV, and Parquet format.

```sql
UnLoad orders
FROM 's3://my-bucket/orders/'
IAM_ROLE 'arn:aws:iam::123456:role/MyRedshiftRole'
FORMAT AS PARQUET;
```

## Vacuum
- **Vacuum Full** — recovers space from all deleted rows and sorts the rows
- **Vacuum Delete Only** — recovers space from all deleted rows only
- **Vacuum Sort Only** — sorts rows only
- **Vacuum ReIndex** — re-indexes the sort key columns

## Data Sharing

Redshift allows users to share live data across Redshift clusters, workgroups, accounts, and regions with data sharing. Users can query external live data.

## Redshift Spectrum

Redshift Spectrum allows users to query data directly in S3 without loading it into the cluster. It extends the Redshift SQL engine to read external tables in formats like **Parquet**, **ORC**, **JSON**, and **CSV**.

This is useful for querying infrequently accessed data or for staging data before loading it into Redshift tables.


## Redshift Federated Queries
Similar to Redshift Spectrum, Federated Queries let users query data from Amazon RDS without loading it into the cluster. Users can query RDS data without leaving Redshift. This is done by creating an external schema in Redshift.


## Workload Management (WLM)

Queries submitted to Redshift are assigned to query queues, which contain query slots. Each query slot is allocated memory.
WLM lets users define query slots with concurrency limits and memory allocation. This ensures short, interactive queries are not blocked by long-running ETL queries.

With **auto WLM**, Redshift manages queues dynamically based on query patterns.

**Short Query Acceleration** — users can prioritize short-running queries and run them in a dedicated space for faster execution.

**Concurrency Scaling** — adds an additional cluster that processes increased read and write queries, supporting thousands of concurrent users and queries. Users can manage which queries are sent to the concurrency cluster with WLM queues.

## Advantages

- **Fast performance** — columnar storage, MPP architecture, and data compression make analytic queries significantly faster than row-based databases.
- **Managed** — AWS handles backups, patching, replication, and hardware provisioning.
- **Elastic** — you can resize the cluster (with some downtime) or use concurrency scaling to handle spikes.
- **Redshift Spectrum** — extends the warehouse to query S3 without loading data first.

## Limitations

- **Not for OLTP** — Redshift is designed for analytical queries with high latency tolerance, not transactional workloads with frequent small writes.
- **Distribution and sort key decisions are sticky** — choosing the wrong key can severely degrade performance, and changing it requires recreating the table.
- **Concurrency limits** — the leader node can bottleneck under a high number of concurrent queries without proper WLM configuration.
- **Data loading latency** — COPY is batch-oriented. For real-time ingestion, you need additional services like Kinesis or DMS.

## Learn More

* [Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html)
* [Redshift Distribution Styles](https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_distribution.html)
* [Redshift Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html)
* [Redshift Best Practices](https://docs.aws.amazon.com/redshift/latest/dg/best-practices.html)
