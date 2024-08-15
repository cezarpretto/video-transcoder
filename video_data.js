const ffmpeg = require('fluent-ffmpeg');
const os = require('os');

(async () => {
  // ffmpeg()
  //   .input('./video_to_fix.mp4')
  //   .ffprobe((err, data) => {
  //     console.log('Video to fix:');
  //     console.log(JSON.stringify(data, null, 2));
  //   });
  ffmpeg()
    .input('./video_fixed.mp4')
    .ffprobe((err, data) => {
      console.log('Video fixed:');
      console.log(JSON.stringify(data, null, 2));
    });
})();

// to fix: H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10
// fixed : H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10'

