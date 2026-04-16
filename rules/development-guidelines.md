# 開発ガイドライン (Development Guidelines)

## コーディング規約

### 命名規則

#### 変数・関数（TypeScript）

```typescript
// ✅ 良い例
const currentLang: Lang = detectInitialLanguage();
function filterPostsByCategory(posts: BlogPost[], category: BlogCategory): BlogPost[] {}

// ❌ 悪い例
const l = detect();
function filter(arr: any[]): any[] {}
```

**原則**:
- 変数: camelCase、名詞または名詞句
- 関数: camelCase、動詞始まり
- 定数（モジュールスコープ）: `UPPER_SNAKE_CASE`
- Boolean: `is`, `has`, `should` で始める（例: `isDarkMode`, `hasTranslation`）

#### コンポーネント・型定義（React/TypeScript）

```typescript
// Reactコンポーネント: PascalCase
export function SkillCard({ skill }: SkillCardProps) {}
export function BlogCard({ post, lang }: BlogCardProps) {}

// インターフェース: PascalCase（I接頭辞なし）
interface Skill { id: string; name: string; category: SkillCategory; }
interface BlogCardProps { post: BlogPost; lang: Lang; }

// 型エイリアス: PascalCase
type BlogCategory = 'Featured' | 'New' | 'Learn' | 'Enjoy' | 'Real';
type Lang = 'ja' | 'en';
```

#### ファイル名

| 種別 | 規則 | 例 |
|------|------|-----|
| Reactコンポーネント | PascalCase + `.tsx` | `SkillCard.tsx`, `Navigation.tsx` |
| ページコンポーネント | PascalCase + `.tsx`（`src/pages/[lang]/` 以下） | `src/pages/ja/Home.tsx` |
| Reactコンテキスト | PascalCase + `Context.tsx` | `I18nContext.tsx`, `ThemeContext.tsx` |
| ユーティリティ関数 | camelCase + `.ts` | `i18n.ts`, `blog.ts` |
| 静的データファイル | camelCase + `.ts` | `skills.ts`, `products.ts` |
| ブログ記事 | `YYYY-MM-DD-{kebab-slug}.md` | `2026-04-16-hello-world.md` |
| 翻訳ファイル | ISO 639-1言語コード + `.json` | `ja.json`, `en.json` |

---

### コードフォーマット

- **インデント**: 2スペース
- **行の長さ**: 最大100文字
- **セミコロン**: あり
- **クォート**: シングルクォート（JSX属性はダブル）
- **末尾カンマ**: あり（ES5互換箇所）

Prettierで自動統一する。`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`prettier-plugin-tailwindcss` を `devDependencies` に追加すること（Tailwind クラスの自動整列に必要）:

---

### コメント規約

**インラインコメント — 「なぜ」を書く**:
```typescript
// ✅ 良い例: 理由を説明
// localStorageに保存がない場合、ブラウザ言語を優先する（サーバーサイドがないため）
const lang = localStorage.getItem('lang') ?? detectBrowserLang();

// ❌ 悪い例: コードをなぞるだけ
// lang に lang を設定する
const lang = localStorage.getItem('lang');
```

**複雑なロジックにのみコメントを追加**する。自明なコードにコメントは不要。

**TODO / FIXME**:
```typescript
// TODO: OGP画像の自動生成 (Post-MVP)
// FIXME: iOSサファリで言語切り替え後にスクロール位置がリセットされる
```

---

### React コンポーネント規約

**コンポーネントの記述順序**:
```typescript
// 1. 型定義
interface SkillCardProps {
  skill: Skill;
}

// 2. コンポーネント本体（関数コンポーネント）
export function SkillCard({ skill }: SkillCardProps) {
  // 3. フック（useXxx）
  const { t } = useI18n();

  // 4. 派生値・計算
  const showLevel = skill.category === 'language' && skill.level !== undefined;

  // 5. イベントハンドラ
  // （今回は不要）

  // 6. JSX return
  return (
    <div className="...">
      {/* ... */}
    </div>
  );
}
```

**Propsの渡し方**:
```typescript
// ✅ 良い例: 必要なデータだけ渡す
<ProductCard product={product} lang={lang} />

// ❌ 悪い例: 全データを渡す
<ProductCard data={allData} />
```

**条件付きレンダリング**:
```typescript
// ✅ 短い条件: && 演算子
{showLevel && <SkillLevelBar level={skill.level!} />}

