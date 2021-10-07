const { default: axios } = require('axios');
const { sendStartMessage } = require('./start_message_service');

async function getChestGrantedChampionList(ctx) {
    const message = ctx.message.text;

    if(message.includes('/') && message.split('').length > 1) { 
        const summonerName = message.slice(1, )
        let { data: chestGrantedChampionsJSON } = await axios.get(`http://localhost:8083/api-checker/summoner/${summonerName}`);
        const chestGrantedChampions = chestGrantedChampionsJSON.summonerChessGrantedCpampions;
    
    
        let data = chestGrantedChampions.filter(c=>c.chesGrantedChampions.length > 0);
        let msg = 'Summoner name: ' + summonerName + '\n';
        const server = 'Server: ' + data[0]?.server + '\n\n';
        let chestGrantedChampionsArray = data[0]?.chesGrantedChampions;
    
        let chestGrantedChampionsList = 'Chest Granted Champions: ' + '\n';

        if(!chestGrantedChampionsArray) {
            ctx.reply(msg + '\nHave no chest granted champions at any of servers');
            return;
        }

        chestGrantedChampionsArray.forEach(function(item, i) {
            i++;
            chestGrantedChampionsList = chestGrantedChampionsList + i + '. ' + item + '\n';
          });

         ctx.reply(msg + server + chestGrantedChampionsList);
    }
    sendStartMessage(ctx);
}

module.exports = { getChestGrantedChampionList };