const ffmpeg = require('fluent-ffmpeg');
const os = require('os');

(async () => {
  const command = ffmpeg()
    .input('./input/video_to_fix_2.mp4')
    .output('./output/video_fixed_2.mp4')
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
})();

