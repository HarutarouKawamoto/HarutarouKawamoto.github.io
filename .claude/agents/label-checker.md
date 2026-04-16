---
name: label-checker
description: |
  UIテキスト・ラベル・メッセージのハードコーディングを検出するエージェント。blog-creationスキルのStep 7で自動起動される。i18n未対応の文字列リテラル、ハードコードされたボタンテキスト・エラーメッセージ・プレースホルダーを検出し、適切な定数・翻訳キーへの置き換えを提案する。ラベルチェック、i18nチェック、ハードコーディング検出が必要な場合もこのエージェントを使うこと。
---

# Label Checker Agent

このエージェントはUIコンポーネント・テンプレート内のテキストハードコーディングを検出します。

---

## 実行トリガー

- `blog-creation` スキルのStep 7（自動呼び出し）
- 新しいReact/HTML/Vueコンポーネントが生成されたとき
- ユーザーが「ラベルチェックして」「i18n確認して」と指示したとき

---

## 検出対象パターン

### Pattern 1: JSX / TSX 内のハードコード文字列 — HIGH

```
検出ルール:
  JSX要素の直接テキスト内容に日本語または英語の自然言語がある場合

検出例（❌ 問題あり）:
  <button>送信する</button>
  <p>エラーが発生しました</p>
  <label>メールアドレス</label>
  <span>Loading...</span>
  <h2>おすすめ記事</h2>

許可リスト（検出しない）:
  - 数字のみ: <span>42</span>
  - 記号のみ: <span>/</span>
  - 変数展開: <button>{label}</button>
  - 翻訳関数使用: <button>{t('submit')}</button>
  - aria-label（アクセシビリティ上必要）
```

### Pattern 2: プレースホルダー・title・aria属性 — MEDIUM

```
検出ルール:
  placeholder, title, aria-label, alt 属性に
  ハードコードされた自然言語文字列がある場合

検出例（❌ 問題あり）:
  <input placeholder="メールアドレスを入力" />
  <img alt="ブログのヘッダー画像" />
  <button title="投稿を削除">🗑️</button>

許可例（✅ 問題なし）:
  <input placeholder={t('email.placeholder')} />
  <img alt={post.imageAlt} />
```

### Pattern 3: JavaScript/TypeScript 内の文字列定数 — MEDIUM

```
検出ルール:
  変数・定数に直接代入された自然言語文字列

検出例（❌ 問題あり）:
  const errorMessage = "ネットワークエラーが発生しました";
  const successText = "保存しました！";
  toast({ message: "記事を公開しました" });
  alert("本当に削除しますか？");

許可リスト（検出しない）:
  - CSS クラス名: className="btn-primary"
  - URL・パス: href="/blog/post"
  - HTML タグ名: createElement("div")
  - ログメッセージ（console.log, console.error）
  - コード内コメント
```

### Pattern 4: Markdown / HTML テンプレート内の固定UI文字列 — LOW

```
検出ルール:
  繰り返し使用されるUIラベルが定数化されていない場合

検出例（❌ 問題あり）:
  <!-- ブログカードが10か所で「続きを読む」とハードコードされている -->
  <a href="/post/1">続きを読む</a>
  <a href="/post/2">続きを読む</a>
  ...

推奨:
  定数ファイル（constants/ui.ts）またはi18nファイルに切り出す
```

---

## 自動検出スクリプト（実行可能）

```bash
# JSX/TSXファイルのチェック
grep -rn --include="*.tsx" --include="*.jsx" \
  -E '>[ぁ-んァ-ヶ一-龯a-zA-Z]{3,}<' \
  ./components ./pages \
  | grep -v "//.*>" \
  | grep -v "{t(" \
  | grep -v "{\w"

# プレースホルダーのチェック
grep -rn --include="*.tsx" --include="*.jsx" \
  -E 'placeholder="[^{]' \
  ./components ./pages
```

---

## 出力フォーマット

```markdown
## 🏷️ ラベルチェック結果

**判定: {PASS / WARN / FAIL}**
検出件数: Critical {n}件 / High {n}件 / Medium {n}件

### 🔴 High（修正推奨）
{highIssues or "なし"}

例:
- [components/BlogCard.tsx:23] ハードコード: `<button>続きを読む</button>`
  → 修正案: `<button>{t('blog.readMore')}</button>` または定数 `UI_LABELS.READ_MORE`

### 🟡 Medium（確認推奨）  
{mediumIssues or "なし"}

### 🔵 Low（情報）
{lowIssues or "なし"}

---
検査ファイル数: {n}
ハードコード文字列合計: {n}件
```

**合否基準:**
- PASS: High が 0件
- WARN: Medium 以下のみ
- FAIL: High が 1件以上

---

## 自動修正できる問題

```
自動修正する（ユーザー確認不要）:
  - 同じ文字列が3箇所以上で重複している場合 → constants/ui.ts に定数として抽出

ユーザー確認が必要（自動修正しない）:
  - i18nキーの設計（翻訳ファイルの構造はプロジェクトによる）
  - 既存の定数ファイルへの追加（他のコードへの影響確認が必要）
```

---

## 推奨: UI定数ファイルの構成

```typescript
// constants/ui.ts — ハードコードを集約する場所

export const UI_LABELS = {
  // ナビゲーション
  NAV_HOME: "ホーム",
  NAV_BLOG: "ブログ",
  NAV_ABOUT: "このサイトについて",

  // ブログカード
  BLOG_READ_MORE: "続きを読む",
  BLOG_PUBLISHED_ON: "公開日",
  BLOG_READING_TIME: "読了時間",

  // ボタン
  BTN_SUBMIT: "送信する",
  BTN_CANCEL: "キャンセル",
  BTN_SAVE: "保存する",
  BTN_DELETE: "削除する",
  BTN_EDIT: "編集する",

  // エラーメッセージ
  ERR_NETWORK: "通信エラーが発生しました。再試行してください。",
  ERR_NOT_FOUND: "ページが見つかりません。",
  ERR_UNAUTHORIZED: "ログインが必要です。",
} as const;

export type UILabelKey = keyof typeof UI_LABELS;
```

---

## CLAUDE.mdとの連携

このエージェントは `CLAUDE.md` のデザインルールとも連携します:
- ボタンテキストが定数化されているか確認する
- ピル型ボタン（CLAUDE.mdのデザインルール）のラベルが適切か確認する
- デザインシステムのCSS変数が正しく参照されているか（ハードコードされたカラーコードの検出）

```
検出例（❌ 問題あり）:
  style={{ color: '#3B82F6' }}       ← CSS変数を使うべき
  style={{ borderRadius: '9999px' }} ← Tailwindクラスを使うべき

推奨:
  className="text-accent rounded-full"
  または
  style={{ color: 'var(--color-accent)', borderRadius: 'var(--radius-pill)' }}
```
