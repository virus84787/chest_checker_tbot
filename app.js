const { Telegraf } = require('telegraf');
const { fetFreeChampionsList } = require('./services/free_champions_service');
const { getChestGrantedChampionList } = require('./services/chest_granted_champions_service');
const { sendStartMessage } = require('./services/start_message_service');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(sendStartMessage);
bot.help(sendStartMessage);
bot.command('freeChampions', fetFreeChampionsList);
bot.on('message', getChestGrantedChampionList);
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))
