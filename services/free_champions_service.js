const { default: axios } = require('axios');
const { sendStartMessage } = require('./start_message_service');

const API_URL_FREE_CHAMPIONS = 'http://localhost:3000/api-checker/champions/freeChampionsList';

async function fetFreeChampionsList(ctx) {
    let { data: championListJSON } = await axios.get(API_URL_FREE_CHAMPIONS);
    let messChampionList = 'Free Champion list: \n';
    const championList = championListJSON?.freeChampions;

    championList.forEach(function(item, i) {
        i++;
        messChampionList = messChampionList + i + '. ' + item + '\n';
      });
      
    ctx.reply(messChampionList);
    sendStartMessage(ctx);
}

module.exports = { fetFreeChampionsList };