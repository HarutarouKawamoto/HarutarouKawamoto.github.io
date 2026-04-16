# リポジトリ構造定義書 (Repository Structure Document)

## プロジェクト構造

```
project-root/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: ビルド・デプロイ
│
├── public/
│   ├── favicon.ico
│   └── images/                     # 最適化済み静的画像（OGP・プロフィール等）
│
├── src/                            # ソースコード（TypeScript）
│   ├── main.tsx                    # Reactエントリーポイント
│   ├── App.tsx                     # ルーター設定
│   │
│   ├── types/                      # 共通型定義
│   │   └── index.ts
│   │
│   ├── data/                       # 静的データ（型付きTypeScript）
│   │   ├── skills.ts
│   │   └── products.ts
│   │
│   ├── locales/                    # i18n翻訳ファイル
│   │   ├── ja.json
│   │   └── en.json
│   │
│   ├── posts/                      # ブログ記事（Markdown）
│   │   ├── ja/
│   │   │   └── YYYY-MM-DD-{slug}.md
│   │   └── en/
│   │       └── YYYY-MM-DD-{slug}.md
│   │
│   ├── lib/                        # ユーティリティ・ビジネスロジック
│   │   ├── i18n.ts                 # 言語検出・切り替えロジック
│   │   ├── theme.ts                # テーマ検出・切り替えロジック
│   │   └── blog.ts                 # Markdown読み込み・変換ユーティリティ
│   │
│   ├── contexts/                   # Reactコンテキスト
│   │   ├── I18nContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── pages/                      # ページコンポーネント（ルートと1対1）
│   │   ├── [lang]/                 # 言語パスパラメータ（'ja' | 'en'）
│   │   │   ├── Home.tsx            # /ja/ または /en/
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogList.tsx
│   │   │   │   └── BlogDetail.tsx
│   │   │   └── Contact.tsx
│   │   └── NotFound.tsx            # 言語に依存しない共通404ページ（[lang]/ 外に配置）
│   │
│   └── components/                 # 再利用可能なUIコンポーネント
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       ├── SkillCard.tsx
│       ├── ProductCard.tsx
│       ├── BlogCard.tsx
│       ├── ContactForm.tsx
│       ├── ThemeToggle.tsx
│       ├── LanguageSwitcher.tsx
│       └── StatusBadge.tsx
│
├── tests/
│   └── unit/                       # ユニットテスト（Vitest）
│       └── lib/
│           ├── i18n.test.ts
│           ├── theme.test.ts
│           └── blog.test.ts
│
├── rules/                          # 永続ドキュメント（北極星）
│   ├── product-requirements.md
│   ├── functional-design.md
│   ├── architecture.md
│   ├── repository-structure.md     # 本ドキュメント
│   ├── development-guidelines.md
│   ├── design.md
│   ├── blog-guidelines.md
│   └── glossary.md
│
├── ideas/                          # ブレインストーミング・アイデアメモ
│   └── brainstorming-portfolio.md
│
├── .steering/                      # 作業単位ドキュメント（Claude Code用）
│   └── YYYYMMDD-task-name/
│       ├── requirements.md
│       ├── design.md
│       └── tasklist.md
│
├── index.html                      # Viteエントリーポイント
├── vite.config.ts
├── vitest.config.ts                # Vitestテスト設定（カバレッジ閾値含む）
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── .gitignore
├── .env.example                    # 環境変数サンプル（git管理対象）
├── CLAUDE.md                       # Claude Code設定
└── package.json
```

---

## ディレクトリ詳細

### src/types/（共通型定義）

**役割**: プロジェクト全体で使用するTypeScript型・インターフェースの一元管理

**配置ファイル**:
- `index.ts`: `Skill`, `Product`, `BlogPost`, `BlogCategory`, `LocaleData` 等の型定義

**命名規則**:
- インターフェース名はPascalCase（例: `BlogPost`, `ProductStatus`）
- 型エイリアスはPascalCase（例: `BlogCategory`, `Lang`）

**依存関係**:
- 依存可能: なし（他のどのモジュールにも依存しない）
- 依存禁止: すべて

