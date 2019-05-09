// var Twit = require('twit');
// var fs = require('fs')
// // Pulling all my twitter account info from another file
// var config = require('./config.js');

// // Making a Twit object for connection to the API
// var T = new Twit(config);

// var tweet = {
//     status: 'test',
//     media: ''
// }
// function upload(){
//     console.log('Opening an image...');
//     var image_path = './success.jpg',
//         b64content = fs.readFileSync(image_path, { encoding: 'base64' });
  
//     console.log('Uploading an image...');
  
//     T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//       if (err){
//         console.log('ERROR:');
//         console.log(err);
//       }
//       else{
//         console.log('Image uploaded!');
//         console.log('Now tweeting it...');
  
//         T.post('statuses/update', {
//           media_ids: new Array(data.media_id_string),
//           status:'test'
//         },
//           function(err, data, response) {
//             if (err){
//               console.log('ERROR:');
//               console.log(err);
//             }
//             else{
//               console.log('Posted an image!');
//             }
//           }
//         );
//       }
//     });
//   }
//   upload();