---
title: "NBA Real-Time Dashboard - 02 Architecture"
description: "How events flow from stats.nba.com to the browser: two producers publishing to the same Kafka topics, a stateful PyFlink job detecting streaks, DuckDB upserts, and a WebSocket relay fanning every event out to the React SPA."
publishDate: 2026-07-09
tags:
  - "Project"
  - "NBA"
  - "Real-Time"
  - "Streaming"
---

## 🎯 Introduction
How does a made shot at `stats.nba.com` become a streak alert on screen in under a second? Here's the flow.

```
stats.nba.com
   │  (producer polls every 15s)
   ▼
Kafka topics ──► Flink (PyFlink streak job) ──► nba.streaks
   │
   ▼
DuckDB  ◄── nba_consumer (upserts)
   │
   ▼
FastAPI (REST + WS relay)  ──►  React SPA (WebSocket)
```

## 1. Two Producers, One Contract
* **`nba_producer.py` (live)** polls `stats.nba.com` every 15 seconds for scoreboard, box scores, and play-by-play, with a rate limiter (25 calls / 30s window) so the NBA API doesn't throttle us.
* **`demo_producer.py` (replay)** reads archived Parquet games and replays them as Kafka messages — **using the identical topic names, keys, and JSON shapes** as live data.

This one-contract-two-producers decision is the heart of the architecture. Flink, the consumer, and the WebSocket relay literally cannot tell a live game from a replay.

## 2. Kafka
Runs in **KRaft mode** (no ZooKeeper), with topics auto-created. Every event is keyed by `game_id`, which gives us:
* **Ordering per game** — all events for one game land in order on one partition key-space.
* **Isolation between games** — five concurrent demos never bleed streak state into each other.

## 3. Flink — the part that thinks
The hot-streak detector is a **PyFlink** job using a `KeyedProcessFunction` + `ValueState`, keyed by `game_id`. It watches every play-by-play event:
* Same scorer scores again → extend the running streak.
* Different player scores → emit an **`ended`** alert for the old streak.
* Crossing 5 straight points → emit an **`active`** alert with the game-clock timestamp (`Q1 08:24`).

The source starts at `latest`, and per-game keying means no cross-subtask state juggling.

## 4. Consumer + DuckDB
`nba_consumer.py` reads the topics and **upserts** into DuckDB (`games`, `player_stats`, `team_stats`, `shots`, `play_by_play`, `hot_streaks`). Since producers re-publish full box scores every cycle, idempotent `ON CONFLICT` upserts are essential — a re-poll must update, never duplicate.

## 5. FastAPI + WebSocket relay
The API has two halves: **REST** (`/api/games`, `/api/streaks`, ...) for initial loads, and a **WS relay** on `/ws` with its *own* Kafka consumer group (so it never steals offsets from the ingestion consumer). Every event is fanned out to connected browsers through an in-process `BroadcastHub`.

## 6. React SPA
React 19 + Zustand holds all live state in a store fed by WebSocket messages — scoreboard, streaks, momentum, and shot charts all re-render with zero refreshes.

## 🔗 Resources
* [Apache Kafka](https://kafka.apache.org/)
* [Apache Flink](https://flink.apache.org/)
* [DuckDB](https://duckdb.org/)
* [nba_api](https://github.com/swar/nba_api)