---

### src/data/（静的データ）

**役割**: スキル・成果物の静的データを型付きTypeScriptとして管理

**配置ファイル**:
- `skills.ts`: `Skill[]` 型のスキルデータ
- `products.ts`: `Product[]` 型の成果物データ

**命名規則**:
- ファイル名はcamelCase（`skills.ts`, `products.ts`）
- エクスポート名は `export const {name}: {Type}[] = [...]` 形式

**依存関係**:
- 依存可能: `src/types/`
- 依存禁止: `src/components/`, `src/pages/`, `src/lib/`

**例（skills.ts）**:
```typescript
import type { Skill } from '../types';

export const skills: Skill[] = [
  { id: 'typescript', name: 'TypeScript', category: 'language', level: 4 },
];
```

---

### src/locales/（i18n翻訳データ）

**役割**: 日英のUIテキストを管理

**配置ファイル**:
- `ja.json`: 日本語テキスト
- `en.json`: 英語テキスト

**命名規則**:
- ファイル名は言語コード（ISO 639-1）
- JSONキーはcamelCase

**制約**:
- `ja.json` と `en.json` は必ず同じキー構造を持つ
- ネストは最大2階層まで

---

### src/posts/（ブログ記事）

**役割**: Markdown形式のブログ記事を言語別に管理

**配置ファイル**:
- `ja/YYYY-MM-DD-{slug}.md`: 日本語記事
- `en/YYYY-MM-DD-{slug}.md`: 英語記事

**命名規則**:
- ファイル名: `YYYY-MM-DD-{slug}.md` 形式（例: `2026-04-16-hello-world.md`）
- スラッグ: kebab-case、英数字とハイフンのみ
- 日付: ISO 8601形式（`2026-04-16`）

**フロントマター必須項目**:
```markdown
---
title: "記事タイトル"
date: "2026-04-16"
category: "Learn"
tags: ["TypeScript", "React"]
summary: "記事の概要（1〜2文）"
lang: "ja"
---
```

**フロントマター任意項目**:
- `translationSlug`: 対応翻訳記事のスラッグ（日英対応記事の場合は事実上必須）
- `draft: true`: 下書き状態（一覧・RSSに含めない。省略時は公開扱い）

**依存関係**:
- 依存可能: なし（Markdownファイルのため）

---

### src/lib/（ユーティリティ）

**役割**: UIに依存しないビジネスロジック・純粋関数

**配置ファイル**:
- `i18n.ts`: 言語検出（`detectInitialLanguage`）、言語保存
- `theme.ts`: テーマ検出（`detectInitialTheme`）、テーマ保存
- `blog.ts`: Markdownファイル読み込み・フロントマター解析・HTML変換・フィルタリング・ソート

**命名規則**:
- ファイル名はcamelCase
- 関数名はcamelCase + 動詞始まり（`detectInitialLanguage`, `parseFrontmatter`）

**依存関係**:
- 依存可能: `src/types/`
- 依存禁止: `src/components/`, `src/pages/`, `src/contexts/`

---

### src/contexts/（Reactコンテキスト）

**役割**: グローバルな状態（言語・テーマ）のReactコンテキスト定義

**配置ファイル**:
- `I18nContext.tsx`: `I18nProvider`, `useI18n` フック
- `ThemeContext.tsx`: `ThemeProvider`, `useTheme` フック

**命名規則**:
- ファイル名はPascalCase + `Context.tsx`
- Providerコンポーネント名はPascalCase + `Provider`
- フック名は`use` + PascalCase（例: `useI18n`, `useTheme`）

**依存関係**:
- 依存可能: `src/lib/`, `src/types/`
- 依存禁止: `src/pages/`, `src/components/`（コンテキストはコンポーネントに依存しない）

---

### src/pages/（ページコンポーネント）

**役割**: URLルートと1対1に対応するページレベルのコンポーネント

**配置ファイル**:
- `Home.tsx`, `About.tsx`, `Skills.tsx`, `Products.tsx`: 各ページ
- `blog/BlogList.tsx`: ブログ一覧ページ
- `blog/BlogDetail.tsx`: ブログ詳細ページ
- `Contact.tsx`: お問い合わせページ
- `NotFound.tsx`: 404ページ

