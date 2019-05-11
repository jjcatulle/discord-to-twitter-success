const Discord = require("discord.js");
const Timeout=require("await-timeout");
const http = require('https');
const fs = require('fs');
var Twit = require('twit');
// Pulling all my twitter account info from another file
var config = require('./config.js');
var T = new Twit(config);
const client = new Discord.Client();

//display on ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});
//chevk for specific message

client.on('message', async msg => {
//    var userTag= msg.member.user.tag;
//    console.log(userTag);
const channel =msg.channel.id
if (channel === '494707086211678208'){

    async function discordTotweet(){
    
        const messageContent = await msg.content;
        var userTag= await msg.member.user.tag;
        const Attachment = await (msg.attachments).array();
        const imageUrl =  await Attachment[0].url;
        await saveImage(imageUrl);
        await Timeout.set(10000);
        await upload(userTag);
        // console.log('test')
        }
        discordTotweet();
    }

});


client.login('NTc2MTg2MTQ1ODE0MDg1NjMy.XNS1PA.701iQAYoAbJzGlIqnNx-racyRC8');
//client.login('NTc0NzMyMzcyMzczNjY3ODc1.XM9wGw.QORqwExIOzq4kln6Rck-quvazwE');


async function saveImage(url) {
    const file = await fs.createWriteStream(`success.jpg`);
    const request =await http.get(url, function (response) {
        response.pipe(file);
    });
}
async function upload(user){
    console.log('Opening an image...');
    var image_path = await `./success.jpg`,
        b64content = await fs.readFileSync(image_path, { encoding: 'base64' });
  
    console.log('Uploading an image...');
  
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      if (err){
        console.log('ERROR:');
        console.log(err);
      }
      else{
        console.log('Image uploaded!');
        console.log('Now tweeting it...');
  
        T.post('statuses/update', {
          media_ids: new Array(data.media_id_string),
          status:`SUCCESS by ${user} In @plugxtalk`
        },
          function(err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Posted an image!');
            }
          }
        );
      }
    });
  }
