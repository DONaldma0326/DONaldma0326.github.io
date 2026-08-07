---
title: "NBA Real-Time Dashboard - 05 Feedback & Lessons Learned"
description: "The feedback that shaped v2: the repo had two identities, there were no tests, and the win-probability number overpromised. Plus the technical lessons — Flink data loss, DuckDB's writer wall, regex debt — and a concrete v2 checklist."
publishDate: 2026-08-08
tags:
  - "Project"
  - "NBA"
  - "Real-Time"
  - "Data Engineering"
---

## 🎯 Introduction
This is the post that matters most — feedback from myself while debugging and from people who read the repo, distilled into lessons that are already shaping v2.

## ✅ What went well
* **The event contract made the system testable.** One JSON shape per Kafka topic meant the Flink job, consumer, relay, and demo engine all spoke the same language. The replay engine working through the identical code path as live ingestion is the proof.
* **Keying by `game_id` paid off.** Five concurrent games, zero state bleed.
* **`SIGSTOP`/`SIGCONT` for pause/resume.** A hack, but a cheap, correct one — suspend the producer and the whole pipeline waits.
* **Boring infrastructure.** Kafka, Flink, DuckDB, FastAPI, React. All the credibility of a real stack, none of the exotic-tool tax.

## 🗣️ What people called out
* **"The repo has two identities."** The README documents FastAPI + React, but `run.sh` still launches Streamlit. **Lesson: delete dead ends before they become landmines.**
* **"Where are the tests?"** The streak engine was written to be testable and I never wrote the tests. **Lesson: if a function is pure and important, test it the day you write it.**
* **"The win-probability isn't real."** Showing a number with two decimals invites trust. **Lesson: brand it as v1 and fit it to real data.**
* **"What happens when Kafka is down?"** The demo producer has a graceful local fallback, but the UI never says so. **Lesson: surface degradation instead of hiding it.**

## ⚠️ The technical lessons
* **Flink's `latest` offsets + manual redeploys = data loss.** Every job edit dropped events in the gap. The fix is checkpointing and committed offsets.
* **DuckDB's single-writer model is a wall you hit, not a wall you see coming.** Choose storage *after* enumerating your writer set.
* **Regex-parsing NBA descriptions is debt with interest.** The NBA owns those strings; I don't. Snap approximate data to the authoritative source at the end — I do, but only by accident of shipping the final box score publish.
* **Idempotency pays for itself.** `ON CONFLICT` upserts mean every producer is safe to re-run.

## 🚀 v2 checklist
1. Delete the Streamlit dead ends and prune `requirements.txt`.
2. Test the streak engine and diff it against the Flink output.
3. Flink checkpointing + scripted redeploys.
4. Fit a real win-probability model; keep v1 behind a flag.
5. Surface "running in local fallback" in the UI.
6. Snap demo stats to the authoritative final box score.

## 💡 The one lesson I'd keep
**Build the demo through the same pipeline as production, and the demo becomes a test.** Every replay was a full integration test of producers, streaming, state, storage, and UI. That's the single best architecture decision in this project — and I'll make it again in every project that can get away with it.
