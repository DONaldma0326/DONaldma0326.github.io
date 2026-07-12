---
title: "AWS Certified Data Engineer Associate - 15- AWS Application Integration"
description: "There will be times when you need to integrate your data infrastructure with applications — whether SaaS, self-hosted apps, or third-party datasets. This post covers a list of serv"
publishDate: 2026-07-05
tags:
  - "Exam Prep"
  - "AWS"
  - "Data Engineer"
---

## Application Integration

There will be times when you need to integrate your data infrastructure with applications — whether SaaS, self-hosted apps, or third-party datasets. This post covers a list of services useful in these situations.

## Amazon SNS

Amazon SNS (Simple Notification Service) is a fully managed messaging platform that enables delivery of messages from publishers to subscribers. It supports messaging patterns like pub-sub, fanout, and point-to-point messaging. A common use case is notifying a group of users of a successful ETL job.

## Amazon SQS

Amazon SQS (Simple Queue Service) allows you to send, receive, and store messages between software components. It enables decoupling of microservices, distributed systems, and serverless applications, allowing each component to work independently while communicating through SQS.

A common use case is having two Lambda functions for data processing: the first notifies the status of its job and the S3 location of the data through SQS to the second Lambda function for later-stage processing.

## Amazon AppFlow

Amazon AppFlow is a managed service that allows users to securely transfer data between AWS services and SaaS applications. It enables bidirectional data flow and is designed to simplify data integration with built-in data transformation and filtering capabilities.

AppFlow is commonly the answer in the exam when the use case involves integration with SaaS applications like SAP, Google Analytics, or Salesforce.

## Amazon Data Exchange

Amazon Data Exchange is a service that integrates with a wide range of third-party datasets. It can ingest data directly into an AWS data environment without building custom data pipelines. In the exam, Data Exchange is the go-to answer when you need to integrate third-party datasets.

## Amazon EventBridge

Amazon EventBridge is a serverless event bus service that enables event-driven architectures by allowing your applications to react to events from different sources. It has seamless integration with various AWS services and third-party applications.

## Amazon SageMaker

Amazon SageMaker is a fully managed machine learning service that simplifies building, training, and deploying ML models. Despite being an ML tool, it has several capabilities helpful for data engineering tasks.

### SageMaker Data Wrangler

Data Wrangler integrates with SageMaker notebooks to prepare and transform data visually without extensive coding. It enables users to interactively transform data and prepare it for training and analysis.

### SageMaker Feature Store

Features are used in machine learning as the data to train models. SageMaker Feature Store is a repository for managing and storing features, allowing you to create and retrieve them efficiently across ML models without duplicating data.


## Learn More

* [Amazon SNS Documentation](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
* [Amazon SQS Documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
* [Amazon AppFlow Documentation](https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html)
* [Amazon EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html)
* [Amazon SageMaker Documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
