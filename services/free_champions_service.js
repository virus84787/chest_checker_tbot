const { default: axios } = require('axios');
const { sendStartMessage } = require('./start_message_service');

async function fetFreeChampionsList(ctx) {
    let { data: championListJSON } = await axios.get(`http://localhost:8083/api-checker/champions/freeChampionsList`);
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