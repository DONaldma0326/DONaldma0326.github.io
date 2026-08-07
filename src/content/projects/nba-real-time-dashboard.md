---
title: NBA Real-Time Dashboard
publishDate: 2026-08-08
img: /assets/nba-real-time/scoreboard.png
img_alt: Live NBA scoreboard showing streaming game data in real time
description: |
  A real-time NBA analytics dashboard that streams live game data from stats.nba.com through a Kafka → Flink → DuckDB pipeline and serves it to a React SPA over REST + WebSocket — with a stateful hot-streak detector and an offline replay engine.
tags:
  - Data Engineering
  - Streaming
  - Python
  - React
---

> **Live NBA games, streamed to your browser in under a second.** This project pushes play-by-play events through Apache Kafka and Apache Flink, detects hot streaks as they happen, and updates the UI in real time over WebSocket — no page reloads, no "wait for the game to end."

## The Problem

Checking live scores always felt like batch analytics: refresh the page, scan the box score, do the mental math. The official NBA data has all the detail, but nothing answers the real-time questions:

- Who's **on a run right now** — and when did it start on the game clock?
- What's the **win probability this second**, not at the final horn?
- Where does **momentum** live as a game unfolds?

I wanted a system that ingests live data continuously, processes it incrementally as plays happen, and pushes the results to a browser — the way production streaming platforms actually work.

## The Architecture

```
stats.nba.com
   │  (producer polls every 15s)
   ▼
Kafka topics  ──►  Flink (PyFlink streak job)  ──►  nba.streaks
   │
   ▼
DuckDB  ◄──  nba_consumer (idempotent upserts)
   │
   ▼
FastAPI (REST + WebSocket relay)  ──►  React SPA
```

Two producers feed **identical Kafka topic contracts**: the live producer polls `stats.nba.com` every 15 seconds (rate-limited to 25 calls / 30s), and the demo producer replays archived Parquet games through the *same* topics, keys, and JSON shapes. Everything is keyed by `game_id`, giving per-game ordering and isolation — five concurrent games never bleed state into each other.

## Tech Stack

| Component | Technology | Why |
|---|---|---|
| Ingestion | Python, `nba_api`, kafka-python | Raw scoreboard / box score / play-by-play polling |
| Streaming | Apache Kafka 7.6 (KRaft) | Decoupled, durable message backbone |
| Stream Processing | Apache Flink 1.19 + PyFlink | Stateful hot-streak detection, keyed per game |
| Storage | DuckDB (embedded, single file) | Fast analytic upserts without a server |
| Backend | FastAPI + in-process WS relay | REST for loads, push for live updates |
| Frontend | React 19, Vite, Tailwind 4, Recharts | Zero-refresh live UI |

## The Hot-Streak Engine

The PyFlink job consumes the `nba.pbp` topic with a `KeyedProcessFunction` + `ValueState`, keyed by `game_id`:

- Same scorer extends the run; a different scorer emits an **`ended`** alert.
- Crossing 5 straight points emits an **`active`** alert with the game-clock timestamp (`Q1 08:24`).
- A real `0 - 0` (tipoff / replay restart) cleanly resets state; non-scoring rows are ignored.

Streak alerts flow back into Kafka, get upserted to DuckDB, and appear in the UI as a live ticker — struck through with the exact quarter and clock when the streak broke.

## The Demo Replay Engine

The dashboard must work *without a live NBA game*. Five archived games ship as Parquet and replay at real game pace through the **exact same pipeline** as live data — the demo is a first-class citizen, not a simulator bolted on. Controls include pause/resume (via `SIGSTOP`/`SIGCONT` on the producer subprocess) and early end, with multiple games running concurrently.

## Results

![Live scoreboard](/assets/nba-real-time/scoreboard.png)
*Live scoreboard streaming real game data over WebSocket — updated every 15 seconds, zero reloads*

- **Timestamped hot-streak alerts** fired by Flink the moment a player scores 5 straight
- **Momentum, shot-chart, and win-probability visuals** redrawn live from the event stream
- **Five concurrent demo replays** through one pipeline, fully offline
- **Live feed ticker** showing raw Kafka events the instant the relay fans them out
- **Live Today tab** hitting the real NBA schedule directly on game nights

## What I Built

1. **Producers** — live poller with rate limiting + demo replay publishing identical message shapes
2. **Flink streak job** — stateful, keyed hot-streak detector with `active`/`ended` semantics
3. **Ingestion consumer** — idempotent DuckDB upserts across 6 tables
4. **API layer** — FastAPI REST + WebSocket relay with a thread-safe broadcast hub
5. **React SPA** — scoreboard, game detail, streak ticker, charts, demo controls

## Key Achievements

- **One contract, two producers** — a replay and a live game are indistinguishable downstream, making every demo a full integration test of the pipeline
- **Real streaming semantics** — stateful Flink logic, per-game keying, idempotent storage
- **Fully offline demoable** — the entire stack runs on Docker + a venv, no live NBA needed

## Try It Yourself

Spin up Kafka + Flink, deploy the streak job, and start a demo replay:

```bash
docker compose up -d
docker exec nba-flink-jobmanager flink run -d -py /opt/flink/jobs/streak_job.py
./.venv/bin/python -m src.api.server
cd web && npm run dev
```

Then open `http://localhost:5173` and hit the 🧪 Demos tab to watch an archived game stream live through the whole pipeline.
