const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const fs = require('fs');
const path = require('path');

(async () => {
  const files = fs.readdirSync('./input')
    .filter((file) => !file.endsWith('.gitignore'))
  for (const file of files) {
    const command = ffmpeg()
      .input(path.join('./input', file))
      .output(path.join('./output', `${file}.mp4`))
      .audioCodec('aac')
      .audioBitrate('128')
      .videoCodec('libx264')
      .videoBitrate('1000')
      .addOption('-movflags +faststart')
      .addOption('-profile:v', 'main')
      .addOption('-level', '3.1')
      .addOption('-pix_fmt', 'yuv420p')
      .addOption(`-threads ${Math.ceil(os.cpus().length)}`)
      .fps(24)
      .on('progress', (data) => {
        console.log(data);
      })
      .on('start', () => {
        console.log('Start', os.cpus().length)
      })
      .on('end', (data) => {
        console.log('Success', data);
      })
      .on('error', function (err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
        // console.log(stdout);
        console.log(stderr);
      })
      .run();
  }
})();

