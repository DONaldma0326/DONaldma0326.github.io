---
title: "AWS Certified Data Engineer Associate - 04-AWS Glue"
description: "AWS Glue is one of the first AWS data services I wanted to understand for the DEA exam. It is a serverless service that allows you to visually create, run, and monitor ETL pipeline"
publishDate: 2026-06-14
tags:
  - "Exam Prep"
  - "AWS"
---

## AWS Glue
AWS Glue is one of the first AWS data services I wanted to understand for the DEA exam. It is a serverless service that allows you to visually create, run, and monitor ETL pipelines without managing the underlying infrastructure.

It integrates well with other AWS data services like **S3**, **Athena**, and **Redshift**, as well as many common databases and data formats. That makes it easier to connect different parts of a data infrastructure and move data where it needs to go.

## Glue Components I Learned

### AWS Glue Jobs
This is the page I expect to spend the most time on. Here, you define the actual ETL job, either with a no-code interface or by writing your own Spark code when you need more control over the transformation logic.

### AWS Glue Data Catalog
The Data Catalog stores metadata about your data. It uses a three-level hierarchy: **Catalog > Database > Table**. At the table level, you store details like schema, data type, and data location.

For example, you can define a table that points to a CSV file in S3 and describe the schema there. Then tools like **Athena** or **Glue DataBrew** can use that metadata to query or prepare the actual data.

### AWS Glue Crawlers
Crawlers are useful when you do not want to define the schema manually. Instead, a crawler follows preset rules to infer the structure of a data source and create tables in the Data Catalog automatically.

### AWS Glue Triggers and Workflows
Triggers let you schedule Glue jobs or run them based on an event. Workflows go one step further and let you orchestrate multiple Glue jobs in the form of a DAG, which is useful when one task depends on another.

### AWS Glue DataBrew
DataBrew is designed for analysts and data scientists. It can connect to the Glue Data Catalog and provides prebuilt transformation tasks that make it easier to prepare data for machine learning or analytical use cases.

## Advantages
The main advantage of AWS Glue is that it is a fully managed service, which means I do not need to worry about the underlying infrastructure. AWS also provides a visual portal that makes Glue easier to use with little programming required.

For more advanced tasks, Glue also supports industry-standard frameworks like **Spark**, **Scala**, and **Python shell**.

## Limitations
Glue also has limitations. One issue is the cold start, which can add extra delay to a data processing job and become expensive if the delay accumulates over time.

It may not be cost-effective for massive daily workloads such as terabytes of data with complex logic and multiple tools as AWS Glue is charge on DAU and if the workloads require 8+ hours it may generate a massive cost. Glue also has a compute size cap, so it is less flexible than a self-hosted infrastructure when you need more control or larger processing capacity.

Finally, Glue is centered around Spark-based processing. If your workflow depends on other engines or frameworks like **Flink** or **HBase**, the support may not be as comprehensive.

## Learn More
* [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html)
* [AWS Glue Crawlers](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html)
* [AWS Glue Jobs](https://docs.aws.amazon.com/glue/latest/dg/add-job.html)
