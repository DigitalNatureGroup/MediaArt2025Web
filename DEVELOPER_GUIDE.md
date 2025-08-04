# 開発者向けガイド

このドキュメントは、`MediaArt2025Web` プロジェクトの開発者向けに、技術的な仕様、アーキテクチャ、および開発プロセスについて解説します。

## 1. プロジェクト概要

このプロジェクトは、Viteをビルドツールとして採用した、React + TypeScriptによるシングルページアプリケーション（SPA）です。インタラクティブな要素を多く含んだ、メディアアート作品のポートフォリオサイトとして構築されています。

### 主要技術スタック

-   **フレームワーク**: [React](https://reactjs.org/) 18.x
-   **言語**: [TypeScript](https://www.typescriptlang.org/)
-   **ビルドツール**: [Vite](https://vitejs.dev/)
-   **スタイリング**: CSS Modules, PostCSS
-   **コード品質**: ESLint, Prettier
-   **バージョン管理**: Git, GitHub

## 2. プロジェクト構造

```
.
├── src/
│   ├── components/      # 再利用可能なReactコンポーネント
│   │   ├── Hero.tsx
│   │   ├── InteractiveGrid.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Modal.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── WorkItem.tsx
│   │   └── WorkList.tsx
│   ├── hooks/           # カスタムフック
│   │   └── useScrollAnimation.ts
│   ├── App.tsx          # アプリケーションのルートコンポーネント
│   ├── main.tsx         # アプリケーションのエントリーポイント
│   ├── worksData.ts     # 作品データ
│   └── ...              # その他 (CSS, 型定義など)
├── public/              # 静的アセット
├── package.json         # 依存関係とスクリプト
├── vite.config.ts       # Vite設定ファイル
└── tsconfig.json        # TypeScript設定ファイル
```

### ディレクトリ解説

-   **`src/`**: アプリケーションのソースコードが格納されています。
-   **`src/components/`**: UIを構成する各部品（コンポーネント）が格納されています。原則として、コンポーネントは自身のスタイル（CSSファイル）を隣に持ち、関心事を局所化しています。
-   **`src/hooks/`**: `useState` や `useEffect` などを組み合わせた、ロジックを再利用するためのカスタムフックを配置します。
-   **`src/assets/`**: 画像やフォントなどの静的アセットを配置します。
-   **`public/`**: ビルド時にそのままルートにコピーされる静的ファイルを配置します（例: `favicon.ico`）。

## 3. アーキテクチャとデータフロー

### コンポーネント設計

本プロジェクトは、Reactの**コンポーネントベースアーキテクチャ**に準拠しています。UIは小さな独立したコンポーネントに分割され、それらを組み合わせて複雑なUIを構築します。

-   **Presentational Components**: 主にUIの見た目を担当します（例: `WorkItem.tsx`）。
-   **Container Components**: ロジックや状態管理を担当し、Presentational Componentsにデータを渡します（例: `WorkList.tsx`）。

### データフロー

データは原則として、親コンポーネントから子コンポーネントへ**一方通行**で流れます（Top-Down Data Flow）。

1.  **`worksData.ts`**: 作品に関する静的な情報（タイトル、作者、画像パスなど）を配列として保持しています。
2.  **`App.tsx`**: アプリケーションの最上位コンポーネントとして、各主要コンポーネントをレイアウトします。
3.  **`WorkList.tsx`**: `worksData.ts` からデータをインポートし、`map` 関数を使って各作品データを `WorkItem.tsx` コンポーネントにpropsとして渡します。
4.  **`WorkItem.tsx`**: propsとして受け取ったデータを画面に表示します。
5.  **`Modal.tsx`**: `WorkItem` がクリックされた際に、その作品の詳細データを表示します。モーダルの表示・非表示の状態は、上位のコンポーネント（`App.tsx` や `WorkList.tsx`）で管理されます。

## 4. 主要コンポーネントと機能

### `ParticleBackground.tsx`

-   **役割**: サイト全体の背景に表示される、インタラクティブなパーティクルアニメーションを描画します。
-   **実装**:
    -   HTML5 **Canvas API** を直接利用しています。Reactの `useRef` でCanvas要素にアクセスし、`useEffect` 内で描画ロジックを初期化・実行します。
    -   `requestAnimationFrame` による滑らかなアニメーションループを実装。
    -   各パーティクルは、位置、速度、サイズ、色などのプロパティを持つオブジェクトとして管理されます。
    -   マウスカーソルの動きを検知し、カーソル周辺のパーティクルに反発する力を加えることで、インタラクティブ性を実現しています。
    -   パーティクル同士が近い距離にある場合、間に線を描画する処理も含まれています。
-   **パフォーマンス**:
    -   パーティクルの数は、画面サイズに応じて動的に調整され、パフォーマンスの低下を防ぎます。
    -   コンポーネントがアンマウントされる際に、`cancelAnimationFrame` とイベントリスナーの削除を確実に行い、メモリリークを防止しています。

### `InteractiveGrid.tsx`

-   **役割**: 作品一覧をグリッドレイアウトで表示し、ユーザーの操作に応じてインタラクティブなエフェクトを提供します。
-   **実装**:
    -   CSS Grid LayoutまたはFlexboxを使用して、レスポンシブなグリッドを構築しています。
    -   マウスオーバーやクリックイベントに応じて、CSS TransformやTransitionを使ったアニメーションが適用されます。

### `LoadingScreen.tsx`

-   **役割**: サイトの初期読み込み時に表示されるローディング画面。
-   **実装**:
    -   `App.tsx` などで非同期データや重いコンポーネントを読み込む際に、Reactの `useState` と `useEffect` を使ってローディング状態を管理し、このコンポーネントの表示を制御します。

## 5. 開発を始めるには

1.  **依存関係のインストール**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **開発サーバーの起動**:
    ```bash
    npm run dev
    ```
    これにより、`http://localhost:5173` などで開発サーバーが起動し、ホットリロード（コード変更時の自動更新）が有効になります。

3.  **本番用ビルド**:
    ```bash
    npm run build
    ```
    `dist` ディレクトリに、最適化された静的ファイルが生成されます。

## 6. コーディング規約

-   **フォーマット**: [Prettier](https://prettier.io/) の設定に従います。コミット前に自動でフォーマットが実行されるように、Huskyによるpre-commitフックが設定されています。
-   **静的解析**: [ESLint](https://eslint.org/) のルールに従います。開発中にエディタでエラーや警告を確認してください。
-   **命名規則**:
    -   コンポーネント: `PascalCase` (例: `WorkItem`)
    -   変数・関数: `camelCase` (例: `createParticles`)
    -   CSSクラス: `kebab-case` または BEM記法を推奨 (例: `work-item__title`)

