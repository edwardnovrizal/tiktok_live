const axios = require("axios");
const googleTTS = require("google-tts-api");
const fs = require("fs");
const player = require("play-sound")({ player: "mpg123" });
const { v4: uuidv4 } = require("uuid");   

async function textToSpeech(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = googleTTS.getAudioUrl(text, {
        lang: "id",
        slow: false,
        host: "https://translate.google.com",
      });

      const audioFile = `comment_${uuidv4()}.mp3`;

      const response = await axios({
        method: "get",
        url: url,
        responseType: "stream",
      });

      const writer = fs.createWriteStream(audioFile);
      response.data.pipe(writer);

      writer.on("finish", () => {
        player.play(audioFile, (err) => {
          if (err) {
            console.error(`Error playing audio: ${err}`);
            reject(err);
            return;
          }

          fs.unlink(audioFile, (err) => {
            if (err) console.error(`Error deleting audio file: ${err}`);
          });

          resolve(); // Selesaikan setelah audio diputar
        });
      });

      writer.on("error", (err) => {
        console.error(`Error writing audio file: ${err}`);
        reject(err);
      });
    } catch (error) {
      console.error(`Error in TTS: ${error}`);
      reject(error);
    }
  });
}

module.exports = { textToSpeech };
