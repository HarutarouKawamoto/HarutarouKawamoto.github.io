# 技術仕様書 (Architecture Design Document)

## テクノロジースタック

### 言語・ランタイム

| 技術 | バージョン | 選定理由 |
|------|-----------|----------|
| Node.js | v24.11.0 (LTS) | ビルドツール・スクリプトの実行環境。2026年以降もLTSサポートが継続し安定稼働が期待できる |
| TypeScript | 5.x | 静的型付けにより、スキル・成果物・ブログ記事データのスキーマを型安全に管理できる |
| npm | 11.x | Node.js v24.11.0に標準搭載。package-lock.jsonによる依存関係の厳密な固定が可能 |

### フレームワーク・ライブラリ

| 技術 | バージョン | 用途 | 選定理由 |
|------|-----------|------|----------|
| Vite | 6.x | ビルドツール・開発サーバー | 高速なHMR・静的サイト生成対応・Markdownプラグインエコシステムが充実 |
| Tailwind CSS | 3.x | スタイリング | `dark:` クラスによるダーク/ライトモード・レスポンシブ対応が宣言的に実装できる |
| React | 19.x | UIフレームワーク | コンポーネント単位での状態管理・i18nコンテキスト・テーマコンテキストの管理 |
| react-router-dom | 7.x | URLルーティング | `/ja/` と `/en/` のパスベース言語ルーティングを実現 |
| remark + rehype | 15.x / 13.x | Markdownパーサー | Markdownブログ記事をHTMLに変換。remark-gfm でGitHub Flavored Markdown対応 |
| rehype-sanitize | 6.x | XSSサニタイズ | Markdownから生成されたHTMLの危険タグ・属性を除去 |
| gray-matter | 4.x | フロントマターパーサー | Markdownファイルのメタデータ（タイトル・日付・カテゴリ等）を安全に抽出 |
| @formspree/react | 2.x | お問い合わせフォーム | 静的サイトでのフォーム送信。サーバー不要でスパムフィルタ付き |

### 開発ツール

| 技術 | バージョン | 用途 | 選定理由 |
|------|-----------|------|----------|
| ESLint | 9.x | 静的解析 | TypeScript対応ルールセットでコード品質を保証 |
| Prettier | 3.x | コードフォーマッター | チーム内でのスタイル統一、EditorConfigと連携 |
| Vitest | 2.x | ユニットテスト | Viteと同一設定ファイルを共有でき、セットアップコストが低い |
| GitHub Actions | - | CI/CD | プッシュ時に自動ビルド・テスト・GitHub Pagesへのデプロイを実行 |

---

## アーキテクチャパターン

### 静的サイト生成（SSG）パターン

本サービスはバックエンドサーバーを持たない静的サイトとして設計する。

```
┌──────────────────────────────────────────┐
│               ビルドフェーズ               │
│  TypeScript/Markdownソース                │
│       ↓                                  │
│  Vite（ビルドツール）                      │
│       ↓                                  │
│  dist/ （静的HTML/CSS/JS）               │
└──────────────────────────────────────────┘
           ↓ GitHub Actionsでデプロイ
┌──────────────────────────────────────────┐
│              ランタイムフェーズ             │
│  GitHub Pages（CDN）                     │
│       ↓ HTTPSリクエスト                  │
│  ブラウザ                                 │
│  ├─ React（クライアントサイドルーティング）  │
│  ├─ i18nコンテキスト（言語管理）           │
│  ├─ テーマコンテキスト（ダーク/ライト）     │
│  └─ Formspree API（フォーム送信のみ外部）  │
└──────────────────────────────────────────┘
```

### GitHub Pages での SPA ルーティング対応

Vite の `vite build` は `index.html` 1枚 + JS バンドルの SPA として出力する。GitHub Pages はサーバーサイドのリライトルールを設定できないため、ユーザーが `/ja/about` に直接アクセスすると 404 が発生する。

**採用方針: `public/404.html` フォールバック方式**

```
public/
└── 404.html  ← index.html と同一内容をコピー配置
```

