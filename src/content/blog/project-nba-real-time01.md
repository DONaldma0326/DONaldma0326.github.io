---
title: "NBA Real-Time Dashboard - 01 The Idea"
description: "Building a real-time NBA dashboard that streams live game data through a Kafka to Flink to DuckDB pipeline. It detects hot streaks as they happen, renders shot charts and momentum curves, and serves it all to a React SPA with zero page reloads."
publishDate: 2026-07-01
tags:
  - "Project"
  - "NBA"
  - "Real-Time"
---

## 🎯 Introduction
The idea started with a simple frustration: I kept refreshing `stats.nba.com` during games and doing the mental math myself — "he's scored 7 straight, who's on a run right now?" The official site never answers those questions *in real time*, so I decided to build a dashboard that does.

## 1. What I wanted to build
A **real-time NBA dashboard** that:

- **Ingests** live data from `stats.nba.com` continuously, not on demand.
- **Streams** events through a proper pipeline — Apache Kafka → Apache Flink → DuckDB.
- **Detects hot streaks** (a player scoring 5+ straight points) as the plays happen, timestamped with the game clock.
- **Pushes** everything to a browser over WebSocket, so the UI updates itself.

The non-negotiable requirement: the demo must work **without a live NBA game**. So I built a replay engine — archived games stored as Parquet that stream through the *exact same* topics and jobs as live data. If a replay works, the whole pipeline is validated.

## 2. Why Real-Time?
Basketball is fast, and momentum shifts happen in an instant. A batch dashboard misses the story of the game. Real-time lets me:

- Show a **hot-streak alert** the second someone scores 5 in a row.
- Watch the **win-probability bar** swing with every lead change.
- Trace **momentum curves** and shot charts as plays land.
- Keep everything live without a single page refresh.

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Ingestion | Python, `nba_api`, kafka-python |
| Streaming | Apache Kafka (KRaft), Apache Flink 1.19 + PyFlink |
| Storage | DuckDB (embedded, single file) |
| Backend | FastAPI + WebSocket relay |
| Frontend | React 19, Vite, Tailwind CSS 4, Recharts |

## 4. What shipped
More than the initial sketch: a live scoreboard, full game detail with box scores + play-by-play, shot charts, momentum charts, a hot-streak detector, a 5-game demo replay engine, a Live Today tab, and a raw Kafka feed ticker.

Follow along as I build this project from the ground up. 🏀
