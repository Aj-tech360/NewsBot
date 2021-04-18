//Define required files 
const Discord = require('discord.js');
require('dotenv').config();
const { prefix } = require('./config.json');
require('isomorphic-fetch');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

//Start new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Client ready listener
client.once('ready', () => {
    console.log('Ready!');
})

//Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
console.log('Logged In');

//Discord message listener
client.on('message', msg => {
  client.user.setActivity('News', { type: 'WATCHING' });
  if (msg.content.startsWith(prefix)) {
    // Get search term from message
    searchTerm = msg.content.substring(3);

    // News API
    newsapi.v2.topHeadlines({
      q: `${searchTerm}`,
    }).then(response => {
      var responseLength = Object.keys(response.articles).length;
      if (responseLength !== 0) {
        var idx = getRandomInt(0,responseLength);
        const article = response.articles[idx];
        msg.channel.send(article.url);
      } else {
        msg.channel.send('No Results Found.');
      }
    })
  } 
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

