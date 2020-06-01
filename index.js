const covid19data = require('covid19-data');
const {Telegraf} = require('telegraf');
const {Markup} = Telegraf;
const bot = new Telegraf('1242050325:AAF7Arfy1h7BNDR6TF1S7PRAZNxacT-EuNc');
const prettyNum = require('pretty-num').prettyNum;

const menu = Markup.inlineKeyboard([
    Markup.callbackButton('🇺🇳 Global', 'global'),
    Markup.callbackButton('🇲🇨 Indonesia', 'indo'),
]).extra();

bot.start((ctx) => ctx.telegram.sendMessage(ctx.from.id, 'Pilih Wilayah', menu));
bot.action('global',async (ctx) => {
    const global = (await covid19data.getData()).global;
    let result = '== Global ==\n';
    Object.keys(global).forEach(key => {
        let value = global[key];
        if (typeof(value) === 'number') value = prettyNum(value, {thousandsSeparator: '.'})
        result += key + ' : ' + value + '\n';
    })
    ctx.editMessageText(result);
})
bot.action('indo', async (ctx) => {
    const indo = (await covid19data.getData()).indonesia;
    let result = '== Indonesia ==\n';
    Object.keys(indo).forEach(key => {
        let value = indo[key];
        if (typeof(value) === 'number') value = prettyNum(value, {thousandsSeparator: '.'})
        result += key + ' : ' + value + '\n';
    })
    ctx.editMessageText(result);
})
bot.launch();