**命名規則**:
- ファイル名はPascalCase（ページ名と一致）
- コンポーネント名はファイル名と同一

**依存関係**:
- 依存可能: `src/components/`, `src/contexts/`, `src/data/`, `src/lib/`, `src/types/`
- 依存禁止: 他の`src/pages/`（ページ間の直接依存禁止）

---

### src/components/（UIコンポーネント）

**役割**: 再利用可能な単一責務のUIコンポーネント

**配置ファイル**:

| ファイル | 責務 |
|---------|------|
| `Navigation.tsx` | ナビゲーションバー（言語・テーマ切り替え含む） |
| `Footer.tsx` | フッター |
| `SkillCard.tsx` | スキル1件の表示 |
| `ProductCard.tsx` | 成果物1件の表示 |
| `BlogCard.tsx` | ブログ記事カード |
| `ContactForm.tsx` | お問い合わせフォーム |
| `ThemeToggle.tsx` | ダーク/ライト切り替えボタン |
| `LanguageSwitcher.tsx` | 言語切り替えボタン |
| `StatusBadge.tsx` | 「開発中」「完成」バッジ |

**命名規則**:
- ファイル名はPascalCase（コンポーネント名と同一）
- Propsの型名はコンポーネント名 + `Props`（例: `SkillCardProps`）

**依存関係**:
- 依存可能: `src/contexts/`（useContext経由）, `src/types/`
- 依存禁止: `src/pages/`, `src/data/`（データはページからPropsで渡す。コンポーネントがデータを直接importしない）

---

### tests/（テストコード）

**役割**: ユニットテストの配置

**構造**:
```
tests/
└── unit/
    └── lib/
        ├── i18n.test.ts       # detectInitialLanguage のテスト
        ├── theme.test.ts      # detectInitialTheme のテスト
        └── blog.test.ts       # フィルタリング・ソートロジックのテスト
```

**命名規則**:
- パターン: `[テスト対象ファイル名].test.ts`
- テスト関数名: `describe` でクラス/関数名、`it` で振る舞いを記述

---

### rules/（永続ドキュメント）

**役割**: プロジェクトの設計・ルール・ガイドラインの一元管理（変更頻度低）

**配置ファイル**:

| ファイル | 内容 |
|---------|------|
| `product-requirements.md` | プロダクト要求定義書（PRD） |
| `functional-design.md` | 機能設計書 |
| `architecture.md` | アーキテクチャ設計書 |
| `repository-structure.md` | 本ドキュメント |
| `development-guidelines.md` | 開発ガイドライン・命名規約 |
| `design.md` | デザインシステム・UIルール |
| `blog-guidelines.md` | ブログ品質基準・フロントマター定義 |
| `glossary.md` | ドメイン用語集 |

---

## ファイル配置規則

### ソースファイル

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| 型定義 | `src/types/` | PascalCase | `BlogPost`, `Skill` |
| 静的データ | `src/data/` | camelCase | `skills.ts`, `products.ts` |
| ユーティリティ関数 | `src/lib/` | camelCase | `i18n.ts`, `blog.ts` |
| Reactコンテキスト | `src/contexts/` | PascalCase + `Context` | `I18nContext.tsx` |
| ページコンポーネント | `src/pages/` | PascalCase | `Home.tsx`, `BlogList.tsx` |
| UIコンポーネント | `src/components/` | PascalCase | `SkillCard.tsx` |
| ブログ記事（日本語） | `src/posts/ja/` | `YYYY-MM-DD-{slug}.md` | `2026-04-16-hello-world.md` |
| ブログ記事（英語） | `src/posts/en/` | `YYYY-MM-DD-{slug}.md` | `2026-04-16-hello-world.md` |
| 翻訳データ | `src/locales/` | 言語コード | `ja.json`, `en.json` |

### テストファイル

