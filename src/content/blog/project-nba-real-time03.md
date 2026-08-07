---
title: "NBA Real-Time Dashboard - 03 Implementation & Trade-offs"
description: "The decisions I had to make along the way: DuckDB's single-writer limitation, Flink starting at latest with manual redeploys, reconstructing running box scores by regex-parsing PBP descriptions, and a heuristic win-probability model."
publishDate: 2026-07-20
tags:
  - "Project"
  - "NBA"
  - "Real-Time"
  - "Data Engineering"
---

## 🎯 Introduction
The architecture is clean on paper. Reality is messier. Here are the trade-offs I actually had to make — and the ones I'd revisit.

## 1. DuckDB's single-writer wall
DuckDB allows **one writer at a time**. With a consumer writing and the API reading, I hit lock contention. The fix was a `get_connection_retry` helper with retry + backoff — a band-aid over a structural constraint. For a single-user dashboard it's fine; if I ever add a second analytics writer, I'd move to Postgres.

## 2. Flink starts at `latest`, redeploys are manual
The job is submitted with `flink run`, so editing `streak_job.py` means `flink cancel` → re-run — and **events in the gap are missed**. Fine for a demo, unacceptable for production. The fix is checkpointing + committed offsets + managed deploys.

## 3. Reconstructing box scores with regex
The demo replay needs live-updating per-player stats, but archived PBP only has descriptions like `"J. Smith (12 PTS) (3 REB)"`. So the demo producer **regex-parses these strings** to rebuild running stats. It works, but it's the most brittle code in the repo — the NBA owns those strings, I don't.

## 4. Heuristic win-probability, not ML
`winprob.py` is a hand-tuned logistic curve: ~58% home edge at tipoff, with each point of lead worth more near the end. It's *calibrated, not learned* — no team strength, no pace. Perfectly convincing as a live visual, malpractice as a betting model. Fitting it to historical data is top of the v2 list.

## 5. Streak reset semantics
A real `0 - 0` score (tipoff) unconditionally resets streak state; non-scoring rows (`SCORE = ' - '`) are ignored so they can't corrupt the counter; a score going backward is treated as a replay and resets cleanly. This is exactly what the demo replay engine relies on — every replay behaves like a brand-new game.

## 6. Legacy cruft
The project started as a Streamlit app, then pivoted to FastAPI + React. `run.sh` still says `streamlit run` and `requirements.txt` still lists Streamlit/plotly — dead ends that confuse newcomers. Cleaning them up is a small, overdue fix.

## 💡 The meta-lesson
Almost every trade-off is a **simplicity-vs-fidelity** decision made consciously for a learning project. The uncomfortable part is admitting which seams I'd actually have to fix: checkpointed Flink, an ML win-prob, and honest docs about the regex-parsed stats.
