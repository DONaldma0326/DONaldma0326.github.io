---
title: "AWS Certified Data Engineer Associate - 14- Databases"
description: "We covered DynamoDB in a previous post. Here are other notable AWS database services."
publishDate: 2026-07-05
tags:
  - "Exam Prep"
  - "AWS"
---

## Amazon Databases

We covered DynamoDB in a previous post. Here are other notable AWS database services.

## Amazon RDS

Amazon RDS (Relational Database Service) is a managed service that simplifies setting up, operating, and scaling a relational database in AWS. The following database engines are supported:

- MySQL
- PostgreSQL
- MariaDB
- Oracle
- Microsoft SQL Server
- Amazon Aurora (compatible with MySQL and PostgreSQL)

## Amazon Timestream

A fully managed, scalable database designed to store and analyze time-series data. Commonly used for log monitoring and observability, real-time analytics, and IoT data.

## Amazon Neptune

A fully managed graph database designed for storing highly connected datasets. It can efficiently navigate relationships between data points, making it suitable for social networks, recommendation engines, and fraud detection.


## Learn More

* [Amazon RDS Documentation](https://docs.aws.amazon.com/rds/latest/UserGuide/Welcome.html)
* [Amazon Timestream Documentation](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)
* [Amazon Neptune Documentation](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html) 

## AWS Database Migration Service (DMS)

A managed service that facilitates the migration of databases to AWS. It supports migration between different database engines, making it an ideal tool for both homogeneous and heterogeneous migrations, as well as cloud-to-cloud and on-premises-to-cloud migrations.

For example, to migrate a SQL Server database on-premises to Amazon RDS for SQL Server:
1. Back up the data in the source database and restore it on the destination as the initial data load.
2. Use AWS DMS for ongoing data changes.
3. Configure the new database server in the application to complete the migration.

## Snow Family

The AWS Snow Family is a collection of physical devices designed for transporting large volumes of data to and from AWS. They are useful when transferring data over the internet is not practical or is too costly and time-consuming.

- **Snowcone** — 8 TB, the smallest unit in the Snow family
- **Snowball Edge** — 80 TB, also supports optional compute capabilities for edge applications