GitHub Pages は存在しないパスに対して `404.html` をサーブする仕様を利用し、React Router がクライアント側でルーティングを引き継ぐ。これにより直接URLアクセス・リロード時でも正しくページが表示される。

> ⚠️ `HashRouter`（URL が `/#/ja/about` 形式）は SEO・リンク共有に不利なため採用しない。

---

### コンポーネントレイヤー構造

```
┌─────────────────────────────────┐
│   ページレイヤー（pages/）        │ ← ルートごとの組み立て
├─────────────────────────────────┤
│   コンポーネントレイヤー           │ ← 再利用可能なUI部品
│   (components/)                  │
├─────────────────────────────────┤
│   データレイヤー                  │ ← 型付き静的データ
│   (data/, locales/, posts/)      │
└─────────────────────────────────┘
```

**依存ルール**:
- ページ → コンポーネント → データ（一方向）
- コンポーネントはページに依存しない
- データレイヤーはUIに依存しない

---

## ディレクトリ構造

```
project-root/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions ビルド・デプロイ
│
├── public/
│   ├── favicon.ico
│   └── images/                 # 最適化済み静的画像
│
├── src/
│   ├── main.tsx                # Reactエントリーポイント
│   ├── App.tsx                 # ルーター設定
│   │
│   ├── types/
│   │   └── index.ts            # Skill / Product / BlogPost 型定義
│   │
│   ├── data/
│   │   ├── skills.ts           # スキルデータ（Skill[]）
│   │   └── products.ts         # 成果物データ（Product[]）
│   │
│   ├── locales/
│   │   ├── ja.json             # 日本語UIテキスト
│   │   └── en.json             # 英語UIテキスト
│   │
│   ├── posts/
│   │   ├── ja/
│   │   │   └── YYYY-MM-DD-{slug}.md   # 日本語記事
│   │   └── en/
│   │       └── YYYY-MM-DD-{slug}.md   # 英語記事
│   │
│   ├── lib/
│   │   ├── i18n.ts             # 言語検出・切り替えロジック
│   │   ├── theme.ts            # テーマ検出・切り替えロジック
│   │   └── blog.ts             # Markdown読み込み・変換ユーティリティ
│   │
│   ├── contexts/
│   │   ├── I18nContext.tsx     # 言語コンテキスト（Provider + hook）
│   │   └── ThemeContext.tsx    # テーマコンテキスト（Provider + hook）
│   │
│   ├── pages/
│   │   └── [lang]/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Products.tsx
│   │       ├── blog/
│   │       │   ├── BlogList.tsx
│   │       │   └── BlogDetail.tsx
│   │       └── Contact.tsx
│   │
│   └── components/
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
├── index.html                  # Viteエントリーポイント
├── vite.config.ts
├── vitest.config.ts            # Vitestテスト設定（カバレッジ閾値含む）
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── rules/                      # 永続ドキュメント（設計・ガイドライン）
├── .steering/                  # 作業単位ドキュメント（タスク計画）
└── public/
    └── 404.html                # SPA ルーティング用フォールバック（index.html と同内容）
```

---

## データ永続化戦略

### ストレージ方式

| データ種別 | ストレージ | フォーマット | 理由 |
|-----------|----------|-------------|------|
| スキルデータ | Gitリポジトリ（ソースコード） | TypeScript | 型安全・コードと同期して管理 |
| 成果物データ | Gitリポジトリ（ソースコード） | TypeScript | 型安全・コードと同期して管理 |
| ブログ記事 | Gitリポジトリ（ソースコード） | Markdown + フロントマター | 執筆体験が良く、バージョン管理が容易 |
| UIテキスト（i18n） | Gitリポジトリ（ソースコード） | JSON | シンプルで翻訳ツールとの互換性が高い |
| ユーザー設定（言語・テーマ） | ブラウザ localStorage | JSON文字列 | サーバー不要・ページをまたいで永続化 |
| フォーム送信データ | Formspree（外部サービス） | - | 静的サイトでのフォーム受信に特化 |

### バックアップ戦略

