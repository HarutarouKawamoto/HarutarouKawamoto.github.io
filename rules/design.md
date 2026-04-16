# UI デザインガイドライン (Design Guidelines)

このドキュメントは、HarutarouKawamoto Portfolio の洗練されたモダンなUIを構築するためのデザイン要件とスタイリングルールです。
UIコンポーネント・スタイル生成を行う際は、Claude Code はこのドキュメントのルールを**厳守**してください。

---

## 1. カラーパレット

### ブランドカラー（4色）

| 名前 | 16進数 | 用途 |
|------|--------|------|
| **モデルブルー** | `#0B5FB1` | プライマリ（ボタン・リンク・強調） |
| **スプリングスカイ** | `#2DB1EA` | プライマリライト（ホバー・グラデーション・ダークモードのプライマリ） |
| **クリームシクル** | `#EE9330` | アクセント（CTAボタン・バッジ・ハイライト） |
| **クリスティーン** | `#E97406` | アクセントダーク（ホバー・ダークモードのアクセント） |

### WCAG AA コントラスト比確認

| 組み合わせ | コントラスト比 | AA適合（4.5:1） |
|-----------|--------------|----------------|
| モデルブルー (#0B5FB1) + 白テキスト | 6.0:1 | ✅ |
| スプリングスカイ (#2DB1EA) + 白テキスト | 2.9:1 | ❌ |
| スプリングスカイ (#2DB1EA) + neutral-950テキスト | 7.2:1 | ✅ |
| クリームシクル (#EE9330) + 白テキスト | 2.5:1 | ❌ |
| クリームシクル (#EE9330) + neutral-950テキスト | 8.3:1 | ✅ |
| クリスティーン (#E97406) + 白テキスト | 3.0:1 | ❌ |
| クリスティーン (#E97406) + neutral-950テキスト | 7.0:1 | ✅ |

> **重要**: アクセントカラー（クリームシクル・クリスティーン）やスプリングスカイを背景に使う場合は、テキストに `text-white` ではなく `text-neutral-950` を使用すること。

### カラーの使用方針

- **プライマリカラー（青系）**: ナビゲーション、CTAボタン（メイン）、リンク、選択状態、Skillsの熟練度バー
- **アクセントカラー（オレンジ系）**: 注目を集める要素（Featured バッジ、特定のCTAボタン、ステータス「開発中」タグ）
- **ダークモード**: ライトモードのモデルブルーをスプリングスカイに、クリスティーンをクリームシクルにシフトして視認性を確保
- **インディゴ・スレート系グレーは使用禁止**（後述）

### Tailwind CSS カスタムカラー設定

`tailwind.config.ts` に以下を必ず設定する。コンポーネントでは `bg-primary` / `bg-accent` 等のセマンティックな名前を使用し、16進数のハードコードは禁止。

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // プライマリ（青系）
        primary: {
          DEFAULT: '#0B5FB1',  // モデルブルー
          light:   '#2DB1EA',  // スプリングスカイ
        },
        // アクセント（オレンジ系）
        accent: {
          DEFAULT: '#EE9330',  // クリームシクル
          dark:    '#E97406',  // クリスティーン
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 使用例

```tsx
// プライマリボタン（ライト/ダーク対応）
<button className="bg-primary hover:bg-primary-light dark:bg-primary-light dark:hover:bg-primary text-white ...">
  お問い合わせ
</button>

// アクセントバッジ（WCAG AA: text-neutral-950 を使用）
<span className="bg-accent dark:bg-accent-dark text-neutral-950 ...">
  Featured
</span>

// プライマリリンク
<a className="text-primary dark:text-primary-light hover:underline ...">
  詳しく見る
</a>
```

---

## 2. タイポグラフィ

以下のルールは**必須**です。

### フォント指定

- **使用フォント**: `Inter` バリアブルフォント（rsms / Rasmus のウェブサイトから取得）
- **ディスプレイ設定**: display version を使用する。小文字「l（エル）」のテールが付いたバージョンは**使用禁止**
- **ウェイト**: Medium（500）・Semi-bold（600）に加えて `550` など中間ウェイトを積極活用

```html
<!-- index.html での読み込み例 -->
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```

```typescript
// tailwind.config.ts に追記
fontFamily: {
  sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
},
```

### 字間（トラッキング）

- **大見出し（24px〜）**: トラッキングを詰める → `tracking-tight`
- **セクション小見出し（アイブロウ）**: 等幅フォント（`font-mono`）・全大文字（`uppercase`）・トラッキング広め（`tracking-wider`）・グレー600（`text-neutral-600`）・`text-xs`

```tsx
// アイブロウ（セクション小見出し）の例
<p className="font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
  ABOUT ME
</p>

// 大見出し
<h1 className="text-4xl font-[550] tracking-tight text-neutral-950 dark:text-white">
  フロントエンドエンジニア
</h1>
```

### 見出し階層とスケール

| 要素 | Tailwind クラス | 用途 |
|------|----------------|------|
| `h1` | `text-4xl md:text-5xl font-[550] tracking-tight` | ページメイン見出し |
| `h2` | `text-2xl md:text-3xl font-[550] tracking-tight` | セクション見出し |
| `h3` | `text-xl font-semibold` | サブセクション・カード見出し |
| 本文 `p` | `text-base leading-7 text-neutral-700 dark:text-neutral-300` | 通常の本文 |
| キャプション | `text-sm text-neutral-500 dark:text-neutral-400` | 補足テキスト |

**ブログ記事本文**: `@tailwindcss/typography` の `prose` クラスを使用して整形する。ダークモード対応のため `dark:prose-invert` を必ず付与する。

```tsx
<article className="prose prose-neutral dark:prose-invert max-w-none">
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
</article>
```

### テキスト幅の制御

- 最大幅は固定ピクセルではなく文字数で指定する → `max-w-[40ch]`
- 不自然な折り返しや孤立した単語（orphaned word）を防ぐ:
  - 本文・リスト: `text-pretty`
  - CTAセクション・ヒーロー見出し: `text-balance`

---

## 3. カラー・ボーダー規約

以下のルールは**必須**です。

### グレーの選択

- **インディゴ・スレート（`slate-`）系のグレーは使用禁止**
- **ニュートラルグレー（`neutral-`）を使用する**

```tsx
// ✅ 正しい
<p className="text-neutral-600 dark:text-neutral-400">説明文</p>
<div className="bg-neutral-50 dark:bg-neutral-950">背景</div>

// ❌ 禁止
<p className="text-slate-600">説明文</p>
<p className="text-indigo-600">強調</p>  // ← ブランドカラーで代替
```

### ボーダーの描画

- ボタン・ナビバー・スクリーンショット枠に**単色の solid ボーダーを使用禁止**（シャドウと混ざり濁った印象になる）
- 代わりに**不透明度10% のグレー950 のアウターリング**を使用する

```tsx
// ✅ 正しい: アウターリング
<button className="ring-1 ring-neutral-950/10 shadow-sm ...">
  ボタン
</button>

// ❌ 禁止: solid ボーダー
<button className="border border-neutral-300 ...">
  ボタン
</button>
```

### 背景コンテナ（Well Treatment）

- 装飾的な背景（スクリーンショット・カード背景）: **不透明度5% のグレー950**

```tsx
<div className="bg-neutral-950/5 dark:bg-white/5 rounded-xl p-4">
  {/* スクリーンショット・コード等 */}
</div>
```

---

## 4. レイアウト・構成

以下のルールは**必須**です。

### 脱・全中央揃え

- すべてを中央揃えにしない。見出し・本文は左揃えを基本とする
- ランディングページのヒーローセクションなど特定の場所のみ中央揃えを使用

### ヒーローセクションの分割レイアウト

- 見出し（左）: `w-3/5` 相当
- サポートテキスト（右）: `w-2/5` 相当
- 左右のテキスト上端を揃える（`items-start`）

```tsx
<section className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
  <div className="flex-[3]">
    <h1 className="text-4xl md:text-5xl font-[550] tracking-tight text-balance">
      フロントエンドエンジニア
    </h1>
  </div>
  <div className="flex-[2] md:pt-1">
    <p className="text-neutral-600 dark:text-neutral-400 text-pretty max-w-[40ch]">
      TypeScript・React を中心に、使いやすく美しいUIを作ることが好きです。
    </p>
  </div>
</section>
```

### インライン見出し（Feature セクション）

- タイトルとサポートテキストを同じフォントサイズ（`text-xl` / 約20px）にして1つのインラインブロックとして読めるようにする
- サポートテキストは Medium ウェイト（`font-medium`）のグレー600（`text-neutral-600`）

```tsx
<h3 className="text-xl font-semibold text-neutral-950 dark:text-white inline">
  カテゴリ別スキル管理。
</h3>
<span className="text-xl font-medium text-neutral-600 dark:text-neutral-400 inline">
  言語・フレームワーク・ツールを整理して、熟練度を可視化。
</span>
```

### キャンバスグリッド（装飾的ボーダー）

- サイト全体を囲む視覚的ギミックとしてセクションを区切るボーダーを追加
- 水平ボーダー: ビューポート全幅（`w-screen` 相当）に伸ばす
- 垂直ボーダー: コンテンツを囲むように配置
- コンテナとボーダーの間: `8px` の隙間

```tsx
// キャンバスグリッドの実装パターン
<div className="relative mx-auto max-w-5xl px-2">
  {/* 垂直ボーダー */}
  <div className="pointer-events-none absolute inset-y-0 left-2 w-px bg-neutral-950/10 dark:bg-white/10" />
  <div className="pointer-events-none absolute inset-y-0 right-2 w-px bg-neutral-950/10 dark:bg-white/10" />
  {/* コンテンツ */}
  <div className="px-8">
    {children}
  </div>
</div>
```

---

## 5. UIコンポーネント詳細

### ボタン（Buttons）

- **形状**: ピル型（`rounded-full`）
- **高さ**: 固定値（`h-`）は使用禁止。パディングで約38pxの高さになるよう調整（`py-2 px-5` 程度）
- **不要なアイコン**: ボタン内の装飾アイコンは削除してクリーンに保つ
- **セカンダリボタン**: 小さなシャドウ（`shadow-sm`）+ 10% opacity アウターリング。ボーダーによる2pxのズレ防止のため `inline-flex p-px` の span でラップ

```tsx
// プライマリボタン（モデルブルー→スプリングスカイ）
<button className="rounded-full bg-primary hover:bg-primary-light dark:bg-primary-light dark:hover:bg-primary text-white py-2 px-5 text-sm font-[550] transition-colors">
  お問い合わせ
</button>

// アクセントボタン（WCAG AA: クリームシクルに白テキストは2.5:1のため text-neutral-950 を使用）
<button className="rounded-full bg-accent hover:bg-accent-dark text-neutral-950 py-2 px-5 text-sm font-[550] transition-colors">
  作品を見る
</button>

// セカンダリボタン（ズレ防止のラップ構造）
<span className="inline-flex rounded-full p-px shadow-sm ring-1 ring-neutral-950/10 dark:ring-white/10">
  <button className="rounded-full bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white py-2 px-5 text-sm font-[550]">
    詳しく見る
  </button>
</span>
```

### 画像・スクリーンショット（Images）

- ダミー画像は使用禁止。実際のスクリーンショットを使用し、特定機能にフォーカスするよう25%程度ズームしてクロップ
- 角丸はコンテナの角丸と**同心円状**になるよう計算する（コンテナ `rounded-xl` + 画像 `rounded-lg` など）
- 画像の上に**不透明度5% のグレー950 インセットリング**を配置して境界をはっきりさせる
- ヒーロー画像: コンテナ下部パディングをゼロにし、画像底面を10pxクロップして不要なグレーの縁を隠す

```tsx
// 画像コンテナ
<div className="relative rounded-xl overflow-hidden bg-neutral-950/5 dark:bg-white/5 p-2 pb-0">
  <img
    src="/images/product-demo.webp"
    alt="製品デモ画面"
    className="rounded-lg w-full object-cover"
    loading="lazy"
  />
  {/* インセットリング */}
  <div className="pointer-events-none absolute inset-2 rounded-lg ring-1 ring-inset ring-neutral-950/5 dark:ring-white/5" />
</div>
```

### ロゴクラウド（Logo Cloud）

- SVG画像を使用し、**不透明度は下げない**
- グレー950（`text-neutral-950 dark:text-white`）の**単色（100% opacity）**で表示
- コンテナの全幅を使用

```tsx
<div className="flex items-center justify-between w-full gap-8">
  <TechIcon className="h-6 text-neutral-950 dark:text-white" />
  {/* ... */}
</div>
```

### 統計データ（Stats）

- **左揃え**・コンテナ全幅を使用
- 数値: 通常ウェイト（`font-normal`）
- ラベル: `text-neutral-600 dark:text-neutral-400`
- 各項目の間にディバイダーを追加

```tsx
<dl className="flex items-center gap-0 divide-x divide-neutral-950/10 dark:divide-white/10">
  <div className="pr-8">
    <dt className="text-sm text-neutral-600 dark:text-neutral-400">投稿記事数</dt>
    <dd className="text-3xl font-normal text-neutral-950 dark:text-white">24</dd>
  </div>
  <div className="px-8">
    <dt className="text-sm text-neutral-600 dark:text-neutral-400">成果物</dt>
    <dd className="text-3xl font-normal text-neutral-950 dark:text-white">6</dd>
  </div>
</dl>
```

---

## 6. ダーク/ライトモード対応

- Tailwind の `darkMode: 'class'` を使用（`<html class="dark">` で切り替え）
- すべてのコンポーネントで `dark:` バリアントを必ず設定する

### ダークモードでのカラー対応表

| 用途 | ライトモード | ダークモード |
|------|------------|------------|
| プライマリカラー | `bg-primary` (#0B5FB1) | `dark:bg-primary-light` (#2DB1EA) |
| アクセントカラー | `bg-accent` (#EE9330) | `dark:bg-accent-dark` (#E97406) |
| テキスト（本文） | `text-neutral-950` | `dark:text-white` |
| テキスト（補助） | `text-neutral-600` | `dark:text-neutral-400` |
| 背景 | `bg-white` | `dark:bg-neutral-950` |
| カード背景 | `bg-neutral-50` | `dark:bg-neutral-900` |
| ボーダー/リング | `ring-neutral-950/10` | `dark:ring-white/10` |

---

## 7. レスポンシブ対応

- ブレークポイント: `sm:` (640px) / `md:` (768px) / `lg:` (1024px) / `xl:` (1280px)
- モバイルファーストで記述する（デフォルトがモバイル、`md:` 以上でデスクトップ）
- 最小サポート幅: **375px**（iPhone SE基準）

```tsx
// モバイルファーストの例
<div className="flex flex-col gap-4 md:flex-row md:gap-12">
  <h1 className="text-3xl md:text-5xl font-[550] tracking-tight">
    タイトル
  </h1>
</div>
```

---

## 8. アクセシビリティ

- インタラクティブ要素には `focus-visible:ring-2 focus-visible:ring-primary` を付与する
- 色だけで情報を伝えない（アイコン・テキストを併用する）
- コントラスト比: テキストと背景のコントラストは WCAG AA 基準（4.5:1）以上を維持する

```tsx
// フォーカスリングの例（ダークモードでは primary-light を使用）
<button className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950">
  送信
</button>
```

---

## 9. ページ別デザイン指針

### Homeページ（ヒーローセクション）

- ヒーロー: 左3/5（氏名・キャッチコピー）/ 右2/5（説明文・CTAボタン）の2カラム（モバイルでは縦積み `flex-col`）
- 見出しは `text-balance`、説明文は `text-pretty max-w-[40ch]`
- CTAボタンは2種類（プライマリ: モデルブルー、アクセント: クリームシクル）

### Aboutページ

- セクションアイブロウ: `font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400`
- 自己紹介文: `text-base leading-7 text-neutral-700 dark:text-neutral-300 text-pretty`
- 経歴タイムライン: 各エントリを縦のディバイダー線（`border-l border-neutral-950/10 dark:border-white/10 pl-4`）で区切る
- プロフィール画像: `rounded-xl ring-1 ring-neutral-950/10 dark:ring-white/10` でインセットリングを付与

### Skillsページ

- 熟練度バー: `bg-primary` でライトモード、`dark:bg-primary-light` でダークモード
- カテゴリ見出し（アイブロウ）: `font-mono uppercase tracking-wider text-xs text-neutral-600`

### Productsページ

- ステータスバッジ「完成」: `bg-neutral-950/10 text-neutral-950 dark:bg-white/10 dark:text-white`
- ステータスバッジ「開発中」: `bg-accent/20 text-accent-dark dark:bg-accent/10 dark:text-accent`

### Blogページ

- Featured バッジ: `bg-accent dark:bg-accent-dark text-neutral-950`（白テキストはAA不適合のため禁止）
- カテゴリバッジ: `bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light`

### Contactページ

- フォーム送信ボタン: プライマリボタン（モデルブルー）を使用
- 送信中状態: ボタンを `opacity-50 cursor-not-allowed` にして `disabled` 属性を付与
- 送信成功状態: フォームを非表示にし、`text-primary dark:text-primary-light font-[550]` で成功メッセージを表示
- 送信失敗状態: `text-red-600 dark:text-red-400` でエラーメッセージを表示
- honeypot フィールド: `className="hidden"` で非表示（スクリーンリーダーからも隠れるよう `aria-hidden="true"` を付与）

---

## 10. スペーシングスケール

Tailwind デフォルトスケールを使用する。ページ内のスペーシングは以下の基準で統一する。

| 用途 | クラス | px相当 |
|------|--------|--------|
| コンポーネント内要素間 | `gap-2` / `gap-4` | 8px / 16px |
| セクション内カード間 | `gap-6` | 24px |
| セクション間の余白 | `py-16` / `py-24` | 64px / 96px |
| コンテナ横パディング | `px-8` | 32px |
| コンテナ最大幅 | `max-w-5xl` | 1024px |

---

## 11. フォーム入力コンポーネント

```tsx
// 標準テキスト入力
<input
  className="
    w-full rounded-lg px-3 py-2
    bg-white dark:bg-neutral-900
    text-neutral-950 dark:text-white
    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
    ring-1 ring-neutral-950/10 dark:ring-white/10
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-primary dark:focus-visible:ring-primary-light
  "
/>

// 標準テキストエリア
<textarea
  className="
    w-full rounded-lg px-3 py-2 resize-y
    bg-white dark:bg-neutral-900
    text-neutral-950 dark:text-white
    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
    ring-1 ring-neutral-950/10 dark:ring-white/10
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-primary dark:focus-visible:ring-primary-light
  "
/>

// エラー状態の入力フィールド（通常スタイルの ring を ring-red-500 に切り替え）
<input
  className="
    w-full rounded-lg px-3 py-2
    bg-white dark:bg-neutral-900
    text-neutral-950 dark:text-white
    ring-1 ring-red-500 dark:ring-red-400
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-red-500 dark:focus-visible:ring-red-400
  "
  aria-invalid="true"
/>

// エラーメッセージ
<p className="mt-1 text-sm text-red-600 dark:text-red-400">
  入力内容を確認してください
</p>
```

---

## 12. カード・グリッドレイアウト

```tsx
// 標準カード
<article className="
  rounded-xl overflow-hidden
  bg-white dark:bg-neutral-900
  ring-1 ring-neutral-950/10 dark:ring-white/10
  shadow-sm
">
  {/* カード内容 */}
</article>

// カードグリッド（3カラム）
<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <li key={item.id}>
      {/* カード */}
    </li>
  ))}
</ul>
```

---

## 13. ナビゲーションバー

```tsx
// ナビゲーションバー（ガラスモーフィズム対応）
<nav className="
  sticky top-0 z-50
  bg-white/80 dark:bg-neutral-950/80
  backdrop-blur-sm
  ring-1 ring-neutral-950/10 dark:ring-white/10
">
  <div className="mx-auto max-w-5xl px-8 flex items-center justify-between h-14">
    {/* ロゴ */}
    <a className="text-sm font-[550] text-neutral-950 dark:text-white">
      HarutarouKawamoto
    </a>
    {/* ナビリンク */}
    <div className="flex items-center gap-6">
      <a className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
        About
      </a>
      {/* ... */}
    </div>
    {/* テーマ・言語切り替えボタン */}
  </div>
</nav>
```
