---
title: "NBA Real-Time Dashboard - 04 Results"
description: "The moment it all worked: a hot-streak alert fired by Flink mid-replay, five archived games streaming concurrently through the same pipeline, and a dashboard that updates itself with zero page reloads."
publishDate: 2026-07-30
tags:
  - "Project"
  - "NBA"
  - "Real-Time"
  - "Visualization"
---

## 🎯 The moment it clicked
I started my first demo replay — a Knicks @ Bucks game — and watched the scoreboard tick up as play-by-play streamed through Kafka at real game pace. Then, a few minutes in:

> 🔥 **A player has scored 5 straight points** — Q2 08:24

Not a static table after the fact — a *temporal* observation from the Flink job, timestamped with the exact game-clock moment it happened. That's the entire point of a streaming pipeline.

## What a game detail looks like
* **Scoreboard header** — scores, period, clock, and a **win-probability bar** that swings with every lead change.
* **Streak ticker** — active streaks glowing orange, ended ones struck through with "ended Q3 04:11".
* **Momentum chart** — a home-lead line tracing the game's emotional arc, redrawn live.
* **Shot chart** — full court with every shot; click a player row to filter to their heat map.
* **Live box scores** — per-player and per-team stats rebuilt from every play as it streams.
* **Play-by-play feed** — the latest events streaming in like a ticker.

## Five games at once
Because everything is keyed by `game_id`, I started **all five demo replays concurrently** — five subprocesses, five games, same topics, same Flink job, same DuckDB file. No cross-game contamination, no state bleed.

The controls go beyond play: **pause/resume** works via `SIGSTOP`/`SIGCONT` on the producer subprocess, and **end early** publishes a FINAL scoreboard so the game clears off the board.

## The live feed ticker
One of my favorite details: the raw Kafka feed in the UI shows every event flowing through the pipeline the instant the WebSocket relay fans it out. You can *watch* a boxscore message arrive, then see the streak alert the Flink job produced from it. The plumbing becomes visible.

## The verdict
The dashboard hits everything on my original list — scoreboard, timestamped streaks, momentum, shot charts, win-probability, concurrent replays — with no refreshes and no "wait for a live game." Five archived games run the full stack offline, through the **same production-shaped pipeline** as real data. When that works, you've validated the architecture — not a toy version of it.
