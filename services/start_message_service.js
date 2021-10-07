function sendStartMessage(ctx) {
    const msg = '/freeChampions - get free champions list \n /<summoner_name> - get chest granted chmapions list'
    ctx.reply(msg);
}

module.exports = { sendStartMessage };