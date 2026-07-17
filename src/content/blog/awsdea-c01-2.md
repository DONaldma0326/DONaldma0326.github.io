---
title: "AWS Certified Data Engineer Associate - 0-Introduction"
description: "- Structured"
publishDate: 2026-06-11
tags:
  - "Exam Prep"
  - "AWS"
---

## Data Engineering Fundamentals


## Types of Data

- **Structured**  
  Relational database data from MySQL, PostgreSQL, or Data Warehouses. Data with a tabular format.

- **Semi-structured**  
  JSON, CSV, NoSQL.  
  Does not necessarily fit into a tabular format but uses properties (like keys) to maintain some structure.

- **Unstructured**  
  Images, text files, emails.  
  No predefined structure and a wide range of data types.

## The Three V's

When handling data, there are always key aspects to consider — **The Three V's**: **Volume**, **Velocity**, and **Variety**.

- **Volume**  
  Refers to the scale of your data — whether you are dealing with GBs, TBs, or PBs. It is also important to consider the interval (e.g., daily or monthly).  
  Volume affects how you store, govern, process, and integrate data into your system.

- **Velocity**  
  Refers to how quickly data is being produced and how quickly it needs to be processed to generate valuable insights. This usually leads to two important questions:

  - **Real-time (Streaming) vs. Micro-batch vs. Batch**  
    Some data, such as stock market data, needs to be processed in real time so trading systems can execute algorithmic trades instantly.

  - **Latency**  
    The acceptable latency for processed data varies by use case. It is important to identify your requirements.  
    Sometimes these expectations are defined in SLAs, where you may see terms like D-1 or D-2 (meaning the data has a 1-day or 2-day delay).

- **Variety**  
  Refers to the data types, formats, and source systems. This includes structured, semi-structured, and unstructured data. Even within the same category, data can have different formats. For example, structured data can be tables in a relational database or Parquet files. Relational databases themselves can be PostgreSQL, MySQL, etc.  
  Variety affects how you integrate data into your system and how you ensure data quality.

## Data Warehouse vs Data Lake vs Data Lakehouse

These three terms appear frequently when designing data systems. They represent common practices for building centralized data storage from multiple sources.

- **Data Warehouse**  
  Typically stores structured data. It follows a **Schema-on-Write** approach (the schema is defined when data is written into the datastore). This ensures data integrity and consistency. Data warehouses also offer faster query performance because they work with structured data.  
  In AWS, **Redshift** is the primary Data Warehouse service (covered in later sections).

- **Data Lake**  
  Allows structured, semi-structured, and unstructured data at any scale. It follows a **Schema-on-Read** approach (the schema is applied when the data is read, often by downstream systems).  
  Data lakes are highly scalable because storage is cheaper, allowing companies to dump any kind of data at massive scale.  
  In AWS, **S3** is commonly used as a Data Lake.

- **Data Lakehouse**  
  A unified data platform that combines the best features of Data Lakes and Data Warehouses. It supports both Schema-on-Read and Schema-on-Write, and can store all types of data.  
  A well-known example is Databricks. In AWS, a Lakehouse is typically implemented by combining **S3** and **Redshift** with open file formats like Parquet or Delta Lake.

Despite their differences, the choice of architecture depends on your specific use case:

- **Data Warehouses** provide strong data governance and high performance for structured data. However, they tend to be more expensive and less flexible. They are ideal for traditional BI and reporting systems.

- **Data Lakes** offer great flexibility for storing diverse data types and are usually cheaper. However, working with varied formats and undefined schemas can create overhead for downstream systems. They are widely used in Machine Learning and Data Science use cases.

- **Data Lakehouses** aim to deliver the benefits of both. They are more complex to operate, especially when built from scratch rather than using enterprise solutions like Databricks. They can also introduce additional costs (e.g., subscription fees) and operational overhead.


---

## 🔗 Deep Dive
* [What is Databricks](https://docs.databricks.com/aws/en/introduction/)
* [Data Warehouse vs Data Lake vs Data Lakehouses](https://www.ibm.com/think/topics/data-warehouse-vs-data-lake-vs-data-lakehouse)
