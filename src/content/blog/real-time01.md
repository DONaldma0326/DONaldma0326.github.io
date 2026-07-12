---
title: "Real-Time RAG data platform - Introduction"
description: "The goal of this project is to build a platform that allows users to subscribe to a list of websites and ask questions about specific topics, leveraging data ingested in real-time "
publishDate: 2026-06-10
tags:
  - "Project"
  - "RAG"
  - "Real-Time Data Pipeline"
---

## 🎯 Introduction
The goal of this project is to build a platform that allows users to subscribe to a list of websites and ask questions about specific topics, leveraging data ingested in real-time to provide the most accurate, up-to-date answers from an LLM.

## 1. Project Scope
The problem space is broad, so I have broken the implementation down into several key components:

* **Data Source:** Strategies for fetching data from various platforms.
* **Data Ingestion & Transformation:** Designing a real-time pipeline that transforms raw data into a format suitable for RAG.
* **RAG Design:** Implementing the core components (embedding, vector storage, and retrieval).
* **Deployment:** Utilizing MLOps best practices to support different architectural strategies.

## 2. Why RAG?
Retrieval-Augmented Generation (RAG) is the industry-standard solution for overcoming the limitations of static LLM training data. By using RAG, we can ground the model’s responses in the latest available information, ensuring answers are meaningful, current, and verifiable.

## 3. Why Real-Time?
In this project, real-time data processing is essential. We want users to receive answers based on the most recent news. Since news cycles can be rapid—with breaking news emerging and updating within minutes—it is necessary to handle data processing on an **event-driven basis** rather than relying on batch scheduling.

Follow along the journal of building this exciting project.
