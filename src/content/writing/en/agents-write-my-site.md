---
title: "Agents write my site. They can't publish it."
description: "Every article on this site starts as a pile of my notes: commit messages, issue threads, and things I wrote down when an agent did something surprising. An agent turns that into a draft. I decide whether it's true."
date: "[DATE]"
lang: en
key: agents-write-my-site
tags:
  - Agentic workflow
  - Security
---

Every article on this site starts as a pile of my notes: commit messages, issue threads, and things I wrote down when an agent did something surprising. An agent turns that into a draft. I decide whether it's true.

That split matters more than it sounds. The people I write for run agents themselves, and they can spot generated prose within a sentence. What a model can't give them is what actually happened on my machine. So the agent does the typing, and I own every claim.

## The pipeline

<div class="pipeline">
<div class="step"><p class="step-who">01 · me</p><p class="step-what">Notes and commits</p></div>
<div class="step step--agent"><p class="step-who">02 · agent</p><p class="step-what">Drafts EN and JA on a branch</p></div>
<div class="step step--agent"><p class="step-who">03 · agent</p><p class="step-what">Opens a pull request</p></div>
<div class="step"><p class="step-who">04 · CI</p><p class="step-what">Build, links, spelling</p></div>
<div class="step step--gate"><p class="step-who">05 · me</p><p class="step-what">Rewrite, approve, merge</p></div>
<div class="step"><p class="step-who">06 · CI</p><p class="step-what">Deploy from main</p></div>
</div>

<p class="pipeline-note">Steps run left to right. Only step 05 can make anything public.</p>

## What the agent is allowed to do

<dl class="permissions">
<div><dt>Read</dt><dd>My notes folder and this repository</dd></div>
<div><dt>Write</dt><dd>A new branch. Never main.</dd></div>
<div><dt>Run</dt><dd>The site build, a link checker and a spell checker</dd></div>
<div class="never"><dt>Never</dt><dd>Merge, deploy, or see a secret</dd></div>
</dl>

## Why it can't publish

Publishing is a deploy from main. Main is protected: a pull request needs my approval, and the agent's token can't approve its own work. The agent has no deploy credentials at all, because the deploy runs in CI after a merge.

So if the agent is wrong, confused, or fed a hostile web page while it researches, the worst it can do is open a bad pull request. I close it.

## What I still do by hand

- Pick the topic. Agents can write about anything, which is exactly the problem.
- Check every number and command against what really happened.
- Rewrite the opening and the ending in my own words.
- Read the English and Japanese versions side by side before merging.

<p class="placeholder">[CLOSING: what this pipeline has cost and saved so far]</p>