静的サイトのため、すべてのコンテンツはGitリポジトリで管理される。

- **バックアップ媒体**: GitHub（リモートリポジトリ）
- **頻度**: コミット・プッシュのたびに自動的にバックアップ
- **復元方法**: `git checkout <commit>` で任意の時点に戻せる

---

## パフォーマンス要件

### ページロード時間

| 指標 | 目標値 | 測定方法 |
|------|-------|---------|
| Lighthouse Performance | 90点以上 | Chrome DevTools Lighthouse |
| First Contentful Paint (FCP) | 1.5秒以内 | Lighthouse / Web Vitals |
| Largest Contentful Paint (LCP) | 2.5秒以内 | Lighthouse / Web Vitals |
| Cumulative Layout Shift (CLS) | 0.1以下 | Lighthouse / Web Vitals |
| Interaction to Next Paint (INP) | 200ms以内 | Lighthouse / Web Vitals（2024年3月よりFIDに代わるCore Web Vital） |
| Time to First Byte (TTFB) | 600ms以内 | Lighthouse / Web Vitals |

### ビルド時間

| 指標 | 目標値 | 備考 |
|------|-------|------|
| 通常ビルド（`npm run build`） | 60秒以内 | 記事100件以下の想定 |
| GitHub Actions デプロイ完了 | 3分以内 | ビルド + GitHub Pages反映まで |

### リソース使用量

| リソース | 上限 | 理由 |
|---------|------|------|
| バンドルサイズ（JS合計） | 300KB（gzip後） | 初期ロードのパフォーマンス確保 |
| 画像1枚あたり | 200KB以下 | WebP形式・リサイズで最適化 |

---

## セキュリティアーキテクチャ

### 機密情報管理

```bash
# 環境変数（GitHub Actionsのシークレット or .env.localに設定）
VITE_FORMSPREE_ENDPOINT=xabc1234   # FormspreeのフォームID（公開可だが分離して管理）
```

- `.env.local` は `.gitignore` に追加し、リポジトリにコミットしない
- GitHub ActionsではRepository Secretsとして設定

### 入力検証（フォーム）

```typescript
// ContactForm のバリデーションルール
const VALIDATION_RULES = {
  name:    { required: true,  minLength: 1,   maxLength: 100 },
  email:   { required: true,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone:   { required: false, pattern: /^[\d\-\+\(\)\s]+$/ }, // 任意
  message: { required: true,  minLength: 10,  maxLength: 2000 },
};
```

### スパム対策

```html
<!-- honeypotフィールド: CSSで非表示にし、ボットが入力したら送信ブロック -->
<input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off" />
```

### XSS対策

- Markdownから生成されたHTMLは `rehype-sanitize` でサニタイズ
- React の JSX はデフォルトでエスケープ済み。`dangerouslySetInnerHTML` の使用はブログ本文のみに限定し、サニタイズ済みHTMLのみを渡す

### Content Security Policy（CSP）

`index.html` に以下のメタタグを設定する:

```html
<meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self';
    style-src 'self' 'unsafe-inline';  /* Tailwind CSS のユーティリティクラスに nonce 非対応のため */
    img-src 'self' data: https:;
    connect-src 'self' https://formspree.io https://rsms.me;
    font-src 'self' https://rsms.me;
    frame-src 'none';      /* クリックジャッキング防止（GitHub Pages は X-Frame-Options 設定不可のため） */
    object-src 'none';     /* Flash等のプラグイン無効化 */
    base-uri 'self';       /* <base> タグ注入防止 */
  ">
```

---

## スケーラビリティ設計

### ブログ記事増加への対応

- **想定記事数**: 最大500件（週1本×約10年）
- **パフォーマンス劣化対策**: ビルド時にページネーション（1ページあたり10件）を適用
- **フィルタリング最適化**: ビルド時にカテゴリ・タグのインデックスを生成し、クライアントでの絞り込みをO(1)に近づける

```typescript
// ビルド時に生成するインデックス例
interface BlogIndex {
  byCategory: Record<BlogCategory, string[]>;  // category → slug[]
  byTag: Record<string, string[]>;             // tag → slug[]
  allSlugs: string[];
}
```

