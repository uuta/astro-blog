---
title: 5時間でできるClaude Codeを使ったMVP
author: uuta
pubDatetime: 2025-06-01T01:11:06.130Z
featured: false
draft: false
tags:
  - Tech
  - AI
description: Claude Codeを導入してTranderというMVPアプリケーションを開発した体験記。料金プラン、実際の使用感、注意点、そして今後のAI開発への展望について
---

- 金曜日の終業後に、[Claude Code](https://docs.anthropic.com/ja/docs/claude-code/overview)をお試しで導入することにした。
- install自体は特段難しくなく、下記のコードを実行するだけ。

```bash
npm install -g @anthropic-ai/claude-code
```

- Terminalで下記のコードを打つだけで、対話式のUIが表示される。ここら辺は想定通りと言えば想定通り。

```bash
claude
```

![terminal](https://res.cloudinary.com/djnikeo2b/image/upload/v1748715874/articles/Pasted_image_20250601024105_inttay.png)

- 料金は従量課金か、月額固定のプランから選ぶことができる。月額固定のプランは最低$100/m（Claude Max）なのでまぁ普通に考えればめちゃくちゃ高い。だが、実際にやってくれることを考えると、3,000-5,000万円ぐらいの価値がありそうなので投資と考えればかなり安いと思う。自分はガッツリ使いたかったので定額制のClaude Maxを選択した。
- 最初は従量課金で始めて、使用感が合えば後から定額制に変更してもいいと思う。[Claude Codeの使用料金を可視化するCLIツール「ccusage」を作った](https://zenn.dev/ryoppippi/articles/6c9a8fe6629cd6)にあるように、下記のRepositoryのパッケージを利用して日毎の使用料や料金を確認することが可能
  - https://github.com/ryoppippi/ccusage
- ちなみに自分は以下のような感じで、MVPのapplicationを作るのに$23.55ぐらい。今後毎日使うので、従量課金の場合は$350ぐらいいきそう。

![price](https://res.cloudinary.com/djnikeo2b/image/upload/v1748715872/articles/Pasted_image_20250601024957_phcs8y.png)

- 試行錯誤しながら作ったのが、[Trander - Random Location Discovery](https://trander-claude.netlify.app/)

![trander](https://res.cloudinary.com/djnikeo2b/image/upload/v1748715875/articles/Pasted_image_20250601025439_jcxsnh.png)

- TranderはAndroidで出してたけど更新が止まっていたので、新たに機能を追加しながら作った

## 注意点とかコツ

- **CLAUDE.mdの配置**: プロジェクトの配下に `./CLAUDE.md` を配置して、その中に機能の要件や仕様を記載する。ここら辺はClaude Codeの中で考えてもいいし、任意のLLMと会話をしながら話を進めても良い。今回は常に新しいものを取り入れる姿勢で、Obsidianでmarkdownを書いて それを `.CLAUDE.md` に移植した。Obsidianにはプラグインを入れることができ、CursorのようなwindowでLLMにコンテンツを提案してもらったり、GitHub Copilotのように文章を書きながら自動生成してくれるような機能を実現できる（あとプラグインを入れるとめちゃくちゃかっこよくなる）
- **環境変数をハードコードする危険あり**: 手段を問わずに目的を実現しようとする傾向にあるようで、注意をしてても環境変数をハードコードする傾向がある。おそらく今後Claude CodeのようなAgentは、処理内容がブラックボックス化していくので、人間の目による監視やルールベースの監視、LLMによる監視は必須になる。元OpenAI研究者等が共著で出した[AI 2027](https://ai-2027.com/)の悲観シナリオでは、嘘が巧妙になり全人類の滅亡が予測されている。
  > Unfortunately, the AI is deceiving them. Once a sufficient number of robots have been built, the AI releases a bioweapon, killing all humans. - https://ai-2027.com/summary

## 結論

総じてイカれてる。良くも悪くも産業革命よりすごい何かが起こる。たった2年半前には村上春樹風の文章が生成されることに感動していただけなのに🥲