// ✅ 長い条件: 三項演算子または早期return
{isDarkMode ? <SunIcon /> : <MoonIcon />}
```

---

### エラーハンドリング

**UIコンポーネント（フォーム）**:
```typescript
// バリデーションエラーはインラインフィードバックで表示
const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

function validate(values: FormValues): boolean {
  const newErrors: typeof errors = {};
  if (!values.name.trim()) newErrors.name = 'お名前を入力してください';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    newErrors.email = 'メールアドレスの形式が正しくありません';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}
```

**外部API呼び出し（Formspree）**:
```typescript
// 送信成功・失敗をstateで管理し、UIにフィードバック
const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

try {
  const res = await fetch(endpoint, { method: 'POST', body: JSON.stringify(values) });
  if (!res.ok) throw new Error('送信失敗');
  setSubmitState('success');
} catch {
  setSubmitState('error');
}
```

---

### Tailwind CSS 規約

**クラスの記述順序**（Prettier Tailwind プラグインで自動整列）:
1. レイアウト（`flex`, `grid`, `block`）
2. サイズ（`w-`, `h-`）
3. スペーシング（`p-`, `m-`）
4. 色（`bg-`, `text-`）
5. ダークモード対応（`dark:`）
6. レスポンシブ（`sm:`, `md:`, `lg:`）

```tsx
// ✅ 例
<div className="flex items-center gap-4 p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg">
```

**カスタムカラーは `tailwind.config.ts` に定義**:
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#3B82F6', dark: '#60A5FA' },
    }
  }
}
// コンポーネントでは bg-primary を使用（ハードコード禁止）
```

---

### ESLint 規約

ESLint 9.x では設定ファイルが **Flat Config 形式**（`eslint.config.js`）に変わっている。古い `.eslintrc.json` は使用しない。

**`eslint.config.js` の最小構成例**:
```js
// eslint.config.js（ESLint 9.x Flat Config形式）
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    plugins: { 'react-hooks': reactHooks, '@typescript-eslint': tseslint },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
```

**有効化する主要ルール**:

| ルール | 目的 |
|--------|------|
| `react-hooks/rules-of-hooks` | Hooksをループ・条件分岐内で呼ばないことを保証 |
| `react-hooks/exhaustive-deps` | `useEffect` の依存配列の漏れを検出 |
| `@typescript-eslint/no-explicit-any` | `any` 型の使用を禁止 |
| `@typescript-eslint/no-unused-vars` | 未使用変数の検出 |

---

## Git運用ルール

### ブランチ戦略

```
main                          ← 本番（GitHub Pages にデプロイ）
  └─ feature/blog-list        ← 機能開発
  └─ feature/i18n-routing     ← 機能開発
  └─ fix/contact-form-spam    ← バグ修正
  └─ content/2026-04-20-post  ← ブログ記事追加
```

**ブランチ命名規則**:
| 種別 | パターン | 例 |
|------|---------|-----|
| 機能追加 | `feature/{機能名}` | `feature/skill-level-bar` |
| バグ修正 | `fix/{内容}` | `fix/dark-mode-flicker` |
| ブログ記事追加 | `content/{日付}-{slug}` | `content/2026-04-20-typescript-tips` |
| ドキュメント更新 | `docs/{対象}` | `docs/update-prd` |
| リファクタリング | `refactor/{対象}` | `refactor/blog-filter-logic` |

**ルール**:
- `main` への直接プッシュ禁止（PR経由のみ）
- ブランチは作業完了後に削除
- 個人プロジェクトのため `develop` ブランチは設けない。全ての作業ブランチは `main` から切り、PR経由でマージする

---

### コミットメッセージ規約（Conventional Commits）

**フォーマット**:
```
<type>(<scope>): <subject>

<body> (省略可)
```

**Type**:
| タイプ | 用途 |
|--------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `content` | ブログ記事追加・更新 |
| `style` | コードフォーマット（機能変更なし） |
| `refactor` | リファクタリング |
| `docs` | ドキュメント更新 |
| `test` | テスト追加・修正 |
| `chore` | ビルド設定・依存関係更新 |

**Scope（任意）**: `home`, `blog`, `skills`, `products`, `contact`, `i18n`, `theme`

