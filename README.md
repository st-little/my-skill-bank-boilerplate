# My Skill Bank

- 自分のスキル情報を json 形式で作成し Github で管理します。
- スキルシートを PDF 形式で出力します。
  - [Example Skill Sheet](./doc-example.pdf)

## 前提条件

- Github のアカウントが必要です。
- 日本語が使用できるフォントが必要です。
- VSCode の [Devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) で作業することが前提です。

## 使い方

### 準備

My Skill Bank を使用するための準備を行います。

1. My Skill Bank の[テンプレート](https://github.com/st-little/my-skill-bank-boilerplate)から **プライベートリポジトリ** を作成します。

   - 詳細は [テンプレートからリポジトリを作成する](https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) を参照してください。

1. 作成したプライベートリポジトリをホストマシンにクローンします。

1. クローンしたプライベートリポジトリを VSCode の Devcontainer で開きます。(以降の手順は Devcontainer で実施します。)

   - 詳細は [Open an existing folder in a container](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container) を参照してください。

1. 次のコマンドを実行し Node Module をインストールします。

   ```
   npm ci
   ```

1. 日本語が使えるフォントを `src/fonts` にコピーします。

### スキルシートの設定

PDF で出力するスキルシートを設定します。

1. 次の表を参考に `src/data/doc-setting.json` を変更します。

   | キー             | キー(日本語)       | 必須 | 説明                                         |
   | :--------------- | :----------------- | :--: | -------------------------------------------- |
   | docName          | ドキュメント名     |  ○   | スキルシートのファイル名                     |
   | tableHeaderColor | テーブルヘッダー色 |  ○   | スキルシート内のテーブルヘッダーの色         |
   | fontName         | フォント名         |  ○   | `src/fonts` にコピーしたフォントのファイル名 |

   設定の例

   ```
   {
       "docName": "Skill Sheet.pdf",
       "tableHeaderColor": "#CCCCCC",
       "fontName": "ipaexg.ttf"
   }
   ```

1. 次のコマンドで設定した内容に問題ないことを確認します。

   ```
   npm run validation:doc-setting
   ```

### スキルシートのメタデータ

PDF で出力するスキルシートのメタデータを定義します。

1. 次の表を参考に `src/data/doc-definition.json` を変更します。

   | キー         | キー(日本語)     | 必須 | 説明                                   |
   | :----------- | :--------------- | :--: | -------------------------------------- |
   | title        | タイトル         |  ○   |                                        |
   | author       | 著者名           |  ○   |                                        |
   | subject      | サブタイトル     |  ○   |                                        |
   | keywords     | キーワード       |  ○   | PDF に関連するキーワード               |
   | creator      | 作成者           |      | デフォルトは 'pdfmake'                 |
   | producer     | プロデューサー   |      | デフォルトは 'pdfmake'                 |
   | creationDate | 作成日           |      |                                        |
   | modDate      | 最終更新日       |      |                                        |
   | trapped      | トラップフラッグ |      | わずかな色の見当ずれを修正したかどうか |

   定義の例

   ```
   {
       "title": "Skill Sheet",
       "author": "st-little",
       "subject": "",
       "keywords": ""
   }
   ```

1. 次のコマンドで定義の内容に問題ないことを確認します。

   ```
   npm run validation:doc-definition
   ```

### 職務経歴の設定

PDF で出力するスキルシートの職務経歴を設定します。

1. 次の表を参考に `src/data/resume.json` を変更します。

   | キー           | キー(日本語)   | 必須 | 説明                                                |
   | :------------- | :------------- | :--: | --------------------------------------------------- |
   | nameKana       | ふりがな       |  ○   | 氏名のふりがな                                      |
   | nameKanji      | 氏名           |  ○   | 氏名の漢字                                          |
   | birthday       | 生年月日       |  ○   | フォーマットは yyyy-mm-dd 形式です                  |
   | gender         | 性別           |  ○   |                                                     |
   | address        | 住所           |      |                                                     |
   | closestStation | 最寄駅         |      |                                                     |
   | emailAddress   | メールアドレス |      |                                                     |
   | phoneNumber    | 電話番号       |      |                                                     |
   | skill          | 保有技術       |  ○   |                                                     |
   | jobSummary     | 職務要約       |  ○   |                                                     |
   | selfPromotion  | 自己 PR        |  ○   |                                                     |
   | bioLinks       | HP 等          |      | リンクの名称、URL をキー _name_, _url_ で設定します |
   | memorandum     | 備忘録         |      | PDF には出力されません                              |

   職務経歴の例

   ```
   {
       "nameKana": "やまだ たろう",
       "nameKanji": "山田 太郎",
       "birthday": "1990-01-01",
       "gender": "男性",
       "address": "東京都千代田区",
       "closestStation": "JR 山手線 東京駅",
       "qualification": "ITパスポート",
       "skill": "TypeScript, React, Jest, Go",
       "jobSummary": "2009年4月〜2015年7月   ○○○株式会社\n2015年8月〜現在   ×××株式会社",
       "selfPromotion": "バックエンドからフロントエンドまでの実装経験があり、フルスタックエンジニアとして力を発揮できます。",
       "bioLinks": [
           {
               "name": "Github",
               "url": "https://github.com/st-little"
           }
       ]
   }
   ```

1. 次のコマンドで職務経歴の内容に問題ないことを確認します。

   ```
   npm run validation:resume
   ```

### 経験プロジェクトの設定

PDF で出力するスキルシートの経験プロジェクトを設定します。

1. 次の表を参考に `src/data/projects.json` を変更します。

   | キー           | キー(日本語) | 必須 | 説明                                                                                                                                            |
   | :------------- | :----------- | :--: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   | workPeriod     | 作業期間     |  ○   | 開始日、終了日をキー _start_, _end_ で設定します<br> フォーマットは yyyy-mm-dd 形式です<br>プロジェクトに参画中の場合は開始日のみ設定します　　 |
   | jobDescription | 業務内容     |  ○   |                                                                                                                                                 |
   | jobRole        | 担当業務     |  ○   |                                                                                                                                                 |
   | envLang        | 環境/言語等  |  ○   |                                                                                                                                                 |
   | roleScale      | 役割/規模    |  ○   |                                                                                                                                                 |
   | memorandum     | 備忘録       |      | PDF には出力されません                                                                                                                          |

   職務経歴の例

   ```
   [
       {
           "workPeriod": {
               "start": "2021-01-01"
           },
           "jobDescription": "医薬品向け請求書発行システム(改修案件)",
           "jobRole": "実装\n単体テスト",
           "envLang": "Win10\nTypeScript\nJest,Oracle",
           "roleScale": "【役割】\nメンバー(PG)\n【チーム規模】\n4名"
       },
       {
           "workPeriod": {
               "start": "2020-04-01",
               "end": "2020-12-31"
           },
           "jobDescription": "製造業向け工程管理システム構築",
           "jobRole": "実装\n単体テスト",
           "envLang": "Win10\nTypeScript\nJest,MySQL",
           "roleScale": "【役割】\nメンバー(PG)\n【チーム規模】\n20名"
       }
   ]
   ```

1. 次のコマンドで経験プロジェクトの内容に問題ないことを確認します。

   ```
   npm run validation:projects
   ```

### スキルシートの出力

スキルシートを PDF 形式で `output` フォルダに出力します。

```
npm run export:doc
```

## 開発者向け

### テスト

```
npm run test
```

### リンター

```
npm run lint
```