### 機能拡張性

- スキル・成果物データの追加: `src/data/skills.ts` と `src/data/products.ts` を編集するだけで追加可能
- i18nの追加言語対応: `src/locales/{lang}.json` を追加し、ルーティング設定を更新
- ブログカテゴリの追加: `BlogCategory` 型と `locales/*.json` の `categories` を更新

---

## CI/CDパイプライン

```yaml
# .github/workflows/deploy.yml の概略
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check    # TypeScriptの型チェック
      - run: npm run lint          # ESLintチェック
      - run: npm run test          # Vitestユニットテスト
      - run: npm run build         # Viteビルド
        env:
          VITE_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**デプロイURL**: `https://HarutarouKawamoto.github.io/`

---

## テスト戦略

### ユニットテスト（Vitest）
- **対象**: `src/lib/` 配下のユーティリティ関数（言語検出・テーマ検出・フォームバリデーション・ブログフィルタリング）
- **カバレッジ目標**: ロジック関数のステートメントカバレッジ 80%以上

### 型チェック（TypeScript）
- `npm run type-check`（`tsc --noEmit`）をCI必須ステップとして組み込む
- データファイル（skills.ts, products.ts）の型整合性を静的に保証

### リント（ESLint）
- `npm run lint` をCI必須ステップとして組み込む
- `react-hooks/rules-of-hooks` ルールを有効化

### E2Eテスト（手動確認）
| 確認項目 | 確認頻度 | 対象ブラウザ |
|---------|---------|------------|
| 言語切り替えで全ページのテキストが変わること | リリース前 | Chrome / Firefox / Safari (iOS) |
| ダーク/ライトモード切り替えが機能すること | リリース前 | Chrome / Firefox / Safari (iOS) |
| お問い合わせフォームの送信が完了すること | リリース前 | Chrome |
| Lighthouse スコアが 90点以上であること | リリース前 | Chrome |
| モバイル（375px）でレイアウトが崩れないこと | リリース前 | Chrome / Safari (iOS) |

---

## 技術的制約

### 環境要件
- **開発環境OS**: Windows / macOS / Linux
- **Node.jsバージョン**: v24.11.0以上
- **ブラウザサポート**: モダンブラウザ（Chrome/Firefox/Safari/Edge の最新2バージョン）
- **外部依存**: Formspree アカウント（お問い合わせフォーム機能に必須）

### 静的サイトの制約
- サーバーサイド処理なし（認証・データベース不可）
- フォーム送信は外部サービス（Formspree）に依存
- コメント機能・リアルタイム機能はスコープ外
- BrowserRouter 直接URL アクセス問題: `public/404.html` に SPA フォールバックとして `index.html` を配置することで対処（詳細はアーキテクチャパターンセクション参照）

### パフォーマンス制約
- GitHub Pages の帯域制限（月100GB、ソフトリミット）に注意
- 1記事あたりの画像は3枚以下を推奨（ページサイズ管理のため）

---

## 依存関係管理

| ライブラリ | 用途 | バージョン管理方針 |
|-----------|------|-------------------|
| react | UIフレームワーク | `^19.0.0`（マイナーまで許可） |
| react-dom | DOMレンダリング | react と同一バージョンに固定 |
| react-router-dom | URLルーティング | `^7.0.0` |
| tailwindcss | スタイリング | `^3.0.0` |
| vite | ビルドツール | `^6.0.0` |
| remark | Markdownパーサー | `^15.0.0` |
| rehype | HTMLトランスパイラー | `^13.0.0` |
| rehype-sanitize | XSSサニタイズ | `^6.0.0` |
| gray-matter | フロントマターパーサー | `^4.0.0` |
| @formspree/react | フォーム送信 | `^2.0.0` |
| typescript | 型チェック（dev） | `~5.8.0`（パッチのみ自動） |
| vitest | テスト（dev） | `^2.0.0` |
| eslint | 静的解析（dev） | `^9.0.0` |
