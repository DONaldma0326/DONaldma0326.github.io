---
title: "AWS Certified Data Engineer Associate - 09-Amazon OpenSearch"
description: "Amazon OpenSearch is an open-source distributed search, visualization, and analysis engine. It is a fork of Elasticsearch and Kibana. As a managed service, the deployment, operatio"
publishDate: 2026-07-04
tags:
  - "Exam Prep"
  - "AWS"
---

## Amazon OpenSearch

Amazon OpenSearch is an open-source distributed search, visualization, and analysis engine. It is a fork of Elasticsearch and Kibana. As a managed service, the deployment, operation, and scaling of the cluster are handled by AWS.


## Use Cases

OpenSearch is well-suited for the following scenarios:

- Log and event data analysis
- Full-text search
- Real-time application monitoring
- Business analytics

## Architecture

- **Documents** — the basic unit of data, stored as JSON
- **Indices** — namespaces that store a collection of documents
- **Shards** — an index is divided into shards; each document is hashed to a shard

**Primary shards** contain the original data of an index. **Replica shards** copy data from primaries to provide high availability and load balancing.

### Storage Calculation Example

To estimate the storage capacity of an index:

```
size of source data (1 GB) × (1 + number of replicas (2)) × JSON-to-index transformation ratio (1.45)
= 1 × (1 + 2) × 1.45
= 4.35 GB
```

## JVM Pressure

A common exam scenario is JVM memory pressure on the cluster causing performance degradation. This is typically caused by unbalanced or too many shards. The fix is to offload unused data to S3 or other storage and remove indices that are no longer in use.

## Learn More

* [Amazon OpenSearch Service Developer Guide](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)
* [OpenSearch Documentation](https://opensearch.org/docs/latest/)
* [OpenSearch Pricing](https://aws.amazon.com/opensearch-service/pricing/)
* [Ultimate Guide to JVM Pressure in OpenSearch](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-jvmpressure.html)
