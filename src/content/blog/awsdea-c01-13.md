---
title: "AWS Certified Data Engineer Associate - 13-AWS S3"
description: "By now you have heard the term S3 countless times. It is arguably the most commonly used service in data engineering on AWS. Amazon S3 stands for Simple Storage Service. It is a sc"
publishDate: 2026-07-05
tags:
  - "Exam Prep"
  - "AWS"
  - "Data Engineer"
---

## Amazon S3

By now you have heard the term S3 countless times. It is arguably the most commonly used service in data engineering on AWS. Amazon S3 stands for Simple Storage Service. It is a scalable, high-speed, cloud-based data storage service designed for storing and retrieving arbitrary amounts of data at any time from anywhere on the web. It provides 99.99% availability and 99.999999999% durability.

## S3 Storage Tiers

S3 offers different storage tiers for different use cases:

| Tier | Use Case |
|------|----------|
| S3 Standard | Frequently accessed data |
| S3 Intelligent-Tiering | Unknown or changing access patterns |
| S3 Express One Zone | High-performance, single-zone workloads |
| S3 Standard-IA | Infrequently accessed data |
| S3 One Zone-IA | Infrequently accessed, non-critical data |
| S3 Glacier Instant Retrieval | Archived data with instant access |
| S3 Glacier Flexible Retrieval | Archived data with flexible retrieval |
| S3 Glacier Deep Archive | Long-term archival at lowest cost |

## S3 for Data Engineering

S3 is used in data ingestion and storage, data processing and transformation, machine learning and data science, and data backup and archiving. It is commonly used to build data lakes that support these use cases.

![S3 Data Lake Architecture](/assets/stock-4.jpg)

## S3 Lifecycle Policies

Users can configure S3 Lifecycle policies that define actions S3 should perform on objects over time. For example, transition an object from S3 Standard to an archive storage class after 6 months and delete it after another 6 months. Lifecycle policies help optimize storage costs and manage data based on business requirements.

## AWS Lake Formation

AWS Lake Formation simplifies the process of setting up a secure data lake. It automates the steps including data ingestion, storage cataloging, transformation, security, and access control. In the exam, Lake Formation questions typically relate to security, IAM, and access control of the data lake.