| テスト種別 | 配置先 | 命名規則 | 例 |
|-----------|--------|---------|-----|
| ユニットテスト | `tests/unit/lib/` | `[対象].test.ts` | `i18n.test.ts` |
| コンポーネントテスト（将来） | `tests/unit/components/` | `[対象].test.tsx` | `SkillCard.test.tsx` |
| E2Eテスト（将来） | `tests/e2e/` | `[対象].spec.ts` | `blog.spec.ts` |

### 設定ファイル（プロジェクトルート）

| ファイル | 用途 |
|---------|------|
| `vite.config.ts` | Viteビルド設定 |
| `tailwind.config.ts` | TailwindCSS設定 |
| `tsconfig.json` | TypeScript設定 |
| `eslint.config.js` | ESLintルール設定 |
| `.prettierrc` | Prettierフォーマット設定 |
| `.gitignore` | Git除外設定 |
| `CLAUDE.md` | Claude Code設定 |
| `.env.example` | 環境変数サンプル（git管理対象。`.env.local` 作成の手引き） |
| `.env.local` | ローカル環境変数（`VITE_FORMSPREE_ENDPOINT` など）※`.gitignore` 対象 |

---

## 命名規則

### ディレクトリ名

| 種別 | 規則 | 例 |
|------|------|-----|
| ソースレイヤー | 複数形・kebab-case | `components/`, `contexts/`, `pages/` |
| 機能サブディレクトリ | kebab-case | `blog/` |
| 言語ディレクトリ | 言語コード（ISO 639-1） | `ja/`, `en/` |

### ファイル名

| 種別 | 規則 | 例 |
|------|------|-----|
| Reactコンポーネント | PascalCase + `.tsx` | `SkillCard.tsx`, `I18nContext.tsx` |
| ユーティリティ関数 | camelCase + `.ts` | `i18n.ts`, `blog.ts` |
| 静的データ | camelCase + `.ts` | `skills.ts`, `products.ts` |
| テスト | `[対象].test.ts` | `i18n.test.ts` |
| ブログ記事 | `YYYY-MM-DD-{slug}.md` | `2026-04-16-hello-world.md` |
| 翻訳ファイル | `{lang-code}.json` | `ja.json`, `en.json` |

---

## 依存関係のルール

### レイヤー間の依存（一方向のみ許可）

```
pages/
  ↓ (OK)
components/
  ↓ (OK)
contexts/
  ↓ (OK)
lib/
  ↓ (OK)
types/
```

```
pages/ → data/     (OK: ページがデータを読み込みPropsでコンポーネントに渡す)
pages/ → lib/      (OK)
```

**禁止される依存**:
- `components/` → `pages/` (❌)
- `components/` → `data/` (❌ データはProps経由で受け取る)
- `lib/` → `components/` (❌)
- `lib/` → `contexts/` (❌)
- `data/` → `lib/` (❌)
- `types/` → 任意 (❌)

**禁止される依存**:
- `components/` → `pages/` (❌)
- `lib/` → `components/` (❌)
- `lib/` → `contexts/` (❌)
- `data/` → `lib/` (❌)
- `types/` → 任意 (❌)

### 循環依存の禁止

コンポーネント間・ユーティリティ間で循環依存が発生した場合、共通ロジックを `src/types/` または `src/lib/` に抽出する。

---

## 除外設定（.gitignore）

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
coverage/
```

**注意**: `.steering/` は作業履歴として保持するため gitignore に含めない（CLAUDE.md の方針に従う）

---

## スケーリング戦略

### 機能追加時の配置方針

| 機能規模 | 対応方針 |
|---------|---------|
| 新しいUIコンポーネント（小） | `src/components/` に単一ファイルを追加 |
| 新しいページ（小〜中） | `src/pages/` にファイルを追加・ルーター更新 |
| 新しいデータ種別（中） | `src/types/index.ts` に型追加・`src/data/` にファイル追加 |
| 機能独立したモジュール（大） | `src/features/{feature-name}/` として分離を検討 |

### ファイルサイズの管理

- 1コンポーネントファイル: 200行以下を推奨
- 300行超: 子コンポーネントへの分割を検討
- `src/lib/blog.ts` が肥大化した場合: `src/lib/blog/` ディレクトリに分割
