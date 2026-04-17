# CLAUDE.md

Claude Codeが会話開始時に自動読み込みするエントリーポイントです。
詳細ルールは各 `rules/` ファイルに分離しています。**このファイル自体は変更頻度を最小限に保ってください。**

---

## 技術スタック

- Node.js v24.11.0 / TypeScript 5.x / Tailwind CSS
- パッケージマネージャー: npm / ホスティング: GitHub Pages

---

## 永続ドキュメント（rules/）の読み込みルール

> **重要:** 以下の作業を始める前に、対応する `rules/` ファイルを必ず読むこと。

| 作業の種類 | 読み込むファイル |
|-----------|----------------|
| UIコンポーネント・スタイル生成 | @rules/design.md|
| ブログ記事の作成・編集 | @rules/blog-guidelines.md |
| 機能設計・アーキテクチャ変更 | @rules/architecture.md |
| 開発ルール・命名規約 | @rules/development-guidelines.md |
| ドメイン用語 | @rules/glossary.md |

---

## スペック駆動開発の基本原則

### 基本フロー

```
ドキュメント作成（rules/）→ 作業計画（.steering/）→ 実装 → 検証 → ドキュメント更新
```

### 重要なルール

**ドキュメント作成時:**
1ファイルずつ作成し、必ずユーザーの承認を得てから次に進む。

承認待ちの際は明確に伝える:
> 「[ドキュメント名]の作成が完了しました。内容を確認してください。承認いただけたら次のドキュメントに進みます。」

**実装前の確認（毎回）:**
1. CLAUDE.md（本ファイル）を読む
2. 関連する `rules/` ファイルを読む
3. Grepで既存の類似実装を検索
4. 既存パターンを理解してから実装開始

---

## ステアリングファイル管理

作業ごとに `.steering/[YYYYMMDD]-[タスク名]/` を作成:

```
.steering/20250115-add-user-profile/
├── requirements.md   ← 今回の要求内容
├── design.md         ← 実装アプローチ
└── tasklist.md       ← 具体的なタスクリスト
```

命名規則: `20250115-add-user-profile` 形式（YYYYMMDD-kebab-case）

作業計画・実装・検証時は `Skill('steering')` を使用:
- 作業計画時: モード1（ステアリングファイル作成）
- 実装時: モード2（実装とtasklist.md更新管理）
- 検証時: モード3（振り返り）

---

## ディレクトリ構造

```
project-root/
├── CLAUDE.md                          ← 本ファイル（エントリーポイント）
│
├── rules/                             ← 永続ドキュメント（北極星）
│   ├── design.md                      ← デザインシステム・UIルール
│   ├── guidelines.md             ← ブログ品質基準・フロントマター定義
│   ├── product-requirements.md        ← プロダクト要求定義書
│   ├── functional-design.md           ← 機能設計書
│   ├── architecture.md               ← 技術仕様書
│   ├── development-guidelines.md     ← 開発ガイドライン
│   └── glossary.md                   ← ユビキタス言語定義
│
├── .claude/                           ← Claude Code 自動化設定
│   ├── skills/
│   │   └── blog-creation/SKILL.md    ← ブログ作成ワークフロー（9ステップ）
│   └── agents/
│       ├── seo-reviewer.md           ← SEO自動採点（100点満点）
│       ├── security-reviewer.md      ← XSS・情報漏洩チェック
│       └── label-checker.md          ← UIハードコーディング検出
│
├── .steering/                         ← 作業単位ドキュメント（履歴として保持）
│   └── YYYYMMDD-task-name/
│       ├── requirements.md
│       ├── design.md
│       └── tasklist.md
│
├── posts/                             ← 生成されたブログ記事
├── components/                        ← UIコンポーネント
└── public/                           ← 静的アセット
```

---

## 日常的な使い方

```bash
# ドキュメントの編集
> PRDに新機能を追加してください
> architecture.mdのパフォーマンス要件を見直して

# 機能追加（定型フローはコマンド）
> /add-feature ユーザープロフィール編集

# ブログ記事作成（blog-creationスキルが自動起動）
> 〇〇についてブログ記事を書いて

# 詳細レビュー
> /review-docs rules/product-requirements.md
```

ポイント: スペック駆動開発の詳細を意識する必要はありません。Claude Codeが適切なスキルを判断してロードします。

---

*このファイルの変更は最小限に。ルールの追加・変更は `rules/` の対応ファイルで行う。*
