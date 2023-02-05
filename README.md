# googlesheets-telegram-notification
App script for integration google sheets and telegram api. Functions for google sheets for notifications in telegram when cells are changed.

1. Create a telegram bot with botfather
2. This script need to copy into your google sheet(open sheet -> Extensions -> Apps Script)
3. Don't forget to create a trigger (edit) for function "onEditInstall"(triggers -> edit)

There are two tables for example:
Tasks: a list of tasks for performers 

![image](https://user-images.githubusercontent.com/59527408/216812897-e0f78326-08f6-47bd-9ca6-8cc6826b5e9e.png)

Dict: list of performers

![image](https://user-images.githubusercontent.com/59527408/216812933-27ab67c3-e24a-4437-ae98-720227a35fcc.png)

Obtaining the chat identifier with the bot:
1. It is necessary to start a chat with the bot
2. View chat ID using the link: https://api.telegram.org/bot<API_KEY>/getUpdates

Script settings:
const API_KEY = 'the key of the created bot';
const CHAT_ID = 'bot chat ID'; 
const TABLE_ID = 'google table id';
const LIST_NAME = 'Tasks'; (task sheet name)
const SPR_NAME = 'Dict'; (name of the sheet with the list of performers)
const triggerCol = [4,5]; (columns that trigger notification when they change)

Example notice:

![image](https://user-images.githubusercontent.com/59527408/216813321-c524c6ee-af04-4bb1-9119-b6227c669713.png)

Notifications are sent if:
1. A new task is added and the column with the performer and the start date is filled in
2. The column with the performer or the start date is changed
