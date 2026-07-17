---
title: "AWS Certified Data Engineer Associate - 12-Lambda and container services (ECS, EKS)"
description: "AWS Lambda is a commonly used service in the data engineering space. It is a serverless computing service that allows developers to run code without having to manage or provision s"
publishDate: 2026-07-05
tags:
  - "Exam Prep"
  - "AWS"
---

## AWS Lambda

AWS Lambda is a commonly used service in the data engineering space. It is a serverless computing service that allows developers to run code without having to manage or provision servers.

### Lambda for Data Engineering

Lambda functions can be used in the following data engineering tasks:

- **Real-time data ingestion** — as a consumer for Kinesis streams
- **Batch processing and transformation** — e.g., converting CSV to Parquet in S3
- **Trigger-based processing** — event-driven execution (e.g., S3 events)
- **Database replication**
- **Log processing**
- **Orchestration**

### Advantages

- Scalability
- Cost-effective
- Reduced operational overhead
- Integration with the AWS ecosystem
- Event-driven execution

![AWS Lambda Data Engineering](/assets/stock-3.jpg)

## AWS Container Services

It is also worth knowing the container services offered by AWS. While not limited to data engineering, they appear frequently in the exam. The three core services are:

- **Amazon Elastic Container Service (ECS)** — a fully managed container orchestration service
- **AWS Fargate** — a serverless compute engine for containers that works with ECS and EKS
- **Amazon Elastic Kubernetes Service (EKS)** — a managed Kubernetes service

## Containers in Data Engineering

A container is a lightweight, standalone, executable package that includes everything needed to run an application: code, runtime, libraries, and settings. Containers offer these benefits for data engineering:

- **Portability** — a container can run anywhere a container runtime is present
- **Scalability** — containers are easy to scale; services like Kubernetes provide auto-scaling and recovery
- **Isolation** — each container provides an isolated environment, improving governance, and a single container failure won't affect the entire workflow
