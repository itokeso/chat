# 概要

プログラミングスクールTECH::CAMPカリキュラムでの製作物です！<br>
グループを作りグループ内でのチャットが可能です。メンバーの招待や画像送信機能・チャットの自動更新機能がついたアプリ挑戦しました。

## アプリケーションの機能一覧
・ユーザー新規登録機能<br>
・ユーザーログイン・ログアウト機能<br>
・グループ作成機能<br>
.グループメンバー追加機能<br>
・グループ編集機能<br>
・メッセージ送信機能<br>
・画像送信機能<br>

## 使用技術一覧
|種別|名称|
|------|----|
|開発言語|Ruby(ver 2.5.1), jquery|
|フレームワーク|Ruby on Rails(ver 5.2.4.1)|
|マークアップ|HTML,CSS(Sass)|
|データベース|MYSQL|

# DEMO
![demo](https://raw.github.com/wiki/itokeso/chat/images/image.gif)

# DB設計

##  usersテーブル  
|Column|Type|Options|
|------|----|-------|
|name |string|null: false|
|e-mail|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups,through:groups_users
- has_many :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text|--------|
|messages|string|---|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-belongs_to :user
-belongs_to :group

## groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
-has_many :users,through:groups_users
-has_many :messages
-has_many :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
