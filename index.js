const Discord = require('discord.js');
const bot = new Discord.Client();

const scheduled_hour = 13

const role_to_ping = '701523167390204014';

const getBirthdayMessage = character => `Anniv ${character.name} <@&${role_to_ping}>`;

const characters = [
  { name: 'Ban', birth: { day: 14, month: 2} },
  { name: 'Meliodas', birth: { day: 25, month: 7} },
  { name: 'Merlin', birth: { day: 3, month: 12} },
  { name: 'Diane', birth: { day: 24, month: 12} },
  { name: 'Gowther', birth: { day: 6, month: 6} },
  { name: 'Elisabeth', birth: { day: 12, month: 6} },
  { name: 'King', birth: { day: 1, month: 4} },
  { name: 'Escanor', birth: { day: 1, month: 7 } },
];

function sendBirthdayMessageIfAny(today) {
  characters.forEach(character => {
    if (today.getMonth() + 1 == character.birth.month && today.getDate() == character.birth.day) {
      bot.channels.fetch("706242507012440094")
        .then(channel => {
          channel.send(getBirthdayMessage(character))
        })
        .catch(console.error);
    }
  })
}

function scheduledTime() {
    const d = new Date();
    return (-d + d.setHours(scheduled_hour,0,0,0));
}

bot.login("NzEzNzgyNTA2MTA5MDA5OTQw.Xslg9w.RRXkElJfvl4rTMObk_IEvZkOOWo");

bot.on('message', function (message) {
	if (message.content === '!Hello') {
  	message.reply('Hello world !!')
  }
})

bot.on('ready', () => {
    bot.user.setActivity('Regarde le calendrier').catch(console.error)
    setTimeout(() => {
		const today = new Date;
        const dayMillseconds = 1000 * 60 * 60 * 24;
        sendBirthdayMessageIfAny(today);
        setInterval(() => {
          const today = new Date;
          sendBirthdayMessageIfAny(today);
          }, dayMillseconds)
    }, scheduledTime())
})

