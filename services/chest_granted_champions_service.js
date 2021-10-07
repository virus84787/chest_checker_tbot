const { default: axios } = require('axios');
const { sendStartMessage } = require('./start_message_service');

const API_URL_SUMMONER_CHEST_GRANTED_CHAMPIONS = 'http://localhost:3000/api-checker/summoner/'

async function getChestGrantedChampionList(ctx) {
    const message = ctx.message.text;

    if (!message.includes('/') && message.split('').length <= 1) {
        return;
    }

    const summonerName = message.slice(1,)
    const uri = API_URL_SUMMONER_CHEST_GRANTED_CHAMPIONS + summonerName;
    let { data } = await axios.get(encodeURI(uri));
    const summonerChessGrantedCpampions = data.summonerChessGrantedCpampions;
    let msg = 'Summoner name: ' + summonerName + '\n';
    if (summonerChessGrantedCpampions.length == 0) {
        ctx.reply(msg + '\nDidn\'t found information about summoner at any servers');
        return;
    }

    let serversWithChestGrantedChampions = summonerChessGrantedCpampions.filter(c => c.chesGrantedChampions.length > 0);

    for (const serverData of serversWithChestGrantedChampions) {
        msg = 'Summoner name: ' + summonerName + '\n';
        const server = 'Server: ' + serverData?.server + '\n\n';
        let chestGrantedChampionsArray = serverData?.chesGrantedChampions;

        if (!chestGrantedChampionsArray) {
            ctx.reply(msg + '\nAt current season summoner have no chest granted champions at any of servers');
            return;
        }

        let chestGrantedChampionsList = 'Chest Granted Champions: ' + '\n' + groupChestGrantedChampionList(chestGrantedChampionsArray);

        ctx.reply(msg + server + chestGrantedChampionsList);

    }

    sendStartMessage(ctx);
}

function groupChestGrantedChampionList(chestGrantedChampionsArray) {
    let groupedList = '';
    chestGrantedChampionsArray.forEach(function (item, i) {
        i++;
        groupedList = groupedList + i + '. ' + item + '\n';
    });
    return groupedList;
}

module.exports = { getChestGrantedChampionList };