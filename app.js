const Discord = require("discord.js");
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
    async function discordTotweet(){
        const messageContent = await msg.content;
        var userTag= await msg.member.user.tag;
        const Attachment = await (msg.attachments).array();
        const imageUrl =  await Attachment[0].url;
        await saveImage(userTag,imageUrl);
        await upload(userTag);
    }

    discordTotweet();


});


client.login('NTc2MTg2MTQ1ODE0MDg1NjMy.XNS1PA.701iQAYoAbJzGlIqnNx-racyRC8');

async function saveImage(user,url) {
    const file = fs.createWriteStream(user+".jpg");
    const request = http.get(url, function (response) {
        response.pipe(file);
    });
}

async function upload(userTag){
    console.log('Opening an image...');
    var image_path =userTag+'.jpg',
        b64content = fs.readFileSync(image_path, { encoding: 'base64' });
  
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
          status:'SUCCESS by '+userTag+' In @plugxtalk'
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