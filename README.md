# Fost-Bot
一個多功能的機器人，簡易的指令、多元的功能，讓 [Fost Bot](https://discord.com/api/oauth2/authorize?client_id=1031906245839437925&permissions=8&scope=bot%20applications.commands) 成為你心目中的 Best Bot ！

![image](https://user-images.githubusercontent.com/102290205/201460011-4a9c9977-0b9f-4215-b720-b8f2f5fabac9.png)
![image](https://user-images.githubusercontent.com/102290205/201460081-0fa8df50-3d0c-4057-99db-a0d6a0cc1489.png)
![image](https://user-images.githubusercontent.com/102290205/201460053-70e46cfa-aa74-4ebc-8195-02c8bbdb998d.png)

## 使用機器人
這段教學將會帶著您了解[FostBot](https://discord.com/api/oauth2/authorize?client_id=1031906245839437925&permissions=8&scope=bot%20applications.commands)的特色、邀請的方法，以及取得支援的方法。

### 💝 我有什麼特色？
- 自動產生的 `/help` 指令嵌入列表，依指令分類自動排序
- 各種 `/search` 指令，讓您在Discord搜尋各大網頁的內容
- 數字接龍小遊戲輕鬆設置，讓您和朋友在Discord也能愉快的戲耍
- 各種實用指令，例如：產生QRCode、計算機
- 輕鬆管理伺服器，管理功能全配置

### 💌 如何開始使用我？
您可以通過[這個連結](https://discord.com/api/oauth2/authorize?client_id=1031906245839437925&permissions=8&scope=bot%20applications.commands)邀請我到您的伺服器！

### 💬 要怎麼取得支援？
您可以使用機器人的 `/feedback` 指令向開發者進行回饋唷！如想快速得到開發者的支援，或是與開發者進行互動，可以到[支援伺服器](https://discord.gg/ApJWEmnTB3)取得支援哦！

## 部署機器人
這端教學將會指導您複製一台和[FostBot](https://discord.com/api/oauth2/authorize?client_id=1031906245839437925&permissions=8&scope=bot%20applications.commands)功能一樣的機器人。
> 提醒：此機器人的開源協議為 `GPL 3.0` ，使用者可以自由使用、修改、發布此原始碼，但必須在分享的頁面中、機器人的指令回應內容中、或機器人的介紹中等任意位置，標註此原始碼的原創作者。

### Step. 1 下載機器人的原始碼
您需要將[此份 Github Repo](https://github.com/Winson-OTP/Fost-Bot)中全部的檔案或資料夾下載，並且解壓縮至同一個資料夾內。

### Step. 2 修改 `config.json` 內的設定
創建機器人請參照[這篇教學](https://hackmd.io/@winsonOTP/discord-js-v14-ep1)

`botClientID` 機器人的使用者ID，可以直接從Discord使用開發者模式對機器人右鍵複製，也可以從[開發者門戶](https://discord.com/developers/applications)取得

`botToken` 機器人的TOKEN，需從[開發者門戶](https://discord.com/developers/applications)取得

> 注意：機器人的TOKEN只要擁有，便可以操縱機器人進行任何行為，請務必妥善保存並且防止外洩。

`mongoDBLink` MongoDB資料庫的連結網址，可以在[MongoDB](https://www.mongodb.com/)創建帳號與資料庫並取得

`mongoDBUsername` MongoDB資料庫的使用者名稱，可以在[MongoDB](https://www.mongodb.com/)創建帳號與資料庫並取得

`mongoDBPassword` MongoDB資料庫的使用者密碼，可以在[MongoDB](https://www.mongodb.com/)創建帳號與資料庫並取得

### Step. 3 安裝套件並啟動機器人
> 提醒：終端機需cd於您的專案資料夾，如沒有在該資料夾，可使用 `cd <資料夾路徑>` 來移動

在終端機輸入指令並安裝套件
```shell
npm install
```
並於安裝完成後啟動機器人
```shell
node index.js
```
就可以成功讓機器人上線囉！
