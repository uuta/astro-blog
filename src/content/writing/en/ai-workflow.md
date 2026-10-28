---
title: "I built an AI agent workflow. And Fable 5"
date: 2026-07-15T17:11:06.130Z
lang: en
section: writing
key: ai-workflow
translated: true
tags:
  - "AI"
  - "Agents"
---
This was about two weeks ago: I got a slot at a lightning talk event that the company I worked for two jobs ago holds regularly, and gave a talk about building an AI agent workflow.

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d8347f0987a24ffa8a48f53aad76d791" title="I built an AI agent workflow. And Fable 5" allowfullscreen="true" allow="web-share" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-dashlane-frameid="628" data-ratio="1.7777777777777777"></iframe>

In a nutshell, it automatically goes and checks issues, and creates PRs that are ready to merge.

## Setup

- It's built on Codex and Claude Code talking to each other through tmux
- Each issue's progress is tracked in PostgreSQL (I looked at papers on managing state, but couldn't find anything on the right way to manage it, so I decided to use a DB)

## The flow

- Pick out the GitHub issues set to `status:ready`, and pm_agent asks an implementation agent to implement them
- When the implementation is done, several review agents start reviewing it independently
- If the review finds no problems, open a PR
- Judge whether the review comments on the PR are valid, and fix the ones that need fixing right away

Right now, I discuss things with Fable 5 and have it add them to issues, and this workflow takes care of the implementation.
And I'm using this setup like crazy as we speak.

The repository is below, so have a look if you like :)

- https://github.com/uuta/uuter