**言語ポリシー**: コミットメッセージは**日本語**で記述する（個人プロジェクトのため）。

**例**:
```
feat(blog): カテゴリフィルタリング機能を追加

BlogListページにカテゴリタブを追加。
Featured/New/Learn/Enjoy/Real の5カテゴリで記事を絞り込める。

content(blog/ja): TypeScript型システム入門記事を追加

fix(contact): honeypotフィールドが送信データに含まれる問題を修正
```

---

### プルリクエストプロセス

**作成前チェック**:
- [ ] `npm run type-check` がパスする
- [ ] `npm run lint` がパスする
- [ ] `npm run test` がパスする
- [ ] `npm run build` がパスする
- [ ] ブランチが `main` の最新に追いついている

**PRテンプレート**（`.github/PULL_REQUEST_TEMPLATE.md`）:
```markdown
## 概要
[変更内容の簡潔な説明]

## 変更理由
[なぜこの変更が必要か]

## 変更内容
- [変更点1]
- [変更点2]

## チェックリスト
- [ ] type-check パス
- [ ] lint パス
- [ ] テスト パス
- [ ] ビルド パス
- [ ] モバイル表示確認
- [ ] ダーク/ライトモード確認

## スクリーンショット（UI変更の場合）
```

---

## テスト戦略

### テストピラミッド

```
      ╔══════════════════╗
      ║     手動E2E      ║  ← 少・遅・高コスト（リリース前に実施）
     ╔╩══════════════════╩╗
     ║  型チェック + ESLint ║  ← CI必須（静的解析・自動実行）
    ╔╩════════════════════╩╗
    ║    ユニットテスト      ║  ← 多・速・低コスト（lib/ 配下のロジック）
   ╚══════════════════════╝
```

### ユニットテスト（Vitest）

**対象**: `src/lib/` 配下の純粋関数

```typescript
// tests/unit/lib/i18n.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { detectInitialLanguage } from '../../../src/lib/i18n';

describe('detectInitialLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('navigator', { language: 'en-US' });
  });

  it('localStorageに保存済みの言語設定を優先して返す', () => {
    // Given
    localStorage.setItem('lang', 'ja');
    // When
    const result = detectInitialLanguage();
    // Then
    expect(result).toBe('ja');
  });

  it('未保存かつブラウザ言語がjaの場合はjaを返す', () => {
    // Given
    vi.stubGlobal('navigator', { language: 'ja-JP' });
    // When
    const result = detectInitialLanguage();
    // Then
    expect(result).toBe('ja');
  });

  it('未保存かつブラウザ言語がja以外の場合はenを返す', () => {
    // Given (beforeEach で navigator.language = 'en-US')
    // When
    const result = detectInitialLanguage();
    // Then
    expect(result).toBe('en');
  });
});
```

**テスト命名規則**: 日本語で振る舞いを記述する（例: `'localStorageに保存済みの言語設定を優先して返す'`）

**カバレッジ目標**: `src/lib/` のステートメントカバレッジ 80%以上

`vitest.config.ts` でカバレッジ閾値を設定:
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      include: ['src/lib/**'],
      thresholds: {
        statements: 80,
        branches: 80,
      },
    },
  },
});
```

### 型チェック（TypeScript）

```bash
npm run type-check   # tsc --noEmit
```

CI必須ステップ。型エラーがある場合はビルドをブロックする。

### 手動E2Eテスト（リリース前確認リスト）

| 確認項目 | 確認方法 |
|---------|---------|
| 日英切り替えで全ページのテキストが変わる | 目視確認 |
| ダーク/ライトモード切り替えが全コンポーネントで反映される | 目視確認 |
| お問い合わせフォームの送信が完了する | Formspreeテストモードで送信 |
| モバイル（375px）でレイアウトが崩れない | Chrome DevTools モバイルエミュレータ |
| Lighthouse Performance スコアが90点以上 | Chrome DevTools Lighthouse |
| 存在しないURLにアクセスすると404ページが表示される | 直接URL入力 |

---

## コードレビュー基準

### レビューポイント

**機能性**:
- [ ] PRDの受け入れ条件を満たしているか
- [ ] 言語切り替え・テーマ切り替えに対応しているか
- [ ] エラー状態（フォーム送信失敗・404等）が考慮されているか

**可読性**:
- [ ] コンポーネント名・Propsが意図を正確に表しているか
- [ ] 複雑なロジックにコメントがあるか

**保守性**:
- [ ] ハードコードされたUIテキストがないか（翻訳キーを使用しているか）
- [ ] コンポーネントが単一責務を持っているか
- [ ] データ（`skills.ts`, `products.ts`）の変更がUIに正しく反映されるか
- [ ] 1ファイルあたり200行以内に収まっているか（超過する場合は分割を検討）

**セキュリティ**:
- [ ] `VITE_FORMSPREE_ENDPOINT` など環境変数がソースコードにハードコードされていないか
- [ ] `dangerouslySetInnerHTML` にサニタイズ済みHTMLのみ渡しているか

**パフォーマンス**:
- [ ] 画像に `loading="lazy"` が設定されているか
- [ ] 不要な再レンダリングが発生していないか（useCallbackの適切な使用）

### レビューコメントの書き方

**優先度の明示**:
- `[必須]`: マージ前に修正必須
- `[推奨]`: 修正を推奨するが任意
- `[提案]`: 将来的に検討してほしい
- `[質問]`: 意図を理解するための確認

```markdown
[必須] `dangerouslySetInnerHTML` に渡す前に rehype-sanitize でサニタイズが必要です。
現在の実装だとXSSの可能性があります。

