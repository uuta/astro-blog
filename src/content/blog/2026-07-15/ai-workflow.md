---
title: AI agentのworkflowを構築してみた。そしてFable 5
author: uuta
pubDatetime: 2026-07-15T17:11:06.130Z
featured: false
draft: false
tags:
  - AI
  - Agents
description: AI agentのworkflowを構築しローカルで使用してみた実験の記録
---

2週間ぐらい前の話だが、前々職で定期的に開催されているLT会で機会をもらって、AI agentのworkflow構築に関する話をさせてもらった。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d8347f0987a24ffa8a48f53aad76d791" title="AI agentworkのworkflowを構築してみた。そしてFable 5" allowfullscreen="true" allow="web-share" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-dashlane-frameid="628" data-ratio="1.7777777777777777"></iframe>

ざっくりと説明すると、自動でissueを見にいき、merge可能なPRを作成する流れになっている。

## 前提

- tmuxを介してCodexとClaude Codeが通信をする仕組みが前提
- 各issueの進行具合はPostgreSQLで管理（stateの管理に関する論文を見たが、適切な管理方法に関する言及が見受けられなかったので、DBを使用することにした）

## 流れ

- GitHub issuesの中から`status:ready`になっているものを判定し、pm_agentが実装用のagentに実装を依頼
- 実装が終了したら、review用のagent数体が独立してreviewを開始
- reviewが問題なければ、PRを作成
- PRについたreview commentが適切かどうか判定し、修正すべきものはすぐに修正

現状、Fable 5と議論したものをissueに追加してもらい、実装はこのworkflowが担当する流れになっている。
そしてこの仕組みを現在進行形でめちゃくちゃ使っている。

Repositoryは下記に作成しているので良ければ見てくれ))

- https://github.com/uuta/uuter
