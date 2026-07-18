---
title: NBA Predictive Analytics Platform
publishDate: 2025-07-18
img: /assets/nba-analytics/Streamlit1.png
img_alt: Streamlit dashboard showing NBA game predictions with confidence scores
description: |
  An end-to-end MLOps platform that ingests NBA data daily, builds XGBoost models with Optuna hyperparameter tuning, and serves live game predictions through a FastAPI + Streamlit stack — all orchestrated by Apache Airflow on AWS.
tags:
  - Data Engineering
  - Machine Learning
  - AWS
---

> **Live NBA game predictions, served fresh daily.** This platform predicts game outcomes using 19 engineered features — rolling win percentages, rest days, back-to-back indicators, opponent stats, and head-to-head records — updated automatically every morning.

## The Problem

NBA analytics available online are often:
- **Stale** — relying on season-old data instead of the latest games
- **Black-box** — no visibility into model confidence, feature importance, or how predictions are made
- **Manual** — requiring someone to download data, run scripts, and interpret results

I wanted a system that could ingest yesterday's results, retrain if needed, and serve tomorrow's predictions — all without human intervention.

## The Architecture

![Architecture overview](/assets/nba-analytics/NBAPredictionPlatform.drawio.png)
*End-to-end pipeline: NBA API → Bronze/Silver/Gold layers → XGBoost → Streamlit + FastAPI*

The pipeline follows a **Medallion Architecture** on S3 with Delta Lake:

- **Bronze** — Raw CSV dumps from `nba_api`
- **Silver** — Cleaned, deduplicated Delta table with schema enforcement
- **Gold** — Feature store with 19 engineered features, ready for training and inference

## Tech Stack

| Component | Technology | Why |
|---|---|---|
| Orchestration | Apache Airflow (CeleryExecutor) | DAG-based scheduling with retries and monitoring |
| Data Lake | Amazon S3 + Delta Lake | ACID transactions, time travel, schema evolution |
| Data Processing | AWS Glue (PySpark) | Serverless Spark for rolling window feature engineering |
| Model | XGBoost (`binary:logistic`) | Fast, interpretable, handles tabular data well |
| Hyperparameter Tuning | Optuna (TPE sampler, 50 trials) | Multi-objective: minimize log-loss, maximize AUC |
| Experiment Tracking | MLflow | Full lifecycle: params, metrics, artifacts, model registry |
| Inference API | FastAPI | Type-safe, async, auto-docs |
| Dashboard | Streamlit | Live predictions + model health monitoring |
| Containerization | Docker Compose (11 containers) | Consistent dev/prod environments |

## Model Performance & Feature Engineering

Over **~40,880 game-rows** across 16 NBA seasons (2010–2026), the XGBoost model achieves:

- **61.4% accuracy** — above the 56% Vegas over/under baseline for NBA picks
- **0.657 ROC AUC** — significantly above random guessing
- **0.641 log-loss** — well-calibrated confidence scores

### Top Features

| Feature | Importance |
|---|---|
| HOME (home court advantage) | Highest |
| ROLL_WIN_PCT_10 (10-game rolling win %) | 2nd |
| OPP_ROLL_WIN_PCT_10 (opponent's 10-game win %) | 3rd |
| TEAM_VS_OPP_SEASON_WIN_PCT (head-to-head) | 4th |

### Data Integrity
- **70/15/15 train/val/test split per season** — prevents data leakage across basketball eras
- Model only promoted to production if it beats the **current champion** on both log-loss and AUC
- **Population Stability Index (PSI)** monitoring for drift detection

## Results

### Streamlit Dashboard

![Streamlit Dashboard 1](/assets/nba-analytics/Streamlit1.png)
*Today's games with predicted winner and confidence — updated automatically every morning at 06:00 UTC*

![Streamlit Dashboard 2](/assets/nba-analytics/Streamlit2.png)
*Model metrics: accuracy trend, log-loss, ROC AUC, and feature importance*

### Airflow DAG

![Airflow DAG](/assets/nba-analytics/airflow.png)
*Daily pipeline: fetch NBA data → clean → feature engineering → inference ready*

### MLflow Experiment Tracking

![MLflow](/assets/nba-analytics/MLflow.png)
*Every training run tracked: hyperparameters, metrics, model artifacts*

## What I Built

1. **Data Pipeline** — Airflow DAG fetching daily NBA games from `nba_api`, idempotent Delta Lake upserts into Bronze → Silver → Gold with PySpark
2. **Feature Engineering** — 19 features computed via Spark Window functions: rolling averages, rest days, back-to-back detection, opponent stats, H2H win percentages
3. **Model Training** — XGBoost with Optuna HPO, MLflow tracking, automatic promotion gating
4. **Model Monitoring** — PSI drift detection with configurable thresholds; auto-retrain trigger
5. **Serving Layer** — FastAPI `/predict` endpoint returning (predicted_winner, confidence, home_win_probability)
6. **Dashboard** — Streamlit showing today's games, model health, and historical metrics
7. **Infrastructure** — Docker Compose spinning up 11 containers (Airflow cluster, MLflow, Postgres, Redis, RustFS S3 store, app)

## Key Achievements

- **Fully automated** — from data ingestion to prediction serving, no human touch required
- **Fault-tolerant** — Airflow retries (3x with exponential backoff), Delta Lake idempotent upserts, schema validation at every stage
- **Production-grade** — model promotion gating, drift monitoring, S3 versioning
- **Containerized** — single `docker compose up` deploys the entire platform

## Try It Yourself

The full source code, Airflow DAGs, Glue job scripts, and notebooks are available. Spin it up with:

```bash
docker compose up
```

Then open `http://localhost:8501` for the dashboard and `http://localhost:8000/docs` for the API.