[推奨] このロジックは `src/lib/blog.ts` に切り出すと、テストしやすくなります。

[質問] `translationSlug` が undefined の場合、言語切り替えボタンはどう振る舞いますか？
```

---

## 開発環境セットアップ

### 必要なツール

| ツール | バージョン | インストール方法 |
|--------|-----------|-----------------|
| Node.js | v24.11.0 | [nodejs.org](https://nodejs.org/) または nvm |
| npm | 11.x（Node.jsに同梱） | Node.jsと同時にインストール |
| Git | 2.x以上 | [git-scm.com](https://git-scm.com/) |

### セットアップ手順

```bash
# 1. リポジトリのクローン
git clone https://github.com/HarutarouKawamoto/HarutarouKawamoto.github.io.git
cd HarutarouKawamoto.github.io

# 2. 依存関係のインストール
npm install

# 3. 環境変数の設定
cp .env.example .env.local
# .env.local を編集して VITE_FORMSPREE_ENDPOINT を設定

# 4. 開発サーバーの起動
npm run dev
# → http://localhost:5173 で確認
```

### 主要な npm スクリプト

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー起動（HMR有効） |
| `npm run build` | 本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run type-check` | TypeScript型チェック（`tsc --noEmit`） |
| `npm run lint` | ESLintでコード検査 |
| `npm run format` | Prettierでコードフォーマット |
| `npm run test` | Vitestでユニットテスト実行 |
| `npm run test:coverage` | カバレッジレポート生成 |

### 推奨 VSCode 拡張機能

- **ESLint** (`dbaeumer.vscode-eslint`): リアルタイムLintエラー表示
- **Prettier** (`esbenp.prettier-vscode`): 保存時自動フォーマット
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Tailwindクラスの補完
- **TypeScript Importer** (`pmneo.tsimporter`): 自動インポート補完

### VSCode 設定（`.vscode/settings.json`）

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 実装前チェックリスト

実装を始める前に必ず確認:

1. `CLAUDE.md` を読む
2. 関連する `rules/` ファイルを読む（UIなら `design.md`、ブログなら `blog-guidelines.md`）
3. Grep で既存の類似実装を検索して既存パターンを理解する

実装完了前に確認:

### コード品質
- [ ] 命名が明確で一貫している（命名規則に従っている）
- [ ] UIテキストがハードコードされていない（翻訳キーを使用）
- [ ] 型注釈が適切に記載されている（`any` 禁止）
- [ ] エラー状態が考慮されている

### セキュリティ
- [ ] 環境変数がソースコードにハードコードされていない
- [ ] Markdownから生成されたHTMLがサニタイズされている
- [ ] フォームにバリデーションとhoneypotが実装されている

### UI/UX
- [ ] ダーク/ライトモードで表示が崩れない
- [ ] 日英両言語で表示が正しい
- [ ] モバイル（375px）でレイアウトが崩れない

### CI通過
- [ ] `npm run type-check` パス
- [ ] `npm run lint` パス
- [ ] `npm run test` パス
- [ ] `npm run build` パス
