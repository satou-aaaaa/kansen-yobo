# AGENTS.md

かぜ・感染症よぼう：学校・家・電車などの場面を見て、かぜやインフルエンザなど呼吸器の感染症を、うつさない・うつらないために、いちばん大事な行動（9つ）を当てる1日5問の学習ゲーム。正解したら「なんのため？」（手から入れない・しぶきを広げない・部屋の空気をととのえる・休んで体を守る）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（26種類×3000問：選び肢・答えは1つ・答えと分け方と出典が行動の表どおり）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は、厚生労働省の資料（今冬の急性呼吸器感染症（ARI）総合対策・咳エチケット・インフルエンザQ&A・換気の方法・啓発資料）と学校保健安全法施行規則第19条（e-Gov）で確かめたことだけ（2026-11-17 に読んだ。`data.js` の `SRC`）。種類を足すときも資料を読み、`src` を付け、`qa/run.mjs` の `TB`（別に書いた行動の表）にも足す。読めなかった資料（厚労省の手洗いの手順の PDF）にしか無いこと（手洗いの順番・秒数）は問題にしない。
- 扱うのは、呼吸器の感染症をうつさない・うつらない、ふだんの行動だけ。食べ物の扱い（食中毒よぼう shokuchudoku-yobo）・うその健康情報（健康情報みぬき kenko-minuki）・薬（薬の袋よみ kusuri-yomi）と重ねない。病気の治し方・薬・受診の判断・予防接種をすすめる・すすめないは扱わない（QA が見る）。場面・人はすべて架空で、人の性別の役割を決めつけない。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、公式の情報や医師の判断の代わりではないこと、厚生労働省で確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ、ふつう・むずかしいが4つ（9つの行動から。まぎらわしいものは `near` で選び肢に入れない）。2回目のヒントはまちがいを消して2つにしぼり、行動の言葉（`key`）も見せる。2段目は「なんのため？」（4つ）で、行動（`grp`）で決まる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「なんのため？」・復習（1→3→7日後）。記録 `kny-v1`・文字 `kny-fs`・復習 `kny-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は火事から守る（kaji-mamoru）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
